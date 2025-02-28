import React from 'react';
import { Users, Heart, Globe, BarChart3 } from 'lucide-react';

const ImpactMetrics = () => {
  const metrics = [
    {
      icon: <Users className="h-10 w-10 text-red-500" />,
      value: '2.5M+',
      label: 'Lives Impacted',
      description: 'People directly benefited from donations'
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      value: '$15M+',
      label: 'Donations Raised',
      description: 'Total funds collected for various causes'
    },
    {
      icon: <Globe className="h-10 w-10 text-red-500" />,
      value: '45+',
      label: 'Countries Reached',
      description: 'Global impact across continents'
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-red-500" />,
      value: '98%',
      label: 'Efficiency Rate',
      description: 'Funds that directly reach beneficiaries'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through the generosity of our donors, we've been able to make a significant difference in communities worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition duration-500 hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {metric.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</h3>
              <h4 className="text-xl font-semibold text-red-500 mb-2">{metric.label}</h4>
              <p className="text-gray-600">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;