import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
  const steps = [
    {
      title: "1. Capture",
      desc: "Collect animal information, milk data, and sensor data during daily farm routine.",
      icon: Camera,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      title: "2. Check",
      desc: "Check milk conductivity, milk temperature, and daily milk yield.",
      icon: Search,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      title: "3. AI Finds Risk",
      desc: "AI analyses the combined information to find possible health risk early.",
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      title: "4. Show Risk",
      desc: "View clear risk levels (Low, Medium, High) and 7–14 day risk forecast.",
      icon: LineChart,
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      title: "5. Alert",
      desc: "Receive timely alerts when an animal may need attention so you can act early.",
      icon: Bell,
      color: "bg-rose-50 text-rose-600 border-rose-200"
    }
  ];

  const features = [
    {
      title: "AI Risk Monitoring",
      desc: "See clear risk levels for each cow so you know which animals are healthy and which need attention.",
      icon: ShieldCheck
    },
    {
      title: "Animal Profiles",
      desc: "View animal ID, breed, age, lactation, milk yield, and previous health history in one place.",
      icon: Activity
    },
    {
      title: "Milk & Sensor Data",
      desc: "Check milk yield, milk temperature, and milk conductivity simply and easily.",
      icon: Droplets
    },
    {
      title: "7–14 Day Risk Forecast",
      desc: "See if health risk may increase over the next few days before visible signs appear.",
      icon: LineChart
    },
    {
      title: "Smart Alerts",
      desc: "Get notified when milk data changes or an animal may need care.",
      icon: Bell
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Based Early Mastitis Risk Monitoring</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Early Mastitis Risk Monitoring with <span className="text-emerald-600">AI</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              MastiGuard AI combines animal, milk, and sensor information to provide early risk insights. 
              It helps farmers and veterinarians notice possible health changes early before milk quality drops.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-300 shadow-sm transition-all text-center"
              >
                Login
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Early risk detection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Farmer & Vet friendly
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 7–14 Day Risk Forecast
              </span>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white p-4 sm:p-6 border border-slate-200/90 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-semibold text-slate-600 ml-2">MastiGuard Herd Summary</span>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                12 Animals Monitored
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">Healthy / Low Risk</p>
                <p className="text-lg font-bold text-slate-800 mt-1">5 Animals</p>
                <p className="text-[10px] text-emerald-600 font-medium">Stable health data</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">Needs Attention</p>
                <p className="text-lg font-bold text-slate-800 mt-1">3 Animals</p>
                <p className="text-[10px] text-amber-600 font-medium">Medium risk</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">High Risk</p>
                <p className="text-lg font-bold text-slate-800 mt-1">4 Animals</p>
                <p className="text-[10px] text-rose-600 font-medium">Please check</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">Average Yield</p>
                <p className="text-lg font-bold text-slate-800 mt-1">22.9 L/day</p>
                <p className="text-[10px] text-slate-500 font-medium">Daily milk average</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600">Simple Process</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              How MastiGuard AI Works
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              A simple 5-step process to monitor health and provide early alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.title}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                    <span>Step {idx + 1} of 5</span>
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
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600">Main Features</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Simple & Clear Herd Health Monitoring
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              Easy-to-understand tools designed for farmers and veterinarians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{feat.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Flow Architecture Section */}
      <section id="architecture" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-600">System Flow</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              How Data Moves from Sensor to Website
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              How animal and milk information is collected and turned into easy-to-read risk insights.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">1. Camera & Milk Sensors</h5>
                <p className="text-xs text-slate-400 mt-1">Collects milk yield, milk temperature, and milk conductivity</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <Radio className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">2. ESP32 / Gateway</h5>
                <p className="text-xs text-slate-400 mt-1">Sends readings through Wi-Fi, LoRa, or 4G</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">3. AI Risk Prediction</h5>
                <p className="text-xs text-slate-400 mt-1">Calculates animal-level and herd-level risk</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="w-10 h-10 mx-auto rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold">4. MastiGuard Website</h5>
                <p className="text-xs text-slate-400 mt-1">Farmer & Veterinarian view risk and alerts</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Focuses on early risk monitoring</span>
              </div>
              <div className="flex gap-4">
                <Link to="/farmer" className="text-emerald-400 hover:text-emerald-300 font-semibold">Open Farmer Dashboard →</Link>
                <Link to="/veterinarian" className="text-indigo-400 hover:text-indigo-300 font-semibold">Open Vet Dashboard →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-bold text-base">MastiGuard AI</p>
                <p className="text-xs text-slate-400">AI-Based Early Mastitis Risk Monitoring</p>
              </div>
            </div>

            <div className="text-xs text-center md:text-right max-w-md text-slate-400">
              <p className="leading-relaxed">
                Important: MastiGuard AI shows possible health risk. It does NOT diagnose or confirm diseases. It is an early monitoring tool to help you know when an animal may need attention.
              </p>
              <p className="mt-2 text-slate-500">© 2026 MastiGuard AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
