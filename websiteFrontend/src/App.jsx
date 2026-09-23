import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute, { RoleProtectedRoute } from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerAnimals from './pages/farmer/Animals';
import FarmerAnimalDetails from './pages/farmer/AnimalDetails';
import FarmerAlerts from './pages/farmer/Alerts';

// Veterinarian Pages
import VeterinarianDashboard from './pages/veterinarian/Dashboard';
import VetAnimals from './pages/veterinarian/Animals';
import VetAnimalDetails from './pages/veterinarian/AnimalDetails';
import VetAlerts from './pages/veterinarian/Alerts';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
      <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Farmer Portal Routes (protected, role === "farmer") */}
        <Route path="/farmer" element={<RoleProtectedRoute allowedRole="farmer"><FarmerDashboard /></RoleProtectedRoute>} />
        <Route path="/farmer/animals" element={<RoleProtectedRoute allowedRole="farmer"><FarmerAnimals /></RoleProtectedRoute>} />
        <Route path="/farmer/animals/:id" element={<RoleProtectedRoute allowedRole="farmer"><FarmerAnimalDetails role="farmer" /></RoleProtectedRoute>} />
        <Route path="/farmer/alerts" element={<RoleProtectedRoute allowedRole="farmer"><FarmerAlerts role="farmer" /></RoleProtectedRoute>} />

        {/* Veterinarian Portal Routes (protected, role === "veterinarian") */}
        <Route path="/veterinarian" element={<RoleProtectedRoute allowedRole="veterinarian"><VeterinarianDashboard /></RoleProtectedRoute>} />
        <Route path="/veterinarian/animals" element={<RoleProtectedRoute allowedRole="veterinarian"><VetAnimals /></RoleProtectedRoute>} />
        <Route path="/veterinarian/animals/:id" element={<RoleProtectedRoute allowedRole="veterinarian"><VetAnimalDetails /></RoleProtectedRoute>} />
        <Route path="/veterinarian/alerts" element={<RoleProtectedRoute allowedRole="veterinarian"><VetAlerts /></RoleProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

