import express from 'express';
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getCategoriesSummary,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories/summary', getCategoriesSummary);
router.get('/:slug', getProductBySlug);

export default router;
