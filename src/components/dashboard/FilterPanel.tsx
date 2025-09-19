import React from 'react';
import { X, Calendar, MapPin, Layers } from 'lucide-react';

interface FilterPanelProps {
  filters: any;
  setFilters: (filters: any) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, onClose }) => {
  const regions = [
    { id: 'global', label: 'Global Ocean' },
    { id: 'atlantic', label: 'Atlantic Ocean' },
    { id: 'pacific', label: 'Pacific Ocean' },
    { id: 'indian', label: 'Indian Ocean' },
    { id: 'arctic', label: 'Arctic Ocean' },
    { id: 'southern', label: 'Southern Ocean' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          Advanced Filters
        </h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Region Selection */}
        <div>
          <label className="block text-sm font-medium text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-400" />
            Ocean Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id} className="bg-slate-800">
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Depth Range */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Depth Range (meters)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Min Depth</label>
              <input
                type="number"
                value={filters.depth.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  depth: { ...prev.depth, min: parseInt(e.target.value) || 0 }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="2000"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Max Depth</label>
              <input
                type="number"
                value={filters.depth.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  depth: { ...prev.depth, max: parseInt(e.target.value) || 2000 }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="2000"
              />
            </div>
          </div>
        </div>

        {/* Apply/Reset Buttons */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              // Apply filters logic here
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              setFilters({
                dateRange: { start: '2024-01-01', end: '2024-12-31' },
                parameters: ['temperature', 'salinity'],
                region: 'global',
                depth: { min: 0, max: 2000 }
              });
            }}
            className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/15 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;