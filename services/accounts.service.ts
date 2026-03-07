"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { API_CONFIG, getCarsApiHeaders } from "@/hooks/config";

const AccountStoreContext = createContext<AccountStoreState | null>(null);

export function AccountStoreProvider({
  children,
  defaultIdType = "ktp",
  defaultIdNumber = "",
}: {
  children: ReactNode;
  defaultIdType?: string;
  defaultIdNumber?: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [uploadingDoc, setUploadingDoc] = useState<DocType | null>(null);
  const [ktpExtractedData, setKtpExtractedData] =
    useState<KtpExtractedData | null>(null);
  const [simExtractedData, setSimExtractedData] =
    useState<KtpExtractedData | null>(null);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const [idTypeState, setIdTypeState] = useState(defaultIdType);
  const [idNumberState, setIdNumberState] = useState(defaultIdNumber);

  const [addingLocation, setAddingLocation] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [pickedLocation, setPickedLocation] = useState<LocationResult | null>(
    null,
  );
  const [newIsDefault, setNewIsDefault] = useState(false);
  const [deletingLocationId, setDeletingLocationId] = useState<string | null>(
    null,
  );

  const resetAddLocationForm = useCallback(() => {
    setAddingLocation(false);
    setPickedLocation(null);
    setNewAddress("");
    setNewLabel("");
    setNewIsDefault(false);
  }, []);

  const value = useMemo<AccountStoreState>(
    () => ({
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
      addingLocation,
      setAddingLocation,
      newLabel,
      setNewLabel,
      newAddress,
      setNewAddress,
      pickedLocation,
      setPickedLocation,
      newIsDefault,
      setNewIsDefault,
      deletingLocationId,
      setDeletingLocationId,
      resetAddLocationForm,
    }),
    [
      step,
      uploadingDoc,
      ktpExtractedData,
      simExtractedData,
      showVerifiedModal,
      idTypeState,
      idNumberState,
      addingLocation,
      newLabel,
      newAddress,
      pickedLocation,
      newIsDefault,
      deletingLocationId,
      resetAddLocationForm,
    ],
  );

  return React.createElement(AccountStoreContext.Provider, { value }, children);
}

export function useAccountStore(): AccountStoreState {
  const ctx = useContext(AccountStoreContext);
  if (!ctx) {
    throw new Error("useAccountStore must be used within AccountStoreProvider");
  }
  return ctx;
}

// --- Query keys ---
export const accountKeys = {
  all: ["account"] as const,
  profile: () => [...accountKeys.all, "profile"] as const,
  locations: () => [...accountKeys.all, "locations"] as const,
};

// --- Fetchers (no Content-Type for FormData) ---
async function jsonFetcher<T>(
  url: string,
  options?: RequestInit & { body?: string | undefined },
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...getCarsApiHeaders(),
      ...(options?.body != null && typeof options.body === "string"
        ? { "Content-Type": "application/json" }
        : {}),
      ...(options?.headers as Record<string, string>),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok)
    throw new Error((data as { error?: string })?.error ?? "Terjadi kesalahan");
  return data as T;
}

export async function getProfile(): Promise<CustomerProfile | null> {
  try {
    return await jsonFetcher<CustomerProfile>(
      API_CONFIG.ENDPOINTS.customerProfiles.me,
    );
  } catch {
    return null;
  }
}

export async function getLocations(): Promise<CustomerLocation[]> {
  try {
    const res = await fetch(API_CONFIG.ENDPOINTS.customerLocations.base, {
      method: "GET",
      credentials: "include",
      headers: getCarsApiHeaders({ "Content-Type": "application/json" }),
    });
    if (!res.ok) return [];
    const json = (await res.json().catch(() => null)) as {
      data?: CustomerLocation[];
    };
    return json?.data ?? [];
  } catch {
    return [];
  }
}

// --- Profile mutations ---
export type UpdateProfilePayload = {
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
};

async function updateProfileApi(
  payload: UpdateProfilePayload,
): Promise<CustomerProfile> {
  return jsonFetcher<CustomerProfile>(
    API_CONFIG.ENDPOINTS.customerProfiles.me,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      queryClient.setQueryData(accountKeys.profile(), data);
    },
  });
}

async function uploadDocumentApi(
  type: DocType,
  file: File,
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  const res = await fetch(
    API_CONFIG.ENDPOINTS.customerProfiles.uploadDocument,
    {
      method: "POST",
      credentials: "include",
      headers: getCarsApiHeaders(),
      body: formData,
    },
  );
  const data = (await res.json().catch(() => null)) as {
    url?: string;
    error?: string;
  };
  if (!res.ok) throw new Error(data?.error ?? "Gagal upload");
  if (!data?.url) throw new Error("URL tidak diterima");
  return { url: data.url };
}

export function useUploadDocumentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, file }: { type: DocType; file: File }) =>
      uploadDocumentApi(type, file),
    onSuccess: (result, { type }) => {
      const field =
        type === "ktp"
          ? "image_ktp"
          : type === "sim_a"
            ? "image_sim_a"
            : "image_selfie_ktp";
      queryClient.setQueryData<CustomerProfile | null>(
        accountKeys.profile(),
        (old) => (old ? { ...old, [field]: result.url } : null),
      );
    },
  });
}

async function checkVerifyApi(): Promise<CustomerProfile | null> {
  try {
    return await jsonFetcher<CustomerProfile | null>(
      API_CONFIG.ENDPOINTS.customerProfiles.checkVerify,
      { method: "POST" },
    );
  } catch {
    return null;
  }
}

export function useCheckVerifyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkVerifyApi,
    onSuccess: (data) => {
      if (data) queryClient.setQueryData(accountKeys.profile(), data);
    },
  });
}

// --- Profile query (client; pass initialData from server) ---
export function useProfileQuery(initialData?: CustomerProfile | null) {
  return useQuery({
    queryKey: accountKeys.profile(),
    queryFn: getProfile,
    initialData: initialData ?? undefined,
    placeholderData: initialData ?? undefined,
  });
}

// --- Locations ---
export type AddLocationPayload = {
  label: string | null;
  address: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
};

async function addLocationApi(
  payload: AddLocationPayload,
): Promise<CustomerLocation> {
  const res = await fetch(API_CONFIG.ENDPOINTS.customerLocations.base, {
    method: "POST",
    credentials: "include",
    headers: getCarsApiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => null)) as CustomerLocation & {
    error?: string;
  };
  if (!res.ok) throw new Error(data?.error ?? "Gagal menyimpan alamat");
  return data;
}

export function useAddLocationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLocationApi,
    onSuccess: (newLoc) => {
      queryClient.setQueryData<CustomerLocation[]>(
        accountKeys.locations(),
        (old) => (old ? [...old, newLoc] : [newLoc]),
      );
    },
  });
}

async function deleteLocationApi(id: string): Promise<void> {
  const res = await fetch(API_CONFIG.ENDPOINTS.customerLocations.byId(id), {
    method: "DELETE",
    credentials: "include",
    headers: getCarsApiHeaders(),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string };
    throw new Error(data?.error ?? "Gagal menghapus");
  }
}

export function useDeleteLocationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLocationApi,
    onSuccess: (_, id) => {
      queryClient.setQueryData<CustomerLocation[]>(
        accountKeys.locations(),
        (old) => (old ? old.filter((loc) => loc.id !== id) : []),
      );
    },
  });
}

export function useLocationsQuery(initialData?: CustomerLocation[]) {
  return useQuery({
    queryKey: accountKeys.locations(),
    queryFn: getLocations,
    initialData: initialData ?? undefined,
    placeholderData: initialData ?? undefined,
  });
}

// --- Profile picture ---
async function uploadProfilePictureApi(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(API_CONFIG.ENDPOINTS.uploadProfilePicture, {
    method: "POST",
    credentials: "include",
    headers: getCarsApiHeaders(),
    body: formData,
  });
  const data = (await res.json().catch(() => null)) as {
    url?: string;
    error?: string;
  };
  if (!res.ok) throw new Error(data?.error ?? "Gagal upload foto");
  return { url: data?.url ?? "" };
}

export function useUploadProfilePictureMutation(options?: {
  onSuccess?: () => void;
}) {
  return useMutation({
    mutationFn: uploadProfilePictureApi,
    onSuccess: options?.onSuccess,
  });
}
