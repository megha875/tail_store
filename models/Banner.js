const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  eyebrow: { type: String, trim: true, maxlength: 80, default: '' },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  image: { type: String, required: true, trim: true, maxlength: 2048 },
  link: { type: String, trim: true, maxlength: 2048, default: 'shop.html' },
  buttonText: { type: String, trim: true, maxlength: 40, default: 'SHOP NOW' },
  buttons: [{
    text: { type: String, trim: true, maxlength: 40 },
    link: { type: String, trim: true, maxlength: 2048 }
  }],
  placement: { type: String, enum: ['hero', 'promo', 'category'], default: 'hero' },
  order: { type: Number, min: 0, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true, collection: 'banners' });

module.exports = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
