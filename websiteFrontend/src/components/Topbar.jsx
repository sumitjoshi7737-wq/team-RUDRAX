import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, ShieldCheck } from 'lucide-react';
import { initialAlerts } from '../data/alerts';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Topbar({ onOpenSidebar, role = "farmer", title = "Dashboard" }) {
  const { t } = useLanguage();
  const unreadAlertsCount = initialAlerts.filter(a => !a.read).length;
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || (role === 'veterinarian' ? 'Dr. Sarah Jenkins' : 'GreenPastures Farm');
  const initials = displayName.length <= 3
    ? displayName.toUpperCase()
    : displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Left side: Hamburger (mobile) & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label={t("openSidebar")}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Gau Rakshak AI • {t("appTagline")}
          </p>
        </div>
      </div>

      {/* Right side: Search, Alert Icon, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* DEMO: Language selector (English/Hindi/Hinglish) — UI labels only */}
        <LanguageSelector compact />
        {/* Alerts Icon Link */}
        <Link
          to={`${basePath}/alerts`}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title={t("viewAlerts")}
        >
          <Bell className="w-5 h-5" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unreadAlertsCount}
            </span>
          )}
        </Link>

        {/* User Info & Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center border border-amber-200" title={user?.email || displayName}>
            {initials}
          </div>
          <div className="hidden md:block text-left max-w-[160px]">
            <span className="text-xs font-semibold text-slate-800 block truncate" title={user?.email || displayName}>
              {displayName}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-medium">
              {role === 'veterinarian' ? t('veterinaryConsultant') : t('headDairyFarmer')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

