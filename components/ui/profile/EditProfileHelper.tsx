export function normalizeNameForCompare(s: string): string {
  return (s ?? "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^A-Z\s\-']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeIdNumber(s: string | null | undefined): string {
  return (s ?? "").replace(/\D/g, "");
}
