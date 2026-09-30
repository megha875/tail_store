
// ==========================================
// 1. INITIALIZATION & ROUTING LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Page Route Handlers ---
  const cartContainer = document.getElementById('cartItems');
  const gridContainer = document.getElementById('productGrid') || document.getElementById('products-container');

  if (cartContainer) {
    renderDynamicCart(); // Run on Cart Page
  }
  
  if (gridContainer) {
    // loadProducts(); // Run on Home/Products Page
  }

  // --- DYNAMIC EVENT DELEGATION FOR PRODUCT CARDS (MODAL) ---
  const modal = document.getElementById('productModal');
  const modalContainer = document.getElementById('modalContainer');

  if (gridContainer && modal && modalContainer) {
    gridContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const isClickable = e.target.closest('.image-wrapper') || e.target.closest('h3');
      if (isClickable) {
        e.preventDefault();

        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalPrice = document.getElementById('modalPrice');

        if (modalImg) modalImg.src = card.querySelector('.product-card-img')?.src || '';
        if (modalTitle) modalTitle.innerText = card.querySelector('h3')?.innerText || '';
        if (modalCategory) modalCategory.innerText = card.querySelector('p')?.innerText || '';
        if (modalPrice) modalPrice.innerText = card.querySelector('span.text-blue-600')?.innerText || '';

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContainer.classList.remove('scale-95');
        modalContainer.classList.add('scale-100');
      }
    });
  }

  // Hide Modal Logic
  if (modal && modalContainer) {
    const closeModalBtn = document.getElementById('closeModal');
    const hideModal = () => {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modalContainer.classList.remove('scale-100');
      modalContainer.classList.add('scale-95');
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
  }

  // --- CATEGORY SIDEBAR FILTER ---
  const categoryCheckboxes = document.querySelectorAll('.category-filter');
  if (categoryCheckboxes.length > 0) {
    function filterProducts() {
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      document.querySelectorAll('.product-card').forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        card.style.display = shouldShow ? 'flex' : 'none';
      });
    }

    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });
  }

  // --- PRODUCT DETAIL: THUMBNAILS ---
  const mainImg = document.getElementById('main-product-img');
  const thumbButtons = document.querySelectorAll('.thumb-btn');

  if (mainImg && thumbButtons.length > 0) {
    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const clickedImg = btn.querySelector('img');
        if (clickedImg) {
          mainImg.src = clickedImg.src;
          thumbButtons.forEach(b => {
            b.classList.remove('border-[#ff0055]');
            b.classList.add('border-transparent');
          });
          btn.classList.remove('border-transparent');
          btn.classList.add('border-[#ff0055]');
        }
      });
    });
  }

  // --- PRODUCT DETAIL: QUANTITY COUNTER ---
  const qtyCount = document.getElementById('qty-count');
  const incrementBtn = document.getElementById('increment-btn');
  const decrementBtn = document.getElementById('decrement-btn');

  if (qtyCount && incrementBtn && decrementBtn) {
    let count = parseInt(qtyCount.innerText) || 1;
    incrementBtn.addEventListener('click', () => {
      count++;
      qtyCount.innerText = count;
    });
    decrementBtn.addEventListener('click', () => {
      if (count > 1) {
        count--;
        qtyCount.innerText = count;
      }
    });
  }

  // --- NAVBAR MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- HERO SLIDER ---
  const wrapper = document.getElementById('sliderWrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  if (wrapper) {
    let currentIndex = 0;
    const totalSlides = wrapper.children.length || 1;

    function updateSlider() {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('bg-white', 'w-8');
          dot.classList.remove('bg-white/50', 'w-3');
        } else {
          dot.classList.add('bg-white/50', 'w-3');
          dot.classList.remove('bg-white', 'w-8');
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    updateSlider();
    let autoPlay = setInterval(nextSlide, 3000);

    const sliderContainer = wrapper.parentElement;
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
      sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
    }
  }

  // --- REVIEWS FORM SUBMISSION ---
  const reviewForm = document.getElementById('review-form');
  const reviewsList = document.getElementById('reviews-list');

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('review-name');
      const ratingInput = document.getElementById('review-rating');
      const textInput = document.getElementById('review-text');

      const ratingVal = parseInt(ratingInput?.value || 5);
      const stars = '★'.repeat(ratingVal) + '☆'.repeat(5 - ratingVal);

      const newReview = document.createElement('div');
      newReview.className = 'border-b border-gray-100 pb-3 transition-all duration-300 opacity-0 transform -translate-y-2';
      newReview.innerHTML = `
        <div class="flex items-center space-x-2 mb-1">
          <span class="font-bold text-gray-900">${nameInput?.value || 'Anonymous'}</span>
          <span class="text-black text-xs">${stars}</span>
        </div>
        <p class="text-gray-600">${textInput?.value || ''}</p>
      `;

      if (reviewsList) {
        reviewsList.prepend(newReview);
        setTimeout(() => {
          newReview.classList.remove('opacity-0', '-translate-y-2');
        }, 50);
      }

      reviewForm.reset();
    });
  }
});

// ==========================================
// 2. DYNAMIC API FETCH & RENDER FUNCTIONS
// ==========================================

// Fetch Products for Home Page Grid
async function loadProducts() {
  const gridContainer = document.getElementById('productGrid') || document.getElementById('products-container');
  if (!gridContainer) return;

  try {
    const response = await fetch('http://localhost:5500/api/products');
    const products = await response.json();

    if (!products || products.length === 0) {
      gridContainer.innerHTML = `<p class="text-center text-gray-500 py-10 col-span-full">Database me abhi koi product nahi hai.</p>`;
      return;
    }

    gridContainer.innerHTML = products.map(item => `
      <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
        <div class="image-wrapper cursor-pointer">
          <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title || item.name}" class="product-card-img w-full h-48 object-cover rounded mb-3">
        </div>
        <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">${item.title || item.name}</h3>
        <p class="text-gray-500 text-sm mb-3">${item.category || 'General'}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-blue-600 font-bold text-xl">₹${item.price}</span>
          <button onclick="addToCart('${item._id}')" class="bg-[#ff0055] text-white px-3 py-1.5 rounded text-sm hover:bg-pink-700 transition">Add to Cart</button>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error("Products Load Error:", error);
    gridContainer.innerHTML = `<p class="text-center text-red-500 py-10 col-span-full">Server connection failed!</p>`;
  }
}

// Fetch & Render Dynamic MongoDB Cart Data
async function renderDynamicCart() {
  const cartContainer = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');
  const grandTotalEl = document.getElementById('grandTotal');

  if (!cartContainer) return;

  try {
    const res = await fetch('http://localhost:5500/api/cart?userId=guest_user');
    const cart = await res.json();

    if (!cart.items || cart.items.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center py-10">
          <p class="text-gray-500 text-lg">Aapka Cart khali hai!</p>
          <a href="/" class="inline-block mt-4 bg-[#ff0055] text-white px-6 py-2 rounded-md hover:bg-pink-700">Shopping Karein</a>
        </div>`;
      if (subtotalEl) subtotalEl.innerText = '₹0';
      if (grandTotalEl) grandTotalEl.innerText = '₹0';
      return;
    }

    let subtotal = 0;

    cartContainer.innerHTML = cart.items.map(item => {
      const product = item.productId;
      if (!product) return '';

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="flex items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-sm">
          <div class="flex items-center space-x-4">
            <img src="${product.image || 'https://via.placeholder.com/80'}" alt="${product.title}" class="w-16 h-16 object-cover rounded">
            <div>
              <h3 class="font-bold text-gray-800 text-base">${product.title || product.name}</h3>
              <p class="text-blue-600 font-bold">₹${product.price}</p>
            </div>
          </div>

          <div class="flex items-center space-x-6">
            <div class="flex items-center border rounded">
              <button onclick="updateQuantity('${product._id}', 'decrease')" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">-</button>
              <span class="px-4 py-1 font-semibold text-gray-800">${item.quantity}</span>
              <button onclick="updateQuantity('${product._id}', 'increase')" class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold">+</button>
            </div>

            <span class="font-bold text-lg text-gray-800 min-w-[80px] text-right">₹${itemTotal}</span>

            <button onclick="removeFromCart('${product._id}')" class="text-red-500 hover:text-red-700 p-1">
              ✕
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (grandTotalEl) grandTotalEl.innerText = `₹${subtotal}`;

  } catch (err) {
    console.error("Cart render error:", err);
  }
}

// ==========================================
// 3. CART ACTIONS (ADD, UPDATE, DELETE)
// ==========================================

async function addToCart(productId) {
  try {
    const res = await fetch('http://localhost:5500/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1, userId: 'guest_user' })
    });
    const data = await res.json();
    alert(data.message || 'Product Cart me add ho gaya!');
  } catch (err) {
    console.error('Add to Cart Error:', err);
  }
}

async function updateQuantity(productId, action) {
  try {
    await fetch('http://localhost:5000/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, action, userId: 'guest_user' })
    });
    renderDynamicCart();
  } catch (err) {
    console.error("Quantity Update Error:", err);
  }
}

async function removeFromCart(productId) {
  try {
    await fetch('http://localhost:5000/api/cart/remove', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, userId: 'guest_user' })
    });
    renderDynamicCart();
  } catch (err) {
    console.error("Remove Item Error:", err);
  }
}




// 1. Navbar Badge Update (Pure AJAX - No Page Refresh)
function updateNavbarCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5500/api/cart?userId=guest_user', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const cart = JSON.parse(xhr.responseText);
                if (cart && cart.items && cart.items.length > 0) {
                    const totalCount = cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
                    badge.innerText = totalCount;
                } else {
                    badge.innerText = '0'; // Empty cart par strictly 0
                }
            } catch (e) {
                badge.innerText = '0';
            }
        } else {
            badge.innerText = '0';
        }
    };

    xhr.onerror = function () {
        badge.innerText = '0';
    };

    xhr.send();
}

// 2. Add To Cart (Pure AJAX - Direct Dynamic Sync)
function addToCart(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Instant Local Badge Increment (+1 Without Reload)
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        const currentCount = parseInt(badge.innerText) || 0;
        badge.innerText = currentCount + 1;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5500/api/cart/add', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            updateNavbarCartBadge(); // Database sync
        } else {
            alert("Product add nahi ho paya!");
            updateNavbarCartBadge();
        }
    };

    xhr.onerror = function () {
        updateNavbarCartBadge();
    };

    const data = JSON.stringify({
        userId: 'guest_user',
        productId: productId,
        quantity: 1
    });

    xhr.send(data);
    return false;
}

// 3. Remove From Cart (Pure AJAX - Instant '0' Badge Sync Without Refresh)
function removeFromCart(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5500/api/cart/remove', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Live badge count update
            updateNavbarCartBadge();

            // Direct Cart Page re-render agar cart page par maujood hain
            if (typeof loadCartPage === 'function') {
                loadCartPage();
            }
        } else {
            alert("Product delete nahi ho saka!");
        }
    };

    xhr.onerror = function () {
        console.error("Remove AJAX error");
    };

    const data = JSON.stringify({
        userId: 'guest_user',
        productId: productId
    });

    xhr.send(data);
    return false;
}

// 4. Initial Page Load Event
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarCartBadge();
});


// ---------------------------------------------------------------
// ==========================================
// 1. API & BADGE INTEGRATION (Global)
// ==========================================
const API_BASE_URL = 'http://localhost:5500/api';
const GUEST_USER_ID = 'guest_user';

// --- NAVBAR BADGE UPDATE ---
async function updateCartBadge(cartData = null) {
    const badge = document.getElementById('cart-badge-count');
    
    if (!badge) return;

    try {
        let cart = cartData;

        // Agar cart data missing hai toh backend se fetch karein
        if (!cart) {
            const response = await fetch('http://localhost:5500/api/cart?userId=guest_user');
            if (response.ok) {
                cart = await response.json();
            }
        }

        // Items count set karein
        if (cart && cart.items && cart.items.length > 0) {
            const totalItems = cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
            badge.innerText = totalItems;
        } else {
            badge.innerText = '0';
        }
    } catch (error) {
        console.error("Badge Update Error:", error);
        badge.innerText = '0';
    }
}

// --- ADD TO CART (Instant Badge Sync Without Reload) ---
async function addToCart(productId, quantity = 1, event = null) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: GUEST_USER_ID,
                productId: productId,
                quantity: quantity
            })
        });

        if (!response.ok) throw new Error("Product add nahi ho saka");

        // Instant Badge Sync without page refresh
        await updateCartBadge();

        // Custom Event Trigger
        window.dispatchEvent(new CustomEvent('cartUpdated'));

    } catch (error) {
        console.error("Add to Cart Error:", error);
        alert("Product add karne mein dikkat aayi.");
    }
}

// ==========================================
// 2. DYNAMIC CART PAGE RENDER (Cart Page Only)
// ==========================================
async function renderDynamicCart() {
    const cartContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const grandTotalEl = document.getElementById('grandTotal');

    // Agar cartContainer nahi hai (Matlab hum Cart Page par nahi hain)
    if (!cartContainer) {
        // Sirf Navbar Badge update karke return ho jayein
        await updateCartBadge();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart?userId=${GUEST_USER_ID}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const cart = await response.json();

        // Update Badge
        updateCartBadge(cart);

        // Cart Khali Hone Par Handling
        if (!cart.items || cart.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="bg-white rounded-xl border p-10 text-center">
                    <div class="text-5xl mb-4">🛒</div>
                    <h2 class="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
                    <p class="text-gray-500 mt-2">Add some products to your cart.</p>
                    <a href="index.html" class="inline-block mt-6 bg-[#FF0043] text-white px-6 py-3 rounded-lg font-semibold">
                        Continue Shopping
                    </a>
                </div>
            `;

            if (subtotalEl) subtotalEl.innerText = '₹0';
            if (grandTotalEl) grandTotalEl.innerText = '₹0';
            return;
        }

        let subtotal = 0;

        cartContainer.innerHTML = cart.items.map(item => {
            const product = item.productId;
            if (!product) return '';

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            return `
                <div class="bg-white border rounded-xl p-4 shadow-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                        
                        <!-- Product Info -->
                        <div class="flex items-center gap-4">
                            <img src="${product.image || 'https://via.placeholder.com/100'}" alt="${product.name || product.title}" class="w-24 h-24 object-cover rounded-lg">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">${product.name || product.title}</h3>
                                <p class="text-gray-500 text-sm mt-1">${product.category || 'General'}</p>
                                <p class="text-[#FF0043] font-bold mt-2">₹${product.price}</p>
                            </div>
                        </div>

                        <!-- Quantity + Action Controls -->
                        <div class="flex items-center gap-4">
                            <div class="flex items-center border rounded-lg overflow-hidden">
                                <button type="button" onclick="updateQuantity('${product._id}', 'decrease')" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">−</button>
                                <span class="px-4 py-2 font-semibold">${item.quantity}</span>
                                <button type="button" onclick="updateQuantity('${product._id}', 'increase')" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">+</button>
                            </div>

                            <span class="font-bold text-gray-900 min-w-[80px] text-right">₹${itemTotal}</span>

                            <button type="button" onclick="removeFromCart('${product._id}')" class="text-red-500 hover:text-red-700 text-xl" title="Remove">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>

                    </div>
                </div>
            `;
        }).join('');

        if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
        if (grandTotalEl) grandTotalEl.innerText = `₹${subtotal}`;

    } catch (error) {
        console.error("Cart Error:", error);
        if (cartContainer) {
            cartContainer.innerHTML = `
                <div class="text-center py-10 text-red-500">
                    Cart load nahi ho pa raha hai.
                </div>
            `;
        }
    }
}

// --- QUANTITY UPDATE ---
async function updateQuantity(productId, action) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: GUEST_USER_ID,
                productId: productId,
                action: action
            })
        });

        if (!response.ok) throw new Error('Quantity update failed');

        await renderDynamicCart();

    } catch (error) {
        console.error("Quantity Update Error:", error);
    }
}

// --- REMOVE FROM CART ---
async function removeFromCart(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/remove`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: GUEST_USER_ID,
                productId: productId
            })
        });

        if (!response.ok) throw new Error('Remove failed');

        await renderDynamicCart();

    } catch (error) {
        console.error("Remove Item Error:", error);
    }
}

// ==========================================
// 3. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial Run for Badge and/or Cart UI
    renderDynamicCart();
});

// Broadcaster sync for dynamic changes
window.addEventListener('cartUpdated', () => {
    renderDynamicCart();
});




const popularSwiper = new Swiper('.popularSwiper', {
  slidesPerView: 1,      // Mobile Screen Par 1 Card
  spaceBetween: 20,       // Cards ke beech ka gap
  loop: true,
  
  // Navigation Arrows
  navigation: {
    nextEl: '.popular-next',
    prevEl: '.popular-prev',
  },

  // Responsive Breakpoints
  breakpoints: {
    640: {
      slidesPerView: 2,  // Small Screens (Tablet Portrait)
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,  // Medium Screens (Tablet Landscape)
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,  // Desktop (1 Line me 4 Cards)
      spaceBetween: 24,
    },
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const brandsSwiper = new Swiper('.brandsSwiper', {
    // Ek time par kitne logos dikhane hain
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true, // Continuous loop
    speed: 3000, // Smooth transition speed (milliseconds me)

    // Left-to-Right autoplay configuration
    autoplay: {
      delay: 0, // Zero delay for continuous smooth motion
      disableOnInteraction: false,
      reverseDirection: true, // Left-to-Right scroll karne ke liye
    },

    // Custom Navigation Arrows
    navigation: {
      nextEl: '.brands-swiper-next',
      prevEl: '.brands-swiper-prev',
    },

    // Responsive Breakpoints
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });
});


// document.addEventListener('DOMContentLoaded', () => {
//   const latestProductsSection = document.querySelector('.latest_products');

//   if (latestProductsSection) {
//     latestProductsSection.addEventListener('click', (event) => {
//       // Check karte hain ki click image-wrapper par ya uske andar kisi image par hua hai
//       const wrapper = event.target.closest('.image-wrapper');
      
//       if (!wrapper) return; // Agar click wrapper par nahi hua toh return ho jao

//       const frontImg = wrapper.querySelector('.front-img');
//       const backImg = wrapper.querySelector('.back-img');

//       if (frontImg && backImg) {
//         // Toggle opacity classes
//         frontImg.classList.toggle('opacity-100');
//         frontImg.classList.toggle('opacity-0');
        
//         backImg.classList.toggle('opacity-0');
//         backImg.classList.toggle('opacity-100');
//       }
//     });
//   }
// })


function changeMainImage(clickedThumb) {
    const mainImg = document.getElementById('main-product-img');
    const thumbImg = clickedThumb.querySelector('img');

    if (mainImg && thumbImg) {
        // Main image ka src change karo
        mainImg.src = thumbImg.src;

        // Sabhi thumbnail buttons se active pink border hatao
        const allThumbs = document.querySelectorAll('.thumb-btn');
        allThumbs.forEach(btn => {
            btn.classList.remove('border-[#ff0055]');
            btn.classList.add('border-transparent');
        });

        // Current clicked thumbnail par active pink border lagao
        clickedThumb.classList.remove('border-transparent');
        clickedThumb.classList.add('border-[#ff0055]');
    }
}



function switchTab(tabName) {
  // 1. Sabhi content panes ko hide karo
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => pane.classList.add('hidden'));

  // 2. Active tab content ko show karo
  const activePane = document.getElementById(`content-${tabName}`);
  if (activePane) {
    activePane.classList.remove('hidden');
  }

  // 3. Sabhi tab buttons se active styles hatao
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
    btn.classList.add('text-gray-700', 'border-transparent');
  });

  // 4. Clicked tab button par active pink styles apply karo
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-700', 'border-transparent');
    activeBtn.classList.add('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
  }
}
// checkout 
// "Proceed to Checkout" Button click
// document.getElementById('btn-proceed').addEventListener('click', () => {
//   // Sabse pehle Step 1 (Cart) ko hide karo
//   step1.classList.add('hidden');
//   step1.classList.remove('block');
  
//   // 1. Browser ke Local Storage se user ka secure token check karna
//   const userToken = localStorage.getItem('userToken');

//   if (userToken) {
//     // Agar token mil gaya (User pehle se logged in hai)
//     // Toh direct Step 2 (Shipping Form) show karo
//     step2.classList.remove('hidden');
//     step2.classList.add('flex');
//   } else {
//     // Agar token nahi mila (User naya hai ya logged out hai)
//     // Toh Step 1.5 (Login/Guest Screen) show karo
//     stepAuth.classList.remove('hidden');
//     stepAuth.classList.add('flex');
//   }
// });

// // Login Button click
// document.getElementById('btn-login').addEventListener('click', () => {
//   // Real app me yahan backend (API) call hoti hai email/password check karne ke liye.
//   // Success hone par backend se jo token milta hai, use Local Storage me save karte hain:
//   localStorage.setItem('userToken', 'dummy_secure_token_12345');
  
//   // Token save karne ke baad Shipping Form par redirect karo
//   stepAuth.classList.add('hidden');
//   stepAuth.classList.remove('flex');
  
//   step2.classList.remove('hidden');
//   step2.classList.add('flex');
// });



// // Form Submit handle karna aur Payload banana
// document.getElementById('step-2').addEventListener('submit', (e) => {
//   e.preventDefault(); // Page refresh hone se roko
  
//   // 1. Form inputs se current values nikalna
//   const name = document.getElementById('user-name').value;
//   const address = document.getElementById('user-address').value;
  
//   // Payment method check karna (Maan lijiye HTML me 'pay-cod' ID wala radio button hai)
//   // Agar aapne payment radio buttons HTML me nahi lagaye, toh is line ko modify kar sakte hain.
//   const isCOD = document.getElementById('pay-cod') ? document.getElementById('pay-cod').checked : true;
//   const paymentType = isCOD ? 'COD' : 'Online';

//   // 2. Final Payload (JSON Object) create karna
//   const orderPayload = {
//     customer: {
//       fullName: name,
//       deliveryAddress: address
//     },
//     orderItems: cart,         // Cart array jo file ke top par defined hai
//     cartTotal: totalPrice,    // Total price jo calculate kiya tha
//     paymentMethod: paymentType
//   };

//   // Checking the payload in browser console
//   console.log("Yeh raha aapka Final JSON Payload jo Backend par jayega:");
//   console.log(JSON.stringify(orderPayload, null, 2));

//   // Yahan par actual e-commerce site fetch() ka use karke is 'orderPayload' ko 
//   // API ke through server (Node.js/MongoDB) par bhejti hai.
  
//   // Filhal UI ko aage badhane ke liye Step 3 (Summary) show karte hain:
//   document.getElementById('summary-name').innerText = name;
//   document.getElementById('summary-address').innerText = address;

//   step2.classList.add('hidden');
//   step2.classList.remove('flex');

//   step3.classList.remove('hidden');
//   step3.classList.add('block');
// });

// // Form Submit handle karna aur Payment Initiate karna
// document.getElementById('step-2').addEventListener('submit', async (e) => {
//   e.preventDefault(); 
  
//   const name = document.getElementById('user-name').value;
//   const address = document.getElementById('user-address').value;
  
//   // HTML me ID 'pay-cod' wale radio button ki state check karna
//   const isCOD = document.getElementById('pay-cod') ? document.getElementById('pay-cod').checked : true;
//   const paymentType = isCOD ? 'COD' : 'Online';

//   const orderPayload = {
//     customer: { fullName: name, deliveryAddress: address },
//     orderItems: cart,         
//     cartTotal: totalPrice,    
//     paymentMethod: paymentType
//   };

//   if (paymentType === 'COD') {
//     // Agar COD hai, toh direct backend ko order save karne bhejein
//     saveOrderToDatabase(orderPayload); 
//   } else {
//     // Agar Online Payment hai, toh Razorpay API call karein
//     try {
//       // 1. Backend API ko fetch request bhejna (Order ID lene ke liye)
//       const response = await fetch('http://localhost:5000/api/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // Backend ko sirf total amount bhejna hota hai
//         body: JSON.stringify({ amount: totalPrice }) 
//       });
      
//       const orderData = await response.json();
      
//       // 2. Razorpay Popup Configuration setup karna
//       const options = {
//         key: "YOUR_RAZORPAY_TEST_KEY", 
//         amount: orderData.amount, // Paise hamesha paise (paise) me aate hain (rupee * 100)
//         currency: "INR",
//         name: "YouBella Fashion", // Store ka naam yahan display hoga
//         description: "Shopping Cart Payment",
//         order_id: orderData.id, // Backend se aayi hui unique Gateway ID
//         handler: function (paymentResponse) {
//           // 3. Payment Success hone par Gateway ye function chalata hai
//           console.log("Payment Successful! ID:", paymentResponse.razorpay_payment_id);
          
//           // Transaction ID ko apne payload me add karke database me save karein
//           orderPayload.transactionId = paymentResponse.razorpay_payment_id;
//           saveOrderToDatabase(orderPayload);
//         },
//         prefill: {
//           name: name,
//           email: "customer@example.com", // Form se nikali hui email
//           contact: "9999999999"          // Form se nikala hua phone number
//         },
//         theme: { color: "#3399cc" }
//       };

//       // 4. Razorpay Popup screen par open karna
//       const rzp = new Razorpay(options);
//       rzp.open();
      
//     } catch (error) {
//       console.error("Payment Gateway Error:", error);
//       alert("Payment popup open karne mein issue aaya.");
//     }
//   }
// });

// // Step 5 par bhejkar UI update karne ka common function
// function saveOrderToDatabase(finalPayload) {
//   // Real project me yahan ek aur fetch() call hoti hai jo '/api/save-order' 
//   // par ye pura 'finalPayload' bhejti hai MongoDB me save hone ke liye.
  
//   // UI update karke Success Summary (Step 3 screen) dikhana
//   document.getElementById('summary-name').innerText = finalPayload.customer.fullName;
//   document.getElementById('summary-address').innerText = finalPayload.customer.deliveryAddress;
  
//   step2.classList.add('hidden');
//   step2.classList.remove('flex');
  
//   step3.classList.remove('hidden');
//   step3.classList.add('block');
// }
// // Function jo Backend API ko order bhejti hai aur UI cleanup karti hai
// async function saveOrderToDatabase(finalPayload) {
//   try {
//     // 1. Backend API Call
//     const response = await fetch('http://localhost:5500/api/orders/place', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(finalPayload)
//     });

//     const result = await response.json();

//     if (result.success) {
//       // ================= STEP 6: CLEANUP & SUCCESS UI =================
      
//       // A. Browser/Local storage se cart saaf karna
//       localStorage.removeItem('cart'); 
      
//       // B. Dynamic elements update karna
//       document.getElementById('summary-name').innerText = finalPayload.customer.fullName;
//       document.getElementById('summary-address').innerText = finalPayload.customer.deliveryAddress;
      
//       // Order ID screen par dikhana
//       const orderIdElem = document.getElementById('display-order-id');
//       if (orderIdElem) {
//         orderIdElem.innerText = `Order ID: #${result.orderId}`;
//       }

//       // C. Navigation / UI Screens Toggle karna
//       step2.classList.add('hidden');
//       step2.classList.remove('flex');

//       step3.classList.remove('hidden');
//       step3.classList.add('block');

//     } else {
//       alert('Order Place karne me dikkat aayi: ' + result.message);
//     }

//   } catch (error) {
//     console.error('API Error:', error);
//     alert('Server connect nahi ho pa raha hai.');
//   }
// }

// // 1. Target Place Order Button
// const placeOrderBtn = document.getElementById('place-order-btn');

// // 2. Button Click Listener
// if (placeOrderBtn) {
//   placeOrderBtn.addEventListener('click', async () => {
    
//     // Form aur Cart se details collect karein
//     const orderData = {
//       userId: 'guest_user',
//       customer: {
//         fullName: document.getElementById('name-input')?.value || 'Guest',
//         email: document.getElementById('email-input')?.value || '',
//         phone: document.getElementById('phone-input')?.value || '',
//         deliveryAddress: document.getElementById('address-input')?.value || ''
//       },
//       items: cartItems, // Aapki cart items array
//       totalAmount: totalCartPrice, // Total Price
//       paymentMethod: selectedPaymentMethod // 'COD' ya 'Online'
//     };

//     // Place Order Function Call
//     await placeOrder(orderData);
//   });
// }

// // 3. AAPKA PLACE ORDER FUNCTION
// async function placeOrder(orderData) {
//   try {
//     const res = await fetch('http://localhost:5500/api/orders/place', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(orderData)
//     });
    
//     const data = await res.json();
//     console.log("Response:", data);

//     if (data.success) {
//       // Step 3 UI dikhane aur Order ID update karne ke liye
//       document.getElementById('step-2')?.classList.add('hidden');
//       document.getElementById('step-3')?.classList.remove('hidden');
      
//       const orderIdElem = document.getElementById('display-order-id');
//       if (orderIdElem) {
//         orderIdElem.innerText = `Order ID: #${data.orderId}`;
//       }
//     } else {
//       alert("Order failed: " + data.message);
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     alert("Server connect nahi ho pa raha hai!");
//   }
// }


// // script.js

// // 1. Button select karein
// const confirmOrderBtn = document.getElementById('confirm-order-btn');

// // 2. Click hone par API call karein
// if (confirmOrderBtn) {
//   confirmOrderBtn.addEventListener('click', () => {

//     fetch('http://localhost:5500/api/orders/place', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userId: "guest_user",
//         customer: { 
//           fullName: document.getElementById('name').value, 
//           email: document.getElementById('email').value, 
//           phone: document.getElementById('phone').value, 
//           deliveryAddress: document.getElementById('address').value 
//         },
//         items: cartItems, // Aapki cart array
//         totalAmount: 499,
//         paymentMethod: "COD"
//       })
//     })
//     .then(res => res.json())
//     .then(data => {
//       console.log("Order Response:", data);
//       if (data.success) {
//         alert("Order Successful! Order ID: " + data.orderId);
//       }
//     })
//     .catch(err => console.error("Error:", err));

//   });
// }
// ==========================================
// 1. STEP NAVIGATION & LOGIN HANDLERS
// ==========================================
// Global Variables Fallback (Agar pehle se defined nahi hain)
if (typeof cart === 'undefined') var cart = [];
if (typeof totalPrice === 'undefined') var totalPrice = 0;

// ==========================================
// 1. PAGE LOAD INITIALIZER (Fix for Blank Screen)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Page load hote hi Step 1 (Cart / Products) screen show karein
  const step1 = document.getElementById('step-1');
  if (step1) {
    step1.classList.remove('hidden');
    step1.classList.add('block');
  }

  // Event Listeners Initialize Karein
  initCheckoutEvents();
});

function initCheckoutEvents() {
  // ==========================================
  // 2. STEP NAVIGATION & LOGIN HANDLERS
  // ==========================================

  // Cart se Checkout par jane ka handler
  document.getElementById('btn-proceed')?.addEventListener('click', () => {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepAuth = document.getElementById('step-auth');

    if (step1) {
      step1.classList.add('hidden');
      step1.classList.remove('block');
    }

    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      if (step2) {
        step2.classList.remove('hidden');
        step2.classList.add('flex');
      }
    } else {
      if (stepAuth) {
        stepAuth.classList.remove('hidden');
        stepAuth.classList.add('flex');
      }
    }
  });

  // Login Button Click Handler
  document.getElementById('btn-login')?.addEventListener('click', () => {
    localStorage.setItem('userToken', 'dummy_secure_token_12345');

    const step2 = document.getElementById('step-2');
    const stepAuth = document.getElementById('step-auth');

    if (stepAuth) {
      stepAuth.classList.add('hidden');
      stepAuth.classList.remove('flex');
    }

    if (step2) {
      step2.classList.remove('hidden');
      step2.classList.add('flex');
    }
  });

  // ==========================================
  // 3. FORM SUBMISSION & PAYMENT HANDLING
  // ==========================================

  const checkoutForm = document.getElementById('step-2');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Page reload hone se rokna

      // Form Details safely fetch karna
      const name = document.getElementById('user-name')?.value || document.getElementById('name')?.value || 'Guest User';
      const address = document.getElementById('user-address')?.value || document.getElementById('address')?.value || 'Delhi';
      const email = document.getElementById('email')?.value || 'guest@example.com';
      const phone = document.getElementById('phone')?.value || '0000000000';

      // Payment Method Check
      const payCodElem = document.getElementById('pay-cod');
      const isCOD = payCodElem ? payCodElem.checked : true;
      const paymentType = isCOD ? 'COD' : 'Online';

      // Global cart variables verification
      const currentCart = typeof cart !== 'undefined' ? cart : (typeof cartItems !== 'undefined' ? cartItems : []);
      const currentTotal = typeof totalPrice !== 'undefined' ? totalPrice : (typeof totalCartPrice !== 'undefined' ? totalCartPrice : 0);

      // Final Payload for MongoDB
      const orderPayload = {
        userId: localStorage.getItem('userId') || 'guest_user',
        customer: {
          fullName: name,
          email: email,
          phone: phone,
          deliveryAddress: address
        },
        items: currentCart,
        totalAmount: currentTotal,
        paymentMethod: paymentType
      };

      if (paymentType === 'COD') {
        // COD Order Direct Save
        await saveOrderToDatabase(orderPayload);
      } else {
        // Razorpay Online Payment Flow
        try {
          const response = await fetch('http://localhost:5000/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: currentTotal })
          });

          const orderData = await response.json();

          const options = {
            key: "YOUR_RAZORPAY_TEST_KEY",
            amount: orderData.amount,
            currency: "INR",
            name: "YouBella Fashion",
            description: "Shopping Cart Payment",
            order_id: orderData.id,
            handler: function (paymentResponse) {
              orderPayload.transactionId = paymentResponse.razorpay_payment_id;
              saveOrderToDatabase(orderPayload);
            },
            prefill: {
              name: name,
              email: email,
              contact: phone
            },
            theme: { color: "#3399cc" }
          };

          const rzp = new Razorpay(options);
          rzp.open();

        } catch (error) {
          console.error("Payment Gateway Error:", error);
          alert("Payment popup open karne mein issue aaya.");
        }
      }
    });
  }
}

// ==========================================
// 4. BACKEND API SAVE FUNCTION & UI UPDATE
// ==========================================

async function saveOrderToDatabase(finalPayload) {
  try {
    const response = await fetch('http://localhost:5500/api/orders/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload)
    });

    const result = await response.json();

    if (result.success) {
      // Cart Cleanup
      localStorage.removeItem('cart');

      // Update Summary UI
      const summaryName = document.getElementById('summary-name');
      if (summaryName) summaryName.innerText = finalPayload.customer.fullName;

      const summaryAddress = document.getElementById('summary-address');
      if (summaryAddress) summaryAddress.innerText = finalPayload.customer.deliveryAddress;

      const orderIdElem = document.getElementById('display-order-id');
      if (orderIdElem) {
        orderIdElem.innerText = `Order ID: #${result.orderId}`;
      }

      // UI Screen Transitions
      const step2 = document.getElementById('step-2');
      const step3 = document.getElementById('step-3');

      if (step2) {
        step2.classList.add('hidden');
        step2.classList.remove('flex');
      }

      if (step3) {
        step3.classList.remove('hidden');
        step3.classList.add('block');
      }

    } else {
      alert('Order Place karne me dikkat aayi: ' + result.message);
    }

  } catch (error) {
    console.error('API Error:', error);
    alert('Server connect nahi ho pa raha hai.');
  }
}


// ==========================================
// FETCH & DISPLAY CART ON CHECKOUT PAGE
// ==========================================
async function loadCheckoutSummary() {
    const checkoutContainer = document.getElementById('checkout-cart-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');

    // Agar hum checkout page par nahi hain toh return ho jao
    if (!checkoutContainer) return;

    try {
        // Backend API se Cart Data Fetch karein
        const response = await fetch('http://localhost:5500/api/cart?userId=guest_user');
        
        if (!response.ok) {
            throw new Error('Cart fetch error');
        }

        const cartData = await response.json();
        const items = cartData.items || [];

        if (items.length === 0) {
            checkoutContainer.innerHTML = `
                <p class="text-gray-500 text-sm text-center py-4">Aapki cart me koi product nahi hai.</p>
            `;
            if (subtotalEl) subtotalEl.textContent = '₹0';
            if (totalEl) totalEl.textContent = '₹0';
            return;
        }

        let subtotal = 0;
        let htmlContent = '';

        items.forEach(item => {
            // Check karein product populated hai ya direct object hai
            const product = item.productId && typeof item.productId === 'object' ? item.productId : item;
            const price = product.price || 0;
            const quantity = item.quantity || 1;
            const itemTotal = price * quantity;
            
            subtotal += itemTotal;

            htmlContent += `
                <div class="flex items-center justify-between border-b pb-3">
                    <div class="flex items-center space-x-3">
                        <img 
                            src="${product.image || 'https://via.placeholder.com/60'}" 
                            alt="${product.name || product.title || 'Product'}" 
                            class="w-14 h-14 object-cover rounded-lg border"
                        >
                        <div>
                            <h4 class="text-sm font-semibold text-gray-800 line-clamp-1">${product.name || product.title || 'Product'}</h4>
                            <p class="text-xs text-gray-500">Qty: ${quantity} × ₹${price}</p>
                        </div>
                    </div>
                    <span class="text-sm font-bold text-gray-900">₹${itemTotal}</span>
                </div>
            `;
        });

        // HTML update karein
        checkoutContainer.innerHTML = htmlContent;

        // Amounts update karein
        if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
        if (totalEl) totalEl.textContent = `₹${subtotal}`;

    } catch (error) {
        console.error("Checkout summary load error:", error);
        checkoutContainer.innerHTML = `
            <p class="text-red-500 text-sm text-center py-4">Cart items load karne me dikkat aayi.</p>
        `;
    }
}

// DOM load hone par run karein
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutSummary();
});





// Global variable cart items store karne ke liye
let currentCartItems = [];
let currentSubtotal = 0;

// Update loadCheckoutSummary to save cart items in variable
async function loadCheckoutSummary() {
    const checkoutContainer = document.getElementById('checkout-cart-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');

    if (!checkoutContainer) return;

    try {
        const response = await fetch('http://localhost:5500/api/cart?userId=guest_user');
        const cartData = await response.json();
        currentCartItems = cartData?.items || [];

        if (currentCartItems.length === 0) {
            checkoutContainer.innerHTML = `<p class="text-gray-500 text-sm text-center py-4">Cart empty hai.</p>`;
            if (subtotalEl) subtotalEl.textContent = '₹0';
            if (totalEl) totalEl.textContent = '₹0';
            return;
        }

        let subtotal = 0;
        let htmlContent = '';

        currentCartItems.forEach(item => {
            const product = (item.productId && typeof item.productId === 'object') ? item.productId : item;
            const name = product.name || product.title || 'Product';
            const image = product.image || 'https://via.placeholder.com/60';
            const price = Number(product.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = price * quantity;

            subtotal += itemTotal;

            htmlContent += `
                <div class="flex items-center justify-between border-b pb-3">
                    <div class="flex items-center space-x-3">
                        <img src="${image}" alt="${name}" class="w-14 h-14 object-cover rounded-lg border">
                        <div>
                            <h4 class="text-sm font-semibold text-gray-800 line-clamp-1">${name}</h4>
                            <p class="text-xs text-gray-500">Qty: ${quantity} × ₹${price}</p>
                        </div>
                    </div>
                    <span class="text-sm font-bold text-gray-900">₹${itemTotal}</span>
                </div>
            `;
        });

        currentSubtotal = subtotal;
        checkoutContainer.innerHTML = htmlContent;
        if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
        if (totalEl) totalEl.textContent = `₹${subtotal}`;

    } catch (error) {
        console.error("Cart error:", error);
    }
}

// Order Submit Form Handler
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!currentCartItems || currentCartItems.length === 0) {
            alert('Aapki cart khali hai!');
            return;
        }

        const btn = document.getElementById('place-order-btn');
        btn.disabled = true;
        btn.innerHTML = 'Placing Order...';

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        const orderData = {
            userId: 'guest_user',
            customer: {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                deliveryAddress: `${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} - ${document.getElementById('pincode').value}`
            },
            items: currentCartItems,
            totalAmount: currentSubtotal,
            paymentMethod: paymentMethod
        };

        try {
            const response = await fetch('http://localhost:5500/api/orders/place', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                // Order Success Page par Redirect karein
                window.location.href = `order-success.html?orderId=${result.orderId}`;
            } else {
                alert('Order fail ho gaya: ' + result.message);
                btn.disabled = false;
                btn.innerHTML = 'Place Order';
            }
        } catch (err) {
            console.error('Order error:', err);
            alert('Server error! Kripya dobara try karein.');
            btn.disabled = false;
            btn.innerHTML = 'Place Order';
        }
    });
}


// Function to load Razorpay SDK dynamically
function loadRazorpaySDK() {
    return new Promise((resolve, reject) => {
        if (window.Razorpay) {
            resolve(true); // Already loaded
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Razorpay script failed to load.'));
        document.body.appendChild(script);
    });
}

// Event handler for Checkout Form


// Document load hone par products load karein
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

async function loadProducts() {
  try {
    // 1. Backend API se products fetch karein
    const response = await fetch('/api/products'); // Apne backend API endpoint ka URL rakhein
    const products = await response.json();

    // 2. Products ko HTML String mein map karein
    const productCardsHTML = products.map(product => {
      return `
        <div class="border rounded-lg p-3 bg-white shadow-sm" data-product-id="${product._id}">
          
          <!-- Image Container -->
          <div class="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">

            <!-- Heart Icon Button -->
            <button class="wishlist-btn absolute top-2 right-2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer">
              <i class="fa-regular fa-heart text-gray-600 text-lg hover:text-red-500"></i>
            </button>
          </div>

          <!-- Product Details -->
          <div class="mt-3">
            <h3 class="font-bold text-gray-800 text-base">${product.name}</h3>
            <p class="text-xs text-gray-500">${product.category || ''}</p>
            <div class="text-blue-600 font-bold text-lg mt-1">₹${product.price}</div>
            <button class="w-full bg-pink-600 text-white text-sm font-semibold mt-3 py-2 rounded-md hover:bg-pink-700 transition">
              Add to Cart
            </button>
          </div>

        </div>
      `;
    }).join('');

    // 3. Grid container mein HTML render karein
    document.getElementById('products-container').innerHTML = productCardsHTML;

    // 4. Render hone ke baad Wishlist Button par click event attach karein
    attachWishlistEvents();

  } catch (error) {
    console.error('Products load karne mein error:', error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkoutForm');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      // 1. Page ko submit / reload hone se roko
      e.preventDefault();

      const orderPayload = {
        userId: GUEST_USER_ID,
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
        // 2. Data direct backend API route par bhejo
        const response = await fetch(`${API_BASE_URL}/orders/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Order successfully place ho gaya!');
          window.location.href = 'order-success.html';
        } else {
          alert(data.message || 'Order save karne me dikkat aayi.');
        }
      } catch (error) {
        console.error('Order Submit Error:', error);
        alert('Server connection fail ho gaya!');
      }
    });
  }
});




    // document.getElementById('loginForm').addEventListener('submit', async function(e) {
    //   // 1. URL me parameters add hone se rokega
    //   e.preventDefault(); 

    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;

    //   try {
    //     // 2. Fetch/Axios se request body me POST data bhejein
    //     const response = await fetch('/api/login', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email, password })
    //     });

    //     const data = await response.json();
    //     console.log(data);

    //     if (data.success) {
    //       alert('Login Successful!');
    //       // Redirect to home page
    //       window.location.href = '/index.html';
    //     } else {
    //       alert(data.message || 'Login failed!');
    //     }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     alert('Server Error. Please try again later.');
    //   }
    // });
 // Wishlist Heart Icon Click Handler
async function handleWishlistClick(productId) {
  const token = localStorage.getItem('token');

  // 1. Agar user logged in nahi hai, toh login.html par bhej do
  if (!token) {
    alert('Wishlist me add karne ke liye pehle Login karein!');
    window.location.href = `login.html?redirectWishlist=${productId}`;
    return;
  }

  // 2. Agar user logged in hai, toh backend API call karein
  try {
    const response = await fetch('/api/wishlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Product Wishlist me add ho gaya!');
    } else {
      alert(data.message || 'Wishlist add karne me error aaya');
    }
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    alert('Server connection error!');
  }
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Form Submitted:', { email, password });
});