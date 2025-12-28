import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', // Default .NET API port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors for auth token injection if needed later
api.interceptors.request.use(
    (config) => {
        // Example: const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
