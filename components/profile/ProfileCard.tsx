import { CheckCircle, MapPin, Pencil } from "lucide-react";

import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

function getMembershipLabel(isVerified: boolean | null | undefined): string {
  if (isVerified === true) return "Terverifikasi";
  if (isVerified === false) return "Belum terverifikasi";
  return "Member";
}

function formatJoinedDate(createdAt: string | null | undefined): string {
  if (!createdAt) return "-";
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return "-";
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ProfileCard({
  user,
  variant = "default",
  isVerified,
}: {
  user: Accounts;
  variant?: "default" | "edit";
  isVerified?: boolean | null;
}) {
  const membershipLabel = getMembershipLabel(isVerified);

  return (
    <section
      aria-labelledby="profile-summary-heading"
      className={`bg-white rounded-[2.5rem] p-8 md:p-12 mb-10 border border-gray-100 ${cardShadow}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ProfilePictureUpload user={user} />
          <div className="text-center md:text-left space-y-2">
            <h1
              id="profile-summary-heading"
              className="text-3xl font-black tracking-tight"
            >
              {user.name || "Pengguna DriveEase"}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
              <span className="px-4 py-1.5 bg-[#1a1a1a] text-[#FF9500] text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                {isVerified === true && (
                  <CheckCircle className="w-3 h-3 text-[#FF9500]" />
                )}
                {membershipLabel}
              </span>
              <span className="text-sm text-gray-400 font-bold flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#FF9500]" />
                Jakarta Selatan, Indonesia
              </span>
            </div>
          </div>
        </div>
        {variant === "edit" ? (
          <div className="hidden md:flex flex-col items-end">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
              Terdaftar Sejak
            </p>
            <p className="font-black">{formatJoinedDate(user.created_at)}</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <a
              href="/profile/edit-profile"
              id="btn-edit-general"
              className="px-8 py-4 bg-gray-50 text-[#1a1a1a] rounded-2xl font-black text-sm hover:bg-gray-100 transition-all border border-gray-100 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profil
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
