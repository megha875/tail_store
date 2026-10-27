const API_BASE = 'http://localhost:5502';
const userId = localStorage.getItem('userId');

document.addEventListener('DOMContentLoaded', () => {
    // Default Tab Load (Profile Overview)
    switchTab('profile');

    // Sidebar Button Click Listener
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Active Button Styling Toggle
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('bg-gray-100', 'font-bold'));
            btn.classList.add('bg-gray-100', 'font-bold');

            switchTab(targetTab);
        });
    });
});

async function switchTab(tab) {
    const contentArea = document.getElementById('dashboard-main-content');
    contentArea.innerHTML = '<p class="text-gray-400">Loading...</p>';

    switch (tab) {
        case 'profile':
            loadProfileView(contentArea);
            break;
        case 'cart':
            loadCartView(contentArea);
            break;
        case 'orders':
            await loadOrdersView(contentArea);
            break;
        case 'wishlist':
            await loadWishlistView(contentArea);
            break;
        case 'addresses':
            await loadAddressesView(contentArea);
            break;
        default:
            contentArea.innerHTML = '<p class="text-gray-500">Section not found.</p>';
    }
}

// 1. Profile Overview Panel
function loadProfileView(container) {
    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Profile Overview</h2>
        <form id="profileForm" class="space-y-4 max-w-md">
            <div>
                <label class="block text-sm font-semibold mb-1">Full Name</label>
                <input type="text" id="profName" class="w-full border rounded-lg p-2.5" placeholder="Your Name">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-1">Email</label>
                <input type="email" id="profEmail" class="w-full border rounded-lg p-2.5" placeholder="Your Email">
            </div>
            <button type="submit" class="bg-[#FF0043] text-white px-5 py-2.5 rounded-lg font-semibold">Save Profile</button>
        </form>
    `;
}

// 2. Shopping Cart View
function loadCartView(container) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        container.innerHTML = `
            <h2 class="text-2xl font-bold mb-2">My Shopping Cart</h2>
            <p class="text-gray-500 mb-4">Your cart is empty.</p>
            <a href="shop.html" class="inline-block bg-[#FF0043] text-white px-5 py-2 rounded-lg font-semibold">Continue shopping</a>
        `;
        return;
    }

    let itemsHTML = cart.map(item => `
        <div class="flex items-center justify-between border-b py-3">
            <div class="flex items-center gap-3">
                <img src="${item.image}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">Qty: ${item.qty} x ₹${item.price}</p>
                </div>
            </div>
            <span class="font-bold">₹${item.qty * item.price}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">My Shopping Cart</h2>
        <div class="space-y-2 mb-6">${itemsHTML}</div>
        <a href="cart.html" class="bg-[#FF0043] text-white px-6 py-2.5 rounded-lg font-semibold">Go to Cart Page</a>
    `;
}

// 3. Orders View (MongoDB API)
async function loadOrdersView(container) {
    try {
        const res = await fetch(`${API_BASE}/api/orders/user/${userId}`);
        const orders = await res.json();

        if (!orders || orders.length === 0) {
            container.innerHTML = `<h2 class="text-2xl font-bold mb-2">My Orders</h2><p class="text-gray-500">Aapne abhi tak koi order nahi kiya hai.</p>`;
            return;
        }

        let ordersList = orders.map(ord => `
            <div class="border rounded-xl p-4 mb-3">
                <div class="flex justify-between text-sm font-semibold mb-2">
                    <span>Order ID: #${ord._id}</span>
                    <span class="text-green-600">${ord.status || 'Processing'}</span>
                </div>
                <p class="text-sm text-gray-600">Total Amount: ₹${ord.totalAmount}</p>
            </div>
        `).join('');

        container.innerHTML = `<h2 class="text-2xl font-bold mb-4">My Orders</h2><div>${ordersList}</div>`;
    } catch (err) {
        container.innerHTML = `<h2 class="text-2xl font-bold mb-2">My Orders</h2><p class="text-red-500">Orders fetch karne me error aayi.</p>`;
    }
}

// 4. Wishlist View
async function loadWishlistView(container) {
    try {
        const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);
        const wishlist = await res.json();

        if (!wishlist || wishlist.items?.length === 0) {
            container.innerHTML = `<h2 class="text-2xl font-bold mb-2">Wishlist</h2><p class="text-gray-500">Aapki wishlist me koi item nahi hai.</p>`;
            return;
        }

        container.innerHTML = `<h2 class="text-2xl font-bold mb-4">Wishlist</h2><p class="text-gray-700">Wishlist Items: ${wishlist.items.length}</p>`;
    } catch (err) {
        container.innerHTML = `<h2 class="text-2xl font-bold mb-2">Wishlist</h2><p class="text-gray-500">No wishlist items found.</p>`;
    }
}

// 5. Saved Addresses View (MongoDB API)
async function loadAddressesView(container) {
    try {
        const res = await fetch(`${API_BASE}/api/profile/${userId}`);
        const data = await res.json();

        container.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Saved Addresses</h2>
            <div class="border p-4 rounded-xl max-w-md">
                <p class="text-sm font-semibold">${data.name || 'User Address'}</p>
                <p class="text-sm text-gray-600 mt-1">${data.address || 'Address updated nahi hai.'}</p>
                <p class="text-xs text-gray-400 mt-2">Phone: ${data.phone || 'N/A'}</p>
            </div>
        `;
    } catch (err) {
        container.innerHTML = `<h2 class="text-2xl font-bold mb-2">Saved Addresses</h2><p class="text-gray-500">Address fetch nahi ho saka.</p>`;
    }
}