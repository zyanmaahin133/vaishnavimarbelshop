import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Client-side admin authentication.
 *
 * No database or server is required. The admin password is set in an env
 * variable (ADMIN_PASSWORD) and baked into the build. A session flag is kept
 * in sessionStorage so the admin stays logged in during the browser session.
 *
 * This is intentionally lightweight — it protects a browser-only content
 * studio, not real customer data. For a production store with real orders,
 * replace this with Supabase Auth.
 */

const SESSION_KEY = "vm-admin-session-v1";

type AdminAuthApi = {
  authenticated: boolean;
  ready: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthApi | null>(null);

const ADMIN_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? "admin123";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (raw === "1") setAuthenticated(true);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AdminAuthApi>(
    () => ({ authenticated, ready, login, logout }),
    [authenticated, ready, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
