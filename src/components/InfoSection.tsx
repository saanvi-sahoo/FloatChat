import React from 'react';
import { Thermometer, Droplets, FlaskConical, TrendingUp, Eye, Globe2 } from 'lucide-react';

const InfoSection: React.FC = () => {
  const climateFeatures = [
    {
      icon: Globe2,
      title: "Global Ocean Monitoring",
      description: "From the unique vantage point in space, FloatChat helps track ocean climate changes, providing reliable insights into how oceans are shifting over time."
    }
  ];

  const facts = [
    "Millions of measurements collected yearly from ARGO floats worldwide",
    "ARGO floats cover global oceans with unprecedented coverage",
    "Essential data for climate research and weather prediction models",
    "Real-time data processing with built-in quality control checks"
  ];

  const vitalSigns = [
    {
      icon: Thermometer,
      title: "Temperature Profiles",
      description: "Monitor ocean temperature from surface to 2000m depth",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Droplets,
      title: "Ocean Salinity",
      description: "Track salinity changes and ocean circulation patterns",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FlaskConical,
      title: "BGC Parameters",
      description: "Biogeochemical data including oxygen and pH levels",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stories = [
    {
      icon: TrendingUp,
      title: "Climate Research Support",
      description: "FloatChat data helps researchers understand ocean warming trends and supports policymakers in climate change mitigation efforts."
    },
    {
      icon: Eye,
      title: "Real-time Ocean Monitoring",
      description: "Track marine heatwaves, monitor salinity changes near the equator, and support sustainable ocean policies with live data insights."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900">
      {/* Climate Change Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Climate Change <span className="text-blue-400">Insights</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto"></div>
          </div>

          {climateFeatures.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-blue-500/20 rounded-xl">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ocean Data <span className="text-cyan-400">Facts</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-300 text-lg leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vital Signs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ocean <span className="text-green-400">Vital Signs</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">Key indicators monitored by FloatChat</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vitalSigns.map((sign, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${sign.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <sign.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{sign.title}</h3>
                <p className="text-gray-400 leading-relaxed">{sign.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real-World <span className="text-purple-400">Applications</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <story.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">{story.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;