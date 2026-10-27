(() => {
  const section = document.getElementById('newsletter-section');
  if (!section) return;

  const form = section.querySelector('[data-newsletter-form]');
  const message = section.querySelector('[data-newsletter-message]');
  const button = form?.querySelector('button[type="submit"]');
  const apiHost = window.location.hostname || '127.0.0.1';
  const apiBaseUrl = ['localhost', '127.0.0.1'].includes(apiHost)
    ? `http://${apiHost}:5000/api`
    : `${window.location.origin}/api`;

  async function loadSettings() {
    try {
      const response = await fetch(`${apiBaseUrl}/newsletter/settings`);
      const settings = await response.json();
      if (!response.ok) {
        throw new Error(settings.message || `Newsletter settings could not be loaded (HTTP ${response.status}).`);
      }

      section.querySelector('[data-newsletter-heading]').textContent = settings.heading;
      section.querySelector('[data-newsletter-offer]').textContent = settings.offer;
      section.querySelector('[data-newsletter-ending]').textContent = settings.ending;
      form.elements.email.placeholder = settings.placeholder;
      button.querySelector('[data-newsletter-button]').textContent = settings.buttonText;
    } catch (error) {
      console.error('Newsletter content could not be loaded:', error);
      showMessage(error.message || 'Newsletter content could not be loaded.', true);
    }
  }

  function showMessage(text, isError) {
    message.textContent = text;
    message.className = `text-sm font-semibold ${isError ? 'text-red-600' : 'text-green-700'}`;
    message.classList.remove('hidden');
  }

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    message.classList.add('hidden');
    button.disabled = true;
    const buttonText = button.querySelector('[data-newsletter-button]');
    const originalButtonText = buttonText.textContent;
    buttonText.textContent = 'Subscribing...';

    try {
      const response = await fetch(`${apiBaseUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.elements.email.value })
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Subscription failed (HTTP ${response.status}).`);
      }
      form.reset();
      showMessage(result.message, false);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      showMessage(error.message || 'Subscription could not be saved. Please try again.', true);
    } finally {
      button.disabled = false;
      buttonText.textContent = originalButtonText;
    }
  });

  loadSettings();
})();
