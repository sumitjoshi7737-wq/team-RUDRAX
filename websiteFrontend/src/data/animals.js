// DEMO DATA - Two-cow demo (SIMULATED values, not real sensor measurements).
// COW001 = mastitis/high-risk demo cow | COW002 = normal/low-risk demo cow.
export const animalsData = [
  {
    id: "COW001",
    tag: "Bella",
    breed: "Holstein Friesian",
    age: "4.5 yrs",
    lactation: "3rd Lactation",
    milkYield: 21.4, // L/day
    previousYield: 28.5,
    riskScore: 78,
    riskLevel: "High Risk",
    statusText: "Needs Attention",
    milkTemperature: 39.6, // °C
    milkConductivity: 6.8, // mS/cm (demo)
    scc: 720, // x10^3 cells/mL (Spectroscopy, demo)
    lactose: 4.0, // % (demo)
    activity: "Activity decreased (-28%)",
    activityStatus: "Low",
    history: "Had higher risk in previous lactation cycle",
    environmentalTemp: "29.2°C",
    humidity: "72%",
    cameraStatus: "Online",
    sensorStatus: {
      camera: "Online",
      milkSensor: "Online",
      gateway: "Online"
    },
    behaviour: {
      eating: "Less than usual",
      activity: "Less active",
      movement: "Less movement",
      waterDrinking: "Normal"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "6.8 mS/cm", status: "High Risk", note: "Higher conductivity than normal baseline" },
      { name: "Milk temperature changed", value: "39.6 °C", status: "High Risk", note: "Milk is warmer than usual (+1.1°C)" },
      { name: "Milk yield decreased", value: "21.4 L", status: "Needs Attention", note: "Yield dropped by about 25% over last 36 hours" },
      { name: "Activity changed", value: "Less active", status: "High Risk", note: "The animal is less active than usual" },
      { name: "Eating changed", value: "Less than usual", status: "High Risk", note: "The animal is eating less than usual" },
      { name: "Previous health history", value: "1 past event", status: "Needs Attention", note: "Had higher risk in previous season" }
    ],
    forecast: [
      { day: "Today", risk: 78, forecast: 78 },
      { day: "Day 2", risk: null, forecast: 83 },
      { day: "Day 4", risk: null, forecast: 86 },
      { day: "Day 7", risk: null, forecast: 74 },
      { day: "Day 10", risk: null, forecast: 65 },
      { day: "Day 14", risk: null, forecast: 50 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 22, yield: 28.6, conductivity: 5.1, temp: 38.5 },
      { day: "Day -5", risk: 24, yield: 28.4, conductivity: 5.2, temp: 38.5 },
      { day: "Day -4", risk: 30, yield: 27.9, conductivity: 5.4, temp: 38.6 },
      { day: "Day -3", risk: 42, yield: 26.5, conductivity: 5.8, temp: 38.9 },
      { day: "Day -2", risk: 58, yield: 24.2, conductivity: 6.2, temp: 39.2 },
      { day: "Yesterday", risk: 70, yield: 22.8, conductivity: 6.5, temp: 39.4 },
      { day: "Today", risk: 78, yield: 21.4, conductivity: 6.8, temp: 39.6 }
    ],
    notes: "Risk is high. Please check this animal during the next milking."
  },
  {
    id: "COW002",
    tag: "Luna",
    breed: "Holstein Friesian",
    age: "5.1 yrs",
    lactation: "4th Lactation",
    milkYield: 30.5,
    previousYield: 31.0,
    riskScore: 16,
    riskLevel: "Low Risk",
    statusText: "Healthy",
    milkTemperature: 38.5,
    milkConductivity: 5.0, // mS/cm (demo)
    scc: 140, // x10^3 cells/mL (Spectroscopy, demo)
    lactose: 4.9, // % (demo)
    activity: "Normal & active",
    activityStatus: "Good",
    history: "Good health history, regular high yield",
    environmentalTemp: "28.0°C",
    humidity: "65%",
    cameraStatus: "Online",
    sensorStatus: {
      camera: "Online",
      milkSensor: "Online",
      gateway: "Online"
    },
    behaviour: {
      eating: "Normal",
      activity: "Normal",
      movement: "Normal",
      waterDrinking: "Normal"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "5.0 mS/cm", status: "Healthy", note: "Normal conductivity level" },
      { name: "Milk temperature changed", value: "38.5 °C", status: "Healthy", note: "Normal temperature" },
      { name: "Milk yield decreased", value: "30.5 L", status: "Healthy", note: "Steady high yield" },
      { name: "Activity changed", value: "Normal", status: "Healthy", note: "Active feeding and rumination" },
      { name: "Previous health history", value: "Clean record", status: "Healthy", note: "No past issues" }
    ],
    forecast: [
      { day: "Today", risk: 16, forecast: 16 },
      { day: "Day 2", risk: null, forecast: 15 },
      { day: "Day 4", risk: null, forecast: 16 },
      { day: "Day 7", risk: null, forecast: 15 },
      { day: "Day 10", risk: null, forecast: 13 },
      { day: "Day 14", risk: null, forecast: 14 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 15, yield: 30.8, conductivity: 5.0, temp: 38.4 },
      { day: "Day -5", risk: 16, yield: 31.0, conductivity: 5.0, temp: 38.5 },
      { day: "Day -4", risk: 14, yield: 30.6, conductivity: 4.9, temp: 38.5 },
      { day: "Day -3", risk: 15, yield: 30.7, conductivity: 5.1, temp: 38.5 },
      { day: "Day -2", risk: 17, yield: 30.5, conductivity: 5.0, temp: 38.5 },
      { day: "Yesterday", risk: 16, yield: 30.4, conductivity: 5.0, temp: 38.5 },
      { day: "Today", risk: 16, yield: 30.5, conductivity: 5.0, temp: 38.5 }
    ],
    notes: "Risk is low. Animal is healthy."
  }
];

// Helper for herd summary
export const getHerdSummary = () => {
  const total = animalsData.length;
  const healthy = animalsData.filter(a => a.riskScore < 45).length; // Healthy / Low Risk
  const lowRisk = animalsData.filter(a => a.riskScore < 30).length;
  const mediumRisk = animalsData.filter(a => a.riskScore >= 45 && a.riskScore < 70).length; // Needs Attention / Medium Risk
  const highRisk = animalsData.filter(a => a.riskScore >= 70).length; // High Risk
  const needsAttention = mediumRisk + highRisk;

  // Count animals with behavioural changes (e.g. eating less or less active)
  const behaviourChangesCount = animalsData.filter(a => 
    a.behaviour && (
      a.behaviour.eating !== "Normal" ||
      a.behaviour.activity !== "Normal" ||
      a.behaviour.movement !== "Normal" ||
      a.behaviour.waterDrinking !== "Normal"
    )
  ).length;

  const avgYield = (animalsData.reduce((acc, curr) => acc + curr.milkYield, 0) / total).toFixed(1);
  const avgTemp = (animalsData.reduce((acc, curr) => acc + curr.milkTemperature, 0) / total).toFixed(1);
  const avgCond = (animalsData.reduce((acc, curr) => acc + curr.milkConductivity, 0) / total).toFixed(2);

  return {
    total,
    healthy,
    lowRisk,
    mediumRisk,
    highRisk,
    needsAttention,
    atRisk: needsAttention,
    behaviourChangesCount,
    avgYield,
    avgTemp,
    avgCond
  };
};

export const herdRiskTrend = [
  { day: "Mon", avgRisk: 19 },
  { day: "Tue", avgRisk: 20 },
  { day: "Wed", avgRisk: 22 },
  { day: "Thu", avgRisk: 29 },
  { day: "Fri", avgRisk: 38 },
  { day: "Sat", avgRisk: 43 },
  { day: "Today", avgRisk: 47 }
];

export const herdYieldTrend = [
  { day: "Mon", avgYield: 29.7 },
  { day: "Tue", avgYield: 29.7 },
  { day: "Wed", avgYield: 29.3 },
  { day: "Thu", avgYield: 28.6 },
  { day: "Fri", avgYield: 27.4 },
  { day: "Sat", avgYield: 26.6 },
  { day: "Today", avgYield: 26.0 }
];

export const herdConductivityTrend = [
  { day: "Mon", avgCond: 5.1 },
  { day: "Tue", avgCond: 5.2 },
  { day: "Wed", avgCond: 5.4 },
  { day: "Thu", avgCond: 5.5 },
  { day: "Fri", avgCond: 5.6 },
  { day: "Sat", avgCond: 5.8 },
  { day: "Today", avgCond: 5.9 }
];
