export function getBookingConfirmedMessage(booking: WhatsAppBookingContext) {
  const carName = booking.cars?.name ?? "mobil";
  const customerName = booking.customer_profiles?.full_name;
  const greeting = customerName ? `Halo ${customerName},` : "Halo,";

  const paymentUrl =
    typeof window !== "undefined"
      ? new URL(`/booking/${booking.id}`, window.location.origin).toString()
      : `/booking/${booking.id}`;

  return `${greeting}
Booking kamu telah *DIKONFIRMASI* ✅

📄 Rincian Booking
- ID Booking   : ${booking.id}
- Status       : ${booking.status}
- Tipe Rental  : ${booking.rental_type?.replace("_", " ")}

🚗 Mobil
- Nama         : ${carName}
- Warna        : ${
    booking.colors?.name ??
    (booking.color_id ? booking.color_id : "Tidak ada informasi warna")
  }

📅 Periode
- Mulai        : ${booking.start_date}
- Selesai      : ${booking.end_date}${
    booking.total_days
      ? `
- Total Hari   : ${booking.total_days} hari`
      : ""
  }

💰 Pembayaran
- Total Harga  : Rp ${booking.total_price.toLocaleString("id-ID")}

Silakan selesaikan pembayaran di tautan berikut:
${paymentUrl}

📝 Catatan
${booking.notes?.trim() ? booking.notes : "-"} 

Terima kasih telah menggunakan layanan kami 🚗`;
}

export function getBookingCompletedMessage(booking: WhatsAppBookingContext) {
  const carName = booking.cars?.name ?? "mobil";
  const customerName = booking.customer_profiles?.full_name;
  const greeting = customerName ? `Halo ${customerName},` : "Halo,";

  return `${greeting}
Booking kamu telah *SELESAI* 🎉

📄 Rincian Booking
- ID Booking   : ${booking.id}
- Status       : ${booking.status}
- Tipe Rental  : ${booking.rental_type?.replace("_", " ")}

🚗 Mobil
- Nama         : ${carName}
- Warna        : ${
    booking.colors?.name ??
    (booking.color_id ? booking.color_id : "Tidak ada informasi warna")
  }

📅 Periode
- Mulai        : ${booking.start_date}
- Selesai      : ${booking.end_date}${
    booking.total_days
      ? `
- Total Hari   : ${booking.total_days} hari`
      : ""
  }

💰 Pembayaran
- Total Harga  : Rp ${booking.total_price.toLocaleString("id-ID")}

📝 Catatan
${booking.notes?.trim() ? booking.notes : "-"} 

Terima kasih, booking kamu sudah selesai. Jika ada kebutuhan sewa mobil lagi, jangan ragu untuk menghubungi kami 🚗`;
}

export function getPaymentSuccessMessage(ctx: WhatsAppPaymentContext) {
  const { payment, booking, bookingId, trackingUrl } = ctx;

  const carName = booking?.cars?.name ?? "mobil";
  const customerName =
    booking?.customer_profiles?.full_name ??
    // fallback ke customer_profiles dari payment kalau ada
    (
      payment as PaymentWithBooking & {
        customer_profiles?: BookingWithRelations["customer_profiles"] | null;
      }
    ).customer_profiles?.full_name;

  const greeting = customerName ? `Halo ${customerName},` : "Halo,";

  return `${greeting}
Pembayaran untuk booking kamu telah *BERHASIL* ✅

📄 Rincian Booking
- ID Booking    : ${bookingId}
- Status        : ${booking?.status ?? "paid"}

🚗 Mobil
- Nama          : ${carName}

💰 Detail Pembayaran
- Nominal       : Rp ${
    (booking?.total_price ?? payment.amount).toLocaleString("id-ID") ?? "-"
  }
- Metode        : ${payment.method ?? "-"}
- Status        : ${payment.status ?? "paid"}
- Dibayar Pada  : ${payment.paid_at ?? "-"}

Anda dapat melihat detail dan status terbaru booking di:
${trackingUrl}

Terima kasih telah menyelesaikan pembayaran 🚗

Mohon tunggu admin kami untuk memverifikasi dan membalas pesan ini,
atau Anda bisa langsung datang ke toko kami sesuai jam operasional.`;
}

export function getCustomerBookingCreatedMessage(
  ctx: CustomerBookingCreatedContext,
) {
  const {
    fullName,
    carName,
    selectedTypeLabel,
    startDate,
    endDate,
    formattedTotalEstimate,
    notes,
    trackingUrl,
  } = ctx;

  const safeName = (fullName ?? "").trim() || "Customer";

  const messageLines = [
    `Halo ${safeName}, terima kasih sudah melakukan pemesanan di Space Digitalia Rent Car 🚗`,
    "",
    `Detail Booking:`,
    `• Mobil: ${carName}`,
    `• Tipe: ${selectedTypeLabel}`,
    `• Tanggal: ${startDate} s/d ${endDate}`,
    `• Total estimasi: ${formattedTotalEstimate.replace(",00", "")}`,
    `• Catatan: ${notes?.trim() || "-"}`,
    "",
    `Tim admin kami akan menghubungi Anda untuk konfirmasi lebih lanjut.`,
    `Lacak status booking: ${trackingUrl}`,
  ];

  return messageLines.join("\n");
}
