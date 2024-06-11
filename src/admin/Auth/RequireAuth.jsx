import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const user = localStorage.getItem("userId");
    const location = useLocation();

    // console.log("Debug - Usuario obtenido del localStorage:", user);
    // console.log("Debug - Ubicación actual:", location.pathname);

    if (!user) {
        // console.log("Debug - Usuario no autenticado, redirigiendo a la ruta principal.");
        return <Navigate to="/" state={{ path: location.pathname }} />;
    }

    // console.log("Debug - Usuario autenticado, mostrando contenido protegido.");
    return children;
};

export default RequireAuth;
