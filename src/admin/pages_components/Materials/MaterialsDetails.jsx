import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MaterialsList from "./MaterialsList";
import AddMaterial from "./AddMaterial";
import { BsTrash } from "react-icons/bs";
import {
  updateLine,
  updateLineType,
  deleteLine,
} from "./../../services/ApiBudgetLine";

import "./styles/materialDetails.css";

function MaterialsDetails({
  lineObject,
  onLineUpdated,
  onMaterialsSaved,
  onMaterialsUpdated,
  onCloseModal,
  onLinesLoad,
}) {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addMode, setAddMode] = useState("single");
  const [localLineType, setLocalLineType] = useState(lineObject.lineType);
  const [canAddMaterial, setCanAddMaterial] = useState(true);

  // New states for total hours and hour price
  const [totalHours, setTotalHours] = useState(lineObject.totalHours || 0);
  const [hourPrice, setHourPrice] = useState(lineObject.hourPrice || 0);

  useEffect(() => {
    setLocalLineType(lineObject.lineType);
    setCanAddMaterial(
      lineObject.lineType === "SUMMARY" ||
        (lineObject.lineType === "SINGLE" && lineObject.materials.length === 0)
    );
  }, [lineObject]);

  useEffect(() => {
    if (lineObject.materials) {
      const calculatedTotalPrice = lineObject.materials.reduce(
        (acc, material) => acc + parseFloat(material.totalPrice || 0),
        0
      );
      setTotalPrice(calculatedTotalPrice);
    }
  }, [lineObject.materials, updateTrigger]);

  const triggerListUpdate = () => {
    setUpdateTrigger(!updateTrigger);
  };

  const handleCombinedClick = async (mode, type) => {
    try {
      setAddMode(mode);
      await updateLineType(lineObject.budgetTableLineId, type);
      setLocalLineType(type);
      setCanAddMaterial(
        type === "SUMMARY" ||
          (type === "SINGLE" && lineObject.materials.length === 0)
      );
      onLineUpdated();
    } catch (error) {
      alert(`Error al realizar las operaciones: ${error.message}`);
    }
  };

  const handleDeleteLine = async () => {
    try {
      await deleteLine(lineObject.budgetTableLineId);
      onLineUpdated();
      onCloseModal();
      onLinesLoad();
    } catch (error) {
      alert(`Error al eliminar la línea: ${error.message}`);
    }
  };

  // Function to handle saving total hours and hour price
  const handleSaveHoursAndPrice = async () => {
    try {
      const updatedLine = {
        ...lineObject,
        totalHours: totalHours || 0,
        hourPrice: hourPrice || 0,
      };
      await updateLine(lineObject.budgetTableLineId, updatedLine);
      onLineUpdated();
    } catch (error) {
      alert(`Error al actualizar las horas y el precio: ${error.message}`);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }} className="type-cotainer">
        <BsTrash onClick={handleDeleteLine} className="delete-icon-line" />
        <p>{localLineType || "Estado no asignado"}</p>
      </div>
      <div
        style={{ marginBottom: "20px" }}
        className="material-details-buttons-container"
      >
        <button
          onClick={() => handleCombinedClick("single", "SINGLE")}
          disabled={localLineType === "SINGLE"}
        >
          Material único
        </button>
        <button
          onClick={() => handleCombinedClick("summary", "SUMMARY")}
          disabled={localLineType === "SUMMARY"}
        >
          Múltiples materiales
        </button>
      </div>
      <div className="hours-price-container">
        <input
          type="number"
          placeholder="Total Hours"
          value={totalHours}
          onChange={(e) => setTotalHours(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Hour Price"
          value={hourPrice}
          onChange={(e) => setHourPrice(Number(e.target.value))}
        />
        <button onClick={handleSaveHoursAndPrice}>Guardar</button>
      </div>

      {canAddMaterial && (
        <AddMaterial
          lineObject={lineObject}
          onMaterialsSaved={() => {
            triggerListUpdate();
            setCanAddMaterial(
              localLineType === "SUMMARY" ||
                (localLineType === "SINGLE" &&
                  lineObject.materials.length === 0)
            );
            onMaterialsSaved();
            if (localLineType === "SINGLE") {
              // No cerrar el modal y actualizar datos directamente
              onMaterialsUpdated();
            }
          }}
          addMode={addMode}
          lineType={localLineType || "SUMMARY"}
          onMaterialsSaved2={onMaterialsSaved}
          onMaterialsUpdated={onMaterialsUpdated}
        />
      )}
      <MaterialsList
        lineObject={lineObject}
        updateTrigger={updateTrigger}
        onMaterialsUpdated={onMaterialsUpdated}
      />
    </div>
  );
}

MaterialsDetails.propTypes = {
  lineObject: PropTypes.object.isRequired,
  onLineUpdated: PropTypes.func.isRequired,
  onMaterialsSaved: PropTypes.func.isRequired,
  onMaterialsUpdated: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onLinesLoad: PropTypes.func.isRequired,
};

export default MaterialsDetails;
