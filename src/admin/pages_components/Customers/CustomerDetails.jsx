// CustomerDetails.js
import React from "react";
import PropTypes from "prop-types";

import CardModel from "./../../components/CardModel";
import { deleteCustomer } from "./../../services/ApiCustomer";

import "./styles/customerDetails.css";

function CustomerDetails({
  customer,
  onClose,
  onCustomerDeleted,
  onEditCustomer,
  onCreateBudget,
}) {
  if (!customer) return null;

  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomer(customer.id);
      // console.log(`Cliente eliminado: ${customer.id}`);
      onClose();
      if (onCustomerDeleted) onCustomerDeleted();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  return (
    <CardModel onClose={onClose}>
      <div className="customer-details">
        <div className="customer-info-details">
          <p className="customer-name-title">
            Cliente: {customer.name} {customer.lastName}
          </p>
          <div className="others-details-customer">
            <p><span>Telefono:</span> {customer.phone}</p>
            {customer.phone2 && <p><span>telefono 2:</span> {customer.phone2}</p>}
            <p><span>Email:</span> {customer.email}</p>
            <p><span>Direccion:</span> {customer.address}</p>
          </div>
        </div>

        <div className="buttons-actions">
          <button
            onClick={() => {
              onClose();
              onCreateBudget();
            }}
          >
            Crear Presupuesto
          </button>

          <button
            onClick={() => {
              onClose();
              onEditCustomer();
            }}
          >
            Editar datos de cliente
          </button>

          <button onClick={handleDeleteCustomer}>Eliminar Cliente</button>
        </div>
      </div>
    </CardModel>
  );
}

CustomerDetails.propTypes = {
  customer: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onCustomerDeleted: PropTypes.func,
  onEditCustomer: PropTypes.func.isRequired,
  onCreateBudget: PropTypes.func.isRequired,
};

export default CustomerDetails;
