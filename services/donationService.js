// services/donationService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  
export default donationSerivce = {
  // Get all marketplaces
  getMarketplaces: async () => {
    try {
      const response = await axios.get(`${API_URL}/marketplaces`);
      return response.data;
    } catch (error) {
      console.error('Error fetching marketplaces:', error);
      throw error;
    }
  },

  // Get all mediators
  getMediators: async () => {
    try {
      const response = await axios.get(`${API_URL}/mediators`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mediators:', error);
      throw error;
    }
  },

  // Get all neutral centers
  getNeutralCenters: async () => {
    try {
      const response = await axios.get(`${API_URL}/neutral-centers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching neutral centers:', error);
      throw error;
    }
  },

  // Create a new donation
  createDonation: async (donationData) => {
    try {
      const response = await axios.post(`${API_URL}/donations`, donationData);
      return response.data;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  // Get user's donation history
  getUserDonations: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/donations?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user donations:', error);
      throw error;
    }
  },

  // Get user's credit points
  getUserCreditPoints: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}/credit-points`);
      return response.data.creditPoints;
    } catch (error) {
      console.error('Error fetching user credit points:', error);
      throw error;
    }
  },

  // Get a specific donation by ID
  getDonationById: async (donationId) => {
    try {
      const response = await axios.get(`${API_URL}/donations/${donationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching donation:', error);
      throw error;
    }
  },

  // Update donation status
  updateDonationStatus: async (donationId, status, notes) => {
    try {
      const response = await axios.put(`${API_URL}/donations/${donationId}/status`, { 
        status, 
        notes 
      });
      return response.data;
    } catch (error) {
      console.error('Error updating donation status:', error);
      throw error;
    }
  }
};

