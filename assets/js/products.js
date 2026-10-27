

// // // 1. PRODUCTS LOAD & RENDER FUNCTION
// // async function loadProducts() {
// //     const gridContainer =
// //         document.getElementById('productGrid') ||
// //         document.getElementById('products-container') ||
// //         document.getElementById('product-container');

// //     if (!gridContainer) return; 

// //     try {


// //         if (!response.ok) {
// //             throw new Error(`HTTP Error: ${response.status}`);
// //         }

// //         const products = await response.json();

// //         if (!products || products.length === 0) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-gray-500 py-10 col-span-full">
// //                     Database me abhi koi product nahi hai.
// //                 </p>
// //             `;
// //             return;
// //         }

// //         gridContainer.innerHTML = products.map(item => {
// //             const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
// //             const productImage = item.image || 'https://via.placeholder.com/150';
// //             const productPrice = item.price || 0;

// //             return `
// //                 <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
// //                     <div class="image-wrapper cursor-pointer relative">
// //                         <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
// //                             NEW
// //                         </span>

// //                         <img src="${productImage}" alt="${productTitle}" class="product-card-img w-full h-48 object-cover rounded mb-3">

// //                         <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
// //                             <!-- Wishlist Button -->
// //                             <button type="button" onclick="Wishlist('${item._id}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
// //                                 <i class="fa-regular fa-heart text-base"></i>
// //                             </button>

// //                             <!-- Share Button -->
// //                             <button type="button" onclick="shareProduct('${item._id}', '${productTitle}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
// //                                 <i class="fa-solid fa-share-nodes text-sm"></i>
// //                             </button>
// //                         </div>
// //                     </div>

// //                     <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
// //                         ${item.title || item.name || 'Product'}
// //                     </h3>

// //                     <p class="text-gray-500 text-sm mb-3">
// //                         ${item.category || 'General'}
// //                     </p>

// //                     <div class="amount_part flex flex-col gap-2">
// //                         <span class="text-blue-600 font-bold text-xl">
// //                             ₹${productPrice}
// //                         </span>

// //                         <button type="button" onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
// //                             Add to Cart
// //                         </button>
// //                     </div>
// //                 </div>
// //             `;
// //         }).join('');

// //     } catch (error) {
// //         console.error("Product Error:", error);
// //         if (gridContainer) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-red-500 py-10 col-span-full">
// //                     Products load nahi ho pa rahe hain. Server verify karein.
// //                 </p>
// //             `;
// //         }
// //     }
// // }

// // // 2. ADD TO CART FUNCTION
// // // async function addToCart(productId, title, price, image, quantity = 1, event = null) {
// // //     if (event) {
// // //         event.preventDefault();
// // //         event.stopPropagation();
// // //     }

// // //     const userId = localStorage.getItem('userId') || 'guest_user';

// // //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
// // //     const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

// // //     if (existingIndex > -1) {
// // //         cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
// // //     } else {
// // //         cart.push({ id: productId, _id: productId, title, name: title, price, image, quantity });
// // //     }

// // //     localStorage.setItem("cart", JSON.stringify(cart));

// // //     try {

// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ userId, productId, quantity })
// // //         });

// // //         const data = await res.json();
// // //         if (!res.ok) {
// // //             console.warn('Backend Cart Sync Warning:', data.message || 'Cart save failed');
// // //         }
// // //     } catch (error) {
// // //         console.warn("Backend Cart Sync Warning:", error);
// // //     }

// // //     if (typeof updateCartBadge === 'function') updateCartBadge();
// // //     alert(`${title} cart me add ho gaya!`);
// // // }


// // async function addToCart(productId, title, price, image, quantity = 1, event = null) {
// //     if (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //     }

// //     const userId = localStorage.getItem('userId') || 'guest_user';
// //     const token = localStorage.getItem("token") || localStorage.getItem("userToken");

// //     // 1. LocalStorage update (Client side par instantly item save karein)
// //     let cart = [];
// //     try {
// //         cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     } catch (e) {
// //         cart = [];
// //     }

// //     const existingIndex = cart.findIndex(item => String(item.id || item._id) === String(productId));

// //     if (existingIndex > -1) {
// //         cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + Number(quantity);
// //     } else {
// //         cart.push({
// //             id: productId,
// //             _id: productId,
// //             title: title,
// //             name: title,
// //             price: Number(price),
// //             image: image,
// //             quantity: Number(quantity)
// //         });
// //     }

// //     localStorage.setItem("cart", JSON.stringify(cart));

// //     // 2. Header Badge Counter Update
// //     if (typeof updateCartBadge === 'function') {
// //         updateCartBadge();
// //     }

// //     // 3. Backend API Sync (Complete Payload)
// //     try {
// //         const headers = { 'Content-Type': 'application/json' };
// //         if (token && token !== 'undefined' && token !== 'null') {
// //             headers['Authorization'] = `Bearer ${token}`;
// //         }


// //             method: 'POST',
// //             headers: headers,
// //             body: JSON.stringify({
// //                 userId,
// //                 productId,
// //                 quantity: Number(quantity),
// //                 title: title,
// //                 name: title,
// //                 price: Number(price),
// //                 image: image
// //             })
// //         });

// //         const data = await res.json();
// //         if (!res.ok) {
// //             console.log('Backend sync skipped:', data.message || 'Cart saved locally');
// //         }
// //     } catch (error) {
// //         console.log("Backend offline, cart saved locally.");
// //     }

// //     alert(`${title} cart me add ho gaya!`);
// // }

// // // 3. WISHLIST TOGGLE FUNCTION (FIXED)
// // // // 3. WISHLIST TOGGLE FUNCTION
// // async function Wishlist(productId, event) {
// //     if (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //     }

// //     // A. LocalStorage se Auth Data Nikalein
// //     const token = localStorage.getItem("token") || localStorage.getItem("userToken");
// //     const userId = localStorage.getItem("userId");

// //     // B. Strict Auth Check (SABSE PEHLE CHECK HOGA)
// //     const isLoggedIn = token && userId && userId !== 'guest_user' && token !== 'undefined' && token !== 'null';

// //     // Agar user logged in nahi hai toh turant login.html par redirect karein
// //     if (!isLoggedIn) {
// //         alert("Wishlist me add karne ke liye pehle login karein.");
// //         window.location.href = 'login.html'; 
// //         return; // Function yahi stop ho jayega
// //     }

// //     // C. User Logged in hai — Ab Heart Icon UI Update Karein
// //     const btn = event ? (event.currentTarget || event.target.closest('button')) : null;
// //     const icon = btn ? btn.querySelector('i') : null;
// //     if (!icon) return;

// //     const isCurrentlyWishlisted = icon.classList.contains('fa-solid');

// //     // UI Toggle (Red/Outline Heart)
// //     if (isCurrentlyWishlisted) {
// //         icon.classList.remove('fa-solid', 'text-red-500');
// //         icon.classList.add('fa-regular');
// //     } else {
// //         icon.classList.remove('fa-regular');
// //         icon.classList.add('fa-solid', 'text-red-500');
// //     }

// //     // D. Backend Database Sync (API Call)
// //     try {

// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${token}`
// //             },
// //             body: JSON.stringify({ userId, productId })
// //         });

// //         const data = await response.json();
// //         if (!response.ok) throw new Error(data.message || 'Wishlist update failed');

// //     } catch (error) {
// //         console.error("Wishlist Sync Error:", error);
        
// //         // Error aane par Heart Icon ko pehle jaisa wapas kar dein
// //         if (isCurrentlyWishlisted) {
// //             icon.classList.remove('fa-regular');
// //             icon.classList.add('fa-solid', 'text-red-500');
// //         } else {
// //             icon.classList.remove('fa-solid', 'text-red-500');
// //             icon.classList.add('fa-regular');
// //         }
// //         alert("Wishlist update karne me problem aayi. Server log check karein.");
// //     }
// // }




// // async function syncCartWithBackend(productId, title, price, image, quantity = 1) {
// //     const userId = localStorage.getItem('userId') || 'guest_user';

// //     try {

// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify({
// //                 userId: userId,
// //                 productId: productId,
// //                 title: title,
// //                 price: Number(price),
// //                 image: image,
// //                 quantity: Number(quantity)
// //             })
// //         });
// //     } catch (error) {
// //         console.log("Backend offline, cart saved locally.");
// //     }
// // }


// // 1. PRODUCTS LOAD & RENDER FUNCTION
// // async function loadProducts() {
// //     const gridContainer =
// //         document.getElementById('productGrid') ||
// //         document.getElementById('products-container') ||
// //         document.getElementById('product-container');

// //     if (!gridContainer) return; 

// //     try {


// //         if (!response.ok) {
// //             throw new Error(`HTTP Error: ${response.status}`);
// //         }

// //         const products = await response.json();

// //         if (!products || products.length === 0) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-gray-500 py-10 col-span-full">
// //                     Database me abhi koi product nahi hai.
// //                 </p>
// //             `;
// //             return;
// //         }

// //         // Global variable me products save karein taaki access ho sakein
// //         window.allProducts = products;

// //         gridContainer.innerHTML = products.map((item, index) => {
// //             const productTitle = item.title || item.name || 'Product';
// //             const productImage = item.image || 'https://via.placeholder.com/150';
// //             const productPrice = item.price || 0;
// //             const productId = item._id || item.id;

// //             return `
// //                 <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
// //                     <div class="image-wrapper cursor-pointer relative">
// //                         <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
// //                             NEW
// //                         </span>

// //                         <img src="${productImage}" alt="${productTitle}" class="product-card-img w-full h-48 object-cover rounded mb-3">

// //                         <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
// //                             <!-- Wishlist Button -->
// //                             <button type="button" onclick="Wishlist('${productId}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
// //                                 <i class="fa-regular fa-heart text-base"></i>
// //                             </button>

// //                             <!-- Share Button -->
// //                             <button type="button" onclick="shareProduct('${productId}', '${productTitle}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
// //                                 <i class="fa-solid fa-share-nodes text-sm"></i>
// //                             </button>
// //                         </div>
// //                     </div>

// //                     <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
// //                         ${productTitle}
// //                     </h3>

// //                     <p class="text-gray-500 text-sm mb-3">
// //                         ${item.category || 'General'}
// //                     </p>

// //                     <div class="amount_part flex flex-col gap-2">
// //                         <span class="text-blue-600 font-bold text-xl">
// //                             ₹${productPrice}
// //                         </span>

// //                         <button type="button" onclick="handleCartClick(${index}, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
// //                             Add to Cart
// //                         </button>
// //                     </div>
// //                 </div>
// //             `;
// //         }).join('');

// //     } catch (error) {
// //         console.error("Product Error:", error);
// //         if (gridContainer) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-red-500 py-10 col-span-full">
// //                     Products load nahi ho pa rahe hain. Server verify karein.
// //                 </p>
// //             `;
// //         }
// //     }
// // }



// // 1. PRODUCTS LOAD & RENDER FUNCTION
// // async function loadProducts() {
// //     const gridContainer =
// //         document.getElementById('productGrid') ||
// //         document.getElementById('products-container') ||
// //         document.getElementById('product-container');

// //     if (!gridContainer) return; 

// //     try {


// //         if (!response.ok) {
// //             throw new Error(`HTTP Error: ${response.status}`);
// //         }

// //         const products = await response.json();

// //         if (!products || products.length === 0) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-gray-500 py-10 col-span-full">
// //                     Database me abhi koi product nahi hai.
// //                 </p>
// //             `;
// //             return;
// //         }

// //         gridContainer.innerHTML = products.map(item => {
// //             const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
// //             const productImage = item.image || 'https://via.placeholder.com/150';
// //             const productPrice = item.price || 0;

// //             return `
// //                 <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
// //                     <div class="image-wrapper cursor-pointer relative">
// //                         <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
// //                             NEW
// //                         </span>

// //                         <img src="${productImage}" alt="${productTitle}" class="product-card-img w-full h-48 object-cover rounded mb-3">

// //                         <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
// //                             <!-- Wishlist Button -->
// //                             <button type="button" onclick="Wishlist('${item._id}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
// //                                 <i class="fa-regular fa-heart text-base"></i>
// //                             </button>

// //                             <!-- Share Button -->
// //                             <button type="button" onclick="shareProduct('${item._id}', '${productTitle}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
// //                                 <i class="fa-solid fa-share-nodes text-sm"></i>
// //                             </button>
// //                         </div>
// //                     </div>

// //                     <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
// //                         ${item.title || item.name || 'Product'}
// //                     </h3>

// //                     <p class="text-gray-500 text-sm mb-3">
// //                         ${item.category || 'General'}
// //                     </p>

// //                     <div class="amount_part flex flex-col gap-2">
// //                         <span class="text-blue-600 font-bold text-xl">
// //                             ₹${productPrice}
// //                         </span>

// //                         <button type="button" onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
// //                             Add to Cart
// //                         </button>
// //                     </div>
// //                 </div>
// //             `;
// //         }).join('');

// //     } catch (error) {
// //         console.error("Product Error:", error);
// //         if (gridContainer) {
// //             gridContainer.innerHTML = `
// //                 <p class="text-center text-red-500 py-10 col-span-full">
// //                     Products load nahi ho pa rahe hain. Server verify karein.
// //                 </p>
// //             `;
// //         }
// //     }
// // }

// // // 2. ADD TO CART FUNCTION
// // // async function addToCart(productId, title, price, image, quantity = 1, event = null) {
// // //     if (event) {
// // //         event.preventDefault();
// // //         event.stopPropagation();
// // //     }

// // //     const userId = localStorage.getItem('userId') || 'guest_user';

// // //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
// // //     const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

// // //     if (existingIndex > -1) {
// // //         cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
// // //     } else {
// // //         cart.push({ id: productId, _id: productId, title, name: title, price, image, quantity });
// // //     }

// // //     localStorage.setItem("cart", JSON.stringify(cart));

// // //     try {

// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ userId, productId, quantity })
// // //         });

// // //         const data = await res.json();
// // //         if (!res.ok) {
// // //             console.warn('Backend Cart Sync Warning:', data.message || 'Cart save failed');
// // //         }
// // //     } catch (error) {
// // //         console.warn("Backend Cart Sync Warning:", error);
// // //     }

// // //     if (typeof updateCartBadge === 'function') updateCartBadge();
// // //     alert(`${title} cart me add ho gaya!`);
// // // }


// // async function addToCart(productId, title, price, image, quantity = 1, event = null) {
// //     if (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //     }

// //     const userId = localStorage.getItem('userId') || 'guest_user';
// //     const token = localStorage.getItem("token") || localStorage.getItem("userToken");

// //     // 1. LocalStorage update (Client side par instantly item save karein)
// //     let cart = [];
// //     try {
// //         cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     } catch (e) {
// //         cart = [];
// //     }

// //     const existingIndex = cart.findIndex(item => String(item.id || item._id) === String(productId));

// //     if (existingIndex > -1) {
// //         cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + Number(quantity);
// //     } else {
// //         cart.push({
// //             id: productId,
// //             _id: productId,
// //             title: title,
// //             name: title,
// //             price: Number(price),
// //             image: image,
// //             quantity: Number(quantity)
// //         });
// //     }

// //     localStorage.setItem("cart", JSON.stringify(cart));

// //     // 2. Header Badge Counter Update
// //     if (typeof updateCartBadge === 'function') {
// //         updateCartBadge();
// //     }

// //     // 3. Backend API Sync (Complete Payload)
// //     try {
// //         const headers = { 'Content-Type': 'application/json' };
// //         if (token && token !== 'undefined' && token !== 'null') {
// //             headers['Authorization'] = `Bearer ${token}`;
// //         }


// //             method: 'POST',
// //             headers: headers,
// //             body: JSON.stringify({
// //                 userId,
// //                 productId,
// //                 quantity: Number(quantity),
// //                 title: title,
// //                 name: title,
// //                 price: Number(price),
// //                 image: image
// //             })
// //         });

// //         const data = await res.json();
// //         if (!res.ok) {
// //             console.log('Backend sync skipped:', data.message || 'Cart saved locally');
// //         }
// //     } catch (error) {
// //         console.log("Backend offline, cart saved locally.");
// //     }

// //     alert(`${title} cart me add ho gaya!`);
// // }

// // // 3. WISHLIST TOGGLE FUNCTION (FIXED)
// // // // 3. WISHLIST TOGGLE FUNCTION
// // async function Wishlist(productId, event) {
// //     if (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //     }

// //     // A. LocalStorage se Auth Data Nikalein
// //     const token = localStorage.getItem("token") || localStorage.getItem("userToken");
// //     const userId = localStorage.getItem("userId");

// //     // B. Strict Auth Check (SABSE PEHLE CHECK HOGA)
// //     const isLoggedIn = token && userId && userId !== 'guest_user' && token !== 'undefined' && token !== 'null';

// //     // Agar user logged in nahi hai toh turant login.html par redirect karein
// //     if (!isLoggedIn) {
// //         alert("Wishlist me add karne ke liye pehle login karein.");
// //         window.location.href = 'login.html'; 
// //         return; // Function yahi stop ho jayega
// //     }

// //     // C. User Logged in hai — Ab Heart Icon UI Update Karein
// //     const btn = event ? (event.currentTarget || event.target.closest('button')) : null;
// //     const icon = btn ? btn.querySelector('i') : null;
// //     if (!icon) return;

// //     const isCurrentlyWishlisted = icon.classList.contains('fa-solid');

// //     // UI Toggle (Red/Outline Heart)
// //     if (isCurrentlyWishlisted) {
// //         icon.classList.remove('fa-solid', 'text-red-500');
// //         icon.classList.add('fa-regular');
// //     } else {
// //         icon.classList.remove('fa-regular');
// //         icon.classList.add('fa-solid', 'text-red-500');
// //     }

// //     // D. Backend Database Sync (API Call)
// //     try {

// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${token}`
// //             },
// //             body: JSON.stringify({ userId, productId })
// //         });

// //         const data = await response.json();
// //         if (!response.ok) throw new Error(data.message || 'Wishlist update failed');

// //     } catch (error) {
// //         console.error("Wishlist Sync Error:", error);
        
// //         // Error aane par Heart Icon ko pehle jaisa wapas kar dein
// //         if (isCurrentlyWishlisted) {
// //             icon.classList.remove('fa-regular');
// //             icon.classList.add('fa-solid', 'text-red-500');
// //         } else {
// //             icon.classList.remove('fa-solid', 'text-red-500');
// //             icon.classList.add('fa-regular');
// //         }
// //         alert("Wishlist update karne me problem aayi. Server log check karein.");
// //     }
// // }




// // async function syncCartWithBackend(productId, title, price, image, quantity = 1) {
// //     const userId = localStorage.getItem('userId') || 'guest_user';

// //     try {

// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify({
// //                 userId: userId,
// //                 productId: productId,
// //                 title: title,
// //                 price: Number(price),
// //                 image: image,
// //                 quantity: Number(quantity)
// //             })
// //         });
// //     } catch (error) {
// //         console.log("Backend offline, cart saved locally.");
// //     }
// // }

// // 1. PRODUCTS LOAD & RENDER FUNCTION
// async function loadProducts() {
//     const gridContainer =
//         document.getElementById('productGrid') ||
//         document.getElementById('products-container') ||
//         document.getElementById('product-container');

//     if (!gridContainer) return; 

//     try {


//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const products = await response.json();

//         if (!products || products.length === 0) {
//             gridContainer.innerHTML = `
//                 <p class="text-center text-gray-500 py-10 col-span-full">
//                     Database me abhi koi product nahi hai.
//                 </p>
//             `;
//             return;
//         }

//         gridContainer.innerHTML = products.map(item => {
//             const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
//             const productImage = item.image || 'https://via.placeholder.com/150';
//             const productPrice = item.price || 0;

//             return `
//                 <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
//                     <div class="image-wrapper cursor-pointer relative">
//                         <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
//                             NEW
//                         </span>

//                         <img src="${productImage}" alt="${productTitle}" class="product-card-img w-full h-48 object-cover rounded mb-3">

//                         <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
//                             <!-- Wishlist Button -->
//                             <button type="button" onclick="Wishlist('${item._id}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
//                                 <i class="fa-regular fa-heart text-base"></i>
//                             </button>

//                             <!-- Share Button -->
//                             <button type="button" onclick="shareProduct('${item._id}', '${productTitle}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
//                                 <i class="fa-solid fa-share-nodes text-sm"></i>
//                             </button>
//                         </div>
//                     </div>

//                     <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
//                         ${item.title || item.name || 'Product'}
//                     </h3>

//                     <p class="text-gray-500 text-sm mb-3">
//                         ${item.category || 'General'}
//                     </p>

//                     <div class="amount_part flex flex-col gap-2">
//                         <span class="text-blue-600 font-bold text-xl">
//                             ₹${productPrice}
//                         </span>

//                         <button type="button" onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
//                             Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             `;
//         }).join('');

//     } catch (error) {
//         console.error("Product Error:", error);
//         if (gridContainer) {
//             gridContainer.innerHTML = `
//                 <p class="text-center text-red-500 py-10 col-span-full">
//                     Products load nahi ho pa rahe hain. Server verify karein.
//                 </p>
//             `;
//         }
//     }
// }

// // 2. ADD TO CART FUNCTION
// // async function addToCart(productId, title, price, image, quantity = 1, event = null) {
// //     if (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //     }

// //     const userId = localStorage.getItem('userId') || 'guest_user';

// //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

// //     if (existingIndex > -1) {
// //         cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
// //     } else {
// //         cart.push({ id: productId, _id: productId, title, name: title, price, image, quantity });
// //     }

// //     localStorage.setItem("cart", JSON.stringify(cart));

// //     try {

// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ userId, productId, quantity })
// //         });

// //         const data = await res.json();
// //         if (!res.ok) {
// //             console.warn('Backend Cart Sync Warning:', data.message || 'Cart save failed');
// //         }
// //     } catch (error) {
// //         console.warn("Backend Cart Sync Warning:", error);
// //     }

// //     if (typeof updateCartBadge === 'function') updateCartBadge();
// //     alert(`${title} cart me add ho gaya!`);
// // }


// async function addToCart(productId, title, price, image, quantity = 1, event = null) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }

//     const userId = localStorage.getItem('userId') || 'guest_user';
//     const token = localStorage.getItem("token") || localStorage.getItem("userToken");

//     // 1. LocalStorage update (Client side par instantly item save karein)
//     let cart = [];
//     try {
//         cart = JSON.parse(localStorage.getItem("cart")) || [];
//     } catch (e) {
//         cart = [];
//     }

//     const existingIndex = cart.findIndex(item => String(item.id || item._id) === String(productId));

//     if (existingIndex > -1) {
//         cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + Number(quantity);
//     } else {
//         cart.push({
//             id: productId,
//             _id: productId,
//             title: title,
//             name: title,
//             price: Number(price),
//             image: image,
//             quantity: Number(quantity)
//         });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     // 2. Header Badge Counter Update
//     if (typeof updateCartBadge === 'function') {
//         updateCartBadge();
//     }

//     // 3. Backend API Sync (Complete Payload)
//     try {
//         const headers = { 'Content-Type': 'application/json' };
//         if (token && token !== 'undefined' && token !== 'null') {
//             headers['Authorization'] = `Bearer ${token}`;
//         }


//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify({
//                 userId,
//                 productId,
//                 quantity: Number(quantity),
//                 title: title,
//                 name: title,
//                 price: Number(price),
//                 image: image
//             })
//         });

//         const data = await res.json();
//         if (!res.ok) {
//             console.log('Backend sync skipped:', data.message || 'Cart saved locally');
//         }
//     } catch (error) {
//         console.log("Backend offline, cart saved locally.");
//     }

//     alert(`${title} cart me add ho gaya!`);
// }

// // 3. WISHLIST TOGGLE FUNCTION (FIXED)
// // // 3. WISHLIST TOGGLE FUNCTION
// async function Wishlist(productId, event) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }

//     // A. LocalStorage se Auth Data Nikalein
//     const token = localStorage.getItem("token") || localStorage.getItem("userToken");
//     const userId = localStorage.getItem("userId");

//     // B. Strict Auth Check (SABSE PEHLE CHECK HOGA)
//     const isLoggedIn = token && userId && userId !== 'guest_user' && token !== 'undefined' && token !== 'null';

//     // Agar user logged in nahi hai toh turant login.html par redirect karein
//     if (!isLoggedIn) {
//         alert("Wishlist me add karne ke liye pehle login karein.");
//         window.location.href = 'login.html'; 
//         return; // Function yahi stop ho jayega
//     }

//     // C. User Logged in hai — Ab Heart Icon UI Update Karein
//     const btn = event ? (event.currentTarget || event.target.closest('button')) : null;
//     const icon = btn ? btn.querySelector('i') : null;
//     if (!icon) return;

//     const isCurrentlyWishlisted = icon.classList.contains('fa-solid');

//     // UI Toggle (Red/Outline Heart)
//     if (isCurrentlyWishlisted) {
//         icon.classList.remove('fa-solid', 'text-red-500');
//         icon.classList.add('fa-regular');
//     } else {
//         icon.classList.remove('fa-regular');
//         icon.classList.add('fa-solid', 'text-red-500');
//     }

//     // D. Backend Database Sync (API Call)
//     try {

//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ userId, productId })
//         });

//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message || 'Wishlist update failed');

//     } catch (error) {
//         console.error("Wishlist Sync Error:", error);
        
//         // Error aane par Heart Icon ko pehle jaisa wapas kar dein
//         if (isCurrentlyWishlisted) {
//             icon.classList.remove('fa-regular');
//             icon.classList.add('fa-solid', 'text-red-500');
//         } else {
//             icon.classList.remove('fa-solid', 'text-red-500');
//             icon.classList.add('fa-regular');
//         }
//         alert("Wishlist update karne me problem aayi. Server log check karein.");
//     }
// }




// async function syncCartWithBackend(productId, title, price, image, quantity = 1) {
//     const userId = localStorage.getItem('userId') || 'guest_user';

//     try {

//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: userId,
//                 productId: productId,
//                 title: title,
//                 price: Number(price),
//                 image: image,
//                 quantity: Number(quantity)
//             })
//         });
//     } catch (error) {
//         console.log("Backend offline, cart saved locally.");
//     }
// }

// // Button Click Event Handler
// function handleCartClick(index, event) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }
//     const product = window.allProducts[index];
//     if (product) {
//         addToCart(product);
//     }
// }

// // 2. MAIN ADD TO CART FUNCTION (MONGODB SYNC)
// async function addToCart(product) {
//     const userId = localStorage.getItem('userId') || 'guest_user';

//     const cartData = {
//         userId: userId,
//         productId: product._id || product.id,
//         title: product.title || product.name,
//         price: Number(product.price) || 0,
//         image: product.image || '',
//         quantity: 1
//     };

//     // A. LocalStorage me save karein
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(item => String(item.id || item._id || item.productId) === String(cartData.productId));

//     if (existingIndex > -1) {
//         cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + 1;
//     } else {
//         cart.push(cartData);
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));

//     if (typeof updateCartBadge === 'function') updateCartBadge();

//     // B. MongoDB Backend me sync karein
//     try {

//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(cartData)
//         });

//         const result = await response.json();
//         console.log("MongoDB Sync Response:", result);
//     } catch (err) {
//         console.error("Fetch Error:", err);
//     }

//     alert(`${cartData.title} cart me add ho gaya!`);
// }

// // Page load hone par run karein
// document.addEventListener('DOMContentLoaded', loadProducts);


// // Backend Route (Express.js)
// app.post('/api/products/share/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { platform } = req.body; // WhatsApp, Facebook, Copy Link etc.

//         // MongoDB me Product ka shareCount 1 se badhana
//         await Product.findByIdAndUpdate(id, { 
//             $inc: { shareCount: 1 } 
//         });

//         res.json({ success: true, message: "Share tracked successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Tracking failed" });
//     }
// });




// // Schema variable name change (e.g., shareProductSchema)
// const shareProductSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String },
//     category: { type: String },

//     // Total shares tracking count
//     shareCount: { type: Number, default: 0 },

//     // Individual platform breakdown
//     sharesByPlatform: {
//         whatsapp: { type: Number, default: 0 },
//         facebook: { type: Number, default: 0 },
//         copyLink: { type: Number, default: 0 },
//         gmail: { type: Number, default: 0 },
//         sms: { type: Number, default: 0 },
//         linkedin: { type: Number, default: 0 }
//     }
// }, { timestamps: true });

// // Model export name update
// module.exports = mongoose.model('ShareProduct', shareProductSchema);



 
async function addToCart(productId, title, price, image, quantity = 1, event = null) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
 
    const userId = localStorage.getItem('userId') || 'guest_user';
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
 
    // 1. LocalStorage update (Client side par instantly item save karein)
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
        cart = [];
    }
 
    const existingIndex = cart.findIndex(item => String(item.id || item._id) === String(productId));
 
    if (existingIndex > -1) {
        cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + Number(quantity);
    } else {
        cart.push({
            id: productId,
            _id: productId,
            title: title,
            name: title,
            price: Number(price),
            image: image,
            quantity: Number(quantity)
        });
    }
 
    localStorage.setItem("cart", JSON.stringify(cart));
 
    // 2. Header Badge Counter Update
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
 
    // 3. Backend API Sync (Complete Payload)
    try {
        const headers = { 'Content-Type': 'application/json' };
        if (token && token !== 'undefined' && token !== 'null') {
            headers['Authorization'] = `Bearer ${token}`;
        }

            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                userId,
                productId,
                quantity: Number(quantity),
                title: title,
                name: title,
                price: Number(price),
                image: image
            })
        });
 
        const data = await res.json();
        if (!res.ok) {
            console.log('Backend sync skipped:', data.message || 'Cart saved locally');
        }
    } catch (error) {
        console.log("Backend offline, cart saved locally.");
    }
 
    alert(`${title} cart me add ho gaya!`);
}
 
// 3. WISHLIST TOGGLE FUNCTION (FIXED)
// // 3. WISHLIST TOGGLE FUNCTION
async function Wishlist(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
 
    // A. LocalStorage se Auth Data Nikalein
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
 
    // B. Strict Auth Check (SABSE PEHLE CHECK HOGA)
    const isLoggedIn = token && userId && userId !== 'guest_user' && token !== 'undefined' && token !== 'null';
 
    // Agar user logged in nahi hai toh turant login.html par redirect karein
    if (!isLoggedIn) {
        alert("Wishlist me add karne ke liye pehle login karein.");
        window.location.href = 'login.html';
        return; // Function yahi stop ho jayega
    }
 
    // C. User Logged in hai — Ab Heart Icon UI Update Karein
    const btn = event ? (event.currentTarget || event.target.closest('button')) : null;
    const icon = btn ? btn.querySelector('i') : null;
    if (!icon) return;
 
    const isCurrentlyWishlisted = icon.classList.contains('fa-solid');
 
    // UI Toggle (Red/Outline Heart)
    if (isCurrentlyWishlisted) {
        icon.classList.remove('fa-solid', 'text-red-500');
        icon.classList.add('fa-regular');
    } else {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-red-500');
    }
 
    // D. Backend Database Sync (API Call)
    try {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, productId })
        });
 
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Wishlist update failed');
 
    } catch (error) {
        console.error("Wishlist Sync Error:", error);
       
        // Error aane par Heart Icon ko pehle jaisa wapas kar dein
        if (isCurrentlyWishlisted) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid', 'text-red-500');
        } else {
            icon.classList.remove('fa-solid', 'text-red-500');
            icon.classList.add('fa-regular');
        }
        alert("Wishlist update karne me problem aayi. Server log check karein.");
    }
}
 
 
 
 
async function syncCartWithBackend(productId, title, price, image, quantity = 1) {
    const userId = localStorage.getItem('userId') || 'guest_user';
 
    try {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                title: title,
                price: Number(price),
                image: image,
                quantity: Number(quantity)
            })
        });
    } catch (error) {
        console.log("Backend offline, cart saved locally.");
    }
}
 
 
 
// Button Click Event Handler
function handleCartClick(index, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const product = window.allProducts[index];
    if (product) {
        addToCart(product);
    }
}
 
// 2. MAIN ADD TO CART FUNCTION (MONGODB SYNC)
async function addToCart(product) {
    const userId = localStorage.getItem('userId') || 'guest_user';
 
    const cartData = {
        userId: userId,
        productId: product._id || product.id,
        title: product.title || product.name,
        price: Number(product.price) || 0,
        image: product.image || '',
        quantity: 1
    };
 
    // A. LocalStorage me save karein
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => String(item.id || item._id || item.productId) === String(cartData.productId));
 
    if (existingIndex > -1) {
        cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 1) + 1;
    } else {
        cart.push(cartData);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
 
    if (typeof updateCartBadge === 'function') updateCartBadge();
 
    // B. MongoDB Backend me sync karein
    try {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartData)
        });
 
        const result = await response.json();
        console.log("MongoDB Sync Response:", result);
    } catch (err) {
        console.error("Fetch Error:", err);
    }
 
    alert(`${cartData.title} cart me add ho gaya!`);
}
 
// Page load hone par run karein
document.addEventListener('DOMContentLoaded', loadProducts);
 
 
// Backend Route (Express.js)
app.post('/api/products/share/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { platform } = req.body; // WhatsApp, Facebook, Copy Link etc.
 
        // MongoDB me Product ka shareCount 1 se badhana
        await Product.findByIdAndUpdate(id, {
            $inc: { shareCount: 1 }
        });
 
        res.json({ success: true, message: "Share tracked successfully" });
    } catch (error) {
        res.status(500).json({ error: "Tracking failed" });
    }
});
 
 
 
 
// Schema variable name change (e.g., shareProductSchema)
const shareProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
 
    // Total shares tracking count
    shareCount: { type: Number, default: 0 },
 
    // Individual platform breakdown
    sharesByPlatform: {
        whatsapp: { type: Number, default: 0 },
        facebook: { type: Number, default: 0 },
        copyLink: { type: Number, default: 0 },
        gmail: { type: Number, default: 0 },
        sms: { type: Number, default: 0 },
        linkedin: { type: Number, default: 0 }
    }
}, { timestamps: true });
 
// Model export name update
module.exports = mongoose.model('ShareProduct', shareProductSchema);



document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

// 1. Fetch Data from API
async function fetchProducts() {
  const container = document.getElementById("products-container");

  // Loading State / Skeleton UI
  container.innerHTML = `
    <div class="col-span-full text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff0055] border-t-transparent"></div>
      <p class="text-gray-500 mt-2">Loading products...</p>
    </div>
  `;

  try {
    // FakeStore API (Replace with your actual API endpoint)
    const response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
    
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-red-500">
        <p class="font-semibold">Failed to load products. Please try again later.</p>
      </div>
    `;
  }
}

// 2. Render Cards Dynamically
function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = ""; // Container reset

  if (products.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500">No products found.</p>`;
    return;
  }

  products.forEach((product) => {
    // API data fields extraction with fallback
    const { id, title, price, image, category } = product;

    const productCard = `
      <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col justify-between">
        <!-- Image Container -->
        <div class="relative h-[280px] overflow-hidden bg-gray-100 flex items-center justify-center p-4">
          <img 
            src="${image}" 
            alt="${title}" 
            class="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          >
          <span class="absolute top-3 left-3 bg-[#ff0055] text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            ${category || 'Men'}
          </span>
        </div>

        <!-- Product Details -->
        <div class="p-4 flex flex-col flex-grow justify-between">
          <div>
            <span class="text-xs text-gray-400 uppercase tracking-wider">${category || 'Clothing'}</span>
            <h3 class="text-lg font-semibold text-gray-800 mt-1 truncate" title="${title}">
              ${title}
            </h3>
          </div>

          <div class="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
            <span class="text-xl font-bold text-gray-900">$${parseFloat(price).toFixed(2)}</span>
            <button 
              onclick="addToCart('${id}', '${escapeQuotes(title)}', ${price}, '${escapeQuotes(image)}', event)" 
              class="bg-[#ff0055] hover:bg-[#d90048] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", productCard);
  });
}

// Helper to escape single quotes in product titles for onclick handlers
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

function addToCart(id, title, price, image, event = null) {
  if (typeof window.TailStoreCart?.add !== 'function') {
    console.error('Cart client has not loaded.');
    alert('Cart abhi load nahi hua. Page refresh karke dobara try karein.');
    return;
  }

  return window.TailStoreCart.add({ id, title, price, image }, event);
}
 
 
//  const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: String,
//     images: [String] // Array of image URLs/paths stored in DB
// });

// // Model create karke export karna zaroori hai
// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
 
 
 
 
 
 
 
 

 
 




