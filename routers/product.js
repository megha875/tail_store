const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST: Add a new product with gallery images
router.post('/add-product', async (req, res) => {
  try {
    const { name, price, mainImage, galleryImages, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      mainImage,
      galleryImages, // Array of image URLs/paths
      description
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET: Fetch single product details by ID (including gallery images)
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;