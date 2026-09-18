const productContainer = document.getElementById("product-container");
  
async function loadProducts() {

    const gridContainer =
        document.getElementById('productGrid') ||
        document.getElementById('products-container') ||
        document.getElementById('product-container');

    if (!gridContainer) {
        console.error("Product container nahi mila!");
        return;
    }

    try {

        const response = await fetch('http://localhost:5500/api/products');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        console.log("MongoDB Products:", products);

        if (!products || products.length === 0) {

            gridContainer.innerHTML = `
                <p class="text-center text-gray-500 py-10 col-span-full">
                    Database me abhi koi product nahi hai.
                </p>
            `;

            return;
        }

        gridContainer.innerHTML = products.map(item => `

            <div
                class="product-card bg-white rounded-lg shadow-md overflow-hidden p-4 border flex flex-col justify-between"
                data-category="${item.category || ''}"
            >

                <div class="image-wrapper cursor-pointer">

                    <img
                        src="${item.image || 'https://via.placeholder.com/150'}"
                        alt="${item.title || item.name || 'Product'}"
                        class="product-card-img w-full h-48 object-cover rounded mb-3"
                    >

                </div>

                <h3 class="text-lg font-bold text-gray-800 cursor-pointer mb-1">
                    ${item.title || item.name || 'Product'}
                </h3>

                <p class="text-gray-500 text-sm mb-3">
                    ${item.category || 'General'}
                </p>

                <div class="flex justify-between items-center mt-2">

                    <span class="text-blue-600 font-bold text-xl">
                        ₹${item.price}
                    </span>

                    <button
                        onclick="addToCart('${item._id}')"
                        class="bg-[#ff0055] text-white px-3 py-1.5 rounded text-sm hover:bg-pink-700 transition"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `).join('');

    } catch (error) {

        console.error("Product Error:", error);

        gridContainer.innerHTML = `
            <p class="text-center text-red-500 py-10 col-span-full">
                Products load nahi ho pa rahe hain.
            </p>
        `;
    }
}


// Page load hone ke baad products load karo
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
}); 
// loadProducts();
 
async function addToCart(productId) {

    try {

        const response = await fetch('http://localhost:5500/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 'guest_user',
                productId: productId,
                quantity: 1
            })
        });

        const data = await response.json();

        console.log("Cart Response:", data);

        if (!response.ok) {
            throw new Error(data.message || 'Product cart me add nahi hua');
        }

        alert(data.message || 'Product Cart me add ho gaya!');

    } catch (error) {

        console.error("Add to Cart Error:", error);

        alert("Product cart me add nahi ho pa raha hai.");

    }
} 