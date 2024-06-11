import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import NavAdmin from "./../components/NavAdmin";
import DetailsBudgetTable from "../pages_components/budget/DetailsBudgetTable";
import { addBudgetLine, getLines } from "./../services/ApiBudgetLine";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import PdfConvert from "../utils/PdfConvert"; // Importamos el componente
import { updateBudget } from "./../services/ApiBudget";
import { getMaterials } from "./../services/ApiMaterial";
import { MdEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

import "./styles/budget.css";

const Budget = () => {
  const location = useLocation();
  const budgetFromLocation = location.state?.budget;

  const [budget, setBudget] = useState(budgetFromLocation);
  const [lines, setLines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableBudget, setEditableBudget] = useState({
    ...budgetFromLocation,
    creationDate: budgetFromLocation.creationDate.split("T")[0],
    endDate: budgetFromLocation.endDate
      ? budgetFromLocation.endDate.split("T")[0]
      : "",
  });

  const completeName =
    budgetFromLocation.customerName + " " + budgetFromLocation.customerLastName;

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

  const loadLines = useCallback(async () => {
    if (budget) {
      try {
        setLoading(true);
        const linesFromAPI = await getLines(budget.id);
        setLines(linesFromAPI);
      } catch (err) {
        setError("Error loading lines");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [budget]);

  useEffect(() => {
    loadLines();
  }, [loadLines]);

  if (!budget) return <div>No se ha podido cargar el presupuesto</div>;

  const handleAddLine = async (e) => {
    e.preventDefault();
    const budgetLineDetails = {
      budget: budget,
    };

    try {
      await addBudgetLine(budgetLineDetails);
      await loadLines();
    } catch (error) {
      console.error("Error creating line", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const formattedBudget = {
      ...editableBudget,
      creationDate: new Date(editableBudget.creationDate)
        .toISOString()
        .split("T")[0],
      endDate: editableBudget.endDate
        ? new Date(editableBudget.endDate).toISOString().split("T")[0]
        : "",
    };

    try {
      const updatedBudget = await updateBudget(budget.id, formattedBudget);
      setBudget(updatedBudget);
      setEditableBudget({
        ...updatedBudget,
        creationDate: updatedBudget.creationDate.split("T")[0],
        endDate: updatedBudget.endDate
          ? updatedBudget.endDate.split("T")[0]
          : "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating budget", error);
    }
  };

  return (
    <div className="admin-profile-section">
      <NavAdmin />

      <div className="admin-custoemrs-nav">
        <div className="admin-profile-header">
          <IoDocumentTextSharp className="admin-icon" />
          <span>Panel de elaboración de Presupuesto</span>
        </div>
        <div className="settings-header">
          <div className="settings-header-container"></div>
        </div>
      </div>

      <div className="admin-customer-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div className="option-customer-one">
              <div className="option-customer-admin">
                <div className="add-customer-container">
                  <PdfConvert budget={budget} />
                </div>
              </div>
              <div className="option-customer-admin"></div>
            </div>
            <div className="option-customer-two">
              <div className="option-customer-admin">
                <div className="add-customer-container2"></div>
              </div>
              <div className="option-customer-admin">
                <div className="add-customer-container">
                  <IoMdAdd className="add-icon" onClick={handleAddLine} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="budget-sumary-container">
          <div className="budget-title-editor">
            <div>
              <p>Detalles del Presupuesto</p>
            </div>
            <div className="button-budget-container">
              {isEditing && (
                <IoIosSave
                  onClick={handleSaveClick}
                  className="budget-button-save"
                >
                  Guardar
                </IoIosSave>
              )}
              <MdEdit
                onClick={handleEditClick}
                className="budget-button-edit"
              />
            </div>
          </div>
          {isEditing ? (
            <div className="sumary-sub-container">
              <div className="section-sumary">
                <p>
                  <strong>Nombre Presupuesto:</strong>
                  <input
                    type="text"
                    name="budgetName"
                    value={editableBudget.budgetName}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Cliente:</strong>
                  <span>
                    {budget.customerName} {budget.customerLastName}
                  </span>
                </p>
                <p>
                  <strong>Fecha de Creación:</strong>
                  <input
                    type="date"
                    name="creationDate"
                    value={editableBudget.creationDate}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Fecha de Finalización:</strong>
                  <input
                    type="date"
                    name="endDate"
                    value={editableBudget.endDate || ""}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Estado:</strong>
                  <select
                    name="status"
                    value={editableBudget.status}
                    onChange={handleInputChange}
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="ACTIVO">Activo</option>
                    <option value="FINALIZADO">Finalizado</option>
                    <option value="SUSPENDIDO">Suspendido</option>
                  </select>
                </p>
              </div>
              <div className="section-anotation">
                <p>Anotaciones:</p>
                <textarea
                  name="anotaciones"
                  className="anotaciones-area"
                  value={editableBudget.anotaciones}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="sumary-sub-container">
              <div className="section-sumary">
                <p>
                  <strong>Nombre Presupuesto:</strong> {budget.budgetName}
                </p>
                <p>
                  <strong>Cliente:</strong> {completeName}
                </p>
                <p>
                  <strong>Fecha de Creación:</strong>{" "}
                  {budget.creationDate.split("T")[0]}
                </p>
                <p>
                  <strong>Fecha de Finalización:</strong>{" "}
                  {budget.endDate ? budget.endDate.split("T")[0] : "N/A"}
                </p>
                <p>
                  <strong>Estado:</strong> {budget.status}
                </p>
              </div>
              <div className="section-anotation">
                <div>
                  <strong>Anotaciones:</strong>
                  <p className="anotaciones-area">{budget.anotaciones}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="section-special-admin">
          <div className="table-data-container">
            <div className="main-content">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <DetailsBudgetTable
                  budgetObject={budget}
                  onLinesLoad={loadLines}
                  lines={lines}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
