import React, { useRef } from "react";
import "./styles/contactSection.css";
import { useTranslation } from "react-i18next";
import { BsPhoneFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const { t } = useTranslation();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1j8jypk",
        "template_6oxyx8c",
        form.current,
        "NjPNvqJrROAUEzV7D"
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="c-contactSection-container section">
      <div className="c-contactSection-container-main">
        <div className="c-budget-request">
          <form ref={form} onSubmit={sendEmail}>
            <h2 className="c-budget-request-title">{t("budget_title")}</h2>
            <p className="c-text-line c-relevant">{t("budget_subtitle")}</p>
            <div className="c-form-content">
              <input
                type="text"
                name="user_name"
                className="c-budget-request-input"
                placeholder={t("budget_name")}
                required
              />
              <input
                type="tel"
                name="user_tel"
                className="c-budget-request-input"
                placeholder={t("budget_phone")}
                required
              />
              <textarea
                name="desc_info"
                cols="30"
                rows="5"
                placeholder={t("budget_text")}
                className="c-budget-request-textarea"
                required
              ></textarea>
            </div>
            <button type="submit" className="c-budget-request-button">
              {t("budget_button")}
            </button>
          </form>
          <div className="c-contact-sect-form">
            <BsPhoneFill className="c-phone-icon" />
            <p className="c-phone-contact-budget">{t("nav_phone")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

ContactSection.propTypes = {};

export default ContactSection;
