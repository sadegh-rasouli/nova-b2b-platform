import api from './api';

export const productService = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProductBySlug: (slug) => api.get(`/products/${slug}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getCategoriesSummary: () => api.get('/products/categories/summary'),
};
