import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/budgetTable.css";

function BudgetTable({ budgets }) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const customersPerPage = 15;

  const pageCount = Math.ceil(budgets.length / customersPerPage);
  const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentBudgets = budgets.slice(
    indexOfFirstCustomer,
    indexOfFirstCustomer + customersPerPage
  );

  const handleSelectBudget = (budget) => {
    navigate(`/budget/${budget.id}`, { state: { budget } });
  };

  const getPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <table className="budget-list-table">
        <thead className="budget-table-head">
          <tr className="budget-table-head-row">
            <th>Nombre Presupuesto</th>
            <th>Nombre Cliente</th>
            <th>Fecha Creación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody className="budget-table-body">
          {currentBudgets.map((budget, index) => (
            <tr
              key={budget.id}
              className={`budget-table-body-row ${
                index % 2 === 0 ? "even" : "odd"
              }`}
              onClick={() => handleSelectBudget(budget)}
              style={{ cursor: "pointer" }}
            >
              <td>{budget.budgetName}</td>
              <td>
                {budget.customerName} {budget.customerLastName}
              </td>
              <td>{budget.creationDate}</td>
              <td>
                <span className={`status-box ${budget.status.toLowerCase()}`}>
                  {budget.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Anterior
        </button>
        {getPageNumbers().map((number) => (
          <button
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <button
          disabled={currentPage === pageCount - 1}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
          }
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default BudgetTable;
