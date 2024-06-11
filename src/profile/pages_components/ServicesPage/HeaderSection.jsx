import React from "react";
import "./styles/headerSection.css";
import { useTranslation } from "react-i18next";

function HeaderSection() {
  const { t } = useTranslation();

  const backgroundImage = t("img_header_services");
  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <header className="header-section-services section" style={headerStyle}>
      <div className="title-section-header">
        <p className="">{t("nav_services")}</p>
      </div>
    </header>
  );
}

HeaderSection.propTypes = {};

export default HeaderSection;
