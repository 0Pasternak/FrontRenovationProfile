import React, { useState } from "react";
import "./styles/myjob.css";
import { useTranslation } from "react-i18next";

function MyJob() {
  const { t } = useTranslation();

  const images = [
    t("img_myjob1"),
    t("img_myjob2"),
    t("img_myjob3"),
    t("img_myjob4"),
    t("img_myjob5"),
    t("img_myjob6"),
    t("img_myjob7"),
    t("img_myjob8"),
    t("img_myjob9"),
    t("img_myjob10"),
    t("img_myjob11"),
    t("img_myjob12"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="section">
      <div className="myjob-container">
        <div className="myjob-title">
          <h3>{t("text_header_sec4")}</h3>
        </div>
        <div className="myjob-section">
          <div className="myjob-text">
            <p>{t("text_header_sec5")}</p>
            <p>{t("text_header_sec6")}</p>
          </div>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="carousel-image"
                  style={{
                    background: `url(${img}) no-repeat center center / cover`,
                    width: "100%",
                    height: "100%",
                    transform: `translateX(${-currentIndex * 100}%)`,
                    transition: "transform ease-out 0.45s",
                  }}
                />
              ))}
            </div>
            <div className="carousel-controls">
              <button onClick={prevSlide}>&#10094;</button>
              <button onClick={nextSlide}>&#10095;</button>
            </div>
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot${currentIndex === idx ? " active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyJob;
