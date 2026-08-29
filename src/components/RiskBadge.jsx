import React from 'react';

export default function RiskBadge({ level, score }) {
  let badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let dotStyle = "bg-emerald-500";
  let label = level || "Healthy";

  const upper = String(label).toUpperCase();

  if (upper.includes("HIGH") || (typeof score === 'number' && score >= 70)) {
    badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
    dotStyle = "bg-rose-500 animate-pulse";
    label = "High Risk";
  } else if (upper.includes("ATTENTION") || upper.includes("MED") || (typeof score === 'number' && score >= 45)) {
    badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
    dotStyle = "bg-amber-500";
    label = "Needs Attention";
  } else {
    badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotStyle = "bg-emerald-500";
    label = "Low Risk";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
      <span>{label}</span>
      {typeof score === 'number' && <span className="opacity-75">({score}%)</span>}
    </span>
  );
}
