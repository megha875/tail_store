(() => {
  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = isLocalHost ? `http://${apiHost}:5501` : window.location.origin;
  const guestIdKey = 'wishlistGuestId';

  function getWishlistUserId() {
    const userId = localStorage.getItem('userId');
    if (userId && userId !== 'guest_user' && userId !== 'undefined' && userId !== 'null') {
      return userId;
    }

    let guestId = localStorage.getItem(guestIdKey);
    if (!guestId) {
      guestId = `guest_${window.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
      localStorage.setItem(guestIdKey, guestId);
    }
    return guestId;
  }

  function setButtonState(button, isWishlisted) {
    const icon = button.querySelector('i');
    if (!icon) return;

    icon.classList.toggle('fa-solid', isWishlisted);
    icon.classList.toggle('fa-regular', !isWishlisted);
    icon.classList.toggle('text-red-500', isWishlisted);
    button.setAttribute('aria-pressed', String(isWishlisted));
    button.title = isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist';
  }

  async function loadWishlistState() {
    const buttons = [...document.querySelectorAll('.wishlist-btn[data-product-id]')];
    if (!buttons.length) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/wishlist/${encodeURIComponent(getWishlistUserId())}`
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Wishlist could not be loaded (HTTP ${response.status}).`);
      }
      const productIds = new Set(result.productIds || []);
      buttons.forEach(button => {
        setButtonState(button, productIds.has(button.dataset.productId));
      });
    } catch (error) {
      console.error('Wishlist state could not be loaded:', error);
    }
  }

  window.Wishlist = async (productId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = new URL('login.html', window.location.href).href;
      return;
    }
    if (!productId) {
      console.error('Wishlist item is missing a product ID.');
      return;
    }

    const button = event?.currentTarget?.matches?.('.wishlist-btn')
      ? event.currentTarget
      : event?.target?.closest?.('.wishlist-btn');
    if (!button || button.disabled) return;

    const userId = getWishlistUserId();
    button.disabled = true;
    try {
      const response = await fetch(`${apiBaseUrl}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: String(productId) })
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || `Wishlist update failed (HTTP ${response.status}).`);
      }
      setButtonState(button, result.isWishlisted);
      window.dispatchEvent(new CustomEvent('wishlistUpdated', {
        detail: { userId, productId: String(productId), isWishlisted: result.isWishlisted }
      }));
    } catch (error) {
      console.error('Wishlist update failed:', error);
      alert(error.message || 'Wishlist update nahi ho saki. Please try again.');
    } finally {
      button.disabled = false;
    }
  };

  document.addEventListener('DOMContentLoaded', loadWishlistState);
  document.addEventListener('wishlistProductsRendered', loadWishlistState);
})();
