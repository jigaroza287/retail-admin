import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextValue, AuthState, AuthUser } from "./auth.types";

const AUTH_STORAGE_KEY = "retail_admin_auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { user: null, token: null };
    }
    return JSON.parse(raw) as AuthState;
  });

  const login = async (email: string, password: string): Promise<void> => {
    // 🔁 Replace with real API later
    if (email !== "admin@demo.com" || password !== "admin") {
      throw new Error("Invalid credentials");
    }

    const user: AuthUser = {
      id: "1",
      name: "Admin User",
      email,
      role: "admin",
    };

    const newState: AuthState = {
      user,
      token: "mock-jwt-token",
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({ user: null, token: null });
  };

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    isAuthenticated: Boolean(state.token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
