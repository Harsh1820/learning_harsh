const Product = require('../models/product');

// Create a product
exports.createProduct = async (req, res) => {
  const { name, price, availability } = req.body;

  const newProduct = new Product({
    name,
    price,
    availability,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a product by ID
exports.updateProductById = async (req, res) => {
  const { name, price, availability } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, availability },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find products by name
exports.findProductsByName = async (req, res) => {
  try {
    const products = await Product.find({ name: new RegExp(req.params.name, 'i') });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find products by availability
exports.findProductsByAvailability = async (req, res) => {
  try {
    const products = await Product.find({ availability: req.params.availability });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find products greater than a certain price
exports.findProductsGreaterThanPrice = async (req, res) => {
  try {
    const products = await Product.find({ price: { $gt: req.params.price } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
