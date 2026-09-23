import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, getIdToken, db } from "../firebase";

const AuthContext = createContext(null);

// Friendly messages — never show raw Firebase codes to normal users.
export const getFriendlyAuthError = (error) => {
  const code = error?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please log in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password. Please try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled. Please try again.";
    case "auth/popup-blocked":
      return "Pop-up was blocked by your browser. Please allow pop-ups and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/missing-email":
      return "Please enter your email address first.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const VALID_ROLES = ["farmer", "veterinarian"];

const normalizeRole = (r) => (r === "veterinarian" ? "veterinarian" : "farmer");

// Firestore is the source of truth for role. Never trust localStorage alone.
const loadUserProfile = async (firebaseUser) => {
  if (!firebaseUser) return null;
  try {
    const snap = await getDoc(doc(db, "users", firebaseUser.uid));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch {
    // e.g. offline / permission error — caller falls back gracefully
  }
  return null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Single source of truth — do NOT check localStorage for auth state.
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setUserProfile(null);
        setProfileLoading(false);
        setLoading(false);
        return;
      }
      setProfileLoading(true);
      const profile = await loadUserProfile(firebaseUser);
      setUserProfile(profile);
      setProfileLoading(false);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Role comes from Firestore profile; falls back to Auth display only while loading.
  const role = userProfile?.role && VALID_ROLES.includes(userProfile.role)
    ? userProfile.role
    : "farmer";

  // Preferred role selected on Login/Register forms (UI preference only,
  // used for Google first-time provisioning + post-auth redirect).
  const getPendingRole = () => {
    const r = localStorage.getItem("pending_role");
    return VALID_ROLES.includes(r) ? r : "farmer";
  };

  const setRole = (nextRole) => {
    localStorage.setItem("pending_role", normalizeRole(nextRole));
  };

  // Create users/{uid} with { name, email, role, createdAt } — never passwords.
  // Security rules allow create-once (no role overwrite from frontend).
  const ensureUserDoc = async (firebaseUser, fallbackName, fallbackRole) => {
    const ref = doc(db, "users", firebaseUser.uid);
    const existing = await getDoc(ref);
    if (existing.exists()) {
      const data = { id: existing.id, ...existing.data() };
      setUserProfile(data);
      return data;
    }
    const safeRole = normalizeRole(fallbackRole);
    const fresh = {
      name: fallbackName || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
      email: firebaseUser.email || "",
      role: safeRole,
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, fresh);
    const snap = await getDoc(ref);
    const data = snap.exists() ? { id: snap.id, ...snap.data() } : { id: firebaseUser.uid, ...fresh };
    setUserProfile(data);
    return data;
  };

  const signup = async (email, password, displayName, selectedRole) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      try {
        await updateProfile(cred.user, { displayName });
      } catch {
        // non-fatal
      }
    }
    const roleToStore = normalizeRole(selectedRole ?? getPendingRole());
    await ensureUserDoc(cred.user, displayName, roleToStore);
    localStorage.removeItem("pending_role");
    return cred.user;
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const profile = await loadUserProfile(cred.user);
    setUserProfile(profile);
    return { user: cred.user, profile };
  };

  const loginWithGoogle = async (pendingRole) => {
    const cred = await signInWithPopup(auth, googleProvider);
    const roleToStore = normalizeRole(pendingRole ?? getPendingRole());
    const profile = await ensureUserDoc(cred.user, cred.user.displayName, roleToStore);
    localStorage.removeItem("pending_role");
    return { user: cred.user, profile };
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value = useMemo(
    () => ({ user, userProfile, loading: loading || profileLoading, role, setRole, signup, login, loginWithGoogle, logout, resetPassword, getIdToken }),
    [user, userProfile, loading, profileLoading, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
