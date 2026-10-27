const authApiUrl = `http://${window.location.hostname}:5000/api`;

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    try {
      const response = await fetch(`${authApiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login nahi ho saka.');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userEmail', data.user.email);

      const redirect = new URLSearchParams(window.location.search).get('redirect');
      window.location.href = redirect && !redirect.includes('://') ? redirect : 'index.html';
    } catch (error) {
      console.error('Login request failed:', error);
      alert('Server se connection fail ho gaya. Backend server check karke dobara try karein.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Login';
    }
  });
});
