"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

import { MapPin, Plus, Trash2, Star, Loader2, X } from "lucide-react";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

import { toast } from "sonner";

const LocationPickerComponent = dynamic(
  () => import("@/components/profile/LocationPicker"),
  { ssr: false },
);

export default function ProfileLocationsClient({
  initialLocations,
  cardShadow,
  onLocationAdded,
}: ProfileLocationsClientProps) {
  const router = useRouter();
  const [locations, setLocations] =
    useState<CustomerLocation[]>(initialLocations);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [newLabel, setNewLabel] = useState("");
  const [newIsDefault, setNewIsDefault] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<LocationResult | null>(
    null,
  );
  /** Alamat yang disinkronkan dengan lokasi peta; bisa diedit di textarea */
  const [newAddress, setNewAddress] = useState("");

  const handleSelectLocation = (result: LocationResult) => {
    setPickedLocation(result);
    setNewAddress(result.address);
  };

  const handleSaveNew = async () => {
    if (!pickedLocation) {
      toast.error("Pilih lokasi dari peta (cari lalu klik hasil)");
      return;
    }
    if (!newAddress.trim()) {
      toast.error("Isi alamat di textarea atau pilih dari peta");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(API_CONFIG.ENDPOINTS.customerLocations.base, {
        method: "POST",
        credentials: "include",
        headers: {
          ...getCarsApiHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: newLabel.trim() || null,
          address: (newAddress.trim() || pickedLocation.address).trim(),
          latitude: pickedLocation.latitude,
          longitude: pickedLocation.longitude,
          is_default: newIsDefault,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } & CustomerLocation;

      if (!res.ok) {
        throw new Error(data?.error ?? "Gagal menyimpan alamat");
      }

      const addressToSave = newAddress.trim() || pickedLocation.address;
      toast.success("Alamat berhasil ditambahkan");
      setAdding(false);
      setPickedLocation(null);
      setNewAddress("");
      setNewLabel("");
      setNewIsDefault(false);
      router.refresh();
      if (data.id) {
        setLocations((prev) => [
          ...prev,
          {
            id: data.id,
            customer_id: data.customer_id,
            label: newLabel.trim() || null,
            address: addressToSave,
            latitude: pickedLocation.latitude,
            longitude: pickedLocation.longitude,
            is_default: newIsDefault,
            created_at: data.created_at ?? new Date().toISOString(),
            updated_at: data.updated_at ?? new Date().toISOString(),
          },
        ]);
        onLocationAdded?.();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(API_CONFIG.ENDPOINTS.customerLocations.byId(id), {
        method: "DELETE",
        credentials: "include",
        headers: getCarsApiHeaders(),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string };
        throw new Error(data?.error ?? "Gagal menghapus");
      }

      toast.success("Alamat dihapus");
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        {!adding ? (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF9500] text-white rounded-xl font-bold text-sm hover:bg-[#E68600] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Alamat
          </button>
        ) : null}
      </div>

      {adding && (
        <div
          className={`rounded-2xl p-6 border border-gray-200 bg-gray-50/50 ${cardShadow}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-900">Tambah alamat baru</h3>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setPickedLocation(null);
                setNewAddress("");
                setNewLabel("");
                setNewIsDefault(false);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            Cari alamat di kotak pencarian peta, lalu pilih hasil. Alamat akan
            terisi otomatis dan bisa diedit di bawah.
          </p>

          <div className="mb-4">
            <LocationPickerComponent
              onSelect={handleSelectLocation}
              searchLabel="Cari alamat..."
              height="280px"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Alamat (sinkron dengan peta)
            </label>
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Pilih lokasi di peta atau ketik alamat..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#FF9500] resize-y min-h-[80px] text-sm"
            />
            {pickedLocation && (
              <p className="text-xs text-gray-500 mt-1">
                Koordinat: {pickedLocation.latitude.toFixed(5)},{" "}
                {pickedLocation.longitude.toFixed(5)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Label (opsional)
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Rumah, Kantor, dll."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#FF9500]"
              />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input
                type="checkbox"
                id="new-default"
                checked={newIsDefault}
                onChange={(e) => setNewIsDefault(e.target.checked)}
                className="rounded border-gray-300 text-[#FF9500] focus:ring-[#FF9500]"
              />
              <label
                htmlFor="new-default"
                className="text-sm font-medium text-gray-700"
              >
                Jadikan alamat utama
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveNew}
              disabled={saving || !pickedLocation || !newAddress.trim()}
              className="px-5 py-3 bg-[#1a1a1a] text-white rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Simpan Alamat
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setPickedLocation(null);
                setNewAddress("");
                setNewLabel("");
                setNewIsDefault(false);
              }}
              className="px-5 py-3 bg-white text-gray-600 rounded-xl font-bold text-sm border border-gray-200"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {locations.length === 0 && !adding ? (
          <p className="text-gray-500 text-sm">
            Belum ada alamat. Klik &quot;Tambah Alamat&quot; dan cari lokasi di
            peta.
          </p>
        ) : (
          locations.map((loc) => (
            <div
              key={loc.id}
              className={`flex flex-wrap items-start justify-between gap-4 p-5 rounded-2xl border ${cardShadow}`}
            >
              <div className="flex gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF9500]" />
                </div>
                <div className="min-w-0">
                  {loc.label && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">
                        {loc.label}
                      </span>
                      {loc.is_default && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FF9500]/10 text-[#FF9500] text-xs font-bold">
                          <Star className="w-3.5 h-3.5" />
                          Utama
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 wrap-break-word">
                    {loc.address}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(loc.id)}
                disabled={deletingId === loc.id}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                aria-label="Hapus alamat"
              >
                {deletingId === loc.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
