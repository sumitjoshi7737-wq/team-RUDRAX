export const animalsData = [
  {
    id: "A101",
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
    milkConductivity: 6.8, // mS/cm
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
    id: "A102",
    tag: "Daisy",
    breed: "Jersey",
    age: "3.2 yrs",
    lactation: "2nd Lactation",
    milkYield: 18.2,
    previousYield: 21.0,
    riskScore: 54,
    riskLevel: "Needs Attention",
    statusText: "Needs Attention",
    milkTemperature: 38.9,
    milkConductivity: 5.9,
    activity: "Slightly less active (-12%)",
    activityStatus: "Moderate",
    history: "Good previous health record",
    environmentalTemp: "28.5°C",
    humidity: "68%",
    cameraStatus: "Online",
    sensorStatus: {
      camera: "Online",
      milkSensor: "Online",
      gateway: "Online"
    },
    behaviour: {
      eating: "Normal",
      activity: "Less active",
      movement: "Normal",
      waterDrinking: "Normal"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "5.9 mS/cm", status: "Needs Attention", note: "Small increase in morning milk" },
      { name: "Milk temperature changed", value: "38.9 °C", status: "Normal", note: "Within normal limits" },
      { name: "Milk yield decreased", value: "18.2 L", status: "Needs Attention", note: "Slightly less milk produced" },
      { name: "Activity changed", value: "Less active", status: "Needs Attention", note: "Slightly less active than usual" },
      { name: "Previous health history", value: "Clean record", status: "Low Risk", note: "No previous health issues" }
    ],
    forecast: [
      { day: "Today", risk: 54, forecast: 54 },
      { day: "Day 2", risk: null, forecast: 58 },
      { day: "Day 4", risk: null, forecast: 60 },
      { day: "Day 7", risk: null, forecast: 46 },
      { day: "Day 10", risk: null, forecast: 38 },
      { day: "Day 14", risk: null, forecast: 30 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 18, yield: 21.2, conductivity: 5.2, temp: 38.5 },
      { day: "Day -5", risk: 20, yield: 21.0, conductivity: 5.2, temp: 38.6 },
      { day: "Day -4", risk: 25, yield: 20.8, conductivity: 5.3, temp: 38.6 },
      { day: "Day -3", risk: 32, yield: 20.1, conductivity: 5.5, temp: 38.7 },
      { day: "Day -2", risk: 44, yield: 19.4, conductivity: 5.7, temp: 38.8 },
      { day: "Yesterday", risk: 50, yield: 18.8, conductivity: 5.8, temp: 38.9 },
      { day: "Today", risk: 54, yield: 18.2, conductivity: 5.9, temp: 38.9 }
    ],
    notes: "Some health data has changed. Keep under observation during evening milking."
  },
  {
    id: "A103",
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
    milkConductivity: 5.0,
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
  },
  {
    id: "A104",
    tag: "Rosie",
    breed: "Guernsey",
    age: "2.8 yrs",
    lactation: "1st Lactation",
    milkYield: 16.5,
    previousYield: 22.0,
    riskScore: 82,
    riskLevel: "High Risk",
    statusText: "Needs Attention",
    milkTemperature: 39.8,
    milkConductivity: 7.2,
    activity: "Restless & less active",
    activityStatus: "Low",
    history: "First-calver heifer",
    environmentalTemp: "29.5°C",
    humidity: "75%",
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
      waterDrinking: "Less than usual"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "7.2 mS/cm", status: "High Risk", note: "High conductivity reading" },
      { name: "Milk temperature changed", value: "39.8 °C", status: "High Risk", note: "Milk is noticeably warmer than usual" },
      { name: "Milk yield decreased", value: "16.5 L", status: "High Risk", note: "Dropped by 25% in 24 hours" },
      { name: "Activity changed", value: "Less active", status: "High Risk", note: "The animal is moving much less" },
      { name: "Eating changed", value: "Less than usual", status: "High Risk", note: "The animal is eating and drinking less than usual" },
      { name: "Previous health history", value: "First lactation", status: "Needs Attention", note: "First-calver adjustment" }
    ],
    forecast: [
      { day: "Today", risk: 82, forecast: 82 },
      { day: "Day 2", risk: null, forecast: 88 },
      { day: "Day 4", risk: null, forecast: 89 },
      { day: "Day 7", risk: null, forecast: 76 },
      { day: "Day 10", risk: null, forecast: 62 },
      { day: "Day 14", risk: null, forecast: 48 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 19, yield: 22.5, conductivity: 5.0, temp: 38.5 },
      { day: "Day -5", risk: 22, yield: 22.1, conductivity: 5.2, temp: 38.6 },
      { day: "Day -4", risk: 35, yield: 21.3, conductivity: 5.6, temp: 38.8 },
      { day: "Day -3", risk: 52, yield: 19.8, conductivity: 6.1, temp: 39.1 },
      { day: "Day -2", risk: 68, yield: 18.2, conductivity: 6.6, temp: 39.4 },
      { day: "Yesterday", risk: 76, yield: 17.1, conductivity: 6.9, temp: 39.6 },
      { day: "Today", risk: 82, yield: 16.5, conductivity: 7.2, temp: 39.8 }
    ],
    notes: "Risk is high. This animal may need attention. Please check this animal."
  },
  {
    id: "A105",
    tag: "Molly",
    breed: "Ayrshire",
    age: "3.9 yrs",
    lactation: "2nd Lactation",
    milkYield: 25.1,
    previousYield: 26.2,
    riskScore: 28,
    riskLevel: "Low Risk",
    statusText: "Healthy",
    milkTemperature: 38.6,
    milkConductivity: 5.2,
    activity: "Normal",
    activityStatus: "Good",
    history: "Clean health record",
    environmentalTemp: "28.1°C",
    humidity: "64%",
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
      { name: "Milk conductivity changed", value: "5.2 mS/cm", status: "Healthy", note: "Stable and normal" },
      { name: "Milk temperature changed", value: "38.6 °C", status: "Healthy", note: "Standard temperature" },
      { name: "Milk yield decreased", value: "25.1 L", status: "Healthy", note: "Consistent yield" },
      { name: "Activity changed", value: "Normal", status: "Healthy", note: "Normal daily movement" },
      { name: "Previous health history", value: "Clean record", status: "Healthy", note: "No past issues" }
    ],
    forecast: [
      { day: "Today", risk: 28, forecast: 28 },
      { day: "Day 2", risk: null, forecast: 26 },
      { day: "Day 4", risk: null, forecast: 23 },
      { day: "Day 7", risk: null, forecast: 20 },
      { day: "Day 10", risk: null, forecast: 20 },
      { day: "Day 14", risk: null, forecast: 18 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 25, yield: 25.8, conductivity: 5.1, temp: 38.5 },
      { day: "Day -5", risk: 26, yield: 25.6, conductivity: 5.1, temp: 38.5 },
      { day: "Day -4", risk: 27, yield: 25.4, conductivity: 5.2, temp: 38.6 },
      { day: "Day -3", risk: 30, yield: 25.0, conductivity: 5.2, temp: 38.6 },
      { day: "Day -2", risk: 29, yield: 25.2, conductivity: 5.2, temp: 38.6 },
      { day: "Yesterday", risk: 28, yield: 25.0, conductivity: 5.2, temp: 38.6 },
      { day: "Today", risk: 28, yield: 25.1, conductivity: 5.2, temp: 38.6 }
    ],
    notes: "Risk is low. Health data is stable."
  },
  {
    id: "A106",
    tag: "Buttercup",
    breed: "Brown Swiss",
    age: "4.8 yrs",
    lactation: "3rd Lactation",
    milkYield: 22.0,
    previousYield: 24.5,
    riskScore: 61,
    riskLevel: "Needs Attention",
    statusText: "Needs Attention",
    milkTemperature: 39.1,
    milkConductivity: 6.1,
    activity: "Slightly less active (-10%)",
    activityStatus: "Moderate",
    history: "One previous health note in lactation 1",
    environmentalTemp: "28.8°C",
    humidity: "69%",
    cameraStatus: "Online",
    sensorStatus: {
      camera: "Online",
      milkSensor: "Online",
      gateway: "Online"
    },
    behaviour: {
      eating: "Less than usual",
      activity: "Less active",
      movement: "Normal",
      waterDrinking: "Normal"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "6.1 mS/cm", status: "Needs Attention", note: "Moderate increase in conductivity" },
      { name: "Milk temperature changed", value: "39.1 °C", status: "Needs Attention", note: "Slightly warmer (+0.5°C)" },
      { name: "Milk yield decreased", value: "22.0 L", status: "Needs Attention", note: "Small drop in yield" },
      { name: "Activity changed", value: "Less active", status: "Needs Attention", note: "Slightly less active than usual" },
      { name: "Previous health history", value: "1 past event", status: "Needs Attention", note: "Resolved in previous cycle" }
    ],
    forecast: [
      { day: "Today", risk: 61, forecast: 61 },
      { day: "Day 2", risk: null, forecast: 66 },
      { day: "Day 4", risk: null, forecast: 65 },
      { day: "Day 7", risk: null, forecast: 51 },
      { day: "Day 10", risk: null, forecast: 42 },
      { day: "Day 14", risk: null, forecast: 35 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 20, yield: 24.8, conductivity: 5.2, temp: 38.5 },
      { day: "Day -5", risk: 25, yield: 24.5, conductivity: 5.3, temp: 38.6 },
      { day: "Day -4", risk: 34, yield: 24.0, conductivity: 5.5, temp: 38.7 },
      { day: "Day -3", risk: 45, yield: 23.4, conductivity: 5.8, temp: 38.9 },
      { day: "Day -2", risk: 52, yield: 22.9, conductivity: 5.9, temp: 39.0 },
      { day: "Yesterday", risk: 58, yield: 22.3, conductivity: 6.0, temp: 39.0 },
      { day: "Today", risk: 61, yield: 22.0, conductivity: 6.1, temp: 39.1 }
    ],
    notes: "Risk is medium. Monitor milk data over the next 48 hours."
  },
  {
    id: "A107",
    tag: "Clara",
    breed: "Jersey",
    age: "2.5 yrs",
    lactation: "1st Lactation",
    milkYield: 19.8,
    previousYield: 20.1,
    riskScore: 12,
    riskLevel: "Low Risk",
    statusText: "Healthy",
    milkTemperature: 38.4,
    milkConductivity: 4.8,
    activity: "Normal & active",
    activityStatus: "Good",
    history: "No health issues",
    environmentalTemp: "28.0°C",
    humidity: "63%",
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
      { name: "Milk conductivity changed", value: "4.8 mS/cm", status: "Healthy", note: "Normal" },
      { name: "Milk temperature changed", value: "38.4 °C", status: "Healthy", note: "Normal" },
      { name: "Milk yield decreased", value: "19.8 L", status: "Healthy", note: "Steady production" },
      { name: "Activity changed", value: "Normal", status: "Healthy", note: "Active" },
      { name: "Previous health history", value: "Clean record", status: "Healthy", note: "Clean" }
    ],
    forecast: [
      { day: "Today", risk: 12, forecast: 12 },
      { day: "Day 2", risk: null, forecast: 12 },
      { day: "Day 4", risk: null, forecast: 13 },
      { day: "Day 7", risk: null, forecast: 10 },
      { day: "Day 10", risk: null, forecast: 12 },
      { day: "Day 14", risk: null, forecast: 11 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 10, yield: 20.0, conductivity: 4.8, temp: 38.4 },
      { day: "Day -5", risk: 11, yield: 20.2, conductivity: 4.8, temp: 38.4 },
      { day: "Day -4", risk: 12, yield: 20.0, conductivity: 4.8, temp: 38.4 },
      { day: "Day -3", risk: 12, yield: 19.9, conductivity: 4.9, temp: 38.5 },
      { day: "Day -2", risk: 13, yield: 19.8, conductivity: 4.8, temp: 38.4 },
      { day: "Yesterday", risk: 12, yield: 19.7, conductivity: 4.8, temp: 38.4 },
      { day: "Today", risk: 12, yield: 19.8, conductivity: 4.8, temp: 38.4 }
    ],
    notes: "Risk is low. Health indicators look good."
  },
  {
    id: "A108",
    tag: "Hazel",
    breed: "Gir Cross",
    age: "5.4 yrs",
    lactation: "4th Lactation",
    milkYield: 17.5,
    previousYield: 20.0,
    riskScore: 71,
    riskLevel: "High Risk",
    statusText: "Needs Attention",
    milkTemperature: 39.5,
    milkConductivity: 6.6,
    activity: "Activity decreased (-18%)",
    activityStatus: "Low",
    history: "High producer with previous seasonal health note",
    environmentalTemp: "29.0°C",
    humidity: "74%",
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
      waterDrinking: "Less than usual"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "6.6 mS/cm", status: "High Risk", note: "Clear increase in conductivity" },
      { name: "Milk temperature changed", value: "39.5 °C", status: "High Risk", note: "Milk is warmer than usual" },
      { name: "Milk yield decreased", value: "17.5 L", status: "Needs Attention", note: "Lower yield than usual" },
      { name: "Activity changed", value: "Less active", status: "Needs Attention", note: "The animal is less active than usual" },
      { name: "Water Drinking changed", value: "Less than usual", status: "Needs Attention", note: "Drinking less water than usual" },
      { name: "Previous health history", value: "2 past events", status: "High Risk", note: "Higher risk in late lactation" }
    ],
    forecast: [
      { day: "Today", risk: 71, forecast: 71 },
      { day: "Day 2", risk: null, forecast: 77 },
      { day: "Day 4", risk: null, forecast: 78 },
      { day: "Day 7", risk: null, forecast: 66 },
      { day: "Day 10", risk: null, forecast: 55 },
      { day: "Day 14", risk: null, forecast: 42 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 28, yield: 20.1, conductivity: 5.3, temp: 38.6 },
      { day: "Day -5", risk: 32, yield: 19.8, conductivity: 5.5, temp: 38.7 },
      { day: "Day -4", risk: 45, yield: 19.2, conductivity: 5.8, temp: 38.9 },
      { day: "Day -3", risk: 56, yield: 18.5, conductivity: 6.1, temp: 39.1 },
      { day: "Day -2", risk: 64, yield: 18.0, conductivity: 6.3, temp: 39.3 },
      { day: "Yesterday", risk: 68, yield: 17.8, conductivity: 6.5, temp: 39.4 },
      { day: "Today", risk: 71, yield: 17.5, conductivity: 6.6, temp: 39.5 }
    ],
    notes: "Risk is high. This animal may need attention. Please check this animal."
  },
  {
    id: "A109",
    tag: "Willow",
    breed: "Holstein Friesian",
    age: "3.6 yrs",
    lactation: "2nd Lactation",
    milkYield: 27.8,
    previousYield: 28.0,
    riskScore: 22,
    riskLevel: "Low Risk",
    statusText: "Healthy",
    milkTemperature: 38.5,
    milkConductivity: 5.1,
    activity: "Normal",
    activityStatus: "Good",
    history: "Clean health record",
    environmentalTemp: "28.2°C",
    humidity: "66%",
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
      { name: "Milk conductivity changed", value: "5.1 mS/cm", status: "Healthy", note: "Standard" },
      { name: "Milk temperature changed", value: "38.5 °C", status: "Healthy", note: "Standard" },
      { name: "Milk yield decreased", value: "27.8 L", status: "Healthy", note: "Stable yield" },
      { name: "Activity changed", value: "Normal", status: "Healthy", note: "Normal active pattern" },
      { name: "Previous health history", value: "Clean record", status: "Healthy", note: "No past issues" }
    ],
    forecast: [
      { day: "Today", risk: 22, forecast: 22 },
      { day: "Day 2", risk: null, forecast: 20 },
      { day: "Day 4", risk: null, forecast: 19 },
      { day: "Day 7", risk: null, forecast: 19 },
      { day: "Day 10", risk: null, forecast: 17 },
      { day: "Day 14", risk: null, forecast: 16 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 20, yield: 28.0, conductivity: 5.0, temp: 38.4 },
      { day: "Day -5", risk: 21, yield: 28.1, conductivity: 5.1, temp: 38.5 },
      { day: "Day -4", risk: 23, yield: 27.9, conductivity: 5.1, temp: 38.5 },
      { day: "Day -3", risk: 21, yield: 28.0, conductivity: 5.0, temp: 38.4 },
      { day: "Day -2", risk: 22, yield: 27.8, conductivity: 5.1, temp: 38.5 },
      { day: "Yesterday", risk: 21, yield: 27.9, conductivity: 5.1, temp: 38.5 },
      { day: "Today", risk: 22, yield: 27.8, conductivity: 5.1, temp: 38.5 }
    ],
    notes: "Risk is low. Health parameters are normal."
  },
  {
    id: "A110",
    tag: "Penny",
    breed: "Jersey",
    age: "4.1 yrs",
    lactation: "3rd Lactation",
    milkYield: 20.3,
    previousYield: 23.0,
    riskScore: 48,
    riskLevel: "Needs Attention",
    statusText: "Needs Attention",
    milkTemperature: 38.8,
    milkConductivity: 5.7,
    activity: "Slightly less active (-8%)",
    activityStatus: "Moderate",
    history: "Previous minor injury resolved well",
    environmentalTemp: "28.6°C",
    humidity: "67%",
    cameraStatus: "Online",
    sensorStatus: {
      camera: "Online",
      milkSensor: "Online",
      gateway: "Online"
    },
    behaviour: {
      eating: "Normal",
      activity: "Less active",
      movement: "Normal",
      waterDrinking: "Normal"
    },
    riskFactors: [
      { name: "Milk conductivity changed", value: "5.7 mS/cm", status: "Needs Attention", note: "Slightly above normal" },
      { name: "Milk temperature changed", value: "38.8 °C", status: "Healthy", note: "Normal range" },
      { name: "Milk yield decreased", value: "20.3 L", status: "Needs Attention", note: "Small drop in yield" },
      { name: "Activity changed", value: "Less active", status: "Needs Attention", note: "Slightly less active than usual" },
      { name: "Previous health history", value: "Past injury", status: "Low Risk", note: "Healed well" }
    ],
    forecast: [
      { day: "Today", risk: 48, forecast: 48 },
      { day: "Day 2", risk: null, forecast: 51 },
      { day: "Day 4", risk: null, forecast: 52 },
      { day: "Day 7", risk: null, forecast: 39 },
      { day: "Day 10", risk: null, forecast: 32 },
      { day: "Day 14", risk: null, forecast: 25 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 24, yield: 23.1, conductivity: 5.2, temp: 38.5 },
      { day: "Day -5", risk: 27, yield: 22.8, conductivity: 5.3, temp: 38.5 },
      { day: "Day -4", risk: 33, yield: 22.0, conductivity: 5.4, temp: 38.6 },
      { day: "Day -3", risk: 40, yield: 21.4, conductivity: 5.5, temp: 38.7 },
      { day: "Day -2", risk: 45, yield: 20.8, conductivity: 5.6, temp: 38.7 },
      { day: "Yesterday", risk: 46, yield: 20.5, conductivity: 5.7, temp: 38.8 },
      { day: "Today", risk: 48, yield: 20.3, conductivity: 5.7, temp: 38.8 }
    ],
    notes: "Milk data has changed. Observe during the next 2 milkings."
  },
  {
    id: "A111",
    tag: "Ruby",
    breed: "Ayrshire",
    age: "5.0 yrs",
    lactation: "3rd Lactation",
    milkYield: 26.4,
    previousYield: 26.5,
    riskScore: 19,
    riskLevel: "Low Risk",
    statusText: "Healthy",
    milkTemperature: 38.5,
    milkConductivity: 5.0,
    activity: "Normal",
    activityStatus: "Good",
    history: "Clean health record",
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
      { name: "Milk conductivity changed", value: "5.0 mS/cm", status: "Healthy", note: "Normal" },
      { name: "Milk temperature changed", value: "38.5 °C", status: "Healthy", note: "Normal" },
      { name: "Milk yield decreased", value: "26.4 L", status: "Healthy", note: "Consistent yield" },
      { name: "Activity changed", value: "Normal", status: "Healthy", note: "Active" },
      { name: "Previous health history", value: "Clean record", status: "Healthy", note: "No past issues" }
    ],
    forecast: [
      { day: "Today", risk: 19, forecast: 19 },
      { day: "Day 2", risk: null, forecast: 18 },
      { day: "Day 4", risk: null, forecast: 18 },
      { day: "Day 7", risk: null, forecast: 18 },
      { day: "Day 10", risk: null, forecast: 16 },
      { day: "Day 14", risk: null, forecast: 15 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 18, yield: 26.6, conductivity: 5.0, temp: 38.5 },
      { day: "Day -5", risk: 19, yield: 26.5, conductivity: 5.0, temp: 38.5 },
      { day: "Day -4", risk: 18, yield: 26.4, conductivity: 4.9, temp: 38.4 },
      { day: "Day -3", risk: 20, yield: 26.5, conductivity: 5.0, temp: 38.5 },
      { day: "Day -2", risk: 19, yield: 26.3, conductivity: 5.0, temp: 38.5 },
      { day: "Yesterday", risk: 18, yield: 26.5, conductivity: 5.0, temp: 38.5 },
      { day: "Today", risk: 19, yield: 26.4, conductivity: 5.0, temp: 38.5 }
    ],
    notes: "Risk is low. Health indicators look good."
  },
  {
    id: "A112",
    tag: "Stella",
    breed: "Holstein Friesian",
    age: "4.7 yrs",
    lactation: "3rd Lactation",
    milkYield: 19.5,
    previousYield: 27.0,
    riskScore: 76,
    riskLevel: "High Risk",
    statusText: "Needs Attention",
    milkTemperature: 39.7,
    milkConductivity: 6.9,
    activity: "Activity decreased (-22%)",
    activityStatus: "Low",
    history: "Had higher risk in previous lactation cycle",
    environmentalTemp: "29.4°C",
    humidity: "76%",
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
      { name: "Milk conductivity changed", value: "6.9 mS/cm", status: "High Risk", note: "Higher conductivity than normal" },
      { name: "Milk temperature changed", value: "39.7 °C", status: "High Risk", note: "Milk is warmer than usual" },
      { name: "Milk yield decreased", value: "19.5 L", status: "High Risk", note: "Yield dropped by about 28%" },
      { name: "Activity changed", value: "Less active", status: "High Risk", note: "The animal is less active than usual" },
      { name: "Eating changed", value: "Less than usual", status: "High Risk", note: "The animal is eating less than usual" },
      { name: "Previous health history", value: "1 past event", status: "Needs Attention", note: "Had high risk in previous season" }
    ],
    forecast: [
      { day: "Today", risk: 76, forecast: 76 },
      { day: "Day 2", risk: null, forecast: 81 },
      { day: "Day 4", risk: null, forecast: 82 },
      { day: "Day 7", risk: null, forecast: 70 },
      { day: "Day 10", risk: null, forecast: 58 },
      { day: "Day 14", risk: null, forecast: 45 }
    ],
    historyTrend: [
      { day: "Day -6", risk: 25, yield: 27.2, conductivity: 5.1, temp: 38.5 },
      { day: "Day -5", risk: 31, yield: 26.8, conductivity: 5.3, temp: 38.6 },
      { day: "Day -4", risk: 44, yield: 25.1, conductivity: 5.7, temp: 38.8 },
      { day: "Day -3", risk: 58, yield: 23.0, conductivity: 6.2, temp: 39.2 },
      { day: "Day -2", risk: 67, yield: 21.2, conductivity: 6.5, temp: 39.4 },
      { day: "Yesterday", risk: 72, yield: 20.1, conductivity: 6.7, temp: 39.5 },
      { day: "Today", risk: 76, yield: 19.5, conductivity: 6.9, temp: 39.7 }
    ],
    notes: "Risk is high. This animal may need attention. Please check this animal."
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
  { day: "Mon", avgRisk: 28 },
  { day: "Tue", avgRisk: 30 },
  { day: "Wed", avgRisk: 34 },
  { day: "Thu", avgRisk: 37 },
  { day: "Fri", avgRisk: 41 },
  { day: "Sat", avgRisk: 44 },
  { day: "Today", avgRisk: 46 }
];

export const herdYieldTrend = [
  { day: "Mon", avgYield: 25.4 },
  { day: "Tue", avgYield: 25.1 },
  { day: "Wed", avgYield: 24.8 },
  { day: "Thu", avgYield: 24.2 },
  { day: "Fri", avgYield: 23.6 },
  { day: "Sat", avgYield: 23.1 },
  { day: "Today", avgYield: 22.9 }
];

export const herdConductivityTrend = [
  { day: "Mon", avgCond: 5.1 },
  { day: "Tue", avgCond: 5.2 },
  { day: "Wed", avgCond: 5.4 },
  { day: "Thu", avgCond: 5.6 },
  { day: "Fri", avgCond: 5.8 },
  { day: "Sat", avgCond: 5.9 },
  { day: "Today", avgCond: 6.0 }
];
