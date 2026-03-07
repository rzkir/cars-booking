"use client";

import Image from "next/image";

import { useRef } from "react";

import { Camera, Loader2, User } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useUploadProfilePictureMutation } from "@/services/accounts.service";

export default function ProfilePictureUpload({ user }: { user: Accounts }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refreshUserData } = useAuth();
  const router = useRouter();
  const uploadPicture = useUploadProfilePictureMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    try {
      await uploadPicture.mutateAsync(file);
      toast.success("Foto profil berhasil diperbarui");
      await refreshUserData();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal upload foto");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-50 shadow-xl bg-gray-100">
        {user?.picture ? (
          <Image
            src={user.picture}
            alt={user.name || "Avatar pengguna"}
            width={128}
            height={128}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploadPicture.isPending}
      />
      <button
        id="btn-change-avatar-main"
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadPicture.isPending}
        className="absolute bottom-0 right-0 w-10 h-10 bg-[#FF9500] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:bg-[#E68600] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label="Ubah foto profil"
      >
        {uploadPicture.isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Camera className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
