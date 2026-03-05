"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

import { toast } from "sonner";

import { API_CONFIG } from "@/lib/config";

/** Normalisasi role seperti di be: hanya "admin" (case-insensitive) = admin, selain itu customer */
function normalizeRole(role: unknown): "admin" | "customer" {
  return String(role ?? "").toLowerCase() === "admin" ? "admin" : "customer";
}

function accountToUser(
  account: Record<string, unknown> | null,
): Accounts | null {
  if (!account || !account.id) return null;
  const role = normalizeRole(account.role);
  return {
    id: String(account.id),
    name: String(account.name ?? ""),
    email: String(account.email ?? ""),
    phone: String(account.phone ?? ""),
    role: role as UserRole,
    created_at: String(account.created_at ?? ""),
    updated_at: String(account.updated_at ?? ""),
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  /** Session dari SSR (getSession di layout). Jika ada, client tidak memanggil GET /api/auth/session. */
  initialSession?: Accounts | null;
}) {
  const sessionFromServer = initialSession !== undefined;
  const [user, setUser] = useState<Accounts | null>(
    sessionFromServer ? (initialSession ?? null) : null,
  );
  const [userRole, setUserRole] = useState<UserRole | null>(
    sessionFromServer && initialSession ? (initialSession.role as UserRole) : null,
  );
  const [loading, setLoading] = useState(!sessionFromServer);

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginRateLimitResetTime, setLoginRateLimitResetTime] =
    useState<Date | null>(null);
  const [loginIsRateLimited, setLoginIsRateLimited] = useState(false);
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  useEffect(() => {
    if (sessionFromServer) return;

    const initializeAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const apiUrl = API_CONFIG.ENDPOINTS.session;
      if (!apiUrl?.trim()) {
        setUser(null);
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }).catch(() => null);

        if (!res || !res.ok) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.error) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        const accountUser = accountToUser(data.account ?? data.user);
        if (accountUser) {
          setUser(accountUser);
          setUserRole(accountUser.role as UserRole);
        } else {
          setUser(null);
          setUserRole(null);
        }
      } catch {
        setUser(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [sessionFromServer]);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await fetch(API_CONFIG.ENDPOINTS.signIn, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const resultData = await result.json().catch(() => null);

      if (!result.ok) {
        const message =
          (resultData?.error as string) || "Email atau password salah";
        toast.error(message);
        return;
      }

      const accountData = resultData?.account ?? resultData?.user;
      if (!accountData) {
        toast.error("Data pengguna tidak ditemukan");
        return;
      }

      const account = accountToUser(accountData);
      if (!account) {
        toast.error("Data pengguna tidak valid");
        return;
      }

      setUser(account);
      setUserRole(account.role as UserRole);

      toast.success("Berhasil masuk", { duration: 2000 });

      // Redirect ditangani proxy (admin → /dashboard, customer → /)
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }

      return account;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login. Silakan coba lagi.";
      toast.error(errorMessage);
      return;
    }
  };

  const signOut = async () => {
    try {
      await fetch(API_CONFIG.ENDPOINTS.signOut, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // ignore
    }
    setUser(null);
    setUserRole(null);
    toast.success("Berhasil keluar", { duration: 2000 });
    // Redirect ditangani proxy
    if (typeof window !== "undefined")
      window.location.href = "/signin?logout=true";
  };

  const refreshUserData = async (): Promise<Accounts | null> => {
    const apiUrl = API_CONFIG.ENDPOINTS.session;
    if (!apiUrl) return null;
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) return null;
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) return null;
      const data = await res.json();
      if (data.error) return null;
      const accountUser = accountToUser(data.account ?? data.user);
      if (accountUser) {
        setUser(accountUser);
        setUserRole(accountUser.role as UserRole);
        return accountUser;
      }
      return null;
    } catch {
      return null;
    }
  };
  // Login form functions
  const handleLoginSubmit = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Please enter both email and password");
      return;
    }

    if (loginIsRateLimited) {
      return;
    }

    setLoginIsLoading(true);

    try {
      const account = await signIn(loginEmail, loginPassword);
      if (account) {
        resetLoginState();
      }
    } catch {
      // Rate limit error is handled in signIn function
      // State is set in signIn when rate limit occurs
    } finally {
      setLoginIsLoading(false);
    }
  };

  const resetLoginState = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginIsLoading(false);
    setLoginIsRateLimited(false);
    setLoginRateLimitResetTime(null);
  };

  // Effect to check and clear rate limit when timer expires
  useEffect(() => {
    if (!loginRateLimitResetTime || !loginIsRateLimited) {
      return;
    }

    const checkRateLimit = () => {
      const now = new Date();
      if (now >= loginRateLimitResetTime) {
        setLoginIsRateLimited(false);
        setLoginRateLimitResetTime(null);
      }
    };

    // Check immediately
    checkRateLimit();

    // Check every second
    const interval = setInterval(checkRateLimit, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [loginRateLimitResetTime, loginIsRateLimited]);

  // Signup form functions (Supabase / Hono backend)
  const handleSignupSubmit = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak sama");
      return;
    }

    if (password.length < 8) {
      toast.error("Password minimal 8 karakter");
      return;
    }

    setSignupIsLoading(true);

    try {
      const response = await fetch(API_CONFIG.ENDPOINTS.signUp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data?.error as string) || "Pendaftaran gagal, silakan coba lagi";
        toast.error(message);
        return;
      }

      const accountData = data?.account ?? data?.user;
      if (accountData) {
        const account = accountToUser(accountData);
        if (account) {
          setUser(account);
          setUserRole(account.role as UserRole);
          toast.success("Pendaftaran berhasil");
          resetSignupState();
          // Redirect ditangani proxy (admin → /dashboard, customer → /)
          if (typeof window !== "undefined") window.location.href = "/";
          return;
        }
      }

      toast.success(
        (data?.message as string) ||
          "Pendaftaran berhasil, silakan signin untuk melanjutkan",
      );
      resetSignupState();
      if (typeof window !== "undefined") window.location.href = "/signin";
    } catch {
      toast.error("Terjadi kesalahan jaringan, silakan coba lagi");
    } finally {
      setSignupIsLoading(false);
    }
  };

  const resetSignupState = () => {
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupIsLoading(false);
  };

  const value = {
    user,
    userRole,
    loading,
    signIn,
    signOut,
    refreshUserData, // Added function to refresh user data from database
    // Login form state
    loginEmail,
    loginPassword,
    loginIsLoading,
    loginRateLimitResetTime,
    loginIsRateLimited,
    // Login form functions
    setLoginEmail,
    setLoginPassword,
    setLoginIsLoading,
    handleLoginSubmit,
    resetLoginState,
    // Signup form state
    signupName,
    signupEmail,
    signupPassword,
    signupConfirmPassword,
    signupIsLoading,
    // Signup form functions
    setSignupName,
    setSignupEmail,
    setSignupPassword,
    setSignupConfirmPassword,
    setSignupIsLoading,
    handleSignupSubmit,
    resetSignupState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
