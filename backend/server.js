const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const handlebars = require('handlebars')
const crypto = require('crypto')
const axios = require('axios')
const fs = require('fs')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const otpStorage = new Map()

// Import routes
const donorRoutes = require('./Routes/DonorRegisterationRoute')
const donorLoginRoutes = require('./Routes/DonorLogin')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
// Modify static file serving to point to correct directory
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(cors())


mongoose.connect(`mongodb+srv://dhruvmehta2004:0Tb9LfHuX0jTPQsW@cluster0.bmpyuvt.mongodb.net/HumbleHands-Donor`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB successfully connected")
    })
    .catch((error) => {
        console.log("MongoDB is not successfully connected", error)
        process.exit(1)
    })

// Use donor routes
app.use('/api/donor', donorRoutes)
app.use('/api/donorlogin', donorLoginRoutes)

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const verified = jwt.verify(token, "humblehands_donor_secret_key");
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Example of a protected route
app.get('/api/donor/profile', authenticateToken, (req, res) => {
  // req.user contains the authenticated user info
  res.json({ user: req.user });
});

app.get('/api/donations', async (req, res) => {
    try {
      const donations = await Donation.find().sort({ createdAt: -1 });
      res.json(donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get single donation by ID
  app.get('/api/donations/:id', async (req, res) => {
    try {
      const donation = await Donation.findById(req.params.id);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
      res.json(donation);
    } catch (error) {
      console.error('Error fetching donation:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get user donations
  app.get('/api/user/donations', async (req, res) => {
    try {
      // In a real app, extract user ID from JWT token
      const userId = req.query.userId; 
      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }
      
      const donations = await Donation.find({ 'donor.userId': userId }).sort({ createdAt: -1 });
      res.json(donations);
    } catch (error) {
      console.error('Error fetching user donations:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Create new donation
  app.post('/api/donations', async (req, res) => {
    try {
      const {
        donor,
        donationType,
        amount,
        item,
        marketplace,
        donationChannel,
        mediator,
        neutralCenter,
        institution,
        payment
      } = req.body;
  
      // Calculate credit points based on donation type and value
      let creditPoints = 0;
      if (donationType === 'fixed') {
        creditPoints = Math.floor(amount.value * 2);
      } else if (donationType === 'item') {
        creditPoints = Math.floor(item.quantity * 5);
      }
  
      // Create new donation
      const newDonation = new Donation({
        donor,
        donationType,
        amount: donationType === 'fixed' ? amount : undefined,
        item: donationType === 'item' ? item : undefined,
        marketplace,
        donationChannel,
        mediator: donationChannel === 'mediator' ? mediator : undefined,
        neutralCenter: donationChannel === 'neutral' ? neutralCenter : undefined,
        institution: donationChannel === 'direct' ? institution : undefined,
        creditPoints,
        payment,
        status: 'pending',
        statusHistory: [
          {
            status: 'pending',
            timestamp: new Date(),
            notes: 'Donation created'
          }
        ]
      });
  
      await newDonation.save();
  
      // If user is registered, update their credit points
      if (donor.userId) {
        await User.findByIdAndUpdate(
          donor.userId,
          { $inc: { creditPoints: creditPoints } }
        );
      }
  
      res.status(201).json({ 
        success: true,
        message: 'Donation created successfully', 
        donation: newDonation 
      });
    } catch (error) {
      console.error('Error creating donation:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update donation status
  app.put('/api/donations/:id/status', async (req, res) => {
    try {
      const { status, notes } = req.body;
      
      if (!['pending', 'confirmed', 'in_transit', 'delivered', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const donation = await Donation.findById(req.params.id);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      donation.status = status;
      donation.statusHistory.push({
        status,
        timestamp: new Date(),
        notes: notes || `Status updated to ${status}`
      });
  
      await donation.save();
      res.json({ success: true, donation });
    } catch (error) {
      console.error('Error updating donation status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get marketplace options
  app.get('/api/marketplaces', async (req, res) => {
    try {
      // This would typically come from a database, but for this example
      // we'll use static data matching what's in the frontend
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
      
      res.json(marketplaces);
    } catch (error) {
      console.error('Error fetching marketplaces:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get mediators
  app.get('/api/mediators', async (req, res) => {
    try {
      const mediators = [
        { id: '1', name: 'John Smith', contact: '555-123-4567', photo: '/api/placeholder/60/60' },
        { id: '2', name: 'Sarah Johnson', contact: '555-987-6543', photo: '/api/placeholder/60/60' },
        { id: '3', name: 'Michael Wong', contact: '555-456-7890', photo: '/api/placeholder/60/60' },
      ];
      
      res.json(mediators);
    } catch (error) {
      console.error('Error fetching mediators:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get neutral centers
  app.get('/api/neutral-centers', async (req, res) => {
    try {
      const neutralCenters = [
        { id: '1', name: 'Community Center', address: '123 Main St', hours: '9am-5pm' },
        { id: '2', name: 'Public Library', address: '456 Park Ave', hours: '10am-7pm' },
        { id: '3', name: 'Youth Center', address: '789 Oak Blvd', hours: '8am-6pm' },
      ];
      
      res.json(neutralCenters);
    } catch (error) {
      console.error('Error fetching neutral centers:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get user credit points
  app.get('/api/user/:id/credit-points', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ creditPoints: user.creditPoints || 0 });
    } catch (error) {
      console.error('Error fetching user credit points:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get donation statistics (for admin dashboard)
  app.get('/api/stats/donations', async (req, res) => {
    try {
      const totalDonations = await Donation.countDocuments();
      const totalAmount = await Donation.aggregate([
        { 
          $match: { donationType: 'fixed' }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount.value" }
          }
        }
      ]);
  
      const itemDonations = await Donation.countDocuments({ donationType: 'item' });
      
      res.json({
        totalDonations,
        totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0,
        itemDonations
      });
    } catch (error) {
      console.error('Error fetching donation statistics:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Add these to the existing imports at the top of server.js
// Add these to the existing imports at the top of server.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');


// Setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Initialize the Gemini API
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';
 // Replace with actual key or use environment variable

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || 'dhruvmehta.2004@gmail.com', // Replace with your actual email
    pass: process.env.EMAIL_PASSWORD || 'dmkm uygd uwvo mbqq' // Replace with app password
  }
});

// Define a temporary storage for donation request session data
const donationRequests = new Map();

// Update the chatbot context to include information about self-donation requests
const CHATBOT_CONTEXT = `
You are HumbleHands support assistant, helping users with questions about the HumbleHands donation platform.

About the platform:
- HumbleHands is a donation platform connecting donors with people and institutions in need
- We facilitate both monetary donations and item donations
- Donors can earn credit points based on their donations
- There are three donation channels: direct to institutions, through mediators, or via neutral centers

About NGOs and partners:
- We partner with verified NGOs and charitable institutions
- All partner organizations are vetted for transparency and impact
- We facilitate donations to education, healthcare, disaster relief, and community development

Donation process:
- Users can donate money directly or purchase items from marketplace partners
- Donations can be tracked from creation to delivery
- Multiple payment methods are supported
- Donors receive updates on the impact of their contributions

Self-donation requests:
- If someone needs a donation for themselves, listen for phrases like "I need help", "donation for myself", "I'm in need"
- When identified, respond with: "I understand you're requesting assistance for yourself. I can help you submit a donation request. To start the process, please provide your full name."
- After collecting full name, ask for their phone number
- After phone number, ask for email address
- After email, ask for physical address
- After address, ask what type of donation they're seeking (money, food, clothes, medical supplies, etc.)
- After donation type, ask for a brief description of their situation and why they need assistance
- Once all information is provided, inform them that their request will be reviewed and they'll receive an email confirmation

Keep responses concise but helpful. If you don't know the answer to a specific question, suggest they contact support@humblehands.org.
`;

// Add this route to handle file uploads for verification
app.post('/api/upload-verification', upload.single('image'), (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId || !donationRequests.has(sessionId)) {
      return res.status(400).json({ error: 'Invalid session' });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Update the donation request with the file path
    const donationRequest = donationRequests.get(sessionId);
    donationRequest.verificationImage = req.file.path;
    donationRequests.set(sessionId, donationRequest);
    
    res.json({ 
      success: true, 
      message: 'Image uploaded successfully',
      nextStep: 'verification_complete'
    });
  } catch (error) {
    console.error('Error uploading verification image:', error);
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
});

// Enhanced chatbot route with session management
// Enhanced chatbot route with session management
// Enhanced chatbot route with session management
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, sessionId: existingSessionId, currentStep } = req.body;
    
    // Create or retrieve session
    let sessionId = existingSessionId;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      donationRequests.set(sessionId, { 
        stage: 'initial',
        requestType: null,
        personalInfo: {},
        donationNeeds: {},
        complete: false,
        lastActivity: new Date()
      });
    }
    
    let donationRequest = donationRequests.get(sessionId) || { 
      stage: 'initial',
      requestType: null,
      personalInfo: {},
      donationNeeds: {},
      complete: false
    };
    
    // Update last activity time
    donationRequest.lastActivity = new Date();
    
    // Process based on the current stage in donationRequest
    if (donationRequest.requestType === 'self_donation') {
      switch (donationRequest.stage) {
        case 'collecting_name':
          donationRequest.personalInfo.name = message;
          donationRequest.stage = 'collecting_phone';
          donationRequests.set(sessionId, donationRequest);
          return res.json({ 
            response: "Thank you. Now, please provide your phone number so we can contact you regarding your donation request.",
            sessionId,
            currentStep: 'phone'
          });
          
        case 'collecting_phone':
          donationRequest.personalInfo.phone = message;
          donationRequest.stage = 'collecting_email';
          donationRequests.set(sessionId, donationRequest);
          return res.json({ 
            response: "Got it. Please share your email address where we can send updates about your donation request.",
            sessionId,
            currentStep: 'email'
          });
          
        case 'collecting_email':
          donationRequest.personalInfo.email = message;
          donationRequest.stage = 'collecting_address';
          donationRequests.set(sessionId, donationRequest);
          return res.json({ 
            response: "Thank you. Please provide your complete address where donations can be delivered.",
            sessionId,
            currentStep: 'address'
          });
          
        case 'collecting_address':
          donationRequest.personalInfo.address = message;
          donationRequest.stage = 'collecting_donation_type';
          donationRequests.set(sessionId, donationRequest);
          return res.json({ 
            response: "What type of donation are you seeking? (Examples: money, food, clothes, medical supplies, etc.)",
            sessionId,
            currentStep: 'donationType'
          });
          
        case 'collecting_donation_type':
          donationRequest.donationNeeds.type = message;
          donationRequest.stage = 'collecting_situation';
          donationRequests.set(sessionId, donationRequest);
          return res.json({ 
            response: "Please briefly describe your situation and why you need assistance. This helps us better understand your needs.",
            sessionId,
            currentStep: 'situation'
          });
          
        case 'collecting_situation':
          donationRequest.donationNeeds.situation = message;
          // Skip verification and go straight to completion
          donationRequest.stage = 'complete';
          donationRequest.complete = true;
          donationRequest.timestamp = new Date();
          donationRequests.set(sessionId, donationRequest);
          
          // Send confirmation email
          const mailOptions = {
            from: 'dhruvmehta.2004@gmail.com',
            to: donationRequest.personalInfo.email,
            subject: 'Your HumbleHands Donation Request Confirmation',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a6da7;">HumbleHands Donation Request Confirmation</h2>
                <p>Dear ${donationRequest.personalInfo.name},</p>
                <p>Thank you for submitting your donation request with HumbleHands. We have received your request and it will be reviewed by our team.</p>
                <p><strong>Request Details:</strong></p>
                <ul>
                  <li>Request Type: ${donationRequest.donationNeeds.type}</li>
                  <li>Submitted on: ${new Date().toLocaleDateString()}</li>
                </ul>
                <p>We will process your request as soon as possible and connect you with potential donors. You will receive updates via email as your request progresses.</p>
                <p>If you have any questions, please contact our support team at support@humblehands.org.</p>
                <p>Warm regards,<br>The HumbleHands Team</p>
              </div>
            `
          };
          
          try {
            await transporter.sendMail(mailOptions);
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
          }
          
          return res.json({ 
            response: "Thank you for completing the donation request process. We've sent a confirmation email to your provided email address. Our team will review your request and connect you with potential donors as soon as possible. You'll receive updates as your request progresses.",
            sessionId,
            currentStep: 'complete',
            complete: true
          });
      }
    }
    
    // Only check for self-donation indicators if not already in the process
    if (donationRequest.stage === 'initial') {
      // Check if the message indicates a self-donation request
      const selfDonationIndicators = [
        'need help', 'need donation', 'donation for myself', 'i need assistance', 
        'i am in need', 'need support', 'request donation', 'help me', 'request assistance',
        'donation for me', 'i need help', 'personal assistance'
      ];
      
      const isSelfDonationRequest = selfDonationIndicators.some(phrase => 
        message.toLowerCase().includes(phrase.toLowerCase())
      );
      
      if (isSelfDonationRequest) {
        donationRequest.stage = 'collecting_name';
        donationRequest.requestType = 'self_donation';
        donationRequests.set(sessionId, donationRequest);
        
        return res.json({
          response: "I understand you're requesting assistance for yourself. I can help you submit a donation request. To start the process, please provide your full name.",
          sessionId,
          currentStep: 'name'
        });
      }
    }
    
    // If not in self-donation flow or it's initial generic question, use Groq API
    // Create conversation history in the format Groq expects
    const chatHistory = [
      { role: "system", content: CHATBOT_CONTEXT },
    ];
    
    // Add the current message
    chatHistory.push({ role: "user", content: message });
    
    // Make the API call to Groq
    const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama3-8b-8192", // You can also use "mixtral-8x7b-32768" or other models
      messages: chatHistory,
      temperature: 0.2,
      max_tokens: 500,
      top_p: 0.8
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the response
    const response = groqResponse.data.choices[0].message.content;
    
    res.json({ 
      response,
      sessionId
    });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
});

// Create a cleanup routine to remove old/completed requests (runs every hour)
setInterval(() => {
  const now = new Date();
  donationRequests.forEach((request, sessionId) => {
    // Remove completed requests after 24 hours
    if (request.complete && now - request.timestamp > 24 * 60 * 60 * 1000) {
      donationRequests.delete(sessionId);
    }
    
    // Remove incomplete requests after 3 hours of inactivity
    if (!request.complete && request.lastActivity && now - request.lastActivity > 3 * 60 * 60 * 1000) {
      donationRequests.delete(sessionId);
    }
  });
}, 60 * 60 * 1000);

// Make sure to add this to your package.json dependencies:
// "@google/generative-ai": "^0.2.0"

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})