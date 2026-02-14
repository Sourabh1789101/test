import express from 'express';
import { protect, superadmin } from '../middleware/authMiddleware.js';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes: Only Superadmin can create, update, or delete products
router.post('/', protect, superadmin, createProduct);
router.put('/:id', protect, superadmin, updateProduct);
router.delete('/:id', protect, superadmin, deleteProduct);

export default router;