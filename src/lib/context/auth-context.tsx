'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { User } from '../services/auth';
import Loader from '@/components/common/Loader';

type AuthContextType = {
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Validate token function
  const isTokenValid = (token: string): boolean => {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp > currentTime : false;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken && isTokenValid(storedToken)) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      
      // Redirect authenticated users away from login/register pages
      if (pathname === '/auth/login' || pathname === '/auth/register') {
        router.replace('/dashboard');
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Redirect unauthorized users away from protected pages
      if (!['/auth/login', '/auth/register'].includes(pathname)) {
        router.replace('/auth/login');
      }
    }

    setLoading(false);
  }, [pathname]);

  const setAuth = (newUser: User | null, newToken: string | null) => {
    setUser(newUser);
    setToken(newToken);

    if (newUser && newToken) {
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', newToken);
      router.replace('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.replace('/auth/login');
  };

  if (loading) {
    return <Loader />

  }

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
