// document.getElementById('shippingForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   const orderId = 'ORD-' + Date.now();

//   const orderData = {
//     orderId: orderId,
//     items: cartItems,
//     shipping: {
//       fullName: document.getElementById('fullName').value,
//       email: document.getElementById('shippingEmail').value,
//       phone: document.getElementById('shippingPhone').value,
//       address: document.getElementById('shippingAddress').value,
//       city: document.getElementById('shippingCity').value,
//       state: document.getElementById('shippingState').value,
//       zip: document.getElementById('shippingZip').value,
//     },
//     paymentMethod: document.querySelector('input[name="payment"]:checked').value,
//     total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
//   };

//   // LocalStorage me save karein aur Cart clear karein
//   localStorage.setItem('latestOrder', JSON.stringify(orderData));
//   localStorage.removeItem('cart');

//   // Success page par redirect karein
//   window.location.href = `order-success.html?orderId=${orderId}`;
// });
document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("shippingForm") || document.querySelector("form");

  if (!checkoutForm) {
    console.error("Checkout form nahi mila!");
    return;
  }

  checkoutForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Page refresh aur instant redirect rokne ke liye

    // 1. LocalStorage se Cart Items extract karein
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Aapka cart khaali hai!");
      return;
    }

    // 2. Total Amount Calculate Karein (₹ / String symbols handles)
    const totalAmount = cartItems.reduce((sum, item) => {
      const cleanPrice = typeof item.price === "string" 
        ? parseFloat(item.price.replace(/[^0-9.]/g, "")) 
        : Number(item.price || 0);
      const qty = Number(item.quantity || item.qty || 1);
      return sum + (cleanPrice * qty);
    }, 0);

    // 3. Unique Order ID Generate Karein
    const generatedOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // 4. Input Fields se Data Collect Karein
    const orderPayload = {
      orderId: generatedOrderId,
      shipping: {
        fullName: document.getElementById("fullName")?.value.trim() || "",
        email: document.getElementById("shippingEmail")?.value.trim() || "",
        phone: document.getElementById("shippingPhone")?.value.trim() || "",
        address: document.getElementById("shippingAddress")?.value.trim() || "",
        city: document.getElementById("shippingCity")?.value.trim() || "",
        state: document.getElementById("shippingState")?.value.trim() || "",
        zip: document.getElementById("shippingZip")?.value.trim() || ""
      },
      paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || "COD",
      items: cartItems,
      totalAmount: totalAmount
    };

    console.log("Sending data to MongoDB:", orderPayload);

    try {
      // 5. Backend Server Ko Data Bhejein (Port 5000)
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      // 6. Jab Database me Data Save HO JAYE, TABHI LocalStorage Clear karke Redirect Karein
      if (response.ok) {
        localStorage.setItem("latestOrder", JSON.stringify(orderPayload));
        localStorage.removeItem("cart"); // Cart clear
        
        // Success Page par redirect
        window.location.href = `order-success.html?orderId=${generatedOrderId}`;
      } else {
        alert("Database Error: " + (data.message || "Order save nahi hua."));
      }
    } catch (error) {
      console.error("Backend Server Error:", error);
      alert("Database Connection Fail! Check karein ki Node Server (http://localhost:5000) chalu hai ya nahi.");
    }
  });
});




document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async function(event) {
            // 1. Sabse zaroori: Browser ko default URL submission (GET) karne se rokna
            event.preventDefault(); 

            // 2. Form ka saara data JS object me convert karein
            const formData = new FormData(checkoutForm);
            const orderData = Object.fromEntries(formData.entries());

            try {
                // 3. Node.js/Express Backend server par POST request bhejain
                const response = await fetch('http://localhost:5000/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Order successfully saved in MongoDB!');
                    // Form submit hone ke baad URL clean thank-you page par redirect hoga
                    window.location.href = 'thank-you.html'; 
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Server connect nahi hua:', error);
                alert('Backend server running nahi hai! Pehle "node server.js" start karein.');
            }
        });
    } else {
        console.error("Form with id 'checkout-form' not found!");
    }
});