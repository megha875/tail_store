(() => {
  const apiBaseUrl = `http://${window.location.hostname}:5501`;
  const getUserId = () => localStorage.getItem('userId') || 'guest_user';

  function updateBadge(cart) {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;
    const count = (cart?.items || []).reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    badge.textContent = String(count);
  }

  function saveCartLocally(cart) {
    const items = (cart?.items || []).flatMap(item => {
      const product = item.productId;
      if (!product || typeof product !== 'object') return [];
      const id = String(product._id || '');
      if (!id) return [];
      return [{
        id,
        _id: id,
        productId: id,
        name: product.name || product.title || 'Product',
        title: product.title || product.name || 'Product',
        price: Number(product.price) || 0,
        image: product.image || product.imageUrl || '',
        category: product.category || 'General',
        quantity: Number(item.quantity) || 1
      }];
    });
    localStorage.setItem('cart', JSON.stringify(items));
  }

  async function requestCart() {
    const response = await fetch(`${apiBaseUrl}/api/cart?userId=${encodeURIComponent(getUserId())}`);
    const cart = await response.json();
    if (!response.ok) throw new Error(cart.message || `Cart request failed (HTTP ${response.status})`);

    await Promise.all((cart.items || []).map(async item => {
      const productId = typeof item.productId === 'object'
        ? item.productId?._id
        : item.productId;
      if (!productId || (typeof item.productId === 'object' && item.productId.name)) return;
      const productResponse = await fetch(`${apiBaseUrl}/api/products/${encodeURIComponent(productId)}`);
      if (!productResponse.ok) {
        throw new Error(`Cart product ${productId} could not be loaded (HTTP ${productResponse.status})`);
      }
      item.productId = await productResponse.json();
    }));

    saveCartLocally(cart);
    updateBadge(cart);
    return cart;
  }

  async function add(product, event) {
    event?.preventDefault();
    event?.stopPropagation();
    const productId = String(product?._id || product?.id || '');
    if (!productId) {
      alert('Product ID nahi mila, isliye cart mein add nahi hua.');
      return;
    }

    const button = event?.target?.closest('button') ||
      (event?.currentTarget instanceof HTMLButtonElement ? event.currentTarget : null);
    if (button) {
      button.disabled = true;
      button.textContent = 'Adding...';
    }

    let added = false;
    try {
      const response = await fetch(`${apiBaseUrl}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getUserId(), productId, quantity: 1 })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Cart add failed (HTTP ${response.status})`);
      await requestCart();
      added = true;
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert(error.message || 'Product cart mein add nahi ho saka. Server check karein.');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = added ? 'Added!' : 'Add to Cart';
        if (added) {
          window.setTimeout(() => {
            button.textContent = 'Add to Cart';
          }, 1500);
        }
      }
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  async function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('grandTotal');
    container.textContent = 'Loading cart...';

    try {
      const cart = await requestCart();
      const items = (cart.items || []).filter(item => item.productId);
      if (!items.length) {
        container.innerHTML = `
          <div class="rounded-xl border bg-white p-10 text-center">
            <div class="mb-4 text-5xl">🛒</div>
            <h2 class="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
            <p class="mt-2 text-gray-500">Add some products to your cart.</p>
            <a href="index.html" class="mt-6 inline-block rounded-lg bg-[#FF0043] px-6 py-3 font-semibold text-white">Continue Shopping</a>
          </div>`;
        if (subtotalElement) subtotalElement.textContent = '₹0';
        if (totalElement) totalElement.textContent = '₹0';
        return;
      }

      let subtotal = 0;
      container.innerHTML = items.map(item => {
        const product = item.productId;
        const productId = String(product._id);
        const quantity = Number(item.quantity) || 1;
        const price = Number(product.price) || 0;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        return `
          <article class="rounded-xl border bg-white p-4 shadow-sm">
            <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div class="flex items-center gap-4">
                <img src="${escapeHtml(product.image || product.imageUrl || 'https://via.placeholder.com/100')}" alt="${escapeHtml(product.name || product.title || 'Product')}" class="h-24 w-24 rounded-lg object-cover">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">${escapeHtml(product.name || product.title || 'Product')}</h3>
                  <p class="mt-1 text-sm text-gray-500">${escapeHtml(product.category || 'General')}</p>
                  <p class="mt-2 font-bold text-[#FF0043]">₹${price}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex items-center overflow-hidden rounded-lg border">
                  <button type="button" data-cart-action="decrease" data-product-id="${escapeHtml(productId)}" class="bg-gray-100 px-3 py-2 font-bold hover:bg-gray-200" aria-label="Decrease quantity">−</button>
                  <span class="px-4 py-2 font-semibold">${quantity}</span>
                  <button type="button" data-cart-action="increase" data-product-id="${escapeHtml(productId)}" class="bg-gray-100 px-3 py-2 font-bold hover:bg-gray-200" aria-label="Increase quantity">+</button>
                </div>
                <span class="min-w-[80px] text-right font-bold text-gray-900">₹${itemTotal}</span>
                <button type="button" data-cart-action="remove" data-product-id="${escapeHtml(productId)}" class="text-xl text-red-500 hover:text-red-700" aria-label="Remove product">×</button>
              </div>
            </div>
          </article>`;
      }).join('');
      if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`;
      if (totalElement) totalElement.textContent = `₹${subtotal}`;
    } catch (error) {
      console.error('Cart load failed:', error);
      container.innerHTML = `
        <div class="rounded-xl border border-red-200 bg-white p-8 text-center text-red-600">
          Cart load nahi ho saka. Server/API connection check karke page refresh karein.
        </div>`;
    }
  }

  async function updateQuantity(productId, action) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getUserId(), productId, action })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Cart update failed (HTTP ${response.status})`);
      await renderCart();
    } catch (error) {
      console.error('Cart quantity update failed:', error);
      alert(error.message || 'Quantity update nahi ho saka.');
    }
  }

  async function remove(productId) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/cart/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getUserId(), productId })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Cart remove failed (HTTP ${response.status})`);
      await renderCart();
    } catch (error) {
      console.error('Cart item removal failed:', error);
      alert(error.message || 'Product cart se remove nahi ho saka.');
    }
  }

  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-cart-product]');
    if (addButton) {
      add({ id: addButton.dataset.cartProduct }, event);
      return;
    }

    const actionButton = event.target.closest('[data-cart-action]');
    if (!actionButton) return;
    const { cartAction, productId } = actionButton.dataset;
    if (cartAction === 'remove') remove(productId);
    else updateQuantity(productId, cartAction);
  });

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems')) renderCart();
    else requestCart().catch(error => console.error('Cart badge load failed:', error));
  });
  window.addEventListener('cartUpdated', () => {
    if (document.getElementById('cartItems')) renderCart();
    else requestCart().catch(error => console.error('Cart badge refresh failed:', error));
  });

  window.TailStoreCart = { add, render: renderCart, updateBadge };
})();
