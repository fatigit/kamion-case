import axios from "axios";

// Base URL
const BASE_URL = "https://api.dev.kamion.co/api";

// API Client instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Helper function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Request interceptor - Add token
apiClient.interceptors.request.use(
  (config) => {
    // Token will be added from store
    // For now we can add it manually
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout process can be done
      console.warn("Yetkisiz erişim - token geçersiz olabilir");
    }

    // General error handling
    const message =
      error.response?.data?.message || error.message || "Bir hata oluştu";
    console.error("API Hatası:", message);

    return Promise.reject(error);
  }
);

export default apiClient;
