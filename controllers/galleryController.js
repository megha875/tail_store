const express = require('express');
const router = express.Router();

// Sample Database/Array (Aap isse MongoDB se bhi fetch kar sakte hain)
const galleryData = [
  { id: 1, type: 'image', url: 'https://example.com/images/prod1.jpg', title: 'Product 1' },
  { id: 2, type: 'video', url: 'http://localhost:5000/uploads/product-demo.mp4', poster: 'https://example.com/images/thumb1.jpg', title: 'Demo Video' },
  { id: 3, type: 'image', url: 'https://example.com/images/prod2.jpg', title: 'Product 2' }
];

// API Endpoint
router.get('/api/gallery', (req, res) => {
  try {
    res.status(200).json({ success: true, data: galleryData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;