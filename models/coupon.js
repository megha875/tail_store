const Coupon = require('./models/Coupon'); // Agar model banaya hai

app.post('/api/apply-coupon', async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(400).json({ success: false, message: 'Invalid Coupon Code' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ success: false, message: 'Coupon has expired' });
    }

    res.json({ 
      success: true, 
      discountPercentage: coupon.discountPercentage, 
      message: 'Coupon applied successfully!' 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});