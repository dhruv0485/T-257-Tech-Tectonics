export interface User {
  id: string;
  name: string;
  email: string;
  licenseVerified: boolean;
  organizationName?: string;
  ngoType?: string;
  about?: string;
  location?: string;
  address?: string;
  licenseNumber?: string;
  pincode?: string;
  aadharNumber?: string;
  panNumber?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (signupData: SignupData) => Promise<void>;
  logout: () => void;
  verifyLicense: (licenseNumber: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  ngoType: string;
  about: string;
  location: string;
  address: string;
  licenseNumber: string;
  pincode: string;
  aadharNumber: string;
  panNumber: string;
  licenseImage?: File;
}