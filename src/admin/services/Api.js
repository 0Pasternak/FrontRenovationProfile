import axios from "axios";
import { getHeader } from "./Header";

const api = axios.create({
  baseURL: "https://backend-budgets-app.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    //! log debug
    // console.log("---------------------------------------------------------");
    // console.log("Se ha solicitado exitosamente el archivo api.js");
    // console.log("---------------------------------------------------------");

    const headers = getHeader();
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    //! log debug
    console.log("Error al solicitar Api.js");

    return Promise.reject(error);
  }
);

export default api;
