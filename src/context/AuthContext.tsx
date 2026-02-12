import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("healconnect_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("healconnect_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData: User = { id: found.id, name: found.name, email: found.email, phone: found.phone };
      setUser(userData);
      localStorage.setItem("healconnect_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, phone: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("healconnect_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: crypto.randomUUID(), name, email, phone, password };
    users.push(newUser);
    localStorage.setItem("healconnect_users", JSON.stringify(users));
    const userData: User = { id: newUser.id, name, email, phone };
    setUser(userData);
    localStorage.setItem("healconnect_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("healconnect_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
