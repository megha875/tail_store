// Localhost port ko backend server ke port se match karein
const API_BASE_URL = 'http://localhost:5000/api'; 

document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkoutForm');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Default URL submit ko roko

      // Form Data Extract
      const orderPayload = {
        userId: 'guest_user',
        shippingDetails: {
          fullName: document.getElementById('fullName')?.value || '',
          email: document.getElementById('shippingEmail')?.value || '',
          phone: document.getElementById('shippingPhone')?.value || '',
          street: document.getElementById('streetAddress')?.value || '',
          city: document.getElementById('city')?.value || '',
          state: document.getElementById('state')?.value || '',
          pincode: document.getElementById('pincode')?.value || ''
        },
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value || 'COD'
      };

      try {
        // Direct Database API Endpoint Send Call
        const response = await fetch(`${API_BASE_URL}/orders/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Order Database me successfully save ho gaya!');
          window.location.href = 'order-success.html';
        } else {
          alert(data.message || 'Database me order save nahi ho paya.');
        }
      } catch (error) {
        console.error('Server connection error:', error);
        alert('Server connection fail ho gaya! Check karein ki Backend Server chalu hai ya nahi.');
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




