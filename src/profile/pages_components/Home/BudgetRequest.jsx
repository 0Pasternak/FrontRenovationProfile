import React, { useRef } from "react";
import "./styles/budgetRequest.css";
import { BsPhoneFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

function BudgetRequest() {
  const { t } = useTranslation();
  const form = useRef();

  const phoneNumber = t("nav_phone");

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
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div>
      <div className="budget-request">
        <form ref={form} onSubmit={sendEmail}>
          <h2 className="budget-request-title">{t("budget_title")}</h2>
          <p className="text-line relevant">{t("budget_subtitle")}</p>
          <div className="form-content">
            <input
              type="text"
              name="user_name"
              className="budget-request-input"
              placeholder={t("budget_name")}
              required
            />
            <input
              type="tel"
              name="user_tel"
              className="budget-request-input"
              placeholder={t("budget_phone")}
              required
            />
            <textarea
              name="desc_info"
              cols="30"
              rows="5"
              placeholder={t("budget_text")}
              className="budget-request-textarea"
              required
            ></textarea>
          </div>
          <button type="submit" value="enviar">
            {t("budget_button")}
          </button>
        </form>
        <div className="contact-sect-form">
          <BsPhoneFill className="phone-icon" />
          <a
            href={`tel:${phoneNumber}`}
            className="phone-link cotact-content-mainNav"
          >
            <p className="phone-contact-budget">{t("nav_phone")}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

BudgetRequest.propTypes = {};

export default BudgetRequest;
