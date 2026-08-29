import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function AnimalTable({ animals, basePath = "/farmer/animals", limit }) {
  const displayList = limit ? animals.slice(0, limit) : animals;

  if (displayList.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
        <p className="font-medium">No animals found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3.5">Animal ID</th>
              <th className="px-5 py-3.5">Breed / Age</th>
              <th className="px-5 py-3.5">Milk Yield</th>
              <th className="px-5 py-3.5">Conductivity</th>
              <th className="px-5 py-3.5">Temperature</th>
              <th className="px-5 py-3.5">Risk Level</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {displayList.map((animal) => (
              <tr key={animal.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      {animal.id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 block">{animal.id}</span>
                      <span className="text-xs text-slate-500">{animal.tag}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <span className="font-medium text-slate-800 block">{animal.breed}</span>
                    <span className="text-xs text-slate-500">{animal.age} • {animal.lactation}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-semibold text-slate-800">{animal.milkYield}</span>
                  <span className="text-xs text-slate-500 ml-1">L/day</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-medium ${animal.milkConductivity >= 6.5 ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                    {animal.milkConductivity}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">mS/cm</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-medium ${animal.milkTemperature >= 39.4 ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                    {animal.milkTemperature}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">°C</span>
                </td>
                <td className="px-5 py-4">
                  <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={`${basePath}/${animal.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
