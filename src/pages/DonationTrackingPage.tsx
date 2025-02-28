import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, Camera, ArrowRight, ArrowLeft, Download, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define types for our data
interface DonationTrack {
  id: string;
  date: string;
  type: string;
  recipient: string;
  amount: string;
  status: string;
  timeline: {
    date: string;
    status: string;
    description: string;
    completed: boolean;
  }[];
  utilization: {
    date: string;
    description: string;
    impact: string;
    images: string[];
  }[];
}

const DonationTrackingPage = () => {
  // State for filters and selected donation
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedDonation, setSelectedDonation] = useState<DonationTrack | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'utilization'>('timeline');
  
  // Sample data for donations
  const donations: DonationTrack[] = [
    {
      id: 'DON-2025-001',
      date: 'June 15, 2025',
      type: 'Money',
      recipient: 'Sunshine Orphanage',
      amount: '$250',
      status: 'Delivered',
      timeline: [
        {
          date: 'June 15, 2025',
          status: 'Donation Received',
          description: 'Your donation has been received and processed.',
          completed: true
        },
        {
          date: 'June 16, 2025',
          status: 'Funds Transferred',
          description: 'Funds have been transferred to Sunshine Orphanage.',
          completed: true
        },
        {
          date: 'June 17, 2025',
          status: 'Delivered',
          description: 'Donation has been delivered and acknowledged by the recipient.',
          completed: true
        },
        {
          date: 'June 30, 2025',
          status: 'Utilization Report',
          description: 'Detailed report on how your donation was utilized.',
          completed: false
        }
      ],
      utilization: [
        {
          date: 'June 20, 2025',
          description: 'Educational supplies purchased for 25 children',
          impact: 'Provided textbooks, notebooks, and stationery for the new school term',
          images: [
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          ]
        }
      ]
    },
    {
      id: 'DON-2025-002',
      date: 'May 28, 2025',
      type: 'Food',
      recipient: 'Nourish Food Bank',
      amount: '100 kg of rice',
      status: 'Utilized',
      timeline: [
        {
          date: 'May 28, 2025',
          status: 'Donation Received',
          description: 'Your donation has been received by our collection center.',
          completed: true
        },
        {
          date: 'May 29, 2025',
          status: 'Quality Check',
          description: 'Items have been inspected and approved for distribution.',
          completed: true
        },
        {
          date: 'May 30, 2025',
          status: 'Shipped',
          description: 'Items have been shipped to Nourish Food Bank.',
          completed: true
        },
        {
          date: 'June 1, 2025',
          status: 'Delivered',
          description: 'Donation has been delivered to the food bank.',
          completed: true
        },
        {
          date: 'June 10, 2025',
          status: 'Utilized',
          description: 'Your donation has been distributed to beneficiaries.',
          completed: true
        }
      ],
      utilization: [
        {
          date: 'June 10, 2025',
          description: 'Rice distributed to 50 families in need',
          impact: 'Provided meals for approximately 200 people for one week',
          images: [
            'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          ]
        }
      ]
    },
    {
      id: 'DON-2025-003',
      date: 'June 5, 2025',
      type: 'Medical Supplies',
      recipient: 'Healing Hands Medical Clinic',
      amount: 'First aid kits and medicines',
      status: 'In Transit',
      timeline: [
        {
          date: 'June 5, 2025',
          status: 'Donation Received',
          description: 'Your donation has been received and processed.',
          completed: true
        },
        {
          date: 'June 7, 2025',
          status: 'Packaged',
          description: 'Items have been packaged for shipping.',
          completed: true
        },
        {
          date: 'June 8, 2025',
          status: 'In Transit',
          description: 'Items are currently in transit to the medical clinic.',
          completed: true
        },
        {
          date: 'June 12, 2025',
          status: 'Delivery Expected',
          description: 'Expected delivery to Healing Hands Medical Clinic.',
          completed: false
        }
      ],
      utilization: []
    }
  ];

  // Filter donations based on search query and status filter
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          donation.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          donation.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle donation selection for detailed view
  const handleDonationClick = (donation: DonationTrack) => {
    setSelectedDonation(donation);
    setActiveTab('timeline');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close detailed view
  const closeDetailedView = () => {
    setSelectedDonation(null);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Received':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-amber-100 text-amber-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Utilized':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Donations</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Follow the journey of your donations and see the real impact you're making.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {selectedDonation ? (
            /* Detailed Donation View */
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <button 
                  onClick={closeDetailedView}
                  className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to all donations
                </button>
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Donation #{selectedDonation.id}</h2>
                    <p className="text-gray-600">{selectedDonation.date}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button className="flex items-center text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-3 py-1.5">
                      <Download className="h-4 w-4 mr-1" /> Download Report
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-3 py-1.5">
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Recipient</h3>
                    <p className="text-lg font-semibold text-gray-800">{selectedDonation.recipient}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Donation Type</h3>
                    <p className="text-lg font-semibold text-gray-800">{selectedDonation.type}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Amount/Items</h3>
                    <p className="text-lg font-semibold text-gray-800">{selectedDonation.amount}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'timeline'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('timeline')}
                      >
                        Timeline
                      </button>
                      <button
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'utilization'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('utilization')}
                      >
                        Utilization & Impact
                      </button>
                    </nav>
                  </div>
                </div>
                
                {activeTab === 'timeline' && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Donation Timeline</h3>
                    <div className="relative">
                      {selectedDonation.timeline.map((event, index) => (
                        <div key={index} className="mb-8 flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                              event.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {event.completed ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <Clock className="h-5 w-5 text-white" />
                              )}
                            </div>
                            {index < selectedDonation.timeline.length - 1 && (
                              <div className={`h-full w-0.5 ${
                                event.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}></div>
                            )}
                          </div>
                          <div className="pb-8">
                            <div className="flex items-center mb-1">
                              <h4 className="text-lg font-semibold text-gray-800">{event.status}</h4>
                              <span className="ml-2 text-sm text-gray-500">{event.date}</span>
                            </div>
                            <p className="text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'utilization' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Utilization & Impact</h3>
                    
                    {selectedDonation.utilization.length > 0 ? (
                      selectedDonation.utilization.map((util, index) => (
                        <div key={index} className="mb-8 bg-gray-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-gray-600">{util.date}</span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{util.description}</h4>
                          <p className="text-gray-600 mb-6">{util.impact}</p>
                          
                          {util.images.length > 0 && (
                            <div>
                              <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                                <Camera className="h-4 w-4 mr-1" /> Visual Documentation
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {util.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="rounded-lg overflow-hidden">
                                    <img 
                                      src={img} 
                                      alt={`Impact documentation ${imgIndex + 1}`} 
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">
                          Utilization report will be available once your donation has been fully processed and utilized.
                        </p>
                        <p className="text-gray-500 mt-2">
                          Current status: <span className="font-medium">{selectedDonation.status}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Donations Listing View */
            <>
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search by ID, recipient, or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <Filter className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700 mr-2">Status:</span>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Received">Received</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Utilized">Utilized</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Track */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Track</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter donation tracking ID (e.g., DON-2025-001)"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300">
                    Track
                  </button>
                </div>
              </div>

              {/* Donations Table */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Your Donations</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount/Items
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDonations.length > 0 ? (
                        filteredDonations.map((donation) => (
                          <tr 
                            key={donation.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleDonationClick(donation)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {donation.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {donation.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {donation.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {donation.recipient}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {donation.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                                {donation.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-blue-600 hover:text-blue-800 font-medium">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                            No donations found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationTrackingPage;