import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerAnimals from './pages/farmer/Animals';
import FarmerAnimalDetails from './pages/farmer/AnimalDetails';
import FarmerAnalytics from './pages/farmer/Analytics';
import FarmerAlerts from './pages/farmer/Alerts';

// Veterinarian Pages
import VeterinarianDashboard from './pages/veterinarian/Dashboard';
import VetAnimals from './pages/veterinarian/Animals';
import VetAnimalDetails from './pages/veterinarian/AnimalDetails';
import VetAnalytics from './pages/veterinarian/Analytics';
import VetAlerts from './pages/veterinarian/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Farmer Portal Routes */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/animals" element={<FarmerAnimals />} />
        <Route path="/farmer/animals/:id" element={<FarmerAnimalDetails role="farmer" />} />
        <Route path="/farmer/analytics" element={<FarmerAnalytics role="farmer" />} />
        <Route path="/farmer/alerts" element={<FarmerAlerts role="farmer" />} />

        {/* Veterinarian Portal Routes */}
        <Route path="/veterinarian" element={<VeterinarianDashboard />} />
        <Route path="/veterinarian/animals" element={<VetAnimals />} />
        <Route path="/veterinarian/animals/:id" element={<VetAnimalDetails />} />
        <Route path="/veterinarian/analytics" element={<VetAnalytics />} />
        <Route path="/veterinarian/alerts" element={<VetAlerts />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

