// const formData = {
//     name: document.getElementById('productName').value,
//     price: document.getElementById('productPrice').value,
//     category: document.getElementById('productCategory').value,
//     image: document.getElementById('mainImageUrl').value,
//     galleryImages: document.getElementById('galleryImages').value, // Yeh comma-separated string jayegi
//     description: document.getElementById('productDesc').value
// };

// // Backend API ko POST request bhejiye
// fetch('/api/add-product', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData)
// }).then(res => res.json()).then(data => console.log(data));

// const formData = {
//     name: document.getElementById('productName').value,
//     price: document.getElementById('productPrice').value,
//     category: document.getElementById('productCategory').value,
//     image: document.getElementById('mainImageUrl').value,
//     // Yahan check karein ki aapke HTML element ki ID 'galleryImages' hi hai ya kuch aur (jaise 'productGallery')
//     galleryImages: document.getElementById('galleryImages').value, 
//     description: document.getElementById('productDesc').value,
//     stock: document.getElementById('productStock') ? document.getElementById('productStock').value : 10
// };


// const formData = {
//     name: document.getElementById('productName').value,
//     price: document.getElementById('productPrice').value,
//     category: document.getElementById('productCategory').value,
//     image: document.getElementById('mainImageUrl').value,
//     galleryImages: document.getElementById('galleryImages').value, // Yahi naam backend mein catch hoga
//     description: document.getElementById('productDesc').value,
//     stock: document.getElementById('productStock').value
// };

document.getElementById('productForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Page refresh hone se rokein

    // 1. Form fields se values extract karein
    const name = document.getElementById('productName').value;
    const price = Number(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value; // Main thumbnail URL
    const description = document.getElementById('productDescription').value;
    
    // 2. Gallery textarea ka data lein aur comma (,) se split karke array banayein
    const galleryInput = document.getElementById('galleryImages').value;
    const imagesArray = galleryInput 
        ? galleryInput.split(',').map(url => url.trim()).filter(url => url.length > 0) 
        : [];

    // Agar user ne gallery mein kuch nahi dala, toh main image ko hi array mein daal sakte hain (optional)
    if (imagesArray.length === 0 && image) {
        imagesArray.push(image);
    }

    // Payload data object
    const productData = {
        name,
        price,
        category,
        image,          // Main thumbnail
        images: imagesArray, // Gallery images ka array
        description
    };

    try {
        // 3. Backend par JSON data bhejein
        const response = await fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        const messageDiv = document.getElementById('formMessage');
        messageDiv.classList.remove('hidden');

        if (response.ok) {
            messageDiv.className = "rounded-lg px-4 py-3 text-sm font-semibold bg-green-100 text-green-700";
            messageDiv.innerText = "Product successfully added!";
            document.getElementById('productForm').reset(); // Form clear karein
            document.getElementById('imagePreviewBox').classList.add('hidden'); // Preview hide karein
        } else {
            messageDiv.className = "rounded-lg px-4 py-3 text-sm font-semibold bg-red-100 text-red-700";
            messageDiv.innerText = result.error || "Kuch gadbad ho gayi!";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server connection error!');
    }
});