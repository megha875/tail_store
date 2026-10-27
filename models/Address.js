const mongoose = require('mongoose');

// Dashboard ke "Saved Addresses" ke liye (MongoDB: addresses collection)
const addressSchema = new mongoose.Schema({
  userId:    { type: String, required: true, index: true },
  title:     { type: String, default: 'Home', trim: true, maxlength: 40 },
  fullName:  { type: String, required: true, trim: true, maxlength: 100 },
  phone:     { type: String, required: true, trim: true, maxlength: 20 },
  street:    { type: String, required: true, trim: true, maxlength: 250 },
  city:      { type: String, required: true, trim: true, maxlength: 80 },
  state:     { type: String, required: true, trim: true, maxlength: 80 },
  pincode:   { type: String, required: true, trim: true, maxlength: 12 },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Address || mongoose.model('Address', addressSchema);
