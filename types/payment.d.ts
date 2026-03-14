type PaymentStatus = "unpaid" | "paid" | "failed";

type PaymentMethod = "transfer" | "qris" | "midtrans" | string;

interface PaymentDetailsJson {
  va_numbers?: {
    bank: string;
    va_number: string;
  }[];
  fraud_status?: string;
  gross_amount?: string;
  payment_type?: string;
  transaction_id?: string;
  transaction_time?: string;
  [key: string]: unknown;
}

interface Payment {
  id: string;
  booking_id: string;
  method: PaymentMethod | null;
  amount: number;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  payment_details?: PaymentDetailsJson | null;
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
