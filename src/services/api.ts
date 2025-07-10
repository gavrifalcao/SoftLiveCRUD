import axios from 'axios';

const api = axios.create({
  baseURL: 'https://686e751fc9090c495389bc76.mockapi.io/crud/softlive/',
});

export default api;
