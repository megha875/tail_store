const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);