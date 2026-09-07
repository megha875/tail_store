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
const wrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
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

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    updateSlider();

    let autoPlay = setInterval(nextSlide, 3000);

    const sliderContainer = document.querySelector('.group');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
    sliderContainer.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 3000));
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


