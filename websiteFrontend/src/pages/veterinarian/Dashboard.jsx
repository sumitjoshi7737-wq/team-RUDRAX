import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import RiskBadge from '../../components/RiskBadge';
import AlertCard from '../../components/AlertCard';
import RiskDistributionChart from '../../components/charts/RiskDistributionChart';
import { LiveLoading, LiveError } from '../../components/LiveStatus';
import { useLiveAnimals, getLiveHerdSummary } from '../../hooks/useLiveAnimals';
import { useLanguage } from '../../context/LanguageContext';
import { initialAlerts } from '../../data/alerts';
import { 
  Stethoscope, 
  Binary, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  ChevronRight
} from 'lucide-react';

export default function VeterinarianDashboard() {
  const { t } = useLanguage();
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
      <DashboardLayout role="veterinarian" title={t("vetDashboard")}>
        <div className="space-y-6">
          <LiveLoading />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="veterinarian" title={t("vetDashboard")}>
        <div className="space-y-6">
          <LiveError message={error} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="veterinarian" title={t("vetDashboard")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800 text-indigo-200 text-xs font-semibold mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t("vetPortal")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {t("herdHealthReview")}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-xl">
              {t("riskSummary", { highRisk: summary.highRisk, needsAttention: summary.mediumRisk })}
            </p>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-2">
              {t("milkYieldLowerWeek")}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/veterinarian/animals"
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <span>{t("viewAllAnimals")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("totalAnimals")}
            value={summary.total}
            subtitle={t("monitoredOnFarm")}
            icon={Binary}
            color="slate"
          />
          <StatCard
            title={t("healthy")}
            value={summary.healthy}
            subtitle={t("lowRisk")}
            icon={CheckCircle}
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
              <p className="text-xs text-slate-500">{t("animalsWithChanges")}</p>
            </div>
            <Link
              to="/veterinarian/animals"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>{t("viewAllAnimals")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">{t("animalId")}</th>
                  <th className="px-4 py-3">{t("riskScore")}</th>
                  <th className="px-4 py-3">{t("status")}</th>
                  <th className="px-4 py-3">{t("lastUpdate")}</th>
                  <th className="px-4 py-3 text-right">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attentionAnimals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block whitespace-nowrap">{animal.id}</span>
                        <span className="text-xs text-slate-400">SCC {animal.scc} x10³/mL</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-slate-700 font-medium">
                        {animal.riskFactors[0]?.name}: {animal.riskFactors[0]?.value}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {animal.riskFactors[1]?.name}: {animal.riskFactors[1]?.value}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">
                      {t("today")}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        to={`/veterinarian/animals/${animal.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
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

        {/* Animal Health Chart (only chart on Dashboard) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm overflow-hidden">
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

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{t("recentAlerts")}</h3>
              <p className="text-xs text-slate-500">{t("recentAlertsDescVet")}</p>
            </div>
            <Link
              to="/veterinarian/alerts"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>{t("viewAllAlerts")}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} basePath="/veterinarian" />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
