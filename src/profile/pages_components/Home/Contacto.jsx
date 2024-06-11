import React from "react";
import "./styles/contacto.css";

import logoSvg from "./../../../assets/svg/logo-tp-light.svg";
import { useTranslation } from "react-i18next";

function Contacto() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="section-contact">
        <div className="business-card-container">
          <div className="business-card">
            <div className="inside-card">
              <div className="logo-card">
                <img src={logoSvg} alt="" />
                <h1 className="title-card">{t("text_taget1")}</h1>
              </div>

              <h3 className="title-name">{t("title_contact")}</h3>
              <div className="services-card">
                <div className="service-card-options">
                  <h3>{t("nav_services")}</h3>
                  <h3>{t("nav_contact")}</h3>
                </div>
                <div className="service-card-sect">
                  <div className="service-card-content">
                    <ul>
                      <li>{t("text_taget2")}</li>
                      <li>{t("text_taget3")}</li>
                      <li>{t("text_taget4")}</li>
                      <li>{t("text_taget5")}</li>
                    </ul>
                  </div>
                  <div className="service-card-content">
                    <ul>
                      <li>{t("nav_phone")}</li>
                      <li>{t("nav_email")}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
