import { useEffect, useState } from "react";
import { LIVE_COW_IDS, getLiveConfigStatus, subscribeToLatest, getLatestHistory } from "../services/firebaseAnimals";

// Static identity only — NEVER sensor/risk values.
const ANIMAL_META = {
  COW001: { tag: "Bella", breed: "Holstein Friesian", age: "4.5 yrs", lactation: "3rd Lactation" },
  COW002: { tag: "Luna", breed: "Holstein Friesian", age: "5.1 yrs", lactation: "4th Lactation" },
  COW003: { tag: "Ganga", breed: "Gir", age: "4.0 yrs", lactation: "2nd Lactation" },
  COW004: { tag: "Yamuna", breed: "Sahiwal", age: "5.3 yrs", lactation: "4th Lactation" },
  COW005: { tag: "Nandi", breed: "Holstein Friesian", age: "3.8 yrs", lactation: "2nd Lactation" },
  COW006: { tag: "Kaveri", breed: "Gir", age: "4.7 yrs", lactation: "3rd Lactation" },
  COW007: { tag: "Godavari", breed: "Sahiwal", age: "5.0 yrs", lactation: "3rd Lactation" },
  COW008: { tag: "Krishna", breed: "Holstein Friesian", age: "4.2 yrs", lactation: "3rd Lactation" },
  COW009: { tag: "Tulsi", breed: "Gir", age: "3.5 yrs", lactation: "2nd Lactation" },
  COW010: { tag: "Radha", breed: "Sahiwal", age: "4.9 yrs", lactation: "4th Lactation" },
};

const numOrNull = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export const mapRiskLevel = (rawLevel, finalRisk) => {
  const lvl = String(rawLevel || "").toUpperCase();
  if (lvl.includes("HIGH")) return "High Risk";
  if (lvl.includes("MED") || lvl.includes("MID") || lvl.includes("MODERATE") || lvl.includes("ATTENTION")) return "Needs Attention";
  if (lvl.includes("LOW") || lvl.includes("HEALTH")) return "Low Risk";
  const score = Number(finalRisk);
  if (Number.isFinite(score)) {
    if (score >= 70) return "High Risk";
    if (score >= 45) return "Needs Attention";
    return "Low Risk";
  }
  return "Low Risk";
};

const statusForConductivity = (v) => {
  if (v == null) return "Normal";
  if (v >= 6.5) return "High Risk";
  if (v >= 5.7) return "Needs Attention";
  return "Normal";
};

const statusForTemp = (v) => {
  if (v == null) return "Normal";
  if (v >= 39.4) return "High Risk";
  return "Normal";
};

const statusForScc = (v) => {
  if (v == null) return "Normal";
  if (v >= 400) return "High Risk";
  if (v >= 200) return "Needs Attention";
  return "Healthy";
};

const statusForLactose = (v) => {
  if (v == null) return "Normal";
  if (v < 4.3) return "High Risk";
  if (v < 4.6) return "Needs Attention";
  return "Healthy";
};

const statusForRisk = (v) => {
  if (v == null) return "Normal";
  if (v >= 70) return "High Risk";
  if (v >= 45) return "Needs Attention";
  return "Low Risk";
};
// Tag raw Firebase record with its source without mutating caller's object.
const tagSource = (raw, source) => {
  if (!raw || typeof raw !== "object") return raw;
  return { ...raw, __dataSource: source };
};

export const normalizeLiveAnimal = (cowId, raw, fallbackSource) => {
  if (!raw || typeof raw !== "object") return null;
  const sensor = raw.sensor_data || {};
  const finalRisk = numOrNull(raw.final_risk);
  const imageRisk = numOrNull(raw.image_risk);
  const sensorRisk = numOrNull(raw.sensor_risk);
  const milkYield = numOrNull(sensor.milk_yield_kg_day);
  const milkTemperature = numOrNull(sensor.milk_temp_C);
  const milkConductivity = numOrNull(sensor.conductivity_mS_cm);
  const sccRaw = numOrNull(sensor.scc_cells_per_mL);
  // Existing UI uses x10^3/mL units (dummy 720 = 720,000 cells/mL).
  // Convert Firebase raw cells/mL to same units so thresholds + labels stay correct.
  const scc = sccRaw != null ? Math.round((sccRaw / 1000) * 10) / 10 : null;
  const lactose = numOrNull(sensor.lactose_percent);
  const timestamp = raw.timestamp || null;
  if (finalRisk == null || !raw.risk_level) return null;
  const meta = ANIMAL_META[cowId] || { tag: cowId, breed: "", age: "", lactation: "" };
  const riskLevel = mapRiskLevel(raw.risk_level, finalRisk);
  return {
    id: raw.cow_id || cowId, ...meta, riskScore: finalRisk, finalRisk, imageRisk, sensorRisk,
    riskLevel, rawRiskLevel: raw.risk_level, milkYield, milkTemperature, milkConductivity,
    scc, lactose, timestamp, live: true,
    // Data provenance: "latest" | "history". Old field `live` kept for compatibility.
    dataSource: raw.__dataSource || fallbackSource || "latest",
    isHistorical: (raw.__dataSource || fallbackSource || "latest") === "history",
    riskFactors: [
      { name: "Milk conductivity changed", value: milkConductivity != null ? `${milkConductivity} mS/cm` : "—", status: statusForConductivity(milkConductivity) },
      { name: "Milk temperature changed", value: milkTemperature != null ? `${milkTemperature} °C` : "—", status: statusForTemp(milkTemperature) },
      { name: "Image Risk (Raspberry Pi)", value: imageRisk != null ? `${imageRisk}%` : "—", status: statusForRisk(imageRisk) },
      { name: "Sensor Risk", value: sensorRisk != null ? `${sensorRisk}%` : "—", status: statusForRisk(sensorRisk) },
      { name: "Milk yield", value: milkYield != null ? `${milkYield} kg/day` : "—", status: finalRisk >= 70 ? "Needs Attention" : "Healthy" },
    ],
  };
};

export const getLiveHerdSummary = (animals) => {
  const list = Array.isArray(animals) ? animals : [];
  const total = list.length;
  const healthy = list.filter((a) => a.riskScore < 45).length;
  const mediumRisk = list.filter((a) => a.riskScore >= 45 && a.riskScore < 70).length;
  const highRisk = list.filter((a) => a.riskScore >= 70).length;
  const avgYield = total > 0 ? (list.reduce((s, a) => s + (Number(a.milkYield) || 0), 0) / total).toFixed(1) : "0.0";
  return { total, healthy, lowRisk: healthy, mediumRisk, highRisk, needsAttention: mediumRisk + highRisk, atRisk: mediumRisk + highRisk, avgYield };
};

const readErrorMessage = (err) => err?.message || "Unable to load live animal data.";

export const useLiveAnimals = (cowIds = LIVE_COW_IDS) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = cowIds.join(",");
  useEffect(() => {
    const status = getLiveConfigStatus();
    if (!status.ok) { setError(status.message); setLoading(false); return undefined; }
    let cancelled = false;
    // Per-cow state: { latest, history, historyLoading }. Never cleared on quiet periods.
    const stateByCow = {};
    cowIds.forEach((id) => { stateByCow[id] = { latest: undefined, history: undefined, historyLoading: false }; });
    let settledCount = 0;
    const settled = {};
    const applyUpdate = () => {
      if (cancelled) return;
      const list = cowIds.map((id) => {
        const st = stateByCow[id];
        if (!st) return null;
        if (st.latest != null) return normalizeLiveAnimal(id, tagSource(st.latest, "latest"));
        if (st.historyLoading) return null; // still resolving fallback — don't error yet
        if (st.history != null) return normalizeLiveAnimal(id, tagSource(st.history, "history"));
        return null;
      }).filter(Boolean);
      list.sort((a, b) => b.riskScore - a.riskScore);
      setAnimals(list);
    };
    const maybeFinish = () => {
      if (cancelled) return;
      if (settledCount >= cowIds.length) {
        setLoading(false);
        // Error ONLY when a cow has neither latest nor history (and not still loading).
        // latest=null + history available = valid fallback, not an error.
        const valid = cowIds.filter((c) => {
          const st = stateByCow[c];
          return normalizeLiveAnimal(c, st.latest != null ? tagSource(st.latest, "latest") : st.history != null ? tagSource(st.history, "history") : null) != null;
        });
        if (valid.length === 0) setError("Unable to load live animal data.");
        else setError(null);
      }
    };
    const markSettled = (id) => {
      if (!settled[id]) { settled[id] = true; settledCount += 1; }
      maybeFinish();
    };
    const loadHistoryFallback = async (id) => {
      const st = stateByCow[id];
      if (!st || st.historyLoading) return;
      st.historyLoading = true;
      try {
        const hist = await getLatestHistory(id);
        if (cancelled) return;
        st.history = hist;
        st.historyLoading = false;
        applyUpdate();
        markSettled(id);
      } catch (err) {
        if (cancelled) return;
        st.historyLoading = false;
        // Genuine read failure (permission/network) surfaces as error.
        setError(readErrorMessage(err));
        markSettled(id);
      }
    };
    let unsubs = [];
    try {
      unsubs = cowIds.map((id) => subscribeToLatest(id,
        (raw) => {
          const st = stateByCow[id];
          if (!st) return;
          if (raw != null) {
            // Latest arrived (initial or later) — immediately replaces history fallback.
            st.latest = raw;
            if (cancelled) return;
            applyUpdate();
            markSettled(id);
            setError((prev) => {
              const valid = cowIds.filter((c) => {
                const s = stateByCow[c];
                return normalizeLiveAnimal(c, s.latest != null ? tagSource(s.latest, "latest") : s.history != null ? tagSource(s.history, "history") : null) != null;
              });
              return valid.length === 0 ? prev : null;
            });
          } else {
            // latest missing -> fallback to newest history record (once per missing episode).
            st.latest = null;
            if (cancelled) return;
            if (st.history !== undefined || st.historyLoading) {
              applyUpdate();
              markSettled(id);
            } else {
              loadHistoryFallback(id);
            }
          }
        },
        (err) => { if (!cancelled) { setError(readErrorMessage(err)); markSettled(id); } }
      ));
    } catch (err) { setError(readErrorMessage(err)); setLoading(false); return undefined; }
    return () => { cancelled = true; unsubs.forEach((u) => { try { if (typeof u === "function") u(); } catch { /* ignore */ } }); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { animals, loading, error };
};

export const useLiveAnimal = (cowId) => {
  const upper = String(cowId || "").toUpperCase();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const status = getLiveConfigStatus();
    if (!upper) { setError("Unable to load live animal data."); setLoading(false); return undefined; }
    if (!status.ok) { setError(status.message); setLoading(false); return undefined; }
    let cancelled = false;
    let unsub = null;
    let historyLoading = false;
    const loadHistoryFallback = async () => {
      if (historyLoading) return;
      historyLoading = true;
      try {
        const hist = await getLatestHistory(upper);
        if (cancelled) return;
        historyLoading = false;
        if (hist == null) {
          // Both latest + history missing: keep empty/error state, no dummy data.
          setAnimal(null);
          setError("Unable to load live animal data.");
          setLoading(false);
          return;
        }
        const norm = normalizeLiveAnimal(upper, tagSource(hist, "history"));
        if (!norm) { setAnimal(null); setError("Unable to load live animal data."); setLoading(false); return; }
        setAnimal(norm); setError(null); setLoading(false);
      } catch (err) {
        if (cancelled) return;
        historyLoading = false;
        setError(readErrorMessage(err));
        setLoading(false);
      }
    };
    try {
      unsub = subscribeToLatest(upper,
        (raw) => {
          if (cancelled) return;
          if (raw != null) {
            // Latest wins immediately — replaces any history fallback.
            const norm = normalizeLiveAnimal(upper, tagSource(raw, "latest"));
            if (!norm) { setAnimal(null); setError("Unable to load live animal data."); setLoading(false); return; }
            setAnimal(norm); setError(null); setLoading(false);
            return;
          }
          // latest null -> newest history record. Quiet periods keep last data.
          setAnimal((prev) => prev);
          loadHistoryFallback();
        },
        (err) => { if (!cancelled) { setError(readErrorMessage(err)); setLoading(false); } }
      );
    } catch (err) { setError(readErrorMessage(err)); setLoading(false); return undefined; }
    return () => { cancelled = true; try { if (typeof unsub === "function") unsub(); } catch { /* ignore */ } };
  }, [upper]);
  return { animal, loading, error };
};
