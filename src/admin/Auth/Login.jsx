import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { loginUser } from "../services/AuthApi";

import "./styles/login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(login);
      console.log("Debug - Respuesta recibida del servidor:", response);
      if (response) {
        const { token } = response;
        handleLogin(token);
        navigate("/admin");
      } else {
        setErrorMessage("Invalid username or password. Please try again");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="complete">
      <div className="login-section">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <p className="login-title">Inicio de Sesión</p>
            <div className="login-container-input">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={login.email}
                onChange={handleInputChange}
                className="login-input"
              />
            </div>
            <div className="login-container-input">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={login.password}
                onChange={handleInputChange}
                className="login-input"
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
