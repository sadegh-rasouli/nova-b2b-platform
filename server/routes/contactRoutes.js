import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';
import { rateLimit } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 contact messages per window
  message: 'Too many messages submitted from this IP. Please wait 15 minutes before submitting again.',
});

router.post('/', contactLimiter, submitContactMessage);

export default router;

