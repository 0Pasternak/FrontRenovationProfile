import React, { useState, useEffect } from "react";
import NavAdmin from "./../components/NavAdmin";
import BudgetTable from "../pages_components/budget/BudgetTable";
import { IoFileTrayFull } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";

import { allBudgetsAndCustomers } from "../services/ApiBudget"; // Importa la función para obtener todos los presupuestos
import "./styles/budgetList.css";
import { FaArrowCircleDown } from "react-icons/fa";

function BudgetList() {
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [isStatusMenuVisible, setIsStatusMenuVisible] = useState(false);
  const [isSortOrderMenuVisible, setIsSortOrderMenuVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgetsData = await allBudgetsAndCustomers();
        setBudgets(budgetsData);
        setFilteredBudgets(budgetsData);
        setTotalBudgets(budgetsData.length);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  useEffect(() => {
    filterBudgets();
  }, [statusFilter, sortOrder]);

  const toggleStatusMenu = () => {
    setIsStatusMenuVisible(!isStatusMenuVisible);
    setIsSortOrderMenuVisible(false);
  };

  const toggleSortOrderMenu = () => {
    setIsSortOrderMenuVisible(!isSortOrderMenuVisible);
    setIsStatusMenuVisible(false);
  };

  const handleFilterClick = (filterType, value) => {
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "sortOrder") {
      setSortOrder(value);
    }
    setIsStatusMenuVisible(false);
    setIsSortOrderMenuVisible(false);
  };

  const filterBudgets = () => {
    let updatedBudgets = [...budgets];

    if (statusFilter) {
      updatedBudgets = updatedBudgets.filter(
        (budget) => budget.status === statusFilter
      );
    }

    if (sortOrder === "asc") {
      updatedBudgets.sort((a, b) => a.id - b.id);
    } else {
      updatedBudgets.sort((a, b) => b.id - a.id);
    }

    setFilteredBudgets(updatedBudgets);
  };

  return (
    <div className="admin-profile-section">
      <NavAdmin />

      <div className="admin-customers-nav">
        <div className="admin-profile-header">
          <IoFileTrayFull className="admin-icon" />
          <p>Lista de Presupuestos</p>
        </div>
        <div className="settings-header">
          <div className="settings-header-container"></div>
        </div>
      </div>

      <div className="budget-search-container"></div>
      <div className="admin-customer-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div className="option-customer-one">
              {/* caja 1 */}
              <div className="option-customer-admin">
                <div className="add-customer-container3">
                  <IoDocumentTextSharp />
                  <span> {totalBudgets}</span>
                </div>
              </div>
              {/* caja 2 */}
              <div className="option-customer-admin">
                <div
                  className="add-customer-container2"
                  onClick={toggleSortOrderMenu}
                >
                  <FaArrowCircleDown />
                  <span>Filtro</span>
                </div>
                <div
                  className={`filter-menu ${
                    isSortOrderMenuVisible ? "show" : ""
                  }`}
                >
                  <p onClick={() => handleFilterClick("sortOrder", "desc")}>
                    Más recientes
                  </p>
                  <p onClick={() => handleFilterClick("sortOrder", "asc")}>
                    Más antiguos
                  </p>
                </div>
              </div>
            </div>
            <div className="option-customer-two">
              {/* caja 3 */}
              <div className="option-customer-admin">
                <div
                  className="add-customer-container2"
                  onClick={toggleStatusMenu}
                >
                  <FaArrowCircleDown />
                  <span>Estado</span>
                </div>
                <div
                  className={`filter-menu ${isStatusMenuVisible ? "show" : ""}`}
                >
                  <p onClick={() => handleFilterClick("status", "")}>Todos</p>
                  <p onClick={() => handleFilterClick("status", "ACTIVO")}>
                    Activo
                  </p>
                  <p onClick={() => handleFilterClick("status", "PENDIENTE")}>
                    Pendiente
                  </p>
                  <p onClick={() => handleFilterClick("status", "FINALIZADO")}>
                    Finalizado
                  </p>
                  <p onClick={() => handleFilterClick("status", "SUSPENDIDO")}>
                    Suspendido
                  </p>
                </div>
              </div>
              {/* caja 4 */}
              <div className="option-customer-admin">
                <div className="add-customer-container"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-special-admin">
          <div className="table-data-container">
            <BudgetTable budgets={filteredBudgets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetList;
