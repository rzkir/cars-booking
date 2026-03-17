enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

interface Accounts {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  picture?: string;
  created_at: string;
  updated_at: string;
}

interface CustomerLocation {
  id: string;
  customer_id: string;
  label: string | null;
  address: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface ProfileLocationsClientProps {
  initialLocations: CustomerLocation[];
  cardShadow: string;
  onLocationAdded?: () => void;
}

interface LocationResult {
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  /** Initial center [lat, lng] */
  center?: [number, number];
  /** Initial zoom */
  zoom?: number;
  /** Called when user selects a location from search */
  onSelect: (result: LocationResult) => void;
  /** Height of the map container (default 320px) */
  height?: string;
  /** Optional: show search bar label */
  searchLabel?: string;
  /** Optional marker position [lat, lng] */
  marker?: [number, number];
}

interface GeoSearchHandlerProps {
  onSelect: (result: LocationResult) => void;
  searchLabel?: string;
}

interface CustomerProfile {
  id: string;
  account_id: string;
  full_name: string;
  email: string | null;
  phone: string;
  birth_date: string | null;
  gender: "male" | "female" | null;
  id_type: string;
  id_number: string | null;
  image_ktp: string | null;
  image_sim_a: string | null;
  image_selfie_ktp: string | null;
  is_verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface CustomerLocation {
  id: string;
  customer_id: string;
  label: string | null;
  address: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface EditProfileFormProps {
  user: Accounts;
  profile: CustomerProfile | null;
  initialLocations: CustomerLocation[];
  formInputClass: string;
  cardShadow: string;
}

type DocType = "ktp" | "sim_a" | "selfie_ktp";

//====================== AuthContext ======================//
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
