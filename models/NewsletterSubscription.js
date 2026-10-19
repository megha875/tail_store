const mongoose = require('mongoose');

const newsletterSubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'newslettersubscribers' });

module.exports = mongoose.models.NewsletterSubscription ||
  mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);
