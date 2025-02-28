const express = require('express');
const router = express.Router();
const Donor = require('../models/DonorRegisteration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret Key (you should move this to an environment variable in production)
const JWT_SECRET = "humblehands_donor_secret_key";

// Login route for donors
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if donor exists
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, donor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: donor._id,
        email: donor.email,
        firstName: donor.firstName,
        lastName: donor.lastName 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Return success response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      donor: {
        id: donor._id,
        firstName: donor.firstName,
        lastName: donor.lastName,
        email: donor.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;