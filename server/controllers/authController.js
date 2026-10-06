import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Auth admin user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password',
    });
  }

  // Find user by email and explicitly select password
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please verify your email and password.',
    });
  }
};

// @desc    Get current user profile session
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
};

// @desc    Logout user / clear session acknowledgment
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
