const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  restockInventory,
  deductInventory,
  getInventoryAlerts,
  deleteInventoryItem
} = require('../controllers/inventoryController');

// All routes are protected
router.get('/alerts', protect, getInventoryAlerts);
router.get('/', protect, getInventory);
router.get('/:id', protect, getInventoryItem);
router.post('/:id/restock', protect, restockInventory);
router.post('/:id/deduct', protect, deductInventory);
router.put('/:id', protect, updateInventoryItem);

// Superadmin only
router.post('/', protect, authorize('superadmin'), createInventoryItem);
router.delete('/:id', protect, authorize('superadmin'), deleteInventoryItem);

module.exports = router;