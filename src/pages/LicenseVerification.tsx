import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

const LicenseVerification: React.FC = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const { verifyLicense, isLoading, error, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyLicense(licenseNumber);
      // If verification is successful, navigate to home
      if (!error) {
        navigate('/home');
      }
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  // If user is already verified, redirect to home
  React.useEffect(() => {
    if (user?.licenseVerified) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your License
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your DARPAN license number to verify your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 flex items-center bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <AlertCircle size={20} className="mr-2" />
              <p>{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                DARPAN License Number
              </label>
              <div className="mt-1">
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g. DARPAN123456"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                For demo purposes, enter any license number starting with "DARPAN"
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle size={18} className="mr-2" />
                    Verify License
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

export default LicenseVerification;