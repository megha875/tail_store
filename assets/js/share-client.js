(() => {
  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = isLocalHost ? `http://${apiHost}:5501` : window.location.origin;
  const guestIdKey = 'shareGuestId';
  let currentProduct = { id: '', title: '' };

  function getShareUserId() {
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

  function getShareUrl() {
    return new URL(
      `product-detail.html?id=${encodeURIComponent(currentProduct.id)}`,
      window.location.href
    ).href;
  }

  async function trackShare(platform) {
    const response = await fetch(`${apiBaseUrl}/api/shares`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: currentProduct.id,
        productName: currentProduct.title,
        platform,
        userId: getShareUserId()
      })
    });
    const responseText = await response.text();
    let result;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`Share API returned an invalid response (HTTP ${response.status}).`);
    }
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || `Share tracking failed (HTTP ${response.status}).`);
    }
  }

  async function copyShareLink(url) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }

    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = url;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand('copy');
    temporaryInput.remove();
    if (!copied) throw new Error('Link copy nahi ho saka. Browser permission check karein.');
  }

  window.shareProduct = (productId, productTitle, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!productId) {
      alert('Share karne ke liye product ID nahi mili.');
      return;
    }

    currentProduct = {
      id: String(productId),
      title: String(productTitle || 'Product')
    };

    const modal = document.getElementById('shareModal');
    if (modal) {
      const title = document.getElementById('modalProductTitle');
      if (title) title.textContent = currentProduct.title;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      return;
    }

    const url = getShareUrl();
    if (navigator.share) {
      navigator.share({ title: currentProduct.title, url })
        .then(() => trackShare('native'))
        .catch(error => {
          if (error.name !== 'AbortError') console.error('Product sharing failed:', error);
        });
      return;
    }

    copyShareLink(url)
      .then(() => Promise.all([
        trackShare('copy_link'),
        Promise.resolve(alert('Product link copied!'))
      ]))
      .catch(error => {
        console.error('Product link sharing failed:', error);
        alert(error.message || 'Product link share nahi ho saka.');
      });
  };

  window.shareAction = async platform => {
    if (!currentProduct.id) {
      console.error('Select a product before sharing.');
      return;
    }

    const shareUrl = getShareUrl();
    const shareSubject = `Check out ${currentProduct.title}`;
    const shareBody = `Check out this product: ${currentProduct.title}\n\n${shareUrl}`;
    const normalizedPlatform = platform === 'copyLink' ? 'copy_link' : platform;

    try {
      if (normalizedPlatform === 'copy_link') {
        await copyShareLink(shareUrl);
        closeShareModal();
        alert('Product link copied!');
      } else if (normalizedPlatform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareBody)}`, '_blank', 'noopener,noreferrer');
        closeShareModal();
      } else if (normalizedPlatform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
        closeShareModal();
      } else if (normalizedPlatform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
        closeShareModal();
      } else if (normalizedPlatform === 'gmail') {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`, '_blank', 'noopener,noreferrer');
        closeShareModal();
      } else if (normalizedPlatform === 'sms') {
        window.open(`sms:?body=${encodeURIComponent(shareBody)}`, '_blank');
        closeShareModal();
      } else {
        throw new Error('This sharing option is not supported.');
      }

      await trackShare(normalizedPlatform);
    } catch (error) {
      console.error('Product share action failed:', error);
      alert(error.message || 'Product share nahi ho saka. Please try again.');
    }
  };

  window.closeShareModal = () => {
    const modal = document.getElementById('shareModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  document.getElementById('shareModal')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) window.closeShareModal();
  });
})();
