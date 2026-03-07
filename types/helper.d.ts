//==================================== Lookups ====================================//
interface Transmission {
  id: string;
  name: string;
}

interface FuelType {
  id: string;
  name: string;
}

interface Facility {
  id: string;
  name: string;
}

const lookupKeys = {
  transmissions: ["lookup", "transmissions"] as const,
  fuelTypes: ["lookup", "fuelTypes"] as const,
  facilities: ["lookup", "facilities"] as const,
};

//==================================== Cars (CRUD payloads) ====================================//
type CarCreateInput = {
  name: string;
  slug?: string;
  description?: string;
  price_per_day: number;
  price_with_driver_per_day?: number;
  transmission: string;
  capacity: number;
  fuel_type?: string;
  year?: number;
  rental_type?: "self_drive" | "with_driver";
  facilities?: string[];
  status?: "available" | "rented" | "maintenance";
};

type CarUpdateInput = Partial<CarCreateInput>;

//==================================== Cars ====================================//
type CarTransmission = string;

type CarRentalType = "self_drive" | "with_driver";

type CarStatus = "available" | "rented" | "maintenance";

interface CarPricing {
  id: string;
  car_id: string;
  type: CarRentalType;
  price_per_day: number;
  created_at: string;
  updated_at: string;
}

interface CarPricingSummary {
  type: CarRentalType;
  price_per_day: number;
}

interface CarImageSummary {
  image_url: string;
  is_primary: boolean;
}

interface CarListItem {
  id: string;
  name: string;
  slug: string;
  price_per_day: number;
  price_with_driver_per_day: number | null;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  year: number | null;
  rental_type: CarRentalType;
  facilities: string[] | null;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_images?: CarImageSummary | null;
  car_pricings?: CarPricingSummary[];
}

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  position: number;
  created_at: string;
}

interface Car {
  id: string;
  account_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_per_day: number;
  price_with_driver_per_day: number | null;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  year: number | null;
  rental_type: CarRentalType;
  facilities: string[] | null;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_pricings?: CarPricing[];
  car_images?: CarImage[];
}

//==================================== OCR ====================================//
type DocTypeOcr = "ktp" | "sim_a" | "selfie_ktp";

const KTP_KEYWORDS = [
  "KTP",
  "NIK",
  "REPUBLIK",
  "INDONESIA",
  "KARTU TANDA PENDUDUK",
  "PROVINSI",
  "KABUPATEN",
  "KOTA",
  "KECAMATAN",
  "KELURAHAN",
  "DESA",
  "ALAMAT",
  "RT",
  "RW",
];

const SIM_KEYWORDS = [
  "SIM",
  "SURAT IZIN MENGEMUDI",
  "KEMENTERIAN",
  "PERHUBUNGAN",
  "DRIVING",
  "LICENSE",
  " NAMA ",
  "BERLAKU",
];

const SELFIE_KTP_KEYWORDS = [
  "KTP",
  "NIK",
  "REPUBLIK",
  "INDONESIA",
  "KARTU",
  "PROVINSI",
];

interface KtpExtractedData {
  full_name?: string;
  birth_date?: string;
  gender?: "male" | "female";
  id_number?: string;
}

type ValidateDocumentResult = {
  valid: boolean;
  message?: string;
  ktpData?: KtpExtractedData;
  simData?: KtpExtractedData;
};

//==================================== OCR ====================================//
type DocType = "ktp" | "sim_a" | "selfie_ktp";

interface AccountStoreState {
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  uploadingDoc: DocType | null;
  setUploadingDoc: (t: DocType | null) => void;
  ktpExtractedData: KtpExtractedData | null;
  setKtpExtractedData: (d: KtpExtractedData | null) => void;
  simExtractedData: KtpExtractedData | null;
  setSimExtractedData: (d: KtpExtractedData | null) => void;
  showVerifiedModal: boolean;
  setShowVerifiedModal: (v: boolean) => void;
  idTypeState: string;
  setIdTypeState: (v: string) => void;
  idNumberState: string;
  setIdNumberState: (v: string) => void;
  addingLocation: boolean;
  setAddingLocation: (v: boolean) => void;
  newLabel: string;
  setNewLabel: (v: string) => void;
  newAddress: string;
  setNewAddress: (v: string) => void;
  pickedLocation: LocationResult | null;
  setPickedLocation: (v: LocationResult | null) => void;
  newIsDefault: boolean;
  setNewIsDefault: (v: boolean) => void;
  deletingLocationId: string | null;
  setDeletingLocationId: (v: string | null) => void;
  resetAddLocationForm: () => void;
}
