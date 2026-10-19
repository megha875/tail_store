const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  platform: {
    type: String, // e.g., 'whatsapp', 'linkedin', 'facebook', 'copy_link'
    required: true
  },
  userId: {
    type: String,
    default: 'guest_user'
  },
  sharedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Share', shareSchema);