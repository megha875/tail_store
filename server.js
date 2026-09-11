


// const products = [ ... ];


// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());
// app.use(express.static('.'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/product gallery.html');
// });

// // 6 Products Array
// const products = [
//   {
//     id: 1,
//     title: "Yellow Men's Suit",
//     price: 15.99,
//     image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
//     category: "Men"
//   },
//   {
//     id: 2,
//     title: "Red Women's Dress",
//     price: 19.99,
//     image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500",
//     category: "Women"
//   },
//   {
//     id: 3,
//     title: "Checker Top",
//     price: 29.99,
//     image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
//     category: "Women"
//   },
//   {
//     id: 4,
//     title: "Cargo Skirt",
//     price: 39.99,
//     image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
//     category: "Women"
//   },
//   {
//     id: 5,
//     title: "Knitted Poncho",
//     price: 59.99,
//     image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
//     category: "Women"
//   },
//   {
//     id: 6,
//     title: "Black Wrap Dress",
//     price: 45.00,
//     image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
//     category: "Women"
//   }
// ];

// // API Endpoint
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// // Server Listen
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Direct Home Page / Root Route Handler
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/product gallery.html');
});

// Hardcoded Products Array (6 Products)
const products = [
  {
    id: 1,
    title: "Yellow Men's Suit",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    category: "Men"
  },
  {
    id: 2,
    title: "Red Women's Dress",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500",
    category: "Women"
  },
  {
    id: 3,
    title: "Checker Top",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    category: "Women"
  },
  {
    id: 4,
    title: "Cargo Skirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
    category: "Women"
  },
  {
    id: 5,
    title: "Knitted Poncho",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500",
    category: "Women"
  },
  {
    id: 6,
    title: "Black Wrap Dress",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
    category: "Women"
  }
];

// API Endpoint for Products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});