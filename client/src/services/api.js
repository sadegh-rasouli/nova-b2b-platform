import axios from 'axios';

// Create standardized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Automatically inject JWT Authorization Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nova_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error payloads cleanly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected network or server error occurred.',
      data: error.response?.data || null,
    };

    // If 401 Unauthorized on protected routes, clear stale token
    if (error.response?.status === 401) {
      if (localStorage.getItem('nova_auth_token')) {
        localStorage.removeItem('nova_auth_token');
        localStorage.removeItem('nova_auth_user');
      }
    }

    return Promise.reject(customError);
  }
);

export default api;
