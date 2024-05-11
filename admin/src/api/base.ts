import axios from "axios";
import { onRequestError, onRequestInterceptor } from "./interceptors";

export const baseURL = "http://localhost:3001";

// Axios setup
const api = axios.create({ baseURL });

api.interceptors.request.use(onRequestInterceptor, onRequestError);

export default api;
