const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    enquiry: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);