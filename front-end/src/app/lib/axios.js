import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://mern-stack-project-production-093c.up.railway.app/api/',
    withCredentials: true,
})
export default instance;