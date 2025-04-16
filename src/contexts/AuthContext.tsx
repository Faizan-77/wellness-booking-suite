
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
    
    // Initialize registered users if none exist
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify([]));
    }
  }, []);
  
  // Login function - now checks against registered users
  const login = (email: string, password: string): boolean => {
    console.log("Logging in with:", { email, password });
    
    // Simple validation
    if (!email || !password) {
      return false;
    }
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Find the user with matching email and password
    const matchedUser = registeredUsers.find(
      (user: { email: string; password: string }) => 
        user.email === email && user.password === password
    );
    
    if (!matchedUser) {
      console.log("Login failed: User not found or incorrect password");
      return false;
    }
    
    // Create user object without the password
    const userData: User = {
      id: matchedUser.id,
      email: matchedUser.email,
      firstName: matchedUser.firstName,
      lastName: matchedUser.lastName,
      role: matchedUser.role
    };
    
    // Save user to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };
  
  // Signup function - now stores registered users
  const signup = (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
  }): boolean => {
    console.log("Signing up with:", userData);
    
    // Simple validation
    if (!userData.email || !userData.password) {
      return false;
    }
    
    // Get existing registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    if (registeredUsers.some((user: { email: string }) => user.email === userData.email)) {
      console.log("Signup failed: Email already registered");
      return false;
    }
    
    const role = userData.userType as 'patient' | 'doctor' | 'admin';
    
    // Create new user with ID
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      email: userData.email,
      password: userData.password, // Note: In a real app, this should be hashed!
      firstName: userData.firstName,
      lastName: userData.lastName,
      role
    };
    
    // Add to registered users
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Create user object without the password for state
    const userForState: User = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role
    };
    
    // Save user to state and localStorage
    setUser(userForState);
    localStorage.setItem('user', JSON.stringify(userForState));
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
