import React from 'react';
import { Utensils, Activity, Footprints, Droplets, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AnimalBehaviourCard({ behaviour }) {
  if (!behaviour) return null;

  const items = [
    {
      label: "Eating",
      value: behaviour.eating || "Normal",
      isWarning: behaviour.eating === "Less than usual",
      icon: Utensils
    },
    {
      label: "Activity",
      value: behaviour.activity || "Normal",
      isWarning: behaviour.activity === "Less active",
      icon: Activity
    },
    {
      label: "Movement",
      value: behaviour.movement || "Normal",
      isWarning: behaviour.movement === "Less movement",
      icon: Footprints
    },
    {
      label: "Water Drinking",
      value: behaviour.waterDrinking || "Normal",
      isWarning: behaviour.waterDrinking === "Less than usual",
      icon: Droplets
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐄</span>
          <h3 className="font-bold text-slate-900 text-sm">Animal Behaviour</h3>
        </div>
        <span className="text-xs text-slate-500">
          Daily farm observations
        </span>
      </div>

      {/* 4 Cards Grid - Responsive: 4 on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-2 transition ${
                item.isWarning
                  ? 'border-amber-200 bg-amber-50/40 text-amber-900'
                  : 'border-slate-200/80 bg-slate-50/60 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-2 rounded-lg shrink-0 ${
                  item.isWarning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 break-words">{item.value}</p>
                </div>
              </div>

              <div className="shrink-0">
                {item.isWarning ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Change</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Normal</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span>These are behaviour observations. They are only one health signal and do not confirm illness.</span>
        <span className="text-slate-400 font-medium">Updated during milking</span>
      </div>
    </div>
  );
}

