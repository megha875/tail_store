const express = require('express');
const router = express.Router();
const Cart = require('./models/Cart');

// 1. Get Cart Data for User
router.get('/api/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        res.json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. Plus/Minus (+1 / -1) Quantity Update Route
router.put('/api/cart/update-quantity', async (req, res) => {
    try {
        const { userId, productId, delta } = req.body;

        let cart = await Cart.findOne({ userId: userId || 'guest_user' });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => String(item.productId) === String(productId));

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(delta);

            // Agar quantity 0 se kam/equal ho jaye toh item remove kar do
            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }

            await cart.save();
            return res.json({ success: true, message: 'Quantity updated in MongoDB', cart });
        }

        res.status(404).json({ success: false, message: 'Product cart me nahi mila' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// 3. Remove Single Product Route
router.delete('/api/cart/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId: userId || 'guest_user' });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => String(item.productId) !== String(productId));

        await cart.save();
        res.json({ success: true, message: 'Item MongoDB se delete ho gaya', cart });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;