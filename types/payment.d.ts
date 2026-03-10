type PaymentStatus = "unpaid" | "paid" | "failed";

type PaymentMethod = "transfer" | "qris" | "midtrans" | string;

interface Payment {
  id: string;
  booking_id: string;
  method: PaymentMethod | null;
  amount: number;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

interface PaymentWithBooking extends Payment {
  bookings?: {
    id: string;
    account_id: string | null;
    car_id: string;
    total_price: number;
    status: string;
  } | null;
}
