const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// 1. GET: Saari images aur videos fetch karne ke liye
router.get('/gallery', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 }); // Naye items pehle dikhenge
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// 2. POST: MongoDB mein naya video ya image path add karne ke liye
router.post('/gallery', async (req, res) => {
  try {
    const { type, url, poster, title } = req.body;

    // Validation
    if (!type || !url) {
      return res.status(400).json({ success: false, message: 'Type and URL are required!' });
    }

    const newItem = new Gallery({
      type,
      url,
      poster: poster || '',
      title: title || ''
    });

    const savedItem = await newItem.save();
    res.status(201).json({ success: true, message: 'Media added successfully!', data: savedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add media', error: error.message });
  }
});

module.exports = router;