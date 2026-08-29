import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import RiskDistributionChart from '../../components/charts/RiskDistributionChart';
import RiskTrendChart from '../../components/charts/RiskTrendChart';
import MilkYieldChart from '../../components/charts/MilkYieldChart';
import ConductivityChart from '../../components/charts/ConductivityChart';
import { getHerdSummary, herdRiskTrend, herdYieldTrend, herdConductivityTrend } from '../../data/animals';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  ShieldAlert, 
  HelpCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FarmerAnalytics({ role = "farmer" }) {
  const summary = getHerdSummary();
  const [activeTab, setActiveTab] = useState('all');

  const herdTempTrend = [
    { day: "Mon", avgTemp: 38.5 },
    { day: "Tue", avgTemp: 38.6 },
    { day: "Wed", avgTemp: 38.7 },
    { day: "Thu", avgTemp: 38.8 },
    { day: "Fri", avgTemp: 38.9 },
    { day: "Sat", avgTemp: 39.0 },
    { day: "Today", avgTemp: 39.1 }
  ];

  return (
    <DashboardLayout role={role} title="Analytics">
      <div className="space-y-6">
        {/* Top Header & Tabs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Herd Health and Milk Trends</h2>
            <p className="text-xs text-slate-500">Summary of milk and sensor data across 12 animals</p>
          </div>

          {/* Simple Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Charts
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'risk' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Health Risk
            </button>
            <button
              onClick={() => setActiveTab('milk')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'milk' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Milk Yield
            </button>
            <button
              onClick={() => setActiveTab('sensors')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'sensors' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Temp & Conductivity
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="High Risk Animals"
            value={`${summary.highRisk}`}
            subtitle="Please check these animals"
            icon={ShieldAlert}
            color="rose"
          />
          <StatCard
            title="Average Milk Yield"
            value={`${summary.avgYield} L`}
            subtitle="Average per animal"
            icon={Droplets}
            color="blue"
          />
          <StatCard
            title="Average Milk Temp"
            value={`${summary.avgTemp} °C`}
            subtitle="Normal: ~38.5 °C"
            icon={Thermometer}
            color="amber"
          />
          <StatCard
            title="Average Conductivity"
            value={`${summary.avgCond} mS`}
            subtitle="Normal: < 5.5 mS/cm"
            icon={Activity}
            color="emerald"
          />
        </div>

        {/* Milk Conductivity Note */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Milk Conductivity:</strong> Shows how easily electricity passes through milk. Changes in conductivity can be one sign of a health change, but it is not proof of disease on its own.
          </p>
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Animal Health Overview */}
          {(activeTab === 'all' || activeTab === 'risk') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">1. Animal Health Overview</h3>
                  <p className="text-xs text-slate-500">Number of healthy and at-risk animals in the herd</p>
                </div>
              </div>
              <RiskDistributionChart summary={summary} />
            </div>
          )}

          {/* Chart 2: Health Risk Trend */}
          {(activeTab === 'all' || activeTab === 'risk') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">2. Health Risk Trend</h3>
                  <p className="text-xs text-slate-500">Average herd risk over the last 7 days</p>
                </div>
              </div>
              <RiskTrendChart data={herdRiskTrend} dataKey="avgRisk" color="#f59e0b" />
            </div>
          )}

          {/* Chart 3: Average Milk Yield */}
          {(activeTab === 'all' || activeTab === 'milk') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">3. Average Milk Yield</h3>
                  <p className="text-xs text-slate-500">Daily average milk in liters</p>
                </div>
              </div>
              <MilkYieldChart data={herdYieldTrend} />
            </div>
          )}

          {/* Chart 4: Milk Temperature Trend */}
          {(activeTab === 'all' || activeTab === 'sensors') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">4. Milk Temperature Trend</h3>
                  <p className="text-xs text-slate-500">Average milk temperature in °C</p>
                </div>
              </div>
              <div className="w-full h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={herdTempTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                    <YAxis domain={[38.0, 40.0]} tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} unit="°" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="avgTemp" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Chart 5: Milk Conductivity Trend */}
          {(activeTab === 'all' || activeTab === 'sensors') && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">5. Milk Conductivity Trend</h3>
                  <p className="text-xs text-slate-500">Herd average milk conductivity in mS/cm</p>
                </div>
              </div>
              <ConductivityChart data={herdConductivityTrend} dataKey="avgCond" />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
