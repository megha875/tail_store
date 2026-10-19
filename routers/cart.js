const express = require('express');
const router = express.Router();
const Cart = require('./models/Cart');

// 1. Get Cart Data for User
// GET /api/cart/:userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('items.productId'); // Isse productId ki jagah full Product object populate ho jayega

    if (!cart) {
      return res.status(404).json({ message: "Cart empty or not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { userId, productId, quantity, title, price, image } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Agar user ki cart nahi bani hui hai
      cart = new Cart({
        userId,
        items: [{ productId, quantity, title, price, image }]
      });
    } else {
      // Check karein product pehle se cart me hai ya nahi
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Agar product pehle se cart me hai -> Purani functionality ki tarah bas quantity badhayein
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Agar naya product hai -> Naye details ke sath array me push karein
        cart.items.push({ productId, quantity, title, price, image });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;