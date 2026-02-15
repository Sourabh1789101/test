const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getTopClients
} = require('../controllers/clientController');

// Protected routes
router.get('/top', protect, getTopClients);
router.get('/', protect, getClients);
router.get('/:id', protect, getClient);
router.post('/', protect, createClient);
router.put('/:id', protect, updateClient);

// Superadmin only
router.delete('/:id', protect, authorize('superadmin'), deleteClient);

module.exports = router;