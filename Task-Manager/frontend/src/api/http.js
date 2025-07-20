import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const isAuthRoute = config.url.includes("/auth");

    if (!isAuthRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("❌ No token found in localStorage");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

