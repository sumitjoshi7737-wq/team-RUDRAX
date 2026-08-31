import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle, Cpu, Info, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

export default function AlertCard({ alert, onMarkRead, basePath = "/farmer" }) {
  const getIconAndStyle = () => {
    switch (alert.severity) {
      case 'high':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-rose-100 text-rose-600',
          border: 'border-rose-200 bg-rose-50/30',
          badgeBg: 'bg-rose-100 text-rose-800'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          iconBg: 'bg-amber-100 text-amber-600',
          border: 'border-amber-200 bg-amber-50/30',
          badgeBg: 'bg-amber-100 text-amber-800'
        };
      case 'sensor':
        return {
          icon: Cpu,
          iconBg: 'bg-blue-100 text-blue-600',
          border: 'border-blue-200 bg-blue-50/30',
          badgeBg: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          icon: Info,
          iconBg: 'bg-slate-100 text-slate-600',
          border: 'border-slate-200 bg-slate-50/50',
          badgeBg: 'bg-slate-100 text-slate-800'
        };
    }
  };

  const { icon: Icon, iconBg, border, badgeBg } = getIconAndStyle();

  return (
    <div className={`p-4 rounded-xl border ${border} transition-all ${alert.read ? 'opacity-80' : 'shadow-sm'}`}>
      <div className="flex items-start gap-3 min-w-0">
        <div className={`p-2.5 rounded-xl shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeBg}`}>
                {alert.category}
              </span>
              {alert.animalId && (
                <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded max-w-full break-words">
                  Animal #{alert.animalId}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{alert.time}</span>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-slate-800 mt-1.5 break-words">
            {alert.title}
          </h4>

          <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
            {alert.description}
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            {alert.actionRequired && (
              <span className="text-slate-600 font-medium flex items-center gap-1 flex-wrap">
                <span className="text-slate-400">Suggested Action:</span>
                <span className="text-slate-800 font-semibold">{alert.actionRequired}</span>
              </span>
            )}

            <div className="flex items-center gap-3 ml-auto">
              {alert.animalId && (
                <Link
                  to={`${basePath}/animals/${alert.animalId}`}
                  className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  <span>View Animal</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

