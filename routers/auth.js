// // auth.js
// const AUTH_API = 'http://localhost:5000/api/auth';

// function checkAndUpdateAuthUI() {
//   const token = localStorage.getItem('userToken');
//   const userEmail = localStorage.getItem('userEmail');

//   const guestButtons = document.getElementById('auth-guest-buttons');
//   const userMenu = document.getElementById('auth-user-menu');
//   const mobileGuest = document.getElementById('mobile-auth-guest');
//   const mobileUser = document.getElementById('mobile-auth-user');
  
//   const userAvatar = document.getElementById('user-avatar');
//   const userEmailText = document.getElementById('user-email-text');

//   if (token) {
//     if (guestButtons) {
//       guestButtons.classList.add('hidden');
//       guestButtons.classList.remove('flex', 'sm:inline-block');
//     }
//     if (userMenu) {
//       userMenu.classList.remove('hidden');
//       userMenu.classList.add('flex');
//     }
//     if (mobileGuest) mobileGuest.classList.add('hidden');
//     if (mobileUser) mobileUser.classList.remove('hidden');

//     if (userEmail) {
//       if (userAvatar) userAvatar.textContent = userEmail.charAt(0).toUpperCase();
//       if (userEmailText) userEmailText.textContent = userEmail;
//     }
//   } else {
//     if (guestButtons) {
//       guestButtons.classList.remove('hidden');
//       guestButtons.classList.add('flex');
//     }
//     if (userMenu) {
//       userMenu.classList.add('hidden');
//       userMenu.classList.remove('flex');
//     }
//     if (mobileGuest) mobileGuest.classList.remove('hidden');
//     if (mobileUser) mobileUser.classList.add('hidden');
//   }
// }

// function logoutUser() {
//   localStorage.removeItem('userToken');
//   localStorage.removeItem('userId');
//   localStorage.removeItem('userEmail');
//   checkAndUpdateAuthUI();
//   alert('Logged out successfully!');
//   window.location.href = 'index.html';
// }

// document.addEventListener('DOMContentLoaded', () => {
//   checkAndUpdateAuthUI();

//   const logoutBtn = document.getElementById('logout-btn');
//   const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
//   if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
//   if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', logoutUser);
// });



// Document load hone par check karein ki user logged in hai ya nahi
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    setupEventListeners();
});

// Auth state Check karne ka Function
function checkAuthState() {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('userData'));

    const authButtons = document.getElementById('auth-buttons'); // Login / Register container
    const logoutBtn = document.getElementById('logout-btn');     // Logout button
    const userInfo = document.getElementById('user-info');       // User welcome info (optional)

    if (token && user) {
        // User LOGGED IN Hai:
        // Hide Login & Register buttons, Show Logout button
        if (authButtons) authButtons.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block'; // ya 'block'
        if (userInfo) {
            userInfo.style.display = 'inline-block';
            userInfo.textContent = `Welcome, ${user.name || user.email}`;
        }
    } else {
        // User LOGGED OUT / Not Logged In:
        // Show Login & Register buttons, Hide Logout button
        if (authButtons) authButtons.style.display = 'flex'; // ya 'block'
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Event Listeners Set up karne ka Function
function setupEventListeners() {
    // 1. REGISTER FORM SUBMIT
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name')?.value;
            const email = document.getElementById('reg-email')?.value;
            const password = document.getElementById('reg-password')?.value;

            try {
                // Aapke backend register endpoint ke hisaab se URL change karein
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration Successful! Ab Login karein.');
                    // Register ke baad login form dikhayein
                    window.location.href = '#login'; 
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error in Register:', error);
            }
        });
    }

    // 2. LOGIN FORM SUBMIT
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email')?.value;
            const password = document.getElementById('login-password')?.value;

            try {
                // Aapke backend login endpoint ke hisaab se URL change karein
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save Token/User in LocalStorage
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userData', JSON.stringify(data.user));

                    // UI State Update karein
                    checkAuthState();
                    alert('Login Successful!');
                } else {
                    alert(data.message || 'Invalid Credentials');
                }
            } catch (error) {
                console.error('Error in Login:', error);
            }
        });
    }

    // 3. LOGOUT BUTTON CLICK
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Clear Storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');

            // UI update karein (Logout button hide -> Register/Login show)
            checkAuthState();

            alert('Successfully Logged Out!');
            // User ko Login page ya Home par le jaane ke liye:
            window.location.href = '/login.html'; // Adjust route as per your project
        });
    }
}