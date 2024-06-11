import React, { useState } from "react";
import PropTypes from "prop-types";
import CardModel from "./../../components/CardModel";

import { createBudget } from "./../../services/ApiBudget";

import "./styles/createBudget.css";

function CreateBudget({ onClose, customer }) {
  const [budgetData, setBudgetData] = useState({
    budgetName: "",
    creationDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBudgetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { ...budgetData, customer: customer };
    try {
      const response = await createBudget(dataToSend);
      onClose();
    } catch (error) {
      console.error("Error creando el presupuesto:", error);
    }
  };

  return (
    <CardModel onClose={onClose} width={50} height={60}>
      <form onSubmit={handleSubmit} className="budget-form">
        <h2>Crear Presupuesto</h2>
        <div>
          <label htmlFor="budgetName">Nombre del Presupuesto</label>
          <input
            type="text"
            id="budgetName"
            name="budgetName"
            value={budgetData.budgetName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Creación</label>
          <input
            type="date"
            name="creationDate"
            value={budgetData.creationDate}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="endDate">Fecha de Fin</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={budgetData.endDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar Presupuesto</button>
      </form>
    </CardModel>
  );
}

CreateBudget.propTypes = {
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};

export default CreateBudget;
