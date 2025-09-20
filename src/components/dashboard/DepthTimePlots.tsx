import React, { useState } from 'react';
import { Activity, Thermometer, Droplets, Calendar, Layers } from 'lucide-react';

interface DepthTimePlotsProps {
  filters: any;
}

const DepthTimePlots: React.FC<DepthTimePlotsProps> = ({ filters }) => {
  const [selectedParameter, setSelectedParameter] = useState<'temperature' | 'salinity'>('temperature');
  const [selectedFloat, setSelectedFloat] = useState(1);

  // Sample depth-time data
  const generateDepthTimeData = (parameter: 'temperature' | 'salinity') => {
    const depths = [0, 50, 100, 200, 400, 600, 800, 1000, 1200, 1500, 2000];
    const timePoints = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return depths.map(depth => ({
      depth,
      data: timePoints.map(month => {
        if (parameter === 'temperature') {
          // Temperature decreases with depth and varies seasonally
          const surfaceTemp = 20 + Math.sin((timePoints.indexOf(month) / 12) * 2 * Math.PI) * 5;
          const depthEffect = Math.exp(-depth / 1000) * 0.8;
          return Math.max(2, surfaceTemp * depthEffect + Math.random() * 2);
        } else {
          // Salinity is more stable but increases slightly with depth
          const baseSalinity = 35 + (depth / 2000) * 0.5;
          return baseSalinity + Math.random() * 0.5 - 0.25;
        }
      })
    }));
  };

  const temperatureData = generateDepthTimeData('temperature');
  const salinityData = generateDepthTimeData('salinity');
  const currentData = selectedParameter === 'temperature' ? temperatureData : salinityData;

  const floatOptions = [
    { id: 1, name: 'ARGO Float #001', region: 'Pacific Ocean' },
    { id: 2, name: 'ARGO Float #002', region: 'Atlantic Ocean' },
    { id: 3, name: 'ARGO Float #003', region: 'Indian Ocean' }
  ];

  const getColorForValue = (value: number, parameter: 'temperature' | 'salinity') => {
    if (parameter === 'temperature') {
      const normalized = Math.max(0, Math.min(1, (value - 2) / 28)); // 2-30°C range
      const hue = 240 - normalized * 240; // Blue to red
      return `hsl(${hue}, 70%, ${40 + normalized * 30}%)`;
    } else {
      const normalized = Math.max(0, Math.min(1, (value - 34) / 3)); // 34-37 PSU range
      const hue = 200 - normalized * 60; // Cyan to blue
      return `hsl(${hue}, 70%, ${40 + normalized * 30}%)`;
    }
  };

  const timePoints = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Calculate mixed layer depth (simplified)
  const calculateMixedLayerDepth = () => {
    return timePoints.map(month => {
      const monthIndex = timePoints.indexOf(month);
      // Seasonal variation in mixed layer depth
      const seasonal = 50 + Math.sin((monthIndex / 12) * 2 * Math.PI) * 30;
      return Math.max(20, seasonal + Math.random() * 20);
    });
  };

  const mixedLayerDepths = calculateMixedLayerDepth();

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          Depth-Time Analysis
        </h2>
        <p className="text-gray-300">Interactive heatmaps showing parameter changes over time and depth</p>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Float Selection */}
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Select Float:</label>
            <select
              value={selectedFloat}
              onChange={(e) => setSelectedFloat(Number(e.target.value))}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {floatOptions.map(option => (
                <option key={option.id} value={option.id} className="bg-slate-800">
                  {option.name} - {option.region}
                </option>
              ))}
            </select>
          </div>

          {/* Parameter Selection */}
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Parameter:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedParameter('temperature')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedParameter === 'temperature'
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                <Thermometer className="w-4 h-4" />
                Temperature
              </button>
              <button
                onClick={() => setSelectedParameter('salinity')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedParameter === 'salinity'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                <Droplets className="w-4 h-4" />
                Salinity
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Depth-Time Heatmap */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          {selectedParameter === 'temperature' ? 'Temperature' : 'Salinity'} Depth-Time Heatmap
        </h3>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Time axis labels */}
            <div className="flex mb-2">
              <div className="w-20"></div> {/* Space for depth labels */}
              {timePoints.map(month => (
                <div key={month} className="flex-1 text-center text-sm text-gray-300 font-medium">
                  {month}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-1">
              {currentData.map((depthRow, depthIndex) => (
                <div key={depthRow.depth} className="flex items-center">
                  {/* Depth label */}
                  <div className="w-20 text-right pr-4 text-sm text-gray-300 font-medium">
                    {depthRow.depth}m
                  </div>
                  
                  {/* Data cells */}
                  <div className="flex flex-1 gap-1">
                    {depthRow.data.map((value, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="flex-1 h-8 rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 relative group"
                        style={{ backgroundColor: getColorForValue(value, selectedParameter) }}
                        title={`${timePoints[timeIndex]}: ${value.toFixed(1)}${selectedParameter === 'temperature' ? '°C' : ' PSU'} at ${depthRow.depth}m`}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {value.toFixed(1)}{selectedParameter === 'temperature' ? '°C' : ' PSU'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Color scale */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-sm text-gray-400">
                {selectedParameter === 'temperature' ? 'Cold' : 'Low Salinity'}
              </span>
              <div className="flex h-4 w-64 rounded overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ 
                      backgroundColor: getColorForValue(
                        selectedParameter === 'temperature' 
                          ? 2 + (i / 19) * 28 
                          : 34 + (i / 19) * 3, 
                        selectedParameter
                      ) 
                    }}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {selectedParameter === 'temperature' ? 'Hot' : 'High Salinity'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Profile */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Latest Vertical Profile
          </h3>
          <div className="h-64 flex items-end justify-between gap-1">
            {currentData.map((depthRow, index) => {
              const latestValue = depthRow.data[depthRow.data.length - 1];
              const maxValue = selectedParameter === 'temperature' ? 30 : 37;
              const minValue = selectedParameter === 'temperature' ? 2 : 34;
              const height = ((latestValue - minValue) / (maxValue - minValue)) * 200;
              
              return (
                <div key={depthRow.depth} className="flex flex-col items-center gap-1 flex-1">
                  <div className="text-xs text-gray-300 font-medium">
                    {latestValue.toFixed(1)}
                  </div>
                  <div 
                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ 
                      height: `${height}px`,
                      backgroundColor: getColorForValue(latestValue, selectedParameter)
                    }}
                  ></div>
                  <div className="text-xs text-gray-400 transform -rotate-45 origin-center">
                    {depthRow.depth}m
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            Mixed Layer Depth
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {mixedLayerDepths.map((depth, index) => {
              const height = (depth / 100) * 200; // Scale to fit chart
              
              return (
                <div key={timePoints[index]} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-xs text-gray-300 font-medium">{depth.toFixed(0)}m</div>
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t transition-all duration-300 hover:from-cyan-400 hover:to-cyan-200"
                    style={{ height: `${height}px` }}
                  ></div>
                  <div className="text-xs text-gray-400">{timePoints[index]}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-gray-400 text-center">
            Estimated mixed layer depth throughout the year
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Statistical Analysis</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">
              {selectedParameter === 'temperature' ? '18.5°C' : '35.1 PSU'}
            </div>
            <div className="text-sm text-gray-300">Surface Average</div>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">
              {selectedParameter === 'temperature' ? '4.2°C' : '35.8 PSU'}
            </div>
            <div className="text-sm text-gray-300">Deep Average</div>
          </div>
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">
              {selectedParameter === 'temperature' ? '14.3°C' : '0.7 PSU'}
            </div>
            <div className="text-sm text-gray-300">Range</div>
          </div>
          <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">
              {selectedParameter === 'temperature' ? '-0.014°C/m' : '+0.0004 PSU/m'}
            </div>
            <div className="text-sm text-gray-300">Avg Gradient</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepthTimePlots;