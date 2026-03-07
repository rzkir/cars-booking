import type { Metadata } from "next";

import Link from "next/link";

import { Award, ChevronRight, Copy, LogOut } from "lucide-react";

import { getSession } from "@/hooks/get-session";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import EditProfileForm from "@/components/profile/EditProfileForm";

import { AccountStoreProvider } from "@/services/accounts.service";

export const metadata: Metadata = {
  title: "Edit Profil - DriveEase Indonesia",
  description: "Ubah informasi personal dan data akun DriveEase Indonesia.",
};

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

const formInputClass =
  "w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 outline-none font-bold transition-all focus:border-[#FF9500] focus:bg-white";

async function getCustomerProfile(): Promise<{
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
} | null> {
  const apiUrl = API_CONFIG.ENDPOINTS.customerProfiles.me;
  if (!apiUrl?.trim()) return null;

  const { cookies } = await import("next/headers");
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
    const data = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}

async function getLocations(): Promise<
  {
    id: string;
    customer_id: string;
    label: string | null;
    address: string;
    latitude: number;
    longitude: number;
    is_default: boolean;
    created_at: string;
    updated_at: string;
  }[]
> {
  const apiUrl = API_CONFIG.ENDPOINTS.customerLocations.base;
  if (!apiUrl?.trim()) return [];

  const { cookies } = await import("next/headers");
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
    const json = (await res.json()) as {
      data?: {
        id: string;
        customer_id: string;
        label: string | null;
        address: string;
        latitude: number;
        longitude: number;
        is_default: boolean;
        created_at: string;
        updated_at: string;
      }[];
    };
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const user = (await getSession())!;
  const profile = await getCustomerProfile();
  const locations = await getLocations();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Form */}
        <div className="lg:col-span-8 space-y-8">
          <div
            className={`bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 ${cardShadow}`}
          >
            <AccountStoreProvider
              defaultIdType={profile?.id_type ?? "ktp"}
              defaultIdNumber={profile?.id_number ?? ""}
            >
              <EditProfileForm
                user={user}
                profile={profile}
                initialLocations={locations}
                formInputClass={formInputClass}
                cardShadow={cardShadow}
              />
            </AccountStoreProvider>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* DriveEase Loyalty */}
          <div className="bg-[#1a1a1a] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF9500]/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[10px] font-black text-[#FF9500] uppercase tracking-[0.2em]">
                    DriveEase Loyalty
                  </h4>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#FF9500]" />
                  </div>
                </div>
                <p className="text-4xl font-black">
                  2,450{" "}
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest ml-1">
                    Poin
                  </span>
                </p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status Membership
                  </span>
                  <span className="text-xs font-black text-[#FF9500] uppercase tracking-widest">
                    Gold
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                  <div className="w-3/4 h-full bg-[#FF9500] rounded-full relative shadow-[0_0_15px_rgba(255,149,0,0.5)]" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  Dapatkan 550 poin lagi untuk membuka status{" "}
                  <span className="text-white">Platinum Member</span>
                </p>
              </div>
              <button
                id="sidebar-btn-redeem"
                type="button"
                className="w-full py-4 bg-white text-[#1a1a1a] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF9500] hover:text-white transition-all shadow-lg"
              >
                Tukar Reward Poin
              </button>
            </div>
          </div>

          {/* Kode Referral */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow}`}
          >
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
              Kode Referral Anda
            </h4>
            <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 text-center space-y-4 group cursor-pointer hover:bg-white hover:border-[#FF9500] transition-all">
              <p className="text-2xl font-black tracking-widest group-hover:text-[#FF9500] transition-colors">
                DRIVE-RIZKY-99
              </p>
              <button
                id="sidebar-btn-copy-ref"
                type="button"
                className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 group-hover:text-[#FF9500] uppercase tracking-widest transition-colors"
              >
                <Copy className="w-4 h-4" />
                Klik Untuk Salin
              </button>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-6 leading-relaxed text-center">
              Bagikan kode ini ke kolega Anda dan dapatkan saldo kredit{" "}
              <span className="text-[#1a1a1a] font-bold">Rp 100rb</span> untuk
              setiap sewa pertama mereka.
            </p>
          </div>

          {/* Bantuan & Dukungan */}
          <div
            className={`bg-white rounded-[2rem] p-8 border border-gray-100 ${cardShadow} space-y-6`}
          >
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
              Bantuan & Dukungan
            </h4>
            <div className="space-y-4">
              <Link
                href="#"
                id="sidebar-link-faq"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Pusat Bantuan (FAQ)
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                id="sidebar-link-terms"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Syarat & Ketentuan
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
              <Link
                href="#"
                id="sidebar-link-privacy"
                className="flex items-center justify-between group"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a1a1a] transition-colors">
                  Kebijakan Privasi
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF9500] transition-all group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Logout */}
          <button
            id="sidebar-btn-logout"
            type="button"
            className="w-full py-5 bg-red-50 text-red-500 rounded-[1.5rem] font-black text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Keluar Dari Akun
          </button>
        </aside>
      </div>
    </div>
  );
}
