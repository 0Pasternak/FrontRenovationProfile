import React, { useState } from "react";
import "./styles/pageEditor.css";
import NavAdmin from "../components/NavAdmin";
import { fetchTranslations } from "./../services/ControlPage";

import HomeEditorPage from "../pages_components/PageEditor/HomeEditorPage";
import ServicesEditorPage from "../pages_components/PageEditor/ServicesEditorPage";
import AboutUsEditorPage from "../pages_components/PageEditor/AboutUsEditorPage";
import MyWorkEditorPage from "../pages_components/PageEditor/MyWorkEditorPage";

const PageEditor = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return <HomeEditorPage></HomeEditorPage>;
      case "servicios":
        return <ServicesEditorPage></ServicesEditorPage>;
      case "quienesSomos":
        return <AboutUsEditorPage></AboutUsEditorPage>;
      case "trabajos":
        return <MyWorkEditorPage></MyWorkEditorPage>;
      case "contacto":
        return <div>Contenido de Contacto</div>;
      case "otros":
        return <div>Contenido de Otros</div>;
      default:
        return <div>Contenido de Inicio</div>;
    }
  };

  const handleFetchTranslations = async () => {
    try {
      await fetchTranslations();
      alert("Translations fetched and stored successfully!");
    } catch (error) {
      console.error("Failed to fetch translations:", error);
      alert(
        "Failed to fetch translations. Check the console for more details."
      );
    }
  };

  return (
    <div className="page-editor-section">
      <NavAdmin />

      <div className="page-editor-header">
        <p>Panel de administrador</p>
      </div>
      <div className="page-editor-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div className="option-customer-one">
              <div className="option-customer-admin">
                <button onClick={handleFetchTranslations}>
                  Fetch Translations
                </button>
              </div>
              <div className="option-customer-admin"></div>
            </div>
            <div className="option-customer-two">
              <div className="option-customer-admin"></div>
              <div className="option-customer-admin"></div>
            </div>
          </div>
        </div>
        <div className="page-editor-section-special-admin">
          <div className="page-editor-table-data">
            <div className="tabs">
              <button
                className={activeTab === "inicio" ? "active" : ""}
                onClick={() => setActiveTab("inicio")}
              >
                Inicio
              </button>
              <button
                className={activeTab === "servicios" ? "active" : ""}
                onClick={() => setActiveTab("servicios")}
              >
                Servicios
              </button>
              <button
                className={activeTab === "quienesSomos" ? "active" : ""}
                onClick={() => setActiveTab("quienesSomos")}
              >
                Quiénes Somos
              </button>
              <button
                className={activeTab === "trabajos" ? "active" : ""}
                onClick={() => setActiveTab("trabajos")}
              >
                Trabajos
              </button>
              <button
                className={activeTab === "contacto" ? "active" : ""}
                onClick={() => setActiveTab("contacto")}
              >
                Contacto
              </button>
              <button
                className={activeTab === "otros" ? "active" : ""}
                onClick={() => setActiveTab("otros")}
              >
                Otros
              </button>
            </div>
            <div className="tab-content">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
