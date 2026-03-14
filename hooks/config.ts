const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

export const API_CONFIG = {
  ENDPOINTS: {
    base: API_BASE_URL,
    // Auth endpoints (Hono backend: /api/auth/*)
    signIn: `${API_BASE_URL}/api/auth/signin`,
    signUp: `${API_BASE_URL}/api/auth/signup`,
    signOut: `${API_BASE_URL}/api/auth/logout`,
    session: `${API_BASE_URL}/api/auth/session`,
    uploadProfilePicture: `${API_BASE_URL}/api/auth/upload-picture`,
    customerProfiles: {
      me: `${API_BASE_URL}/api/customer-profiles/me`,
      checkVerify: `${API_BASE_URL}/api/customer-profiles/me/check-verify`,
      uploadDocument: `${API_BASE_URL}/api/customer-profiles/me/upload-document`,
    },
    customerLocations: {
      base: `${API_BASE_URL}/api/customer-locations`,
      byId: (id: string) => `${API_BASE_URL}/api/customer-locations/${id}`,
    },
    cars: {
      base: `${API_BASE_URL}/api/cars`,
      search: `${API_BASE_URL}/api/cars/search`,
      byId: (id: string) => `${API_BASE_URL}/api/cars/${id}`,
      bySlug: (slug: string) => `${API_BASE_URL}/api/cars/slug/${slug}`,
      images: (carId: string) => `${API_BASE_URL}/api/cars/${carId}/images`,
      imageById: (carId: string, imageId: string) =>
        `${API_BASE_URL}/api/cars/${carId}/images/${imageId}`,
      upload: (carId: string) => `${API_BASE_URL}/api/cars/${carId}/upload`,
    },
    transmissions: {
      base: `${API_BASE_URL}/api/transmissions`,
      byId: (id: string) => `${API_BASE_URL}/api/transmissions/${id}`,
    },
    fuelTypes: {
      base: `${API_BASE_URL}/api/fuel-types`,
      byId: (id: string) => `${API_BASE_URL}/api/fuel-types/${id}`,
    },
    facilities: {
      base: `${API_BASE_URL}/api/facilities`,
      byId: (id: string) => `${API_BASE_URL}/api/facilities/${id}`,
    },
    colors: {
      base: `${API_BASE_URL}/api/colors`,
      byId: (id: string) => `${API_BASE_URL}/api/colors/${id}`,
    },
    bookings: {
      base: `${API_BASE_URL}/api/bookings`,
      byId: (id: string) => `${API_BASE_URL}/api/bookings/${id}`,
    },
    payments: {
      createSnap: (bookingId: string) =>
        `${API_BASE_URL}/api/payments/create-snap/${bookingId}`,
      sync: (paymentId: string) =>
        `${API_BASE_URL}/api/payments/sync/${paymentId}`,
      webhook: `${API_BASE_URL}/api/payments/webhook`,
      byBooking: (bookingId: string) =>
        `${API_BASE_URL}/api/payments/booking/${bookingId}`,
      byId: (id: string) => `${API_BASE_URL}/api/payments/${id}`,
    },
  },
  /** Opsi Lokasi untuk filter pencarian mobil (Quick Search) */
  LOCATION_OPTIONS: [
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-barat", label: "Jakarta Barat" },
    { value: "tangerang", label: "Tangerang" },
    { value: "bekasi", label: "Bekasi" },
  ] as const,
  SECRET: API_SECRET,
};

export function getCarsApiHeaders(
  extra?: Record<string, string>,
): Record<string, string> {
  const headers: Record<string, string> = { ...extra };
  if (API_SECRET) headers["X-API-Secret"] = API_SECRET;
  return headers;
}
