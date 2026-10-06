import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nova_auth_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('nova_auth_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Validate existing token with server on initial mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('nova_auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await authService.getMe();
        if (res?.success && res.user) {
          setUser(res.user);
          localStorage.setItem('nova_auth_user', JSON.stringify(res.user));
        } else {
          logout();
        }
      } catch (err) {
        // Token expired or invalid
        console.warn('Authentication session expired or invalid:', err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    if (response?.success && response.token) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('nova_auth_token', response.token);
      localStorage.setItem('nova_auth_user', JSON.stringify(response.user));
      return response.user;
    }
    throw new Error(response?.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await authService.logout().catch(() => {});
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('nova_auth_token');
      localStorage.removeItem('nova_auth_user');
    }
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = isAuthenticated && (user?.role === 'admin' || user?.role === 'superadmin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
