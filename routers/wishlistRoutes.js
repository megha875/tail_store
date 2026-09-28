// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const authMiddleware = require('../middleware/authMiddleware'); // path verify kar lein

// Toggle Wishlist
router.post('/toggle', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const existingWishlist = await Wishlist.findOne({ userId, productId });

    if (existingWishlist) {
      await Wishlist.findByIdAndDelete(existingWishlist._id);
      return res.json({ success: true, message: 'Removed from wishlist', isWishlisted: false });
    } else {
      const newWishlist = new Wishlist({ userId, productId });
      await newWishlist.save();
      return res.json({ success: true, message: 'Added to wishlist', isWishlisted: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get User Wishlist IDs
router.get('/user-ids', authMiddleware, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.user._id }).select('productId');
    const productIds = wishlists.map(item => item.productId);
    res.json({ success: true, wishlistProductIds: productIds });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;