import React, { useState } from "react";
import PropTypes from "prop-types";
import { createCustomer } from "./../../services/ApiCustomer";
import CardModel from "./../../components/CardModel";

import "./styles/createCustomer.css";

function CreateCustomer({ onClose, onCustomerCreated }) {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phone2: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customerData);
      onClose();
      if (onCustomerCreated) {
        onCustomerCreated();
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <CardModel onClose={onClose}>
      <form onSubmit={handleSubmit} className="customer-form">
        <h2>Crear Cliente</h2>
        <div>
          <label htmlFor="firstName">Nombre*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono*</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone2">Teléfono Alternativo</label>
          <input
            type="text"
            id="phone2"
            name="phone2"
            value={customerData.phone2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Cliente</button>
      </form>
    </CardModel>
  );
}

CreateCustomer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCustomerCreated: PropTypes.func,
};

export default CreateCustomer;
