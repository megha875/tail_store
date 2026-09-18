// // Example: Jab aap products fetch karke slider me add karte hain
// products.forEach((product) => {
//   const slide = document.createElement('div');
//   slide.className = 'swiper-slide';

//   // 1. Product data ko HTML safe string me convert karein
//   const productData = JSON.stringify({ 
//     id: product._id, 
//     name: product.title || product.name, 
//     price: product.price 
//   }).replace(/"/g, '&quot;');

//   // 2. InnerHTML me button include karein
//   slide.innerHTML = `
//     <div class="bg-white p-4 rounded-xl shadow-md border">
//       <img src="${product.image || 'assets/img/1.jpg'}" alt="${product.title}" class="w-full h-48 object-cover rounded-lg mb-3">
//       <h3 class="font-bold text-gray-800">${product.title}</h3>
//       <p class="text-[#ff0055] font-bold text-lg mb-3">₹${product.price}</p>
      
//       <!-- Button par productData attach karein -->
//       <button onclick="addToCart(${productData})" class="w-full bg-[#ff0055] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#d90048] transition-colors">
//         Add to Cart
//       </button>
//     </div>
//   `;

//   // 3. Slide ko wrapper me append karein
//   document.getElementById('popular-products-wrapper').appendChild(slide);
// });


