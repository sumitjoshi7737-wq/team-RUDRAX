import React from 'react';

export default function RiskBadge({ level, score }) {
  let badgeStyle = "bg-emerald-100 text-emerald-900 border-emerald-200";
  let dotStyle = "bg-emerald-600";
  let label = level || "Healthy";

  const upper = String(label).toUpperCase();

  if (upper.includes("HIGH") || (typeof score === 'number' && score >= 70)) {
    badgeStyle = "bg-rose-100 text-rose-900 border-rose-200";
    dotStyle = "bg-rose-600 animate-pulse";
    label = "High Risk";
  } else if (upper.includes("ATTENTION") || upper.includes("MED") || (typeof score === 'number' && score >= 45)) {
    badgeStyle = "bg-amber-100 text-amber-900 border-amber-200";
    dotStyle = "bg-amber-600";
    label = "Needs Attention";
  } else {
    badgeStyle = "bg-emerald-100 text-emerald-900 border-emerald-200";
    dotStyle = "bg-emerald-600";
    label = "Low Risk";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
      <span>{label}</span>
      {typeof score === 'number' && <span className="opacity-80">({score}%)</span>}
    </span>
  );
}
