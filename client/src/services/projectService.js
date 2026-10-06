import api from './api';

export const projectService = {
  getProjects: (params = {}) => api.get('/projects', { params }),
  getCaseStudies: (params = {}) => api.get('/projects', { params }),
  getProjectBySlug: (slug) => api.get(`/projects/${slug}`),
  getCaseStudyBySlug: (slug) => api.get(`/projects/${slug}`),
};

