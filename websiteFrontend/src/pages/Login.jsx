import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Tractor, Stethoscope, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth, getFriendlyAuthError } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import cowImg from '../../cow.jpg';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, setRole } = useAuth();
  const { t } = useLanguage();
  const [role, setRoleState] = useState('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const navigateByRole = (r) => {
    navigate(r === 'veterinarian' ? '/veterinarian' : '/farmer');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(t("fillEmailPassword"));
      return;
    }
    setBusy(true);
    try {
      const { profile } = await login(email.trim(), password);
      // Firestore role is the source of truth — ignore the role tab for redirect.
      navigateByRole(profile?.role || 'farmer');
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      setRole(role); // pending preference for first-time Google provisioning only
      const { profile } = await loginWithGoogle(role);
      navigateByRole(profile?.role || role);
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch lg:items-center">
        {/* LEFT: Cow image panel */}
        <div className="rounded-3xl border border-slate-200/90 shadow-sm bg-white p-3 sm:p-4 lg:mt-[4.25rem]">
          <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 lg:h-auto bg-slate-100">
            <img
              src={cowImg}
              alt="Dairy cow on the farm"
              className="absolute inset-0 h-full w-full object-cover object-center lg:relative lg:inset-auto lg:h-auto lg:w-full lg:object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 text-white">
                <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center shadow">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-extrabold tracking-tight">Gau Rakshak AI</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed max-w-sm">
                {t("appTagline")}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Login form (unchanged functionality) */}
        <div className="flex flex-col justify-center py-2 sm:py-4 min-w-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-200">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          {t("loginTitle")}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {t("appTagline")}
        </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 min-w-0">
            <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/90 rounded-2xl min-w-0">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                {t("role")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setRoleState('farmer'); setRole('farmer'); }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    role === 'farmer'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-800 font-bold ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Tractor className={`w-5 h-5 ${role === 'farmer' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span className="text-xs">{t("farmer")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setRoleState('veterinarian'); setRole('veterinarian'); }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    role === 'veterinarian'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-800 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Stethoscope className={`w-5 h-5 ${role === 'veterinarian' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="text-xs">{t("veterinarian")}</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("emailAddress")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'farmer' ? 'farmer@dairyfarm.com' : 'dr.jenkins@vetclinic.com'}
                  className="block w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* {t("password")} Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  {t("password")}
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-amber-600 hover:underline">
                  {t("forgotPasswordQ")}
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={busy}
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 ${
                  role === 'veterinarian' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                <span>{busy ? t("signingIn") : (role === 'farmer' ? t("loginAsFarmer") : t("loginAsVet"))}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Google Sign-In (matches existing card style) */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-semibold text-slate-400">{t("or")}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.6 2.8c2.2-2 3.8-5 3.8-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-3.8 2.9C3.5 21.4 7.5 24 12 24z"/><path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4L1.4 6.8C.5 8.7 0 10.3 0 12s.5 3.3 1.4 4.7l3.8-2.3z"/><path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.5 0 3.5 2.6 1.4 6.8l3.8 3C6.2 6.9 8.9 4.7 12 4.7z"/></svg>
              <span>{busy ? t("pleaseWait") : t("continueWithGoogle")}</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            {t("noAccountQ")}{' '}
            <Link to="/register" className="font-bold text-amber-600 hover:underline">
              {t("createAccountLink")}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  );
}

