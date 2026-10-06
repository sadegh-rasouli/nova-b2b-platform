import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('[Security Error] JWT_SECRET environment variable missing in authMiddleware.');
    return res.status(500).json({
      success: false,
      message: 'Server security configuration error.',
    });
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secret);

      // Attach user object to request without password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User session invalid. Authorization denied.',
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authorization token.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. No Bearer token provided.',
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Access forbidden. Administrator privileges required.',
  });
};
