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
    <div className={`bg-white rounded-xl p-4 border transition-all min-w-0 ${
      isWarning ? 'border-rose-200 bg-rose-50/20' : isModerate ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200/80'
    } shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-2 rounded-lg shrink-0 ${
            isWarning ? 'bg-rose-100 text-rose-600' : isModerate ? 'bg-amber-100 text-amber-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider break-words whitespace-normal">{title}</h4>
            <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
              <span className="text-xl font-bold text-slate-800 break-words">{value}</span>
              {unit && <span className="text-xs text-slate-500 font-medium break-words">{unit}</span>}
            </div>
          </div>
        </div>

        {status && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-normal break-words max-w-full ${
            isWarning ? 'bg-rose-100 text-rose-700' : isModerate ? 'bg-amber-100 text-amber-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {status}
          </span>
        )}
      </div>

      {note && (
        <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed break-words">
          {note}
        </p>
      )}
    </div>
  );
}

