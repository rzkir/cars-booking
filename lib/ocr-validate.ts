function normalizeForMatch(text: string): string {
  return text.toUpperCase().replace(/\s+/g, " ").trim();
}

function extractKtpData(text: string): KtpExtractedData {
  const result: KtpExtractedData = {};
  const upper = text.toUpperCase().replace(/\s+/g, " ");
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Nama: cari baris yang berisi "NAMA" lalu ambil teks setelahnya (atau baris berikutnya)
  const namaIdx = lines.findIndex(
    (l) =>
      normalizeForMatch(l).includes("NAMA") &&
      !normalizeForMatch(l).includes("NAMA LENGKAP"),
  );
  if (namaIdx >= 0) {
    const line = lines[namaIdx];
    const afterNama = line.replace(/^.*?nama\s*[:\s]*/i, "").trim();
    const name = afterNama || (lines[namaIdx + 1] ?? "").trim();
    if (name && name.length > 2 && !/^\d+$/.test(name)) {
      result.full_name = name.replace(/\s+/g, " ").trim();
    }
  }

  // Tanggal lahir: DD-MM-YYYY atau DD/MM/YYYY
  const dateMatch = text.match(/(\d{2})[-/](\d{2})[-/](\d{4})/);
  if (dateMatch) {
    const [, d, m, y] = dateMatch;
    result.birth_date = `${y}-${m}-${d}`;
  }

  // Jenis kelamin: KTP pakai LAKI-LAKI/PEREMPUAN, KTP-el & SIM pakai PRIA/WANITA
  if (/\bLAKI[- ]?LAKI\b/.test(upper) || /\bPRIA\b/.test(upper))
    result.gender = "male";
  else if (/\bPEREMPUAN\b/.test(upper) || /\bWANITA\b/.test(upper))
    result.gender = "female";

  // NIK: 16 digit. KTP-el kadang tampil dengan spasi (contoh: "0004844330122 001000")
  const nikLabelMatch = text.match(/NIK\s*:?\s*([\d\s]{16,22})/i);
  if (nikLabelMatch) {
    const digits = nikLabelMatch[1].replace(/\D/g, "");
    if (digits.length >= 16) result.id_number = digits.slice(0, 16);
  }
  if (!result.id_number) {
    const exact16 = text.match(/\b(\d{16})\b/);
    if (exact16) result.id_number = exact16[1];
  }
  // Fallback: cari urutan 16 digit di mana saja (OCR kadang pisah NIK dari label)
  if (!result.id_number) {
    const match = text.replace(/\D/g, "").match(/(\d{16})/);
    if (match) result.id_number = match[1];
  }

  return result;
}

function extractSimData(text: string): KtpExtractedData {
  const result = extractKtpData(text);
  // Overwrite id_number dengan nomor SIM (bukan NIK dari extractKtpData)
  result.id_number = undefined;
  // Pola "No. SIM", "No. SÍM", "NOMOR SIM" + opsional ): atau : + spasi + angka (8–15 digit)
  const simNoMatch =
    text.match(
      /(?:NO\.?\s*S[IÍ]M|NOMOR\s*S[IÍ]M?)\s*\)?\s*:?\s*(\d{8,15})\b/i,
    ) ??
    text.match(/\bNO\.?\s*\)?\s*:?\s*(\d{8,15})\b/i) ??
    text.match(/(?:NO\.?\s*SIM|NOMOR\s*SIM?)\s*:?\s*(\d{8,15})\b/i) ??
    // "SIM" diikuti (baris baru/spasi) lalu angka
    text.match(/S[IÍ]M[\s):]*(\d{8,15})\b/i);
  if (simNoMatch) result.id_number = simNoMatch[1];
  // Fallback: di dokumen SIM, angka panjang 10–15 digit (bukan 16 digit NIK) biasanya nomor SIM
  if (!result.id_number) {
    const longDigits = text.match(/\b(\d{10,15})\b/g);
    if (longDigits?.length) {
      const notNik = longDigits.find((s) => s.length !== 16);
      if (notNik) result.id_number = notNik;
    }
  }
  return result;
}

const FACE_API_MODEL_URL =
  "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/model";

async function detectFaceWithFaceApi(file: File): Promise<boolean> {
  try {
    const faceapi = await import("@vladmandic/face-api");
    const url = URL.createObjectURL(file);
    let img: HTMLImageElement;
    try {
      img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Gagal memuat gambar"));
        image.src = url;
      });
    } finally {
      URL.revokeObjectURL(url);
    }
    if (!faceapi.nets.tinyFaceDetector.isLoaded) {
      await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_URL);
    }
    const opts = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224,
      scoreThreshold: 0.5,
    });
    const detections = await faceapi.detectAllFaces(img, opts);
    return Array.isArray(detections) && detections.length > 0;
  } catch {
    return false;
  }
}

/** Hasil deteksi wajah: supported = browser mendukung, hasFace = wajah terdeteksi */
async function detectFaceInImageFile(
  file: File,
): Promise<{ supported: boolean; hasFace: boolean }> {
  if (typeof window === "undefined")
    return { supported: false, hasFace: false };

  // 1. Coba Face Detector API (Chrome/Edge)
  const FaceDetector = (
    window as unknown as {
      FaceDetector?: new () => {
        detect: (src: HTMLImageElement | ImageBitmap) => Promise<unknown[]>;
      };
    }
  ).FaceDetector;
  if (FaceDetector) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Gagal memuat gambar"));
        image.src = url;
      });
      const detector = new FaceDetector();
      const faces = await detector.detect(img);
      return {
        supported: true,
        hasFace: Array.isArray(faces) && faces.length > 0,
      };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // 2. Fallback: face-api.js (Firefox, Safari, dll.)
  const hasFace = await detectFaceWithFaceApi(file);
  return { supported: true, hasFace };
}

function hasAnyKeyword(
  text: string,
  keywords: string[],
  minCount = 1,
): boolean {
  const upper = normalizeForMatch(text);
  const found = keywords.filter((kw) => upper.includes(normalizeForMatch(kw)));
  return found.length >= minCount;
}

export async function validateDocumentWithOcr(
  file: File,
  type: DocTypeOcr,
): Promise<ValidateDocumentResult> {
  if (typeof window === "undefined") {
    return { valid: false, message: "Validasi OCR hanya tersedia di browser." };
  }

  // Selfie+KTP: wajib ada wajah di foto (bukan hanya foto KTP)
  if (type === "selfie_ktp") {
    const faceResult = await detectFaceInImageFile(file);
    if (!faceResult.supported) {
      return {
        valid: false,
        message:
          "Validasi selfie memerlukan browser yang mendukung deteksi wajah (Chrome atau Edge).",
      };
    }
    if (!faceResult.hasFace) {
      return {
        valid: false,
        message:
          "Foto harus menunjukkan wajah Anda sambil memegang KTP, bukan hanya foto KTP saja.",
      };
    }
  }

  try {
    const Tesseract = (await import("tesseract.js")).default;
    const worker = await Tesseract.createWorker("ind", 1);

    try {
      const { data } = await worker.recognize(file);
      const text = (data?.text ?? "").trim();

      if (!text || text.length < 15) {
        return {
          valid: false,
          message:
            "Teks dari gambar tidak terbaca. Pastikan dokumen jelas, tidak blur, dan cukup terang.",
        };
      }

      switch (type) {
        case "ktp": {
          if (!hasAnyKeyword(text, KTP_KEYWORDS, 2)) {
            return {
              valid: false,
              message:
                "Foto bukan KTP yang valid. Pastikan seluruh KTP terlihat jelas (NIK, nama, alamat).",
            };
          }
          const ktpData = extractKtpData(text);
          return {
            valid: true,
            ktpData: Object.keys(ktpData).length > 0 ? ktpData : undefined,
          };
        }
        case "sim_a": {
          if (!hasAnyKeyword(text, SIM_KEYWORDS)) {
            return {
              valid: false,
              message:
                "Foto bukan SIM A yang valid. Pastikan SIM terlihat jelas dan terbaca.",
            };
          }
          const simData = extractSimData(text);
          return {
            valid: true,
            simData: Object.keys(simData).length > 0 ? simData : undefined,
          };
        }
        case "selfie_ktp":
          if (!hasAnyKeyword(text, SELFIE_KTP_KEYWORDS)) {
            return {
              valid: false,
              message:
                "Selfie harus memegang KTP yang terlihat. Pastikan KTP dalam foto terbaca.",
            };
          }
          return { valid: true };
        default:
          return { valid: false, message: "Tipe dokumen tidak valid" };
      }
    } finally {
      try {
        await worker.terminate();
      } catch {
        // ignore
      }
    }
  } catch (err) {
    console.error("OCR validation error:", err);
    return {
      valid: false,
      message:
        err instanceof Error
          ? err.message
          : "Gagal memvalidasi gambar. Coba lagi.",
    };
  }
}
