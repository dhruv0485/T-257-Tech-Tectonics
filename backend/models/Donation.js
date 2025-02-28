// models/Donation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the donation document
const DonationSchema = new Schema({
  // Donor information
  donor: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to user if authenticated
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },

  // Donation type and details
  donationType: {
    type: String,
    enum: ['fixed', 'item'],
    required: true
  },
  
  // For fixed amount donations
  amount: {
    value: { type: Number },
    currency: { type: String, default: 'USD' }
  },
  
  // For item donations
  item: {
    name: { type: String },
    quantity: { type: Number },
    unit: { type: String }
  },
  
  // If item is from marketplace
  marketplace: {
    marketplaceId: { type: String },
    marketplaceName: { type: String },
    productId: { type: String },
    regularPrice: { type: Number },
    bulkPrice: { type: Number }
  },
  
  // Donation channel
  donationChannel: {
    type: String,
    enum: ['direct', 'mediator', 'neutral'],
    required: true
  },
  
  // For mediator-based donations
  mediator: {
    mediatorId: { type: String },
    name: { type: String },
    contact: { type: String },
    pickupTime: { type: Date }
  },
  
  // For neutral center drop-offs
  neutralCenter: {
    centerId: { type: String },
    name: { type: String },
    address: { type: String },
    hours: { type: String }
  },
  
  // For direct donations
  institution: {
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution' },
    name: { type: String }
  },
  
  // Credit points earned from donation
  creditPoints: {
    type: Number,
    default: 0
  },
  
  // Payment information
  payment: {
    method: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'] },
    transactionId: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'] },
    paidAt: { type: Date }
  },
  
  // Donation status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Status history for tracking
  statusHistory: [{
    status: { 
      type: String,
      enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'completed', 'cancelled']
    },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String }
  }],
  
  // Impact tracking
  impact: {
    beneficiaries: { type: Number },
    description: { type: String }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Virtual for total value calculation
DonationSchema.virtual('totalValue').get(function() {
  if (this.donationType === 'fixed') {
    return this.amount.value;
  } else if (this.donationType === 'item' && this.marketplace && this.marketplace.bulkPrice) {
    return this.item.quantity * this.marketplace.bulkPrice;
  }
  return 0;
});

// Pre-save hook to update timestamps
DonationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', DonationSchema);