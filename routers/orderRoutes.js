// // Example backend route
// router.get('/orders', async (req, res) => {
//   try {
//     // Database se orders fetch karne ka logic
//     const orders = await Order.find({ userId: req.user.id });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// Get Orders Route
// router.get('/orders', async (req, res) => {
//   try {
//     // Agar aap req.user ya session se userId le rahe hain:
//     // (Agar localStorage ya req.query se aa raha hai toh us hisaab se adjust karein)
//     const userId = req.query.userId || req.user?.id; 

//     // MongoDB se is userId ke saare orders nikalen
//     const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });





router.get('/orders/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Sirf is userId ke orders filter honge
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});