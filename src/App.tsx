import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <main>
        <HeroSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;