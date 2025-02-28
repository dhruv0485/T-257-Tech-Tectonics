import React from 'react';
import { School, Heart, AlertTriangle, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationDomains = () => {
  const domains = [
    {
      icon: <School className="h-12 w-12 text-white" />,
      title: 'Education',
      description: 'Support schools, scholarships, and educational programs for underprivileged children.',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      icon: <Heart className="h-12 w-12 text-white" />,
      title: 'Healthcare',
      description: 'Fund medical supplies, treatments, and healthcare facilities in underserved areas.',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      icon: <AlertTriangle className="h-12 w-12 text-white" />,
      title: 'Disaster Relief',
      description: 'Provide immediate assistance to communities affected by natural disasters.',
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600'
    },
    {
      icon: <Globe className="h-12 w-12 text-white" />,
      title: 'Environmental',
      description: 'Support conservation efforts and sustainable practices to protect our planet.',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    }
  ];

  return (
    <section id="domains" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Donation Areas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the different areas where your donations can make a meaningful impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {domains.map((domain, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105`}
            >
              <div className={`${domain.color} ${domain.hoverColor} p-6 flex justify-center transition duration-300`}>
                {domain.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{domain.title}</h3>
                <p className="text-gray-600 mb-4">{domain.description}</p>
                <button className={`w-full ${domain.color} ${domain.hoverColor} text-white py-2 rounded-md font-medium transition duration-300`}>
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/donation-domains" 
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Explore All Donation Domains <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationDomains;