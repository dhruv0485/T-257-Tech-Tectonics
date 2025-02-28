const express = require('express');
const router = express.Router();
const Donor = require('../models/DonorRegisteration');
const bcrypt = require('bcryptjs');

// Donor registration route
router.post('/register', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password,
      aadharNumber,
      panNumber,
      address
    } = req.body;

    // Check if donor with this email already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if donor with this Aadhar already exists
    const donorWithAadhar = await Donor.findOne({ aadharNumber });
    if (donorWithAadhar) {
      return res.status(400).json({ message: 'User with this Aadhar number already exists' });
    }

    // Check if donor with this PAN already exists
    const donorWithPAN = await Donor.findOne({ panNumber });
    if (donorWithPAN) {
      return res.status(400).json({ message: 'User with this PAN number already exists' });
    }

    // Create new donor
    const newDonor = new Donor({
      firstName,
      lastName,
      email,
      password,
      aadharNumber,
      panNumber,
      address
    });

    // Save donor to database
    await newDonor.save();

    // Return success response
    res.status(201).json({
      message: 'Donor registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;