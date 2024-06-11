import React from "react";
import "./styles/services.css";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const cardft1 = t("img_home_services1");
  const cardft2 = t("img_home_services2");
  const cardft3 = t("img_home_services3");
  const cardft4 = t("img_home_services4");

  const headerStyle = {
    cardft1: { backgroundImage: `url(${cardft1})` },
    cardft2: { backgroundImage: `url(${cardft2})` },
    cardft3: { backgroundImage: `url(${cardft3})` },
    cardft4: { backgroundImage: `url(${cardft4})` },
  };

  return (
    <section className="section">
      <div className="section-services">
        <div className="section-title">
          <h3>{t("text_header_sec1")}</h3>
        </div>
        <div className="main-services-section">
          <div className="services-text">
            <p>{t("text_header_sec2")}</p>
            <p>{t("text_header_sec3")}</p>
          </div>
          <div className="services-container">
            <div className="services-cards-container">
              <div className="service-card" style={headerStyle.cardft1}></div>
              <div className="service-card" style={headerStyle.cardft2}></div>
            </div>
            <div className="services-cards-container">
              <div className="service-card" style={headerStyle.cardft3}></div>
              <div className="service-card" style={headerStyle.cardft4}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
