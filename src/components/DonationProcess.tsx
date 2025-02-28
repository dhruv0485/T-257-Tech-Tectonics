import React, { useState } from 'react';
import { CreditCard, Package, Award, Building, Users, ArrowRight, Check, Truck, MapPin, Clock, ShoppingBag, X } from 'lucide-react';
const DonationProcess = () => {
  const [donationType, setDonationType] = useState<'fixed' | 'item' | null>(null);
  const [donationChannel, setDonationChannel] = useState<'direct' | 'mediator' | 'neutral' | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [selectedMediator, setSelectedMediator] = useState<string>('');
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [showMarketplace, setShowMarketplace] = useState<boolean>(false);
const [selectedMarketplace, setSelectedMarketplace] = useState<string>('');
  // Predefined donation amounts
  const donationAmounts = [10, 25, 50, 100, 250, 500];
  const marketplaces = [
    { 
      id: 'bigbasket', 
      name: 'BigBasket', 
      icon: '/api/placeholder/60/60', 
      category: 'Food & Groceries',
      products: [
        { id: '1', name: 'Rice (5kg)', regularPrice: 25, bulkPrice: 20, image: '/api/placeholder/80/80' },
        { id: '2', name: 'Wheat Flour (2kg)', regularPrice: 15, bulkPrice: 12, image: '/api/placeholder/80/80' },
        { id: '3', name: 'Lentils Variety Pack', regularPrice: 18, bulkPrice: 15, image: '/api/placeholder/80/80' }
      ]
    },
    { 
      id: 'amazon', 
      name: 'Amazon', 
      icon: '/api/placeholder/60/60', 
      category: 'Clothes & Books',
      products: [
        { id: '1', name: 'Children\'s Book Set (10 books)', regularPrice: 45, bulkPrice: 35, image: '/api/placeholder/80/80' },
        { id: '2', name: 'Winter Jacket Bundle (5 pcs)', regularPrice: 120, bulkPrice: 95, image: '/api/placeholder/80/80' },
        { id: '3', name: 'School Supplies Kit', regularPrice: 30, bulkPrice: 22, image: '/api/placeholder/80/80' }
      ]
    },
    { 
      id: 'wellness', 
      name: 'Wellness Forever', 
      icon: '/api/placeholder/60/60', 
      category: 'Medical Supplies',
      products: [
        { id: '1', name: 'First Aid Kit (Basic)', regularPrice: 35, bulkPrice: 28, image: '/api/placeholder/80/80' },
        { id: '2', name: 'Vitamins & Supplements Pack', regularPrice: 50, bulkPrice: 40, image: '/api/placeholder/80/80' },
        { id: '3', name: 'Personal Hygiene Kit', regularPrice: 25, bulkPrice: 20, image: '/api/placeholder/80/80' }
      ]
    }
  ];
  
  // Add this function to handle marketplace selection
  const handleMarketplaceSelect = (marketplaceId: string) => {
    setSelectedMarketplace(marketplaceId);
    setShowMarketplace(true);
  };
  
  // Add this function to handle adding marketplace items to donation
  const handleAddMarketplaceItem = (marketplaceId: string, productName: string, quantity: number = 1) => {
    const marketplace = marketplaces.find(m => m.id === marketplaceId);
    if (marketplace) {
      setItemName(productName);
      setItemQuantity(quantity.toString());
      setShowMarketplace(false);
    }
  };
  // Common donation items
  const commonItems = [
    { name: 'Rice', unit: 'kg' },
    { name: 'Books', unit: 'pieces' },
    { name: 'Clothes', unit: 'pieces' },
    { name: 'Medical Supplies', unit: 'kits' },
    { name: 'School Supplies', unit: 'sets' }
  ];

  // Mediator information
  const mediators = [
    { id: '1', name: 'John Smith', contact: '555-123-4567', photo: '/api/placeholder/60/60' },
    { id: '2', name: 'Sarah Johnson', contact: '555-987-6543', photo: '/api/placeholder/60/60' },
    { id: '3', name: 'Michael Wong', contact: '555-456-7890', photo: '/api/placeholder/60/60' },
  ];

  // Neutral centers information
  const neutralCenters = [
    { id: '1', name: 'Community Center', address: '123 Main St', hours: '9am-5pm' },
    { id: '2', name: 'Public Library', address: '456 Park Ave', hours: '10am-7pm' },
    { id: '3', name: 'Youth Center', address: '789 Oak Blvd', hours: '8am-6pm' },
  ];
  
  // Credit points calculation
  const calculateCreditPoints = () => {
    if (donationType === 'fixed') {
      return Math.floor(Number(amount) * 2);
    } else if (donationType === 'item') {
      return Math.floor(Number(itemQuantity) * 5);
    }
    return 0;
  };

  // Check if donation amount is small (less than $50)
  const isSmallDonation = () => {
    if (donationType === 'fixed') {
      return Number(amount) < 50;
    } else if (donationType === 'item') {
      return Number(itemQuantity) < 10;
    }
    return false;
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the donation to a backend
    alert('Thank you for your donation! Your generosity will make a difference.');
    // Reset form
    setDonationType(null);
    setDonationChannel(null);
    setAmount('');
    setItemName('');
    setItemQuantity('');
    setPickupTime('');
    setSelectedMediator('');
    setSelectedCenter('');
    setStep(1);
  };
  
  return (
    <section id="donate" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Make a Donation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose how you want to contribute and make a meaningful impact today.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-3xl justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg ${
                      step >= stepNumber 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > stepNumber ? <Check className="h-6 w-6" /> : stepNumber}
                  </div>
                  <div className="text-sm font-medium mt-2 text-gray-600">
                    {stepNumber === 1 ? 'Donation Type' : stepNumber === 2 ? 'Donation Channel' : 'Review & Submit'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center mt-4">
            <div className="w-full max-w-3xl bg-gray-200 h-1 absolute"></div>
            <div 
              className="bg-red-500 h-1 absolute left-0" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Donation Type */}
            {step === 1 && (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Donation Type</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Fixed Amount Option */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                      donationType === 'fixed' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => setDonationType('fixed')}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${donationType === 'fixed' ? 'bg-red-500' : 'bg-gray-100'}`}>
                        <CreditCard className={`h-6 w-6 ${donationType === 'fixed' ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <h4 className="text-xl font-semibold ml-3 text-gray-800">Fixed Amount</h4>
                    </div>
                    <p className="text-gray-600 mb-2">Donate a specific amount of money to support our causes.</p>
                    <p className="text-sm text-gray-500">Earn 2 credit points per dollar donated</p>
                  </div>
                  
                  {/* Item and Quantity Option */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                      donationType === 'item' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => setDonationType('item')}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${donationType === 'item' ? 'bg-red-500' : 'bg-gray-100'}`}>
                        <Package className={`h-6 w-6 ${donationType === 'item' ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <h4 className="text-xl font-semibold ml-3 text-gray-800">Item Donation</h4>
                    </div>
                    <p className="text-gray-600 mb-2">Donate specific items like food, books, or supplies.</p>
                    <p className="text-sm text-gray-500">Earn 5 credit points per item quantity</p>
                  </div>
                </div>
                
                {/* Fixed Amount Details */}
                {donationType === 'fixed' && (
                  <div className="mt-6 animate-fadeIn">
                    <label className="block text-gray-700 font-medium mb-2">Select or Enter Amount</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {donationAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`py-3 px-4 border-2 rounded-md font-medium transition-colors ${
                            amount === amt.toString() 
                              ? 'bg-red-500 text-white border-red-500' 
                              : 'border-gray-300 text-gray-700 hover:border-red-300'
                          }`}
                          onClick={() => setAmount(amt.toString())}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Custom Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          min="1"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full pl-8 pr-12 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Item Donation Details */}
                {donationType === 'item' && (
                  <div className="mt-6 animate-fadeIn">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Select Item</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                        {commonItems.map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            className={`py-3 px-4 border-2 rounded-md font-medium transition-colors ${
                              itemName === item.name 
                                ? 'bg-red-500 text-white border-red-500' 
                                : 'border-gray-300 text-gray-700 hover:border-red-300'
                            }`}
                            onClick={() => setItemName(item.name)}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Custom Item</label>
                        <input
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter item name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={itemQuantity}
                          onChange={(e) => setItemQuantity(e.target.value)}
                          className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNextStep}
                    disabled={!donationType || (donationType === 'fixed' && !amount) || (donationType === 'item' && (!itemName || !itemQuantity))}
                  >
                    Next Step <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            {/* Marketplace Integration - Only shown when item donation is selected */}
<div className="mt-6">
  <label className="block text-gray-700 font-medium mb-2">
    <span className="flex items-center">
      <ShoppingBag className="h-5 w-5 mr-2 text-gray-500" />
      Or Select from a Marketplace
    </span>
  </label>
  <p className="text-sm text-gray-600 mb-4">Choose a marketplace to select donation items at discounted bulk rates</p>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {marketplaces.map((marketplace) => (
      <div 
        key={marketplace.id}
        className="border-2 border-gray-200 hover:border-red-300 rounded-lg p-4 cursor-pointer transition-all duration-300"
        onClick={() => handleMarketplaceSelect(marketplace.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={marketplace.icon} alt={marketplace.name} className="w-10 h-10 rounded object-cover" />
            <div className="ml-3">
              <h5 className="font-semibold text-gray-800">{marketplace.name}</h5>
              <p className="text-xs text-gray-500">{marketplace.category}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    ))}
  </div>
</div>
            {/* Step 2: Donation Channel */}
            {step === 2 && (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Donation Channel</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Direct to Center Option */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                      donationChannel === 'direct' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => {
                      setDonationChannel('direct');
                      setSelectedMediator('');
                      setPickupTime('');
                      setSelectedCenter('');
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${donationChannel === 'direct' ? 'bg-red-500' : 'bg-gray-100'}`}>
                        <Building className={`h-6 w-6 ${donationChannel === 'direct' ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <h4 className="text-xl font-semibold ml-3 text-gray-800">Direct to Center</h4>
                    </div>
                    <p className="text-gray-600">Donate directly to a specific institution of your choice.</p>
                  </div>
                  
                  {/* Through Mediator Option - Only shown if not a small donation */}
                  {!isSmallDonation() && (
                    <div 
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                        donationChannel === 'mediator' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                      onClick={() => {
                        setDonationChannel('mediator');
                        setSelectedCenter('');
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-full ${donationChannel === 'mediator' ? 'bg-red-500' : 'bg-gray-100'}`}>
                          <Users className={`h-6 w-6 ${donationChannel === 'mediator' ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <h4 className="text-xl font-semibold ml-3 text-gray-800">Through Mediator</h4>
                      </div>
                      <p className="text-gray-600">A mediator will pick up your donation and distribute it to institutions based on need.</p>
                    </div>
                  )}
                  
                  {/* Neutral Center Option - Only shown for small donations */}
                  {isSmallDonation() && (
                    <div 
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                        donationChannel === 'neutral' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                      onClick={() => {
                        setDonationChannel('neutral');
                        setSelectedMediator('');
                        setPickupTime('');
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-full ${donationChannel === 'neutral' ? 'bg-red-500' : 'bg-gray-100'}`}>
                          <MapPin className={`h-6 w-6 ${donationChannel === 'neutral' ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <h4 className="text-xl font-semibold ml-3 text-gray-800">Deliver to Neutral Center</h4>
                      </div>
                      <p className="text-gray-600">Drop off your small donation at a convenient neutral center location.</p>
                    </div>
                  )}
                </div>
                
                {/* Mediator Selection and Pickup Time - Only shown when mediator is selected */}
                {donationChannel === 'mediator' && (
                  <div className="mt-6 animate-fadeIn">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Select a Mediator</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {mediators.map((mediator) => (
                        <div 
                          key={mediator.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            selectedMediator === mediator.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                          onClick={() => setSelectedMediator(mediator.id)}
                        >
                          <div className="flex items-center mb-3">
                            <img src={mediator.photo} alt={mediator.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="ml-3">
                              <h5 className="font-semibold text-gray-800">{mediator.name}</h5>
                              <p className="text-sm text-gray-600">{mediator.contact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        <span className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-gray-500" />
                          Select Pickup Time
                        </span>
                      </label>
                      <input
                        type="datetime-local"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}
                
                {/* Neutral Center Selection - Only shown when neutral center is selected */}
                {donationChannel === 'neutral' && (
                  <div className="mt-6 animate-fadeIn">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Select a Neutral Center</h4>
                    
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {neutralCenters.map((center) => (
                        <div 
                          key={center.id}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            selectedCenter === center.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                          onClick={() => setSelectedCenter(center.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-semibold text-gray-800">{center.name}</h5>
                              <p className="text-sm text-gray-600">{center.address}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {center.hours}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Credit Points Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Credit Points</h4>
                  </div>
                  <p className="text-blue-700 mb-2">
                    You will earn <span className="font-bold">{calculateCreditPoints()} credit points</span> for this donation.
                  </p>
                  <p className="text-sm text-blue-600">
                    Credit points can be used for special recognition, impact reports, and exclusive donor events.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    className="border-2 border-gray-300 hover:border-red-300 text-gray-700 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center"
                    onClick={handlePrevStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNextStep}
                    disabled={
                      !donationChannel || 
                      (donationChannel === 'mediator' && (!selectedMediator || !pickupTime)) ||
                      (donationChannel === 'neutral' && !selectedCenter)
                    }
                  >
                    Next Step <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Review Your Donation</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Donation Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Donation Type:</span>
                      <span className="font-medium text-gray-800">
                        {donationType === 'fixed' ? 'Fixed Amount' : 'Item Donation'}
                      </span>
                    </div>
                    
                    {donationType === 'fixed' && (
                      <div className="flex justify-between pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium text-gray-800">${amount}</span>
                      </div>
                    )}
                    
                    {donationType === 'item' && (
                      <>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Item:</span>
                          <span className="font-medium text-gray-800">{itemName}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium text-gray-800">{itemQuantity}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Donation Channel:</span>
                      <span className="font-medium text-gray-800">
                        {donationChannel === 'direct' ? 'Direct to Center' : 
                         donationChannel === 'mediator' ? 'Through Mediator' : 'Neutral Center'}
                      </span>
                    </div>
                    
                    {donationChannel === 'mediator' && selectedMediator && (
                      <>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Mediator:</span>
                          <span className="font-medium text-gray-800">
                            {mediators.find(m => m.id === selectedMediator)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Pickup Time:</span>
                          <span className="font-medium text-gray-800">
                            {new Date(pickupTime).toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {donationChannel === 'neutral' && selectedCenter && (
                      <div className="flex justify-between pb-3 border-b border-gray-200">
                        <span className="text-gray-600">Neutral Center:</span>
                        <span className="font-medium text-gray-800">
                          {neutralCenters.find(c => c.id === selectedCenter)?.name}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Credit Points:</span>
                      <span className="font-medium text-blue-600">{calculateCreditPoints()} points</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Section would go here in a real application */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h4>
                  <p className="text-gray-600 italic">
                    In a real application, payment options would be displayed here.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    className="border-2 border-gray-300 hover:border-red-300 text-gray-700 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center"
                    onClick={handlePrevStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition duration-300"
                  >
                    Complete Donation
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Credit Points Information */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-amber-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Credit Points System</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our credit points system rewards your generosity and allows you to track your impact. Points can be used for:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-amber-50 rounded-lg p-5">
                <h4 className="font-semibold text-amber-800 mb-2">Recognition</h4>
                <p className="text-amber-700 text-sm">
                  Earn badges and recognition on our donor wall based on your contribution level.
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-5">
                <h4 className="font-semibold text-amber-800 mb-2">Impact Reports</h4>
                <p className="text-amber-700 text-sm">
                  Receive detailed reports about how your donations are making a difference.
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-5">
                <h4 className="font-semibold text-amber-800 mb-2">Exclusive Events</h4>
                <p className="text-amber-700 text-sm">
                  Get invited to special donor events and field visits to see your impact firsthand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Marketplace Popup */}
{showMarketplace && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={marketplaces.find(m => m.id === selectedMarketplace)?.icon} 
            alt={marketplaces.find(m => m.id === selectedMarketplace)?.name} 
            className="w-8 h-8 rounded"
          />
          <h3 className="text-xl font-bold ml-3">
            {marketplaces.find(m => m.id === selectedMarketplace)?.name} Marketplace
          </h3>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowMarketplace(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6">
          Select items from {marketplaces.find(m => m.id === selectedMarketplace)?.name} to donate. 
          Enjoy special bulk discounts when donating multiple items.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketplaces.find(m => m.id === selectedMarketplace)?.products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover" />
                <div className="p-4 flex-1">
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-500 line-through">Regular: ${product.regularPrice}</span>
                    <span className="ml-2 text-lg font-medium text-red-600">Bulk: ${product.bulkPrice}</span>
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      Save {Math.round(((product.regularPrice - product.bulkPrice) / product.regularPrice) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <select 
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    defaultValue="1"
                  >
                    {[1, 5, 10, 25, 50].map((qty) => (
                      <option key={qty} value={qty}>{qty} units</option>
                    ))}
                  </select>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                  onClick={() => handleAddMarketplaceItem(selectedMarketplace, product.name, 5)}
                >
                  Add to Donation
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-semibold text-blue-800">Bulk Donation Benefits</h4>
          </div>
          <p className="text-sm text-blue-700">
            Purchasing items in bulk for donation provides significant discounts and allows your contribution to have a greater impact.
            All items will be delivered directly to the selected institution or mediator.
          </p>
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition duration-300 mr-3"
          onClick={() => setShowMarketplace(false)}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-300"
          onClick={() => setShowMarketplace(false)}
        >
          Continue with Donation
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default DonationProcess;