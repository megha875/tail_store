const mongoose = require('mongoose');

const popularProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  description: { type: String, default: '' },
  stock: { type: Number, default: 10 },
  isOnSale: { type: Boolean, default: false }
}, { timestamps: true, collection: 'popularproducts' });

module.exports = mongoose.models.PopularProduct ||
  mongoose.model('PopularProduct', popularProductSchema);
