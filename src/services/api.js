import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.15.170:8081',
});

export default api;