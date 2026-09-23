import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, role } = useAuth();
  const { t } = useLanguage();
  const isAuthenticated = !!user;
  const dashboardPath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm shadow-amber-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Gau Rakshak <span className="text-amber-600">AI</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold -mt-1">
                {t("appTaglineShort")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-amber-600 transition-colors">{t("howItWorksNav")}</a>
            <a href="#features" className="hover:text-amber-600 transition-colors">{t("featuresNav")}</a>
            <a href="#architecture" className="hover:text-amber-600 transition-colors">{t("dataFlowNav")}</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3"><LanguageSelector compact />
            {loading ? (
              <div className="w-24 h-9 rounded-lg bg-slate-100 animate-pulse" aria-hidden="true" />
            ) : isAuthenticated ? (
              <Link
                to={dashboardPath}
                className="text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg shadow-sm shadow-amber-200 transition-all flex items-center gap-1.5"
              >
                <span>{t("getStarted")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-amber-600 px-4 py-2 transition-colors"
                >
                  {t("loginNav")}
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg shadow-sm shadow-amber-200 transition-all flex items-center gap-1.5"
                >
                  <span>{t("getStarted")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label={t("openSidebar")}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-amber-600"
          >
            {t("howItWorksNav")}
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-amber-600"
          >
            {t("featuresNav")}
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-amber-600"
          >
            {t("dataFlowNav")}
          </a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex justify-start"><LanguageSelector compact /></div>
            {loading ? (
              <div className="w-full h-10 rounded-lg bg-slate-100 animate-pulse" aria-hidden="true" />
            ) : isAuthenticated ? (
              <Link
                to={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-amber-600 font-semibold text-sm text-white hover:bg-amber-700"
              >
                {t("getStarted")}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-lg border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50"
                >
                  {t("loginNav")}
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-lg bg-amber-600 font-semibold text-sm text-white hover:bg-amber-700"
                >
                  {t("getStartedFree")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

