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
      ? 'http://localhost:5000'
      : window.location.origin;
    const response = await fetch(`${apiOrigin}/api/products/${encodeURIComponent(productId)}`);
    const responseText = await response.text();
    let product;
    try {
      product = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`Product API ne JSON ke bajay HTML bheja (HTTP ${response.status}). Product page ko http://localhost:5000 par kholein.`);
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
  
  const colors = Array.isArray(product.colors) ? product.colors.filter(Boolean) : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes.filter(Boolean) : [];
  const isValidCssColor = (value) => window.CSS && CSS.supports('color', String(value).trim());

  // Thumbnails HTML
  let thumbnailsHTML = '';
  images.forEach((image, index) => {
    const isFirst = index === 0;
    thumbnailsHTML += `<button type="button" class="product-thumbnail border-2 ${isFirst ? 'border-[#FF0043]' : 'border-gray-200'} rounded-lg overflow-hidden w-20 h-20 shrink-0 hover:border-[#FF0043] focus:outline-none focus:ring-2 focus:ring-[#FF0043]" data-index="${index}" aria-label="Show product image ${index + 1}" aria-pressed="${isFirst}">
      <img src="${escapeHTML(image)}" alt="${escapeHTML(name)} thumbnail ${index + 1}" class="w-full h-full object-cover">
    </button>`;
  });

  // Colors HTML
  let colorsHTML = '';
  if (colors.length > 0) {
    let colorButtons = '';
    colors.forEach((color) => {
      const safeColor = escapeHTML(color);
      if (isValidCssColor(color)) {
        colorButtons += `<button type="button" role="radio" aria-checked="false" aria-label="${safeColor}" title="${safeColor}" data-color="${safeColor}" class="color-option color-swatch w-9 h-9 rounded-lg border-2 border-gray-200 hover:border-[#FF0043] focus:outline-none focus:ring-2 focus:ring-[#FF0043]" style="background:${safeColor}"></button>`;
      } else {
        colorButtons += `<button type="button" role="radio" aria-checked="false" data-color="${safeColor}" class="color-option inline-flex items-center border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:border-[#FF0043] focus:outline-none focus:ring-2 focus:ring-[#FF0043]">${safeColor}</button>`;
      }
    });

    colorsHTML = `
      <div id="colorOptions" class="mt-2">
        <p class="text-sm font-semibold text-gray-800 mb-2">Color: <span id="selectedColorLabel" class="font-normal text-gray-500">Select a color</span></p>
        <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Select color">
          ${colorButtons}
        </div>
      </div>
    `;
  }

  // Sizes HTML
  let sizesHTML = '';
  if (sizes.length > 0) {
    let sizeButtons = '';
    sizes.forEach((size) => {
      const safeSize = escapeHTML(size);
      sizeButtons += `<button type="button" role="radio" aria-checked="false" data-size="${safeSize}" class="size-option min-w-[3rem] border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-[#FF0043] focus:outline-none focus:ring-2 focus:ring-[#FF0043]">${safeSize}</button>`;
    });

    sizesHTML = `
      <div id="sizeOptions" class="mt-2">
        <p class="text-sm font-semibold text-gray-800 mb-2">Size: <span id="selectedSizeLabel" class="font-normal text-gray-500">Select a size</span></p>
        <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
          ${sizeButtons}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 rounded-2xl shadow-lg">
      <section class="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4" aria-label="Product images">
        <div id="productThumbnails" class="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]" aria-label="Product thumbnails">
          ${thumbnailsHTML}
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
        <span class="text-xs font-bold uppercase tracking-wider text-[#FF0043] bg-[#FF0043]/10 px-3 py-1 rounded-full w-max">${escapeHTML(category)}</span>
        <h1 class="text-3xl font-bold text-gray-900">${escapeHTML(name)}</h1>
        <p class="text-3xl font-extrabold text-[#FF0043]">₹${price.toLocaleString('en-IN')}</p>
        <p class="text-gray-600 leading-relaxed whitespace-pre-line">${escapeHTML(description)}</p>
        ${stock !== null ? `<p class="text-sm ${stock > 0 ? 'text-gray-500' : 'text-red-600'}">${stock > 0 ? `${stock} in stock` : 'Out of stock'}</p>` : ''}
        
        ${colorsHTML}
        ${sizesHTML}

        <p id="optionError" class="hidden text-sm font-semibold text-red-600"></p>
        <button type="button" id="addProductToCart" class="mt-2 w-full bg-[#FF0043] hover:bg-[#d90039] disabled:bg-gray-400 text-white font-semibold py-3.5 px-6 rounded-full transition duration-200" ${stock === 0 ? 'disabled' : ''}>
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
      thumbnail.classList.toggle('border-[#FF0043]', selected);
      thumbnail.classList.toggle('border-gray-200', !selected);
      thumbnail.setAttribute('aria-pressed', String(selected));
    });
  };

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => selectImage(Number(thumbnail.dataset.index)));
  });
  container.querySelector('#previousProductImage')?.addEventListener('click', () => selectImage(activeIndex - 1));
  container.querySelector('#nextProductImage')?.addEventListener('click', () => selectImage(activeIndex + 1));

  let selectedColor = '';
  let selectedSize = '';
  const optionError = container.querySelector('#optionError');
  const showOptionError = (message) => {
    if (!optionError) return;
    optionError.textContent = message;
    optionError.classList.toggle('hidden', !message);
  };

  const bindOptionGroup = (selector, dataKey, labelSelector, onSelect) => {
    const buttons = [...container.querySelectorAll(selector)];
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset[dataKey];
        buttons.forEach((other) => {
          const active = other === button;
          other.classList.toggle('border-[#FF0043]', active);
          other.classList.toggle('bg-[#FF0043]/10', active);
          other.classList.toggle('border-gray-200', !active);
          if (other.classList.contains('color-swatch')) {
            other.classList.toggle('ring-2', active);
            other.classList.toggle('ring-offset-2', active);
            other.classList.toggle('ring-[#FF0043]', active);
          }
          other.setAttribute('aria-checked', String(active));
        });
        const label = container.querySelector(labelSelector);
        if (label) label.textContent = value;
        onSelect(value);
        showOptionError('');
      });
    });
  };

  bindOptionGroup('.color-option', 'color', '#selectedColorLabel', (value) => {
    selectedColor = value;
    const variants = Array.isArray(product.colorImages) ? product.colorImages : [];
    const variant = variants.find((item) =>
      String(item.color || '').trim().toLowerCase() === String(value).trim().toLowerCase()
    );

    let targetImage = '';
    if (variant && (variant.image || (Array.isArray(variant.images) && variant.images[0]))) {
      targetImage = variant.image || variant.images[0];
    } else {
      const colorIndex = colors.indexOf(value);
      targetImage = images[colorIndex % images.length] || images[0];
    }

    if (targetImage) {
      mainImage.src = targetImage;
      mainImage.alt = `${name} - ${value}`;
      if (thumbnails[0]) {
        const thumbImage = thumbnails[0].querySelector('img');
        if (thumbImage) thumbImage.src = targetImage;
      }
      activeIndex = 0;
      thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('border-[#FF0043]', index === 0);
        thumbnail.classList.toggle('border-gray-200', index !== 0);
        thumbnail.setAttribute('aria-pressed', String(index === 0));
      });
    }
  });

  bindOptionGroup('.size-option', 'size', '#selectedSizeLabel', (value) => { 
    selectedSize = value; 
  });

  container.querySelector('#addProductToCart')?.addEventListener('click', (event) => {
    if (colors.length && !selectedColor) {
      showOptionError('Please select a color before adding to cart.');
      return;
    }
    if (sizes.length && !selectedSize) {
      showOptionError('Please select a size before adding to cart.');
      return;
    }
    if (typeof window.TailStoreCart?.add !== 'function') {
      console.error('Cart client has not loaded.');
      alert('Cart abhi load nahi hua. Page refresh karke dobara try karein.');
      return;
    }
    window.TailStoreCart.add({ ...product, color: selectedColor, size: selectedSize }, event);
  });
}

function showProductDetailMessage(container, message) {
  container.innerHTML = `<p class="py-12 text-center text-red-600 font-semibold">${message}</p>`;
}






const tabButtons = container.querySelectorAll('.tab-btn');
  const tabContent = container.querySelector('#tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => {
        b.classList.remove('border-b-2', 'border-[#FF0043]', 'text-gray-900', 'font-bold');
        b.classList.add('text-gray-500', 'font-semibold');
      });
      e.currentTarget.classList.add('border-b-2', 'border-[#FF0043]', 'text-gray-900', 'font-bold');
      e.currentTarget.classList.remove('text-gray-500', 'font-semibold');

      const tabKey = e.currentTarget.getAttribute('data-tab');
      if (tabKey === 'description') {
        tabContent.innerHTML = escapeHTML(product.description || 'Description available nahi hai.');
      } else if (tabKey === 'specifications') {
        tabContent.innerHTML = escapeHTML(product.specifications || 'Specifications available nahi hai.');
      } else if (tabKey === 'care') {
        tabContent.innerHTML = escapeHTML(product.care || 'Care instructions available nahi hai.');
      } else if (tabKey === 'seller') {
        tabContent.innerHTML = escapeHTML(product.seller || 'Seller details available nahi hai.');
      }
    });
  });