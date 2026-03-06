export function formatIdr(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/** Parse string input (dengan atau tanpa format IDR) ke number. Angka non-digit diabaikan. */
export function parseIdrInput(value: string): number {
  const digits = value.replace(/\D/g, "");
  return digits === "" ? 0 : Number(digits);
}

/** Format nilai untuk ditampilkan di input harga (Rp 1.000.000). Kosong tetap kosong. */
export function formatIdrInput(value: string | number): string {
  if (value === "" || value === undefined || value === null) return "";
  const str = String(value).replace(/\D/g, "");
  if (str === "") return "";
  return `Rp ${Number(str).toLocaleString("id-ID")}`;
}
