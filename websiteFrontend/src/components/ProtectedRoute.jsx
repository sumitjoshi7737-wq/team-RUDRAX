import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function LoadingScreen({ message, messageKey }) {
  const { t } = useLanguage();
  const label = message ?? (messageKey ? t(messageKey) : t("checkingAuth"));
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-slate-600">{label}</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

// Role gate: Firestore role is the source of truth.
// farmer routes accept only role === "farmer" (vet → /veterinarian).
// veterinarian routes accept only role === "veterinarian" (farmer → /farmer).
export function RoleProtectedRoute({ allowedRole, children }) {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen messageKey="loadingProfile" />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const actualRole = userProfile?.role;
  if (!actualRole) {
    // Profile doc missing (e.g. pre-Firestore account) — send to register to provision it.
    return <LoadingScreen messageKey="settingUpProfile" />;
  }

  if (actualRole !== allowedRole) {
    return <Navigate to={actualRole === "veterinarian" ? "/veterinarian" : "/farmer"} replace />;
  }

  return children;
}

