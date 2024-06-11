import React from "react";
import "./styles/contactHeader.css";
import { useTranslation } from "react-i18next";

function ContactHeader() {
  const { t } = useTranslation();
  const backgroundImage = t("img_contact");
  const headerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  return (
    <header className="header-section-contact section" style={headerStyle}>
      <div className="title-section-header">
        <p className="">{t("nav_contact")}</p>
      </div>
    </header>
  );
}

export default ContactHeader;
