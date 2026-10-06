import api from './api';

export const contactService = {
  submitMessage: (payload) => api.post('/contact', payload),
  createMessage: (payload) => api.post('/contact', payload),
};

