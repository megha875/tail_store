// // const mongoose = require('mongoose');

// // const productSchema = new mongoose.Schema({

// //     name: {
// //         type: String,
// //         required: true
// //     },

// //     price: {
// //         type: Number,
// //         required: true
// //     },

// //     category: {
// //         type: String,
// //         required: true
// //     },

// //     image: {
// //         type: String,
// //         required: true
// //     },

// //     description: {
// //         type: String,
// //         default: ''
// //     },

// //     stock: {
// //         type: Number,
// //         default: 10
// //     }

// // }, {
// //     timestamps: true
// // });

// // module.exports = mongoose.model('Product', productSchema); 





// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },

//     price: {
//       type: Number,
//       required: true
//     },

//     category: {
//       type: String,
//       required: true
//     },

//     // Main product image
//     image: {
//       type: String,
//       required: true
//     },

//     // Additional gallery images for thumbnails
//     images: {
//       type: [String],
//       default: []
//     },

//     description: {
//       type: String,
//       default: ''
//     },

//     stock: {
//       type: Number,
//       default: 10
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = mongoose.model('Product', productSchema);
// const mongoose = require('mongoose'); // 👈 Yeh line zaroor add karein

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     image: { type: String, required: true },
//     images: { type: [String], default: [] }, // Gallery images array
//     description: { type: String },
//     stock: { type: Number }
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     image: { type: String, required: true },
//     images: { type: [String], default: [] }, // Yeh ensure karein ki array type ho
//     description: { type: String },
//     stock: { type: Number }
// }, { timestamps: true });

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },       // Main image / Thumbnail ke liye
    images: { type: [String], default: [] },       // Gallery images ke array ke liye
    description: { type: String },
    stock: { type: Number },
<<<<<<< HEAD
    colors: { type: [String], default: [] },
    colorImages: [{ color: { type: String, required: true }, image: { type: String, required: true }, images: { type: [String], default: [] } }],       // Available colors (e.g. Black, Navy)
    sizes: { type: [String], default: [] },        // Available sizes (e.g. S, M, L)
    description: String,
    specifications: String,
    care: String,
    seller: String,
=======
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
    isLatest: { type: Boolean, default: true },
    isOnSale: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
