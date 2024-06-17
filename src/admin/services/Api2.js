// src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://tpreformas.es:8088",

  // baseURL: "https://backend-budgets-app.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    //! log debug
    // console.log("---------------------------------------------------------");
    // console.log("Se ha solicitado exitosamente el archivo api.js");
    // console.log("---------------------------------------------------------");

    // Solo agregar token si está disponible
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    //! log debug
    console.log("Error al solicitar Api.js");

    return Promise.reject(error);
  }
);

export default api;
