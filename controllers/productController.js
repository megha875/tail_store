
const Product = require('../models/productModel'); // Apna model import karein

const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, stock, images } = req.body;

    let finalImages = [];
    if (images && Array.isArray(images) && images.length > 0) {
      finalImages = images;
    } else if (image) {
      finalImages = [image]; 
    }

    const newProduct = new Product({
      name,
      price,
      category,
      image,
      images: finalImages,
      description,
      stock
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
