document.addEventListener('DOMContentLoaded', loadProductDetails);

async function loadProductDetails() {
  const detailContainer = document.getElementById('detail-card');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || params.get('productId');
  if (!productId) {
    showProductDetailMessage(detailContainer, 'Product ID URL mein nahi mila.');
    return;
  }

  try {
    const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const apiOrigin = isLocalHost || window.location.protocol === 'file:'
      ? 'http://localhost:5501'
      : window.location.origin;
    const response = await fetch(`${apiOrigin}/api/products/${encodeURIComponent(productId)}`);
    const responseText = await response.text();
    let product;
    try {
      product = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`Product API ne JSON ke bajay HTML bheja (HTTP ${response.status}). Product page ko http://localhost:5500 par kholein.`);
    }

    if (!response.ok) {
      throw new Error(product.message || product.error || `Server status: ${response.status}`);
    }

    renderProductDetail(detailContainer, product);
  } catch (error) {
    console.error('Product detail load failed:', error);
    const message = error instanceof TypeError
      ? 'Backend se connection nahi ho raha. Server chala kar page ko dobara load karein.'
      : `Product load nahi hua: ${error.message}`;
    showProductDetailMessage(detailContainer, message);
  }
}

function renderProductDetail(container, product) {
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
  const gallery = [...new Set([
    product.image,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter((image) => typeof image === 'string' && image.trim()).map((image) => image.trim()))];
  const images = gallery.length ? gallery : ['assets/img/category.png'];
  const name = product.name || product.title || 'Product';
  const price = Number(product.price) || 0;
  const category = product.category || 'General';
  const description = product.description || 'Is product ke liye abhi description available nahi hai.';
  const stock = Number.isFinite(Number(product.stock)) ? Number(product.stock) : null;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 rounded-2xl shadow-lg">
      <section class="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4" aria-label="Product images">
        <div id="productThumbnails" class="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]" aria-label="Product thumbnails">
          ${images.map((image, index) => `
            <button type="button" class="product-thumbnail border-2 ${index === 0 ? 'border-indigo-600' : 'border-gray-200'} rounded-lg overflow-hidden w-20 h-20 shrink-0 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" data-index="${index}" aria-label="Show product image ${index + 1}" aria-pressed="${index === 0}">
              <img src="${escapeHTML(image)}" alt="${escapeHTML(name)} thumbnail ${index + 1}" class="w-full h-full object-cover">
            </button>
          `).join('')}
        </div>
        <div class="relative w-full min-h-[350px] sm:h-[500px] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
          <img id="main-product-img" src="${escapeHTML(images[0])}" alt="${escapeHTML(name)}" class="w-full h-full min-h-[350px] sm:h-[500px] object-contain p-3">
          ${images.length > 1 ? `
            <button type="button" id="previousProductImage" class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow" aria-label="Previous product image">&#8249;</button>
            <button type="button" id="nextProductImage" class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow" aria-label="Next product image">&#8250;</button>
          ` : ''}
        </div>
      </section>

      <section class="lg:col-span-5 flex flex-col gap-4">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-max">${escapeHTML(category)}</span>
        <h1 class="text-3xl font-bold text-gray-900">${escapeHTML(name)}</h1>
        <p class="text-3xl font-extrabold text-emerald-600">₹${price.toLocaleString('en-IN')}</p>
        <p class="text-gray-600 leading-relaxed whitespace-pre-line">${escapeHTML(description)}</p>
        ${stock !== null ? `<p class="text-sm ${stock > 0 ? 'text-gray-500' : 'text-red-600'}">${stock > 0 ? `${stock} in stock` : 'Out of stock'}</p>` : ''}
        <button type="button" id="addProductToCart" class="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3.5 px-6 rounded-xl transition duration-200 shadow-lg" ${stock === 0 ? 'disabled' : ''}>
          ${stock === 0 ? 'Out of stock' : 'Add to Cart'}
        </button>
      </section>
    </div>
  `;

  let activeIndex = 0;
  const mainImage = container.querySelector('#main-product-img');
  const thumbnails = [...container.querySelectorAll('.product-thumbnail')];
  const selectImage = (index) => {
    activeIndex = (index + images.length) % images.length;
    mainImage.src = images[activeIndex];
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const selected = thumbnailIndex === activeIndex;
      thumbnail.classList.toggle('border-indigo-600', selected);
      thumbnail.classList.toggle('border-gray-200', !selected);
      thumbnail.setAttribute('aria-pressed', String(selected));
    });
  };

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => selectImage(Number(thumbnail.dataset.index)));
  });
  container.querySelector('#previousProductImage')?.addEventListener('click', () => selectImage(activeIndex - 1));
  container.querySelector('#nextProductImage')?.addEventListener('click', () => selectImage(activeIndex + 1));
  container.querySelector('#addProductToCart')?.addEventListener('click', () => {
    if (typeof window.addToCart !== 'function') {
      console.error('Add-to-cart handler is not available on this page.');
      return;
    }
    window.addToCart(product);
  });
}

function showProductDetailMessage(container, message) {
  container.innerHTML = `<p class="py-12 text-center text-red-600 font-semibold">${message}</p>`;
}
