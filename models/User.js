// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, default: "" },
//   address: { type: String, default: "" },
//   role: { type: String, default: 'customer' }, 
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.models.User || mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     default: 'User' 
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Email field required hai'], 
//     unique: true, // Duplicate emails allow nahi karega
//     lowercase: true,
//     trim: true
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password field required hai'],
//     minlength: 6
//   },
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   }
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Unique Email
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
