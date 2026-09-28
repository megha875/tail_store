// const productContainer = document.getElementById("product-container");

// async function loadProducts() {
//     const gridContainer =
//         document.getElementById('productGrid') ||
//         document.getElementById('products-container') ||
//         document.getElementById('product-container');

//     if (!gridContainer) {
//         console.error("Product container nahi mila!");
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:5500/api/products');

//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const products = await response.json();
//         console.log("MongoDB Products:", products);

//         if (!products || products.length === 0) {
//             gridContainer.innerHTML = `
//                 <p class="text-center text-gray-500 py-10 col-span-full">
//                     Database me abhi koi product nahi hai.
//                 </p>
//             `;
//             return;
//         }

//         gridContainer.innerHTML = products.map(item => `
//             <div
//                 class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between"
//                 data-category="${item.category || ''}"
//             >
//                 <div class="image-wrapper cursor-pointer">
//                     <img
//                         src="${item.image || 'https://via.placeholder.com/150'}"
//                         alt="${item.title || item.name || 'Product'}"
//                         class="product-card-img w-full h-48 object-cover rounded mb-3"
//                     >
//                 </div>

//                 <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
//                     ${item.title || item.name || 'Product'}
//                 </h3>

//                 <p class="text-gray-500 text-sm mb-3">
//                     ${item.category || 'General'}
//                 </p>

//                 <div class="flex justify-between items-center mt-2">
//                     <span class="text-blue-600 font-bold text-xl">
//                         ₹${item.price}
//                     </span>

//                     <!-- YAHAN TYPE="BUTTON" AUR EVENT PASS KIYA HAI -->
//                     <button
//                         type="button"
//                         onclick="addToCart('${item._id}', 1, event)"
//                         class="bg-[#ff0055] text-white px-3 py-1.5 rounded text-sm hover:bg-pink-700 transition"
//                     >
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         `).join('');

//     } catch (error) {
//         console.error("Product Error:", error);
//         gridContainer.innerHTML = `
//             <p class="text-center text-red-500 py-10 col-span-full">
//                 Products load nahi ho pa rahe hain.
//             </p>
//         `;
//     }
// }

// // Page load
// document.addEventListener('DOMContentLoaded', () => {
//     loadProducts();
// });

// // ADD TO CART FUNCTION (Updated to accept event & quantity)
// async function addToCart(productId, quantity = 1, event = null) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }

//     try {
//         const response = await fetch('http://localhost:5500/api/cart/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: 'guest_user',
//                 productId: productId,
//                 quantity: quantity
//             })
//         });

//         const data = await response.json();
//         console.log("Cart Response:", data);

//         if (!response.ok) {
//             throw new Error(data.message || 'Product cart me add nahi hua');
//         }

//         // Navbar badge Update function (agar aapne banaya hua ho)
//         if (typeof updateCartBadge === 'function') {
//             updateCartBadge();
//         }

//         // alert(data.message || 'Product Cart me add ho gaya!');

//     } catch (error) {
//         console.error("Add to Cart Error:", error);
//         alert("Product cart me add nahi ho pa raha hai.");
//     }
// }

// 1. Top-level element definition hata diya gaya hai taaki DOM issue na aaye

// async function loadProducts() {
//     // Container elements check karein
//     const gridContainer =
//         document.getElementById('productGrid') ||
//         document.getElementById('products-container') ||
//         document.getElementById('product-container');

//     // 🛑 Safe Guard: Agar page par product grid nahi hai (e.g. Checkout / Order Success page), toh chupchaap return ho jaye
//     if (!gridContainer) {
//         return; 
//     }

//     try {
//         const response = await fetch('http://localhost:5500/api/products');

//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const products = await response.json();
//         console.log("MongoDB Products:", products);

//         if (!products || products.length === 0) {
//             gridContainer.innerHTML = `
//                 <p class="text-center text-gray-500 py-10 col-span-full">
//                     Database me abhi koi product nahi hai.
//                 </p>
//             `;
//             return;
//         }

//         // Products Render
//         gridContainer.innerHTML = products.map(item => {
//             // Escaped product data for localStorage sync
//             const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
//             const productImage = item.image || 'https://via.placeholder.com/150';
//             const productPrice = item.price || 0;

//             return `
                
// <div
//     class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between"
//     data-category="${item.category || ''}"
// >
//     <div class="image-wrapper cursor-pointer">
//         <img
//             src="${productImage}"
//             alt="${productTitle}"
//             class="product-card-img w-full h-48 object-cover rounded mb-3"
//         >
//     </div>

//     <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
//         ${item.title || item.name || 'Product'}
//     </h3>

//     <p class="text-gray-500 text-sm mb-3">
//         ${item.category || 'General'}
//     </p>

//     <!-- Price aur Button ko Ek ke niche ek laane ke liye Updated Div -->
//     <div class="amount_part flex flex-col gap-2 ">
//         <span class="text-blue-600 font-bold text-xl">
//             ₹${productPrice}
//         </span>

//         <button
//             type="button"
//             onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)"
//             class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
        
//             Add to Cart
//         </button>
//     </div>
// </div>


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

// // Page Load event
// document.addEventListener('DOMContentLoaded', () => {
//     loadProducts();
// });


// // 🔹 ADD TO CART FUNCTION (Backend API + LocalStorage dono sync honge)
// async function addToCart(productId, title, price, image, quantity = 1, event = null) {
//     if (event) {
//         event.preventDefault();
//         event.stopPropagation();
//     }

//     // 1. LocalStorage Cart Update (Checkout page ke liye zaruri)
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

//     if (existingIndex > -1) {
//         cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
//     } else {
//         cart.push({
//             id: productId,
//             _id: productId,
//             title: title,
//             name: title,
//             price: price,
//             image: image,
//             quantity: quantity
//         });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));

//     // 2. Backend Server Sync
//     try {
//         const response = await fetch('http://localhost:5500/api/cart/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: 'guest_user',
//                 productId: productId,
//                 quantity: quantity
//             })
//         });

//         const data = await response.json();
//         console.log("Cart Response:", data);

//     } catch (error) {
//         console.warn("Backend Cart Sync Warning (Offline/Error):", error);
//     }

//     // 3. UI Badge Update
//     if (typeof updateCartBadge === 'function') {
//         updateCartBadge();
//     }

//     alert(`${title} cart me add ho gaya!`);
// }


async function loadProducts() {
    // Container elements check karein
    const gridContainer =
        document.getElementById('productGrid') ||
        document.getElementById('products-container') ||
        document.getElementById('product-container');

    // 🛑 Safe Guard: Agar page par product grid nahi hai (e.g. Checkout / Order Success page), toh chupchaap return ho jaye
    if (!gridContainer) {
        return; 
    }

    try {
        const response = await fetch('http://localhost:5500/api/products');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();
        console.log("MongoDB Products:", products);

        if (!products || products.length === 0) {
            gridContainer.innerHTML = `
                <p class="text-center text-gray-500 py-10 col-span-full">
                    Database me abhi koi product nahi hai.
                </p>
            `;
            return;
        }

        // Products Render
        gridContainer.innerHTML = products.map(item => {
            // Escaped product data for localStorage sync
            const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
            const productImage = item.image || 'https://via.placeholder.com/150';
            const productPrice = item.price || 0;

            return `
                
<div
    class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between"
    data-category="${item.category || ''}"
>
    <div class="image-wrapper cursor-pointer relative">
        <!-- 🏷️ Left side par NEW tag -->
        <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
            NEW
        </span>

        <img
            src="${productImage}"
            alt="${productTitle}"
            class="product-card-img w-full h-48 object-cover rounded mb-3"
        >

        <!-- 🌟 Right side par Upar Wishlist aur Niche Share Icon -->
        <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
            <!-- 1. Wishlist Icon -->
            <button
                type="button"
                onclick="toggleWishlist('${item._id}', event)"
                class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105"
                title="Add to Wishlist"
            >
                <i class="fa-regular fa-heart text-base"></i>
            </button>

            <!-- 2. Share Icon -->
            <button
                type="button"
                onclick="shareProduct('${item._id}', '${productTitle}', event)"
                class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105"
                title="Share Product"
            >
                <i class="fa-solid fa-share-nodes text-sm"></i>
            </button>
        </div>
    </div>

    <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
        ${item.title || item.name || 'Product'}
    </h3>

    <p class="text-gray-500 text-sm mb-3">
        ${item.category || 'General'}
    </p>

    <!-- Price aur Button ko Ek ke niche ek laane ke liye Updated Div -->
    <div class="amount_part flex flex-col gap-2 ">
        <span class="text-blue-600 font-bold text-xl">
            ₹${productPrice}
        </span>

        <button
            type="button"
            onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)"
            class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
        
            Add to Cart
        </button>
    </div>
</div>


            `;
        }).join('');

    } catch (error) {
        console.error("Product Error:", error);
        if (gridContainer) {
            gridContainer.innerHTML = `
                <p class="text-center text-red-500 py-10 col-span-full">
                    Products load nahi ho pa rahe hain. Server verify karein.
                </p>
            `;
        }
    }
}

// Page Load event
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});


// 🔹 ADD TO CART FUNCTION (Backend API + LocalStorage dono sync honge)
async function addToCart(productId, title, price, image, quantity = 1, event = null) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // 1. LocalStorage Cart Update (Checkout page ke liye zaruri)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
    } else {
        cart.push({
            id: productId,
            _id: productId,
            title: title,
            name: title,
            price: price,
            image: image,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 2. Backend Server Sync
    try {
        const response = await fetch('http://localhost:5500/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 'guest_user',
                productId: productId,
                quantity: quantity
            })
        });

        const data = await response.json();
        console.log("Cart Response:", data);

    } catch (error) {
        console.warn("Backend Cart Sync Warning (Offline/Error):", error);
    }

    // 3. UI Badge Update
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    alert(`${title} cart me add ho gaya!`);
}

// 🔹 WISHLIST TOGGLE FUNCTION
function toggleWishlist(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const icon = event.currentTarget.querySelector('i');
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('text-red-500');
}

// 🔹 SHARE PRODUCT FUNCTION
function shareProduct(productId, title, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const shareUrl = `${window.location.origin}/product.html?id=${productId}`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this product: ${title}`,
            url: shareUrl,
        }).catch((err) => console.log('Share canceled:', err));
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Product link copied to clipboard!');
        }).catch(err => console.error('Copy failed:', err));
    }
}