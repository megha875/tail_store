// routes/cartRoute.js
const express = require('express');
const router = express.Router();
const { getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Agar Auth/JWT use kar rahe hain

// GET Request mapping
router.get('/', authMiddleware, getCart);

module.exports = router;