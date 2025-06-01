// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for user data stored in context, based on your login success response
interface User {
  userId: string;
  userType: "premium" | "basic" | "admin";
  firstName: string;
  lastName: string;
  planType: "free" | "premium" | "enterprise";
  hasCompleteProfile: boolean;
  // IMPORTANT: Do NOT store the 'token' directly in the User object in context
  // Store it separately in localStorage as we do in the login function.
}

// Define the shape of our context value (what will be provided to components)
interface AuthContextType {
  user: User | null; // User object or null if not logged in
  isAuthenticated: boolean; // True if user is logged in
  login: (userData: User, token: string) => void; // Function to call on successful login
  logout: () => void; // Function to call on logout
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap your entire application and provide the context
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold user data.
  // It tries to load user data from localStorage when the app starts (for persistence).
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // State to determine if a user is authenticated (checks for a token in localStorage).
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("authToken");
  });

  // Function to call when a user successfully logs in
  const login = (userData: User, token: string) => {
    setUser(userData); // Set the user data in state
    setIsAuthenticated(true); // Mark as authenticated
    // Store user data and token in localStorage for persistence across browser sessions
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
    console.log("User logged in, token saved.");
  };

  // Function to call when a user logs out
  const logout = () => {
    setUser(null); // Clear user data
    setIsAuthenticated(false); // Mark as not authenticated
    // Remove user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    console.log("User logged out, token removed.");
  };

  // The value that will be provided to consumers of this context
  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext from any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw an error if useAuth is used outside of AuthProvider, helps catch bugs
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
