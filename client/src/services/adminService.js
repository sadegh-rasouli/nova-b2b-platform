import api from './api';

export const adminService = {
  // Stats
  getDashboardStats: () => api.get('/admin/dashboard/stats'),

  // Products CRUD
  getAllProducts: (params = {}) => api.get('/admin/products', { params }),
  getProductById: (id) => api.get(`/admin/products/${id}`),
  createProduct: (payload) => api.post('/admin/products', payload),
  updateProduct: (id, payload) => api.put(`/admin/products/${id}`, payload),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),

  // Quotes Management
  getAllQuotes: (params = {}) => api.get('/admin/quotes', { params }),
  getQuoteById: (id) => api.get(`/admin/quotes/${id}`),
  updateQuoteStatus: (id, payload) => api.patch(`/admin/quotes/${id}/status`, payload),
  deleteQuote: (id) => api.delete(`/admin/quotes/${id}`),

  // Messages Management
  getAllMessages: (params = {}) => api.get('/admin/messages', { params }),
  toggleMessageRead: (id) => api.patch(`/admin/messages/${id}/read`),
  updateMessageStatus: (id, payload) => api.patch(`/admin/messages/${id}/status`, payload),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),

  // Insights / Articles CRUD
  getAllBlogPosts: (params = {}) => api.get('/admin/insights', { params }),
  createBlogPost: (payload) => api.post('/admin/insights', payload),
  updateBlogPost: (id, payload) => api.put(`/admin/insights/${id}`, payload),
  deleteBlogPost: (id) => api.delete(`/admin/insights/${id}`),

  // Case Studies / Projects CRUD
  getAllProjects: (params = {}) => api.get('/admin/projects', { params }),
  createProject: (payload) => api.post('/admin/projects', payload),
  updateProject: (id, payload) => api.put(`/admin/projects/${id}`, payload),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Users & Roles
  getAllUsers: () => api.get('/admin/users'),
  updateUserRole: (id, payload) => api.patch(`/admin/users/${id}/role`, payload),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

