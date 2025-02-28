import React from 'react';
import { Search, Clock, CheckCircle, TrendingUp, Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationTracking = () => {
  return (
    <section id="tracking" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Track Your Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow your donations from receipt to utilization and see the real difference you're making.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Features */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Monitor your donation's journey from receipt to delivery with real-time status updates.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Utilization Reports</h3>
                <p className="text-gray-600">
                  Receive detailed reports on how your donations were used and the impact they created.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Impact Metrics</h3>
                <p className="text-gray-600">
                  See quantifiable results of your generosity with measurable impact metrics.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Camera className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Visual Documentation</h3>
                <p className="text-gray-600">
                  View photos and videos of your donations in action, making a difference in people's lives.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side: Quick Track Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Track</h3>
            <div className="mb-6">
              <label htmlFor="tracking-id" className="block text-gray-700 font-medium mb-2">
                Donation Tracking ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="tracking-id"
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your donation tracking ID"
                />
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-300 mb-6">
              Track Donation
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">Don't have a tracking ID?</p>
              <Link 
                to="/donation-tracking" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View all your donations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Sample Tracking Status</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-600 text-sm">Donation received by shopkeeper</span>
                  <span className="ml-auto text-xs text-gray-500">June 15, 2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-600 text-sm">Shipped to institution</span>
                  <span className="ml-auto text-xs text-gray-500">June 16, 2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600 text-sm">Delivered to Sunshine Orphanage</span>
                  <span className="ml-auto text-xs text-gray-500">June 17, 2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-gray-400 text-sm">Utilization report pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/donation-tracking" 
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
          >
            View Detailed Tracking <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationTracking;