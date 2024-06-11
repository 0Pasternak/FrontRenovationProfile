import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles/presentation.css";

function Presentation() {
  const [selected, setSelected] = useState(1);
  const { t } = useTranslation();

  const generalTexts = {
    1: t("text_aboutus_text1"),
    2: t("text_aboutus_text2"),
    3: t("text_aboutus_text3"),
    4: t("text_aboutus_text4"),
    5: t("text_aboutus_text5"),
  };
  const generalTitles = {
    1: t("text_aboutus_title1"),
    2: t("text_aboutus_title2"),
    3: t("text_aboutus_title3"),
  };

  const img2 = {
    1: t("img_aboutus4"),
    2: t("img_aboutus5"),
    3: t("img_aboutus6"),
    4: t("img_aboutus7"),
  };

  const textos = {
    1: t("text_aboutus_text6"),
    2: t("text_aboutus_text7"),
    3: t("text_aboutus_text8"),
    4: t("text_aboutus_text9"),
  };

  const titulos = {
    1: t("text_aboutus_title4"),
    2: t("text_aboutus_title5"),
    3: t("text_aboutus_title6"),
    4: t("text_aboutus_title7"),
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${img2[selected]})`,
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
    opacity: 0.5,
  };

  return (
    <section className="aboutUs">
      <div className="aboutUs-container">
        <div className="presentation-content">{generalTexts[1]}</div>
        <div className="description-content">
          <div>
            <h3>{generalTitles[1]}</h3>
            <p>{generalTexts[2]}</p>
            <div className="presentation-text-container">
              <div>
                <div
                  className="description-container-img1"
                  style={{ backgroundImage: `url(${t("img_aboutus8")})` }}
                ></div>
              </div>
              <div className="presentation-text">{generalTexts[3]}</div>
            </div>
            <h3>{generalTitles[2]}</h3>
            <div className="presentation-text-container">
              <div>
                <div
                  className="description-container-img2"
                  style={{ backgroundImage: `url(${t("img_aboutus2")})` }}
                ></div>
              </div>
              <div className="presentation-text">{generalTexts[4]}</div>
            </div>
            <p>{generalTexts[5]}</p>
            <div className="presentation-buttons">
              <button className="budget-button-section">
                {t("budget_button")}
              </button>
            </div>
          </div>
          <div>
            <div
              className="img-lateral"
              style={{ backgroundImage: `url(${t("img_aboutus3")})` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="how-we-work">
        <div className="title-how-we-work">
          <h3>{generalTitles[3]}</h3>
        </div>
        <div className="work-container">
          <div className="left-column">
            <div style={backgroundImageStyle}></div>
            <div className="left-column-title">
              <h4>{titulos[selected]}</h4>
            </div>
            <div className="left-column-text">
              <p>{textos[selected]}</p>
            </div>
          </div>
          <div className="right-column">
            <div className="line"></div>
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`circle ${selected === num ? "selected" : ""}`}
                onClick={() => setSelected(num)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
