(() => {
  const headings = document.querySelectorAll('[data-homepage-setting="latestProductsTitle"]');
  if (!headings.length) return;

  const apiHost = window.location.hostname || '127.0.0.1';
  const isLocalHost = ['localhost', '127.0.0.1'].includes(apiHost);
  const apiBaseUrl = isLocalHost || window.location.protocol === 'file:'
    ? `http://${apiHost}:5501`
    : window.location.origin;

  fetch(`${apiBaseUrl}/api/homepage/settings`)
    .then(async response => {
      const settings = await response.json();
      if (!response.ok) {
        throw new Error(settings.message || `Homepage settings load failed (HTTP ${response.status}).`);
      }
      if (typeof settings.latestProductsTitle !== 'string' || !settings.latestProductsTitle.trim()) {
        throw new Error('Homepage settings returned an invalid Latest Products title.');
      }
      headings.forEach(heading => {
        heading.textContent = settings.latestProductsTitle;
      });
    })
    .catch(error => {
      console.error('Homepage section title load failed:', error);
    });
})();
