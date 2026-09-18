async function renderDynamicCart() {

    const cartContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const grandTotalEl = document.getElementById('grandTotal');

    if (!cartContainer) {
        console.error("cartItems container nahi mila!");
        return;
    }

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart?userId=guest_user'
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const cart = await response.json();

        console.log("Cart Data:", cart);

        if (!cart.items || cart.items.length === 0) {

            cartContainer.innerHTML = `
                <div class="bg-white rounded-xl border p-10 text-center">

                    <div class="text-5xl mb-4">
                        🛒
                    </div>

                    <h2 class="text-xl font-bold text-gray-800">
                        Your Cart is Empty
                    </h2>

                    <p class="text-gray-500 mt-2">
                        Add some products to your cart.
                    </p>

                    <a
                        href="home.html"
                        class="inline-block mt-6 bg-[#FF0043] text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Continue Shopping
                    </a>

                </div>
            `;

            subtotalEl.innerText = '₹0';
            grandTotalEl.innerText = '₹0';

            return;
        }


        let subtotal = 0;


        cartContainer.innerHTML = cart.items.map(item => {

            const product = item.productId;

            if (!product) {
                return '';
            }

            const itemTotal = product.price * item.quantity;

            subtotal += itemTotal;


            return `
                <div class="bg-white border rounded-xl p-4 shadow-sm">

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <!-- Product -->
                        <div class="flex items-center gap-4">

                            <img
                                src="${product.image || 'https://via.placeholder.com/100'}"
                                alt="${product.name || 'Product'}"
                                class="w-24 h-24 object-cover rounded-lg"
                            >

                            <div>

                                <h3 class="text-lg font-bold text-gray-900">
                                    ${product.name || product.title}
                                </h3>

                                <p class="text-gray-500 text-sm mt-1">
                                    ${product.category || 'General'}
                                </p>

                                <p class="text-[#FF0043] font-bold mt-2">
                                    ₹${product.price}
                                </p>

                            </div>

                        </div>


                        <!-- Quantity + Total -->
                        <div class="flex items-center gap-4">

                            <div class="flex items-center border rounded-lg overflow-hidden">

                                <button
                                    onclick="updateQuantity('${product._id}', 'decrease')"
                                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                                >
                                    −
                                </button>

                                <span class="px-4 py-2 font-semibold">
                                    ${item.quantity}
                                </span>

                                <button
                                    onclick="updateQuantity('${product._id}', 'increase')"
                                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
                                >
                                    +
                                </button>

                            </div>


                            <span class="font-bold text-gray-900 min-w-[80px] text-right">
                                ₹${itemTotal}
                            </span>


                            <button
                                onclick="removeFromCart('${product._id}')"
                                class="text-red-500 hover:text-red-700 text-xl"
                                title="Remove"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>

                </div>
            `;

        }).join('');


        subtotalEl.innerText = `₹${subtotal}`;
        grandTotalEl.innerText = `₹${subtotal}`;


        // Navbar cart badge
        updateCartBadge(cart);


    } catch (error) {

        console.error("Cart Error:", error);

        cartContainer.innerHTML = `
            <div class="text-center py-10 text-red-500">
                Cart load nahi ho pa raha hai.
            </div>
        `;
    }
}



// Increase / decrease quantity
async function updateQuantity(productId, action) {

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart/update',
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    userId: 'guest_user',
                    productId: productId,
                    action: action
                })
            }
        );

        if (!response.ok) {
            throw new Error('Quantity update failed');
        }

        await renderDynamicCart();

    } catch (error) {

        console.error("Quantity Update Error:", error);

    }
}



// Remove product
async function removeFromCart(productId) {

    try {

        const response = await fetch(
            'http://localhost:5500/api/cart/remove',
            {
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    userId: 'guest_user',
                    productId: productId
                })
            }
        );

        if (!response.ok) {
            throw new Error('Remove failed');
        }

        await renderDynamicCart();

    } catch (error) {

        console.error("Remove Item Error:", error);

    }
}



// Cart badge
function updateCartBadge(cart) {

    const badge = document.getElementById('cart-badge-count');

    if (!badge) {
        return;
    }

    const totalItems = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    badge.innerText = totalItems;
}



// Page load
document.addEventListener('DOMContentLoaded', () => {

    renderDynamicCart();

}); 