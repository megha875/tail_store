(() => {
  const container = document.getElementById('category-banner-container');
  if (!container) return;

  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = isLocalHost ? `http://${apiHost}:5501` : window.location.origin;

  function safeHref(value) {
    const href = typeof value === 'string' ? value.trim() : '';
    if (/^https?:\/\/[^\s]+$/i.test(href) || /^(\/|\.\/)[\w./?&=#%-]*$/.test(href)) return href;
    if (/^[\w-][\w./?&=#%-]*$/.test(href)) return href;
    return 'shop.html';
  }

  function createCard(banner) {
    const card = document.createElement('article');
    card.className = 'group relative h-[220px] overflow-hidden rounded-2xl shadow-lg sm:h-[280px] md:h-[320px]';

    const image = document.createElement('img');
    image.src = /^https?:\/\//i.test(banner.image) || /^(\/|\.\/)/.test(banner.image)
      ? banner.image
      : `./${banner.image}`;
    image.alt = banner.title || 'Shop category';
    image.loading = 'lazy';
    image.className = 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105';
    card.appendChild(image);

    const shade = document.createElement('div');
    shade.className = 'absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50';
    card.appendChild(shade);

    const content = document.createElement('div');
    content.className = 'absolute inset-0 flex flex-col items-center justify-center p-4 text-center';

    const title = document.createElement('h2');
    title.className = 'mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl';
    title.textContent = banner.title || 'Shop';
    content.appendChild(title);

    const actions = Array.isArray(banner.buttons) && banner.buttons.length
      ? banner.buttons
      : [{ text: banner.buttonText || 'Shop now', link: banner.link }];
    const actionContainer = document.createElement('div');
    actionContainer.className = 'flex flex-wrap items-center justify-center gap-2';
    actions.forEach(actionData => {
      const action = document.createElement('a');
      action.href = safeHref(actionData.link || banner.link);
      action.className = 'rounded-full bg-[#ff0055] px-5 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#d90048] sm:text-sm';
      action.textContent = actionData.text || 'Shop now';
      actionContainer.appendChild(action);
    });
    content.appendChild(actionContainer);
    card.appendChild(content);
    return card;
  }

  async function loadCategoryBanners() {
    try {
      const response = await fetch(`${apiBaseUrl}/api/banners?placement=category`);
      const responseText = await response.text();
      let banners;
      try {
        banners = responseText ? JSON.parse(responseText) : [];
      } catch {
        throw new Error(`Category banner API returned an invalid response (HTTP ${response.status}).`);
      }
      if (!response.ok) {
        throw new Error(banners.message || `Category banners could not be loaded (HTTP ${response.status}).`);
      }
      if (!Array.isArray(banners) || !banners.length) {
        throw new Error('No category banners are configured in MongoDB.');
      }
      container.replaceChildren(...banners.map(createCard));
    } catch (error) {
      console.error('Category banners could not be loaded:', error);
      const message = document.createElement('p');
      message.className = 'col-span-full rounded-xl bg-gray-100 px-4 py-8 text-center text-sm font-semibold text-red-600';
      message.textContent = error.message || 'Category banners could not be loaded.';
      container.replaceChildren(message);
    }
  }

  loadCategoryBanners();
})();
