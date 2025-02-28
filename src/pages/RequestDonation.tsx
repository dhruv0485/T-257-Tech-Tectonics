import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HandHeart, AlertCircle } from 'lucide-react';

interface DonationRequest {
  domain: string;
  currentNeeds: string;
  minRequired: string;
  maxRequired: string;
}

const RequestDonation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<DonationRequest>({
    domain: '',
    currentNeeds: '',
    minRequired: '',
    maxRequired: ''
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        domain: '',
        currentNeeds: '',
        minRequired: '',
        maxRequired: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting donation request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Request Donation
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Specify your organization's needs and requirements for donations
          </p>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 rounded">
            <p className="flex items-center">
              <HandHeart className="mr-2" size={20} />
              Your donation request has been submitted successfully!
            </p>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                Donation Domain *
              </label>
              <div className="mt-1">
                <select
                  id="domain"
                  name="domain"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select donation type</option>
                  <option value="Food">Food</option>
                  <option value="Money">Money</option>
                  <option value="Books">Books</option>
                  <option value="Medical Supplies">Medical Supplies</option>
                  <option value="Other Essentials">Other Essentials</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="currentNeeds" className="block text-sm font-medium text-gray-700">
                Current Needs and Purpose *
              </label>
              <div className="mt-1">
                <textarea
                  id="currentNeeds"
                  name="currentNeeds"
                  rows={4}
                  required
                  placeholder="Describe your current needs and the reason for this donation request..."
                  value={formData.currentNeeds}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="minRequired" className="block text-sm font-medium text-gray-700">
                  Minimum Required *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="minRequired"
                    name="minRequired"
                    required
                    placeholder="e.g. 100 kg, ₹10,000, 50 books"
                    value={formData.minRequired}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="maxRequired" className="block text-sm font-medium text-gray-700">
                  Maximum Required *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="maxRequired"
                    name="maxRequired"
                    required
                    placeholder="e.g. 500 kg, ₹50,000, 200 books"
                    value={formData.maxRequired}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <HandHeart size={18} className="mr-2" />
                    Submit Donation Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestDonation;