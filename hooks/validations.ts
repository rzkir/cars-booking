import { z } from "zod";

// --- Nomor telepon: normalisasi ke format 62xxxxxxxxxx ---
const phoneRawSchema = z
  .string()
  .min(1, "Nomor telepon wajib")
  .transform((val) => val.trim().replace(/^\+62/, "").replace(/^0/, ""))
  .refine((val) => val.length >= 9, "Nomor telepon tidak valid")
  .refine((val) => /^[0-9]+$/.test(val), "Nomor telepon hanya boleh angka")
  .transform((val) => (val.startsWith("62") ? val : `62${val}`));

// --- Profil customer (edit profile form) ---
export const customerProfileSchema = z.object({
  full_name: z
    .string()
    .min(1, "Nama lengkap wajib")
    .max(200, "Nama maksimal 200 karakter")
    .transform((s) => s.trim()),
  email: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((s) => (s === "" || s == null ? null : s))
    .refine(
      (s) => s === null || s === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
      "Format email tidak valid"
    ),
  phone: phoneRawSchema,
  birth_date: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((s) => (s === "" || s == null ? null : s)),
  gender: z
    .enum(["male", "female"], { message: "Pilih jenis kelamin" })
    .optional()
    .nullable(),
  id_type: z
    .enum(["ktp", "passport", "sim_a"], { message: "Tipe identitas wajib dipilih" }),
  id_number: z.preprocess(
    (v) => (v == null ? "" : String(v).trim()),
    z.string().min(1, "Nomor identitas wajib diisi").max(50, "Nomor identitas maksimal 50 karakter")
  ),
  image_ktp: z.preprocess(
    (v) => (v == null || v === "" ? "" : v),
    z.string().min(1, "Foto KTP wajib diupload").url("Foto KTP wajib diupload")
  ),
  image_sim_a: z.preprocess(
    (v) => (v == null || v === "" ? "" : v),
    z.string().min(1, "Foto SIM A wajib diupload").url("Foto SIM A wajib diupload")
  ),
  image_selfie_ktp: z.preprocess(
    (v) => (v == null || v === "" ? "" : v),
    z.string().min(1, "Selfie dengan KTP wajib diupload").url("Selfie dengan KTP wajib diupload")
  ),
});

export type CustomerProfileInput = z.input<typeof customerProfileSchema>;
export type CustomerProfilePayload = z.output<typeof customerProfileSchema>;

/** Validasi payload form edit profil. Mengembalikan { success: true, data } atau { success: false, errors: string[] } */
export function validateCustomerProfile(
  raw: Record<string, unknown>
): { success: true; data: CustomerProfilePayload } | { success: false; errors: string[] } {
  const result = customerProfileSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.flatten().fieldErrors;
  const messages = Object.values(errors).flat().filter((m): m is string => typeof m === "string");
  return { success: false, errors: messages };
}
