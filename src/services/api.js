import axios from 'axios';

const api = axios.create({
    baseURL: 'http://200.135.57.16',
});

export default api;