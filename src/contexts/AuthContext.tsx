import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  userRole: string | null;
  user: {
    email?: string;
    firstName?: string;
    role?: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<{
    email?: string;
    firstName?: string;
    role?: string;
  } | null>(null);

  useEffect(() => {
    // Get user data from sessionStorage on mount
    const storedRole = sessionStorage.getItem("role");
    const storedEmail = sessionStorage.getItem("email");
    const storedFirstName = sessionStorage.getItem("firstName");
    const token = sessionStorage.getItem("token");

    if (token && storedRole) {
      setUserRole(storedRole);
      setUser({
        email: storedEmail,
        firstName: storedFirstName,
        role: storedRole,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This would normally call your API
    // For demo, we'll check hardcoded credentials
    const dummyUsers = [
      {
        email: "admin@unsil.ac.id",
        password: "admin123",
        firstName: "Administrator",
        role: "Admin"
      },
      {
        email: "ahmad.rizki@unsil.ac.id",
        password: "dosen123",
        firstName: "Ahmad Rizki",
        role: "Dosen"
      },
      {
        email: "budi.santoso@students.unsil.ac.id",
        password: "mahasiswa123",
        firstName: "Budi Santoso",
        role: "Mahasiswa"
      }
    ];

    const foundUser = dummyUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      sessionStorage.setItem("token", "dummy-token-" + Date.now());
      sessionStorage.setItem("firstName", foundUser.firstName);
      sessionStorage.setItem("role", foundUser.role);
      sessionStorage.setItem("email", foundUser.email);

      setUserRole(foundUser.role);
      setUser({
        email: foundUser.email,
        firstName: foundUser.firstName,
        role: foundUser.role,
      });

      return true;
    }

    return false;
  };

  const logout = () => {
    sessionStorage.clear();
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};