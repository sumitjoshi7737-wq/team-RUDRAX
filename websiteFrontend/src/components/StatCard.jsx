import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = "amber", trend }) {
  const colorMap = {
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
    }
  };

  const scheme = colorMap[color] || colorMap.amber;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.text} ${scheme.border} border`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{subtitle}</span>
          {trend && (
            <span className={`font-medium ${trend.isPositive ? 'text-amber-600' : 'text-rose-600'}`}>
              {trend.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

