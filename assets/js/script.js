// Backend API se products fetch karne ka function
// async function loadProducts() {
//     try {
//         const response = await fetch('http://localhost:5000/api/products');
//         const products = await response.json();
//         console.log("Backend se aaye products:", products);

//         // Yahan aap apne HTML UI mein products render karein
//     } catch (error) {
//         console.error("Products load karne mein error aayi:", error);
//     }
// }

// // Function call karein
// loadProducts();


  async function loadProducts() {
    try {
      // Backend API se data fetch karein
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();

      // HTML container ko select karein
      const container = document.getElementById('products-container'); // ya jo bhi aapka grid ID ho

      if (container) {
        // 👇 Yeh raha aapka updated render code
        container.innerHTML = products.map(product => `
          <div class="bg-white p-4 rounded-2xl shadow-md border flex flex-col items-center text-center">
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover rounded-xl mb-4">
            <h3 class="font-bold text-gray-800 text-lg mb-1">${product.title}</h3>
            <p class="text-gray-500 font-semibold mb-3">$${product.price}</p>
            <button class="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-xl transition">Add to Cart</button>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Page load hone par function call karein
  document.addEventListener('DOMContentLoaded', loadProducts);

// 


  // API se products fetch karne ka function
  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const products = await response.json();
      
      console.log('Fetched Products:', products);

      // Container element jahan products show karne hain
      const productsContainer = document.getElementById('product-list'); 
      
      if (productsContainer) {
        productsContainer.innerHTML = products.map(product => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price} <del>$${product.oldPrice}</del></p>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Page load hote hi run karein
  document.addEventListener('DOMContentLoaded', loadProducts);


// Navbar Section  
 // Mobile Main Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Mobile Submenu Accordion Toggle Function
  function toggleSubMenu(submenuId, arrowId) {
    const submenu = document.getElementById(submenuId);
    const arrow = document.getElementById(arrowId);
    
    submenu.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
  }

//   Slider Section Start
// const wrapper = document.getElementById('sliderWrapper');
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const dots = document.querySelectorAll('.dot');
    
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

//     function goToSlide(index) {
//       currentIndex = index;
//       updateSlider();
//     }

//     nextBtn.addEventListener('click', nextSlide);
//     prevBtn.addEventListener('click', prevSlide);

//     updateSlider();

//     let autoPlay = setInterval(nextSlide, 3000);

//     const sliderContainer = document.querySelector('.group');
//     sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
//     sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
// Swipper slider Start




const swiper = new Swiper('.brandsSwiper', {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    reverseDirection: true,
  },
  navigation: {
    nextEl: '.brands-swiper-next',
    prevEl: '.brands-swiper-prev',
  },
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
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
});

  // Product Slider
// document.addEventListener('DOMContentLoaded', () => {
//     new Swiper('.popularSwiper', {
//       slidesPerView: 1,
//       spaceBetween: 24,
//       loop: true,
//       navigation: {
//         nextEl: '.popular-next',
//         prevEl: '.popular-prev',
//       },
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       breakpoints: {
//         640: { slidesPerView: 2 },
//         1024: { slidesPerView: 4 }
//       }
//     });
//   });
// const popularSwiper = new Swiper('.popularSwiper', {
//   slidesPerView: 1,
//   spaceBetween: 20,
//   loop: true,
//   navigation: {
//     nextEl: '.popular-next',
//     prevEl: '.popular-prev',
//   },
//   breakpoints: {
//     480: { slidesPerView: 2, spaceBetween: 16 },
//     768: { slidesPerView: 3, spaceBetween: 20 },
//     1024: { slidesPerView: 4, spaceBetween: 24 }
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   // Brands Swiper
//   const swiper = new Swiper('.brandsSwiper', {
//     slidesPerView: 2,
//     spaceBetween: 20,
//     loop: true,
//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//       reverseDirection: true,
//     },
//     navigation: {
//       nextEl: '.brands-swiper-next',
//       prevEl: '.brands-swiper-prev',
//     },
//     breakpoints: {
//       640: { slidesPerView: 3, spaceBetween: 30 },
//       768: { slidesPerView: 4, spaceBetween: 40 },
//       1024: { slidesPerView: 6, spaceBetween: 30 },
//     },
//   });

//   // Popular Products Swiper
//   const popularSwiper = new Swiper('.popularSwiper', {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     loop: true,
//     navigation: {
//       nextEl: '.popular-next',
//       prevEl: '.popular-prev',
//     },
//     breakpoints: {
//       480: { slidesPerView: 2, spaceBetween: 16 },
//       768: { slidesPerView: 3, spaceBetween: 20 },
//       1024: { slidesPerView: 4, spaceBetween: 24 }
//     }
//   });
// });
const popularSwiper = new Swiper('.popularSwiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.popular-next',
    prevEl: '.popular-prev',
    lockClass: 'swiper-button-lock' // Extra locking classes disable karega
  },
  breakpoints: {
    480: { slidesPerView: 2, spaceBetween: 16 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 24 }
  }
});
// Latest Product
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const frontImg = wrapper.querySelector('.front-img');
      const backImg = wrapper.querySelector('.back-img');

      if (frontImg && backImg) {
        // Toggle Opacity with Smooth Fade
        if (frontImg.classList.contains('opacity-100')) {
          frontImg.classList.replace('opacity-100', 'opacity-0');
          backImg.classList.replace('opacity-0', 'opacity-100');
        } else {
          frontImg.classList.replace('opacity-0', 'opacity-100');
          backImg.classList.replace('opacity-100', 'opacity-0');
        }
      }
    });
  });
});
 
//JS Filter Logic


document.addEventListener('DOMContentLoaded', () => {
  const categoryCheckboxes = document.querySelectorAll('.category-filter');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
      
      card.style.display = shouldShow ? 'flex' : 'none';
    });
  }

  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });
});



// ProductCart Section


document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PRODUCT DETAIL: IMAGE GALLERY & BORDERS
  // ==========================================
  const mainImg = document.getElementById('main-product-img');
  const thumbButtons = document.querySelectorAll('.thumb-btn');

  if (mainImg && thumbButtons.length > 0) {
    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const clickedImg = btn.querySelector('img');
        if (clickedImg) {
          // Main Image update
          mainImg.src = clickedImg.src;

          // Sabhi thumbnails ke border reset karein
          thumbButtons.forEach(b => {
            b.classList.remove('border-[#ff0055]');
            b.classList.add('border-transparent');
          });

          // Active Clicked Thumbnail ka border highlight karein
          btn.classList.remove('border-transparent');
          btn.classList.add('border-[#ff0055]');
        }
      });
    });
  }

  // ==========================================
  // 2. PRODUCT DETAIL: QUANTITY COUNTER (+ / -)
  // ==========================================
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

  // ==========================================
  // 3. NAVBAR MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden');
      if (closeIcon) closeIcon.classList.toggle('hidden');
    });
  }

  // ==========================================
  // 4. HERO SLIDER SECTION
  // ==========================================
  const wrapper = document.getElementById('sliderWrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  if (wrapper) {
    let currentIndex = 0;
    const totalSlides = 5;

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
    const sliderContainer = document.querySelector('.group');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
      sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
    }
  }

  // ==========================================
  // 5. SWIPER SLIDERS (BRANDS & POPULAR)
  // ==========================================
  if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.brandsSwiper')) {
      new Swiper('.brandsSwiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false, reverseDirection: true },
        navigation: { nextEl: '.brands-swiper-next', prevEl: '.brands-swiper-prev' },
        breakpoints: {
          640: { slidesPerView: 3, spaceBetween: 30 },
          768: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 6, spaceBetween: 30 },
        },
      });
    }

    if (document.querySelector('.popularSwiper')) {
      new Swiper('.popularSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: { nextEl: '.popular-next', prevEl: '.popular-prev', lockClass: 'swiper-button-lock' },
        breakpoints: {
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 }
        }
      });
    }
  }

  // ==========================================
  // 6. CATEGORY SIDEBAR FILTER
  // ==========================================
  const categoryCheckboxes = document.querySelectorAll('.category-filter');
  const productCards = document.querySelectorAll('.product-card');

  if (categoryCheckboxes.length > 0 && productCards.length > 0) {
    function filterProducts() {
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
        card.style.display = shouldShow ? 'flex' : 'none';
      });
    }

    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });
  }

});

// Global Function for Mobile Submenu Accordion
function toggleSubMenu(submenuId, arrowId) {
  const submenu = document.getElementById(submenuId);
  const arrow = document.getElementById(arrowId);

  if (submenu) submenu.classList.toggle('hidden');
  if (arrow) arrow.classList.toggle('rotate-180');
}

// product Section Section
function switchTab(tabId) {
  // 1. Hide all content panes
  const allPanes = document.querySelectorAll('.tab-pane');
  allPanes.forEach(pane => pane.classList.add('hidden'));

  // 2. Reset styles on all tab buttons
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach(btn => {
    btn.classList.remove('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
    btn.classList.add('text-gray-700', 'border-transparent');
  });

  // 3. Show clicked tab content
  const activePane = document.getElementById(`content-${tabId}`);
  if (activePane) {
    activePane.classList.remove('hidden');
  }

  // 4. Highlight clicked tab button
  const activeBtn = document.getElementById(`tab-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-700', 'border-transparent');
    activeBtn.classList.add('text-[#ff0055]', 'border-[#ff0055]', 'font-semibold');
  }
}

// Product Reviw Submit

document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (reviewForm) {
      reviewForm.addEventListener('submit', function (e) {
        // Page reload prevent karein
        e.preventDefault();

        // Values read karein
        const nameInput = document.getElementById('review-name');
        const emailInput = document.getElementById('review-email');
        const ratingInput = document.getElementById('review-rating');
        const textInput = document.getElementById('review-text');

        const ratingVal = parseInt(ratingInput.value);
        const stars = '★'.repeat(ratingVal) + '☆'.repeat(5 - ratingVal);

        // New Card Element create karein
        const newReview = document.createElement('div');
        newReview.className = 'border-b border-gray-100 pb-3 transition-all duration-300 opacity-0 transform -translate-y-2';
        newReview.innerHTML = `
          <div class="flex items-center space-x-2 mb-1">
            <span class="font-bold text-gray-900">${nameInput.value}</span>
            <span class="text-black text-xs">${stars}</span>
          </div>
          <p class="text-gray-600">${textInput.value}</p>
        `;

        // List me sabse upar insert karein
        if (reviewsList) {
          reviewsList.prepend(newReview);
          
          // Animation effect
          setTimeout(() => {
            newReview.classList.remove('opacity-0', '-translate-y-2');
          }, 50);
        }

        // Form reset karein
        reviewForm.reset();
      });
    }
  });

  // Product Section m Add to Model

  const modal = document.getElementById('productModal');
    const modalContainer = document.getElementById('modalContainer');
    const closeModalBtn = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const modalOldPrice = document.getElementById('modalOldPrice');

    // Har product card ke image-wrapper aur title par click listener bind karein
    document.querySelectorAll('.product-card').forEach(card => {
      const clickableElements = card.querySelectorAll('.image-wrapper, h3');
      
      clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Card se dynamic data fetch karein
          const imgSrc = card.querySelector('.product-card-img')?.src;
          const title = card.querySelector('h3')?.innerText;
          const category = card.querySelector('p')?.innerText;
          const price = card.querySelector('.flex span:first-child')?.innerText;
          const oldPriceElement = card.querySelector('.flex span.line-through');
          const oldPrice = oldPriceElement ? oldPriceElement.innerText : '';

          // Modal me content populate karein
          modalImg.src = imgSrc;
          modalTitle.innerText = title;
          modalCategory.innerText = category;
          modalPrice.innerText = price;
          modalOldPrice.innerText = oldPrice;

          // Modal ko display karein
          modal.classList.remove('opacity-0', 'pointer-events-none');
          modalContainer.classList.remove('scale-95');
          modalContainer.classList.add('scale-100');
        });
      });
    });

    // Modal close karne ka function
    function hideModal() {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modalContainer.classList.remove('scale-100');
      modalContainer.classList.add('scale-95');
    }

    closeModalBtn.addEventListener('click', hideModal);

    // Modal ke bahar dark area par click hone par close karein
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    // Product Gallery

 document.addEventListener("DOMContentLoaded", function () {
      var featuredSwiper = new Swiper(".productSlider", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        },
        pagination: {
          el: ".slider-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    });

    

 document.addEventListener("DOMContentLoaded", function () {
      var featuredSwiper = new Swiper(".productSlider", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        },
        pagination: {
          el: ".slider-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    });



    // Product Gallery Slider 
    // Multiple unique images data for each product
    const productsData = [
      {
        id: 0,
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop'
        ]
      },
      {
        id: 1,
        images: [
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop'
        ]
      },
      {
        id: 2,
        images: [
          'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop'
        ]
      },
      {
        id: 3,
        images: [
          'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop'
        ]
      },
      {
        id: 4,
        images: [
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop'
        ]
      }
    ];

    let currentProductIndex = 0;
    let currentImageIndex = 0;

    function openSliderModal(productIndex) {
      currentProductIndex = productIndex;
      currentImageIndex = 0;
      updateSlider();
      document.getElementById('sliderModal').classList.remove('hidden');
    }

    function closeSliderModal() {
      document.getElementById('sliderModal').classList.add('hidden');
      resetZoom();
    }

    function updateSlider() {
      resetZoom();
      const images = productsData[currentProductIndex].images;
      const imgElement = document.getElementById('currentSliderImg');
      const counterElement = document.getElementById('imageCounter');

      // Smooth opacity effect
      imgElement.style.opacity = '0.3';
      setTimeout(() => {
        imgElement.src = images[currentImageIndex];
        imgElement.style.opacity = '1';
      }, 120);

      counterElement.innerText = `${currentImageIndex + 1} / ${images.length}`;
    }

    function nextImage() {
      const images = productsData[currentProductIndex].images;
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateSlider();
    }

    function prevImage() {
      const images = productsData[currentProductIndex].images;
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateSlider();
    }

    function toggleZoom() {
      const imgElement = document.getElementById('currentSliderImg');
      imgElement.classList.toggle('zoomed');
    }

    function resetZoom() {
      const imgElement = document.getElementById('currentSliderImg');
      if (imgElement) {
        imgElement.classList.remove('zoomed');
      }
    }

    function addToCart(name) {
      alert(`${name} added to cart!`);
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      const modal = document.getElementById('sliderModal');
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeSliderModal();
      }
    });

    // Close modal on outer click
    document.getElementById('sliderModal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeSliderModal();
      }
    });


