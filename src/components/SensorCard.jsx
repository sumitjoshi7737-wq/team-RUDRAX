import React from 'react';
import { Activity, Thermometer, Droplets, Radio, Camera, Cpu, Wifi } from 'lucide-react';

export default function SensorCard({ title, value, unit, status, icon: IconName, note }) {
  const getIcon = () => {
    switch (IconName) {
      case 'temp': return Thermometer;
      case 'cond': return Activity;
      case 'yield': return Droplets;
      case 'camera': return Camera;
      case 'gateway': return Cpu;
      default: return Radio;
    }
  };

  const Icon = getIcon();

  const isWarning = status === 'warning' || status === 'High Risk';
  const isModerate = status === 'Moderate' || status === 'caution';

  return (
    <div className={`bg-white rounded-xl p-4 border transition-all ${
      isWarning ? 'border-rose-200 bg-rose-50/20' : isModerate ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200/80'
    } shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${
            isWarning ? 'bg-rose-100 text-rose-600' : isModerate ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-bold text-slate-800">{value}</span>
              {unit && <span className="text-xs text-slate-500 font-medium">{unit}</span>}
            </div>
          </div>
        </div>

        {status && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isWarning ? 'bg-rose-100 text-rose-700' : isModerate ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {status}
          </span>
        )}
      </div>

      {note && (
        <p className="mt-2 text-xs text-slate-500 font-medium">
          {note}
        </p>
      )}
    </div>
  );
}

