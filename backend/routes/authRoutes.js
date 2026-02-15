const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  login,
  getMe,
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/authController');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

// Superadmin only routes
router.route('/users')
  .get(protect, authorize('superadmin'), getUsers)
  .post(protect, authorize('superadmin'), createUser);

router.route('/users/:id')
  .put(protect, authorize('superadmin'), updateUser)
  .delete(protect, authorize('superadmin'), deleteUser);

module.exports = router;