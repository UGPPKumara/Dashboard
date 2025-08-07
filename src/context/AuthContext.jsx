import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage to handle page refreshes
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login now returns true or false instead of navigating
  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      const userData = { name: 'Admin User', email: 'admin@fieldops.com' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true; // Indicate success
    } else {
      alert('Invalid credentials!');
      return false; // Indicate failure
    }
  };

  // Logout just clears the user state
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