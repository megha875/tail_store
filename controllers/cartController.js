
const Cart = require('../models/Cart'); // Aapka Cart Model

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId })
                           .populate({
                             path: 'items.productId',
                             select: 'title price category image'
                           });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart };