import { getCarsApiHeaders } from "./config";

interface ApiFetchOptions {
  revalidate?: number;
  tags?: string[];
  headers?: Record<string, string>;
}

export async function apiFetch<T>(
  url: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  try {
    const fetchOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...getCarsApiHeaders(options.headers),
      },
      next: {
        revalidate: options.revalidate,
        tags: options.tags,
      },
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
