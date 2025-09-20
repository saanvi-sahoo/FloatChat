import React, { useState } from 'react';
import { TrendingUp, BarChart3, Activity, Thermometer, Droplets } from 'lucide-react';

interface VisualizationChartsProps {
  filters: any;
}

const VisualizationCharts: React.FC<VisualizationChartsProps> = ({ filters }) => {
  const [activeChart, setActiveChart] = useState<'temperature' | 'salinity' | 'depth'>('temperature');

  // Sample data for visualizations
  const temperatureData = [
    { month: 'Jan', value: 18.2, depth: 0 },
    { month: 'Feb', value: 18.8, depth: 50 },
    { month: 'Mar', value: 19.5, depth: 100 },
    { month: 'Apr', value: 20.8, depth: 200 },
    { month: 'May', value: 22.1, depth: 400 },
    { month: 'Jun', value: 24.3, depth: 600 },
    { month: 'Jul', value: 25.8, depth: 800 },
    { month: 'Aug', value: 26.1, depth: 1000 },
    { month: 'Sep', value: 24.9, depth: 1200 },
    { month: 'Oct', value: 22.7, depth: 1500 },
    { month: 'Nov', value: 20.4, depth: 1800 },
    { month: 'Dec', value: 19.1, depth: 2000 }
  ];

  const salinityData = [
    { month: 'Jan', value: 35.1 },
    { month: 'Feb', value: 35.2 },
    { month: 'Mar', value: 35.0 },
    { month: 'Apr', value: 34.9 },
    { month: 'May', value: 35.3 },
    { month: 'Jun', value: 35.5 },
    { month: 'Jul', value: 35.8 },
    { month: 'Aug', value: 35.9 },
    { month: 'Sep', value: 35.6 },
    { month: 'Oct', value: 35.4 },
    { month: 'Nov', value: 35.2 },
    { month: 'Dec', value: 35.1 }
  ];

  const depthProfileData = [
    { depth: 0, temp: 24.5, salinity: 35.1 },
    { depth: 100, temp: 23.8, salinity: 35.2 },
    { depth: 200, temp: 22.1, salinity: 35.0 },
    { depth: 400, temp: 20.4, salinity: 34.9 },
    { depth: 600, temp: 18.7, salinity: 35.3 },
    { depth: 800, temp: 16.2, salinity: 35.5 },
    { depth: 1000, temp: 14.8, salinity: 35.8 },
    { depth: 1200, temp: 12.3, salinity: 35.9 },
    { depth: 1500, temp: 10.1, salinity: 35.6 },
    { depth: 2000, temp: 8.5, salinity: 35.4 }
  ];

  const chartOptions = [
    { id: 'temperature', label: 'Temperature Trends', icon: Thermometer, color: 'text-red-400' },
    { id: 'salinity', label: 'Salinity Variations', icon: Droplets, color: 'text-blue-400' },
    { id: 'depth', label: 'Depth Profiles', icon: Activity, color: 'text-green-400' }
  ];

  const renderTemperatureChart = () => {
    const maxValue = Math.max(...temperatureData.map(d => d.value));
    const minValue = Math.min(...temperatureData.map(d => d.value));
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-red-400" />
          Monthly Temperature Trends
        </h3>
        <div className="h-64 flex items-end justify-between gap-2 p-4 bg-white/5 rounded-lg">
          {temperatureData.map((data, index) => {
            const height = ((data.value - minValue) / (maxValue - minValue)) * 200;
            return (
              <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="text-xs text-gray-300 font-medium">{data.value}°C</div>
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded-t transition-all duration-1000 hover:from-red-400 hover:to-red-200"
                  style={{ height: `${height}px` }}
                ></div>
                <div className="text-xs text-gray-400">{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSalinityChart = () => {
    const maxValue = Math.max(...salinityData.map(d => d.value));
    const minValue = Math.min(...salinityData.map(d => d.value));
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          Monthly Salinity Variations
        </h3>
        <div className="h-64 flex items-end justify-between gap-2 p-4 bg-white/5 rounded-lg">
          {salinityData.map((data, index) => {
            const height = ((data.value - minValue) / (maxValue - minValue)) * 200;
            return (
              <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="text-xs text-gray-300 font-medium">{data.value}</div>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-1000 hover:from-blue-400 hover:to-blue-200"
                  style={{ height: `${height}px` }}
                ></div>
                <div className="text-xs text-gray-400">{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDepthProfile = () => {
    const maxTemp = Math.max(...depthProfileData.map(d => d.temp));
    const minTemp = Math.min(...depthProfileData.map(d => d.temp));
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          Temperature vs Depth Profile
        </h3>
        <div className="h-64 flex justify-between items-start gap-1 p-4 bg-white/5 rounded-lg">
          {depthProfileData.map((data, index) => {
            const tempWidth = ((data.temp - minTemp) / (maxTemp - minTemp)) * 100;
            const salinityWidth = ((data.salinity - 34.5) / (36.5 - 34.5)) * 100;
            
            return (
              <div key={data.depth} className="flex flex-col items-center gap-1 flex-1">
                <div className="text-xs text-gray-300 font-medium">{data.depth}m</div>
                <div className="w-full h-4 bg-gray-700 rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-1000"
                    style={{ width: `${tempWidth}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{data.temp}°C</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          Ocean Data Visualizations
        </h2>
        <p className="text-gray-300">Interactive charts showing ARGO float measurements</p>
      </div>

      {/* Chart Type Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveChart(option.id as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeChart === option.id
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/10 text-gray-300 hover:bg-white/15'
            }`}
          >
            <option.icon className={`w-4 h-4 ${option.color}`} />
            {option.label}
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        {activeChart === 'temperature' && renderTemperatureChart()}
        {activeChart === 'salinity' && renderSalinityChart()}
        {activeChart === 'depth' && renderDepthProfile()}
      </div>

      {/* Summary Statistics */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Data Summary
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">22.3°C</div>
            <div className="text-sm text-gray-300">Avg Temperature</div>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">35.2 PSU</div>
            <div className="text-sm text-gray-300">Avg Salinity</div>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">847m</div>
            <div className="text-sm text-gray-300">Avg Depth</div>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">3,847</div>
            <div className="text-sm text-gray-300">Active Floats</div>
          </div>
        </div>
      </div>

      {/* Heatmap Visualization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Global Temperature Distribution</h3>
        <div className="grid grid-cols-5 gap-1 h-32">
          {Array.from({ length: 25 }, (_, i) => {
            const temp = 15 + Math.random() * 15; // Random temperature between 15-30°C
            const intensity = (temp - 15) / 15; // Normalize to 0-1
            return (
              <div
                key={i}
                className="rounded transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center text-xs font-medium text-white"
                style={{
                  backgroundColor: `hsl(${240 - intensity * 240}, 70%, ${30 + intensity * 40}%)`
                }}
                title={`${temp.toFixed(1)}°C`}
              >
                {temp.toFixed(0)}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <span>Cold (15°C)</span>
          <span>Temperature Scale</span>
          <span>Hot (30°C)</span>
        </div>
      </div>
    </div>
  );
};

export default VisualizationCharts;