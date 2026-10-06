import express from 'express';
import { submitQuoteRequest, getQuoteById } from '../controllers/quoteController.js';
import { rateLimit } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 quotation submissions per window
  message: 'Too many quotation requests from this IP. Please wait 15 minutes before submitting again.',
});

router.post('/', submissionLimiter, submitQuoteRequest);
router.get('/:idOrNumber', getQuoteById);

export default router;

