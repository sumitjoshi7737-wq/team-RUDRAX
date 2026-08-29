import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, ShieldCheck } from 'lucide-react';
import { initialAlerts } from '../data/alerts';

export default function Topbar({ onOpenSidebar, role = "farmer", title = "Dashboard" }) {
  const unreadAlertsCount = initialAlerts.filter(a => !a.read).length;
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Left side: Hamburger (mobile) & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            MastiGuard AI • AI-Based Early Mastitis Risk Monitoring
          </p>
        </div>
      </div>

      {/* Right side: Search, Alert Icon, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Alerts Icon Link */}
        <Link
          to={`${basePath}/alerts`}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="View Alerts"
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
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
            {role === 'veterinarian' ? 'Dr' : 'FM'}
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-semibold text-slate-800 block">
              {role === 'veterinarian' ? 'Dr. Sarah Jenkins' : 'GreenPastures Farm'}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-medium">
              {role === 'veterinarian' ? 'Veterinary Consultant' : 'Head Dairy Farmer'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

