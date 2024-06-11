import React from "react";
import "./styles/header.css";

import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  const backgroundImage = t("img_header");

  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <header>
      <div className="header-text-container">
        <div className="header-title">
          <h1>{t("text_title_header")}</h1>
        </div>
        <div className="header-slider">
          <ul className="header-slider-list">
            <li>
              <h1>{t("text_header_op1")}</h1>
            </li>
            <li>
              <h1>{t("text_header_op2")}</h1>
            </li>
            <li>
              <h1>{t("text_header_op3")}</h1>
            </li>
            <li>
              <h1>{t("text_header_op4")}</h1>
            </li>
            <li>
              <h1>{t("text_header_op1")}</h1>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-background-img" style={headerStyle}></div>
    </header>
  );
}

export default Header;
