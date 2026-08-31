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
  Binary, 
  HeartHandshake, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Activity, 
  ChevronRight,
  Eye
} from 'lucide-react';

export default function FarmerDashboard() {
  const summary = getHerdSummary();
  const attentionAnimals = animalsData
    .filter(a => a.riskScore >= 45)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);
  const recentAlerts = initialAlerts.slice(0, 3);

  return (
    <DashboardLayout role="farmer" title="Farmer Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 text-xs font-semibold mb-2">
              <span>Early Risk Monitoring Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Good morning, Farmer
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
              AI shows {summary.highRisk} animals with high risk and {summary.mediumRisk} animals that need attention.
            </p>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2">
              Milk yield is 4.2% lower than last week.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/farmer/animals"
              className="px-4 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <span>View All Animals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Animals"
            value={summary.total}
            subtitle="Monitored in your herd"
            icon={Binary}
            color="slate"
          />
          <StatCard
            title="Healthy / Low Risk"
            value={summary.healthy}
            subtitle="Health data looks normal"
            icon={HeartHandshake}
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

        {/* Two Column Charts: Animal Health + Health Risk Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Animal Health Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Animal Health</h3>
                <p className="text-xs text-slate-500">Number of healthy and at-risk animals</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                12 Animals
              </span>
            </div>
            <RiskDistributionChart summary={summary} />
          </div>

          {/* Health Risk Trend */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Health Risk Trend</h3>
                <p className="text-xs text-slate-500">Herd risk changes over the last 7 days</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                <Activity className="w-3.5 h-3.5" />
                <span>Average Risk: 46%</span>
              </div>
            </div>
            <RiskTrendChart data={herdRiskTrend} dataKey="avgRisk" color="#10b981" />
          </div>
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
              <p className="text-xs text-slate-500">Animals with medium or high risk</p>
            </div>
            <Link
              to="/farmer/animals"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Animals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Animal ID</th>
                  <th className="px-5 py-3.5">Risk Score</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {attentionAnimals.map((animal) => (
                  <tr key={animal.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                          {animal.id}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block">{animal.id}</span>
                          <span className="text-xs text-slate-500">{animal.tag} • {animal.breed}</span>
                        </div>
                      </div>
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
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition-colors"
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

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Alerts</h3>
              <p className="text-xs text-slate-500">Notifications when milk data changes or an animal needs attention</p>
            </div>
            <Link
              to="/farmer/alerts"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Alerts</span>
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
