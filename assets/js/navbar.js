// document.addEventListener("DOMContentLoaded", () => {
//   // Check user login status from localStorage
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
//   // Select Navbar elements
//   const loginBtn = document.getElementById("loginBtn");
//   const logoutBtn = document.getElementById("logoutBtn");

//   // Function to toggle Navbar UI based on auth state
//   function updateNavbar() {
//     if (isLoggedIn) {
//       if (loginBtn) loginBtn.style.display = "none";
//       if (logoutBtn) logoutBtn.style.display = "inline-block";
//     } else {
//       if (loginBtn) loginBtn.style.display = "inline-block";
//       if (logoutBtn) logoutBtn.style.display = "none";
//     }
//   }

//   // Initial UI check on page load
//   updateNavbar();

//   // Handle Logout Action
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       // Clear session status
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("userToken"); // Agar koi token store kiya hai
      
//       // Refresh or redirect to home page
//       window.location.href = "index.html";
//     });
//   }
// });





// document.addEventListener("DOMContentLoaded", () => {
//   // Check user login status
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   // Navbar elements
//   const loginBtn = document.getElementById("loginBtn");
//   const logoutBtn = document.getElementById("logoutBtn");

//   // 1. UPDATE NAVBAR UI BASED ON LOGIN STATE
//   function updateNavbar() {
//     if (isLoggedIn) {
//       if (loginBtn) loginBtn.style.display = "none";
//       if (logoutBtn) logoutBtn.style.display = "inline-block";
//     } else {
//       if (loginBtn) loginBtn.style.display = "inline-block";
//       if (logoutBtn) logoutBtn.style.display = "none";
//     }
//   }

//   updateNavbar();

//   // 2. HANDLE LOGOUT BUTTON CLICK
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("isLoggedIn");
//       window.location.href = "index.html";
//     });
//   }

//   // 3. HANDLE LOGIN FORM SUBMISSION (log.html ke form ke liye)
//   const loginForm = document.getElementById("loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();
      
//       // Save login state in localStorage
//       localStorage.setItem("isLoggedIn", "true");
      
//       // Redirect to home page
//       window.location.href = "index.html";
//     });
//   }
// });



// document.addEventListener("DOMContentLoaded", () => {
//   // Check user login status from localStorage
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   // Select navbar wrapper containers
//   const authGuestButtons = document.getElementById("auth-guest-buttons");
//   const authUserMenu = document.getElementById("auth-user-menu");
//   const logoutBtn = document.getElementById("logout-btn");

//   // 1. UPDATE NAVBAR UI BASED ON LOGIN STATE
//   function updateNavbar() {
//     if (isLoggedIn) {
//       // User login hai -> Register/Login chhupao, Logout dikhao
//       if (authGuestButtons) {
//         authGuestButtons.classList.add("hidden");
//         authGuestButtons.classList.remove("flex", "sm:flex");
//         authGuestButtons.style.display = "none";
//       }
//       if (authUserMenu) {
//         authUserMenu.classList.remove("hidden");
//         authUserMenu.classList.add("flex");
//         authUserMenu.style.display = "flex";
//       }
//     } else {
//       // User logged out hai -> Register/Login dikhao, Logout chhupao
//       if (authGuestButtons) {
//         authGuestButtons.classList.remove("hidden");
//         authGuestButtons.classList.add("flex");
//         authGuestButtons.style.display = "flex";
//       }
//       if (authUserMenu) {
//         authUserMenu.classList.add("hidden");
//         authUserMenu.classList.remove("flex");
//         authUserMenu.style.display = "none";
//       }
//     }
//   }

//   // Page load hone par check karein
//   updateNavbar();

//   // 2. HANDLE LOGOUT CLICK
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("isLoggedIn");
//       window.location.href = "index.html";
//     });
//   }

//   // 3. HANDLE LOGIN FORM SUBMIT (agar login page par form ho)
//   const loginForm = document.getElementById("loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       localStorage.setItem("isLoggedIn", "true");
//       window.location.href = "index.html";
//     });
//   }
// });




// document.addEventListener("DOMContentLoaded", () => {
//   // Select navbar wrapper containers
//   const authGuestButtons = document.getElementById("auth-guest-buttons");
//   const authUserMenu = document.getElementById("auth-user-menu");
//   const logoutBtn = document.getElementById("logout-btn");

//   // Dynamic status getter function
//   function getIsLoggedIn() {
//     return localStorage.getItem("isLoggedIn") === "true";
//   }

//   // 1. UPDATE NAVBAR UI BASED ON LOGIN STATE
//   function updateNavbar() {
//     const isLoggedIn = getIsLoggedIn();

//     if (isLoggedIn) {
//       // User logged in hai -> Register/Login chhupao, Logout dikhao
//       if (authGuestButtons) {
//         authGuestButtons.classList.add("hidden");
//         authGuestButtons.classList.remove("flex", "sm:flex");
//         authGuestButtons.style.setProperty("display", "none", "important");
//       }
//       if (authUserMenu) {
//         authUserMenu.classList.remove("hidden");
//         authUserMenu.classList.add("flex");
//         authUserMenu.style.setProperty("display", "flex", "important");
//       }
//     } else {
//       // User logged out hai -> Register/Login dikhao, Logout chhupao
//       if (authGuestButtons) {
//         authGuestButtons.classList.remove("hidden");
//         authGuestButtons.classList.add("flex");
//         authGuestButtons.style.setProperty("display", "flex", "important");
//       }
//       if (authUserMenu) {
//         authUserMenu.classList.add("hidden");
//         authUserMenu.classList.remove("flex");
//         authUserMenu.style.setProperty("display", "none", "important");
//       }
//     }
//   }

//   // Initial check on DOM load
//   updateNavbar();

//   // 2. LISTEN FOR STORAGE CHANGES (Multiple Tabs Sync)
//   // Agar ek tab mein logout hoga, toh dusre saare open tabs par bhi navbar update ho jayega
//   window.addEventListener("storage", (e) => {
//     if (e.key === "isLoggedIn") {
//       updateNavbar();
//     }
//   });

//   // 3. LISTEN FOR PAGE SHOW (Back/Forward Cache Sync)
//   // Jab user browser ke BACK button se kisi page par aayega, tab bhi status sahi rahega
//   window.addEventListener("pageshow", () => {
//     updateNavbar();
//   });

//   // 4. HANDLE LOGOUT CLICK
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       localStorage.removeItem("isLoggedIn");
//       updateNavbar();
//       window.location.href = "index.html";
//     });
//   }

//   // 5. HANDLE LOGIN FORM SUBMIT
//   const loginForm = document.getElementById("loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       localStorage.setItem("isLoggedIn", "true");
//       updateNavbar();
//       window.location.href = "index.html";
//     });
//   }
// });

// Function to update UI based on login status
function updateNavbarUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const authGuestButtons = document.getElementById("auth-guest-buttons");
  const authUserMenu = document.getElementById("auth-user-menu");

  if (isLoggedIn) {
    if (authGuestButtons) {
      authGuestButtons.style.setProperty("display", "none", "important");
      authGuestButtons.classList.add("hidden");
    }
    if (authUserMenu) {
      authUserMenu.style.setProperty("display", "flex", "important");
      authUserMenu.classList.remove("hidden");
    }
  } else {
    if (authGuestButtons) {
      authGuestButtons.style.setProperty("display", "flex", "important");
      authGuestButtons.classList.remove("hidden");
    }
    if (authUserMenu) {
      authUserMenu.style.setProperty("display", "none", "important");
      authUserMenu.classList.add("hidden");
    }
  }
}

// Run immediately & on DOM Load
updateNavbarUI();
document.addEventListener("DOMContentLoaded", updateNavbarUI);

// Sync state across browser Back/Forward navigation
window.addEventListener("pageshow", updateNavbarUI);

// Sync across multiple browser tabs
window.addEventListener("storage", (e) => {
  if (e.key === "isLoggedIn") {
    updateNavbarUI();
  }
});

// Event Delegation for Logout & Login click/submit
document.addEventListener("click", (e) => {
  // Check if clicked element or its parent is logout button
  if (e.target && (e.target.id === "logout-btn" || e.target.closest("#logout-btn"))) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    updateNavbarUI();
    window.location.href = "index.html";
  }
});

async function refreshCartNavbarCount() {
  const badge = document.getElementById("cart-badge-count");
  if (!badge) return;

  const userId = localStorage.getItem("userId") || "guest_user";
  try {
    const response = await fetch(
<<<<<<< HEAD
      `http://${window.location.hostname}:5000/api/cart?userId=${encodeURIComponent(userId)}`
=======
      `http://${window.location.hostname}:5501/api/cart?userId=${encodeURIComponent(userId)}`
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
    );
    const cart = await response.json();
    if (!response.ok) {
      throw new Error(cart.message || `Cart request failed (HTTP ${response.status})`);
    }
    badge.textContent = String(
      (cart.items || []).reduce((total, item) => total + (Number(item.quantity) || 0), 0)
    );
  } catch (error) {
    console.error("Navbar cart count could not be refreshed:", error);
  }
}

refreshCartNavbarCount();
window.addEventListener("cartUpdated", refreshCartNavbarCount);
window.addEventListener("pageshow", refreshCartNavbarCount);
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail');
    const dropdownGuest = document.getElementById('dropdown-guest');
    const dropdownUser = document.getElementById('dropdown-user');
    const loginUsernameText = document.getElementById('login-username-text');

    if (userName) {
        // Agar user logged in hai toh naam dikhayein aur user menu kholen
        if (loginUsernameText) loginUsernameText.textContent = userName.split('@')[0];
        if (dropdownGuest) dropdownGuest.classList.add('hidden');
        if (dropdownUser) dropdownUser.classList.remove('hidden');
    } else {
        // Agar logged out hai toh default 'Login' dikhayein
        if (loginUsernameText) loginUsernameText.textContent = 'Login';
        if (dropdownGuest) dropdownGuest.classList.remove('hidden');
        if (dropdownUser) dropdownUser.classList.add('hidden');
    }

    // Logout button handler
    const logoutBtn = document.getElementById('logout-action-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            window.location.href = 'index.html';
        });
    }
});
=======
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
