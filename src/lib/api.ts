import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ""; // same origin

export const http = axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  // Content-Type
  if (typeof window !== "undefined" && config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export async function api<T>(url: string, config?: Parameters<typeof http["request"]>[0]) {
  const res = await http.request<T>({ url, method: "GET", ...(config || {}) });
  return res.data as T;
}
