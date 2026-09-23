import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  Binary,
  Bell,
  UserCheck,
  ShieldCheck,
  LogOut,

  Stethoscope,
  Tractor,
  X
} from 'lucide-react';

export default function Sidebar({ role = "farmer", isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  const navItems = [
    { name: t("dashboard"), path: basePath, icon: LayoutDashboard, end: true },
    { name: t("animals"), path: `${basePath}/animals`, icon: Binary },
    { name: t("alerts"), path: `${basePath}/alerts`, icon: Bell },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // still redirect even if signOut fails
    }
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
        />
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Header & Logo */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white tracking-tight text-base">Gau Rakshak AI</span>
                <span className="block text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  {role === 'veterinarian' ? t('veterinaryPortal') : t('farmManagement')}
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Role Tag */}
          <div className="px-4 py-3 mx-4 mt-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
            <div className={`p-1.5 rounded-lg shrink-0 ${role === 'veterinarian' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {role === 'veterinarian' ? <Stethoscope className="w-4 h-4" /> : <Tractor className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 font-medium leading-none">{t("signedInAs")}</p>
              <p className="text-xs font-bold text-white mt-1 capitalize truncate max-w-[150px]" title={user?.displayName || user?.email || role}>
                {user?.displayName || user?.email || role}
              </p>
            </div>
          </div>

          {/* Nav List */}
          <div className="px-3 py-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("navigation")}</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-amber-600 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t("signOut")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

