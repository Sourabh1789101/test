import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(categoryId) && new mongoose.Types.ObjectId(categoryId).toString() === categoryId;
    let query = {};
    if (isObjectId) {
      query = { $or: [{ category: categoryId }, { categoryId: new mongoose.Types.ObjectId(categoryId) }] };
    } else {
      const category = await Category.findOne({ slug: categoryId }).select('name _id');
      const or = [
        { category: { $regex: new RegExp(`^${String(categoryId).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
      ];
      if (category?.name) or.push({ category: category.name });
      if (category?._id) or.push({ categoryId: category._id });
      query = { $or: or };
    }
    const products = await Product.find(query);
    res.status(200).json({ count: products.length, category: categoryId, data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
