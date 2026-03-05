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
    products: {
      base: `${API_BASE_URL}/products`,
      categories: `${API_BASE_URL}/products/categories`,
      framework: `${API_BASE_URL}/products/framework`,
      frameworkUpload: `${API_BASE_URL}/products/framework/upload`,
      frameworkById: (id: string) =>
        `${API_BASE_URL}/products/framework?id=${id}`,
      tags: `${API_BASE_URL}/products/tags`,
      type: `${API_BASE_URL}/products/type`,
      upload: `${API_BASE_URL}/products/upload`,
      byId: (id: string) => `${API_BASE_URL}/products?id=${id}`,
      byProductsId: (productsId: string) =>
        `${API_BASE_URL}/products/${productsId}`,
      search: (params: URLSearchParams) =>
        `${API_BASE_URL}/products/search?${params.toString()}`,
      discount: (page: number = 1, limit: number = 10) =>
        `${API_BASE_URL}/products/discount?page=${page}&limit=${limit}`,
      mostSaled: (page: number = 1, limit: number = 10) =>
        `${API_BASE_URL}/products/most-saled?page=${page}&limit=${limit}`,
      popular: (page: number = 1, limit: number = 10) =>
        `${API_BASE_URL}/products/popular?page=${page}&limit=${limit}`,
      ratings: (productsId: string, page: number = 1, limit: number = 10) =>
        `${API_BASE_URL}/ratings/${productsId}?page=${page}&limit=${limit}`,
      byCategory: (
        categoryId: string,
        page: number = 1,
        limit: number = 10,
        sort: string = "newest",
      ) =>
        `${API_BASE_URL}/api/products/categories/${categoryId}?page=${page}&limit=${limit}&sort=${sort}`,
      byType: (
        typeId: string,
        page: number = 1,
        limit: number = 10,
        sort: string = "newest",
      ) =>
        `${API_BASE_URL}/api/products/type/${typeId}?page=${page}&limit=${limit}&sort=${sort}`,
      byTags: (
        tagsId: string,
        page: number = 1,
        limit: number = 10,
        sort: string = "newest",
      ) =>
        `${API_BASE_URL}/api/products/tags/${tagsId}?page=${page}&limit=${limit}&sort=${sort}`,
    },
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
  },
  SECRET: API_SECRET,
};
