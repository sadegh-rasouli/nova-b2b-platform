import api from './api';

export const quoteService = {
  submitQuote: (payload) => api.post('/quotes', payload),
  createQuote: (payload) => api.post('/quotes', payload),
  getQuoteById: (idOrNumber) => api.get(`/quotes/${idOrNumber}`),
};

