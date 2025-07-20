import axios from 'axios';

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('❌ No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
