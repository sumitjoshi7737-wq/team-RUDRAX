export const initialAlerts = [
  {
    id: "ALT-101",
    category: "High Risk",
    title: "Animal A104 may need attention.",
    description: "AI shows high risk (82%). Milk conductivity and milk temperature have changed.",
    time: "15 minutes ago",
    animalId: "A104",
    severity: "high", // 'high' | 'medium' | 'sensor'
    read: false,
    actionRequired: "Please check this animal."
  },
  {
    id: "ALT-102",
    category: "High Risk",
    title: "Animal A101 may need attention.",
    description: "Risk is increasing for Animal A101 (78%). Milk yield decreased and milk conductivity changed.",
    time: "45 minutes ago",
    animalId: "A101",
    severity: "high",
    read: false,
    actionRequired: "Please check this animal."
  },
  {
    id: "ALT-103",
    category: "Needs Attention",
    title: "Milk data has changed for Animal A106.",
    description: "AI shows medium risk (61%). Milk conductivity changed over recent milkings.",
    time: "2 hours ago",
    animalId: "A106",
    severity: "medium",
    read: false,
    actionRequired: "Check during evening milking."
  },
  {
    id: "ALT-104",
    category: "Sensor",
    title: "Milk sensor needs attention.",
    description: "Milking line sensor reported unusual readings during morning milking.",
    time: "4 hours ago",
    animalId: null,
    severity: "sensor",
    read: true,
    actionRequired: "Clean or check milk sensor."
  },
  {
    id: "ALT-105",
    category: "High Risk",
    title: "Risk is increasing for Animal A112.",
    description: "AI shows higher risk (76%). Milk temperature is warmer than normal.",
    time: "6 hours ago",
    animalId: "A112",
    severity: "high",
    read: true,
    actionRequired: "Please check this animal."
  },
  {
    id: "ALT-106",
    category: "Needs Attention",
    title: "Milk data has changed for Animal A110.",
    description: "AI shows medium risk (48%). Slight change in milk yield and conductivity.",
    time: "9 hours ago",
    animalId: "A110",
    severity: "medium",
    read: true,
    actionRequired: "Observe during next milking."
  },
  {
    id: "ALT-107",
    category: "Sensor",
    title: "Camera is online.",
    description: "Camera and sensor gateway are connected and working normally.",
    time: "12 hours ago",
    animalId: null,
    severity: "sensor",
    read: true,
    actionRequired: "No action needed."
  }
];
