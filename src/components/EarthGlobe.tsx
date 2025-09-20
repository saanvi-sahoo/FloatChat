import React from 'react';

const EarthGlobe: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main Earth Globe Container */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Earth Sphere */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
          {/* Earth Surface with CSS Animation */}
          <div 
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, #4a90e2 0%, #2c5aa0 25%, #1e3a8a 50%),
                conic-gradient(from 0deg, 
                  #065f46 0deg, #047857 30deg, #0891b2 60deg, #0284c7 90deg,
                  #1d4ed8 120deg, #3730a3 150deg, #7c2d12 180deg, #a16207 210deg,
                  #059669 240deg, #0d9488 270deg, #0891b2 300deg, #065f46 360deg
                )
              `,
              backgroundBlendMode: 'multiply',
              animationDuration: '20s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          >
            {/* Continent Overlays */}
            <div className="absolute inset-0 rounded-full opacity-80">
              {/* Africa */}
              <div className="absolute top-1/3 left-1/2 w-8 h-12 bg-green-700 rounded-full transform -translate-x-1/2 opacity-70"></div>
              {/* Europe */}
              <div className="absolute top-1/4 left-1/2 w-6 h-6 bg-green-600 rounded-full transform -translate-x-1/2 translate-x-2 opacity-60"></div>
              {/* Asia */}
              <div className="absolute top-1/4 right-1/4 w-12 h-8 bg-green-700 rounded-full opacity-70"></div>
              {/* Americas */}
              <div className="absolute top-1/3 left-1/4 w-6 h-16 bg-green-600 rounded-full opacity-60"></div>
              {/* Australia */}
              <div className="absolute bottom-1/3 right-1/3 w-4 h-3 bg-green-600 rounded-full opacity-60"></div>
            </div>

            {/* Cloud Layer */}
            <div 
              className="absolute inset-0 rounded-full opacity-30 animate-spin"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 40%, rgba(255,255,255,0.3) 0%, transparent 40%),
                  radial-gradient(ellipse at 40% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)
                `,
                animationDuration: '25s',
                animationDirection: 'reverse'
              }}
            ></div>

            {/* Atmospheric Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-transparent to-blue-600/20"></div>
          </div>

          {/* Inner Shadow for 3D Effect */}
          <div className="absolute inset-0 rounded-full shadow-inner" style={{
            boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.4), inset 20px 20px 40px rgba(255,255,255,0.1)'
          }}></div>
        </div>

        {/* Floating Data Points */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/6 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50 z-10"></div>
          <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50 z-10" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 z-10" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50 z-10" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/6 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg shadow-pink-400/50 z-10" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute w-[450px] h-[450px] border border-cyan-400/15 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        <div className="absolute w-[400px] h-[400px] border border-blue-300/10 rounded-full animate-spin" style={{ animationDuration: '35s' }}></div>
      </div>

      {/* Atmospheric Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[420px] h-[420px] bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute w-[380px] h-[380px] bg-cyan-400/5 rounded-full blur-2xl"></div>
        <div className="absolute w-[340px] h-[340px] bg-blue-300/5 rounded-full blur-xl"></div>
      </div>

      {/* Shooting Stars Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{ animationDelay: '3s', animationDuration: '2s' }}></div>
        <div className="absolute bottom-1/3 right-0 w-1 h-1 bg-cyan-300 rounded-full opacity-60 animate-ping" style={{ animationDelay: '5s', animationDuration: '1.5s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-50 animate-ping" style={{ animationDelay: '7s', animationDuration: '2.5s' }}></div>
      </div>
    </div>
  );
};

export default EarthGlobe;