/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Page load par check karo agar token exist karta hai (sessionStorage mein)
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Tab close hone par logout karne ke liye beforeunload event add karo
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('adminToken');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const login = (token) => {
    sessionStorage.setItem('adminToken', token);
    setIsAdmin(true);
  };

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);