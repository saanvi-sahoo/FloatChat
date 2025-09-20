import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MapPin, Clock, TrendingUp } from 'lucide-react';

interface TrajectoryViewerProps {
  filters: any;
}

const TrajectoryViewer: React.FC<TrajectoryViewerProps> = ({ filters }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFloat, setSelectedFloat] = useState(1);

  // Sample trajectory data for multiple floats
  const trajectoryData = {
    1: [
      { lat: 20.5, lng: -157.8, depth: 0, temp: 24.5, date: '2024-01-01', day: 0 },
      { lat: 21.2, lng: -156.9, depth: 500, temp: 18.2, date: '2024-01-15', day: 14 },
      { lat: 22.1, lng: -155.8, depth: 1000, temp: 12.8, date: '2024-02-01', day: 31 },
      { lat: 23.0, lng: -154.5, depth: 1500, temp: 8.5, date: '2024-02-15', day: 45 },
      { lat: 24.2, lng: -153.2, depth: 2000, temp: 4.2, date: '2024-03-01', day: 59 },
      { lat: 25.1, lng: -152.1, depth: 1000, temp: 12.1, date: '2024-03-15', day: 73 },
      { lat: 26.0, lng: -151.0, depth: 500, temp: 18.8, date: '2024-04-01', day: 90 },
      { lat: 26.8, lng: -149.8, depth: 0, temp: 25.2, date: '2024-04-15', day: 104 }
    ],
    2: [
      { lat: 35.7, lng: -75.4, depth: 0, temp: 18.3, date: '2024-01-01', day: 0 },
      { lat: 36.2, lng: -74.8, depth: 800, temp: 14.1, date: '2024-01-20', day: 19 },
      { lat: 37.1, lng: -73.9, depth: 1200, temp: 10.5, date: '2024-02-10', day: 40 },
      { lat: 38.0, lng: -72.8, depth: 1800, temp: 6.8, date: '2024-03-01', day: 59 },
      { lat: 38.8, lng: -71.5, depth: 1000, temp: 11.2, date: '2024-03-20', day: 78 },
      { lat: 39.5, lng: -70.2, depth: 400, temp: 16.8, date: '2024-04-10', day: 99 }
    ]
  };

  const floatOptions = [
    { id: 1, name: 'ARGO Float #001', region: 'Pacific Ocean' },
    { id: 2, name: 'ARGO Float #002', region: 'Atlantic Ocean' }
  ];

  const currentTrajectory = trajectoryData[selectedFloat as keyof typeof trajectoryData] || trajectoryData[1];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < currentTrajectory.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else if (currentStep >= currentTrajectory.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, currentTrajectory.length]);

  const handlePlay = () => {
    if (currentStep >= currentTrajectory.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const getMarkerPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  const getDepthColor = (depth: number) => {
    if (depth === 0) return 'bg-red-500';
    if (depth <= 500) return 'bg-yellow-500';
    if (depth <= 1000) return 'bg-green-500';
    if (depth <= 1500) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  const currentPoint = currentTrajectory[currentStep];
  const visiblePoints = currentTrajectory.slice(0, currentStep + 1);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6 text-cyan-400" />
          ARGO Float Trajectories
        </h2>
        <p className="text-gray-300">Animated visualization of float movement and depth cycling</p>
      </div>

      {/* Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Float Selection */}
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Select Float:</label>
            <select
              value={selectedFloat}
              onChange={(e) => {
                setSelectedFloat(Number(e.target.value));
                setCurrentStep(0);
                setIsPlaying(false);
              }}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {floatOptions.map(option => (
                <option key={option.id} value={option.id} className="bg-slate-800">
                  {option.name} - {option.region}
                </option>
              ))}
            </select>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Step {currentStep + 1} of {currentTrajectory.length}
            </span>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / currentTrajectory.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="h-[500px] w-full relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-xl overflow-hidden">
          {/* Ocean background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 40%)
              `
            }}
          ></div>

          {/* Grid lines */}
          <div className="absolute inset-0">
            {[20, 40, 60, 80].map(percent => (
              <div key={`lat-${percent}`} className="absolute w-full h-px bg-white/10" style={{ top: `${percent}%` }}></div>
            ))}
            {[20, 40, 60, 80].map(percent => (
              <div key={`lng-${percent}`} className="absolute h-full w-px bg-white/10" style={{ left: `${percent}%` }}></div>
            ))}
          </div>

          {/* Trajectory Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {visiblePoints.slice(1).map((point, index) => {
              const prevPoint = visiblePoints[index];
              const startPos = getMarkerPosition(prevPoint.lat, prevPoint.lng);
              const endPos = getMarkerPosition(point.lat, point.lng);
              
              return (
                <line
                  key={index}
                  x1={`${parseFloat(startPos.left)}%`}
                  y1={`${parseFloat(startPos.top)}%`}
                  x2={`${parseFloat(endPos.left)}%`}
                  y2={`${parseFloat(endPos.top)}%`}
                  stroke="rgba(59, 130, 246, 0.6)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>

          {/* Trajectory Points */}
          {visiblePoints.map((point, index) => {
            const position = getMarkerPosition(point.lat, point.lng);
            const isCurrent = index === currentStep;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={position}
              >
                <div className={`
                  w-3 h-3 rounded-full border-2 border-white transition-all duration-300
                  ${getDepthColor(point.depth)}
                  ${isCurrent ? 'scale-150 ring-4 ring-white/50' : 'opacity-70'}
                `}></div>
                
                {isCurrent && (
                  <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping ${getDepthColor(point.depth)} opacity-30`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Point Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Current Position
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Date:</span>
              <span className="text-white font-medium">{currentPoint.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Position:</span>
              <span className="text-white font-medium">
                {currentPoint.lat.toFixed(2)}°, {currentPoint.lng.toFixed(2)}°
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Depth:</span>
              <span className="text-blue-400 font-medium">{currentPoint.depth}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temperature:</span>
              <span className="text-red-400 font-medium">{currentPoint.temp}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Days Elapsed:</span>
              <span className="text-green-400 font-medium">{currentPoint.day}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Trajectory Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Distance:</span>
              <span className="text-white font-medium">
                {(Math.random() * 500 + 200).toFixed(0)} km
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Avg Speed:</span>
              <span className="text-white font-medium">
                {(Math.random() * 2 + 0.5).toFixed(1)} km/day
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Max Depth:</span>
              <span className="text-blue-400 font-medium">
                {Math.max(...currentTrajectory.map(p => p.depth))}m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temp Range:</span>
              <span className="text-red-400 font-medium">
                {Math.min(...currentTrajectory.map(p => p.temp)).toFixed(1)}° - {Math.max(...currentTrajectory.map(p => p.temp)).toFixed(1)}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Duration:</span>
              <span className="text-green-400 font-medium">
                {Math.max(...currentTrajectory.map(p => p.day))} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Depth Legend */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Depth Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Surface (0m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Shallow (0-500m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Medium (500-1000m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Deep (1000-1500m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Very Deep (>1500m)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrajectoryViewer;