import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import RiskBadge from '../../components/RiskBadge';
import AlertCard from '../../components/AlertCard';
import RiskDistributionChart from '../../components/charts/RiskDistributionChart';
import { LiveLoading, LiveError } from '../../components/LiveStatus';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLiveAnimals, getLiveHerdSummary } from '../../hooks/useLiveAnimals';
import { initialAlerts } from '../../data/alerts';
import {
  Binary,
  HeartHandshake,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function FarmerDashboard() {
  const { user, userProfile } = useAuth();
  const { t } = useLanguage();
  const farmerName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Farmer';
  // LIVE TODAY: mastiguard/animals/COW001-COW010/history newest by timestamp (onValue, auto-updates).
  const { animals, loading, error } = useLiveAnimals();
  const summary = getLiveHerdSummary(animals);
  const attentionAnimals = animals
    .filter(a => a.riskScore >= 45)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);
  const recentAlerts = initialAlerts.slice(0, 3);

  if (loading) {
    return (
      <DashboardLayout role="farmer" title={t("farmerDashboard")}>
        <div className="space-y-6">
          <LiveLoading />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="farmer" title={t("farmerDashboard")}>
        <div className="space-y-6">
          <LiveError message={error} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="farmer" title={t("farmerDashboard")}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-800 to-teal-900 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-700/80 text-amber-100 text-xs font-semibold mb-2">
              <span>{t("earlyRiskMonitoringActive")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {t("goodMorning")}, {farmerName}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-xl">
              {t("riskSummary", { highRisk: summary.highRisk, needsAttention: summary.mediumRisk })}
            </p>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-2">
              {t("milkYieldLower")}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/farmer/animals"
              className="px-4 py-2 rounded-xl bg-white text-amber-900 hover:bg-amber-50 text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <span>{t("viewAllAnimals")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("totalAnimals")}
            value={summary.total}
            subtitle={t("monitoredInHerd")}
            icon={Binary}
            color="slate"
          />
          <StatCard
            title={`${t("healthy")} / ${t("lowRisk")}`}
            value={summary.healthy}
            subtitle={t("healthDataNormal")}
            icon={HeartHandshake}
            color="amber"
          />
          <StatCard
            title={t("needsAttention")}
            value={summary.mediumRisk}
            subtitle={t("mediumRisk")}
            icon={AlertTriangle}
            color="amber"
          />
          <StatCard
            title={t("highRisk")}
            value={summary.highRisk}
            subtitle={t("pleaseCheckAnimal")}
            icon={ShieldAlert}
            color="rose"
          />
        </div>

        {/* Animal Health Chart (only chart on Dashboard) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Animal Health Overview */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t("animalHealth")}</h3>
                <p className="text-xs text-slate-500">{t("numberHealthyAtRisk")}</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                {summary.total} {t("animals")}
              </span>
            </div>
            <RiskDistributionChart summary={summary} animals={animals} />
          </div>
        </div>

        {/* Animals That Need Attention */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{t("animalsNeedAttentionTitle")}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                  {t("animalsCount", { count: attentionAnimals.length })}
                </span>
              </div>
              <p className="text-xs text-slate-500">{t("animalsWithMediumHigh")}</p>
            </div>
            <Link
              to="/farmer/animals"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>{t("viewAllAnimals")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">{t("animalId")}</th>
                  <th className="px-5 py-3.5">{t("riskScore")}</th>
                  <th className="px-5 py-3.5">{t("status")}</th>
                  <th className="px-5 py-3.5 text-right">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {attentionAnimals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800 whitespace-nowrap">{animal.id}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {animal.riskScore}%
                    </td>
                    <td className="px-5 py-4">
                      <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/farmer/animals/${animal.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t("viewAnimal")}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{t("recentAlerts")}</h3>
              <p className="text-xs text-slate-500">{t("recentAlertsDescFarmer")}</p>
            </div>
            <Link
              to="/farmer/alerts"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>{t("viewAllAlerts")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} basePath="/farmer" />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
