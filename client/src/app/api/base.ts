import axios from "axios";

export const baseURL = "https://fenix-backend-2a5e35d85c12.herokuapp.com";

// Axios setup
const api = axios.create({ baseURL });

export default api;
