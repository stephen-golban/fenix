import axios from 'axios';
import { onRequestError, onRequestInterceptor } from './interceptors';

export const baseURL = 'https://fenix-backend-2a5e35d85c12.herokuapp.com';

// Axios setup
const api = axios.create({ baseURL });

api.interceptors.request.use(onRequestInterceptor, onRequestError);

export default api;
