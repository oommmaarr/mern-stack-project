import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mern-stack-project-production-093c.up.railway.app/api/',
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;