(() => {
  const container = document.getElementById('promo-banner-container');
  if (!container) return;

  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiHost = window.location.hostname || '127.0.0.1';


  function safeHref(value) {
    const href = typeof value === 'string' ? value.trim() : '';
    if (/^https?:\/\/[^\s]+$/i.test(href) || /^(\/|\.\/)[\w./?&=#%-]*$/.test(href)) return href;
    if (/^[\w-][\w./?&=#%-]*$/.test(href)) return href;
    return 'shop.html';
  }

  function createBanner(banner) {
    const card = document.createElement('article');
    card.className = 'relative mx-auto flex h-[260px] w-full items-center justify-center overflow-hidden rounded-xl shadow-lg sm:h-[340px]';

    const image = document.createElement('img');
    image.src = /^https?:\/\//i.test(banner.image) || /^(\/|\.\/)/.test(banner.image)
      ? banner.image
      : `./${banner.image}`;
    image.alt = banner.title || 'TailStore shop promotion';
    image.loading = 'lazy';
    image.className = 'absolute inset-0 h-full w-full object-cover';
    card.appendChild(image);

    const shade = document.createElement('div');
    shade.className = 'absolute inset-0 bg-black/55';
    card.appendChild(shade);

    const content = document.createElement('div');
    content.className = 'relative z-10 mx-auto max-w-3xl space-y-4 px-4 text-center sm:space-y-6';

    if (banner.eyebrow) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'text-sm font-semibold uppercase tracking-widest text-white/90';
      eyebrow.textContent = banner.eyebrow;
      content.appendChild(eyebrow);
    }

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl';
    title.textContent = banner.title || 'Welcome to Our Shop';
    content.appendChild(title);

    if (banner.description) {
      const description = document.createElement('p');
      description.className = 'mx-auto max-w-xl text-sm text-white/90 sm:text-base';
      description.textContent = banner.description;
      content.appendChild(description);
    }

    const buttons = Array.isArray(banner.buttons) && banner.buttons.length
      ? banner.buttons
      : banner.buttonText ? [{ text: banner.buttonText, link: banner.link }] : [];
    if (buttons.length) {
      const actions = document.createElement('div');
      actions.className = 'flex flex-wrap items-center justify-center gap-3';
      buttons.forEach(buttonData => {
        const button = document.createElement('a');
        button.href = safeHref(buttonData.link);
        button.className = 'rounded-full bg-[#ff0048] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#e0003f]';
        button.textContent = buttonData.text || 'Shop Now';
        actions.appendChild(button);
      });
      content.appendChild(actions);
    }

    card.appendChild(content);
    return card;
  }

  async function loadPromoBanner() {
    try {
      const response = await fetch(`${apiBaseUrl}/api/banners?placement=promo`);
      const responseText = await response.text();
      let banners;
      try {
        banners = responseText ? JSON.parse(responseText) : [];
      } catch {
        throw new Error(`Promo banner API returned an invalid response (HTTP ${response.status}).`);
      }
      if (!response.ok) {
        throw new Error(banners.message || `Promo banner could not be loaded (HTTP ${response.status}).`);
      }
      if (!Array.isArray(banners) || !banners.length) {
        throw new Error('No shop promo banner is configured in MongoDB.');
      }
      container.replaceChildren(createBanner(banners[0]));
    } catch (error) {
      console.error('Shop promo banner could not be loaded:', error);
      const message = document.createElement('p');
      message.className = 'rounded-xl bg-gray-900 px-4 py-10 text-center text-sm font-semibold text-white';
      message.textContent = error.message || 'Shop promo banner could not be loaded.';
      container.replaceChildren(message);
    }
  }

  loadPromoBanner();
})();
