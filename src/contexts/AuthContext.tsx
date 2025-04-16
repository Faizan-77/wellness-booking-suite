
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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
  getAllUsers: () => User[];
  getUserById: (id: string) => User | undefined;
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
  
  // Login function - checks against registered users
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Logging in with:", { email });
    
    // Simple validation
    if (!email || !password) {
      return false;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
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
  
  // Signup function - stores registered users
  const signup = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userType: string;
  }): Promise<boolean> => {
    console.log("Signing up with:", userData);
    
    // Simple validation
    if (!userData.email || !userData.password) {
      return false;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
  
  // Update user profile
  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update in registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = registeredUsers.map((regUser: any) => 
      regUser.id === user.id ? { ...regUser, ...userData } : regUser
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };
  
  // Get all users (for admin functionality)
  const getAllUsers = (): User[] => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return registeredUsers.map((user: any) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }));
  };
  
  // Get user by ID
  const getUserById = (id: string): User | undefined => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find((user: any) => user.id === id);
    if (!foundUser) return undefined;
    
    return {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role
    };
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateUserProfile,
      getAllUsers,
      getUserById
    }}>
      {children}
    </AuthContext.Provider>
  );
};
