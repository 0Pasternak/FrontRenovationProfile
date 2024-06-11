import React, { useState, useEffect, useContext } from "react";
import "./styles/navAdmin.css";

import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { GrClose } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdArchitecture } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function NavAdmin() {
  const [isOpen, setIsOpen] = useState(true);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.handleLogout();
    navigate("/", { state: "you have been logged out" });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 992px)").matches) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="admin-nav">
      <div className="admin-toggle-container">
        {isOpen ? (
          <IoMdMenu id="admin-menu-toggle-open" onClick={toggleMenu} />
        ) : (
          <GrClose id="admin-menu-toggle-close" onClick={toggleMenu} />
        )}
      </div>
      <div
        className={`admin-menu-container ${
          isOpen ? "admin-menu-container active-admin-menu" : ""
        }`}
      >
        <div className="nav-admin-profile-container">
          <div className="admin-data">
            <p className="account">Admin Profile</p>
            <IoIosSettings className="icon-settings" />
          </div>
          <div className="admin-email-section">
            <p>taras.pasernak@gmail.com</p>
          </div>
        </div>
        <div className="admin-list-container">
          <ul className="admin-option-menu-list">
            <li>
              <NavLink to="/admin" className="admin-nav-link">
                <FaUsers className="opt-icon-nav" />
                <p>Inicio</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers-list" className="admin-nav-link">
                <FaUsers className="opt-icon-nav" />
                <p>Lista de clientes</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/budget-list" className="admin-nav-link">
                <IoDocumentTextSharp className="opt-icon-nav" />
                <p>Presupuestos</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/draw-plan" className="admin-nav-link">
                <MdArchitecture className="opt-icon-nav" />
                <p>Dibujar Plano</p>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="admin-sub-list-container">
          <ul className="admin-option-sub-menu-list">
            <li>Mi perfil</li>
            <NavLink to="/page-editor" className="sub-admin-nav-link">
              <li>Edición de página</li>
            </NavLink>
            <li>Opciones</li>
          </ul>
        </div>
        <div className="close-session-container" onClick={handleLogout}>
          <p>Cerrar Sesión</p>
          <FaPowerOff className="off-icon" />
        </div>
      </div>
    </nav>
  );
}

export default NavAdmin;
