import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Tractor, Stethoscope, ArrowRight, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth, getFriendlyAuthError } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Register() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle, setRole } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer'
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError(t("fillAllFields"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError(t("invalidEmail"));
      return;
    }
    if (formData.password.length < 6) {
      setError(t("passwordMin6"));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordsNoMatch"));
      return;
    }

    setBusy(true);
    try {
      const pickedRole = formData.role === 'veterinarian' ? 'veterinarian' : 'farmer';
      setRole(pickedRole);
      await signup(formData.email.trim(), formData.password, formData.fullName.trim(), pickedRole);
      navigate(pickedRole === 'farmer' ? '/farmer' : '/veterinarian');
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
      const pickedRole = formData.role === 'veterinarian' ? 'veterinarian' : 'farmer';
      setRole(pickedRole);
      const { profile } = await loginWithGoogle(pickedRole);
      const finalRole = profile?.role || pickedRole;
      navigate(finalRole === 'farmer' ? '/farmer' : '/veterinarian');
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-200">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          {t("registerTitle")}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {t("registerSubtitle")}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="flex justify-end mb-2">
          <LanguageSelector compact />
        </div>
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/90 rounded-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                {t("role")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'farmer' })}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    formData.role === 'farmer'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-800 font-bold ring-2 ring-amber-500/20'
                      : 'border-slate-200 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Tractor className={`w-5 h-5 ${formData.role === 'farmer' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span className="text-xs">{t("farmer")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'veterinarian' })}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    formData.role === 'veterinarian'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-800 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Stethoscope className={`w-5 h-5 ${formData.role === 'veterinarian' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="text-xs">{t("veterinarian")}</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("fullName")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("phoneNumber")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={busy}
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 ${
                  formData.role === 'veterinarian' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                <span>{busy ? 'Creating account…' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Google Sign-Up (matches existing card style) */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-semibold text-slate-400">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.6 2.8c2.2-2 3.8-5 3.8-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-3.8 2.9C3.5 21.4 7.5 24 12 24z"/><path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4L1.4 6.8C.5 8.7 0 10.3 0 12s.5 3.3 1.4 4.7l3.8-2.3z"/><path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.5 0 3.5 2.6 1.4 6.8l3.8 3C6.2 6.9 8.9 4.7 12 4.7z"/></svg>
              <span>{busy ? 'Please wait…' : 'Sign up with Google'}</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amber-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

