// User Dashboard APIs (naye routes - purane routes ko touch nahi karte)
//   GET    /api/users/:userId/profile
//   GET    /api/users/:userId/addresses
//   POST   /api/users/:userId/addresses
//   DELETE /api/users/:userId/addresses/:addressId
//   GET    /api/orders/user/:userId
// Cart aur Wishlist ke liye pehle se bani APIs hi use hoti hain.
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Address = require('../models/Address');

const router = express.Router();
const isId = (v) => mongoose.Types.ObjectId.isValid(v);
const text = (v, max = 250) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const bad = (res, message, code = 400) => res.status(code).json({ success: false, message });

// Profile
router.get('/users/:userId/profile', async (req, res) => {
  try {
    if (!isId(req.params.userId)) return bad(res, 'Valid user ID required hai.');
    const user = await User.findById(req.params.userId).select('email createdAt').lean();
    if (!user) return bad(res, 'User nahi mila.', 404);
    return res.json({ success: true, user: { id: user._id, email: user.email, createdAt: user.createdAt } });
  } catch (err) {
    console.error('Profile fetch failed:', err);
    return bad(res, 'Profile load nahi ho saki.', 500);
  }
});

// My Orders (orders collection se, userId ke hisaab se)
router.get('/orders/user/:userId', async (req, res) => {
  try {
    const userId = text(req.params.userId, 200);
    if (!userId) return bad(res, 'Valid user ID required hai.');
    const Order = mongoose.models.Order;
    if (!Order) return bad(res, 'Order model ready nahi hai.', 500);
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(100).lean();
    return res.json({ success: true, orders });
  } catch (err) {
    console.error('Orders fetch failed:', err);
    return bad(res, 'Orders load nahi ho sake.', 500);
  }
});

// Saved Addresses - list
router.get('/users/:userId/addresses', async (req, res) => {
  try {
    if (!isId(req.params.userId)) return bad(res, 'Valid user ID required hai.');
    const addresses = await Address.find({ userId: req.params.userId }).sort({ isDefault: -1, createdAt: -1 }).lean();
    return res.json({ success: true, addresses });
  } catch (err) {
    console.error('Address list failed:', err);
    return bad(res, 'Addresses load nahi ho sake.', 500);
  }
});

// Saved Addresses - add
router.post('/users/:userId/addresses', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isId(userId) || !(await User.exists({ _id: userId }))) return bad(res, 'User nahi mila.', 404);

    const b = req.body || {};
    const data = {
      userId,
      title: text(b.title, 40) || 'Home',
      fullName: text(b.fullName, 100),
      phone: text(b.phone, 20),
      street: text(b.street, 250),
      city: text(b.city, 80),
      state: text(b.state, 80),
      pincode: text(b.pincode, 12)
    };
    if (!data.fullName || !data.street || !data.city || !data.state) {
      return bad(res, 'Name, street, city aur state zaroori hain.');
    }
    if (!/^\+?[0-9 -]{7,18}$/.test(data.phone)) return bad(res, 'Valid phone number daalein.');
    if (!/^[0-9A-Za-z -]{3,12}$/.test(data.pincode)) return bad(res, 'Valid pincode daalein.');

    const count = await Address.countDocuments({ userId });
    if (count >= 10) return bad(res, 'Maximum 10 addresses save kar sakte hain.');

    data.isDefault = count === 0 || b.isDefault === true;
    if (data.isDefault) await Address.updateMany({ userId }, { $set: { isDefault: false } });

    const address = await Address.create(data);
    return res.status(201).json({ success: true, message: 'Address save ho gaya.', address });
  } catch (err) {
    console.error('Address add failed:', err);
    return bad(res, 'Address save nahi ho saka.', 500);
  }
});

// Saved Addresses - delete
router.delete('/users/:userId/addresses/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!isId(userId) || !isId(addressId)) return bad(res, 'Valid IDs required hain.');
    const removed = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!removed) return bad(res, 'Address nahi mila.', 404);
    if (removed.isDefault) {
      const next = await Address.findOne({ userId }).sort({ createdAt: -1 });
      if (next) { next.isDefault = true; await next.save(); }
    }
    return res.json({ success: true, message: 'Address delete ho gaya.' });
  } catch (err) {
    console.error('Address delete failed:', err);
    return bad(res, 'Address delete nahi ho saka.', 500);
  }
});

module.exports = router;
