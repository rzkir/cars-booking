const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

export const API_CONFIG = {
  ENDPOINTS: {
    base: API_BASE_URL,
    // Auth endpoints (Hono backend: /api/auth/*)
    signIn: `${API_BASE_URL}/api/auth/signin`,
    signUp: `${API_BASE_URL}/api/auth/signup`,
    signOut: `${API_BASE_URL}/api/auth/logout`,
    session: `${API_BASE_URL}/api/auth/session`,
    articles: {
      base: `${API_BASE_URL}/api/articles`,
      categories: `${API_BASE_URL}/api/articles/categories`,
      tags: `${API_BASE_URL}/api/articles/tags`,
      byId: (id: string) => `${API_BASE_URL}/api/articles?id=${id}`,
      byArticlesId: (articlesId: string) =>
        `${API_BASE_URL}/api/articles/${articlesId}`,
      byCategory: (
        categoryId: string,
        page: number = 1,
        limit: number = 10,
        sort: string = "newest",
      ) =>
        `${API_BASE_URL}/api/articles/categories/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`,
    },
    checkout: `${API_BASE_URL}/api/checkout`,
    ratings: `${API_BASE_URL}/api/ratings`,
    transactions: `${API_BASE_URL}/api/transactions`,
    admins: {
      base: `${API_BASE_URL}/api/admins`,
      byId: (adminId: string) => `${API_BASE_URL}/api/admins/${adminId}`,
      products: (
        adminId: string,
        page: number = 1,
        limit: number = 12,
        sort?: string,
      ) =>
        `${API_BASE_URL}/api/admins/${adminId}/products?page=${page}&limit=${limit}${
          sort ? `&sort=${sort}` : ""
        }`,
      articles: (adminId: string, page: number = 1, limit: number = 12) =>
        `${API_BASE_URL}/api/admins/${adminId}/articles?page=${page}&limit=${limit}`,
    },
    users: {
      base: `${API_BASE_URL}/api/users`,
    },
    cars: {
      base: `${API_BASE_URL}/api/cars`,
      byId: (id: string) => `${API_BASE_URL}/api/cars/${id}`,
      bySlug: (slug: string) => `${API_BASE_URL}/api/cars/slug/${slug}`,
      images: (carId: string) => `${API_BASE_URL}/api/cars/${carId}/images`,
      imageById: (carId: string, imageId: string) =>
        `${API_BASE_URL}/api/cars/${carId}/images/${imageId}`,
      upload: (carId: string) => `${API_BASE_URL}/api/cars/${carId}/upload`,
    },
  },
  SECRET: API_SECRET,
};
