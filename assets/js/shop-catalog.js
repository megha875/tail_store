(() => {
  const container = document.getElementById('catalog-products');
  const title = document.getElementById('collection-title');
  const description = document.getElementById('collection-description');
  if (!container || !title || !description) return;

  const collection = new URLSearchParams(window.location.search).get('collection') || 'shop';
  const collections = {
    shop: {
      title: 'Shop All Products',
      description: 'Explore the latest styles from TailStore.'
    },
    'new-arrivals': {
      title: 'New Arrivals',
      description: 'Discover the newest additions to our collection.'
    },
    sale: {
      title: 'Sale',
      description: 'Shop products selected for our sale collection.'
    }
  };
  const selectedCollection = collections[collection] ? collection : 'shop';
  title.textContent = collections[selectedCollection].title;
  description.textContent = collections[selectedCollection].description;

  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = ['localhost', '127.0.0.1'].includes(apiHost)
<<<<<<< HEAD
    ? `http://${apiHost}:5000/api`
=======
    ? `http://${apiHost}:5501/api`
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
    : `${window.location.origin}/api`;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  async function loadCollection() {
    try {
      const query = new URLSearchParams({ collection: selectedCollection, includeAll: 'true' });
      const response = await fetch(`${apiBaseUrl}/products?${query}`);
      const products = await response.json();
      if (!response.ok) {
        throw new Error(products.message || `Products could not be loaded (HTTP ${response.status}).`);
      }
      if (!Array.isArray(products)) throw new Error('Products API returned an invalid list.');

      if (!products.length) {
        container.innerHTML = `<p class="col-span-full py-10 text-center text-gray-500">${selectedCollection === 'sale' ? 'No sale products yet. Add products to the Sale page from the admin page.' : 'No products found in this collection.'}</p>`;
        return;
      }

      container.innerHTML = products.map(product => {
        const productId = escapeHtml(product._id || product.id);
        const name = escapeHtml(product.name || product.title || 'Product');
        const image = escapeHtml(product.image || 'https://via.placeholder.com/400');
        const categoryName = escapeHtml(product.category || 'General');
        const price = Number(product.price) || 0;
        const badge = selectedCollection === 'sale'
          ? '<span class="absolute left-3 top-3 rounded-full bg-[#ff0055] px-3 py-1 text-xs font-bold text-white">SALE</span>'
          : selectedCollection === 'new-arrivals'
            ? '<span class="absolute left-3 top-3 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">NEW</span>'
            : '';

        return `
          <article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <a href="product-detail.html?id=${productId}" class="relative block">
              <img src="${image}" alt="${name}" loading="lazy" class="h-64 w-full object-cover">
              ${badge}
            </a>
            <div class="p-4">
              <p class="text-xs uppercase tracking-wide text-gray-500">${categoryName}</p>
              <h2 class="mt-1 truncate text-lg font-bold text-gray-900">${name}</h2>
              <p class="mt-2 text-lg font-bold text-[#ff0055]">₹${price}</p>
              <button type="button" data-cart-product="${productId}" class="mt-4 w-full rounded-lg bg-[#ff0055] px-4 py-2.5 font-semibold text-white transition hover:bg-[#d90048]">
                Add to Cart
              </button>
            </div>
          </article>`;
      }).join('');
    } catch (error) {
      console.error('Shop collection could not be loaded:', error);
      container.innerHTML = `<p class="col-span-full py-10 text-center text-red-600">${escapeHtml(error.message || 'Products could not be loaded.')}</p>`;
    }
  }

  loadCollection();
})();
