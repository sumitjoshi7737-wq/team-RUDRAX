import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AlertCard from '../../components/AlertCard';
import { useLanguage } from '../../context/LanguageContext';
import { initialAlerts } from '../../data/alerts';
import { Bell, Filter, CheckCheck } from 'lucide-react';

export default function FarmerAlerts({ role = "farmer" }) {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  const CATEGORY_DEFS = [{ id: 'All', labelKey: 'all' },{ id: 'High Risk', labelKey: 'highRisk' },{ id: 'Needs Attention', labelKey: 'needsAttention' },{ id: 'Sensor', labelKey: 'sensor' },];

  const filteredAlerts = useMemo(() => {
    if (selectedCategory === 'All') return alerts;
    return alerts.filter((a) => (a.categoryKey ? t(a.categoryKey) : a.category) === (CATEGORY_DEFS.find((c) => c.id === selectedCategory) ? t(CATEGORY_DEFS.find((c) => c.id === selectedCategory).labelKey) : selectedCategory) || a.category === selectedCategory);
  }, [alerts, selectedCategory, t]);

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  return (
    <DashboardLayout role={role} title={t("alerts")}>
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{t("herdAndSensorAlerts")}</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                  {unreadCount} {t("new")}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t("alertsDesc")}
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
            <span>{t("markAllAsRead")}</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> {t("categoryLabel")}
          </span>
          {CATEGORY_DEFS.map((catDef) => {
            const cat = catDef.id;
            const catLabel = t(catDef.labelKey);
            const count = cat === 'All' ? alerts.length : alerts.filter((a) => (a.categoryKey ? t(a.categoryKey) : a.category) === catLabel || a.category === cat).length;
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
                <span>{catLabel}</span>
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
              <p className="font-semibold text-slate-700">{t("noAlertsInCategory")}</p>
              <p className="text-xs text-slate-400 mt-1">{t("allReadingsNormal")}</p>
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
