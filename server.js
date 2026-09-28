// // const express = require('express');
// // const cors = require('cors');
// // const path = require('path');
// // const mongoose = require('mongoose');
// // const Product = require('./models/Product');
// // const Cart = require('./models/Cart');

// // const app = express();

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // Serve Static Files (HTML, CSS, JS, Assets) from root directory
// // app.use(express.static(__dirname));

// // // MongoDB Atlas Connection URI
// // const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

// // // Database Connection
// // mongoose.connect(MONGO_URI)
// //   .then(() => console.log('MongoDB Atlas Connected Successfully!'))
// //   .catch(err => console.error('DB Connection Error:', err));

// // // --- ROOT ROUTE (Directly Serve index.html) ---
// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // // Explicit route for index.html
// // app.get('/index.html', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // // Explicit route for home.html
// // app.get('/home.html', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // // --- PRODUCT ROUTES ---

// // // 1. GET: Saare Live Products DB se Fetch karne ke liye
// // app.get('/api/products', async (req, res) => {
// //   try {
// //     const products = await Product.find().sort({ _id: -1 });
// //     res.json(products);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 2. GET: Single Product ID se Fetch karne ke liye (YAHAN ADD KIYA HAI)
// // app.get('/api/products/:id', async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.id);
// //     if (!product) {
// //       return res.status(404).json({ message: "Product not found" });
// //     }
// //     res.json(product);
// //   } catch (error) {
// //     res.status(500).json({ error: "Database error", message: error.message });
// //   }
// // });

// // // 3. POST: Naya Single Live Product Add karne ke liye
// // app.post('/api/products/add', async (req, res) => {

// //     try {

// //         const {
// //             name,
// //             price,
// //             category,
// //             image,
// //             description,
// //             stock
// //         } = req.body;


// //         // Required fields check
// //         if (!name || !price || !category || !image) {

// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'Name, price, category aur image required hain.'
// //             });

// //         }


// //         const newProduct = new Product({

// //             name: name,

// //             price: Number(price),

// //             category: category,

// //             image: image,

// //             description: description || '',

// //             stock: stock !== undefined
// //                 ? Number(stock)
// //                 : 10

// //         });


// //         await newProduct.save();


// //         res.status(201).json({

// //             success: true,

// //             message: 'Product successfully MongoDB mein add ho gaya!',

// //             product: newProduct

// //         });


// //     } catch (err) {

// //         console.error('Add Product Error:', err);

// //         res.status(500).json({

// //             success: false,

// //             message: 'Product add nahi hua.',

// //             error: err.message

// //         });

// //     }

// // }); 

// // // 4. POST: Dummy Sample Products Add karne ke liye
// // app.post('/api/products/add-dummy', async (req, res) => {
// //   try {
// //     const dummyProducts = [
// //       { title: 'Classic White T-Shirt', price: 499, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', stock: 10 },
// //       { title: 'Denim Jeans', price: 1299, category: 'Clothing', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', stock: 15 }
// //     ];
// //     await Product.insertMany(dummyProducts);
// //     res.json({ message: 'Dummy products added successfully!' });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // --- CART ROUTES ---

// // // 1. GET: Fetch User Cart Data
// // app.get('/api/cart', async (req, res) => {
// //   const { userId = 'guest_user' } = req.query;
// //   try {
// //     const cart = await Cart.findOne({ userId }).populate('items.productId');
// //     res.json(cart || { userId, items: [] });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 2. POST: Add item to Cart
// // app.post('/api/cart/add', async (req, res) => {
// //   const { userId = 'guest_user', productId, quantity = 1 } = req.body;

// //   if (!productId) {
// //     return res.status(400).json({ error: 'productId is required' });
// //   }

// //   try {
// //     let cart = await Cart.findOne({ userId });

// //     if (!cart) {
// //       cart = new Cart({ userId, items: [] });
// //     }

// //     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

// //     if (itemIndex > -1) {
// //       cart.items[itemIndex].quantity += Number(quantity);
// //     } else {
// //       cart.items.push({ productId, quantity: Number(quantity) });
// //     }

// //     await cart.save();

// //     const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

// //     res.status(200).json({
// //       success: true,
// //       message: 'Product cart me add ho gaya!',
// //       totalItems,
// //       cart
// //     });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 3. PUT: Update Item Quantity in Cart
// // app.put('/api/cart/update', async (req, res) => {
// //   const { userId = 'guest_user', productId, action } = req.body;

// //   try {
// //     let cart = await Cart.findOne({ userId });
// //     if (!cart) return res.status(404).json({ error: 'Cart not found' });

// //     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

// //     if (itemIndex > -1) {
// //       if (action === 'increase') {
// //         cart.items[itemIndex].quantity += 1;
// //       } else if (action === 'decrease') {
// //         cart.items[itemIndex].quantity -= 1;
// //         if (cart.items[itemIndex].quantity <= 0) {
// //           cart.items.splice(itemIndex, 1);
// //         }
// //       }
// //       await cart.save();
// //     }

// //     res.json({ success: true, cart });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 4. DELETE: Remove Item from Cart
// // app.delete('/api/cart/remove', async (req, res) => {
// //   const { userId = 'guest_user', productId } = req.body;

// //   try {
// //     let cart = await Cart.findOne({ userId });
// //     if (cart) {
// //       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
// //       await cart.save();
// //     }
// //     res.json({ success: true, cart });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // --- SERVER LISTENING ---
// // const PORT = 5500;
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');
// const Product = require('./models/Product');
// const Cart = require('./models/Cart');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Serve Static Files (HTML, CSS, JS, Assets) from root directory
// app.use(express.static(__dirname));

// // MongoDB Atlas Connection URI
// const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

// // Database Connection
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB Atlas Connected Successfully!'))
//   .catch(err => console.error('DB Connection Error:', err));

// // --- ROOT ROUTE (Directly Serve index.html) ---
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Explicit route for index.html
// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Explicit route for home.html
// app.get('/home.html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
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

// // 2. GET: Single Product ID se Fetch karne ke liye (YAHAN ADD KIYA HAI)
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

// // 3. POST: Naya Single Live Product Add karne ke liye
// app.post('/api/products/add', async (req, res) => {

//     try {

//         const {
//             name,
//             price,
//             category,
//             image,
//             description,
//             stock
//         } = req.body;


//         // Required fields check
//         if (!name || !price || !category || !image) {

//             return res.status(400).json({
//                 success: false,
//                 message: 'Name, price, category aur image required hain.'
//             });

//         }


//         const newProduct = new Product({

//             name: name,

//             price: Number(price),

//             category: category,

//             image: image,

//             description: description || '',

//             stock: stock !== undefined
//                 ? Number(stock)
//                 : 10

//         });


//         await newProduct.save();


//         res.status(201).json({

//             success: true,

//             message: 'Product successfully MongoDB mein add ho gaya!',

//             product: newProduct

//         });


//     } catch (err) {

//         console.error('Add Product Error:', err);

//         res.status(500).json({

//             success: false,

//             message: 'Product add nahi hua.',

//             error: err.message

//         });

//     }

// }); 

// // 4. POST: Dummy Sample Products Add karne ke liye
// app.post('/api/products/add-dummy', async (req, res) => {
//   try {
//     const dummyProducts = [
//       { title: 'Classic White T-Shirt', price: 499, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', stock: 10 },
//       { title: 'Denim Jeans', price: 1299, category: 'Clothing', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', stock: 15 }
//     ];
//     await Product.insertMany(dummyProducts);
//     res.json({ message: 'Dummy products added successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // --- CART ROUTES ---

// // 1. GET: Fetch User Cart Data
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

// // 3. PUT: Update Item Quantity in Cart
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

// // 4. DELETE: Remove Item from Cart
// app.delete('/api/cart/remove', async (req, res) => {
//   const { userId = 'guest_user', productId } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (cart) {
//       cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//       await cart.save();
//     }
//     res.json({ success: true, cart });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 5. DELETE: Clear entire cart (sets items to empty array => badge/count becomes 0)
// app.delete('/api/cart/clear', async (req, res) => {
//   const { userId = 'guest_user' } = req.query;
//   try {
//     await Cart.findOneAndUpdate({ userId }, { items: [] });
//     res.json({ success: true, message: 'Cart cleared!' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // --- SERVER LISTENING ---
// const PORT = 5500;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// // Express Route to Remove Item / Delete from Cart
// app.post('/api/cart/remove', async (req, res) => {
//     const { userId, productId } = req.body;

//     try {
//         let cart = await Cart.findOne({ userId });
//         if (cart) {
//             // Cart array se target product filter/remove karein
//             cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//             await cart.save();
//         }

//         res.status(200).json({ success: true, message: 'Item removed from cart', cart });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });

// Cart Empty / Clear karne ke liye API
// app.delete('/api/cart/clear', async (req, res) => {
//     const { userId } = req.body;
//     try {
//         await Cart.deleteOne({ userId });
//         res.status(200).json({ success: true, message: 'Cart cleared successfully!' });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });


// app.delete('/api/cart/clear', async (req, res) => {
//     try {
//         const { userId } = req.body;
//         await Cart.deleteOne({ userId });
//         res.status(200).json({ success: true, message: 'Cart reset to 0' });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto'); // Built-in Node.js module

const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- MONGO DB CONNECTION ---
const MONGO_URI = 'mongodb+srv://meghaagarwal1255_db_user:meghaagakwz@cluster0.njjkys0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully!'))
  .catch(err => console.error('DB Connection Error:', err));

// --- MONGOOSE ORDER SCHEMA ---
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

// 2. GET: Single Product ID se Fetch karne ke liye
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

// 3. POST: Naya Single Product Add karne ke liye
app.post('/api/products/add', async (req, res) => {
  try {
    const { name, price, category, image, description, stock } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, category aur image required hain.'
      });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      category,
      image,
      description: description || '',
      stock: stock !== undefined ? Number(stock) : 10
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product successfully MongoDB mein add ho gaya!',
      product: newProduct
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// --- CART ROUTES ---

// 1. GET: Fetch Cart Data
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

// 3. PUT: Update Quantity
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

// 4. DELETE: Remove Single Item from Cart
app.delete('/api/cart/remove', async (req, res) => {
  const { userId = 'guest_user', productId } = req.body;

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

// 1. POST: Place Order (Directly for COD or after Payment)
app.post('/api/orders/place', async (req, res) => {
  try {
    const { userId = 'guest_user', customer, items, totalAmount, paymentMethod, transactionId } = req.body;

    const newOrder = new Order({
      userId,
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      transactionId: transactionId || null
    });

    await newOrder.save();

    // Order hone ke baad User ki Cart Empty karna
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: 'Order successfully placed!',
      orderId: newOrder._id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. POST: Razorpay Webhook Verification
const WEBHOOK_SECRET = "MY_SUPER_SECRET_KEY_123";

app.post('/api/razorpay-webhook', (req, res) => { // Fixed (req, res) parameter
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


// --- SERVER START ---
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// --- STEP 5 & 6: PLACE ORDER & INVENTORY UPDATE ---
app.post('/api/orders/place', async (req, res) => {
  try {
    const { userId = 'guest_user', customer, items, totalAmount, paymentMethod, transactionId } = req.body;

    // 1. Order Save karna MongoDB me
    const newOrder = new Order({
      userId,
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      transactionId: transactionId || null
    });

    await newOrder.save();

    // 2. Inventory Update: Product ka stock quantity kam karna
    for (let item of items) {
      const prodId = item.productId?._id || item.productId;
      if (prodId) {
        await Product.findByIdAndUpdate(prodId, {
          $inc: { stock: -item.quantity } // stock me se minus quantity
        });
      }
    }

    // 3. Database me Cart Clear (Empty) karna
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    // 4. STEP 6: Frontend ko Success Response (201 Created) bhejna
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


// 1. Order ID se Data Fetch karne ka Route
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // MongoDB me orderId search karein
    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order nahi mila!" });
    }

    res.status(200).json({ status: "success", order: order });
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});


// server.js



