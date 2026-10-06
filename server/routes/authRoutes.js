import express from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 login attempts per 15 minutes
  message: 'Too many authentication attempts from this IP. Please wait 15 minutes before trying again.',
});

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;

