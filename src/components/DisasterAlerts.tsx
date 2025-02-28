import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, ArrowRight, X, Heart, Zap, Gift, Share2, Globe, Shield, Check } from 'lucide-react';

const DisasterAlerts = () => {
  const [showRedAlert, setShowRedAlert] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [currentDisaster, setCurrentDisaster] = useState<any>(null);
  const [donationStep, setDonationStep] = useState(1);
  const [donationComplete, setDonationComplete] = useState(false);
  const [impactFocus, setImpactFocus] = useState('people');

  const redAlert = {
    title: 'Urgent: Earthquake in Nepal',
    description: 'A 7.2 magnitude earthquake has affected over 50,000 people. Immediate aid is needed.',
    timeRemaining: '2 days',
    targetAmount: '$100,000',
    raisedAmount: '$42,500'
  };

  const alerts = [
    {
      title: 'Earthquake in Nepal',
      description: 'A 7.2 magnitude earthquake has affected over 50,000 people. Immediate aid is needed for shelter, food, and medical supplies.',
      date: 'June 15, 2025',
      severity: 'Critical',
      location: 'Central Nepal',
      timeRemaining: '5 days',
      targetAmount: '$250,000',
      raisedAmount: '$42,500',
      image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      impactMetrics: {
        people: "450 people sheltered",
        meals: "1,200 meals provided",
        medical: "300 medical kits distributed"
      }
    },
    {
      title: 'Flooding in Bangladesh',
      description: 'Severe monsoon flooding has displaced thousands of families. Clean water and sanitation are urgent priorities.',
      date: 'May 28, 2025',
      severity: 'High',
      location: 'Southern Bangladesh',
      timeRemaining: '7 days',
      targetAmount: '$150,000',
      raisedAmount: '$68,000',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      impactMetrics: {
        people: "680 people with clean water",
        meals: "1,800 meals provided",
        medical: "520 medical kits distributed"
      }
    },
    {
      title: 'Wildfire in California',
      description: 'Rapidly spreading wildfires have destroyed homes and forced evacuations. Emergency supplies and temporary housing needed.',
      date: 'June 10, 2025',
      severity: 'High',
      location: 'Northern California, USA',
      timeRemaining: '4 days',
      targetAmount: '$200,000',
      raisedAmount: '$85,000',
      image: 'https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      impactMetrics: {
        people: "850 people sheltered",
        meals: "2,400 meals provided",
        medical: "625 medical kits distributed"
      }
    }
  ];

  const impactEstimates = {
    25: {
      people: "1 family sheltered",
      meals: "50 meals provided",
      medical: "10 medical kits distributed"
    },
    50: {
      people: "2 families sheltered",
      meals: "100 meals provided",
      medical: "20 medical kits distributed"
    },
    100: {
      people: "4 families sheltered",
      meals: "200 meals provided",
      medical: "40 medical kits distributed"
    },
    200: {
      people: "8 families sheltered",
      meals: "400 meals provided",
      medical: "80 medical kits distributed"
    },
    500: {
      people: "20 families sheltered",
      meals: "1000 meals provided",
      medical: "200 medical kits distributed"
    }
  };

  const handleAlertClick = (index: number) => {
    setSelectedAlert(selectedAlert === index ? null : index);
  };

  const closeRedAlert = () => {
    setShowRedAlert(false);
  };

  const openDonationModal = (disaster: any) => {
    setCurrentDisaster(disaster);
    setShowDonationModal(true);
    setDonationStep(1);
    setDonationComplete(false);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
    setDonationStep(1);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(parseInt(e.target.value));
  };

  const handleDonationComplete = () => {
    setDonationStep(3);
    // Simulate processing
    setTimeout(() => {
      setDonationComplete(true);
    }, 1500);
  };

  const getImpactEstimate = () => {
    const closestAmount = Object.keys(impactEstimates)
      .map(Number)
      .reduce((prev, curr) => {
        return Math.abs(curr - donationAmount) < Math.abs(prev - donationAmount) ? curr : prev;
      }, 0);
    
    return impactEstimates[closestAmount as keyof typeof impactEstimates][impactFocus as keyof (typeof impactEstimates)[25]];
  };

  const renderRedAlertBanner = () => {
    if (!showRedAlert) return null;
    
    return (
      <div className="mb-12 relative overflow-hidden">
        <div className="bg-red-600 rounded-lg shadow-lg p-4 sm:p-6 animate-pulse">
          <button 
            onClick={closeRedAlert}
            className="absolute top-2 right-2 text-white hover:text-red-100"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex items-center mb-4 md:mb-0 md:mr-6">
              <div className="bg-white rounded-full p-2 mr-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <span className="text-white font-bold text-sm uppercase tracking-wider bg-red-700 px-2 py-0.5 rounded">Red Alert</span>
                <h3 className="text-white font-bold text-xl mt-1">{redAlert.title}</h3>
              </div>
            </div>
            
            <div className="flex-grow mb-4 md:mb-0 md:mr-6">
              <p className="text-white">{redAlert.description}</p>
              <div className="flex items-center mt-2 text-red-100 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Time remaining: {redAlert.timeRemaining}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="text-white mb-2">
                <span className="font-bold text-xl">{redAlert.raisedAmount}</span>
                <span className="text-red-100 text-sm"> of {redAlert.targetAmount}</span>
              </div>
              <button 
                className="bg-white text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition duration-300 flex items-center"
                onClick={() => openDonationModal({...redAlert, image: alerts[0].image, impactMetrics: alerts[0].impactMetrics})}
              >
                Donate Now <Heart className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAlertCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              selectedAlert === index ? 'border-red-500 transform scale-[1.02]' : 'border-gray-200 hover:border-red-300'
            }`}
            onClick={() => handleAlertClick(index)}
          >
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${alert.image})` }}
            >
              <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    alert.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="ml-2 text-white text-sm">{alert.date}</span>
                </div>
                <h3 className="text-white font-bold text-xl">{alert.title}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start mb-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{alert.location}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{alert.description}</p>
              
              {selectedAlert === index && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>Target: {alert.targetAmount}</span>
                    <span>Raised: {alert.raisedAmount}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-red-500 h-2.5 rounded-full" 
                      style={{ width: `${(parseInt(alert.raisedAmount.replace(/\$|,/g, '')) / parseInt(alert.targetAmount.replace(/\$|,/g, ''))) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{alert.timeRemaining} remaining</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[25, 50, 100].map((amount) => (
                      <button 
                        key={amount}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 rounded-md text-sm font-medium transition duration-300"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-300 flex items-center justify-center"
                    onClick={() => openDonationModal(alert)}
                  >
                    Donate Now <Heart className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
              
              {selectedAlert !== index && (
                <button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-300"
                  onClick={() => openDonationModal(alert)}
                >
                  Donate to Relief Fund
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDonationModal = () => {
    if (!showDonationModal || !currentDisaster) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden relative max-h-[90vh] flex flex-col">
          {/* Header with image */}
          <div 
            className="h-36 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${currentDisaster.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold">{currentDisaster.title}</h2>
                <p className="flex items-center text-sm mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {currentDisaster.location}
                </p>
              </div>
            </div>
            <button 
              onClick={closeDonationModal} 
              className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/50 rounded-full p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {/* Step indicators */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${donationStep >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`w-16 h-1 ${donationStep >= 2 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${donationStep >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`w-16 h-1 ${donationStep >= 3 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${donationStep >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
              </div>
            </div>

            {/* Step 1: Donation Amount */}
            {donationStep === 1 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Donation Amount</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Donation Amount</span>
                    <span className="text-lg font-bold text-red-500">${donationAmount}</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    step="5" 
                    value={donationAmount} 
                    onChange={handleDonationAmountChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>$5</span>
                    <span>$500</span>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold text-red-700 mb-2">Your Impact</h4>
                  
                  <div className="flex space-x-2 mb-4">
                    <button 
                      className={`py-1 px-3 rounded-full text-sm ${impactFocus === 'people' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-300'}`}
                      onClick={() => setImpactFocus('people')}
                    >
                      Shelter
                    </button>
                    <button 
                      className={`py-1 px-3 rounded-full text-sm ${impactFocus === 'meals' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-300'}`}
                      onClick={() => setImpactFocus('meals')}
                    >
                      Food
                    </button>
                    <button 
                      className={`py-1 px-3 rounded-full text-sm ${impactFocus === 'medical' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-300'}`}
                      onClick={() => setImpactFocus('medical')}
                    >
                      Medical
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full">
                      {impactFocus === 'people' && <Shield className="h-6 w-6 text-red-500" />}
                      {impactFocus === 'meals' && <Gift className="h-6 w-6 text-red-500" />}
                      {impactFocus === 'medical' && <Zap className="h-6 w-6 text-red-500" />}
                    </div>
                    <div className="ml-3">
                      <p className="text-red-700 font-medium">With ${donationAmount} you can provide:</p>
                      <p className="text-red-900 font-bold text-lg">{getImpactEstimate()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-8">
                  <button 
                    onClick={closeDonationModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setDonationStep(2)}
                    className="flex-grow bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment Information */}
            {donationStep === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h3>
                
                <div className="bg-red-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Donation Amount:</span>
                    <span className="font-bold text-red-600">${donationAmount}</span>
                  </div>
                  <div className="mt-2 text-sm text-red-700">{getImpactEstimate()}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input 
                      id="recurring" 
                      type="checkbox" 
                      className="h-4 w-4 text-red-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                      Make this a monthly recurring donation
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-8">
                  <button 
                    onClick={() => setDonationStep(1)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-300"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleDonationComplete}
                    className="flex-grow bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition duration-300"
                  >
                    Donate ${donationAmount}
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirmation */}
            {donationStep === 3 && (
              <div className="animate-fadeIn text-center">
                {!donationComplete ? (
                  <div>
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Your Donation</h3>
                    <p className="text-gray-600">Please wait while we process your donation...</p>
                  </div>
                ) : (
                  <div>
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Donation Complete!</h3>
                    <p className="text-gray-600 mb-6">Thank you for your generous donation of ${donationAmount} to help with the {currentDisaster.title}.</p>
                    
                    <div className="bg-red-50 p-6 rounded-lg mb-6 max-w-md mx-auto">
                      <h4 className="font-semibold text-red-700 mb-3">Your Impact</h4>
                      <p className="text-red-900 font-bold text-lg mb-4">{getImpactEstimate()}</p>
                      
                      <div className="flex justify-between text-sm text-red-700">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          <span>Lives Changed</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>Thank You!</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center mb-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 flex items-center justify-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Your Impact
                      </button>
                      <button 
                        onClick={closeDonationModal}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                      >
                        Done
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-4">A receipt has been sent to your email.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="alerts" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderRedAlertBanner()}
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Disaster Alerts</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Current emergencies where your immediate support can help save lives.
          </p>
        </div>
        
        {renderAlertCards()}
        
        <div className="mt-10 text-center">
          <button className="bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-md font-medium transition duration-300 flex items-center mx-auto">
            View All Disaster Alerts <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {renderDonationModal()}
    </section>
  );
};

export default DisasterAlerts;