import axios from 'axios';
const api = axios.create({
  baseURL: 'https://shopnetic-yxat.onrender.com',
  withCredentials: true
});
export default api;