"use client";

import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useCallback } from "react";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Upload,
  UserCog,
  FileImage,
} from "lucide-react";

import { validateCustomerProfile } from "@/hooks/validations";

import { validateDocumentWithOcr } from "@/lib/ocr-validate";

import { toast } from "sonner";

import ProfileLocationsClient from "@/components/profile/ProfileLocationsClient";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadDocumentMutation,
  useCheckVerifyMutation,
  useLocationsQuery,
  useAccountStore,
} from "@/services/accounts.service";

import {
  normalizeNameForCompare,
  normalizeIdNumber,
} from "@/components/ui/profile/EditProfileHelper";

export default function EditProfileForm({
  user,
  profile,
  initialLocations,
  formInputClass,
  cardShadow,
}: EditProfileFormProps) {
  const router = useRouter();
  const profileQuery = useProfileQuery(profile ?? undefined);
  const locationsQuery = useLocationsQuery(initialLocations);
  const updateProfile = useUpdateProfileMutation();
  const uploadDocumentMutation = useUploadDocumentMutation();
  const checkVerifyMutation = useCheckVerifyMutation();

  const locations = locationsQuery.data ?? initialLocations;

  const profileData = profileQuery.data ?? profile;
  const imageKtp = profileData?.image_ktp ?? null;
  const imageSimA = profileData?.image_sim_a ?? null;
  const imageSelfieKtp = profileData?.image_selfie_ktp ?? null;

  const store = useAccountStore();
  const {
    step,
    setStep,
    uploadingDoc,
    setUploadingDoc,
    ktpExtractedData,
    setKtpExtractedData,
    simExtractedData,
    setSimExtractedData,
    showVerifiedModal,
    setShowVerifiedModal,
    idTypeState,
    setIdTypeState,
    idNumberState,
    setIdNumberState,
  } = store;

  const fullName = profileData?.full_name ?? user.name ?? "";
  const email = profileData?.email ?? user.email ?? "";
  const phone = (profileData?.phone ?? user.phone ?? "").replace(/^\+62/, "");
  const birthDate = profileData?.birth_date ?? "";
  const gender = profileData?.gender ?? "male";

  useEffect(() => {
    if (idTypeState === "ktp" && ktpExtractedData?.id_number) {
      setIdNumberState(ktpExtractedData.id_number);
    } else if (idTypeState === "sim_a" && simExtractedData?.id_number) {
      setIdNumberState(simExtractedData.id_number);
    }
  }, [
    idTypeState,
    ktpExtractedData?.id_number,
    simExtractedData?.id_number,
    setIdNumberState,
  ]);

  const handleDocChange = async (
    type: DocType,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Format tidak didukung. Gunakan JPEG, PNG, atau WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }
    setUploadingDoc(type);
    const toastId = toast.loading(
      type === "selfie_ktp"
        ? "Memvalidasi selfie dan dokumen..."
        : "Memvalidasi dokumen dengan OCR...",
    );
    try {
      const ocrResult = await validateDocumentWithOcr(file, type);
      toast.dismiss(toastId);
      if (!ocrResult.valid) {
        toast.error(ocrResult.message ?? "Dokumen tidak valid");
        return;
      }
      await uploadDocumentMutation.mutateAsync({ type, file });
      if (type === "ktp" && ocrResult.ktpData) {
        setKtpExtractedData(ocrResult.ktpData);
        if (ocrResult.ktpData.id_number) {
          setIdNumberState(ocrResult.ktpData.id_number);
          setIdTypeState("ktp");
        }
      } else if (type === "sim_a" && ocrResult.simData) {
        setSimExtractedData(ocrResult.simData);
        if (ocrResult.simData.id_number) {
          setIdNumberState(ocrResult.simData.id_number);
          setIdTypeState("sim_a");
        }
      }
      toast.success("Gambar berhasil divalidasi dan diupload");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err instanceof Error ? err.message : "Gagal upload");
    } finally {
      setUploadingDoc(null);
      e.target.value = "";
    }
  };

  const saveProfilePayload = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const full_name = (formData.get("full_name") as string)?.trim() ?? "";
    const emailVal = (formData.get("email") as string)?.trim() ?? "";
    const phoneRaw = (formData.get("phone") as string)?.trim() ?? "";
    const birth_date = (formData.get("birth_date") as string)?.trim() || null;
    const genderVal = formData.get("gender") as string;
    const id_type = (formData.get("id_type") as string)?.trim() || "ktp";
    const id_number = (formData.get("id_number") as string)?.trim() || null;

    const validation = validateCustomerProfile({
      full_name,
      email: emailVal || null,
      phone: phoneRaw.startsWith("62")
        ? phoneRaw
        : `62${phoneRaw.replace(/^0/, "")}`,
      birth_date: birth_date || null,
      gender: genderVal === "male" || genderVal === "female" ? genderVal : null,
      id_type,
      id_number,
      image_ktp: imageKtp || null,
      image_sim_a: imageSimA || null,
      image_selfie_ktp: imageSelfieKtp || null,
    });

    if (!validation.success) {
      toast.error(validation.errors[0] ?? "Data tidak valid");
      return null;
    }

    // Cek kesesuaian dengan data KTP (nama dinormalisasi agar toleran ke ejaan/OCR)
    if (ktpExtractedData && imageKtp) {
      const formName = normalizeNameForCompare(validation.data.full_name);
      const ktpName = normalizeNameForCompare(ktpExtractedData.full_name ?? "");
      const formBirth = (validation.data.birth_date ?? "").trim();
      const ktpBirth = (ktpExtractedData.birth_date ?? "").trim();
      const formGender = validation.data.gender ?? null;
      const ktpGender = ktpExtractedData.gender ?? null;

      const mismatches: string[] = [];
      if (ktpName && formName && formName !== ktpName) {
        mismatches.push("Nama Lengkap");
      }
      if (ktpBirth && formBirth && formBirth !== ktpBirth) {
        mismatches.push("Tanggal Lahir");
      }
      if (ktpGender != null && formGender != null && formGender !== ktpGender) {
        mismatches.push("Jenis Kelamin");
      }
      if (mismatches.length > 0) {
        toast.error(
          `${mismatches.join(", ")} harus sesuai dengan data di KTP. Silakan periksa kembali.`,
        );
        return null;
      }
    }

    // Nomor Identitas harus sama dengan yang terbaca di foto sesuai Tipe Identitas
    // Hanya validasi jika ada data OCR dari upload baru (ktpExtractedData/simExtractedData).
    // Jika tidak ada (user tidak re-upload, data dari DB), skip validasi OCR - data sudah ada & terverifikasi.
    const formIdNumber = normalizeIdNumber(validation.data.id_number);
    if (id_type === "ktp") {
      if (!imageKtp) {
        toast.error("Upload foto KTP terlebih dahulu.");
        return null;
      }
      if (ktpExtractedData && ktpExtractedData.id_number) {
        const ocrNik = ktpExtractedData.id_number.replace(/\D/g, "");
        if (ocrNik && normalizeIdNumber(ocrNik) !== formIdNumber) {
          toast.error(
            "Nomor identitas (NIK) tidak sama dengan yang tertera di foto KTP. Periksa kembali.",
          );
          return null;
        }
      }
    } else if (id_type === "sim_a") {
      if (!imageSimA) {
        toast.error("Upload foto SIM A terlebih dahulu.");
        return null;
      }
      if (simExtractedData && simExtractedData.id_number) {
        const ocrSimNo = simExtractedData.id_number.replace(/\D/g, "");
        if (ocrSimNo && normalizeIdNumber(ocrSimNo) !== formIdNumber) {
          toast.error(
            "Nomor identitas (SIM) tidak sama dengan yang tertera di foto SIM A. Periksa kembali.",
          );
          return null;
        }
      }
    }
    // passport: tidak ada validasi cocok dengan foto (format beragam)

    return validation.data;
  };

  const checkVerifyAndShowModal = useCallback(async () => {
    try {
      const data = await checkVerifyMutation.mutateAsync();
      if (data?.is_verified && data?.verified_at) setShowVerifiedModal(true);
    } catch {
      // ignore
    }
  }, [checkVerifyMutation, setShowVerifiedModal]);

  useEffect(() => {
    if (step === 2 && locations.length >= 1 && !profileData?.is_verified) {
      checkVerifyAndShowModal();
    }
  }, [
    step,
    locations.length,
    profileData?.is_verified,
    checkVerifyAndShowModal,
  ]);

  const handleLanjut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = saveProfilePayload(form);
    if (!payload) return;

    try {
      await updateProfile.mutateAsync({
        full_name: payload.full_name,
        email: payload.email ?? null,
        phone: payload.phone,
        birth_date: payload.birth_date ?? null,
        gender: payload.gender ?? null,
        id_type: payload.id_type,
        id_number: payload.id_number ?? null,
        image_ktp: imageKtp || null,
        image_sim_a: imageSimA || null,
        image_selfie_ktp: imageSelfieKtp || null,
      });
      toast.success("Profil disimpan. Sekarang isi alamat & lokasi.");
      setStep(2);
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Gagal menyimpan profil",
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black flex items-center gap-3">
          {step === 1 ? (
            <>
              <UserCog className="w-6 h-6 text-[#FF9500]" />
              Informasi Personal
            </>
          ) : (
            <>
              <MapPin className="w-6 h-6 text-[#FF9500]" />
              Alamat & Lokasi
            </>
          )}
        </h3>
        <p className="text-xs font-bold text-gray-400">Langkah {step} dari 2</p>
      </div>

      {step === 1 ? (
        <form className="space-y-8" onSubmit={handleLanjut}>
          {imageKtp && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 font-medium">
              Nama Lengkap, Tanggal Lahir, dan Jenis Kelamin harus sesuai dengan
              data di KTP yang diupload.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="full_name"
                defaultValue={fullName}
                className={formInputClass}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={email}
                className={formInputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Nomor WhatsApp
              </label>
              <div className="flex items-center gap-2">
                <div className="px-5 py-4 bg-gray-100 rounded-2xl font-black text-gray-400">
                  +62
                </div>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={phone}
                  placeholder="81234567890"
                  className={`${formInputClass} flex-1`}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="birth_date"
                defaultValue={birthDate}
                className={formInputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
              Jenis Kelamin
            </label>
            <div className="flex gap-8 mt-2">
              <label className="flex items-center gap-3 cursor-pointer font-bold group">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#FF9500] transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked={gender === "male"}
                    className="peer absolute opacity-0 cursor-pointer"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#FF9500] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                Laki-laki
              </label>
              <label className="flex items-center gap-3 cursor-pointer font-bold group">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#FF9500] transition-colors">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    defaultChecked={gender === "female"}
                    className="peer absolute opacity-0 cursor-pointer"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#FF9500] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                Perempuan
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Tipe Identitas (ID)
              </label>
              <div className="relative">
                <select
                  name="id_type"
                  value={idTypeState}
                  onChange={(e) => {
                    const v = e.target.value;
                    setIdTypeState(v);
                    if (v === "ktp" && ktpExtractedData?.id_number) {
                      setIdNumberState(ktpExtractedData.id_number);
                    } else if (v === "sim_a" && simExtractedData?.id_number) {
                      setIdNumberState(simExtractedData.id_number);
                    }
                  }}
                  className={`${formInputClass} appearance-none cursor-pointer pr-12`}
                >
                  {ID_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                Nomor Identitas
              </label>
              <input
                type="text"
                name="id_number"
                value={idNumberState}
                onChange={(e) => setIdNumberState(e.target.value)}
                className={formInputClass}
                required
                placeholder={
                  idTypeState === "ktp"
                    ? "Nomor KTP (NIK)"
                    : idTypeState === "sim_a"
                      ? "Nomor SIM"
                      : "Nomor KTP / Passport / SIM"
                }
              />
            </div>
          </div>

          {/* Upload dokumen verifikasi: KTP, SIM A, Selfie + KTP */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
              Dokumen Verifikasi
            </h4>
            <p className="text-sm text-gray-500 -mt-2">
              Upload foto KTP, SIM A (jika pakai SIM), dan selfie memegang KTP
              untuk keperluan verifikasi.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Foto KTP
                </label>
                <div
                  className={`rounded-2xl border border-gray-100 overflow-hidden bg-gray-50/50 min-h-[140px] flex flex-col items-center justify-center ${cardShadow}`}
                >
                  {imageKtp ? (
                    <div className="relative w-full h-36">
                      <Image
                        src={imageKtp}
                        alt="KTP"
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="200px"
                      />
                    </div>
                  ) : (
                    <FileImage className="w-12 h-12 text-gray-300 mb-2" />
                  )}
                  <label className="p-3 cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-[#FF9500] hover:text-[#E68600] disabled:opacity-50">
                    <Upload className="w-4 h-4" />
                    {uploadingDoc === "ktp"
                      ? "Mengupload..."
                      : imageKtp
                        ? "Ganti"
                        : "Upload"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleDocChange("ktp", e)}
                      disabled={uploadingDoc !== null}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Foto SIM A
                </label>
                <div
                  className={`rounded-2xl border border-gray-100 overflow-hidden bg-gray-50/50 min-h-[140px] flex flex-col items-center justify-center ${cardShadow}`}
                >
                  {imageSimA ? (
                    <div className="relative w-full h-36">
                      <Image
                        src={imageSimA}
                        alt="SIM A"
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="200px"
                      />
                    </div>
                  ) : (
                    <FileImage className="w-12 h-12 text-gray-300 mb-2" />
                  )}
                  <label className="p-3 cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-[#FF9500] hover:text-[#E68600] disabled:opacity-50">
                    <Upload className="w-4 h-4" />
                    {uploadingDoc === "sim_a"
                      ? "Mengupload..."
                      : imageSimA
                        ? "Ganti"
                        : "Upload"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleDocChange("sim_a", e)}
                      disabled={uploadingDoc !== null}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Selfie + KTP
                </label>
                <div
                  className={`rounded-2xl border border-gray-100 overflow-hidden bg-gray-50/50 min-h-[140px] flex flex-col items-center justify-center ${cardShadow}`}
                >
                  {imageSelfieKtp ? (
                    <div className="relative w-full h-36">
                      <Image
                        src={imageSelfieKtp}
                        alt="Selfie dengan KTP"
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="200px"
                      />
                    </div>
                  ) : (
                    <FileImage className="w-12 h-12 text-gray-300 mb-2" />
                  )}
                  <label className="p-3 cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-[#FF9500] hover:text-[#E68600] disabled:opacity-50">
                    <Upload className="w-4 h-4" />
                    {uploadingDoc === "selfie_ktp"
                      ? "Mengupload..."
                      : imageSelfieKtp
                        ? "Ganti"
                        : "Upload"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleDocChange("selfie_ktp", e)}
                      disabled={uploadingDoc !== null}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <button
              id="btn-lanjut-alamat"
              type="submit"
              disabled={updateProfile.isPending}
              className="px-10 py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  Lanjut ke Alamat
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
            <Link
              href="/profile"
              id="btn-cancel-profile-form"
              className="px-10 py-5 bg-white text-gray-400 rounded-2xl font-black text-sm hover:text-gray-600 border border-transparent hover:border-gray-100 transition-all text-center"
            >
              Batalkan
            </Link>
          </div>
        </form>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">
            Tambah alamat untuk pickup atau pengantaran. Cari alamat di peta
            lalu simpan.
          </p>
          <div id="alamat">
            <ProfileLocationsClient
              initialLocations={locations}
              cardShadow={cardShadow}
              onLocationAdded={checkVerifyAndShowModal}
            />
          </div>
          <div className="pt-10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-10 py-5 bg-white text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-50 border border-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Informasi Personal
            </button>
          </div>
        </>
      )}

      <Dialog open={showVerifiedModal} onOpenChange={setShowVerifiedModal}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle className="text-xl">
              Akun Anda telah tervifikasi
            </DialogTitle>
            <DialogDescription>
              Silakan pilih rental mana yang ingin Anda ambil.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              asChild
              className="bg-[#FF9500] hover:bg-[#E68600] text-white font-bold"
            >
              <Link
                href="/daftar-mobil"
                onClick={() => setShowVerifiedModal(false)}
              >
                Lihat Daftar Mobil
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowVerifiedModal(false)}
            >
              Tetap di sini
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
