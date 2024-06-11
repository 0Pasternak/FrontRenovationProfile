import React from "react";
import "./styles/footer.css";

import LogoSVG from "./../../assets/svg/logo-tp-light.svg";

import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="main-footer section">
        <div className="footer-main-container">
          <div className="logo-container-footer">
            <img src={LogoSVG} alt="" />
          </div>
          <div className="main-footer-content">
            <div className="foter-section">
              <ul>
                <li>{t("nav_home")}</li>
                <li>{t("nav_services")}</li>
                <li>{t("nav_us")}</li>
                <li>{t("nav_projects")}</li>
                <li>{t("nav_contact")}</li>
              </ul>
            </div>
            <div className="foter-section">
              <ul>
                <li>Instagram</li>
                <li>X</li>
                <li>otro</li>
                <li>otro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="sub-footer">
          <div className="footer-sub-container">copiraygt</div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
