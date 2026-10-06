import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getDashboardStats,
  getAllProductsAdmin,
  getProductByIdAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllQuotesAdmin,
  getQuoteByIdAdmin,
  updateQuoteStatus,
  deleteQuote,
  getAllMessagesAdmin,
  toggleMessageRead,
  updateMessageStatus,
  deleteMessage,
  getAllBlogPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  getAllUsersAdmin,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require valid JWT and admin role
router.use(protect, adminOnly);

// Analytics
router.get('/dashboard/stats', getDashboardStats);

// Products
router.get('/products', getAllProductsAdmin);
router.get('/products/:id', getProductByIdAdmin);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Quotes / RFQs
router.get('/quotes', getAllQuotesAdmin);
router.get('/quotes/:id', getQuoteByIdAdmin);
router.patch('/quotes/:id/status', updateQuoteStatus);
router.delete('/quotes/:id', deleteQuote);

// Inquiries / Contact Messages
router.get('/messages', getAllMessagesAdmin);
router.patch('/messages/:id/read', toggleMessageRead);
router.patch('/messages/:id/status', updateMessageStatus);
router.delete('/messages/:id', deleteMessage);

// Blog Articles
router.get('/insights', getAllBlogPostsAdmin);
router.post('/insights', createBlogPost);
router.put('/insights/:id', updateBlogPost);
router.delete('/insights/:id', deleteBlogPost);

// Case Studies / Projects
router.get('/projects', getAllProjectsAdmin);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Users & Roles
router.get('/users', getAllUsersAdmin);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;

