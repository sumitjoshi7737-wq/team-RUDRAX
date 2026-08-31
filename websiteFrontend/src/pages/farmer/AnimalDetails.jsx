import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import RiskBadge from '../../components/RiskBadge';
import SensorCard from '../../components/SensorCard';
import AnimalBehaviourCard from '../../components/AnimalBehaviourCard';
import ForecastChart from '../../components/charts/ForecastChart';
import RiskTrendChart from '../../components/charts/RiskTrendChart';
import MilkYieldChart from '../../components/charts/MilkYieldChart';
import ConductivityChart from '../../components/charts/ConductivityChart';
import { animalsData } from '../../data/animals';
import { 
  ArrowLeft, 
  Sparkles, 
  Activity, 
  Droplets, 
  Thermometer, 
  Calendar, 
  History, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Camera,
  Cpu,
  Wifi,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function FarmerAnimalDetails({ role = "farmer" }) {
  const { id } = useParams();
  const animal = animalsData.find((a) => a.id.toLowerCase() === id?.toLowerCase()) || animalsData[0];
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (score >= 45) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  const getProgressBarColor = (score) => {
    if (score >= 70) return 'bg-rose-500';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const isHighRisk = animal.riskScore >= 70;
  const isMedRisk = animal.riskScore >= 45 && animal.riskScore < 70;

  return (
    <DashboardLayout role={role} title={`Animal Details: ${animal.id} (${animal.tag})`}>
      <div className="space-y-6">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to={`${basePath}/animals`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Animals</span>
          </Link>
        </div>

        {/* Top Header Card - Animal Information */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-wrap">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-2xl flex items-center justify-center shadow-inner shrink-0">
              {animal.id}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 break-words">{animal.id} - {animal.tag}</h2>
                <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed break-words">
                Breed: <strong>{animal.breed}</strong> • Age: <strong>{animal.age}</strong> • Lactation: <strong>{animal.lactation}</strong> • Daily Milk: <strong>{animal.milkYield} L</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs text-slate-600 max-w-full">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="break-words">Last milking check: <strong>Today 06:30 AM</strong></span>
          </div>
        </div>

        {/* Current Health Risk & Why Is Risk High */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Health Risk */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Current Health Risk
                </span>
                <span className="text-[10px] text-slate-400">AI Risk</span>
              </div>

              <div className="text-center py-4">
                <div className={`inline-block px-5 py-3 rounded-2xl border text-4xl sm:text-5xl font-black ${getScoreColor(animal.riskScore)}`}>
                  {animal.riskScore}%
                </div>
                <div className="mt-3">
                  <span className="text-sm font-bold text-slate-800 block">
                    Risk Level: {animal.riskLevel}
                  </span>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    {isHighRisk 
                      ? "This animal may need attention." 
                      : isMedRisk 
                      ? "Milk data has changed. Keep under observation." 
                      : "Health indicators look good."}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                  <span>Low Risk (0%)</span>
                  <span>Needs Attention (45%)</span>
                  <span>High Risk (70%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(animal.riskScore)}`}
                    style={{ width: `${Math.min(animal.riskScore, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                AI shows possible health risk. It does not confirm or diagnose disease.
              </span>
            </div>
          </div>

          {/* Why Is Risk High? */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Why Is Risk High?</h3>
                  <p className="text-xs text-slate-500">Possible signals identified by AI</p>
                </div>
                <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-lg text-slate-600">
                  Signals Checked
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3 italic">
                These changes may be linked to higher risk:
              </p>

              <div className="space-y-2.5">
                {animal.riskFactors.map((factor, idx) => {
                  const isHigh = factor.status === "High Risk";
                  const isMod = factor.status === "Needs Attention";
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition ${
                        isHigh ? 'border-rose-200 bg-rose-50/20' : isMod ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200/70 bg-slate-50/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">{factor.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHigh ? 'bg-rose-100 text-rose-700' : isMod ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {factor.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{factor.note}</p>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                          {factor.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              Note: Early risk signs help farmers check cows before problems become severe.
            </div>
          </div>
        </div>

        {/* Animal Behaviour Section */}
        <AnimalBehaviourCard behaviour={animal.behaviour} />

        {/* Milk Conductivity Explanation Box */}
        <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-emerald-950 leading-relaxed">
            <h4 className="font-bold text-sm text-emerald-900 mb-1">What is Milk Conductivity?</h4>
            <p>
              Milk conductivity shows how easily electricity passes through milk. Changes in conductivity can be one sign of a health change.
            </p>
            <p className="mt-1 text-emerald-800 font-medium">
              Important: Milk conductivity is only one signal among several and not proof of illness.
            </p>
          </div>
        </div>

        {/* Milk and Sensor Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Milk and Sensor Information</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Camera: Online
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Milk Sensor: Online
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Gateway: Online
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <SensorCard
              title="Milk Yield"
              value={animal.milkYield}
              unit="L/day"
              icon="yield"
              status={animal.milkYield < animal.previousYield * 0.85 ? "Needs Attention" : "Normal"}
              note={`Baseline: ${animal.previousYield} L`}
            />
            <SensorCard
              title="Milk Temperature"
              value={animal.milkTemperature}
              unit="°C"
              icon="temp"
              status={animal.milkTemperature >= 39.4 ? "High Risk" : "Normal"}
              note="Normal: ~38.5°C"
            />
            <SensorCard
              title="Milk Conductivity"
              value={animal.milkConductivity}
              unit="mS/cm"
              icon="cond"
              status={animal.milkConductivity >= 6.5 ? "High Risk" : animal.milkConductivity >= 5.7 ? "Needs Attention" : "Normal"}
              note="Normal: < 5.5 mS"
            />
            <SensorCard
              title="Temperature"
              value={animal.environmentalTemp}
              unit=""
              icon="temp"
              status="Normal"
              note="Shed temperature"
            />
            <SensorCard
              title="Humidity"
              value={animal.humidity}
              unit=""
              icon="yield"
              status="Normal"
              note="Shed humidity"
            />
          </div>
        </div>

        {/* Charts: Health Risk Forecast (7-14 Days) & Health Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Risk Forecast */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Health Risk Forecast (7–14 Days)</h3>
                <p className="text-xs text-slate-500">
                  {isHighRisk ? "Risk may increase over the next few days." : "Forecast shows stable risk."}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                AI Forecast
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              AI shows possible risk in advance. This is not a confirmed medical prediction.
            </p>
            <ForecastChart data={animal.forecast} />
          </div>

          {/* Health Trend */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Health Trend (Last 7 Days)</h3>
                <p className="text-xs text-slate-500">Risk changes over the past week</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                7 Days
              </span>
            </div>
            <RiskTrendChart data={animal.historyTrend} dataKey="risk" color={animal.riskScore >= 70 ? '#f43f5e' : '#10b981'} />
          </div>
        </div>

        {/* Milk Yield and Milk Conductivity Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Milk Yield Trend (Liters)</h3>
              <span className="text-xs text-slate-500 font-medium">Daily Production</span>
            </div>
            <MilkYieldChart data={animal.historyTrend} />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Milk Conductivity Trend (mS/cm)</h3>
              <span className="text-xs text-slate-500 font-medium">Milk Electrical Reading</span>
            </div>
            <ConductivityChart data={animal.historyTrend} />
          </div>
        </div>

        {/* Animal History & Notes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Animal History</h4>
              <p className="text-xs text-slate-600 mt-1">{animal.history}</p>
              <p className="text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg mt-2 inline-block">
                Note: {animal.notes}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-auto shrink-0">
            <Link
              to={`${basePath}/alerts`}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm inline-flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Check Alerts</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
