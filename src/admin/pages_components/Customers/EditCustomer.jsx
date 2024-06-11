import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CardModel from "./../../components/CardModel";
import { updateCustomer } from "./../../services/ApiCustomer";

import "./styles/editCustomer.css";

function EditCustomer({ customer, onClose, onCustomerUpdated }) {
  const initialCustomerData = {
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    phone: customer.phone || "",
    phone2: customer.phone2 || "",
    address: customer.address || "",
  };

  const [customerData, setCustomerData] = useState(initialCustomerData);

  useEffect(() => {
    setCustomerData({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      email: customer.email || "",
      phone: customer.phone || "",
      phone2: customer.phone2 || "",
      address: customer.address || "",
    });
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(customer.id, customerData);
      onClose();
      if (onCustomerUpdated) {
        onCustomerUpdated();
      }
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  return (
    <CardModel onClose={onClose} width={50} height={60}>
      <form onSubmit={handleSubmit} className="form-edit-customer">
        <h2>Editar Cliente</h2>
        <div className="customer-information-part">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="customer-information-part">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="customer-information-part">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </div>
        <div className="customer-information-part">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="customer-information-part">
          <label htmlFor="phone2">Teléfono 2</label>
          <input
            type="text"
            id="phone2"
            name="phone2"
            value={customerData.phone2}
            onChange={handleChange}
          />
        </div>
        <div className="customer-information-part">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>
        <div className="buttons-actions">
          <button type="submit">Actualizar Cliente</button>
        </div>
      </form>
    </CardModel>
  );
}

EditCustomer.propTypes = {
  customer: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onCustomerUpdated: PropTypes.func,
};

export default EditCustomer;
