import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";

// Hardware / live-data RTDB config.
// Auth Firebase app (src/firebase.js) is left untouched.
// If the Pi writes to the SAME Firebase project, set VITE_FIREBASE_DATABASE_URL
// to that project's RTDB URL. If it writes to a DIFFERENT project, set the
// VITE_HW_* vars and we create a SECOND NAMED app ("hardware") for live data.
//
// Required (one of):
//   VITE_FIREBASE_DATABASE_URL  (same-project RTDB URL)
//   VITE_HW_DATABASE_URL        (other-project RTDB URL)
// Optional for second app:
//   VITE_HW_API_KEY, VITE_HW_PROJECT_ID, VITE_HW_APP_ID, VITE_HW_AUTH_DOMAIN
const SAME_PROJECT_URL =
  import.meta.env.VITE_FIREBASE_DATABASE_URL ||
  import.meta.env.VITE_FIREBASE_RTDB_URL ||
  "";
const HW_URL = import.meta.env.VITE_HW_DATABASE_URL || "";
// Explicit same-project URL wins; otherwise derive the default RTDB URL from
// the Auth project id (public, non-secret). Override via env if region differs.
const PROJECT_ID = (import.meta.env.VITE_FIREBASE_PROJECT_ID || "").trim();
const DERIVED_URL = PROJECT_ID
  ? `https://${PROJECT_ID}-default-rtdb.firebaseio.com`
  : "";
const DATABASE_URL = (HW_URL || SAME_PROJECT_URL || DERIVED_URL || "").trim();

// DEMO: exactly 10 cows COW001-COW010. Today = real Firebase RTDB
// mastiguard/animals/${cowId}/history (newest by timestamp).
export const LIVE_COW_IDS = ["COW001", "COW002", "COW003", "COW004", "COW005", "COW006", "COW007", "COW008", "COW009", "COW010"];

export const isLiveConfigMissing = () => !DATABASE_URL;

export const getLiveConfigStatus = () => {
  if (!DATABASE_URL) {
    return {
      ok: false,
      message:
        "Missing Realtime Database URL. Set VITE_FIREBASE_DATABASE_URL (same project) " +
        "or VITE_HW_DATABASE_URL (hardware project) in websiteFrontend/.env — e.g. " +
        "https://<project-id>-default-rtdb.firebaseio.com (or your regional URL).",
    };
  }
  return { ok: true, databaseURL: DATABASE_URL, secondApp: Boolean(HW_URL) };
};

let cachedDb = null;

export const getHardwareDb = () => {
  if (cachedDb) return cachedDb;
  const status = getLiveConfigStatus();
  if (!status.ok) {
    throw new Error(status.message);
  }
  if (HW_URL) {
    // Second named app — auth app untouched.
    const existing = getApps().find((a) => a.name === "hardware");
    const hwApp =
      existing ||
      initializeApp(
        {
          apiKey: import.meta.env.VITE_HW_API_KEY || "hw-live-read-only",
          authDomain: import.meta.env.VITE_HW_AUTH_DOMAIN || undefined,
          projectId: import.meta.env.VITE_HW_PROJECT_ID || "hardware-live",
          appId: import.meta.env.VITE_HW_APP_ID || undefined,
          databaseURL: DATABASE_URL,
        },
        "hardware"
      );
    cachedDb = getDatabase(hwApp);
    return cachedDb;
  }
  // Same project: reuse default app, but point getDatabase at explicit URL.
  const defaultApp = getApp();
  cachedDb = getDatabase(defaultApp, DATABASE_URL);
  return cachedDb;
};

/**
 * Subscribe to mastiguard/animals/{cowId}/history and emit the newest
 * history record (by `timestamp`) as the current data.
 * There is no guaranteed `latest` node, so `history` is the source of truth.
 * Returns an unsubscribe function. Caller must call it on unmount.
 */
export const subscribeToLatest = (cowId, onData, onError) => {
  const db = getHardwareDb();
  const historyRef = ref(db, `mastiguard/animals/${cowId}/history`);
  const unsubscribe = onValue(
    historyRef,
    (snap) => {
      onData(snap.exists() ? selectNewestHistoryRecord(snap.val()) : null);
    },
    (err) => {
      if (onError) onError(err);
    }
  );
  return unsubscribe;
};

export const parseRecordTime = (record) => {
  if (!record || typeof record !== "object") return null;
  const ts = record.timestamp;
  if (ts == null) return null;
  // Numeric ms/s or ISO string.
  if (typeof ts === "number" && Number.isFinite(ts)) {
    // Heuristic: seconds (< 1e12) vs milliseconds.
    return ts < 1e12 ? ts * 1000 : ts;
  }
  if (typeof ts === "string") {
    const trimmed = ts.trim();
    if (!trimmed) return null;
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      const n = Number(trimmed);
      if (!Number.isFinite(n)) return null;
      return n < 1e12 ? n * 1000 : n;
    }
    const parsed = Date.parse(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

/**
 * Select the newest history record by its actual `timestamp` field.
 * Never assumes push-key ordering. Preserves the original record as-is
 * (including its original timestamp).
 */
export const selectNewestHistoryRecord = (historyVal) => {
  if (!historyVal || typeof historyVal !== "object") return null;
  let best = null;
  let bestTime = null;
  for (const key of Object.keys(historyVal)) {
    const rec = historyVal[key];
    if (!rec || typeof rec !== "object") continue;
    const t = parseRecordTime(rec);
    if (t == null) {
      // No valid timestamp: keep as last resort only if nothing better exists.
      if (best == null) best = rec;
      continue;
    }
    if (bestTime == null || t > bestTime) {
      bestTime = t;
      best = rec;
    }
  }
  return best;
};

/**
 * One-time read of mastiguard/animals/{cowId}/history -> newest record by timestamp.
 * Returns null when no history.
 */
export const getLatestHistory = async (cowId) => {
  const db = getHardwareDb();
  const historyRef = ref(db, `mastiguard/animals/${cowId}/history`);
  const snap = await get(historyRef);
  if (!snap.exists()) return null;
  return selectNewestHistoryRecord(snap.val());
};

export const subscribeToStation = (onData, onError) => {
  const db = getHardwareDb();
  const stationRef = ref(db, "station");
  return onValue(
    stationRef,
    (snap) => onData(snap.exists() ? snap.val() : null),
    (err) => onError && onError(err)
  );
};
