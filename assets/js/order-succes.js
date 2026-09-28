
document.addEventListener("DOMContentLoaded", async function () {
  // 1. URL se orderId extract karein (e.g., ORD-772214)
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  if (!orderId) {
    console.error("URL me orderId missing hai!");
    return;
  }

  try {
    // 2. MongoDB Backend se Order Data fetch karein
    const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
    const result = await response.json();

    if (result.status === "success") {
      const order = result.order;

      // 3. UI Elements Update Karein
      // Order ID & Payment Badge
      document.querySelector(".order-id-class").innerText = order.orderId;
      
      // Shipping Details
      const s = order.shipping;
      document.querySelector(".shipping-name").innerText = s.fullName;
      document.querySelector(".shipping-address").innerText = `${s.address}, ${s.city}, ${s.state} - ${s.zip}`;
      document.querySelector(".shipping-contact").innerText = `Phone: ${s.phone} | Email: ${s.email}`;

      // 4. Order Items List Render Karein
      const itemsContainer = document.getElementById("orderItemsList"); // Apne container ki ID check karein
      let itemsHTML = "";
      let totalAmount = 0;

      if (order.items && order.items.length > 0) {
        order.items.forEach((item) => {
          const itemTotal = (item.price || 0) * (item.quantity || 1);
          totalAmount += itemTotal;

          itemsHTML += `
            <div class="flex justify-between items-center py-2 border-b">
              <div class="flex items-center gap-3">
                <img src="${item.image || 'placeholder.jpg'}" class="w-12 h-12 object-cover rounded" />
                <div>
                  <p class="font-semibold">${item.name}</p>
                  <p class="text-sm text-gray-500">Qty: ${item.quantity || 1} × ₹${item.price}</p>
                </div>
              </div>
              <p class="font-semibold">₹${itemTotal}</p>
            </div>
          `;
        });
        
        itemsContainer.innerHTML = itemsHTML;
      } else {
        itemsContainer.innerHTML = `<p class="text-gray-500 text-center">No items found in database.</p>`;
      }

      // 5. Total & Subtotal Render Karein
      document.getElementById("subtotalPrice").innerText = "₹" + totalAmount;
      document.getElementById("totalPrice").innerText = "₹" + totalAmount;

    } else {
      alert("Database Error: " + result.message);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
});
document.addEventListener("DOMContentLoaded", async function () {
  // 1. URL se orderId nikalein
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  if (orderId) {
    // 2. Database me is orderId ko search karein
    const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
    const result = await response.json();

    if (result.status === "success") {
      const order = result.order;
      // UI update
      document.getElementById("display-order-id").innerText = order.orderId;
      console.log("Database se mila data:", order);
    }
  }
});

