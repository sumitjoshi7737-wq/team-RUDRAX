// Local demo alerts ONLY — never written to Firebase.
// Text is key-based: components render t(titleKey, titleVars) so the COW ID
// (e.g. COW001) stays unchanged while the human-readable message translates.
// ALT-101 is the single COW001 high-risk demo alert — do NOT remove it.
export const initialAlerts = [
  {
    id: "ALT-101",
    categoryKey: "highRisk",
    titleKey: "highMastitisRiskDetected",
    titleVars: { cowId: "COW001" },
    descKey: "highMastitisRiskDesc",
    descVars: { cowId: "COW001" },
    appendDemoNote: true,
    timeKey: "minutesAgo",
    timeVars: { count: 15 },
    animalId: "COW001",
    severity: "high",
    read: false,
    actionKey: "pleaseCheckAnimal"
  },
  {
    id: "ALT-104",
    categoryKey: "sensor",
    titleKey: "milkSensorNeedsAttention",
    descKey: "milkingLineUnusual",
    timeKey: "hoursAgo",
    timeVars: { count: 4 },
    animalId: null,
    severity: "sensor",
    read: true,
    actionKey: "cleanOrCheckSensor"
  },
  {
    id: "ALT-107",
    categoryKey: "sensor",
    titleKey: "cameraIsOnline",
    descKey: "cameraGatewayConnected",
    timeKey: "hoursAgo",
    timeVars: { count: 12 },
    animalId: null,
    severity: "sensor",
    read: true,
    actionKey: "noActionNeeded"
  }
];