// Express Order Route Example
app.post('/api/orders/create', async (req, res) => {
  try {
    const { userId, shippingDetails, paymentMethod } = req.body;

    // Database (MongoDB) me save karne ka logic
    const newOrder = new Order({
      userId,
      shippingDetails,
      paymentMethod,
      createdAt: new Date()
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    console.error('Database Save Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save order in database' });
  }
});

if (response.ok) {
  // Database se aane wali order details se ID lein
  const createdOrder = data.order || data; 
  const orderId = createdOrder._id || createdOrder.orderId;

  // Order ID URL ke sath redirect karein
  window.location.href = `order-success.html?orderId=${orderId}`;
}