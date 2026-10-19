(() => {
  const wrapper = document.getElementById('sliderWrapper');
  const dotsContainer = document.getElementById('banner-dots');
  const previousButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const loadingMessage = document.getElementById('banner-loading');
  if (!wrapper || !dotsContainer) return;

  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = isLocalHost ? `http://${apiHost}:5501` : window.location.origin;
  let activeIndex = 0;
  let autoplayTimer;

  function safeHref(value) {
    const href = typeof value === 'string' ? value.trim() : '';
    if (/^https?:\/\//i.test(href) || /^(\/|\.\/)/.test(href)) return href;
    if (/^[\w-][\w./?&=#%-]*$/.test(href)) return href;
    return 'shop.html';
  }

  function createSlide(banner) {
    const slide = document.createElement('div');
    slide.className = 'relative w-full flex-shrink-0';

    const image = document.createElement('img');
    image.src = /^https?:\/\//i.test(banner.image) || /^(\/|\.\/)/.test(banner.image)
      ? banner.image
      : `./${banner.image}`;
    image.alt = banner.title || 'TailStore collection';
    image.loading = 'lazy';
    image.className = 'h-[400px] w-full object-cover brightness-75 sm:h-[550px] lg:h-[700px]';
    slide.appendChild(image);

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 flex flex-col items-center justify-center px-4 text-center';
    if (banner.eyebrow) {
      const eyebrow = document.createElement('span');
      eyebrow.className = 'mb-2 block text-sm font-semibold uppercase tracking-widest text-gray-200 sm:text-base';
      eyebrow.textContent = banner.eyebrow;
      overlay.appendChild(eyebrow);
    }

    const title = document.createElement('h2');
    title.className = 'mb-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl';
    title.textContent = banner.title;
    overlay.appendChild(title);

    if (banner.description) {
      const description = document.createElement('p');
      description.className = 'mb-8 max-w-lg text-sm text-gray-200 sm:text-lg';
      description.textContent = banner.description;
      overlay.appendChild(description);
    }

    const bannerButtons = Array.isArray(banner.buttons) && banner.buttons.length
      ? banner.buttons
      : banner.buttonText ? [{ text: banner.buttonText, link: banner.link }] : [];
    if (bannerButtons.length) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'flex flex-wrap items-center justify-center gap-3';
      bannerButtons.forEach(item => {
      const button = document.createElement('a');
      button.href = safeHref(item.link);
      button.className = 'inline-block rounded-full border-2 border-red-600 bg-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-white hover:text-red-600 active:scale-95 sm:text-base';
      button.textContent = item.text;
      buttonContainer.appendChild(button);
      });
      overlay.appendChild(buttonContainer);
    }

    slide.appendChild(overlay);
    return slide;
  }

  function updateSlider() {
    const slides = wrapper.children;
    if (!slides.length) return;
    activeIndex = (activeIndex + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle('w-8', index === activeIndex);
      dot.classList.toggle('bg-white', index === activeIndex);
      dot.classList.toggle('w-3', index !== activeIndex);
      dot.classList.toggle('bg-white/50', index !== activeIndex);
    });
  }

  function goToSlide(index) {
    activeIndex = index;
    updateSlider();
  }

  async function loadBanners() {
    try {
      const response = await fetch(`${apiBaseUrl}/api/banners?placement=hero`);
      const responseText = await response.text();
      let banners;
      try {
        banners = responseText ? JSON.parse(responseText) : [];
      } catch {
        throw new Error(`Banner API returned an invalid response (HTTP ${response.status}).`);
      }
      if (!response.ok) {
        throw new Error(banners.message || `Banners could not be loaded (HTTP ${response.status}).`);
      }
      if (!Array.isArray(banners)) throw new Error('Banner API returned an invalid banner list.');

      wrapper.replaceChildren();
      dotsContainer.replaceChildren();
      if (!banners.length) {
        const empty = document.createElement('div');
        empty.className = 'flex min-h-[400px] w-full flex-shrink-0 items-center justify-center bg-gray-900 px-4 text-center text-white sm:min-h-[550px] lg:min-h-[700px]';
        empty.textContent = 'No active banners found. Add banners from the admin page.';
        wrapper.appendChild(empty);
        previousButton?.classList.add('hidden');
        nextButton?.classList.add('hidden');
        return;
      }

      banners.forEach((banner, index) => {
        wrapper.appendChild(createSlide(banner));
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot h-3 rounded-full transition-all';
        dot.setAttribute('aria-label', `Show banner ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      loadingMessage?.remove();
      activeIndex = 0;
      updateSlider();
      previousButton?.classList.toggle('hidden', banners.length < 2);
      nextButton?.classList.toggle('hidden', banners.length < 2);
      if (banners.length > 1) {
        previousButton?.addEventListener('click', () => goToSlide(activeIndex - 1));
        nextButton?.addEventListener('click', () => goToSlide(activeIndex + 1));
        autoplayTimer = window.setInterval(() => goToSlide(activeIndex + 1), 3000);
        const sliderContainer = wrapper.parentElement;
        sliderContainer?.addEventListener('mouseenter', () => window.clearInterval(autoplayTimer));
        sliderContainer?.addEventListener('mouseleave', () => {
          window.clearInterval(autoplayTimer);
          autoplayTimer = window.setInterval(() => goToSlide(activeIndex + 1), 3000);
        });
      }
    } catch (error) {
      console.error('Homepage banners could not be loaded:', error);
      wrapper.replaceChildren();
      const message = document.createElement('div');
      message.className = 'flex min-h-[400px] w-full flex-shrink-0 items-center justify-center bg-gray-900 px-4 text-center text-white sm:min-h-[550px] lg:min-h-[700px]';
      message.textContent = error.message || 'Homepage banners could not be loaded.';
      wrapper.appendChild(message);
      dotsContainer.replaceChildren();
      previousButton?.classList.add('hidden');
      nextButton?.classList.add('hidden');
    }
  }

  loadBanners();
})();
