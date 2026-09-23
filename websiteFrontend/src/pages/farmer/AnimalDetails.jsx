import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import RiskBadge from '../../components/RiskBadge';
import SensorCard from '../../components/SensorCard';
import RiskTrendChart from '../../components/charts/RiskTrendChart';
import { LiveLoading, LiveError, LiveBadge } from '../../components/LiveStatus';
import { useLiveAnimal } from '../../hooks/useLiveAnimals';
import { buildSevenDayTrend } from '../../data/demoHistory';
import { useLanguage } from '../../context/LanguageContext';
import {
  ArrowLeft,
  Sparkles,
  Info,
  HelpCircle
} from 'lucide-react';

export default function FarmerAnimalDetails({ role = "farmer" }) {
  const { id } = useParams();
  const { t } = useLanguage();
  // LIVE TODAY: mastiguard/animals/${cowId}/history newest by timestamp (onValue, auto-updates).
  const { animal, loading, error } = useLiveAnimal(id);
  const basePath = role === 'veterinarian' ? '/veterinarian' : '/farmer';

  if (loading) {
    return (
      <DashboardLayout role={role} title={t("animalDetailsWithId", { id })}>
        <div className="space-y-6">
          <LiveLoading message={t("loadingLiveDataFor", { id })} />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !animal) {
    return (
      <DashboardLayout role={role} title={t("animalDetailsWithId", { id })}>
        <div className="space-y-6">
          <LiveError message={error || t("unableToLoadLive")} />
        </div>
      </DashboardLayout>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (score >= 45) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getProgressBarColor = (score) => {
    if (score >= 70) return 'bg-rose-500';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-amber-500';
  };

  const isHighRisk = animal.riskScore >= 70;
  const isMedRisk = animal.riskScore >= 45 && animal.riskScore < 70;

  // Risk signals from live Firebase values only (no dummy behaviour/history).
  const baseSignals = (animal.riskFactors || []).map((f) => ({ name: f.name, status: f.status, value: f.value }));

  const sccStatus = animal.scc >= 400 ? "High Risk" : animal.scc >= 200 ? "Needs Attention" : "Healthy";
  const sccNote =
    animal.scc >= 400
      ? t("elevatedScc")
      : animal.scc >= 200
        ? t("slightlyElevatedScc")
        : t("withinNormalRange");

  const lactoseVal = animal.lactose ?? 0;
  const lactoseStatus = lactoseVal < 4.3 ? "High Risk" : lactoseVal < 4.6 ? "Needs Attention" : "Healthy";
  const lactoseNote =
    lactoseVal < 4.3
      ? t("lactoseLow")
      : lactoseVal < 4.6
        ? t("lactoseSlightlyLow")
        : t("withinNormalRange");

  const displaySignals = [
    ...baseSignals,
    {
      name: "SCC (Spectroscopy)",
      status: sccStatus,
      note: sccNote,
    },
    {
      name: "Lactose%",
      status: lactoseStatus,
      note: lactoseNote,
    },
  ];

  // DEMO graph: previous 6 days = local demoHistory (DEMO), Today = real Firebase final_risk (LIVE).
  // Same existing RiskTrendChart (recharts) — one continuous visual, sources stay separate.
  // New Firebase history record auto-updates ONLY the Today point via useLiveAnimal listener.
  const sevenDayTrend = buildSevenDayTrend(animal.id, animal.riskScore);

  return (
    <DashboardLayout role={role} title={t("animalDetailsWithId", { id: animal.id })}>
      <div className="space-y-6">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to={`${basePath}/animals`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backToAnimals")}</span>
          </Link>
        </div>

        {/* Top Header Card - Animal Information (compact) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 flex-wrap min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 break-words">{animal.id}</h2>
            <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
            <LiveBadge timestamp={animal.timestamp} dataSource={animal.dataSource} />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {animal.dataSource === "history" ? "Last available data from Firebase " : "Live from Firebase "}
            <span className="font-mono font-semibold">mastiguard/animals/{animal.id}/history</span>
            {animal.timestamp ? ` • ${t("lastUpdated")} ${new Date(animal.timestamp).toLocaleString()}` : ""}
          </p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{t("riskScore")}</p>
              <p className="text-sm font-bold text-slate-800">{animal.finalRisk}%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{t("imageRisk")}</p>
              <p className="text-sm font-bold text-slate-800">{animal.imageRisk ?? "—"}%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{t("sensorRisk")}</p>
              <p className="text-sm font-bold text-slate-800">{animal.sensorRisk ?? "—"}%</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">{t("riskLevel")}</p>
              <p className="text-sm font-bold text-slate-800">{animal.rawRiskLevel}</p>
            </div>
          </div>
        </div>

        {/* Current Health Risk & Why Is Risk High */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Health Risk */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {t("currentHealthRisk")}
                </span>
                <span className="text-[10px] text-slate-400">{t("aiRiskPrediction")}</span>
              </div>

              <div className="text-center py-4">
                <div className={`inline-block px-5 py-3 rounded-2xl border text-4xl sm:text-5xl font-black ${getScoreColor(animal.riskScore)}`}>
                  {animal.riskScore}%
                </div>
                <div className="mt-3">
                  <span className="text-sm font-bold text-slate-800 block">
                    {t("riskLevel")}: {animal.riskLevel}
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
                  <h3 className="font-bold text-slate-900 text-sm">{t("whyIsRiskHigh")}</h3>
                  <p className="text-xs text-slate-500">{t("possibleSignals")}</p>
                </div>
                <span className="text-xs bg-slate-100 font-semibold px-2.5 py-1 rounded-lg text-slate-600">
                  {t("sensorData")}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3 italic">
                {t("theseChangesLinked")}
              </p>

              <div className="space-y-2.5">
                {displaySignals.map((factor, idx) => {
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
                            isHigh ? 'bg-rose-100 text-rose-700' : isMod ? 'bg-amber-100 text-amber-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {factor.status}
                          </span>
                        </div>
                        {factor.note && (
                          <p className="text-xs text-slate-500 mt-0.5">{factor.note}</p>
                        )}
                      </div>

                      {factor.value && (
                        <div className="sm:text-right">
                          <span className="text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                            {factor.value}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              {t("earlyRiskSignsNote")}
            </div>
          </div>
        </div>

        {/* DEMO 7-Day Risk Trend: 6 demo days + Today live Firebase (existing RiskTrendChart) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{t("sevenDayTrend")}</h3>
              <p className="text-xs text-slate-500">{t("sevenDayTrendSub")}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
              {t("todayLive")}: {animal.riskScore}%
            </span>
          </div>
          <RiskTrendChart data={sevenDayTrend} dataKey="risk" color="#f59e0b" height={240} />
          <p className="mt-2 text-[11px] text-slate-400">
            {t("demoHistoryNote")}: Day -6 → Day -1 • {t("todayLive")}: Firebase mastiguard/animals/{animal.id}/history
          </p>
        </div>

        {/* Milk Conductivity Explanation Box */}
        <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-amber-950 leading-relaxed">
            <h4 className="font-bold text-sm text-amber-900 mb-1">{t("whatIsConductivity")}</h4>
            <p>
              {t("conductivityDesc1")}
            </p>
            <p className="mt-1 text-amber-800 font-medium">
              {t("conductivityDesc2")}
            </p>
          </div>
        </div>

        {/* Milk and Sensor Information */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-sm">{t("milkAndSensorInfo")}</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> {t("cameraLabel")}: {t("online")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> {t("milkSensorLabel")}: {t("online")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> {t("gatewayLabel")}: {t("online")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SensorCard
              title={t("milkYield")}
              value={animal.milkYield ?? "—"}
              unit="kg/day"
              icon="yield"
              status={animal.riskScore >= 70 ? "Needs Attention" : "Normal"}
            />
            <SensorCard
              title={t("milkTemperature")}
              value={animal.milkTemperature ?? "—"}
              unit="°C"
              icon="temp"
              status={animal.milkTemperature != null && animal.milkTemperature >= 39.4 ? "High Risk" : "Normal"}
            />
            <SensorCard
              title={t("milkConductivity")}
              value={animal.milkConductivity ?? "—"}
              unit="mS/cm"
              icon="cond"
              status={animal.milkConductivity != null && animal.milkConductivity >= 6.5 ? "High Risk" : animal.milkConductivity != null && animal.milkConductivity >= 5.7 ? "Needs Attention" : "Normal"}
            />
            <SensorCard
              title={t("scc")}
              value={animal.scc ?? "—"}
              unit="x10³/mL"
              icon="cond"
              status={animal.scc != null && animal.scc >= 400 ? "High Risk" : animal.scc != null && animal.scc >= 200 ? "Needs Attention" : "Normal"}
            />
            <SensorCard
              title={t("lactose")}
              value={animal.lactose ?? "—"}
              unit="%"
              icon="yield"
              status={animal.lactose != null && animal.lactose < 4.3 ? "High Risk" : animal.lactose != null && animal.lactose < 4.6 ? "Needs Attention" : "Normal"}
            />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
