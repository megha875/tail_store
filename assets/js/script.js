// // ==========================================
// // 1. BACKEND API INTEGRATION
// // ==========================================
// async function loadProducts() {
//   try {
//     const response = await fetch('http://localhost:5000/api/products');
//     const products = await response.json();
//     console.log("MongoDB Live Products:", products);

//     const grid = document.getElementById('productGrid') || document.getElementById('products-container');
//     if (grid && products.length > 0) {
//       grid.innerHTML = products.map(item => `
//         <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}">
//           <div class="image-wrapper cursor-pointer">
//             <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title}" class="product-card-img w-full h-48 object-cover rounded mb-3">
//           </div>
//           <h3 class="text-lg font-bold text-gray-800 cursor-pointer">${item.title}</h3>
//           <p class="text-gray-500 font-medium text-sm mb-2">${item.category || 'General'}</p>
//           <div class="flex justify-between items-center mt-2">
//             <span class="text-blue-600 font-bold text-xl">₹${item.price}</span>
//             <button onclick="addToCart('${item._id}')" class="bg-[#ff0055] text-white px-3 py-1 rounded text-sm hover:bg-pink-700">Add to Cart</button>
//           </div>
//         </div>
//       `).join('');
//     }
//   } catch (error) {
//     console.error("Products load karne mein error aayi:", error);
//   }
// }

// async function addLiveProduct(productData) {
//   try {
//     const response = await fetch('http://localhost:5000/api/products/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData)
//     });

//     const result = await response.json();
//     console.log('Saved in MongoDB:', result);
//     alert('Product Live Database me add ho gaya!');
//     loadProducts();
//   } catch (error) {
//     console.error('Error adding product:', error);
//   }
// }

// // ==========================================
// // 2. MAIN DOM CONTENT LOADED EVENT
// // ==========================================
// document.addEventListener('DOMContentLoaded', () => {

//   // Load API Data
//   loadProducts();

//   // --- IMAGE TOGGLE (FADE EFFECT) ---
//   document.querySelectorAll('.image-wrapper').forEach(wrapper => {
//     wrapper.addEventListener('click', () => {
//       const frontImg = wrapper.querySelector('.front-img');
//       const backImg = wrapper.querySelector('.back-img');

//       if (frontImg && backImg) {
//         if (frontImg.classList.contains('opacity-100')) {
//           frontImg.classList.replace('opacity-100', 'opacity-0');
//           backImg.classList.replace('opacity-0', 'opacity-100');
//         } else {
//           frontImg.classList.replace('opacity-0', 'opacity-100');
//           backImg.classList.replace('opacity-100', 'opacity-0');
//         }
//       }
//     });
//   });

//   // --- CATEGORY SIDEBAR FILTER ---
//   const categoryCheckboxes = document.querySelectorAll('.category-filter');
//   const productCards = document.querySelectorAll('.product-card');

//   if (categoryCheckboxes.length > 0 && productCards.length > 0) {
//     function filterProducts() {
//       const selectedCategories = Array.from(categoryCheckboxes)
//         .filter(cb => cb.checked)
//         .map(cb => cb.value);

//       productCards.forEach(card => {
//         const cardCategory = card.getAttribute('data-category');
//         const shouldShow = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
//         card.style.display = shouldShow ? 'flex' : 'none';
//       });
//     }

//     categoryCheckboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', filterProducts);
//     });
//   }

//   // --- PRODUCT DETAIL: THUMBNAILS ---
//   const mainImg = document.getElementById('main-product-img');
//   const thumbButtons = document.querySelectorAll('.thumb-btn');

//   if (mainImg && thumbButtons.length > 0) {
//     thumbButtons.forEach(btn => {
//       btn.addEventListener('click', () => {
//         const clickedImg = btn.querySelector('img');
//         if (clickedImg) {
//           mainImg.src = clickedImg.src;
//           thumbButtons.forEach(b => {
//             b.classList.remove('border-[#ff0055]');
//             b.classList.add('border-transparent');
//           });
//           btn.classList.remove('border-transparent');
//           btn.classList.add('border-[#ff0055]');
//         }
//       });
//     });
//   }

//   // --- PRODUCT DETAIL: QUANTITY COUNTER ---
//   const qtyCount = document.getElementById('qty-count');
//   const incrementBtn = document.getElementById('increment-btn');
//   const decrementBtn = document.getElementById('decrement-btn');

//   if (qtyCount && incrementBtn && decrementBtn) {
//     let count = parseInt(qtyCount.innerText) || 1;
//     incrementBtn.addEventListener('click', () => {
//       count++;
//       qtyCount.innerText = count;
//     });
//     decrementBtn.addEventListener('click', () => {
//       if (count > 1) {
//         count--;
//         qtyCount.innerText = count;
//       }
//     });
//   }

//   // --- NAVBAR MOBILE MENU TOGGLE ---
//   const mobileMenuBtn = document.getElementById('mobile-menu-btn');
//   const mobileMenu = document.getElementById('mobile-menu');
//   const hamburgerIcon = document.getElementById('hamburger-icon');
//   const closeIcon = document.getElementById('close-icon');

//   if (mobileMenuBtn && mobileMenu) {
//     mobileMenuBtn.addEventListener('click', () => {
//       mobileMenu.classList.toggle('hidden');
//       if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden');
//       if (closeIcon) closeIcon.classList.toggle('hidden');
//     });
//   }

//   // --- HERO SLIDER ---
//   const wrapper = document.getElementById('sliderWrapper');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');
//   const dots = document.querySelectorAll('.dot');

//   if (wrapper) {
//     let currentIndex = 0;
//     const totalSlides = 5;

//     function updateSlider() {
//       wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
//       dots.forEach((dot, idx) => {
//         if (idx === currentIndex) {
//           dot.classList.add('bg-white', 'w-8');
//           dot.classList.remove('bg-white/50', 'w-3');
//         } else {
//           dot.classList.add('bg-white/50', 'w-3');
//           dot.classList.remove('bg-white', 'w-8');
//         }
//       });
//     }

//     function nextSlide() {
//       currentIndex = (currentIndex + 1) % totalSlides;
//       updateSlider();
//     }

//     function prevSlide() {
//       currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//       updateSlider();
//     }

//     if (nextBtn) nextBtn.addEventListener('click', nextSlide);
//     if (prevBtn) prevBtn.addEventListener('click', prevSlide);

//     updateSlider();
//     let autoPlay = setInterval(nextSlide, 3000);

//     const sliderContainer = document.querySelector('.group');
//     if (sliderContainer) {
//       sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
//       sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
//     }
//   }

//   // --- SWIPER INITIALIZATIONS ---
//   if (typeof Swiper !== 'undefined') {
//     if (document.querySelector('.brandsSwiper')) {
//       new Swiper('.brandsSwiper', {
//         slidesPerView: 2,
//         spaceBetween: 20,
//         loop: true,
//         autoplay: { delay: 2500, disableOnInteraction: false, reverseDirection: true },
//         navigation: { nextEl: '.brands-swiper-next', prevEl: '.brands-swiper-prev' },
//         breakpoints: {
//           640: { slidesPerView: 3, spaceBetween: 30 },
//           768: { slidesPerView: 4, spaceBetween: 40 },
//           1024: { slidesPerView: 6, spaceBetween: 30 },
//         },
//       });
//     }

//     if (document.querySelector('.popularSwiper')) {
//       new Swiper('.popularSwiper', {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         loop: true,
//         navigation: { nextEl: '.popular-next', prevEl: '.popular-prev', lockClass: 'swiper-button-lock' },
//         breakpoints: {
//           480: { slidesPerView: 2, spaceBetween: 16 },
//           768: { slidesPerView: 3, spaceBetween: 20 },
//           1024: { slidesPerView: 4, spaceBetween: 24 }
//         }
//       });
//     }

//     if (document.querySelector('.productSlider')) {
//       new Swiper('.productSlider', {
//         slidesPerView: 1,
//         spaceBetween: 16,
//         loop: true,
//         autoplay: { delay: 3000, disableOnInteraction: false },
//         navigation: { nextEl: '.slider-next', prevEl: '.slider-prev' },
//         pagination: { el: '.slider-pagination', clickable: true },
//         breakpoints: {
//           640: { slidesPerView: 2, spaceBetween: 20 },
//           768: { slidesPerView: 3, spaceBetween: 20 },
//           1024: { slidesPerView: 4, spaceBetween: 24 }
//         }
//       });
//     }
//   }

//   // --- REVIEWS FORM SUBMISSION ---
//   const reviewForm = document.getElementById('review-form');
//   const reviewsList = document.getElementById('reviews-list');

//   if (reviewForm) {
//     reviewForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const nameInput = document.getElementById('review-name');
//       const ratingInput = document.getElementById('review-rating');
//       const textInput = document.getElementById('review-text');

//       const ratingVal = parseInt(ratingInput?.value || 5);
//       const stars = '★'.repeat(ratingVal) + '☆'.repeat(5 - ratingVal);

//       const newReview = document.createElement('div');
//       newReview.className = 'border-b border-gray-100 pb-3 transition-all duration-300 opacity-0 transform -translate-y-2';
//       newReview.innerHTML = `
//         <div class="flex items-center space-x-2 mb-1">
//           <span class="font-bold text-gray-900">${nameInput?.value || 'Anonymous'}</span>
//           <span class="text-black text-xs">${stars}</span>
//         </div>
//         <p class="text-gray-600">${textInput?.value || ''}</p>
//       `;

//       if (reviewsList) {
//         reviewsList.prepend(newReview);
//         setTimeout(() => {
//           newReview.classList.remove('opacity-0', '-translate-y-2');
//         }, 50);
//       }

//       reviewForm.reset();
//     });
//   }

//   // --- PRODUCT MODAL FUNCTIONALITY ---
//   const modal = document.getElementById('productModal');
//   const modalContainer = document.getElementById('modalContainer');
//   const closeModalBtn = document.getElementById('closeModal');

//   if (modal && modalContainer) {
//     document.querySelectorAll('.product-card').forEach(card => {
//       const clickableElements = card.querySelectorAll('.image-wrapper, h3');
//       clickableElements.forEach(element => {
//         element.addEventListener('click', (e) => {
//           e.preventDefault();

//           const modalImg = document.getElementById('modalImg');
//           const modalTitle = document.getElementById('modalTitle');
//           const modalCategory = document.getElementById('modalCategory');
//           const modalPrice = document.getElementById('modalPrice');

//           if (modalImg) modalImg.src = card.querySelector('.product-card-img')?.src || '';
//           if (modalTitle) modalTitle.innerText = card.querySelector('h3')?.innerText || '';
//           if (modalCategory) modalCategory.innerText = card.querySelector('p')?.innerText || '';
//           if (modalPrice) modalPrice.innerText = card.querySelector('.flex span:first-child')?.innerText || '';

//           modal.classList.remove('opacity-0', 'pointer-events-none');
//           modalContainer.classList.remove('scale-95');
//           modalContainer.classList.add('scale-100');
//         });
//       });
//     });

//     const hideModal = () => {
//       modal.classList.add('opacity-0', 'pointer-events-none');
//       modalContainer.classList.remove('scale-100');
//       modalContainer.classList.add('scale-95');
//     };

//     if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
//     modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
//   }

// });

// // ==========================================
// // 3. GLOBAL HELPERS & HANDLERS
// // ==========================================
// function toggleSubMenu(submenuId, arrowId) {
//   const submenu = document.getElementById(submenuId);
//   const arrow = document.getElementById(arrowId);
//   if (submenu) submenu.classList.toggle('hidden');
//   if (arrow) arrow.classList.toggle('rotate-180');
// }

// function switchTab(tabId) {
//   document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
//   document.querySelectorAll('.tab-btn').forEach(btn => {
//     btn.classList.remove('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
//     btn.classList.add('text-gray-700', 'border-transparent');
//   });

//   const activePane = document.getElementById(`content-${tabId}`);
//   if (activePane) activePane.classList.remove('hidden');

//   const activeBtn = document.getElementById(`tab-${tabId}`);
//   if (activeBtn) {
//     activeBtn.classList.remove('text-gray-700', 'border-transparent');
//     activeBtn.classList.add('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
//   }
// }

// async function addToCart(productId) {
//   try {
//     const res = await fetch('http://localhost:5000/api/cart/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ productId, quantity: 1 })
//     });
//     const data = await res.json();
//     alert(data.message || 'Product Cart me Add Ho Gaya!');
//   } catch (err) {
//     console.error('Cart error:', err);
//   }
// }

// ==========================================
// 1. BACKEND API INTEGRATION
// ==========================================
// async function loadProducts() {
//   try {
//     const response = await fetch('http://localhost:5000/api/products');
//     const products = await response.json();
//     console.log("MongoDB Live Products:", products);

//     const grid = document.getElementById('productGrid') || document.getElementById('products-container');
//     if (grid && Array.isArray(products) && products.length > 0) {
//       grid.innerHTML = products.map(item => `
//         <div class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between" data-category="${item.category || ''}" data-id="${item._id}">
//           <div class="image-wrapper cursor-pointer">
//             <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title}" class="product-card-img w-full h-48 object-cover rounded mb-3">
//           </div>
//           <h3 class="text-lg font-bold text-gray-800 cursor-pointer">${item.title}</h3>
//           <p class="text-gray-500 font-medium text-sm mb-2">${item.category || 'General'}</p>
//           <div class="flex justify-between items-center mt-2">
//             <span class="text-blue-600 font-bold text-xl">₹${item.price}</span>
//             <button onclick="addToCart('${item._id}')" class="bg-[#ff0055] text-white px-3 py-1 rounded text-sm hover:bg-pink-700">Add to Cart</button>
//           </div>
//         </div>
//       `).join('');
//     }
//   } catch (error) {
//     console.error("Products load karne mein error aayi:", error);
//   }
// }

// async function addLiveProduct(productData) {
//   try {
//     const response = await fetch('http://localhost:5000/api/products/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData)
//     });

//     const result = await response.json();
//     console.log('Saved in MongoDB:', result);
//     alert('Product Live Database me add ho gaya!');
//     loadProducts();
//   } catch (error) {
//     console.error('Error adding product:', error);
//   }
// }



// ==========================================
// 2. MAIN DOM CONTENT LOADED EVENT
// ==========================================
// document.addEventListener('DOMContentLoaded', () => {

//   // Load API Data
//   loadProducts();

//   // --- DYNAMIC EVENT DELEGATION FOR PRODUCT CARDS (MODAL & HOVER) ---
//   const gridContainer = document.getElementById('productGrid') || document.getElementById('products-container');
//   const modal = document.getElementById('productModal');
//   const modalContainer = document.getElementById('modalContainer');

//   if (gridContainer && modal && modalContainer) {
//     gridContainer.addEventListener('click', (e) => {
//       const card = e.target.closest('.product-card');
//       if (!card) return;

//       const isClickable = e.target.closest('.image-wrapper') || e.target.closest('h3');
//       if (isClickable) {
//         e.preventDefault();

//         const modalImg = document.getElementById('modalImg');
//         const modalTitle = document.getElementById('modalTitle');
//         const modalCategory = document.getElementById('modalCategory');
//         const modalPrice = document.getElementById('modalPrice');

//         if (modalImg) modalImg.src = card.querySelector('.product-card-img')?.src || '';
//         if (modalTitle) modalTitle.innerText = card.querySelector('h3')?.innerText || '';
//         if (modalCategory) modalCategory.innerText = card.querySelector('p')?.innerText || '';
//         if (modalPrice) modalPrice.innerText = card.querySelector('span.text-blue-600')?.innerText || '';

//         modal.classList.remove('opacity-0', 'pointer-events-none');
//         modalContainer.classList.remove('scale-95');
//         modalContainer.classList.add('scale-100');
//       }
//     });
//   }

//   // Hide Modal Logic
//   if (modal && modalContainer) {
//     const closeModalBtn = document.getElementById('closeModal');
//     const hideModal = () => {
//       modal.classList.add('opacity-0', 'pointer-events-none');
//       modalContainer.classList.remove('scale-100');
//       modalContainer.classList.add('scale-95');
//     };

//     if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
//     modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
//   }

//   // --- CATEGORY SIDEBAR FILTER ---
//   const categoryCheckboxes = document.querySelectorAll('.category-filter');
//   if (categoryCheckboxes.length > 0) {
//     function filterProducts() {
//       const selectedCategories = Array.from(categoryCheckboxes)
//         .filter(cb => cb.checked)
//         .map(cb => cb.value);

//       document.querySelectorAll('.product-card').forEach(card => {
//         const cardCategory = card.getAttribute('data-category');
//         const shouldShow = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
//         card.style.display = shouldShow ? 'flex' : 'none';
//       });
//     }

//     categoryCheckboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', filterProducts);
//     });
//   }

//   // --- PRODUCT DETAIL: THUMBNAILS ---
//   const mainImg = document.getElementById('main-product-img');
//   const thumbButtons = document.querySelectorAll('.thumb-btn');

//   if (mainImg && thumbButtons.length > 0) {
//     thumbButtons.forEach(btn => {
//       btn.addEventListener('click', () => {
//         const clickedImg = btn.querySelector('img');
//         if (clickedImg) {
//           mainImg.src = clickedImg.src;
//           thumbButtons.forEach(b => {
//             b.classList.remove('border-[#ff0055]');
//             b.classList.add('border-transparent');
//           });
//           btn.classList.remove('border-transparent');
//           btn.classList.add('border-[#ff0055]');
//         }
//       });
//     });
//   }

//   // --- PRODUCT DETAIL: QUANTITY COUNTER ---
//   const qtyCount = document.getElementById('qty-count');
//   const incrementBtn = document.getElementById('increment-btn');
//   const decrementBtn = document.getElementById('decrement-btn');

//   if (qtyCount && incrementBtn && decrementBtn) {
//     let count = parseInt(qtyCount.innerText) || 1;
//     incrementBtn.addEventListener('click', () => {
//       count++;
//       qtyCount.innerText = count;
//     });
//     decrementBtn.addEventListener('click', () => {
//       if (count > 1) {
//         count--;
//         qtyCount.innerText = count;
//       }
//     });
//   }

//   // --- NAVBAR MOBILE MENU TOGGLE ---
//   const mobileMenuBtn = document.getElementById('mobile-menu-btn');
//   const mobileMenu = document.getElementById('mobile-menu');
//   const hamburgerIcon = document.getElementById('hamburger-icon');
//   const closeIcon = document.getElementById('close-icon');

//   if (mobileMenuBtn && mobileMenu) {
//     mobileMenuBtn.addEventListener('click', () => {
//       mobileMenu.classList.toggle('hidden');
//       if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden');
//       if (closeIcon) closeIcon.classList.toggle('hidden');
//     });
//   }

//   // --- HERO SLIDER ---
//   const wrapper = document.getElementById('sliderWrapper');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');
//   const dots = document.querySelectorAll('.dot');

//   if (wrapper) {
//     let currentIndex = 0;
//     const totalSlides = wrapper.children.length || 5;

//     function updateSlider() {
//       wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
//       dots.forEach((dot, idx) => {
//         if (idx === currentIndex) {
//           dot.classList.add('bg-white', 'w-8');
//           dot.classList.remove('bg-white/50', 'w-3');
//         } else {
//           dot.classList.add('bg-white/50', 'w-3');
//           dot.classList.remove('bg-white', 'w-8');
//         }
//       });
//     }

//     function nextSlide() {
//       currentIndex = (currentIndex + 1) % totalSlides;
//       updateSlider();
//     }

//     function prevSlide() {
//       currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//       updateSlider();
//     }

//     if (nextBtn) nextBtn.addEventListener('click', nextSlide);
//     if (prevBtn) prevBtn.addEventListener('click', prevSlide);

//     updateSlider();
//     let autoPlay = setInterval(nextSlide, 3000);

//     const sliderContainer = wrapper.parentElement;
//     if (sliderContainer) {
//       sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
//       sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
//     }
//   }

//   // --- SWIPER INITIALIZATIONS ---
//   if (typeof Swiper !== 'undefined') {
//     if (document.querySelector('.brandsSwiper')) {
//       new Swiper('.brandsSwiper', {
//         slidesPerView: 2,
//         spaceBetween: 20,
//         loop: true,
//         autoplay: { delay: 2500, disableOnInteraction: false, reverseDirection: true },
//         navigation: { nextEl: '.brands-swiper-next', prevEl: '.brands-swiper-prev' },
//         breakpoints: {
//           640: { slidesPerView: 3, spaceBetween: 30 },
//           768: { slidesPerView: 4, spaceBetween: 40 },
//           1024: { slidesPerView: 6, spaceBetween: 30 },
//         },
//       });
//     }

//     if (document.querySelector('.popularSwiper')) {
//       new Swiper('.popularSwiper', {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         loop: true,
//         navigation: { nextEl: '.popular-next', prevEl: '.popular-prev' },
//         breakpoints: {
//           480: { slidesPerView: 2, spaceBetween: 16 },
//           768: { slidesPerView: 3, spaceBetween: 20 },
//           1024: { slidesPerView: 4, spaceBetween: 24 }
//         }
//       });
//     }

//     if (document.querySelector('.productSlider')) {
//       new Swiper('.productSlider', {
//         slidesPerView: 1,
//         spaceBetween: 16,
//         loop: true,
//         autoplay: { delay: 3000, disableOnInteraction: false },
//         navigation: { nextEl: '.slider-next', prevEl: '.slider-prev' },
//         pagination: { el: '.slider-pagination', clickable: true },
//         breakpoints: {
//           640: { slidesPerView: 2, spaceBetween: 20 },
//           768: { slidesPerView: 3, spaceBetween: 20 },
//           1024: { slidesPerView: 4, spaceBetween: 24 }
//         }
//       });
//     }
//   }

//   // --- REVIEWS FORM SUBMISSION ---
//   const reviewForm = document.getElementById('review-form');
//   const reviewsList = document.getElementById('reviews-list');

//   if (reviewForm) {
//     reviewForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const nameInput = document.getElementById('review-name');
//       const ratingInput = document.getElementById('review-rating');
//       const textInput = document.getElementById('review-text');

//       const ratingVal = parseInt(ratingInput?.value || 5);
//       const stars = '★'.repeat(ratingVal) + '☆'.repeat(5 - ratingVal);

//       const newReview = document.createElement('div');
//       newReview.className = 'border-b border-gray-100 pb-3 transition-all duration-300 opacity-0 transform -translate-y-2';
//       newReview.innerHTML = `
//         <div class="flex items-center space-x-2 mb-1">
//           <span class="font-bold text-gray-900">${nameInput?.value || 'Anonymous'}</span>
//           <span class="text-black text-xs">${stars}</span>
//         </div>
//         <p class="text-gray-600">${textInput?.value || ''}</p>
//       `;

//       if (reviewsList) {
//         reviewsList.prepend(newReview);
//         setTimeout(() => {
//           newReview.classList.remove('opacity-0', '-translate-y-2');
//         }, 50);
//       }

//       reviewForm.reset();
//     });
//   }
// });

// // ==========================================
// // 3. GLOBAL HELPERS & HANDLERS
// // ==========================================
// function toggleSubMenu(submenuId, arrowId) {
//   const submenu = document.getElementById(submenuId);
//   const arrow = document.getElementById(arrowId);
//   if (submenu) submenu.classList.toggle('hidden');
//   if (arrow) arrow.classList.toggle('rotate-180');
// }

// function switchTab(tabId) {
//   document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
//   document.querySelectorAll('.tab-btn').forEach(btn => {
//     btn.classList.remove('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
//     btn.classList.add('text-gray-700', 'border-transparent');
//   });

//   const activePane = document.getElementById(`content-${tabId}`);
//   if (activePane) activePane.classList.remove('hidden');

//   const activeBtn = document.getElementById(`tab-${tabId}`);
//   if (activeBtn) {
//     activeBtn.classList.remove('text-gray-700', 'border-transparent');
//     activeBtn.classList.add('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
//   }
// }

// async function addToCart(productId) {
//   try {
//     const res = await fetch('http://localhost:5000/api/cart/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ productId, quantity: 1 })
//     });
//     const data = await res.json();
//     alert(data.message || 'Product Cart me Add Ho Gaya!');
//   } catch (err) {
//     console.error('Cart error:', err);
//   }
// }
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

// Global UI Tab/Submenu Helpers
function toggleSubMenu(submenuId, arrowId) {
  const submenu = document.getElementById(submenuId);
  const arrow = document.getElementById(arrowId);
  if (submenu) submenu.classList.toggle('hidden');
  if (arrow) arrow.classList.toggle('rotate-180');
}


