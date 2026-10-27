const mongoose = require('mongoose');

const popularProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  description: { type: String, default: '' },
  stock: { type: Number, default: 10 },
<<<<<<< HEAD
  colors: { type: [String], default: [] },
  colorImages: [{ color: { type: String, required: true }, image: { type: String, required: true }, images: { type: [String], default: [] } }],
  sizes: { type: [String], default: [] },
=======
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
  isOnSale: { type: Boolean, default: false }
}, { timestamps: true, collection: 'popularproducts' });

module.exports = mongoose.models.PopularProduct ||
  mongoose.model('PopularProduct', popularProductSchema);
