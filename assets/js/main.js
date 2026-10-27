const MAIN_API_BASE_URL = `http://${window.location.hostname}:5000/api`;

document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkoutForm');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = checkoutForm.querySelector('[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Placing Order...';
      }

      const orderPayload = {
        userId: localStorage.getItem('userId') || 'guest_user',
        customer: {
          fullName: document.getElementById('fullName')?.value || '',
          email: document.getElementById('shippingEmail')?.value || '',
          phone: document.getElementById('shippingPhone')?.value || '',
          deliveryAddress: [
            document.getElementById('shippingAddress')?.value,
            document.getElementById('shippingCity')?.value,
            document.getElementById('shippingState')?.value,
            document.getElementById('shippingZip')?.value
          ].filter(Boolean).join(', ')
        },
        paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'COD'
      };

      try {
        const response = await fetch(`${MAIN_API_BASE_URL}/orders/place`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || `Order save failed (HTTP ${response.status})`);
        }
        window.location.href = `order-success.html?orderId=${encodeURIComponent(data.orderId)}`;
      } catch (error) {
        console.error('Server connection error:', error);
        alert(error.message || 'Order save nahi ho saka. Server connection check karke dobara try karein.');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Place Order';
        }
      }
    });
  }
});
async function fetchProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();

  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(product => `
    <div class="max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm relative bg-white">
      <button 
        id="wishlist-btn-${product._id}" 
        onclick="handleWishlistToggle('${product._id}')" 
        class="wishlist-btn absolute top-3 right-3 p-2 rounded-full bg-gray-100 ${product.isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors duration-200 focus:outline-none"
        data-wishlisted="${product.isWishlisted}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current ${product.isWishlisted ? 'fill-current' : 'fill-none'} transition-colors duration-200" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded-md mb-3" />
      <h3 class="font-bold text-gray-800 text-lg">${product.title}</h3>
      <p class="text-gray-600">₹${product.price}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', fetchProducts);






document.addEventListener('DOMContentLoaded', () => {
    // Check karein ki user logged in hai ya nahi (localStorage mein userId ya token check karein)
    const userId = localStorage.getItem('userId') || localStorage.getItem('token');
    
    // Cart badge update karein
    updateCartBadge();

    if (userId) {
        // Agar user login hai, toh Register/Login buttons ko Profile link se replace karein
        const loginBtn = document.querySelector('a[href*="login.html"]');
        const registerBtn = document.querySelector('a[href*="register.html"]');
        
        if (loginBtn) loginBtn.style.display = 'none';
        
        if (registerBtn) {
            registerBtn.href = 'user-dashboard.html';
            registerBtn.innerText = 'Profile';
            registerBtn.classList.add('bg-red-600', 'text-white', 'px-4', 'py-2', 'rounded-full');
        }
    }
});

// Navbar ke cart icon par item count update karne ka function
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Navbar cart icon ka badge element
    const badge = document.querySelector('header a[href*="cart.html"] span, .fa-shopping-cart + span');
    if (badge) {
        badge.innerText = totalItems;
    }
}



// // Cart data backend se fetch karne ka function
// async function loadCart() {
//   try {
//     const response = await fetch('/api/cart?userId=guest_user');
//     const data = await response.json();

//     if (data && data.items) {
//       // Backend se mile items ko renderCartItems function me pass karein
//       renderCartItems(data.items);
//       updateOrderSummary(data.items); // Agar summary update karni ho
//     }
//   } catch (error) {
//     console.error('Cart load karne me error aaya:', error);
//     const cartContainer = document.getElementById('cart-items-container');
//     if (cartContainer) {
//       cartContainer.innerHTML = '<p class="text-danger">Cart load nahi ho pa raha hai.</p>';
//     }
//   }
// }

// // Render Function
// function renderCartItems(cartItems) {
//   const cartContainer = document.getElementById('cart-items-container');
  
//   if (!cartContainer) return;

//   if (!cartItems || cartItems.length === 0) {
//     cartContainer.innerHTML = '<p>Your cart is empty.</p>';
//     return;
//   }

//   cartContainer.innerHTML = cartItems.map(item => {
//     // Populate ke baad product info item.productId me hoti hai
//     const product = item.productId || {};
    
//     const name = product.name || 'Product';
//     const price = product.price || 0;
//     const image = product.image || 'https://via.placeholder.com/150';
//     const prodId = product._id || item.productId;

//     return `
//       <div class="cart-item" data-id="${prodId}">
//         <img src="${image}" alt="${name}" width="80" height="80" />
//         <div class="cart-item-details">
//           <h4>${name}</h4>
//           <p>Price: ₹${price}</p>
//           <p>Quantity: ${item.quantity}</p>
//         </div>
//       </div>
//     `;
//   }).join('');
// }

// // Page load hote hi cart fetch karne ke liye
// document.addEventListener('DOMContentLoaded', loadCart);




// script.js / main.js

// 1. Redirect Function (Ise top-level par rakhein)
function goToDetail(id) {
    window.location.href = `/product-detail.html?id=${id}`;
}

// 2. Aapka Fetching Code
fetch('/api/products') // Apne backend ka sahi API endpoint yahan likhein
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('product-container');
        if (!container) return; // Guard clause agar container Na ho
        
        container.innerHTML = '';

        products.forEach((product, index) => {
            const cardHTML = `
                <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${product.category}">
                    
                    <!-- Image Wrapper -->
                    <div onclick="goToDetail('${product._id}')" class="image-wrapper cursor-pointer relative">
                        <span class="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                            NEW
                        </span>

                        <img src="${product.image}" alt="${product.title}" class="product-card-img w-full h-48 object-cover rounded mb-3">

                        <!-- Action Buttons -->
                        <div class="social_icon absolute top-2 right-2 flex flex-col gap-2 z-10">
                            <button type="button" onclick="event.stopPropagation(); Wishlist('${product._id}', event)" class="wishlist-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Add to Wishlist">
                                <i class="fa-regular fa-heart text-base"></i>
                            </button>

                            <button type="button" onclick="event.stopPropagation(); shareProduct('${product._id}', '${product.title}', event)" class="share-btn bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition hover:scale-105" title="Share Product">
                                <i class="fa-solid fa-share-nodes text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Title -->
                    <h3 onclick="goToDetail('${product._id}')" class="text-lg font-bold text-gray-800 cursor-pointer mb-1 hover:text-blue-600">
                        ${product.title}
                    </h3>

                    <p class="text-gray-500 text-sm mb-3">
                        ${product.category}
                    </p>

                    <div class="amount_part flex flex-col gap-2">
                        <span class="text-blue-600 font-bold text-xl">
                            ₹${product.price}
                        </span>

                        <button type="button" onclick="handleCartClick(${index}, event)" class="btn_part w-full bg-[#ff0055] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-700 transition text-center">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', cardHTML);
        });
    })
    .catch(err => console.error('Error fetching products:', err));






