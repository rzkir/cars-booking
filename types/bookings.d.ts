type BookingStatus =
  | "pending"
  | "confirmed"
  | "ongoing"
  | "done"
  | "cancelled";

type BookingRentalType = "self_drive" | "with_driver";

interface Booking {
  id: string;
  account_id: string | null;
  customer_profile_id: string | null;
  car_id: string;
  rental_type: BookingRentalType;
  color_id: string | null;
  start_date: string;
  end_date: string;
  total_days: number;
  total_price: number;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface BookingWithRelations extends Booking {
  customer_profiles?: {
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    id_number: string | null;
    is_verified: boolean;
  } | null;
  cars?: {
    id: string;
    name: string;
    slug: string;
    car_images?: { image_url: string; is_primary: boolean }[];
  } | null;
  colors?: { id: string; name: string } | null;
}

interface CreateBookingInput {
  car_id: string;
  rental_type: BookingRentalType;
  color_id?: string | null;
  /** Profil customer terverifikasi (untuk data penyewa) */
  customer_profile_id?: string | null;
  /** Alternatif: kirim nama warna, backend akan resolve ke color_id */
  color?: string | null;
  start_date: string;
  end_date: string;
  notes?: string | null;
}

interface UpdateBookingInput {
  status?: BookingStatus;
  notes?: string | null;
}
