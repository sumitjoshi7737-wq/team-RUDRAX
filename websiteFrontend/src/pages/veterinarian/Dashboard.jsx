import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import RiskBadge from '../../components/RiskBadge';
import AlertCard from '../../components/AlertCard';
import RiskDistributionChart from '../../components/charts/RiskDistributionChart';
import RiskTrendChart from '../../components/charts/RiskTrendChart';
import { animalsData, getHerdSummary, herdRiskTrend } from '../../data/animals';
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
  const summary = getHerdSummary();
  const attentionAnimals = animalsData
    .filter(a => a.riskScore >= 45)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);
  const recentAlerts = initialAlerts.slice(0, 3);

  return (
    <DashboardLayout role="veterinarian" title="Veterinarian Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800 text-indigo-200 text-xs font-semibold mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Veterinarian Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Herd Health & Risk Review
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-xl">
              AI shows {summary.highRisk} animals with high risk and {summary.mediumRisk} animals that need attention.
            </p>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-2">
              Milk yield is 4.2% lower than last week.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/veterinarian/animals"
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <span>View All Animals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Animals"
            value={summary.total}
            subtitle="Monitored on farm"
            icon={Binary}
            color="slate"
          />
          <StatCard
            title="Healthy"
            value={summary.healthy}
            subtitle="Low risk"
            icon={CheckCircle}
            color="emerald"
          />
          <StatCard
            title="Needs Attention"
            value={summary.mediumRisk}
            subtitle="Medium risk"
            icon={AlertTriangle}
            color="amber"
          />
          <StatCard
            title="High Risk"
            value={summary.highRisk}
            subtitle="Please check these animals"
            icon={ShieldAlert}
            color="rose"
          />
        </div>

        {/* Animals That Need Attention */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Animals That Need Attention</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                  {attentionAnimals.length} Animals
                </span>
              </div>
              <p className="text-xs text-slate-500">Animals with changes in milk temperature, conductivity, or yield</p>
            </div>
            <Link
              to="/veterinarian/animals"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Animal</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Last Update</th>
                  <th className="px-4 py-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attentionAnimals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center">
                          {animal.id}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">{animal.id}</span>
                          <span className="text-xs text-slate-400">{animal.tag} • {animal.breed}</span>
                        </div>
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
                      Today 06:30 AM
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link
                        to={`/veterinarian/animals/${animal.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Herd Health & Health Risk Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Herd Health</h3>
                <p className="text-xs text-slate-500">Herd risk breakdown</p>
              </div>
            </div>
            <RiskDistributionChart summary={summary} />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Health Risk Trend</h3>
                <p className="text-xs text-slate-500">Herd risk over the last 7 days</p>
              </div>
            </div>
            <RiskTrendChart data={herdRiskTrend} color="#6366f1" />
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Alerts</h3>
              <p className="text-xs text-slate-500">Alerts when an animal may need attention</p>
            </div>
            <Link
              to="/veterinarian/alerts"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All Alerts</span>
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
