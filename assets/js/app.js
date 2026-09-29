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






