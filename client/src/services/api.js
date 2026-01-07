const API_URL = import.meta.env.VITE_API_URL || "";

const parseJson = async (res) => {
  const text = await res.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await parseJson(res);

  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
};

export const api = {
  auth: {
    register: (payload) =>
      request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      }),
    login: (payload) =>
      request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
      }),
    me: () => request("/api/auth/me"),
    logout: () =>
      request("/api/auth/logout", {
        method: "POST"
      })
  },
  cart: {
    get: () => request("/api/cart"),
    sync: (items) =>
      request("/api/cart", {
        method: "POST",
        body: JSON.stringify({ items })
      })
  },
  orders: {
    create: (items) =>
      request("/api/orders", {
        method: "POST",
        body: JSON.stringify({ items })
      }),
    list: () => request("/api/orders")
  },
  products: {
    list: (category) =>
      request(
        `/api/products${
          category ? `?category=${encodeURIComponent(category)}` : ""
        }`
      ),
    featured: () => request("/api/products/featured"),
    getById: (id) => request(`/api/products/${id}`)
  }
};
