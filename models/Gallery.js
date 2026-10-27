const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['image', 'video'] // Sirf image ya video hi save ho sakega
  },
  url: { 
    type: String, 
    required: true // Backend ka file path ya URL
  },
  poster: { 
    type: String, // Video ke liye thumbnail image ka path (optional)
    default: ''
  },
  title: { 
    type: String, 
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);