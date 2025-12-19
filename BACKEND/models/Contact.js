const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Academic', 'Administrative', 'Student Services', 'Emergency', 'Other']
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  officeHours: {
    type: String,
    default: 'Sun-Thu: 9AM-5PM'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);

