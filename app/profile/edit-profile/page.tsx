import type { Metadata } from "next";

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
    <section
      className={`bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 ${cardShadow}`}
    >
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
    </section>
  );
}
