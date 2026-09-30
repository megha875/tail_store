

// 1. PRODUCTS LOAD & RENDER FUNCTION
async function loadProducts() {
    const gridContainer =
        document.getElementById('productGrid') ||
        document.getElementById('products-container') ||
        document.getElementById('product-container');

    if (!gridContainer) return; 

    try {
        const response = await fetch('http://localhost:5500/api/products');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        if (!products || products.length === 0) {
            gridContainer.innerHTML = `
                <p class="text-center text-gray-500 py-10 col-span-full">
                    Database me abhi koi product nahi hai.
                </p>
            `;
            return;
        }

        gridContainer.innerHTML = products.map(item => {
            const productTitle = (item.title || item.name || 'Product').replace(/'/g, "\\'");
            const productImage = item.image || 'https://via.placeholder.com/150';
            const productPrice = item.price || 0;

            return `
                <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
                    <div class="image-wrapper cursor-pointer relative">
                        <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                            NEW
                        </span>

                        <img src="${productImage}" alt="${productTitle}" class="product-card-img w-full h-48 object-cover rounded mb-3">

                        <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
                            <!-- Wishlist Button -->
                            <button type="button" onclick="Wishlist('${item._id}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
                                <i class="fa-regular fa-heart text-base"></i>
                            </button>

                            <!-- Share Button -->
                            <button type="button" onclick="shareProduct('${item._id}', '${productTitle}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
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

                    <div class="amount_part flex flex-col gap-2">
                        <span class="text-blue-600 font-bold text-xl">
                            ₹${productPrice}
                        </span>

                        <button type="button" onclick="addToCart('${item._id}', '${productTitle}', ${productPrice}, '${productImage}', 1, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
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

// 2. ADD TO CART FUNCTION
async function addToCart(productId, title, price, image, quantity = 1, event = null) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productId || item._id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
    } else {
        cart.push({ id: productId, _id: productId, title, name: title, price, image, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    try {
        await fetch('http://localhost:5500/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'guest_user', productId, quantity })
        });
    } catch (error) {
        console.warn("Backend Cart Sync Warning:", error);
    }

    if (typeof updateCartBadge === 'function') updateCartBadge();
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
        const response = await fetch('http://localhost:5500/api/wishlist', {
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