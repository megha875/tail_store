const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  source: {
    type: String,
    required: true,
    enum: ['google', 'social', 'friend', 'other']
  },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  mobile: { type: String, required: true, trim: true, maxlength: 30 },
  enquiry: { type: String, required: true, trim: true, maxlength: 5000 }
}, { timestamps: true });

module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
