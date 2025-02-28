import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToDonate = () => {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDomains = () => {
    const domainsSection = document.getElementById('domains');
    if (domainsSection) {
      domainsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="relative h-screen flex items-center justify-center bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('/images/Image3.png')",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Generosity Can Change Lives
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Join our mission to create positive impact through transparent and effective donations. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium text-lg transition duration-300 flex items-center justify-center"
            >
              <User className="mr-2 h-5 w-5" /> Login to Donate
            </Link>
            <button 
              onClick={scrollToDomains}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-800 text-white px-8 py-3 rounded-md font-medium text-lg transition duration-300"
            >
              Explore Causes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;