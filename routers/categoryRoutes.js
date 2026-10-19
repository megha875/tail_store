const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Helper to generate a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

// GET: Fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('parent', 'name');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST: Create a new category
router.post('/', async (req, res) => {
  try {
    const { name, parent } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const slug = slugify(name);

    // Check if category already exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const newCategory = new Category({
      name,
      slug,
      parent: parent || null,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating category' });
  }
});

module.exports = router;