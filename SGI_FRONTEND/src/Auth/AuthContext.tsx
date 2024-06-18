// AuthContext.tsx
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface User {
  idUsuario: string;
  roles: number[];
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    try {
      const decodedToken = jwtDecode<User>(token);
      setUser(decodedToken);
      localStorage.setItem('token', token);
      console.log(decodedToken);  // Para verificar que el token se decodifica correctamente
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
