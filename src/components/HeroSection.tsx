import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BarChart3 } from 'lucide-react';
import EarthGlobe from './EarthGlobe';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">🌊</span>
                  <span>Explore Global</span>
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Ocean Data
                </span>
                <br />
                <span className="text-gray-300">Effortlessly with</span>
                <br />
                <span className="text-blue-400">FloatChat</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                Harness the power of AI to explore ARGO ocean data through natural language. 
                Ask questions in English and discover insights from millions of ocean measurements.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="#chatbot" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-white text-lg shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-center">
                <span className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Ask a Question
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </Link>
              
              <Link to="/dashboard" className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white text-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 text-center">
                <span className="flex items-center justify-center gap-3">
                  <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Explore Data Dashboard
                </span>
              </Link>
            </div>
          </div>

          {/* Right side - Earth Globe */}
          <div className="flex justify-center lg:justify-end">
            <EarthGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;