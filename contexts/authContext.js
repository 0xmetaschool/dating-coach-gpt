import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthPage from '../pages/components/authpage';  

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log(userData);
            if (!userData.onboardingComplete) {
              router.push('/onboarding');
            }
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error loading user:', error);
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, [router]);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    if (!userData.onboardingComplete) {
      router.push('/onboarding');
    } else {
      router.push('/dating-assistant');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const updateUser = async (updates) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/user', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    updateUser,
    login,
    logout,
    loading,
    AuthPage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}