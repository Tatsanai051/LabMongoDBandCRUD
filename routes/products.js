const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id); // Find product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    const newProduct = new Product({
      name,
      price,
      description
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
