import Link from "next/link";

import { cookies } from "next/headers";

import { ChevronRight, Heart, LogOut, MessageCircle, User } from "lucide-react";

import { CarCard } from "@/components/ui/cars/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getSession } from "@/hooks/get-session";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const favoriteCars = [
  {
    image:
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80",
    title: "Tesla Model 3",
    subtitle: "Sedan • Electric",
    price: "1.2jt",
    transmission: "Otomatis",
    fuel: "Listrik",
    status: "",
    slug: "tesla-model-3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
    title: "BMW X5",
    subtitle: "SUV • Premium",
    price: "2.5jt",
    transmission: "Otomatis",
    fuel: "Bensin",
    status: "Terlaris",
    slug: "bmw-x5",
  },
];

const faqs = [
  {
    id: "booking-id",
    question: "Dimana saya bisa menemukan ID Booking?",
    answer:
      "ID Booking dikirimkan melalui email dan WhatsApp sesaat setelah Anda mengajukan penyewaan.",
  },
  {
    id: "status-update",
    question: "Berapa lama status booking diperbarui?",
    answer:
      "Status booking diperbarui real-time setiap kali ada perubahan dari admin atau sistem pembayaran.",
  },
  {
    id: "booking-not-found",
    question: "ID Booking saya tidak ditemukan, apa yang harus dilakukan?",
    answer:
      "Pastikan Anda memasukkan kode dengan benar (termasuk tanda hubung). Jika masih tidak ditemukan, hubungi admin melalui WhatsApp.",
  },
  {
    id: "update-data",
    question: "Bagaimana cara memperbarui data profil atau alamat?",
    answer:
      "Silakan gunakan menu pengaturan di halaman profil untuk memperbarui data dan pilih alamat default yang sesuai kebutuhan Anda.",
  },
];

function getWhatsAppNumber(phone?: string | null): string {
  const raw = String(phone ?? "").trim();
  if (!raw) return "";

  const noPlus = raw.replace(/^\+/, "");
  if (noPlus.startsWith("62")) return noPlus.slice(2);
  if (noPlus.startsWith("0")) return noPlus.slice(1);

  return noPlus;
}

function getIdTypeLabel(idType?: string | null): string {
  switch ((idType ?? "").toLowerCase()) {
    case "ktp":
      return "Kartu Tanda Penduduk (KTP)";
    case "passport":
      return "Passport";
    case "sim_a":
      return "SIM A";
    default:
      return "-";
  }
}

function toDateInputValue(dateStr?: string | null): string {
  const raw = String(dateStr ?? "").trim();
  if (!raw) return "";

  // Expected DB format: `YYYY-MM-DD`, but we guard against ISO/other strings.
  const isoMatch = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  return isoMatch?.[1] ?? "";
}

async function getCustomerProfile(): Promise<CustomerProfile | null> {
  const apiUrl = API_CONFIG.ENDPOINTS.customerProfiles.me;
  if (!apiUrl?.trim()) return null;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
        ...getCarsApiHeaders(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return (await res.json()) ?? null;
  } catch {
    return null;
  }
}

async function getCustomerLocations(): Promise<CustomerLocation[]> {
  const apiUrl = API_CONFIG.ENDPOINTS.customerLocations.base;
  if (!apiUrl?.trim()) return [];

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return [];

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
        ...getCarsApiHeaders(),
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = (await res.json()) as { data?: CustomerLocation[] };
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const user = await getSession();
  if (!user) {
    return (
      <div className="p-8 text-gray-500">Silakan login terlebih dahulu.</div>
    );
  }

  const profile = await getCustomerProfile();
  const locations = await getCustomerLocations();
  const defaultLocation = locations.find((l) => l.is_default) ?? locations[0];

  const whatsappNumber = getWhatsAppNumber(profile?.phone);
  const idTypeLabel = getIdTypeLabel(profile?.id_type);
  const genderLabel =
    profile?.gender === "male"
      ? "Laki-laki"
      : profile?.gender === "female"
        ? "Perempuan"
        : "-";

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Informasi Dasar */}
          <div className={`bg-white rounded-[2rem] p-8 md:p-10 ${cardShadow}`}>
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <User className="w-6 h-6 text-[#FF9500]" />
              Informasi Dasar
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nama Lengkap
                </label>
                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {profile?.full_name ?? "-"}
                </span>
              </div>
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Email
                </label>

                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {profile?.email ?? "-"}
                </span>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nomor WhatsApp
                </label>
                <div className="flex items-center gap-2">
                  <div className="px-4 py-4 bg-gray-100 rounded-2xl font-bold text-gray-400">
                    +62
                  </div>
                  <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                    {whatsappNumber || "-"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={toDateInputValue(profile?.birth_date)}
                  disabled
                  className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none font-bold transition-all disabled:opacity-100"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Alamat Lengkap
                </label>
                <div className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all whitespace-pre-wrap min-h-[84px] flex items-start">
                  {defaultLocation?.address ?? "-"}
                </div>
              </div>
              <div className="space-y-3 flex flex-col">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Tipe ID
                </label>
                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {idTypeLabel}
                </span>
              </div>
              <div className="space-y-3 flex flex-col">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Nomor ID
                </label>
                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all">
                  {profile?.id_number ?? "-"}
                </span>
              </div>
              <div className="space-y-3 flex flex-col">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Jenis Kelamin
                </label>
                <span className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none focus:border-[#FF9500] font-bold transition-all inline-flex justify-start">
                  {genderLabel}
                </span>
              </div>
            </form>
          </div>

          {/* Armada Favorit */}
          <div className={`bg-white rounded-[2rem] p-8 ${cardShadow}`}>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#FF9500]" />
              Armada Favorit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteCars.map((car) => (
                <CarCard
                  key={car.slug}
                  image={car.image}
                  title={car.title}
                  subtitle={car.subtitle}
                  price={`Rp ${car.price}`}
                  transmission={car.transmission}
                  fuel={car.fuel}
                  status={car.status}
                  slug={car.slug}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* WhatsApp CS/Admin */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF9500]/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div>
                <h4 className="text-xs font-black text-[#FF9500] uppercase tracking-widest mb-2">
                  WhatsApp CS/Admin
                </h4>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-7 h-7 text-[#FF9500]" />
                  <h3 className="text-xl font-black">Chat WhatsApp Admin</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Ketik{" "}
                <span className="text-white font-bold">
                  &quot;STATUS [ID BOOKING]&quot;
                </span>{" "}
                lalu kirim ke nomor admin kami.
              </p>
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_CS || "6285811668557").replace(/\D/g, "")}`}
                id="btn-chat-wa-admin"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-4 bg-white text-[#1a1a1a] rounded-xl font-black text-sm hover:bg-[#FF9500] hover:text-white transition-all text-center"
              >
                Chat Sekarang
              </a>
            </div>
          </div>

          {/* Bantuan & Dukungan */}
          <div
            className={`bg-white rounded-[2rem] p-8 ${cardShadow} space-y-6`}
          >
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Bantuan & Dukungan
            </h4>

            <div className="space-y-4">
              <div>
                <p className="font-black text-sm text-gray-600">
                  Pusat Bantuan (FAQ)
                </p>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Cari jawaban instan untuk masalah Anda
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="font-black text-gray-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Link
              href="/syarat-dan-ketentuan"
              id="link-terms"
              className="flex items-center justify-between group"
            >
              <span className="font-bold text-gray-600 group-hover:text-[#1a1a1a]">
                Syarat & Ketentuan
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
            </Link>
            <Link
              href="/kebijakan-privasi"
              id="link-privacy"
              className="flex items-center justify-between group"
            >
              <span className="font-bold text-gray-600 group-hover:text-[#1a1a1a]">
                Kebijakan Privasi
              </span>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500]" />
            </Link>
          </div>

          {/* Logout */}
          <button
            id="btn-logout"
            type="button"
            className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Keluar dari Akun
          </button>
        </div>
      </div>
    </div>
  );
}
