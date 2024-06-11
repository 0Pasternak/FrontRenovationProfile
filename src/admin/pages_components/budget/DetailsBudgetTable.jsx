import React, { useState, useEffect, useCallback } from "react";
import CardModel from "./../../components/CardModel";
import MaterialsDetails from "./../Materials/MaterialsDetails";
import { getMaterials } from "./../../services/ApiMaterial";
// import { deleteLine } from "../../services/ApiBudgetLine";
import "./styles/detailsBudgetTable.css";

function DetailsBudgetTable({ budgetObject, onLinesLoad, lines }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [materials, setMaterials] = useState({});

  const loadMaterials = useCallback(async (lineId) => {
    try {
      const materialsFromAPI = await getMaterials(lineId);
      setMaterials((prevMaterials) => ({
        ...prevMaterials,
        [lineId]: materialsFromAPI,
      }));
    } catch (error) {
      console.error(`Error loading materials for line ${lineId}:`, error);
    }
  }, []);

  useEffect(() => {
    lines.forEach((line) => {
      if (!materials[line.budgetTableLineId]) {
        loadMaterials(line.budgetTableLineId);
      }
    });
  }, [lines, loadMaterials, materials]);

  const handleRowClick = (line) => {
    setSelectedLine(line);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLine(null);
  };

  const handleLineUpdated = () => {
    onLinesLoad();
    handleCloseModal();
  };

  const handleMaterialsSaved = (lineId) => {
    loadMaterials(lineId);
  };

  const renderMaterialInfo = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (!line.lineType) return "-";
    if (line.lineType === "SINGLE") {
      return lineMaterials.length > 0 ? lineMaterials[0].materialName : "-";
    } else if (line.lineType === "SUMMARY") {
      return lineMaterials
        .map((mat) => `${mat.materialName} x ${mat.quantity}`)
        .join(", ");
    }
    return "-";
  };

  const renderUnitPrice = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      return `$${lineMaterials[0].unitPrice.toFixed(2)}`;
    }
    return line.unitPrice ? `$${line.unitPrice.toFixed(2)}` : "-";
  };

  const renderTotalUnits = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      return `${lineMaterials[0].quantity}`;
    } else if (line.lineType === "SUMMARY" && lineMaterials.length > 0) {
      const totalUnits = lineMaterials.reduce(
        (sum, material) => sum + material.quantity,
        0
      );
      return `${totalUnits}`;
    }
    return "-";
  };

  const renderTotalPrice = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    let totalPrice = 0;

    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      totalPrice = lineMaterials[0].totalPrice;
    } else if (line.lineType === "SUMMARY" && lineMaterials.length > 0) {
      totalPrice = lineMaterials.reduce(
        (sum, material) => sum + material.totalPrice,
        0
      );
    }

    // Añadir el cálculo del precio total basado en horas y precio por hora
    const hoursCost = (line.totalHours || 0) * (line.hourPrice || 0);
    totalPrice += hoursCost;

    return `$${totalPrice.toFixed(2)}`;
  };

  // const handleDeleteLine = async (lineId) => {
  //   try {
  //     await deleteLine(lineId);
  //     onLinesLoad();
  //     handleCloseModal();
  //   } catch (error) {
  //     alert(`Error al eliminar la línea: ${error.message}`);
  //   }
  // };

  const handleMaterialsUpdated = () => {
    if (selectedLine) {
      loadMaterials(selectedLine.budgetTableLineId);
    }
  };

  return (
    <>
      <table className="budget-details-table">
        <thead className="budget-details-header">
          <tr className="budget-details-header-row">
            <th>Nombre</th>
            <th>Precio Unidad</th>
            <th>Unidades Necesarias</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody className="budget-details-body">
          {Array.isArray(lines) &&
            lines.map((line) => (
              <tr
                className="budget-details-body-row"
                key={line.budgetTableLineId}
                onClick={() => handleRowClick(line)}
              >
                <td>{renderMaterialInfo(line)}</td>
                <td>{renderUnitPrice(line)}</td>
                <td>{renderTotalUnits(line)}</td>
                <td>{renderTotalPrice(line)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CardModel onClose={handleCloseModal}>
          <MaterialsDetails
            lineObject={selectedLine}
            onLineUpdated={handleLineUpdated}
            onMaterialsSaved={() =>
              handleMaterialsSaved(selectedLine.budgetTableLineId)
            }
            onMaterialsUpdated={handleMaterialsUpdated}
            onCloseModal={() => {
              handleCloseModal();
              onLinesLoad(); // Actualizar la tabla al cerrar el modal
            }}
            onLinesLoad={onLinesLoad} // Pasar la función onLinesLoad
          />
        </CardModel>
      )}
    </>
  );
}

export default DetailsBudgetTable;
