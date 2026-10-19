const mongoose = require('mongoose');

// 1. Schema Definition
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },

    // Total shares tracking count
    shareCount: { type: Number, default: 0 },

    // Individual platform breakdown
    sharesByPlatform: {
        whatsapp: { type: Number, default: 0 },
        facebook: { type: Number, default: 0 },
        copyLink: { type: Number, default: 0 },
        gmail: { type: Number, default: 0 },
        sms: { type: Number, default: 0 },
        linkedin: { type: Number, default: 0 }
    }
}, { timestamps: true });

// 👇 IS LINE KO FILE KE SABSE AAKHRI ME WRITE/ADD KAREIN:
module.exports = mongoose.model('Product', productSchema);



// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product'); // Aapka Mongoose Model

// // Single Product Fetch API route by MongoDB _id
// router.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;




// // Isko apni server.js ya app.js file mein add karein
// app.get('/api/products/men', async (req, res) => {
//     try {
//         const menProducts = await Product.find({ 
//             category: { $in: ["Men", "men", "Mens", "mens"] } 
//         });
//         res.json(menProducts);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });



// routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// // GET /api/products/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

// Controller ko import karein
const { createProduct } = require('../controllers/productController');

// POST route banayein (Jaise: /api/products/create)
router.post('/create', createProduct);

module.exports = router;

