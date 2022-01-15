import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SEVER_URI
});

export default instance;
