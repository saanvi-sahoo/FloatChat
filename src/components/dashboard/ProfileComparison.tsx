import React, { useState } from 'react';
import { Users, Thermometer, Droplets, TrendingUp, MapPin } from 'lucide-react';

interface ProfileComparisonProps {
  filters: any;
}

const ProfileComparison: React.FC<ProfileComparisonProps> = ({ filters }) => {
  const [selectedFloats, setSelectedFloats] = useState<number[]>([1, 2, 3]);
  const [selectedParameter, setSelectedParameter] = useState<'temperature' | 'salinity'>('temperature');

  // Sample float data with profiles
  const floatProfiles = {
    1: {
      name: 'ARGO Float #001',
      location: { lat: 20.5, lng: -157.8 },
      region: 'Pacific Ocean',
      date: '2024-01-15',
      color: 'rgb(239, 68, 68)', // red-500
      profile: {
        temperature: [
          { depth: 0, value: 24.5 },
          { depth: 50, value: 23.8 },
          { depth: 100, value: 22.1 },
          { depth: 200, value: 20.4 },
          { depth: 400, value: 18.7 },
          { depth: 600, value: 16.2 },
          { depth: 800, value: 14.8 },
          { depth: 1000, value: 12.3 },
          { depth: 1200, value: 10.1 },
          { depth: 1500, value: 8.5 },
          { depth: 2000, value: 6.2 }
        ],
        salinity: [
          { depth: 0, value: 35.1 },
          { depth: 50, value: 35.2 },
          { depth: 100, value: 35.0 },
          { depth: 200, value: 34.9 },
          { depth: 400, value: 35.3 },
          { depth: 600, value: 35.5 },
          { depth: 800, value: 35.8 },
          { depth: 1000, value: 35.9 },
          { depth: 1200, value: 35.6 },
          { depth: 1500, value: 35.4 },
          { depth: 2000, value: 35.2 }
        ]
      }
    },
    2: {
      name: 'ARGO Float #002',
      location: { lat: 35.7, lng: -75.4 },
      region: 'Atlantic Ocean',
      date: '2024-01-15',
      color: 'rgb(59, 130, 246)', // blue-500
      profile: {
        temperature: [
          { depth: 0, value: 18.3 },
          { depth: 50, value: 17.9 },
          { depth: 100, value: 16.8 },
          { depth: 200, value: 15.2 },
          { depth: 400, value: 13.1 },
          { depth: 600, value: 11.5 },
          { depth: 800, value: 9.8 },
          { depth: 1000, value: 8.2 },
          { depth: 1200, value: 6.9 },
          { depth: 1500, value: 5.1 },
          { depth: 2000, value: 3.8 }
        ],
        salinity: [
          { depth: 0, value: 36.1 },
          { depth: 50, value: 36.2 },
          { depth: 100, value: 36.0 },
          { depth: 200, value: 35.9 },
          { depth: 400, value: 35.8 },
          { depth: 600, value: 35.7 },
          { depth: 800, value: 35.6 },
          { depth: 1000, value: 35.5 },
          { depth: 1200, value: 35.4 },
          { depth: 1500, value: 35.3 },
          { depth: 2000, value: 35.2 }
        ]
      }
    },
    3: {
      name: 'ARGO Float #003',
      location: { lat: -10.2, lng: 142.8 },
      region: 'Pacific Ocean',
      date: '2024-01-14',
      color: 'rgb(34, 197, 94)', // green-500
      profile: {
        temperature: [
          { depth: 0, value: 28.1 },
          { depth: 50, value: 27.5 },
          { depth: 100, value: 26.2 },
          { depth: 200, value: 24.8 },
          { depth: 400, value: 22.1 },
          { depth: 600, value: 19.8 },
          { depth: 800, value: 17.2 },
          { depth: 1000, value: 14.9 },
          { depth: 1200, value: 12.5 },
          { depth: 1500, value: 10.2 },
          { depth: 2000, value: 7.8 }
        ],
        salinity: [
          { depth: 0, value: 34.8 },
          { depth: 50, value: 34.9 },
          { depth: 100, value: 34.7 },
          { depth: 200, value: 34.6 },
          { depth: 400, value: 34.8 },
          { depth: 600, value: 35.0 },
          { depth: 800, value: 35.2 },
          { depth: 1000, value: 35.4 },
          { depth: 1200, value: 35.3 },
          { depth: 1500, value: 35.1 },
          { depth: 2000, value: 35.0 }
        ]
      }
    }
  };

  const availableFloats = Object.entries(floatProfiles).map(([id, data]) => ({
    id: parseInt(id),
    ...data
  }));

  const handleFloatToggle = (floatId: number) => {
    setSelectedFloats(prev => {
      if (prev.includes(floatId)) {
        return prev.filter(id => id !== floatId);
      } else if (prev.length < 3) {
        return [...prev, floatId];
      }
      return prev;
    });
  };

  const getProfileStats = (floatId: number) => {
    const float = floatProfiles[floatId as keyof typeof floatProfiles];
    if (!float) return null;

    const profile = float.profile[selectedParameter];
    const surfaceValue = profile[0].value;
    const deepValue = profile[profile.length - 1].value;
    const range = Math.abs(surfaceValue - deepValue);
    const gradient = (deepValue - surfaceValue) / profile[profile.length - 1].depth;

    return {
      surface: surfaceValue,
      deep: deepValue,
      range,
      gradient
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          Profile Comparison
        </h2>
        <p className="text-gray-300">Compare vertical profiles from multiple ARGO floats</p>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
          {/* Float Selection */}
          <div className="flex-1">
            <label className="block text-white font-medium mb-3">Select Floats (max 3):</label>
            <div className="grid md:grid-cols-3 gap-3">
              {availableFloats.map(float => (
                <label
                  key={float.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedFloats.includes(float.id)
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFloats.includes(float.id)}
                    onChange={() => handleFloatToggle(float.id)}
                    className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: float.color }}
                      ></div>
                      <span className="text-white font-medium">{float.name}</span>
                    </div>
                    <div className="text-sm text-gray-400">{float.region}</div>
                  </div>
                </label>
              ))}
            </div>
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

      {/* Profile Comparison Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          {selectedParameter === 'temperature' ? 'Temperature' : 'Salinity'} Profiles
        </h3>
        
        <div className="h-96 relative">
          {/* Chart area */}
          <div className="absolute inset-4 border-l-2 border-b-2 border-white/20">
            {/* Y-axis labels (depth) */}
            <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-sm text-gray-400">
              <span>0m</span>
              <span>500m</span>
              <span>1000m</span>
              <span>1500m</span>
              <span>2000m</span>
            </div>

            {/* X-axis labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm text-gray-400">
              <span>{selectedParameter === 'temperature' ? '0°C' : '34 PSU'}</span>
              <span>{selectedParameter === 'temperature' ? '15°C' : '35 PSU'}</span>
              <span>{selectedParameter === 'temperature' ? '30°C' : '36 PSU'}</span>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0.2, 0.4, 0.6, 0.8].map(percent => (
                <div key={percent} className="absolute w-full h-px bg-white/10" style={{ top: `${percent * 100}%` }}></div>
              ))}
              {[0.25, 0.5, 0.75].map(percent => (
                <div key={percent} className="absolute h-full w-px bg-white/10" style={{ left: `${percent * 100}%` }}></div>
              ))}
            </div>

            {/* Profile lines */}
            <svg className="absolute inset-0 w-full h-full">
              {selectedFloats.map(floatId => {
                const float = floatProfiles[floatId as keyof typeof floatProfiles];
                if (!float) return null;

                const profile = float.profile[selectedParameter];
                const maxValue = selectedParameter === 'temperature' ? 30 : 36;
                const minValue = selectedParameter === 'temperature' ? 0 : 34;
                const maxDepth = 2000;

                const points = profile.map(point => {
                  const x = ((point.value - minValue) / (maxValue - minValue)) * 100;
                  const y = (point.depth / maxDepth) * 100;
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <g key={floatId}>
                    <polyline
                      points={points}
                      fill="none"
                      stroke={float.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                    {/* Data points */}
                    {profile.map((point, index) => {
                      const x = ((point.value - minValue) / (maxValue - minValue)) * 100;
                      const y = (point.depth / maxDepth) * 100;
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill={float.color}
                          className="hover:r-6 transition-all cursor-pointer"
                        >
                          <title>{`${float.name}: ${point.value.toFixed(1)}${selectedParameter === 'temperature' ? '°C' : ' PSU'} at ${point.depth}m`}</title>
                        </circle>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Float Information Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {selectedFloats.map(floatId => {
          const float = floatProfiles[floatId as keyof typeof floatProfiles];
          if (!float) return null;

          return (
            <div key={floatId} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: float.color }}
                ></div>
                <h3 className="text-lg font-semibold text-white">{float.name}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    {float.location.lat.toFixed(2)}°, {float.location.lng.toFixed(2)}°
                  </span>
                </div>
                <div className="text-sm text-gray-400">{float.region}</div>
                <div className="text-sm text-gray-400">Date: {float.date}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistical Comparison */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Statistical Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Float</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Surface Value</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Deep Value</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Range</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Gradient</th>
              </tr>
            </thead>
            <tbody>
              {selectedFloats.map(floatId => {
                const float = floatProfiles[floatId as keyof typeof floatProfiles];
                const stats = getProfileStats(floatId);
                if (!float || !stats) return null;

                return (
                  <tr key={floatId} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: float.color }}
                        ></div>
                        <span className="text-white font-medium">{float.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 text-gray-300">
                      {stats.surface.toFixed(1)}{selectedParameter === 'temperature' ? '°C' : ' PSU'}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-300">
                      {stats.deep.toFixed(1)}{selectedParameter === 'temperature' ? '°C' : ' PSU'}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-300">
                      {stats.range.toFixed(1)}{selectedParameter === 'temperature' ? '°C' : ' PSU'}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-300">
                      {stats.gradient.toFixed(4)}{selectedParameter === 'temperature' ? '°C/m' : ' PSU/m'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileComparison;