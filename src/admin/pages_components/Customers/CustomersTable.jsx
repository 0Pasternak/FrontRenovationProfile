import React, { useState } from "react";
import PropTypes from "prop-types";

import "./styles/customerTable.css";

function CustomersTable({ customers, handleSelectCustomer }) {
  const [currentPage, setCurrentPage] = useState(0);
  const customersPerPage = 15;
  const pageCount = Math.ceil(customers.length / customersPerPage);

  if (!customers) {
    return <div>No customers available.</div>;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    let maxPageNumberVisible = Math.min(pageCount, currentPage + 3);
    let minPageNumberVisible = Math.max(0, maxPageNumberVisible - 4);

    for (let i = minPageNumberVisible; i < maxPageNumberVisible; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  return (
    <>
      <table className="customers-table">
        <thead className="customer-table-head">
          <tr className="customer-table-head-section">
            <th className="admin-customer-title">Nombre</th>
            <th className="admin-customer-title">Correo</th>
            <th className="admin-customer-title">Teléfono</th>
            <th className="admin-customer-title direction">Direccion</th>
          </tr>
        </thead>
        <tbody className="customer-table-body">
          {currentCustomers.map((customer) => (
            <tr
              key={customer.id}
              className="customer-table-row"
              onClick={() => handleSelectCustomer(customer)}
              style={{ cursor: "pointer" }} // Añadimos un cursor de pointer para indicar que es clicable
            >
              <td className="admin-customer-info">
                {customer.firstName + " " + customer.lastName}
              </td>
              <td className="admin-customer-info">{customer.email}</td>
              <td className="admin-customer-info">{customer.phone}</td>
              <td className="admin-customer-info direction">
                {customer.address}
              </td>
              {/* Eliminamos la columna de opciones */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
}

CustomersTable.propTypes = {
  customers: PropTypes.array.isRequired,
  handleSelectCustomer: PropTypes.func.isRequired,
};

export default CustomersTable;
