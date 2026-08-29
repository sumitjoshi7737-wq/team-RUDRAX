# MastiGuard AI — AI-Based Early Mastitis Risk Monitoring

A clean, modern, responsive frontend web platform built for farmers and veterinarians to monitor cattle health, review sensor telemetries, and access AI-based early mastitis risk predictions.

---

## 🌟 Key Features

1. **AI Risk Monitoring**: Real-time risk probability calculation for individual cows (Healthy, Low, Medium, High).
2. **7–14 Day Risk Forecasting**: Predictive trendlines powered by AI models to anticipate acute mastitis before physical symptoms emerge.
3. **Multimodal Sensor Telemetry**: Live metrics for electrical conductivity, milk temperature, yield volume, spectroscopy indices, and ambient barn climate.
4. **Tailored Portals**:
   - **Farmer Portal**: Daily operations, herd health overview, production curves, and quick action triage.
   - **Veterinarian Portal**: Diagnostic triage, risk factor deep-dives, clinical records, and prioritized CMT examination lists.
5. **Alerts & Notification Hub**: Categorized alerts (`High Risk`, `Medium Risk`, `Sensor`, `System`) with actionable recommendations.

---

## 🛠️ Technology Stack

- **React.js** (JavaScript)
- **Vite**
- **Tailwind CSS**
- **React Router DOM v6**
- **Recharts** (Interactive data visualization)
- **Lucide React** (Icons)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

The app will be accessible at `http://localhost:5173`.

### 3. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── ConductivityChart.jsx
│   │   ├── ForecastChart.jsx
│   │   ├── MilkYieldChart.jsx
│   │   ├── RiskDistributionChart.jsx
│   │   └── RiskTrendChart.jsx
│   ├── AlertCard.jsx
│   ├── AnimalCard.jsx
│   ├── AnimalTable.jsx
│   ├── DashboardLayout.jsx
│   ├── Navbar.jsx
│   ├── RiskBadge.jsx
│   ├── SensorCard.jsx
│   ├── Sidebar.jsx
│   └── Topbar.jsx
│
├── data/
│   ├── alerts.js
│   └── animals.js
│
├── pages/
│   ├── farmer/
│   │   ├── Alerts.jsx
│   │   ├── Analytics.jsx
│   │   ├── AnimalDetails.jsx
│   │   ├── Animals.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── veterinarian/
│   │   ├── Alerts.jsx
│   │   ├── Analytics.jsx
│   │   ├── AnimalDetails.jsx
│   │   ├── Animals.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── Landing.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🧭 Page Routes

| Route | Description |
|---|---|
| `/` | Landing Page with workflow, features, and IoT data pipeline |
| `/login` | Authentication page with Farmer/Vet role selector & quick demo bypass |
| `/register` | User registration with role selection |
| `/farmer` | Farmer Dashboard (Herd health cards, risk distribution, high-risk table, alerts) |
| `/farmer/animals` | Herd inventory with search, filtering, and card/table view toggles |
| `/farmer/animals/:id` | Animal Profile (AI risk score, factor breakdown, 7–14 day forecast, telemetry) |
| `/farmer/analytics` | Recharts dashboard for risk trends, yield curves, temperature, & conductivity |
| `/farmer/alerts` | Triage notifications with category filter tabs and mark-all-read |
| `/veterinarian` | Veterinarian Clinical Triage Dashboard |
| `/veterinarian/animals` | Patient roster with clinical filter |
| `/veterinarian/animals/:id` | Deep clinical animal profile & risk factor breakdown |
| `/veterinarian/analytics` | Herd pathology & physiological trends |
| `/veterinarian/alerts` | Clinical alert dispatch center |

---

## 🔒 Medical Disclaimer
*MastiGuard AI provides risk monitoring and early probability insights based on sensor fusion. It serves as a clinical decision-support tool and does not replace professional veterinary diagnosis.*
