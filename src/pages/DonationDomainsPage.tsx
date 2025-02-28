import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MapPin, Check, ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonationProcess from '../components/DonationProcess'; // Import the DonationProcess component

// Define types for fetched data
interface Institution {
  _id: string;
  name: string; // Owner's Name
  organizationName: string;
  ngoType: string;
  location: string;
  about: string;
  address: string;
  isVerified: boolean;
  instituteImage: string;
  licenseNumber: string;
  licenseImage: string;
}

interface DonationRequest {
  _id: string;
  organizationName: string;
  domain: string;
  currentNeeds: string;
  minRequired: string;
  maxRequired: string;
}

// Donation domains as defined in the DonationRequest model
const donationDomains = ['All', 'Food', 'Money', 'Books', 'Medical Supplies', 'Other Essentials'];

const DonationDomainsPage = () => {
  // State for institutions and donation requests
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [institutionCampaigns, setInstitutionCampaigns] = useState<DonationRequest[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<{ [key: string]: DonationRequest[] }>({});
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [showDonationProcess, setShowDonationProcess] = useState<boolean>(false);

  // Fetch institutions from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/institutions')
      .then(response => {
        if (response.data.success) {
          setInstitutions(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching institutions:", error));

    axios.get('http://localhost:5000/api/donation-requests')
      .then(response => {
        if (response.data.success) {
          setDonationRequests(response.data.data);

          // Group active campaigns by domain
          const campaignsByDomain: { [key: string]: DonationRequest[] } = {};
          response.data.data.forEach((campaign: DonationRequest) => {
            if (!campaignsByDomain[campaign.domain]) {
              campaignsByDomain[campaign.domain] = [];
            }
            campaignsByDomain[campaign.domain].push(campaign);
          });
          setActiveCampaigns(campaignsByDomain);
        }
      })
      .catch(error => console.error("Error fetching donation requests:", error));
  }, []);

  // Function to handle institution selection
  const handleInstitutionClick = (institution: Institution) => {
    setSelectedInstitution(institution);
    setShowDonationProcess(false); // Reset donation process when selecting a new institution

    // Fetch active donation campaigns for this institute
    axios.get(`http://localhost:5000/api/donation-requests?organizationName=${institution.organizationName}`)
      .then(response => {
        if (response.data.success) {
          setInstitutionCampaigns(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching campaigns:", error));
  };

  // Function to navigate to donation process
  const navigateToDonation = () => {
    setShowDonationProcess(true);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // Function to go back to institution details
  const handleBackFromDonation = () => {
    setShowDonationProcess(false);
  };

  // Filter institutions based on category and search query
  const filteredInstitutions = institutions.filter((institution) => {
    const matchesCategory = selectedCategory === 'All' || institution.ngoType.includes(selectedCategory);
    const matchesSearch = institution.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.about.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter campaigns based on selected domain
  const filteredCampaigns = selectedDomain === 'All'
    ? activeCampaigns
    : Object.fromEntries(
      Object.entries(activeCampaigns).filter(([domain]) => domain === selectedDomain)
    );

  // Function to get background color based on domain
  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'Food':
        return 'bg-orange-100 text-orange-800';
      case 'Money':
        return 'bg-green-100 text-green-800';
      case 'Books':
        return 'bg-purple-100 text-purple-800';
      case 'Medical Supplies':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Donation Domains</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Explore verified institutions and their specific needs across different donation categories.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Show Donation Process when button is clicked */}
          {selectedInstitution && showDonationProcess ? (
            <div>
              <button
                onClick={handleBackFromDonation}
                className="mb-6 text-gray-600 hover:text-gray-900 font-medium flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to institution details
              </button>

              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Make a Donation to {selectedInstitution.organizationName}
                </h2>
                <p className="text-gray-600 mb-6">
                  You're about to donate to {selectedInstitution.organizationName}. Please complete the form below to proceed with your donation.
                </p>
              </div>

              <DonationProcess />
            </div>
          ) : (
            <>
              {/* Domain Filter - Only show on main page */}
              {!selectedInstitution && (
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">What would you like to donate?</h2>

                    <div className="inline-flex p-1 bg-gray-100 rounded-lg">
                      {donationDomains.map((domain) => (
                        <button
                          key={domain}
                          onClick={() => setSelectedDomain(domain)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${selectedDomain === domain
                            ? 'bg-white shadow-sm text-indigo-700'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domain filter indicator */}
                  {selectedDomain !== 'All' && (
                    <div className="bg-indigo-50 p-3 rounded-lg mb-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <Filter className="h-5 w-5 text-indigo-600 mr-2" />
                        <span className="text-indigo-800">Showing donation requests for: <strong>{selectedDomain}</strong></span>
                      </div>
                      <button
                        onClick={() => setSelectedDomain('All')}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Clear filter
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Active Campaigns Section - Only show on main page, not in detailed view */}
              {!selectedInstitution && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Donation Campaigns</h2>

                  {Object.keys(filteredCampaigns).length > 0 ? (
                    <div>
                      {Object.entries(filteredCampaigns).map(([domain, campaigns]) => (
                        <div key={domain} className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                            <span className={`inline-block px-3 py-1 rounded-full mr-3 ${getDomainColor(domain)}`}>
                              {domain}
                            </span>
                            <span>{campaigns.length} active {campaigns.length === 1 ? 'campaign' : 'campaigns'}</span>
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {campaigns.map((campaign) => (
                              <div key={campaign._id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-500">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-gray-800">{campaign.organizationName}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDomainColor(campaign.domain)}`}>
                                    {campaign.domain}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Current Needs:</strong> {campaign.currentNeeds}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <span>Required: {campaign.minRequired} - {campaign.maxRequired}</span>
                                  <button
                                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    onClick={() => {
                                      // Find the institution with this organization name
                                      const org = institutions.find(i => i.organizationName === campaign.organizationName);
                                      if (org) {
                                        handleInstitutionClick(org);
                                      }
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        {selectedDomain !== 'All'
                          ? `No active donation campaigns for ${selectedDomain} at the moment.`
                          : 'No active donation campaigns at the moment.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedInstitution && (
                /* Detailed Institution View */
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedInstitution(null)}
                    className="ml-4 mt-4 text-gray-600 hover:text-gray-900 font-medium flex items-center"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to all institutions
                  </button>

                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side: Images */}
                      <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                        {/* Institute Image */}
                        <div className="h-64 bg-cover bg-center rounded-lg"
                          style={{ backgroundImage: "url('/images/Image2.jpeg')" }}>
                        </div>

                        {/* License Image */}
                        <div className="mt-6 h-40 bg-cover bg-center rounded-lg border"
                          style={{ backgroundImage: "url('/images/Image2.jpeg')" }}>
                        </div>

                        {/* License Link */}
                        <a
                          href={selectedInstitution.licenseImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-3 text-blue-600 hover:underline text-sm"
                        >
                          View License <ExternalLink className="inline h-4 w-4" />
                        </a>
                      </div>

                      {/* Right Side: Information */}
                      <div className="md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{selectedInstitution.organizationName}</h2>
                            <p className="text-gray-600">{selectedInstitution.ngoType}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {selectedInstitution.isVerified && (
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
                                <Check className="h-3 w-3 mr-1" /> Verified
                              </span>
                            )}
                            <button
                              onClick={navigateToDonation}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
                            >
                              Donate Now
                            </button>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Owner</h3>
                          <p className="text-gray-700">{selectedInstitution.name}</p>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
                          <p className="text-gray-700">{selectedInstitution.about}</p>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Donation Campaigns</h3>
                          {institutionCampaigns.length > 0 ? (
                            <div className="space-y-4">
                              {/* Group campaigns by domain */}
                              {Object.entries(institutionCampaigns.reduce((acc: { [key: string]: DonationRequest[] }, campaign) => {
                                if (!acc[campaign.domain]) {
                                  acc[campaign.domain] = [];
                                }
                                acc[campaign.domain].push(campaign);
                                return acc;
                              }, {})).map(([domain, campaigns]) => (
                                <div key={domain} className="mb-4">
                                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <span className={`inline-block px-2 py-1 rounded-full mr-2 text-xs ${getDomainColor(domain)}`}>
                                      {domain}
                                    </span>
                                  </h4>

                                  <div className="space-y-3">
                                    {campaigns.map((campaign) => (
                                      <div key={campaign._id} className="border p-3 rounded-lg bg-gray-50">
                                        <p><strong>Needs:</strong> {campaign.currentNeeds}</p>
                                        <p><strong>Required:</strong> {campaign.minRequired} - {campaign.maxRequired}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">No active campaigns.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Institution Listing View */}
              {!selectedInstitution && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInstitutions.map((institution) => (
                    <div
                      key={institution._id}
                      className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleInstitutionClick(institution)}
                    >
                      {/* Institute Image */}
                      <div className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/Image2.jpeg')" }}>
                      </div>

                      {/* Institute Details */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800">{institution.organizationName}</h3>

                        {/* Location */}
                        <p className="text-gray-600 text-sm mt-1 flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" /> {institution.location}
                        </p>

                        {/* About Section */}
                        <p className="text-gray-700 text-sm mt-2 line-clamp-3">{institution.about}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationDomainsPage;