import React, { useState } from 'react';
import { MapPin, Thermometer, Droplets, Activity } from 'lucide-react';

interface GeospatialMapProps {
  filters: any;
}

const GeospatialMap: React.FC<GeospatialMapProps> = ({ filters }) => {
  const [selectedFloat, setSelectedFloat] = useState<number | null>(null);

  // Sample ARGO float data
  const floatData = [
    { id: 1, lat: 20.5, lng: -157.8, temp: 24.5, salinity: 35.2, status: 'active', region: 'Pacific' },
    { id: 2, lat: 35.7, lng: -75.4, temp: 18.3, salinity: 36.1, status: 'active', region: 'Atlantic' },
    { id: 3, lat: -10.2, lng: 142.8, temp: 28.1, salinity: 34.8, status: 'inactive', region: 'Pacific' },
    { id: 4, lat: 55.3, lng: -12.6, temp: 8.7, salinity: 35.0, status: 'active', region: 'Atlantic' },
    { id: 5, lat: -35.8, lng: 18.4, temp: 15.2, salinity: 35.5, status: 'active', region: 'Atlantic' },
    { id: 6, lat: 40.7, lng: -74.0, temp: 20.1, salinity: 35.8, status: 'active', region: 'Atlantic' },
    { id: 7, lat: 25.3, lng: 55.4, temp: 26.8, salinity: 36.5, status: 'active', region: 'Indian' },
    { id: 8, lat: -20.1, lng: -40.3, temp: 22.4, salinity: 36.2, status: 'inactive', region: 'Atlantic' },
  ];

  const getMarkerColor = (temp: number) => {
    if (temp < 10) return 'bg-blue-500'; // Blue for cold
    if (temp < 20) return 'bg-green-500'; // Green for moderate
    if (temp < 25) return 'bg-yellow-500'; // Yellow for warm
    return 'bg-red-500'; // Red for hot
  };

  const getMarkerPosition = (lat: number, lng: number) => {
    // Convert lat/lng to percentage positions on the map
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className="h-[600px] w-full relative">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Legend
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Cold (&lt;10°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Moderate (10-20°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Warm (20-25°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Hot (&gt;25°C)</span>
          </div>
        </div>
      </div>

      {/* World Map Background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-xl overflow-hidden relative">
        {/* Ocean background with wave pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
            `
          }}
        ></div>

        {/* Continent shapes (simplified) */}
        <div className="absolute inset-0">
          {/* North America */}
          <div className="absolute w-16 h-20 bg-green-700/40 rounded-lg" style={{ left: '15%', top: '25%' }}></div>
          {/* South America */}
          <div className="absolute w-8 h-24 bg-green-600/40 rounded-lg" style={{ left: '22%', top: '45%' }}></div>
          {/* Europe */}
          <div className="absolute w-12 h-8 bg-green-700/40 rounded-lg" style={{ left: '48%', top: '20%' }}></div>
          {/* Africa */}
          <div className="absolute w-10 h-20 bg-green-600/40 rounded-lg" style={{ left: '52%', top: '35%' }}></div>
          {/* Asia */}
          <div className="absolute w-20 h-16 bg-green-700/40 rounded-lg" style={{ left: '65%', top: '20%' }}></div>
          {/* Australia */}
          <div className="absolute w-8 h-6 bg-green-600/40 rounded-lg" style={{ left: '75%', top: '65%' }}></div>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0">
          {/* Latitude lines */}
          {[20, 40, 60, 80].map(percent => (
            <div 
              key={`lat-${percent}`}
              className="absolute w-full h-px bg-white/10"
              style={{ top: `${percent}%` }}
            ></div>
          ))}
          {/* Longitude lines */}
          {[20, 40, 60, 80].map(percent => (
            <div 
              key={`lng-${percent}`}
              className="absolute h-full w-px bg-white/10"
              style={{ left: `${percent}%` }}
            ></div>
          ))}
        </div>

        {/* ARGO Float Markers */}
        {floatData.map((float) => {
          const position = getMarkerPosition(float.lat, float.lng);
          const isSelected = selectedFloat === float.id;
          
          return (
            <div
              key={float.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={position}
              onClick={() => setSelectedFloat(isSelected ? null : float.id)}
            >
              {/* Marker */}
              <div className={`
                w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300
                ${getMarkerColor(float.temp)}
                ${float.status === 'active' ? 'opacity-100' : 'opacity-60'}
                ${isSelected ? 'scale-150 ring-4 ring-white/50' : 'group-hover:scale-125'}
              `}></div>

              {/* Pulse animation for active floats */}
              {float.status === 'active' && (
                <div className={`
                  absolute inset-0 w-4 h-4 rounded-full animate-ping
                  ${getMarkerColor(float.temp)} opacity-30
                `}></div>
              )}

              {/* Tooltip */}
              {isSelected && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm rounded-lg p-4 border border-white/10 min-w-[200px] z-20">
                  <div className="text-white">
                    <h4 className="font-semibold mb-2 text-cyan-400">ARGO Float #{float.id}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">
                          {float.lat.toFixed(2)}°, {float.lng.toFixed(2)}°
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-3 h-3 text-red-400" />
                        <span className="text-red-400">{float.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400">{float.salinity} PSU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-gray-400" />
                        <span className={float.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                          {float.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        Region: {float.region} Ocean
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Panel */}
      <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <h3 className="text-white font-semibold mb-2">Quick Stats</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Total Floats:</span>
            <span className="text-cyan-400 font-medium">{floatData.length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Active:</span>
            <span className="text-green-400 font-medium">
              {floatData.filter(f => f.status === 'active').length}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-300">Avg Temp:</span>
            <span className="text-red-400 font-medium">
              {(floatData.reduce((sum, f) => sum + f.temp, 0) / floatData.length).toFixed(1)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialMap;