import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Download, 
  Filter, 
  Calendar, 
  Thermometer, 
  Droplets, 
  Activity,
  MapPin,
  BarChart3,
  Table,
  Settings,
  RefreshCw
} from 'lucide-react';
import GeospatialMap from './dashboard/GeospatialMap';
import DataTable from './dashboard/DataTable';
import VisualizationCharts from './dashboard/VisualizationCharts';
import ExportPanel from './dashboard/ExportPanel';
import FilterPanel from './dashboard/FilterPanel';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'map' | 'charts' | 'table'>('map');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    dateRange: { start: '2024-01-01', end: '2024-12-31' },
    parameters: ['temperature', 'salinity'],
    region: 'global',
    depth: { min: 0, max: 2000 }
  });

  const viewOptions = [
    { id: 'map', label: 'Geospatial Map', icon: Globe },
    { id: 'charts', label: 'Visualizations', icon: BarChart3 },
    { id: 'table', label: 'Data Table', icon: Table }
  ];

  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-16">
      {/* Dashboard Header */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-900/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Globe className="w-8 h-8 text-blue-400" />
                  </div>
                  Ocean Data Dashboard
                </h1>
                <p className="text-gray-300 mt-2">
                  Explore global ARGO float data with interactive visualizations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    showFilters 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/15'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <button
                  onClick={() => setShowExport(!showExport)}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/30 transition-all duration-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>

                <button
                  onClick={handleRefreshData}
                  disabled={isLoading}
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/30 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 mt-6">
              {viewOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveView(option.id as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeView === option.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/15'
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Panels */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Floats</span>
                  <span className="text-cyan-400 font-semibold">3,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Data Points</span>
                  <span className="text-green-400 font-semibold">2.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Update</span>
                  <span className="text-yellow-400 font-semibold">2h ago</span>
                </div>
              </div>
            </div>

            {/* Parameter Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
              <div className="space-y-3">
                {[
                  { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'text-red-400' },
                  { id: 'salinity', label: 'Salinity', icon: Droplets, color: 'text-blue-400' },
                  { id: 'pressure', label: 'Pressure', icon: Activity, color: 'text-purple-400' }
                ].map((param) => (
                  <label key={param.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.parameters.includes(param.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({
                            ...prev,
                            parameters: [...prev.parameters, param.id]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            parameters: prev.parameters.filter(p => p !== param.id)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <param.icon className={`w-4 h-4 ${param.color}`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {param.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            )}

            {/* Export Panel */}
            {showExport && (
              <ExportPanel onClose={() => setShowExport(false)} />
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              {activeView === 'map' && <GeospatialMap filters={filters} />}
              {activeView === 'charts' && <VisualizationCharts filters={filters} />}
              {activeView === 'table' && <DataTable filters={filters} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;