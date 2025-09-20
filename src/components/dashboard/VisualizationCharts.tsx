import React from 'react';
import Plot from 'react-plotly.js';

interface VisualizationChartsProps {
  filters: any;
}

const VisualizationCharts: React.FC<VisualizationChartsProps> = ({ filters }) => {
  // Sample data for visualizations
  const temperatureData = {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    y: [18.2, 18.8, 19.5, 20.8, 22.1, 24.3, 25.8, 26.1, 24.9, 22.7, 20.4, 19.1],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Temperature',
    line: { color: '#ef4444', width: 3 },
    marker: { size: 8, color: '#ef4444' }
  };

  const salinityData = {
    x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    y: [35.1, 35.2, 35.0, 34.9, 35.3, 35.5, 35.8, 35.9, 35.6, 35.4, 35.2, 35.1],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Salinity',
    line: { color: '#3b82f6', width: 3 },
    marker: { size: 8, color: '#3b82f6' }
  };

  const depthProfileData = {
    x: [24.5, 23.8, 22.1, 20.4, 18.7, 16.2, 14.8, 12.3, 10.1, 8.5],
    y: [0, 100, 200, 400, 600, 800, 1000, 1200, 1500, 2000],
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: 'Temperature Profile',
    line: { color: '#10b981', width: 3 },
    marker: { size: 6, color: '#10b981' }
  };

  const heatmapData = {
    z: [
      [20, 21, 22, 23, 24],
      [19, 20, 21, 22, 23],
      [18, 19, 20, 21, 22],
      [17, 18, 19, 20, 21],
      [16, 17, 18, 19, 20]
    ],
    x: ['0°', '30°E', '60°E', '90°E', '120°E'],
    y: ['60°N', '30°N', '0°', '30°S', '60°S'],
    type: 'heatmap' as const,
    colorscale: [
      [0, '#1e3a8a'],
      [0.25, '#3b82f6'],
      [0.5, '#10b981'],
      [0.75, '#f59e0b'],
      [1, '#ef4444']
    ],
    showscale: true,
    colorbar: {
      title: 'Temperature (°C)',
      titlefont: { color: 'white' },
      tickfont: { color: 'white' }
    }
  };

  const plotConfig = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    displaylogo: false,
    responsive: true
  };

  const commonLayout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white', family: 'Inter, sans-serif' },
    margin: { t: 50, r: 50, b: 50, l: 50 },
    grid: { rows: 1, columns: 1, pattern: 'independent' }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Ocean Data Visualizations</h2>
        <p className="text-gray-300">Interactive charts showing ARGO float measurements</p>
      </div>

      {/* Time Series Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Temperature Trends</h3>
          <Plot
            data={[temperatureData]}
            layout={{
              ...commonLayout,
              title: { text: 'Monthly Average Temperature', font: { color: 'white', size: 16 } },
              xaxis: { 
                title: 'Month', 
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              yaxis: { 
                title: 'Temperature (°C)', 
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              height: 300
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Salinity Variations</h3>
          <Plot
            data={[salinityData]}
            layout={{
              ...commonLayout,
              title: { text: 'Monthly Average Salinity', font: { color: 'white', size: 16 } },
              xaxis: { 
                title: 'Month', 
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              yaxis: { 
                title: 'Salinity (PSU)', 
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              height: 300
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Depth Profile and Heatmap */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Depth Temperature Profile</h3>
          <Plot
            data={[depthProfileData]}
            layout={{
              ...commonLayout,
              title: { text: 'Temperature vs Depth', font: { color: 'white', size: 16 } },
              xaxis: { 
                title: 'Temperature (°C)', 
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              yaxis: { 
                title: 'Depth (m)', 
                autorange: 'reversed',
                gridcolor: 'rgba(255,255,255,0.1)',
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              height: 300
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Global Temperature Distribution</h3>
          <Plot
            data={[heatmapData]}
            layout={{
              ...commonLayout,
              title: { text: 'Surface Temperature Heatmap', font: { color: 'white', size: 16 } },
              xaxis: { 
                title: 'Longitude', 
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              yaxis: { 
                title: 'Latitude', 
                tickfont: { color: 'white' },
                titlefont: { color: 'white' }
              },
              height: 300
            }}
            config={plotConfig}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Data Summary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">22.3°C</div>
            <div className="text-sm text-gray-300">Avg Temperature</div>
          </div>
          <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">35.2 PSU</div>
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
    </div>
  );
};

export default VisualizationCharts;