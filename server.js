
// require('dotenv').config(); // Load environment variables
//  const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');
// const crypto = require('crypto');

// const Product = require('./models/Product');
// const Cart = require('./models/Cart');

// const app = express();

// // --- MIDDLEWARES ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// // --- MONGO DB CONNECTION ---
// // const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

// const MONGO_URI = process.env.MONGO_URI;  

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB Atlas Connected Successfully!'))
//   .catch(err => console.error('DB Connection Error:', err));


// // --- MONGOOSE SCHEMAS & MODELS ---

// // 1. USER SCHEMA (Register / Login ke liye)
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// // 2. ORDER SCHEMA
// const orderSchema = new mongoose.Schema({
//   userId: { type: String, default: 'guest_user' },
//   customer: {
//     fullName: String,
//     email: String,
//     phone: String,
//     deliveryAddress: String
//   },
//   items: Array,
//   totalAmount: Number,
//   paymentMethod: String, // 'COD' ya 'Online'
//   paymentStatus: { type: String, default: 'Pending' }, // 'Pending', 'Paid', 'Failed'
//   transactionId: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// // 3. WISHLIST SCHEMA
// const wishlistSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   products: [{ type: String }] // Array of product IDs
// });

// const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);


// // --- ROOT ROUTES (HTML Pages) ---
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/home.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });


// // --- AUTHENTICATION ROUTES (Register & Login) ---

// // 1. POST: Register User
// app.post('/api/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email aur Password dono zaroori hain!' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'Yeh email pehle se registered hai!' });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();

//     res.status(201).json({
//       success: true,
//       message: 'Registration successful! Data MongoDB me save ho gaya.',
//       user: { id: newUser._id, email: newUser.email }
//     });
//   } catch (err) {
//     console.error('Register Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 2. POST: Login User
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email aur Password zaroori hain!' });
//     }

//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid Email ya Password!' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Login successful!',
//       user: { id: user._id, email: user.email }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- PRODUCT ROUTES ---

// // 1. GET: Saare Live Products DB se Fetch karne ke liye
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ _id: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. GET: Single Product ID se Fetch karne ke liye
// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Database error", message: error.message });
//   }
// });

// // 3. POST: Naya Single Product Add karne ke liye
// app.post('/api/products/add', async (req, res) => {
//   try {
//     const { name, price, category, image, description, stock } = req.body;

//     if (!name || !price || !category || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, price, category aur image required hain.'
//       });
//     }

//     const newProduct = new Product({
//       name,
//       price: Number(price),
//       category,
//       image,
//       description: description || '',
//       stock: stock !== undefined ? Number(stock) : 10
//     });

//     await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: 'Product successfully MongoDB mein add ho gaya!',
//       product: newProduct
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- CART ROUTES ---

// // 1. GET: Fetch Cart Data
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate('items.productId');
//     res.json(cart || { userId, items: [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. POST: Add item to Cart
// app.post('/api/cart/add', async (req, res) => {
//   const { userId = 'guest_user', productId, quantity = 1 } = req.body;

//   if (!productId) {
//     return res.status(400).json({ error: 'productId is required' });
//   }

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += Number(quantity);
//     } else {
//       cart.items.push({ productId, quantity: Number(quantity) });
//     }

//     await cart.save();
//     const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//     res.status(200).json({
//       success: true,
//       message: 'Product cart me add ho gaya!',
//       totalItems,
//       cart
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3. PUT: Update Quantity
// app.put('/api/cart/update', async (req, res) => {
//   const { userId = 'guest_user', productId, action } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: 'Cart not found' });

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       if (action === 'increase') {
//         cart.items[itemIndex].quantity += 1;
//       } else if (action === 'decrease') {
//         cart.items[itemIndex].quantity -= 1;
//         if (cart.items[itemIndex].quantity <= 0) {
//           cart.items.splice(itemIndex, 1);
//         }
//       }
//       await cart.save();
//     }

//     res.json({ success: true, cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 4. DELETE: Remove Single Item from Cart
// app.delete('/api/cart/remove', async (req, res) => {
//   const { userId = 'guest_user', productId } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (cart) {
//       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//       await cart.save();
//     }
//     res.json({ success: true, message: 'Item removed', cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 5. DELETE: Clear entire Cart
// app.delete('/api/cart/clear', async (req, res) => {
//   const { userId = 'guest_user' } = req.body || req.query;
//   try {
//     await Cart.findOneAndUpdate({ userId }, { items: [] });
//     res.json({ success: true, message: 'Cart cleared successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // --- ORDER & PAYMENT ROUTES ---

// // 1. POST: Place Order & Update Stock
// app.post('/api/orders/place', async (req, res) => {
//   try {
//     const { userId = 'guest_user', customer, items, totalAmount, paymentMethod, transactionId } = req.body;

//     const newOrder = new Order({
//       userId,
//       customer,
//       items,
//       totalAmount,
//       paymentMethod,
//       paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
//       transactionId: transactionId || null
//     });

//     await newOrder.save();

//     // Inventory Update
//     for (let item of items) {
//       const prodId = item.productId?._id || item.productId;
//       if (prodId) {
//         await Product.findByIdAndUpdate(prodId, {
//           $inc: { stock: -item.quantity }
//         });
//       }
//     }

//     // Clear Cart
//     await Cart.findOneAndUpdate({ userId }, { items: [] });

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully!',
//       orderId: newOrder._id
//     });
//   } catch (err) {
//     console.error('Order Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 2. GET: Order by ID
// app.get("/api/orders/:orderId", async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findById(orderId) || await Order.findOne({ transactionId: orderId });

//     if (!order) {
//       return res.status(404).json({ status: "error", message: "Order nahi mila!" });
//     }

//     res.status(200).json({ status: "success", order });
//   } catch (error) {
//     console.error("Order Fetch Error:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// // 3. POST: Razorpay Webhook Verification
// const WEBHOOK_SECRET = "MY_SUPER_SECRET_KEY_123";

// app.post('/api/razorpay-webhook', (req, res) => {
//   const razorpaySignature = req.headers['x-razorpay-signature'];

//   const generatedSignature = crypto
//     .createHmac('sha256', WEBHOOK_SECRET)
//     .update(JSON.stringify(req.body))
//     .digest('hex');

//   if (razorpaySignature === generatedSignature) {
//     console.log("✅ Authenticated Webhook Event!");

//     const event = req.body.event;

//     if (event === 'payment.captured') {
//       const paymentInfo = req.body.payload.payment.entity;
//       console.log("Payment Verified ID:", paymentInfo.id);
//       console.log("Amount:", paymentInfo.amount / 100);
//     }

//     res.status(200).json({ status: 'ok' });
//   } else {
//     console.log("❌ Invalid Signature Detected!");
//     res.status(400).send('Invalid Signature');
//   }
// });


// // --- WISHLIST ROUTES ---

// app.post('/api/wishlist', async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     if (!userId || !productId) {
//       return res.status(400).json({ success: false, message: 'UserId aur ProductId required hain!' });
//     }

//     let wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ userId, products: [productId] });
//     } else {
//       const index = wishlist.products.indexOf(productId);
//       if (index > -1) {
//         wishlist.products.splice(index, 1);
//       } else {
//         wishlist.products.push(productId);
//       }
//     }

//     await wishlist.save();
//     return res.status(200).json({ success: true, message: 'Wishlist update ho gayi!', wishlist });
//   } catch (err) {
//     console.error('Wishlist Error:', err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- SERVER START ---
// const PORT = 5500;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// app.use(express.urlencoded({ extended: true }));


// // ==========================================
// // CART ROUTES
// // ==========================================

// // 1. GET Cart Route (Updated with Populate)
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate({
//       path: 'items.productId',
//       select: 'name price image category stock' // Product collection se yeh fields fetch hongi
//     });

//     res.json(cart || { userId, items: [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. Add to Cart Route
// app.post('/api/cart/add', async (req, res) => {
//   // Baaki apka post cart code...
// });


// // Express GET Cart Route (Safe against null populated items)
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate({
//       path: 'items.productId',
//       select: 'name price image category stock'
//     });

//     if (!cart) {
//       return res.json({ userId, items: [] });
//     }

//     // Filter out items whose product was deleted from DB (where productId became null)
//     const validItems = cart.items.filter(item => item.productId !== null);

//     res.json({
//       _id: cart._id,
//       userId: cart.userId,
//       items: validItems
//     });
//   } catch (err) {
//     console.error("Cart Fetch Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });








// app.post('/api/cart/add', async (req, res) => {
//   const { userId = 'guest_user', productId, quantity = 1 } = req.body;

//   if (!productId) {
//     return res.status(400).json({ error: 'productId is required' });
//   }

//   try {
//     // 1. Fetch details from Product collection
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       // Update existing item quantity
//       cart.items[itemIndex].quantity += Number(quantity);
//     } else {
//       // Add new item with product details included
//       cart.items.push({
//         productId,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: Number(quantity)
//       });
//     }

//     await cart.save();
//     const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//     res.status(200).json({
//       success: true,
//       message: 'Product added to cart!',
//       totalItems,
//       cart
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// require('dotenv').config(); // Load environment variables
//  const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');
// const crypto = require('crypto');

// const Product = require('./models/Product');
// const Cart = require('./models/Cart');

// const app = express();

// // --- MIDDLEWARES ---
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// // --- MONGO DB CONNECTION ---
// // const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

// const MONGO_URI = process.env.MONGO_URI;  

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB Atlas Connected Successfully!'))
//   .catch(err => console.error('DB Connection Error:', err));


// // --- MONGOOSE SCHEMAS & MODELS ---

// // 1. USER SCHEMA (Register / Login ke liye)
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// // 2. ORDER SCHEMA
// const orderSchema = new mongoose.Schema({
//   userId: { type: String, default: 'guest_user' },
//   customer: {
//     fullName: String,
//     email: String,
//     phone: String,
//     deliveryAddress: String
//   },
//   items: Array,
//   totalAmount: Number,
//   paymentMethod: String, // 'COD' ya 'Online'
//   paymentStatus: { type: String, default: 'Pending' }, // 'Pending', 'Paid', 'Failed'
//   transactionId: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// // 3. WISHLIST SCHEMA
// const wishlistSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   products: [{ type: String }] // Array of product IDs
// });

// const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);


// // --- ROOT ROUTES (HTML Pages) ---
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/home.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });


// // --- AUTHENTICATION ROUTES (Register & Login) ---

// // 1. POST: Register User
// app.post('/api/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email aur Password dono zaroori hain!' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'Yeh email pehle se registered hai!' });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();

//     res.status(201).json({
//       success: true,
//       message: 'Registration successful! Data MongoDB me save ho gaya.',
//       user: { id: newUser._id, email: newUser.email }
//     });
//   } catch (err) {
//     console.error('Register Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 2. POST: Login User
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email aur Password zaroori hain!' });
//     }

//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid Email ya Password!' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Login successful!',
//       user: { id: user._id, email: user.email }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- PRODUCT ROUTES ---

// // 1. GET: Saare Live Products DB se Fetch karne ke liye
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ _id: -1 });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. GET: Single Product ID se Fetch karne ke liye
// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Database error", message: error.message });
//   }
// });

// // 3. POST: Naya Single Product Add karne ke liye
// app.post('/api/products/add', async (req, res) => {
//   try {
//     const { name, price, category, image, description, stock } = req.body;

//     if (!name || !price || !category || !image) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, price, category aur image required hain.'
//       });
//     }

//     const newProduct = new Product({
//       name,
//       price: Number(price),
//       category,
//       image,
//       description: description || '',
//       stock: stock !== undefined ? Number(stock) : 10
//     });

//     await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: 'Product successfully MongoDB mein add ho gaya!',
//       product: newProduct
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- CART ROUTES ---

// // 1. GET: Fetch Cart Data
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate('items.productId');
//     res.json(cart || { userId, items: [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. POST: Add item to Cart
// app.post('/api/cart/add', async (req, res) => {
//   const { userId = 'guest_user', productId, quantity = 1 } = req.body;

//   if (!productId) {
//     return res.status(400).json({ error: 'productId is required' });
//   }

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += Number(quantity);
//     } else {
//       cart.items.push({ productId, quantity: Number(quantity) });
//     }

//     await cart.save();
//     const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//     res.status(200).json({
//       success: true,
//       message: 'Product cart me add ho gaya!',
//       totalItems,
//       cart
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 3. PUT: Update Quantity
// app.put('/api/cart/update', async (req, res) => {
//   const { userId = 'guest_user', productId, action } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: 'Cart not found' });

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       if (action === 'increase') {
//         cart.items[itemIndex].quantity += 1;
//       } else if (action === 'decrease') {
//         cart.items[itemIndex].quantity -= 1;
//         if (cart.items[itemIndex].quantity <= 0) {
//           cart.items.splice(itemIndex, 1);
//         }
//       }
//       await cart.save();
//     }

//     res.json({ success: true, cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 4. DELETE: Remove Single Item from Cart
// app.delete('/api/cart/remove', async (req, res) => {
//   const { userId = 'guest_user', productId } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (cart) {
//       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//       await cart.save();
//     }
//     res.json({ success: true, message: 'Item removed', cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 5. DELETE: Clear entire Cart
// app.delete('/api/cart/clear', async (req, res) => {
//   const { userId = 'guest_user' } = req.body || req.query;
//   try {
//     await Cart.findOneAndUpdate({ userId }, { items: [] });
//     res.json({ success: true, message: 'Cart cleared successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // --- ORDER & PAYMENT ROUTES ---

// // 1. POST: Place Order & Update Stock
// app.post('/api/orders/place', async (req, res) => {
//   try {
//     const { userId = 'guest_user', customer, items, totalAmount, paymentMethod, transactionId } = req.body;

//     const newOrder = new Order({
//       userId,
//       customer,
//       items,
//       totalAmount,
//       paymentMethod,
//       paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
//       transactionId: transactionId || null
//     });

//     await newOrder.save();

//     // Inventory Update
//     for (let item of items) {
//       const prodId = item.productId?._id || item.productId;
//       if (prodId) {
//         await Product.findByIdAndUpdate(prodId, {
//           $inc: { stock: -item.quantity }
//         });
//       }
//     }

//     // Clear Cart
//     await Cart.findOneAndUpdate({ userId }, { items: [] });

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully!',
//       orderId: newOrder._id
//     });
//   } catch (err) {
//     console.error('Order Error:', err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 2. GET: Order by ID
// app.get("/api/orders/:orderId", async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findById(orderId) || await Order.findOne({ transactionId: orderId });

//     if (!order) {
//       return res.status(404).json({ status: "error", message: "Order nahi mila!" });
//     }

//     res.status(200).json({ status: "success", order });
//   } catch (error) {
//     console.error("Order Fetch Error:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

// // 3. POST: Razorpay Webhook Verification
// const WEBHOOK_SECRET = "MY_SUPER_SECRET_KEY_123";

// app.post('/api/razorpay-webhook', (req, res) => {
//   const razorpaySignature = req.headers['x-razorpay-signature'];

//   const generatedSignature = crypto
//     .createHmac('sha256', WEBHOOK_SECRET)
//     .update(JSON.stringify(req.body))
//     .digest('hex');

//   if (razorpaySignature === generatedSignature) {
//     console.log("✅ Authenticated Webhook Event!");

//     const event = req.body.event;

//     if (event === 'payment.captured') {
//       const paymentInfo = req.body.payload.payment.entity;
//       console.log("Payment Verified ID:", paymentInfo.id);
//       console.log("Amount:", paymentInfo.amount / 100);
//     }

//     res.status(200).json({ status: 'ok' });
//   } else {
//     console.log("❌ Invalid Signature Detected!");
//     res.status(400).send('Invalid Signature');
//   }
// });


// // --- WISHLIST ROUTES ---

// app.post('/api/wishlist', async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     if (!userId || !productId) {
//       return res.status(400).json({ success: false, message: 'UserId aur ProductId required hain!' });
//     }

//     let wishlist = await Wishlist.findOne({ userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ userId, products: [productId] });
//     } else {
//       const index = wishlist.products.indexOf(productId);
//       if (index > -1) {
//         wishlist.products.splice(index, 1);
//       } else {
//         wishlist.products.push(productId);
//       }
//     }

//     await wishlist.save();
//     return res.status(200).json({ success: true, message: 'Wishlist update ho gayi!', wishlist });
//   } catch (err) {
//     console.error('Wishlist Error:', err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// });


// // --- SERVER START ---
// const PORT = 5500;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// app.use(express.urlencoded({ extended: true }));


// // ==========================================
// // CART ROUTES
// // ==========================================

// // 1. GET Cart Route (Updated with Populate)
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate({
//       path: 'items.productId',
//       select: 'name price image category stock' // Product collection se yeh fields fetch hongi
//     });

//     res.json(cart || { userId, items: [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 2. Add to Cart Route
// app.post('/api/cart/add', async (req, res) => {
//   // Baaki apka post cart code...
// });


// // Express GET Cart Route (Safe against null populated items)
// app.get('/api/cart', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     const cart = await Cart.findOne({ userId }).populate({
//       path: 'items.productId',
//       select: 'name price image category stock'
//     });

//     if (!cart) {
//       return res.json({ userId, items: [] });
//     }

//     // Filter out items whose product was deleted from DB (where productId became null)
//     const validItems = cart.items.filter(item => item.productId !== null);

//     res.json({
//       _id: cart._id,
//       userId: cart.userId,
//       items: validItems
//     });
//   } catch (err) {
//     console.error("Cart Fetch Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });








// app.post('/api/cart/add', async (req, res) => {
//   const { userId = 'guest_user', productId, quantity = 1 } = req.body;

//   if (!productId) {
//     return res.status(400).json({ error: 'productId is required' });
//   }

//   try {
//     // 1. Fetch details from Product collection
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       // Update existing item quantity
//       cart.items[itemIndex].quantity += Number(quantity);
//     } else {
//       // Add new item with product details included
//       cart.items.push({
//         productId,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: Number(quantity)
//       });
//     }

//     await cart.save();
//     const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//     res.status(200).json({
//       success: true,
//       message: 'Product added to cart!',
//       totalItems,
//       cart
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

require('dotenv').config(); // Load environment variables
 const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Product = require('./models/Product');
const PopularProduct = require('./models/PopularProduct');
const Cart = require('./models/Cart');
const ShareProduct = require('./models/Product');
const Category = require('./models/Category');
const Contact = require('./models/Contact');
const Banner = require('./models/Banner');
const NewsletterSettings = require('./models/NewsletterSettings');
const NewsletterSubscription = require('./models/NewsletterSubscription');
const HomepageSettings = require('./models/HomepageSettings');
const Share = require('./models/Share');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

// --- MIDDLEWARES ---

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.json());
// --- MONGO DB CONNECTION ---
// const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

const MONGO_URI = process.env.MONGO_URI;  

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully!'))
  .catch(err => console.error('DB Connection Error:', err));


// --- MONGOOSE SCHEMAS & MODELS ---

// 2. ORDER SCHEMA
const orderSchema = new mongoose.Schema({
  userId: { type: String, default: 'guest_user' },
  customer: {
    fullName: String,
    email: String,
    phone: String,
    deliveryAddress: String
  },
  items: Array,
  totalAmount: Number,
  paymentMethod: String, // 'COD' ya 'Online'
  paymentStatus: { type: String, default: 'Pending' }, // 'Pending', 'Paid', 'Failed'
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// 3. WISHLIST SCHEMA
const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{ type: String }] // Array of product IDs
});

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

// Save the main image first so it is always the product's primary thumbnail.
async function createProduct(req, res) {
  try {
    const { name, price, category, image, images, description, stock } = req.body;
    const isLatest = req.body.isLatest === undefined ? true : req.body.isLatest === true;
    const isPopular = req.body.isPopular === true;
    const isOnSale = req.body.isOnSale === true;
    const productName = typeof name === 'string' ? name.trim() : '';
    const productCategory = typeof category === 'string' ? category.trim() : '';
    const mainImage = typeof image === 'string' ? image.trim() : '';
    const numericPrice = Number(price);
    const numericStock = stock === undefined || stock === '' ? 10 : Number(stock);

    if (!productName || !productCategory || !mainImage || price === undefined || price === null || price === '' ||
        !Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, valid price, category aur main image required hain.'
      });
    }

    if (stock === null || !Number.isInteger(numericStock) || numericStock < 0) {
      return res.status(400).json({ success: false, message: 'Stock valid non-negative number hona chahiye.' });
    }

    if ((req.body.isLatest !== undefined && typeof req.body.isLatest !== 'boolean') ||
        (req.body.isPopular !== undefined && typeof req.body.isPopular !== 'boolean') ||
        (req.body.isOnSale !== undefined && typeof req.body.isOnSale !== 'boolean')) {
      return res.status(400).json({ success: false, message: 'Latest, Popular aur Sale selections boolean honi chahiye.' });
    }

    if (!isLatest && !isPopular && !isOnSale) {
      return res.status(400).json({ success: false, message: 'Product ko Latest, Popular, ya Sale mein add karne ke liye kam se kam ek section select karein.' });
    }

    let galleryImages = [];
    if (Array.isArray(images)) {
      galleryImages = images;
    } else if (typeof images === 'string') {
      galleryImages = images.split(',');
    } else if (images !== undefined && images !== null) {
      return res.status(400).json({ success: false, message: 'Gallery images array ya comma-separated URLs honi chahiye.' });
    }

    if (galleryImages.some((url) => typeof url !== 'string')) {
      return res.status(400).json({ success: false, message: 'Har gallery image ek valid URL string honi chahiye.' });
    }

    const productImages = [...new Set([
      mainImage,
      ...galleryImages.map((url) => url.trim()).filter(Boolean)
    ])];
    const product = new Product({
      name: productName,
      price: numericPrice,
      category: productCategory,
      image: mainImage,
      images: productImages,
      description: typeof description === 'string' ? description.trim() : '',
      stock: numericStock,
      isLatest,
      isOnSale
    });

    await product.save();

    if (isPopular) {
      try {
        await PopularProduct.create({
          _id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          images: product.images,
          description: product.description,
          stock: product.stock,
          isOnSale: product.isOnSale
        });
      } catch (error) {
        try {
          await Product.deleteOne({ _id: product._id });
        } catch (rollbackError) {
          console.error(`Could not roll back product ${product._id} after Popular save failed:`, rollbackError);
          throw new Error(`Popular Products mein save nahi hua; product ${product._id} Latest Products mein reh gaya.`);
        }
        throw error;
      }
    }

    const sections = [
      ...(isLatest ? ['Latest Products'] : []),
      ...(isPopular ? ['Popular Products'] : []),
      ...(isOnSale ? ['Sale'] : [])
    ];
    return res.status(201).json({
      success: true,
      message: `Product ${sections.join(' aur ')} mein add ho gaya!`,
      product
    });
  } catch (error) {
    console.error('Error saving product:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

app.post('/products', createProduct);
// --- ROOT ROUTES (HTML Pages) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// --- AUTHENTICATION ROUTES (Register & Login) ---

// 1. POST: Register User
app.post('/api/register', async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email aur password zaroori hain.' });
    }
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ success: false, message: 'Password 8 se 128 characters ka hona chahiye.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database abhi connect nahi hai. Thodi der baad try karein.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Yeh email pehle se registered hai.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Aapka account MongoDB mein save ho gaya.',
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('Register Error:', err);
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Yeh email pehle se registered hai.' });
    }
    return res.status(500).json({ success: false, message: 'Registration save nahi ho saka. Server logs check karein.' });
  }
});

// 2. POST: Login User
app.post('/api/login', async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email aur password zaroori hain.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database abhi connect nahi hai. Thodi der baad try karein.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email ya password galat hai.' });
    }

    const isHashedPassword = /^\$2[aby]\$/.test(user.password);
    const passwordMatches = isHashedPassword
      ? await bcrypt.compare(password, user.password)
      : password === user.password;
    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Email ya password galat hai.' });
    }

    if (!isHashedPassword) {
      user.password = await bcrypt.hash(password, 12);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: 'Login nahi ho saka. Server logs check karein.' });
  }
});


// --- PRODUCT ROUTES ---

// 1. GET: Products fetch karne ke liye (optional ?category=men / women / accessories / all)
const escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

app.get('/api/products', async (req, res) => {
  try {
    const includeAll = req.query.includeAll === 'true';
    let filter = includeAll ? {} : { isLatest: { $ne: false } };
    const catKey = (req.query.category || '').trim();
    const collection = req.query.collection;

    if (collection !== undefined && !['shop', 'new-arrivals', 'sale'].includes(collection)) {
      return res.status(400).json({ success: false, message: 'Collection must be shop, new-arrivals, or sale.' });
    }
    if (collection === 'new-arrivals') {
      filter = { ...filter, isLatest: { $ne: false } };
    } else if (collection === 'sale') {
      filter = { ...filter, isOnSale: true };
    }

    if (catKey && catKey.toLowerCase() !== 'all') {
      // Category collection me slug ya name se dhoondho (agar hai)
      const categoryDoc = await Category.findOne({
        $or: [
          { slug: catKey.toLowerCase() },
          { name: new RegExp('^' + escapeRegex(catKey) + '$', 'i') }
        ]
      });

      // Product.category String hai -> case-insensitive match (Men / men / MEN sab chalenge)
      const matchers = [new RegExp('^' + escapeRegex(catKey) + '$', 'i')];
      if (categoryDoc) {
        matchers.push(new RegExp('^' + escapeRegex(categoryDoc.name) + '$', 'i'));
        matchers.push(new RegExp('^' + escapeRegex(categoryDoc.slug) + '$', 'i'));
        matchers.push(String(categoryDoc._id));
      }
      filter = { ...filter, category: { $in: matchers } };
    }

    const sort = collection === 'new-arrivals'
      ? { createdAt: -1, _id: -1 }
      : { _id: -1 };
    const products = await Product.find(filter).sort(sort);
    res.json(products);
  } catch (err) {
    console.error('Products error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/popular', async (req, res) => {
  try {
    const popularProducts = await PopularProduct.find({
      name: { $exists: true, $ne: '' },
      image: { $exists: true, $ne: '' }
    }).sort({ createdAt: -1 }).lean();
    res.json(popularProducts.filter((product) => product.name && product.image));
  } catch (error) {
    console.error('Popular products error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const defaultBanners = [
  {
    eyebrow: 'New Season Collection',
    title: 'ELEVATE YOUR STYLE',
    description: 'Discover the latest trends in luxury fashion and handcrafted accessories.',
    image: './assets/img/2.png',
    link: 'shop.html',
    buttonText: 'SHOP NOW',
    placement: 'hero',
    order: 1
  },
  {
    eyebrow: 'Everyday Style',
    title: 'MAKE EVERY MOMENT YOURS',
    description: 'Find the pieces that make your personal style stand out.',
    image: './assets/img/5.jpg',
    link: 'shop.html',
    buttonText: 'EXPLORE NOW',
    placement: 'hero',
    order: 2
  },
  {
    eyebrow: 'Timeless Fashion',
    title: 'A LOOK THAT FEELS LIKE YOU',
    description: 'Refresh your wardrobe with new-season favorites.',
    image: './assets/img/2.png',
    link: 'shop.html',
    buttonText: 'SHOP NOW',
    placement: 'hero',
    order: 3
  },
  {
    eyebrow: 'Curated For You',
    title: 'DISCOVER YOUR NEXT FAVORITE',
    description: 'Explore standout styles made for every day.',
    image: './assets/img/5.jpg',
    link: 'shop.html',
    buttonText: 'DISCOVER MORE',
    placement: 'hero',
    order: 4
  },
  {
    eyebrow: 'TailStore Collection',
    title: 'YOUR STYLE, YOUR STORY',
    description: 'Bring your look together with the latest fashion and accessories.',
    image: './assets/img/5.jpg',
    link: 'shop.html',
    buttonText: 'SHOP NOW',
    placement: 'hero',
    order: 5
  }
];

const defaultPromoBanner = {
  eyebrow: '',
  title: 'Welcome to Our Shop',
  description: '',
  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
  link: 'shop.html',
  buttonText: 'Shop Now',
  buttons: [{ text: 'Shop Now', link: 'shop.html?collection=shop' }],
  placement: 'promo',
  order: 0
};

const defaultCategoryBanners = [
  {
    title: 'Men',
    image: './assets/img/men.jpg',
    link: 'men.html',
    buttonText: 'Shop now',
    buttons: [{ text: 'Shop now', link: 'men.html' }],
    placement: 'category',
    order: 1
  },
  {
    title: 'Women',
    image: './assets/img/4.jpg',
    link: 'women.html',
    buttonText: 'Shop now',
    buttons: [{ text: 'Shop now', link: 'women.html' }],
    placement: 'category',
    order: 2
  },
  {
    title: 'Accessories',
    image: './assets/img/3.jpg',
    link: 'accessories.html',
    buttonText: 'Shop now',
    buttons: [{ text: 'Shop now', link: 'accessories.html' }],
    placement: 'category',
    order: 3
  }
];

app.get('/api/banners', async (req, res) => {
  try {
    const placement = req.query.placement || 'hero';
    if (typeof placement !== 'string' || !['hero', 'promo', 'category'].includes(placement)) {
      return res.status(400).json({ success: false, message: 'Banner placement must be hero, promo, or category.' });
    }

    const bannerFilter = placement === 'hero'
      ? { active: true, $or: [{ placement: 'hero' }, { placement: { $exists: false } }] }
      : { active: true, placement };
    const bannerSort = placement === 'category'
      ? { order: 1, createdAt: 1 }
      : placement === 'promo'
      ? { order: 1, createdAt: -1 }
      : { order: 1, createdAt: 1 };
    let banners = await Banner.find(bannerFilter).sort(bannerSort).lean();
    if (banners.length === 0) {
      if (placement === 'promo') {
        await Banner.create(defaultPromoBanner);
      } else if (placement === 'category') {
        await Banner.insertMany(defaultCategoryBanners);
      } else {
        await Banner.insertMany(defaultBanners);
      }
      banners = await Banner.find(bannerFilter).sort(bannerSort).lean();
    }
    return res.json(banners);
  } catch (error) {
    console.error('Banner fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Could not load homepage banners.' });
  }
});

app.post('/api/banners', async (req, res) => {
  const {
    eyebrow = '',
    title,
    description = '',
    image,
    link = 'shop.html',
    buttonText = 'SHOP NOW',
    buttons: requestedButtons,
    placement = 'hero',
    order
  } = req.body || {};

  if (typeof title !== 'string' || !title.trim() ||
      typeof image !== 'string' || !image.trim()) {
    return res.status(400).json({ success: false, message: 'Banner title and image URL/path are required.' });
  }
  if ([eyebrow, description, image, link, buttonText].some(value => typeof value !== 'string')) {
    return res.status(400).json({ success: false, message: 'Banner fields must be text.' });
  }
  if (!['hero', 'promo', 'category'].includes(placement)) {
    return res.status(400).json({ success: false, message: 'Banner placement must be hero, promo, or category.' });
  }
  const buttons = requestedButtons === undefined
    ? [{ text: buttonText.trim(), link: link.trim() }]
    : requestedButtons;
  if (!Array.isArray(buttons) || buttons.length > 3 || buttons.some(button =>
    !button || typeof button.text !== 'string' || typeof button.link !== 'string' ||
    !button.text.trim() || button.text.trim().length > 40
  )) {
    return res.status(400).json({ success: false, message: 'Provide up to three valid banner buttons.' });
  }
  const bannerLink = link.trim();
  const isSafeLink = value => !value ||
    /^https?:\/\/[^\s]+$/i.test(value) ||
    /^(\/|\.\/)[\w./?&=#%-]*$/.test(value) ||
    /^[\w-][\w./?&=#%-]*$/.test(value);
  const safeBannerLink = isSafeLink(bannerLink);
  const safeBannerImage = /^https?:\/\/[^\s]+$/i.test(image.trim()) ||
    /^(\/|\.\/)[\w./?&=#%-]*$/.test(image.trim()) ||
    /^[\w-][\w./?&=#%-]*$/.test(image.trim());
  if (!safeBannerLink || buttons.some(button => !isSafeLink(button.link.trim()))) {
    return res.status(400).json({ success: false, message: 'Please provide a valid banner link.' });
  }
  if (!safeBannerImage) {
    return res.status(400).json({ success: false, message: 'Please provide a valid banner image URL or path.' });
  }
  const bannerOrder = order === undefined || order === '' ? 0 : Number(order);
  if (!Number.isInteger(bannerOrder) || bannerOrder < 0) {
    return res.status(400).json({ success: false, message: 'Banner order must be a non-negative whole number.' });
  }

  try {
    const banner = await Banner.create({
      eyebrow: eyebrow.trim(),
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      link: bannerLink || 'shop.html',
      buttonText: buttons[0]?.text.trim() || buttonText.trim() || 'SHOP NOW',
      buttons: buttons.map(button => ({ text: button.text.trim(), link: button.link.trim() })),
      placement,
      order: bannerOrder,
      active: true
    });
    return res.status(201).json({ success: true, message: 'Banner saved to MongoDB.', banner });
  } catch (error) {
    console.error('Banner save failed:', error);
    return res.status(500).json({ success: false, message: 'Could not save the banner.' });
  }
});

const defaultNewsletterSettings = {
  key: 'homepage',
  heading: 'Join our newsletter and',
  offer: 'get $50 discount',
  ending: 'for your first order',
  placeholder: 'Enter your email address',
  buttonText: 'Subscribe'
};

app.get('/api/homepage/settings', async (req, res) => {
  try {
    const settings = await HomepageSettings.findOneAndUpdate(
      { key: 'homepage' },
      { $setOnInsert: { key: 'homepage', latestProductsTitle: 'Latest Products' } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();
    return res.json(settings);
  } catch (error) {
    console.error('Homepage settings load failed:', error);
    return res.status(500).json({ success: false, message: 'Homepage settings could not be loaded.' });
  }
});

app.put('/api/homepage/settings', async (req, res) => {
  const latestProductsTitle = typeof req.body?.latestProductsTitle === 'string'
    ? req.body.latestProductsTitle.trim()
    : '';
  if (!latestProductsTitle || latestProductsTitle.length > 120) {
    return res.status(400).json({ success: false, message: 'Latest products title is required and must be 120 characters or fewer.' });
  }

  try {
    const settings = await HomepageSettings.findOneAndUpdate(
      { key: 'homepage' },
      { $set: { latestProductsTitle }, $setOnInsert: { key: 'homepage' } },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return res.json({ success: true, message: 'Homepage section title saved to MongoDB.', settings });
  } catch (error) {
    console.error('Homepage settings save failed:', error);
    return res.status(500).json({ success: false, message: 'Homepage section title could not be saved.' });
  }
});

app.get('/api/newsletter/settings', async (req, res) => {
  try {
    const settings = await NewsletterSettings.findOneAndUpdate(
      { key: 'homepage' },
      { $setOnInsert: defaultNewsletterSettings },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();
    return res.json(settings);
  } catch (error) {
    console.error('Newsletter settings load failed:', error);
    return res.status(500).json({ success: false, message: 'Newsletter settings could not be loaded.' });
  }
});

app.put('/api/newsletter/settings', async (req, res) => {
  const fields = ['heading', 'offer', 'ending', 'placeholder', 'buttonText'];
  const settings = {};
  for (const field of fields) {
    const value = req.body?.[field];
    if (typeof value !== 'string' || !value.trim()) {
      return res.status(400).json({ success: false, message: `${field} is required.` });
    }
    settings[field] = value.trim();
  }
  if (settings.heading.length > 120 || settings.offer.length > 120 ||
      settings.ending.length > 120 || settings.placeholder.length > 100 ||
      settings.buttonText.length > 40) {
    return res.status(400).json({ success: false, message: 'Newsletter text exceeds the allowed length.' });
  }

  try {
    const savedSettings = await NewsletterSettings.findOneAndUpdate(
      { key: 'homepage' },
      { $set: settings, $setOnInsert: { key: 'homepage' } },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return res.json({ success: true, message: 'Newsletter content saved to MongoDB.', settings: savedSettings });
  } catch (error) {
    console.error('Newsletter settings save failed:', error);
    return res.status(500).json({ success: false, message: 'Newsletter content could not be saved.' });
  }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  try {
    const result = await NewsletterSubscription.updateOne(
      { email },
      { $setOnInsert: { email } },
      { upsert: true, runValidators: true }
    );
    const alreadySubscribed = result.upsertedCount === 0;
    return res.status(alreadySubscribed ? 200 : 201).json({
      success: true,
      message: alreadySubscribed ? 'This email is already subscribed.' : 'You are subscribed to the newsletter.'
    });
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return res.status(500).json({ success: false, message: 'Subscription could not be saved. Please try again.' });
  }
});

app.post('/api/popular-products', async (req, res) => {
  try {
    const { name, price, category, image, images, description, stock } = req.body;
    const productName = typeof name === 'string' ? name.trim() : '';
    const productCategory = typeof category === 'string' ? category.trim() : '';
    const mainImage = typeof image === 'string' ? image.trim() : '';
    const numericPrice = Number(price);
    const numericStock = stock === undefined || stock === '' ? 10 : Number(stock);

    if (!productName || !productCategory || !mainImage || price === undefined || price === null || price === '' ||
        !Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, valid price, category aur main image required hain.'
      });
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      return res.status(400).json({ success: false, message: 'Stock valid non-negative number hona chahiye.' });
    }

    let galleryImages = [];
    if (Array.isArray(images)) {
      galleryImages = images;
    } else if (typeof images === 'string') {
      galleryImages = images.split(',');
    } else if (images !== undefined && images !== null) {
      return res.status(400).json({ success: false, message: 'Gallery images array ya comma-separated URLs honi chahiye.' });
    }
    if (galleryImages.some((url) => typeof url !== 'string')) {
      return res.status(400).json({ success: false, message: 'Har gallery image ek URL string honi chahiye.' });
    }

    const productImages = [...new Set([
      mainImage,
      ...galleryImages.map((url) => url.trim()).filter(Boolean)
    ])];
    const popularProduct = await PopularProduct.create({
      name: productName,
      price: numericPrice,
      category: productCategory,
      image: mainImage,
      images: productImages,
      description: typeof description === 'string' ? description.trim() : '',
      stock: numericStock
    });

    return res.status(201).json({
      success: true,
      message: 'Product popular products mein add ho gaya.',
      product: popularProduct
    });
  } catch (error) {
    console.error('Error adding popular product:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET: Single Product ID se Fetch karne ke liye
app.get('/api/products/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(req.params.id) ||
      await PopularProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error", message: error.message });
  }
});

// 3. POST: Naya Single Product Add karne ke liye
app.post('/api/products/add', (req, res) => {
  return createProduct(req, res);
});


// --- CART ROUTES ---

async function findCartWithProducts(userId) {
  const cart = await Cart.findOne({ userId }).lean();
  if (!cart) return { userId, items: [] };

  const productIds = cart.items.map(item => item.productId);
  const [products, popularProducts] = await Promise.all([
    Product.find({ _id: { $in: productIds } }).lean(),
    PopularProduct.find({ _id: { $in: productIds } }).lean()
  ]);
  const productById = new Map(
    [...products, ...popularProducts].map(product => [String(product._id), product])
  );

  return {
    ...cart,
    items: cart.items.map(item => ({
      ...item,
      productId: productById.get(String(item.productId)) || null
    }))
  };
}

// 1. GET: Fetch Cart Data
app.get('/api/cart', async (req, res) => {
  const { userId = 'guest_user' } = req.query;
  if (typeof userId !== 'string' || !userId.trim() || userId.length > 200) {
    return res.status(400).json({ success: false, message: 'Valid userId is required.' });
  }
  try {
    const cart = await findCartWithProducts(userId);
    return res.json(cart);
  } catch (err) {
    console.error('Cart fetch failed:', err);
    return res.status(500).json({ success: false, message: 'Cart load nahi ho saka.' });
  }
});

// 2. POST: Add item to Cart
app.post('/api/cart/add', async (req, res) => {
  const { userId = 'guest_user', productId, quantity = 1 } = req.body || {};

  if (typeof userId !== 'string' || !userId.trim() || userId.length > 200 ||
      typeof productId !== 'string' || !mongoose.Types.ObjectId.isValid(productId) ||
      !Number.isInteger(Number(quantity)) || Number(quantity) < 1 || Number(quantity) > 99) {
    return res.status(400).json({ success: false, message: 'Valid userId, productId, and quantity are required.' });
  }

  try {
    const productExists = await Product.exists({ _id: productId }) ||
      await PopularProduct.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ success: false, message: 'Product nahi mila.' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return res.status(200).json({
      success: true,
      message: 'Product cart me add ho gaya!',
      totalItems,
      cart: await findCartWithProducts(userId)
    });
  } catch (err) {
    console.error('Cart add failed:', err);
    return res.status(500).json({ success: false, message: 'Product cart mein add nahi ho saka.' });
  }
});

// 3. PUT: Update Quantity
app.put('/api/cart/update', async (req, res) => {
  const { userId = 'guest_user', productId, action } = req.body || {};
  if (typeof userId !== 'string' || !userId.trim() || userId.length > 200 ||
      typeof productId !== 'string' || !mongoose.Types.ObjectId.isValid(productId) ||
      !['increase', 'decrease'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Valid userId, productId, and action are required.' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      if (action === 'increase') {
        cart.items[itemIndex].quantity += 1;
      } else if (action === 'decrease') {
        cart.items[itemIndex].quantity -= 1;
        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      }
      await cart.save();
    }

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE: Remove Single Item from Cart
app.delete('/api/cart/remove', async (req, res) => {
  const { userId = 'guest_user', productId } = req.body || {};
  if (typeof userId !== 'string' || !userId.trim() || userId.length > 200 ||
      typeof productId !== 'string' || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: 'Valid userId and productId are required.' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
    }
    res.json({ success: true, message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE: Clear entire Cart
app.delete('/api/cart/clear', async (req, res) => {
  const { userId = 'guest_user' } = req.body || req.query;
  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.json({ success: true, message: 'Cart cleared successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- ORDER & PAYMENT ROUTES ---

// 1. POST: Place Order & Update Stock
app.post('/api/orders/place', async (req, res) => {
  try {
    const {
      userId = 'guest_user',
      customer,
      paymentMethod = 'COD',
      transactionId
    } = req.body || {};

    if (typeof userId !== 'string' || !userId.trim() || userId.length > 200) {
      return res.status(400).json({ success: false, message: 'Valid userId is required.' });
    }
    if (!customer?.fullName || !customer?.email || !customer?.phone || !customer?.deliveryAddress) {
      return res.status(400).json({ success: false, message: 'Complete customer and delivery details are required.' });
    }

    const cart = await findCartWithProducts(userId);
    if (!cart.items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty; add products before placing an order.' });
    }
    if (cart.items.some(item =>
      !item.productId ||
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) < 1 ||
      !Number.isFinite(Number(item.productId.price)) ||
      Number(item.productId.price) < 0
    )) {
      return res.status(400).json({ success: false, message: 'One or more cart products are invalid or unavailable.' });
    }

    const items = cart.items.map(item => {
      const product = item.productId;
      const quantity = Number(item.quantity);
      const price = Number(product?.price);
      return {
        productId: product._id,
        name: product.name || product.title || 'Product',
        title: product.title || product.name || 'Product',
        image: product.image || product.imageUrl || '',
        category: product.category || 'General',
        price,
        quantity,
        itemTotal: price * quantity
      };
    });
    const totalAmount = items.reduce((total, item) => total + item.itemTotal, 0);

    const newOrder = new Order({
      userId,
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: 'Pending',
      transactionId: transactionId || null
    });

    await newOrder.save();

    // Inventory Update
    for (let item of items) {
      const prodId = item.productId?._id || item.productId;
      if (prodId) {
        await Product.findByIdAndUpdate(prodId, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    // Clear Cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: newOrder._id
    });
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. GET: Order by ID
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId) || await Order.findOne({ transactionId: orderId });

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order nahi mila!" });
    }

    res.status(200).json({ status: "success", order });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// 3. POST: Razorpay Webhook Verification
const WEBHOOK_SECRET = "MY_SUPER_SECRET_KEY_123";

app.post('/api/razorpay-webhook', (req, res) => {
  const razorpaySignature = req.headers['x-razorpay-signature'];

  const generatedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (razorpaySignature === generatedSignature) {
    console.log("✅ Authenticated Webhook Event!");

    const event = req.body.event;

    if (event === 'payment.captured') {
      const paymentInfo = req.body.payload.payment.entity;
      console.log("Payment Verified ID:", paymentInfo.id);
      console.log("Amount:", paymentInfo.amount / 100);
    }

    res.status(200).json({ status: 'ok' });
  } else {
    console.log("❌ Invalid Signature Detected!");
    res.status(400).send('Invalid Signature');
  }
});


// --- WISHLIST ROUTES ---

app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.length > 200) {
      return res.status(400).json({ success: false, message: 'Valid user ID is required.' });
    }

    const wishlist = await Wishlist.findOne({ userId }).select('products').lean();
    return res.json({
      success: true,
      productIds: wishlist?.products || []
    });
  } catch (error) {
    console.error('Wishlist fetch failed:', error);
    return res.status(500).json({ success: false, message: 'Could not load wishlist.' });
  }
});

app.post('/api/wishlist', async (req, res) => {
  try {
    const { userId, productId } = req.body || {};

    if (typeof userId !== 'string' || !userId.trim() || userId.length > 200 ||
        typeof productId !== 'string' || !productId.trim() || productId.length > 200) {
      return res.status(400).json({ success: false, message: 'Valid userId and productId are required.' });
    }

    const normalizedUserId = userId.trim();
    const normalizedProductId = productId.trim();
    let wishlist = await Wishlist.findOne({ userId: normalizedUserId });
    const isWishlisted = wishlist?.products.includes(normalizedProductId) || false;

    if (isWishlisted) {
      wishlist.products = wishlist.products.filter(id => id !== normalizedProductId);
    } else if (wishlist) {
      wishlist.products.push(normalizedProductId);
    } else {
      wishlist = new Wishlist({ userId: normalizedUserId, products: [normalizedProductId] });
    }

    await wishlist.save();
    return res.status(200).json({
      success: true,
      message: isWishlisted ? 'Removed from wishlist.' : 'Added to wishlist.',
      isWishlisted: !isWishlisted
    });
  } catch (error) {
    console.error('Wishlist update failed:', error);
    return res.status(500).json({ success: false, message: 'Could not update wishlist.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, source, email, mobile, enquiry } = req.body || {};
  const contactData = { name, source, email, mobile, enquiry };

  for (const [field, value] of Object.entries(contactData)) {
    if (typeof value !== 'string' || !value.trim()) {
      return res.status(400).json({
        success: false,
        message: `${field} is required.`
      });
    }
  }

  if (!['google', 'social', 'friend', 'other'].includes(source)) {
    return res.status(400).json({ success: false, message: 'Please select a valid source.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  try {
    const savedContact = await Contact.create({
      name: name.trim(),
      source,
      email: email.trim(),
      mobile: mobile.trim(),
      enquiry: enquiry.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      contactId: savedContact._id
    });
  } catch (error) {
    console.error('Contact form save failed:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not save your message. Please try again later.'
    });
  }
});

const getGalleryVideoBucket = () => new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
  bucketName: 'galleryVideos'
});

app.get('/api/gallery/videos', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected yet.' });
    }

    const videos = await mongoose.connection.db
      .collection('galleryVideos.files')
      .find({}, { projection: { filename: 1, contentType: 1, length: 1, uploadDate: 1, metadata: 1 } })
      .sort({ uploadDate: -1 })
      .toArray();

    return res.json(videos.map(video => ({
      id: video._id.toString(),
      filename: video.filename,
      title: video.metadata?.title || video.filename,
      contentType: video.contentType || 'application/octet-stream',
      size: video.length,
      uploadedAt: video.uploadDate,
      url: `/api/gallery/videos/${video._id}`
    })));
  } catch (error) {
    console.error('Gallery video list failed:', error);
    return res.status(500).json({ message: 'Could not load gallery videos.' });
  }
});

app.post(
  '/api/gallery/videos',
  express.raw({ type: 'application/octet-stream', limit: '100mb' }),
  async (req, res) => {
    const contentType = req.get('x-video-content-type') || '';
    const title = decodeURIComponent(req.get('x-video-title') || '').trim();
    const filename = decodeURIComponent(req.get('x-video-filename') || '').trim();
    const videoData = req.body;

    if (!contentType.startsWith('video/')) {
      return res.status(400).json({ message: 'Please upload a valid video file.' });
    }
    if (!Buffer.isBuffer(videoData) || videoData.length === 0) {
      return res.status(400).json({ message: 'The selected video file is empty or missing.' });
    }
    if (!filename || filename.length > 255 || title.length > 120) {
      return res.status(400).json({ message: 'Please provide a valid video filename and title.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected yet. Please try again.' });
    }

    const bucket = getGalleryVideoBucket();
    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
      metadata: { title: title || filename }
    });

    try {
      await new Promise((resolve, reject) => {
        uploadStream.once('finish', resolve);
        uploadStream.once('error', reject);
        uploadStream.end(videoData);
      });

      return res.status(201).json({
        success: true,
        message: 'Video uploaded and saved to MongoDB.',
        video: {
          id: uploadStream.id.toString(),
          filename,
          title: title || filename,
          contentType,
          size: videoData.length,
          uploadedAt: new Date(),
          url: `/api/gallery/videos/${uploadStream.id}`
        }
      });
    } catch (error) {
      console.error('Gallery video upload failed:', error);
      if (uploadStream.id) {
        await bucket.delete(uploadStream.id).catch(deleteError => {
          console.error('Could not remove incomplete gallery video:', deleteError);
        });
      }
      return res.status(500).json({ message: 'Video could not be saved. Please try again.' });
    }
  }
);

app.get('/api/gallery/videos/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Video not found.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database is not connected yet.' });
  }

  try {
    const videoId = new mongoose.Types.ObjectId(req.params.id);
    const file = await mongoose.connection.db.collection('galleryVideos.files').findOne({ _id: videoId });
    if (!file) return res.status(404).json({ message: 'Video not found.' });

    const contentType = file.contentType || 'application/octet-stream';
    const rangeHeader = req.get('Range');
    let start = 0;
    let end = file.length - 1;

    if (rangeHeader) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      if (!match || (!match[1] && !match[2])) {
        return res.status(416).set('Content-Range', `bytes */${file.length}`).end();
      }

      if (!match[1]) {
        const suffixLength = Number(match[2]);
        start = Math.max(file.length - suffixLength, 0);
      } else {
        start = Number(match[1]);
        if (match[2]) end = Number(match[2]);
      }

      if (start >= file.length || start > end) {
        return res.status(416).set('Content-Range', `bytes */${file.length}`).end();
      }
      end = Math.min(end, file.length - 1);
      res.status(206);
      res.set('Content-Range', `bytes ${start}-${end}/${file.length}`);
    }

    res.set({
      'Accept-Ranges': 'bytes',
      'Content-Length': String(end - start + 1),
      'Content-Type': contentType
    });
    getGalleryVideoBucket().openDownloadStream(videoId, {
      start,
      end: end + 1
    }).on('error', error => {
      console.error('Gallery video stream failed:', error);
      if (!res.headersSent) res.status(500);
      res.end();
    }).pipe(res);
  } catch (error) {
    console.error('Gallery video retrieval failed:', error);
    return res.status(500).json({ message: 'Could not play this gallery video.' });
  }
});


// --- SERVER START ---
app.use('/api/categories', require('./routers/categoryRoutes'));

const PORT = Number(process.env.API_PORT) || 5501;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.use(express.urlencoded({ extended: true }));



// --- SHARE ROUTES ---

// POST: Share Activity Save Karne Ke Liye API
app.post('/api/shares', async (req, res) => {
  try {
    const { productId, productName, platform, userId } = req.body || {};
    const allowedPlatforms = ['copy_link', 'whatsapp', 'facebook', 'gmail', 'linkedin', 'sms', 'native'];

    if (typeof productId !== 'string' || !productId.trim() || productId.length > 200 ||
        typeof platform !== 'string' || !allowedPlatforms.includes(platform) ||
        (productName !== undefined && (typeof productName !== 'string' || productName.length > 200)) ||
        (userId !== undefined && (typeof userId !== 'string' || userId.length > 200))) {
      return res.status(400).json({ success: false, message: 'Valid product ID, product name, and sharing platform are required.' });
    }

    const newShare = new Share({
      productId: productId.trim(),
      productName: (productName || 'Product').trim(),
      platform,
      userId: userId?.trim() || 'guest_user'
    });

    await newShare.save();

    return res.status(201).json({
      success: true,
      message: 'Share activity saved.',
      data: newShare
    });
  } catch (error) {
    console.error('Error saving share data:', error);
    return res.status(500).json({ success: false, message: 'Could not save share activity.' });
  }
});
