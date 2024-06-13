import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, signup as signupService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const login = async (email, password) => {
    const { token } = await loginService(email, password);
    setToken(token);
  };

  const signup = async (data) => {
    await signupService(data);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
