import api from './api';

export const blogService = {
  getArticles: (params = {}) => api.get('/insights', { params }),
  getBlogPosts: (params = {}) => api.get('/insights', { params }),
  getArticleBySlug: (slug) => api.get(`/insights/${slug}`),
  getBlogPostBySlug: (slug) => api.get(`/insights/${slug}`),
  getRelatedArticles: (slug) => api.get(`/insights/${slug}`).then((res) => res.related || []),
};

