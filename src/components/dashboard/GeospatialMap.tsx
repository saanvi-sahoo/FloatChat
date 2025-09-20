import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GeospatialMapProps {
  filters: any;
}

const GeospatialMap: React.FC<GeospatialMapProps> = ({ filters }) => {
  // Sample ARGO float data
  const floatData = [
    { id: 1, lat: 20.5, lng: -157.8, temp: 24.5, salinity: 35.2, status: 'active' },
    { id: 2, lat: 35.7, lng: -75.4, temp: 18.3, salinity: 36.1, status: 'active' },
    { id: 3, lat: -10.2, lng: 142.8, temp: 28.1, salinity: 34.8, status: 'inactive' },
    { id: 4, lat: 55.3, lng: -12.6, temp: 8.7, salinity: 35.0, status: 'active' },
    { id: 5, lat: -35.8, lng: 18.4, temp: 15.2, salinity: 35.5, status: 'active' },
    { id: 6, lat: 40.7, lng: -74.0, temp: 20.1, salinity: 35.8, status: 'active' },
    { id: 7, lat: 25.3, lng: 55.4, temp: 26.8, salinity: 36.5, status: 'active' },
    { id: 8, lat: -20.1, lng: -40.3, temp: 22.4, salinity: 36.2, status: 'inactive' },
  ];

  const getMarkerColor = (temp: number) => {
    if (temp < 10) return '#3b82f6'; // Blue for cold
    if (temp < 20) return '#10b981'; // Green for moderate
    if (temp < 25) return '#f59e0b'; // Yellow for warm
    return '#ef4444'; // Red for hot
  };

  return (
    <div className="h-[600px] w-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <h3 className="text-white font-semibold mb-2">Legend</h3>
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

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {floatData.map((float) => (
          <CircleMarker
            key={float.id}
            center={[float.lat, float.lng]}
            radius={8}
            fillColor={getMarkerColor(float.temp)}
            color="white"
            weight={2}
            opacity={float.status === 'active' ? 1 : 0.5}
            fillOpacity={float.status === 'active' ? 0.8 : 0.4}
          >
            <Popup className="custom-popup">
              <div className="bg-slate-800 text-white p-3 rounded-lg border border-white/10">
                <h4 className="font-semibold mb-2">ARGO Float #{float.id}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-300">Position:</span> {float.lat.toFixed(2)}°, {float.lng.toFixed(2)}°</p>
                  <p><span className="text-gray-300">Temperature:</span> <span className="text-red-400">{float.temp}°C</span></p>
                  <p><span className="text-gray-300">Salinity:</span> <span className="text-blue-400">{float.salinity} PSU</span></p>
                  <p><span className="text-gray-300">Status:</span> 
                    <span className={float.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                      {float.status}
                    </span>
                  </p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeospatialMap;