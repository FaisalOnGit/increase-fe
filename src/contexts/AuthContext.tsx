/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, getUser, getStoredUser } from "../api/auth";
import { User } from "../types/api.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on mount
    const checkAuth = async () => {
      const token = sessionStorage.getItem("token");
      const storedUser = getStoredUser();

      if (token && storedUser) {
        setUser(storedUser);
        try {
          // Verify token by fetching user data from API
          const response = await getUser();
          if (response.success && response.data) {
            setUser(response.data.user);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
          } else {
            // Token is invalid, clear storage
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            setUser(null);
          }
        } catch (error) {
          // API call failed, clear storage
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiLogin({ email, password });

      if (response.success && response.data) {
        const { user } = response.data;
        setUser(user);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await getUser();
      if (response.success && response.data) {
        setUser(response.data.user);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
