const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve Static Files (HTML, CSS, JS, Assets) from root directory
app.use(express.static(__dirname));

// MongoDB Atlas Connection URI
const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully!'))
  .catch(err => console.error('DB Connection Error:', err));

// --- ROOT ROUTE (Directly Serve index.html) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit route for index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit route for home.html
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// --- PRODUCT ROUTES ---

// 1. GET: Saare Live Products DB se Fetch karne ke liye
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET: Single Product ID se Fetch karne ke liye (YAHAN ADD KIYA HAI)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Database error", message: error.message });
  }
});

// 3. POST: Naya Single Live Product Add karne ke liye
app.post('/api/products/add', async (req, res) => {

    try {

        const {
            name,
            price,
            category,
            image,
            description,
            stock
        } = req.body;


        // Required fields check
        if (!name || !price || !category || !image) {

            return res.status(400).json({
                success: false,
                message: 'Name, price, category aur image required hain.'
            });

        }


        const newProduct = new Product({

            name: name,

            price: Number(price),

            category: category,

            image: image,

            description: description || '',

            stock: stock !== undefined
                ? Number(stock)
                : 10

        });


        await newProduct.save();


        res.status(201).json({

            success: true,

            message: 'Product successfully MongoDB mein add ho gaya!',

            product: newProduct

        });


    } catch (err) {

        console.error('Add Product Error:', err);

        res.status(500).json({

            success: false,

            message: 'Product add nahi hua.',

            error: err.message

        });

    }

}); 

// 4. POST: Dummy Sample Products Add karne ke liye
app.post('/api/products/add-dummy', async (req, res) => {
  try {
    const dummyProducts = [
      { title: 'Classic White T-Shirt', price: 499, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', stock: 10 },
      { title: 'Denim Jeans', price: 1299, category: 'Clothing', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', stock: 15 }
    ];
    await Product.insertMany(dummyProducts);
    res.json({ message: 'Dummy products added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CART ROUTES ---

// 1. GET: Fetch User Cart Data
app.get('/api/cart', async (req, res) => {
  const { userId = 'guest_user' } = req.query;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST: Add item to Cart
app.post('/api/cart/add', async (req, res) => {
  const { userId = 'guest_user', productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  try {
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

    res.status(200).json({
      success: true,
      message: 'Product cart me add ho gaya!',
      totalItems,
      cart
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT: Update Item Quantity in Cart
app.put('/api/cart/update', async (req, res) => {
  const { userId = 'guest_user', productId, action } = req.body;

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

// 4. DELETE: Remove Item from Cart
app.delete('/api/cart/remove', async (req, res) => {
  const { userId = 'guest_user', productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
    }
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVER LISTENING ---
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



