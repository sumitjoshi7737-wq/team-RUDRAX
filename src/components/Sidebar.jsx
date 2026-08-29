import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Binary, 
  BarChart3, 
  Bell, 
  UserCheck, 
  ShieldCheck, 
  LogOut, 
  ArrowLeftRight,
  Stethoscope,
  Tractor,
  X
} from 'lucide-react';

export default function Sidebar({ role = "farmer", isOpen, onClose }) {
  const navigate = useNavigate();
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  const navItems = [
    { name: 'Dashboard', path: basePath, icon: LayoutDashboard, end: true },
    { name: 'Animals', path: `${basePath}/animals`, icon: Binary },
    { name: 'Analytics', path: `${basePath}/analytics`, icon: BarChart3 },
    { name: 'Alerts', path: `${basePath}/alerts`, icon: Bell },
  ];

  const handleRoleSwitch = () => {
    const target = role === 'farmer' ? '/veterinarian' : '/farmer';
    navigate(target);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    navigate('/login');
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
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white tracking-tight text-base">MastiGuard AI</span>
                <span className="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                  {role === 'veterinarian' ? 'Veterinary Portal' : 'Farm Management'}
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
          <div className="px-4 py-3 mx-4 mt-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${role === 'veterinarian' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {role === 'veterinarian' ? <Stethoscope className="w-4 h-4" /> : <Tractor className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium leading-none">Signed in as</p>
                <p className="text-xs font-bold text-white mt-1 capitalize">{role}</p>
              </div>
            </div>
            <button
              onClick={handleRoleSwitch}
              title={`Switch to ${role === 'farmer' ? 'Veterinarian' : 'Farmer'} view`}
              className="text-[11px] font-semibold text-slate-300 hover:text-emerald-400 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Switch</span>
            </button>
          </div>

          {/* Nav List */}
          <div className="px-3 py-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
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
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
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
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-medium text-slate-300">Edge Gateway Online</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">12 cattle nodes monitored</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

