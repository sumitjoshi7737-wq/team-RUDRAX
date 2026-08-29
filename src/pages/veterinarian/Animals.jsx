import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AnimalTable from '../../components/AnimalTable';
import AnimalCard from '../../components/AnimalCard';
import { animalsData } from '../../data/animals';
import { Search, Filter, LayoutGrid, Table } from 'lucide-react';

export default function VetAnimals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table');

  const filters = ['All', 'High Risk', 'Medium Risk', 'Low Risk', 'Healthy'];

  const filteredAnimals = useMemo(() => {
    return animalsData.filter((animal) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        animal.id.toLowerCase().includes(query) ||
        animal.tag.toLowerCase().includes(query) ||
        animal.breed.toLowerCase().includes(query);

      let matchesFilter = true;
      if (selectedFilter === 'Healthy') {
        matchesFilter = animal.riskLevel === 'Healthy' || animal.riskScore < 30;
      } else if (selectedFilter === 'Low Risk') {
        matchesFilter = animal.riskLevel === 'Low' || (animal.riskScore >= 30 && animal.riskScore < 45);
      } else if (selectedFilter === 'Medium Risk') {
        matchesFilter = animal.riskLevel === 'Medium' || (animal.riskScore >= 45 && animal.riskScore < 70);
      } else if (selectedFilter === 'High Risk') {
        matchesFilter = animal.riskLevel === 'High' || animal.riskScore >= 70;
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  return (
    <DashboardLayout role="veterinarian" title="Clinical Animal Patient Registry">
      <div className="space-y-6">
        {/* Top Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Animal ID, Tag, or Breed..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Table className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {filters.map((filter) => {
            const count = filter === 'All' 
              ? animalsData.length
              : filter === 'Healthy'
              ? animalsData.filter(a => a.riskLevel === 'Healthy' || a.riskScore < 30).length
              : filter === 'Low Risk'
              ? animalsData.filter(a => a.riskLevel === 'Low' || (a.riskScore >= 30 && a.riskScore < 45)).length
              : filter === 'Medium Risk'
              ? animalsData.filter(a => a.riskLevel === 'Medium' || (a.riskScore >= 45 && a.riskScore < 70)).length
              : animalsData.filter(a => a.riskLevel === 'High' || a.riskScore >= 70).length;

            const isSelected = selectedFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{filter}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Listing */}
        {viewMode === 'table' ? (
          <AnimalTable animals={filteredAnimals} basePath="/veterinarian/animals" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} basePath="/veterinarian/animals" />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

