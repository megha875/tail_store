// // Example: Jab aap products fetch karke slider me add karte hain
// products.forEach((product) => {
//   const slide = document.createElement('div');
//   slide.className = 'swiper-slide';

//   // 1. Product data ko HTML safe string me convert karein
//   const productData = JSON.stringify({ 
//     id: product._id, 
//     name: product.title || product.name, 
//     price: product.price 
//   }).replace(/"/g, '&quot;');

//   // 2. InnerHTML me button include karein
//   slide.innerHTML = `
//     <div class="bg-white p-4 rounded-xl shadow-md border">
//       <img src="${product.image || 'assets/img/1.jpg'}" alt="${product.title}" class="w-full h-48 object-cover rounded-lg mb-3">
//       <h3 class="font-bold text-gray-800">${product.title}</h3>
//       <p class="text-[#ff0055] font-bold text-lg mb-3">₹${product.price}</p>
      
//       <!-- Button par productData attach karein -->
//       <button onclick="addToCart(${productData})" class="w-full bg-[#ff0055] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#d90048] transition-colors">
//         Add to Cart
//       </button>
//     </div>
//   `;

//   // 3. Slide ko wrapper me append karein
//   document.getElementById('popular-products-wrapper').appendChild(slide);
// });


// server.js / index.js
const express = require('express');
const app = express();

// Models import karein
const Wishlist = require('./models/Wishlist'); 

// Middleware (Aapka Auth Middleware)
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

// ---------------- HARDER/CORE APIS ----------------

// Wishlist Toggle API
app.post('/api/wishlist/toggle', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const existingWishlist = await Wishlist.findOne({ userId, productId });

    if (existingWishlist) {
      await Wishlist.findByIdAndDelete(existingWishlist._id);
      return res.json({ success: true, message: 'Removed from wishlist', isWishlisted: false });
    } else {
      const newWishlist = new Wishlist({ userId, productId });
      await newWishlist.save();
      return res.json({ success: true, message: 'Added to wishlist', isWishlisted: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// User ke Wishlist IDs
app.get('/api/wishlist/user-ids', authMiddleware, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.user._id }).select('productId');
    const productIds = wishlists.map(item => item.productId);
    res.json({ success: true, wishlistProductIds: productIds });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------

app.listen(5000, () => console.log('Server running on port 5500'));



// server.js
const wishlistRoutes = require('./routes/wishlistRoutes');

// Mount the route
app.use('/api/wishlist', wishlistRoutes);
const express = require('express');
const app = express();

// 1. JSON Data Parse karne ke liye Middleware (Yeh zaroori hai)
app.use(express.json());

// 2. Login POST Route Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Form Validation Check
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email aur Password dono required hain!" 
            });
        }

        // 3. Database se User find karein (Example: MongoDB/Mongoose User Model)
        // const user = await User.findOne({ email });
        
        // Demo Check (Aap is jagah apna DB verification code use karein):
        if (email === "test@gmail.com" && password === "123456") {
            
            // Success Response with Token and User ID
            return res.status(200).json({
                success: true,
                message: "Login Successful!",
                token: "jwt_token_sample_xyz123", // Real project me JWT token sign karke bhejte hain
                userId: "usr_67890",
                user: {
                    id: "usr_67890",
                    email: email,
                    name: "Test User"
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password!"
            });
        }

    } catch (error) {
        console.error("Login Server Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



// ==========================================
// 🛒 CART ROUTES SECTION
// ==========================================

// 1. Is GET Route ko yahan replace/add karein
app.get('/api/cart', async (req, res) => {
  const { userId = 'guest_user' } = req.query;
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'name price image category stock' // Isse Product ka name, price aur image frontend par aayega
    });

    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Iske neeche aapke baaki cart routes honge (Add, Update, Remove, Clear)
app.post('/api/cart/add', async (req, res) => { ... });
app.put('/api/cart/update', async (req, res) => { ... });
app.delete('/api/cart/remove', async (req, res) => { ... });
app.delete('/api/cart/clear', async (req, res) => { ... });







// script.js / main.js

function goToDetail(id) {
    window.location.href = `/product-detail.html?id=${id}`;
}

function Wishlist(id, event) {
    event.stopPropagation();
    // Wishlist logic...
}

function handleCartClick(index, event) {
    // Cart logic...
}



// Backend se products fetch karke loop chalayein
async function fetchProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();

  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    // Card ki HTML structure Tailwind CSS ke sath
    container.innerHTML += `
      <div class="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        
        <!-- Clickable Link with MongoDB _id -->
        <a href="product-detail.html?id=${product._id}" class="group block">
          <div class="relative bg-gray-100 rounded-xl overflow-hidden mb-3">
            <span class="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-105 transition duration-300">
          </div>
          <h3 class="font-bold text-gray-900 group-hover:text-pink-600 transition">${product.name}</h3>
          <p class="text-xs text-gray-500">${product.category}</p>
          <p class="font-bold text-blue-600 mt-2 text-lg">₹${product.price}</p>
        </a>

        <!-- Add to Cart Button (Link ke bahar rakhein) -->
        <div class="mt-4">
          <button onclick="addToCart('${product._id}')" class="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-xl transition">
            Add to Cart
          </button>
        </div>

      </div>
    `;
  });
}

fetchProducts();



const express = require('express');
const app = express();

// Apne product route ko yahan import karein
const productRoutes = require('./routes/productRoutes'); 

// Route ko middleware ki tarah use karein
app.use('/api', productRoutes);

// Server start karein
app.listen(5000, () => {
    console.log('Server is running on port 5500');
});




const Product = require('./models/Product'); // Model ka path

// Route
app.post('/api/products/add', async (req, res) => {
    try {
        const { name, price, category, image, images, description, stock } = req.body;

        const newProduct = new Product({
            name,
            price,
            category,
            image,
            images: images || [],
            description,
            stock
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product and Gallery Images successfully MongoDB mein add ho gaya!',
            product: newProduct
        });

    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});