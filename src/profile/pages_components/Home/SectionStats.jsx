import React from "react";
import "./styles/sectionStats.css";

import { BiLike } from "react-icons/bi";
import { TbStarsFilled } from "react-icons/tb";
import { SiRenovatebot } from "react-icons/si";

import { useTranslation } from "react-i18next";

function SectionStats() {
  const { t } = useTranslation();

  return (
    <section className="stats-content">
      <ul className="stats-content-list">
        <li className="stat">
          <div className="stat-icon">
            <TbStarsFilled />
          </div>
          <div className="txt-cont-div">
            <p className="stxt">{t("stats_nyears")}</p>
            <p className="description-stat">{t("text_header_op5")}</p>
          </div>
        </li>
        <li className="stat">
          <div className="stat-icon">
            <BiLike />
          </div>
          <div className="txt-cont-div">
            <p className="stxt">{t("stats_ncustoemrs")}</p>
            <p className="description-stat">{t("text_header_op6")}</p>
          </div>
        </li>
        <li className="stat">
          <div className="stat-icon">
            <SiRenovatebot />
          </div>
          <div className="txt-cont-div">
            <p className="stxt">{t("stats_nprojects")}</p>
            <p className="description-stat">{t("text_header_op7")}</p>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default SectionStats;
