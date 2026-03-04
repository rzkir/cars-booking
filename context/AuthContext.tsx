"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { API_CONFIG } from "@/lib/config";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Accounts | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

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
  const router = useRouter();

  useEffect(() => {
    // Check for existing JWT token and fetch user data
    const initializeAuth = async () => {
      // Ensure we're in the browser (not SSR)
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      // Since the cookie is httpOnly, we can't read it directly
      // Instead, we'll make an API call to check if the user is authenticated
      try {
        const apiUrl = API_CONFIG.ENDPOINTS.me;

        if (!apiUrl || apiUrl.trim() === "") {
          setLoading(false);
          return;
        }

        const userResponse = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_CONFIG.SECRET}`,
          },
        }).catch(() => {
          // Handle network errors
          // Don't throw - just set user to null and continue
          return null;
        });

        // If fetch failed, userResponse will be null
        if (!userResponse) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        if (!userResponse.ok) {
          // Handle rate limit errors
          if (userResponse.status === 429) {
            toast.error("Terlalu banyak permintaan. Silakan coba lagi nanti.");
            setUser(null);
            setUserRole(null);
            setLoading(false);
            return;
          }

          // If response is not OK, check if it's JSON before parsing
          const contentType = userResponse.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            try {
              await userResponse.json();
            } catch {
              // Ignore parse errors for non-JSON responses
            }
          }
          // Not authenticated - this is normal, not an error
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        // Check content type before parsing JSON
        const contentType = userResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        const userResponseData = await userResponse.json();

        if (userResponseData.error) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        // The API returns user data directly, not wrapped in a data property
        const account = userResponseData;

        // Validate account status and verification on initialization
        if (account.status === "inactive") {
          // Account is inactive, sign out the user
          setUser(null);
          setUserRole(null);
          // Clear cookie by calling signout
          try {
            await fetch(API_CONFIG.ENDPOINTS.signOut, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_CONFIG.SECRET}`,
              },
            });
          } catch {
            // Ignore signout errors
          }
          setLoading(false);
          return;
        }

        // Check isVerified (can be string "true"/"false" or boolean)
        const isVerified =
          account.isVerified === "true" || account.isVerified === true;
        if (!isVerified) {
          // Account is not verified, sign out the user
          setUser(null);
          setUserRole(null);
          // Clear cookie by calling signout
          try {
            await fetch(API_CONFIG.ENDPOINTS.signOut, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_CONFIG.SECRET}`,
              },
            });
          } catch {
            // Ignore signout errors
          }
          setLoading(false);
          return;
        }

        setUser(account);
        setUserRole(account.role);
      } catch {
        // Error occurred while fetching user data
        setUser(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await fetch(API_CONFIG.ENDPOINTS.signIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const resultData = await result.json().catch(() => null);

      if (!result.ok) {
        const message =
          (resultData &&
            ((resultData.detail as string) ||
              (resultData.message as string))) ||
          "Email atau password salah";
        toast.error(message);
        return;
      }

      const profile = resultData?.user;

      if (!profile) {
        toast.error("Data pengguna tidak ditemukan");
        return;
      }

      const account: Accounts = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role === "admin" ? "admin" : "customer",
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      };

      setUser(account);
      setUserRole(account.role);

      toast.success("Berhasil masuk", {
        duration: 2000,
      });

      router.push("/");

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_CONFIG.SECRET}`,
        },
      });

      // Clear local state
      setUser(null);
      setUserRole(null);

      toast.success("Logged out successfully!", {
        duration: 2000,
      });

      // Redirect manually to signin page with logout parameter
      router.push("/signin?logout=true");
    } catch {
      // Clear local state even if API calls fail
      setUser(null);
      setUserRole(null);

      // Try again to ensure server-side logout
      try {
        await fetch(API_CONFIG.ENDPOINTS.signOut, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_CONFIG.SECRET}`,
          },
        });
      } catch {
        // Ignore errors
      }

      toast.success("Logged out successfully!", {
        duration: 2000,
      });

      // Redirect manually to signin page with logout parameter
      router.push("/signin?logout=true");
    }
  };

  const refreshUserData = async (): Promise<Accounts | null> => {
    try {
      const response = await fetch(API_CONFIG.ENDPOINTS.me, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_CONFIG.SECRET}`,
        },
      });

      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return null;
      }

      const responseData = await response.json();

      if (!response.ok) {
        // Handle rate limit errors silently (don't show toast on refresh)
        if (response.status === 429) {
          // Just return null without showing error toast
          return null;
        }
        if (responseData.error) {
          return null;
        }
        return null;
      }

      // The API returns user data directly, not wrapped in a data property
      const account = responseData;
      setUser(account);
      setUserRole(account.role);

      return account;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (data && ((data.detail as string) || (data.message as string))) ||
          "Pendaftaran gagal, silakan coba lagi";
        toast.error(message);
        return;
      }

      toast.success(
        (data && (data.message as string)) ||
          "Pendaftaran berhasil, silakan signin untuk melanjutkan",
      );

      resetSignupState();
      // Setelah signup berhasil, arahkan ke halaman signin
      router.push("/signin");
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
