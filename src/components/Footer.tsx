import React from 'react';
import { Globe, Mail, Database, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const datasetLinks = [
    {
      name: "Argo Global Data Repository",
      url: "#",
      description: "Access global ARGO float data"
    },
    {
      name: "Indian Argo Project",
      url: "#", 
      description: "Regional ocean data from Indian waters"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Globe className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 w-8 h-8 rounded-full bg-blue-400/20 animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold text-white">
                  Float<span className="text-blue-400">Chat</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Revolutionizing ocean data exploration through AI-powered natural language interfaces. 
                Making complex oceanographic data accessible to researchers worldwide.
              </p>
            </div>

            {/* Dataset links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Dataset Links
              </h3>
              <div className="space-y-4">
                {datasetLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="group block p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                          {link.name}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">{link.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact and disclaimer */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-400" />
                Contact & Info
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-300 mb-2">Get in touch:</p>
                  <a 
                    href="mailto:example@floatchat.com" 
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    example@floatchat.com
                  </a>
                </div>
                
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 text-sm leading-relaxed">
                    <strong>Disclaimer:</strong> This is a Proof-of-Concept system for easy ocean data exploration 
                    with built-in quality control checks. Data accuracy and availability may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 FloatChat. Built for SIH 2025 - AI-Powered Ocean Data Exploration.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-gray-500 text-xs">Made with 🌊 for ocean research</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;