import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // CORRECTED: This now checks for the correct email from the form
  const login = (email, password) => {
    if (email === 'admin@ems.com' && password === 'password') {
      const userData = { name: 'Admin User', email: 'admin@ems.com' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } else {
      alert('Invalid credentials!');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};