


async function renderDynamicCart() {

    const cartContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const grandTotalEl = document.getElementById('grandTotal');

    if (!cartContainer) {
        console.error("cartItems container nahi mila!");
        return;
    }

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart?userId=megha_user'
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const cart = await response.json();

        console.log("Cart Data:", cart);

        if (!cart.items || cart.items.length === 0) {

            cartContainer.innerHTML = `
                <div class="bg-white rounded-xl border p-10 text-center">

                    <div class="text-5xl mb-4">
                        🛒
                    </div>

                    <h2 class="text-xl font-bold text-gray-800">
                        Your Cart is Empty
                    </h2>

                    <p class="text-gray-500 mt-2">
                        Add some products to your cart.
                    </p>

                    <a
                        href="index.html"
                        class="inline-block mt-6 bg-[#FF0043] text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Continue Shopping
                    </a>

                </div>
            `;

            subtotalEl.innerText = '₹0';
            grandTotalEl.innerText = '₹0';

            return;
        }


        let subtotal = 0;


        cartContainer.innerHTML = cart.items.map(item => {

            const product = item.productId;

            if (!product) {
                return '';
            }

            const itemTotal = product.price * item.quantity;

            subtotal += itemTotal;


            return `
                <div class="bg-white border rounded-xl p-4 shadow-sm">

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <!-- Product -->
                        <div class="flex items-center gap-4">

                            <img
                                src="${product.image || 'https://via.placeholder.com/100'}"
                                alt="${product.name || 'Product'}"
                                class="w-24 h-24 object-cover rounded-lg"
                            >

                            <div>

                                <h3 class="text-lg font-bold text-gray-900">
                                    ${product.name || product.title}
                                </h3>

                                <p class="text-gray-500 text-sm mt-1">
                                    ${product.category || 'General'}
                                </p>

                                <p class="text-[#FF0043] font-bold mt-2">
                                    ₹${product.price}
                                </p>

                            </div>

                        </div>


                        <!-- Quantity + Total -->
                        <div class="flex items-center gap-4">

                            <div class="flex items-center border rounded-lg overflow-hidden">

                                <button
                                    onclick="updateQuantity('${product._id}', 'decrease')"
                                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                                >
                                    −
                                </button>

                                <span class="px-4 py-2 font-semibold">
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="updateQuantity('${product._id}', 'increase')"
                                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                                >
                                    +
                                </button>

                            </div>


                            <span class="font-bold text-gray-900 min-w-[80px] text-right">
                                ₹${itemTotal}
                            </span>


                            <button
                                onclick="removeFromCart('${product._id}')"
                                class="text-red-500 hover:text-red-700 text-xl"
                                title="Remove"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join('');


        subtotalEl.innerText = `₹${subtotal}`;
        grandTotalEl.innerText = `₹${subtotal}`;


        // Navbar cart badge
        updateCartBadge(cart);


    } catch (error) {

        console.error("Cart Error:", error);

        cartContainer.innerHTML = `
            <div class="text-center py-10 text-red-500">
                Cart load nahi ho pa raha hai.
            </div>
        `;
    }
}



// Increase / decrease quantity
async function updateQuantity(productId, action) {

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart/update',
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    userId: 'megha_user',
                    productId: productId,
                    action: action
                })
            }
        );

        if (!response.ok) {
            throw new Error('Quantity update failed');
        }

        await renderDynamicCart();

    } catch (error) {

        console.error("Quantity Update Error:", error);

    }
}



// Remove product
async function removeFromCart(productId) {

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart/remove',
            {
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    userId: 'megha_user',
                    productId: productId
                })
            }
        );

        if (!response.ok) {
            throw new Error('Remove failed');
        }

        await renderDynamicCart();

    } catch (error) {

        console.error("Remove Item Error:", error);

    }
}



// Cart badge
function updateCartBadge(cart) {

    const badge = document.getElementById('cart-badge-count');

    if (!badge) {
        return;
    }

    const totalItems = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    badge.innerText = totalItems;
}



// Page load
document.addEventListener('DOMContentLoaded', () => {

    renderDynamicCart();

}); 






    // // 1. Navbar Badge Update Function
    // async function updateNavbarCartBadge() {
    //     const badge = document.getElementById('cart-badge-count');
    //     if (!badge) return;

    //     try {
    //         const response = await fetch('http://localhost:5500/api/cart?userId=guest_user');
            
    //         if (!response.ok) {
    //             badge.innerText = '0';
    //             return;
    //         }

    //         const cart = await response.json();

    //         if (cart && cart.items && cart.items.length > 0) {
    //             const totalCount = cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
    //             badge.innerText = totalCount;
    //         } else {
    //             badge.innerText = '0';
    //         }
    //     } catch (error) {
    //         console.error("Navbar badge update error:", error);
    //         badge.innerText = '0';
    //     }
    // }

    // // 2. Add To Cart Function (Real-Time Live Sync)
    // async function addToCart(productId, event) {
    //     if (event) event.preventDefault(); // Form submit refresh roke

    //     try {
    //         const response = await fetch('http://localhost:5500/api/cart/add', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 userId: 'guest_user',
    //                 productId: productId,
    //                 quantity: 1
    //             })
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error(data.message || 'Product add nahi hua');
    //         }

    //         // 🌟 REAL-TIME SYNC: Click karte hi bina refresh kiye badge count instantly badhega
    //         await updateNavbarCartBadge();

    //         alert(data.message || 'Product Cart me add ho gaya!');

    //     } catch (error) {
    //         console.error("Add to Cart Error:", error);
    //         alert("Product add karne me issue aaya.");
    //     }
    // }

    // // 3. Remove Item Function
    // async function removeFromCart(productId, event) {
    //     if (event) event.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:5500/api/cart/remove', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 userId: 'guest_user',
    //                 productId: productId
    //             })
    //         });

    //         if (response.ok) {
    //             // Delete hote hi instant badge sync
    //             await updateNavbarCartBadge();
                
    //             if (typeof loadCartPage === 'function') {
    //                 loadCartPage();
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Remove error:", error);
    //     }
    // }

    // // 4. Page Load Sync
    // document.addEventListener('DOMContentLoaded', () => {
    //     if (typeof loadProducts === 'function') {
    //         loadProducts();
    //     }
    //     updateNavbarCartBadge();
    // });


    // 1. Cart Page Data Fetch & Render Function
const API_URL = 'http://localhost:5500/api/cart';

// 1. MongoDB se Cart Load karna aur Display karna
async function loadCart() {
    const userId = localStorage.getItem('userId') || 'guest_user';
    const container = document.getElementById('cart-items-container');

    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const data = await response.json();
        
        let cartItems = [];
        if (data.success && data.cart && data.cart.items) {
            cartItems = data.cart.items;
            localStorage.setItem('cart', JSON.stringify(cartItems)); // Sync LocalStorage
        } else {
            cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        }

        renderCart(cartItems);
    } catch (error) {
        console.warn("Backend load failed, using local storage:", error);
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        renderCart(cartItems);
    }
}

// 2. Cart HTML Render Function
function renderCart(items) {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (!items || items.length === 0) {
        container.innerHTML = `<p class="text-center py-8">Aapka cart khali hai.</p>`;
        updateSummary(0);
        return;
    }

    let subtotal = 0;

    container.innerHTML = items.map(item => {
        const pId = item.productId || item.id || item._id;
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        subtotal += itemTotal;

        return `
            <div class="flex items-center justify-between border rounded-lg p-4 mb-3 bg-white shadow-sm">
                <div class="flex items-center gap-4">
                    <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.title || 'Product'}" class="w-20 h-20 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-gray-800">${item.title || item.name || 'Product'}</h4>
                        <p class="text-sm text-gray-500">${item.category || ''}</p>
                        <p class="text-pink-600 font-bold">₹${item.price}</p>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <!-- Plus / Minus Quantity Control -->
                    <div class="flex items-center border rounded">
                        <button onclick="changeQuantity('${pId}', -1)" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold">-</button>
                        <span class="px-4 font-semibold">${item.quantity}</span>
                        <button onclick="changeQuantity('${pId}', 1)" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold">+</button>
                    </div>

                    <span class="font-bold text-gray-800 w-20 text-right">₹${itemTotal}</span>

                    <!-- Delete Button -->
                    <button onclick="removeItem('${pId}')" class="text-red-500 hover:text-red-700 p-2" title="Remove">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    updateSummary(subtotal);
}

// 3. Plus / Minus Quantity Update (+1 / -1) -> Sync MongoDB
async function changeQuantity(productId, delta) {
    const userId = localStorage.getItem('userId') || 'guest_user';

    try {
        const res = await fetch(`${API_URL}/update-quantity`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId, delta })
        });

        const data = await res.json();
        if (data.success) {
            loadCart(); // Page Refresh/Re-render after MongoDB update
        }
    } catch (error) {
        console.error("Quantity update error:", error);
    }
}

// 4. Delete Item from MongoDB Cart
async function removeItem(productId) {
    const userId = localStorage.getItem('userId') || 'guest_user';

    try {
        const res = await fetch(`${API_URL}/remove`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId })
        });

        const data = await res.json();
        if (data.success) {
            loadCart();
        }
    } catch (error) {
        console.error("Remove item error:", error);
    }
}

function updateSummary(subtotal) {
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (totalEl) totalEl.innerText = `₹${subtotal}`;
}

document.addEventListener('DOMContentLoaded', loadCart);




const mongoose = require('mongoose');

// Cart item schema with proper types
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: 'guest_user'
    },
    items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);


const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: 'guest_user'
    },
    items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);



