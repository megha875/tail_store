const mongoose = require('mongoose');

const newsletterSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'homepage' },
  heading: { type: String, trim: true, maxlength: 120, default: 'Join our newsletter and' },
  offer: { type: String, trim: true, maxlength: 120, default: 'get $50 discount' },
  ending: { type: String, trim: true, maxlength: 120, default: 'for your first order' },
  placeholder: { type: String, trim: true, maxlength: 100, default: 'Enter your email address' },
  buttonText: { type: String, trim: true, maxlength: 40, default: 'Subscribe' }
}, { timestamps: true, collection: 'newslettersettings' });

module.exports = mongoose.models.NewsletterSettings ||
  mongoose.model('NewsletterSettings', newsletterSettingsSchema);
