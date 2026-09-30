document.getElementById('loginForm').addEventListener('submit', async function (e) {
    // 🛑 1. URL me data jaane aur page reload hone se rokein
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // 2. Direct Express Backend API Endpoint par hit karein
        const response = await fetch('http://localhost:5500/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 3. User Data & Token direct LocalStorage me Save karein
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId || data.user._id);
            localStorage.setItem('user', JSON.stringify(data.user));

            alert('Login Successful!');

            // Wishlist ya Home Page redirect
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect') || 'index.html';
            window.location.href = redirectUrl;

        } else {
            alert(data.message || 'Invalid Email or Password');
        }

    } catch (error) {
        console.error('Login Error:', error);
        alert('Server connection error. Please try again.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault(); 

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
          alert('Login Successful!');
          window.location.href = '/index.html';
        } else {
          alert(data.message || 'Login failed!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});



// Login success handler code in login.js
if (data.success) {
    localStorage.setItem('userId', data.user._id || data.user.id);
    localStorage.setItem('userToken', data.token);

    // Redirect back to Home page
    window.location.href = 'index.html';
}