const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'guest_user' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
<<<<<<< HEAD
      quantity: { type: Number, required: true, default: 1 },
      color: { type: String, default: '' },
      size: { type: String, default: '' }
=======
      quantity: { type: Number, required: true, default: 1 }
>>>>>>> d3835436ce7d7ca13bebb3f97156275b0ae442c8
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);



// // const mongoose = require('mongoose');

// // const cartSchema = new mongoose.Schema({
// //     userId: {
// //         type: String,
// //         required: true,
// //         unique: true
// //     },
// //     items: [
// //         {
// //             productId: {
// //                 type: mongoose.Schema.Types.ObjectId,
// //                 ref: 'Product', // Reference to Product collection
// //                 required: true
// //             },
// //             quantity: {
// //                 type: Number,
// //                 required: true,
// //                 default: 1
// //             },
// //             price: {
// //                 type: Number,
// //                 required: true
// //             }
// //         }
// //     ]
// // }, { timestamps: true });

// // module.exports = mongoose.model('Cart', cartSchema);


// const mongoose = require('mongoose');

// // -------------------------------------------------------------
// // CODE 1: Basic / Guest Cart Schema
// // -------------------------------------------------------------
// const basicCartSchema = new mongoose.Schema({
//   userId: { 
//     type: String, 
//     required: true, 
//     default: 'guest_user' 
//   },
//   items: [
//     {
//       productId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product', 
//         required: true 
//       },
//       quantity: { 
//         type: Number, 
//         required: true, 
//         default: 1 
//       }
//     }
//   ]
// }, { timestamps: true });

// // -------------------------------------------------------------
// // CODE 2: Detailed Cart Schema (With Price Field)
// // -------------------------------------------------------------
// const detailedCartSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1
//       },
//       price: {
//         type: Number,
//         required: true
//       }
//     }
//   ]
// }, { timestamps: true });

// // Overwrite check lagakar dono models compile karein (Naam alag-alag hain)
// const BasicCart = mongoose.models.BasicCart || mongoose.model('BasicCart', basicCartSchema);
// const DetailedCart = mongoose.models.DetailedCart || mongoose.model('DetailedCart', detailedCartSchema);

// // Both Models Exported
// module.exports = {
//   BasicCart,
//   DetailedCart
// };