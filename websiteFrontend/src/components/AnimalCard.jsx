import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function AnimalCard({ animal, basePath = "/farmer/animals" }) {
  const hasBehaviourAlert = animal.behaviour && (
    animal.behaviour.eating !== "Normal" ||
    animal.behaviour.activity !== "Normal" ||
    animal.behaviour.movement !== "Normal" ||
    animal.behaviour.waterDrinking !== "Normal"
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">
              {animal.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800">{animal.id}</h3>
                <span className="text-xs text-slate-500 font-medium">({animal.tag})</span>
              </div>
              <p className="text-xs text-slate-500">{animal.breed}</p>
            </div>
          </div>
          <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 py-3 px-3 bg-slate-50 rounded-lg text-center">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Yield</span>
            <span className="text-xs font-bold text-slate-700">{animal.milkYield} L</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Temp</span>
            <span className={`text-xs font-bold ${animal.milkTemperature >= 39.4 ? 'text-rose-600' : 'text-slate-700'}`}>
              {animal.milkTemperature}°C
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Cond.</span>
            <span className={`text-xs font-bold ${animal.milkConductivity >= 6.5 ? 'text-rose-600' : 'text-slate-700'}`}>
              {animal.milkConductivity}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>{animal.age}</span>
          <span>{animal.lactation}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className={`text-xs truncate max-w-[150px] font-medium ${hasBehaviourAlert ? 'text-amber-700' : 'text-slate-400'}`}>
          {hasBehaviourAlert ? `⚠️ Behaviour: ${animal.behaviour.eating !== 'Normal' ? 'Eating less' : 'Less active'}` : '✓ Normal Behaviour'}
        </span>
        <Link
          to={`${basePath}/${animal.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          <span>View</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
