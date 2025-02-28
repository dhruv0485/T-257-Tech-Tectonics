import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType, SignupData } from '../types';

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    licenseVerified: true
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && foundUser.password === password) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (signupData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === signupData.email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name: signupData.name,
        email: signupData.email,
        licenseVerified: false,
        organizationName: signupData.organizationName,
        ngoType: signupData.ngoType,
        about: signupData.about,
        location: signupData.location,
        address: signupData.address,
        licenseNumber: signupData.licenseNumber,
        pincode: signupData.pincode,
        aadharNumber: signupData.aadharNumber,
        panNumber: signupData.panNumber
      };
      
      // In a real app, we would save this user to the database
      // For now, we'll just set it as the current user
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const verifyLicense = async (licenseNumber: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to DARPAN for license verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll verify any license number that starts with "DARPAN"
      if (licenseNumber.startsWith('DARPAN')) {
        setUser(prev => prev ? { ...prev, licenseVerified: true } : null);
      } else {
        throw new Error('Invalid license number. Please enter a valid DARPAN license.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during license verification');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    verifyLicense,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};