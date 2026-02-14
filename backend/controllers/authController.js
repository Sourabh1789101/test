import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    // Validate request
    if (!loginId || !password) {
      return res.status(400).json({ error: 'Please provide login ID and password' });
    }

    // Find user (Active users only)
    const user = await User.findOne({ loginId, active: true });

    // Check user and password match (Trim password to remove accidental spaces)
    const isMatch = user && (await user.matchPassword(password.trim()));
    
    if (isMatch) {
      res.json({
        user: {
          _id: user._id,
          loginId: user.loginId,
          role: user.role,
          companyName: user.companyName,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid login credentials' });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Server error processing login' });
  }
};