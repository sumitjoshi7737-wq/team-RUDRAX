import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  LineChart, 
  Bell, 
  Camera, 
  Droplets, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Search,
  Eye,
  AlertTriangle
} from 'lucide-react';

export default function Landing() {
  const { user, loading, role } = useAuth();
  const { t } = useLanguage();
  const isAuthenticated = !!user;
  const dashboardPath = role === 'veterinarian' ? '/veterinarian' : '/farmer';
  const steps = [
    {
      titleKey: "step1Title",
      descKey: "step1Desc",
      icon: Camera,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      titleKey: "step2Title",
      descKey: "step2Desc",
      icon: Search,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      titleKey: "step3Title",
      descKey: "step3Desc",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      titleKey: "step4Title",
      descKey: "step4Desc",
      icon: LineChart,
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      titleKey: "step5Title",
      descKey: "step5Desc",
      icon: Bell,
      color: "bg-rose-50 text-rose-600 border-rose-200"
    }
  ];

  const features = [
    {
      titleKey: "featureAiTitle",
      descKey: "featureAiDesc",
      icon: ShieldCheck
    },
    {
      titleKey: "featureProfilesTitle",
      descKey: "featureProfilesDesc",
      icon: Activity
    },
    {
      titleKey: "featureMilkTitle",
      descKey: "featureMilkDesc",
      icon: Droplets
    },
    {
      titleKey: "featureForecastTitle",
      descKey: "featureForecastDesc",
      icon: LineChart
    },
    {
      titleKey: "featureAlertsTitle",
      descKey: "featureAlertsDesc",
      icon: Bell
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-amber-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("landingBadge")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight">
              {t("heroTitleA")} <span className="text-amber-600">AI</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              {t("heroSubtitle")}
              
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {loading ? (
                <div className="w-full sm:w-40 h-[52px] rounded-xl bg-slate-200/70 animate-pulse" aria-hidden="true" />
              ) : isAuthenticated ? (
                <Link
                  to={dashboardPath}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t("getStarted")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-200 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t("getStarted")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-300 shadow-sm transition-all text-center"
                  >
                    {t("loginBtn")}
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> {t("earlyRiskDetection")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> {t("farmerVetFriendly")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> {t("forecast714")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-amber-600">{t("simpleProcess")}</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t("howItWorksTitle")}
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              {t("howItWorksSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.titleKey}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{t(step.titleKey)}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t(step.descKey)}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                    <span>{t("stepOf", { current: idx + 1, total: 5 })}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-amber-600">{t("mainFeatures")}</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t("featuresTitle")}
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              {t("featuresSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.titleKey}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{t(feat.titleKey)}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">{t(feat.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Flow Architecture Section */}
      <section id="architecture" className="py-16 sm:py-20 bg-white border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-amber-600">{t("dataFlowNav")}</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t("dataFlowTitle")}
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              {t("dataFlowSub")}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">{t("hwCameraTitle")}</h5>
                <p className="text-xs text-slate-400 mt-1">{t("hwCameraDesc")}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <Radio className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">{t("hwGatewayTitle")}</h5>
                <p className="text-xs text-slate-400 mt-1">{t("hwGatewayDesc")}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">{t("hwAiTitle")}</h5>
                <p className="text-xs text-slate-400 mt-1">{t("hwAiDesc")}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">{t("hwWebTitle")}</h5>
                <p className="text-xs text-slate-400 mt-1">{t("hwWebDesc")}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{t("focusesEarly")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Gau Rakshak AI</p>
                <p className="text-xs text-slate-400">{t("footerTagline")}</p>
              </div>
            </div>

            <div className="text-xs text-center md:text-right max-w-md text-slate-400">
              <p className="leading-relaxed">
                {t("footerDisclaimer")}
              </p>
              <p className="mt-2 text-slate-500">{t("rightsReserved")}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
