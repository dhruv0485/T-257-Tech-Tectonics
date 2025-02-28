import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DisasterAlerts from '../components/DisasterAlerts';

const DisasterAlertsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Disaster Alerts</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Stay informed about ongoing disasters and emergencies where your immediate support can help save lives.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DisasterAlerts />
          
          {/* Additional Information Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How Disaster Response Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Immediate Response</h3>
                <p className="text-gray-600">
                  When a disaster strikes, our team immediately assesses the situation and coordinates with local partners to provide emergency relief.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Resource Allocation</h3>
                <p className="text-gray-600">
                  Your donations are quickly allocated to purchase essential supplies, medical aid, and temporary shelter for affected communities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Long-term Recovery</h3>
                <p className="text-gray-600">
                  Beyond immediate relief, we support communities in rebuilding infrastructure and restoring livelihoods for sustainable recovery.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Your timely support during disasters can make the difference between life and death for affected communities.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition duration-300">
                Learn More About Our Disaster Response
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DisasterAlertsPage;