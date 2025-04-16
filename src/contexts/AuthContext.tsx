
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our authentication state
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'patient' | 'doctor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
  }) => boolean;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Mock login function - in a real app this would make an API request
  const login = (email: string, password: string): boolean => {
    // This is a simplified mock authentication
    // In a real app, you would validate against a backend
    console.log("Logging in with:", { email, password });
    
    // Simple validation - would be done by backend in real app
    if (!email || !password) {
      return false;
    }
    
    // Mock user based on email address pattern
    let role: 'patient' | 'doctor' | 'admin' = 'patient';
    
    if (email.includes('admin')) {
      role = 'admin';
    } else if (email.includes('doctor')) {
      role = 'doctor';
    }
    
    const userData: User = {
      id: Math.random().toString(36).substring(2, 15),
      email,
      role
    };
    
    // Save user to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };
  
  // Mock signup function - in a real app this would make an API request
  const signup = (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
  }): boolean => {
    // This is a simplified mock registration
    console.log("Signing up with:", userData);
    
    // Simple validation - would be done by backend in real app
    if (!userData.email || !userData.password) {
      return false;
    }
    
    const role = userData.userType as 'patient' | 'doctor' | 'admin';
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role
    };
    
    // Save user to state and localStorage
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
