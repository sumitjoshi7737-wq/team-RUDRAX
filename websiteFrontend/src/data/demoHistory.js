// DEMO-ONLY local history (NOT Firebase).
// Previous 6 days per cow for 7-day graph demo.
// Today (Day 7) ALWAYS comes from real Firebase RTDB:
//   mastiguard/animals/${cowId}/history (newest by `timestamp`).
// NEVER write this file to Firebase. NEVER use it as Today's value.
//
// Distribution:
// - COW001: HIGH-RISK demo progression (increasing toward high risk).
// - COW002-COW007: NORMAL/HEALTHY stable low values (5-25%).
// - COW008-COW010: LOW-RISK slightly higher but still low (20-40%).
//
// Shape per entry: { day: "Day -6" | ... | "Day -1", risk: number }
// Helper buildSevenDayTrend() merges 6 demo points + 1 live Firebase Today point.

export const DEMO_COW_IDS = [
  "COW001",
  "COW002",
  "COW003",
  "COW004",
  "COW005",
  "COW006",
  "COW007",
  "COW008",
  "COW009",
  "COW010",
];

const six = (risks) => {
  const labels = ["Day -6", "Day -5", "Day -4", "Day -3", "Day -2", "Day -1"];
  return labels.map((day, i) => ({ day, risk: risks[i] }));
};

export const demoHistory = {
  // High-risk demonstration cow: smooth increasing pattern.
  COW001: six([30, 38, 47, 57, 67, 76]),
  // Normal / healthy cows: stable low values 5-25%.
  COW002: six([12, 15, 14, 16, 13, 15]),
  COW003: six([10, 12, 11, 13, 12, 14]),
  COW004: six([18, 16, 17, 15, 16, 18]),
  COW005: six([8, 10, 9, 11, 10, 12]),
  COW006: six([20, 19, 21, 18, 20, 19]),
  COW007: six([14, 13, 15, 14, 16, 15]),
  // Low-risk cows: slightly higher but still low 20-40%.
  COW008: six([28, 30, 27, 32, 30, 33]),
  COW009: six([25, 27, 29, 26, 28, 31]),
  COW010: six([32, 30, 33, 31, 34, 32]),
};

export const getDemoHistoryForCow = (cowId) => {
  const id = String(cowId || "").toUpperCase();
  return demoHistory[id] ? [...demoHistory[id]] : [];
};

/**
 * Build 7-point trend for the existing RiskTrendChart (recharts).
 * - First 6 points: local demoHistory (DEMO source).
 * - Last point: real Firebase final_risk (REAL source, auto-updates via listener).
 * Returns array of { day, risk, source } where source is "demo" | "live".
 * If todayRisk is null/undefined, the Today point is omitted (never faked).
 */
export const buildSevenDayTrend = (cowId, todayRisk) => {
  const history = getDemoHistoryForCow(cowId).map((p) => ({
    day: p.day,
    risk: p.risk,
    source: "demo",
  }));
  // Never fake Today: omit when Firebase value is missing (null/undefined/"").
  if (todayRisk === null || todayRisk === undefined || todayRisk === "") return history;
  const n = Number(todayRisk);
  if (Number.isFinite(n)) {
    history.push({ day: "Today", risk: n, source: "live" });
  }
  return history;
};
