import React from "react";
import "./styles/headerSection.css";
import { useTranslation } from "react-i18next";

function HeaderSection() {
  const { t } = useTranslation();

  const backgroundImage = t("img_header_aboutus");
  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <header className="header-section-aboutme section" style={headerStyle}>
      <div className="title-section-header">
        <p className="">{t("nav_us")}</p>
      </div>
    </header>
  );
}

HeaderSection.propTypes = {};

export default HeaderSection;
