import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, FileText, MessageSquare, Calendar, Settings } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  // If user is not authenticated or license is not verified, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.licenseVerified) {
    return <Navigate to="/license-verification" />;
  }

  const features = [
    {
      title: 'Case Management',
      description: 'Track and manage all your mediation cases in one place',
      icon: <FileText size={24} className="text-blue-600" />
    },
    {
      title: 'Client Directory',
      description: 'Maintain a comprehensive directory of all your clients',
      icon: <Users size={24} className="text-blue-600" />
    },
    {
      title: 'Communication Tools',
      description: 'Secure messaging and document sharing with clients',
      icon: <MessageSquare size={24} className="text-blue-600" />
    },
    {
      title: 'Scheduling',
      description: 'Manage appointments and send automated reminders',
      icon: <Calendar size={24} className="text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Welcome to the Mediator Platform, {user.name}!
            </h1>
            <p className="mt-4 text-xl">
              Your one-stop solution for managing mediation services efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mx-auto">
                    {feature.icon}
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">New Case</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Users size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">Add Client</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">Schedule</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <MessageSquare size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">Messages</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Settings size={24} className="text-blue-600 mb-2" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;