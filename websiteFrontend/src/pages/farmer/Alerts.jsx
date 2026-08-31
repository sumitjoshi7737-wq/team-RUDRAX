import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AlertCard from '../../components/AlertCard';
import { initialAlerts } from '../../data/alerts';
import { Bell, Filter, CheckCheck } from 'lucide-react';

export default function FarmerAlerts({ role = "farmer" }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  const categories = ['All', 'High Risk', 'Needs Attention', 'Sensor'];

  const filteredAlerts = useMemo(() => {
    if (selectedCategory === 'All') return alerts;
    return alerts.filter(a => a.category === selectedCategory);
  }, [alerts, selectedCategory]);

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  return (
    <DashboardLayout role={role} title="Alerts">
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Herd & Sensor Alerts</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Alerts when milk data changes or an animal may need attention.
            </p>
          </div>

          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              unreadCount > 0
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                : 'bg-slate-50 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => {
            const count = cat === 'All' ? alerts.length : alerts.filter(a => a.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Alert Cards List */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
              <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-700">No alerts in this category.</p>
              <p className="text-xs text-slate-400 mt-1">All milk and sensor readings look normal.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} basePath={basePath} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
