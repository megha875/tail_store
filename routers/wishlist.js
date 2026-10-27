app.post('/api/wishlist/toggle', async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id; // Logged in user ID

  // MongoDB / Mongoose Example
  const user = await User.findById(userId);
  const exists = user.wishlist.includes(productId);

  if (exists) {
    user.wishlist.pull(productId); // Remove
  } else {
    user.wishlist.push(productId); // Add
  }

  await user.save();
  res.json({ success: true, isWishlisted: !exists });
});