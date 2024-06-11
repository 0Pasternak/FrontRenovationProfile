import React, { useState } from "react";
import "./styles/projectsHistory.css";

import { useTranslation } from "react-i18next";

function ProjectsHistory() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      images: [t("img_work1"), t("img_work2"), t("img_work3")],
      text: t("text_work_text1"),
      title: t("text_work_title1"),
    },
    {
      id: 2,
      images: [t("img_work4"), t("img_work5"), t("img_work6")],
      text: t("text_work_text2"),
      title: t("text_work_title2"),
    },
    {
      id: 3,
      images: [t("img_work7"), t("img_work8"), t("img_work9")],
      text: t("text_work_text3"),
      title: t("text_work_title3"),
    },
    {
      id: 4,
      images: [t("img_work10"), t("img_work11"), t("img_work12")],
      text: t("text_work_text4"),
      title: t("text_work_title4"),
    },
    {
      id: 5,
      images: [t("img_work13"), t("img_work14"), t("img_work15")],
      text: t("text_work_text5"),
      title: t("text_work_title5"),
    },
    {
      id: 6,
      images: [t("img_work16"), t("img_work17"), t("img_work18")],
      text: t("text_work_text6"),
      title: t("text_work_title6"),
    },
  ];

  return (
    <section className="project-history-section section">
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

const Card = ({ card }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  let startX = 0;
  let endX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX > endX + 50) {
      if (currentImage < card.images.length - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentImage((prev) => prev + 1);
          setTransitioning(false);
        }, 100);
      }
    } else if (startX < endX - 50) {
      if (currentImage > 0) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentImage((prev) => prev - 1);
          setTransitioning(false);
        }, 100);
      }
    }
  };

  return (
    <div
      className="card"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="projects-img-contect">
        <img
          src={card.images[currentImage]}
          alt={`Card ${card.id}`}
          className={`card-image ${transitioning ? "fade" : ""}`}
        />
        <div className="image-selectors">
          {card.images.map((image, index) => (
            <div
              key={index}
              className={`circle-projects ${
                currentImage === index ? "active-projects" : ""
              }`}
              onClick={() => {
                if (index !== currentImage) {
                  setTransitioning(true);
                  setTimeout(() => {
                    setCurrentImage(index);
                    setTransitioning(false);
                  }, 100);
                }
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="card-text">
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </div>
  );
};

export default ProjectsHistory;
