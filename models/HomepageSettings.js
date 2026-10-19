const mongoose = require('mongoose');

const homepageSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'homepage' },
  latestProductsTitle: { type: String, trim: true, maxlength: 120, default: 'Latest Products' }
}, { timestamps: true, collection: 'homepagesettings' });

module.exports = mongoose.models.HomepageSettings ||
  mongoose.model('HomepageSettings', homepageSettingsSchema);
