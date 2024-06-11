import React from "react";
import { useTranslation } from "react-i18next";

import "./styles/renovationTypes.css";

function RenovationTypes() {
  const { t } = useTranslation();

  const cardft1 = t("img_servicespage1");
  const cardft2 = t("img_servicespage2");
  const cardft3 = t("img_servicespage3");
  const cardft4 = t("img_servicespage4");
  const cardft5 = t("img_servicespage5");
  const cardft6 = t("img_servicespage6");

  const headerStyle = {
    cardft1: { backgroundImage: `url(${cardft1})` },
    cardft2: { backgroundImage: `url(${cardft2})` },
    cardft3: { backgroundImage: `url(${cardft3})` },
    cardft4: { backgroundImage: `url(${cardft4})` },
    cardft5: { backgroundImage: `url(${cardft5})` },
    cardft6: { backgroundImage: `url(${cardft6})` },
  };

  return (
    <section className="renovation-types section">
      <div className="renovation-types-container">
        <div className="section-renovation-one">
          <div className="title-renovation-section">
            <h1> {t("text_services_text1")}</h1>
          </div>
          <div className="section-renovation-one-content">
            <div className="renovation-text">
              <p>{t("text_services_text2")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
            <div className="renovation-img" style={headerStyle.cardft1}></div>
          </div>
        </div>
        <div className="section-renovation-two">
          <div className="title-renovation-section">
            <h1> {t("text_services_text3")}</h1>
          </div>
          <div className="section-renovation-one-content">
            <div className="renovation-img" style={headerStyle.cardft2}></div>
            <div className="renovation-text">
              <p>{t("text_services_text4")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="section-renovation-three">
          <div className="title-renovation-section">
            <h1> {t("text_services_text5")}</h1>
          </div>
          <div className="section-renovation-one-content">
            <div className="renovation-text">
              <p>{t("text_services_text6")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
            <div className="renovation-img" style={headerStyle.cardft3}></div>
          </div>
        </div>
        <div className="section-renovation-four">
          <div className="title-renovation-section">
            <h1>{t("text_services_text7")}</h1>
          </div>
          <div className="section-renovation-more-services">
            <div className="renovation-text-more-services">
              <div
                className="img-more-services"
                style={headerStyle.cardft4}
              ></div>
              <p>{t("text_services_text8")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
            <div className="renovation-text-more-services">
              <div
                className="img-more-services"
                style={headerStyle.cardft5}
              ></div>
              <p>{t("text_services_text9")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
            <div className="renovation-text-more-services">
              <div
                className="img-more-services"
                style={headerStyle.cardft6}
              ></div>
              <p>{t("text_services_text10")}</p>
              <div>
                <button className="budget-button-section">
                  {t("budget_button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RenovationTypes;
