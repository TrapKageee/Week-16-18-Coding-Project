// axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://66a9e30e613eced4eba6af81.mockapi.io',
  // You can set other default configurations here
});

export default api;
