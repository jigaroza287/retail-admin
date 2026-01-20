import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchMe, login as loginApi, logout as logoutApi } from "../api/auth";
import type { AuthContextValue, AuthUser } from "./auth.types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const hasToken = Boolean(localStorage.getItem("token"));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(hasToken);

  // Bootstrap auth on app load
  useEffect(() => {
    if (!hasToken) {
      return;
    }

    fetchMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hasToken]);

  const login = async (email: string, password: string) => {
    const user = await loginApi(email, password);
    setUser(user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
