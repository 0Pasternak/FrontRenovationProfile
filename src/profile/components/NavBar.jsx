import React, { useState, useEffect } from "react";
import "./styles/navbar.css";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import { BsTranslate } from "react-icons/bs";
import i18next from "i18next";
import spainSVG from "./../../assets/svg/spain.svg";
import unitedKingdomSVG from "./../../assets/svg/united-kingdom.svg";
import logoSVG from "./../../assets/svg/logo-tp-light.svg";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const phoneNumber = t("nav_phone");
  const email = t("nav_email");

  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 992px)").matches) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="top-nav">
        <ul className="top-nav-list">
          <div className="first-top-content">
            <li className="cotact-content-mainNav">
              <p>
                <a
                  href={`tel:${phoneNumber}`}
                  className="phone-link cotact-content-mainNav"
                >
                  <MdLocalPhone />
                  <span className="phone-data">{t("nav_phone")}</span>
                </a>
              </p>
            </li>
            <li className="cotact-content-mainNav">
              <p>
                <a
                  href={`mailto:${email}`}
                  className="email-link cotact-content-mainNav"
                >
                  <MdEmail />
                  <span className="email-data">{t("nav_email")}</span>
                </a>
              </p>
            </li>
          </div>
          <div className="nav-lenguage">
            <li className="cotact-content-mainNav">
              <BsTranslate />
              {t("nav_lenguage")} <i className="arrow down"></i>
            </li>
            <ul className="nav-lenguage-list">
              <li onClick={() => changeLanguage("en")}>
                <img src={unitedKingdomSVG} alt="English" />
                English
              </li>
              <li onClick={() => changeLanguage("es")}>
                <img src={spainSVG} alt="Español" /> Español
              </li>
            </ul>
          </div>
        </ul>
      </div>
      <div className="main-nav">
        <div className="main-nav-content">
          <div className="nav-logo-container">
            <NavLink to="/" className="route-nav-link">
              <img src={logoSVG} alt="Logo" />
            </NavLink>
          </div>
          <div className="main-nav-container">
            <div>
              <IoMdMenu id="open-nav-toggle" onClick={toggleMenu} />
            </div>
            <ul className={`main-nav-list ${isOpen ? "active-menu" : ""}`}>
              <li onClick={toggleMenu} className="nav-convent-close-toggle">
                <RxCross2 id="close-nav-toggle" />
              </li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `route-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>{t("nav_home")}</li>
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `route-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>{t("nav_services")}</li>
              </NavLink>
              <NavLink
                to="/about-me"
                className={({ isActive }) =>
                  `route-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>{t("nav_us")}</li>
              </NavLink>
              <NavLink
                to="/all-my-job"
                className={({ isActive }) =>
                  `route-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>{t("nav_projects")}</li>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `route-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>{t("nav_contact")}</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
