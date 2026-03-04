interface Accounts {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}

type UserRole = Accounts["role"];

interface AuthContextType {
  user: Accounts | null;
  loading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<Accounts | undefined>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<Accounts | null>;
  // Login form state
  loginEmail: string;
  loginPassword: string;
  loginIsLoading: boolean;
  loginRateLimitResetTime: Date | null;
  loginIsRateLimited: boolean;

  // Login form functions
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setLoginIsLoading: (loading: boolean) => void;
  handleLoginSubmit: () => Promise<void>;
  resetLoginState: () => void;

  // Signup form state
  signupName: string;
  signupEmail: string;
  signupPassword: string;
  signupConfirmPassword: string;
  signupIsLoading: boolean;

  // Signup form functions
  setSignupName: (name: string) => void;
  setSignupEmail: (email: string) => void;
  setSignupPassword: (password: string) => void;
  setSignupConfirmPassword: (confirmPassword: string) => void;
  setSignupIsLoading: (loading: boolean) => void;
  handleSignupSubmit: (
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  resetSignupState: () => void;
}
