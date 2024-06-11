import React, { useEffect, useState } from "react";

import {
  getAllCustomersDTO,
  getAllCustomersSorted,
} from "./../services/ApiCustomer";

import "./styles/customersList.css";

import NavAdmin from "./../components/NavAdmin";

// iconos:
import { FaUsers } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaArrowCircleDown } from "react-icons/fa";

// componentes:
import CustomerDetails from "./../pages_components/Customers/CustomerDetails";
import CreateCustomer from "./../pages_components/Customers/CreateCustomer";
import EditCustomer from "./../pages_components/Customers/EditCustomer";
import CreateBudget from "./../pages_components/budget/CreateBudget";
import CustomersTable from "./../pages_components/Customers/CustomersTable";

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const [customerCount, setCustomerCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleEditCustomer = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(true);
  };

  const handleCreateBudget = () => {
    setIsModalVisible(false);
    setIsBudgetModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsModalCreateVisible(false);
  };

  const handleCloseCreateBudget = () => {
    setIsBudgetModalVisible(false);
  };

  const handleCreateCustomerButton = () => {
    setIsModalCreateVisible(true);
  };

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomersDTO();
      setCustomers(data);
      setCustomerCount(data.length);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchSortedCustomers = async (sortBy, order) => {
    try {
      const data = await getAllCustomersSorted(sortBy, order);
      setCustomers(data);
      setCustomerCount(data.length);
    } catch (error) {
      console.error("Error fetching sorted customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const reloadCustomers = async () => {
    try {
      const data = await getAllCustomersDTO();
      setCustomers(data);
      setCustomerCount(data.length);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleFilterClick = (sortBy, order) => {
    setSortBy(sortBy);
    setOrder(order);
    fetchSortedCustomers(sortBy, order);
    setIsMenuVisible(false);
  };

  return (
    <div className="admin-profile-section">
      <NavAdmin />

      <div className="admin-custoemrs-nav">
        <div className="admin-profile-header">
          <FaUsers className="admin-icon" />
          <p>Lista de Clientes</p>
        </div>
        <div className="settings-header">
          <div className="settings-header-container"></div>
        </div>
      </div>

      <div className="admin-customer-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div className="option-customer-one">
              {/* caja 1 */}
              <div className="option-customer-admin">
                <div className="add-customer-container3">
                  <FaUsers />
                  <span>{customerCount}</span>
                </div>
              </div>
              {/* caja 2 */}
              <div className="option-customer-admin"></div>
            </div>
            <div className="option-customer-two">
              {/* caja 3 */}
              <div className="option-customer-admin">
                <div className="add-customer-container2" onClick={toggleMenu}>
                  <FaArrowCircleDown />
                  <span>Filtro</span>
                </div>
                <div className={`filter-menu ${isMenuVisible ? "show" : ""}`}>
                  <p onClick={() => handleFilterClick("id", "desc")}>
                    Más recientes
                  </p>
                  <p onClick={() => handleFilterClick("id", "asc")}>
                    Más antiguos
                  </p>
                  <p onClick={() => handleFilterClick("budgets", "desc")}>
                    Cantidad de presupuestos
                  </p>
                </div>
              </div>
              {/* caja 4 */}
              <div className="option-customer-admin">
                <div className="add-customer-container">
                  <IoMdAdd
                    className="add-icon"
                    onClick={handleCreateCustomerButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-special-admin">
          <div className="table-data-container">
            <CustomersTable
              customers={customers}
              handleSelectCustomer={handleSelectCustomer}
            />
            {isModalVisible && selectedCustomer && (
              <CustomerDetails
                customer={selectedCustomer}
                onClose={handleCloseModal}
                onCustomerDeleted={reloadCustomers}
                onEditCustomer={handleEditCustomer}
                onCreateBudget={handleCreateBudget}
              />
            )}
            {isEditModalVisible && selectedCustomer && (
              <EditCustomer
                customer={selectedCustomer || {}}
                onClose={() => setIsEditModalVisible(false)}
                onCustomerUpdated={reloadCustomers}
              />
            )}

            {isModalCreateVisible && (
              <CreateCustomer
                onClose={handleCloseModal}
                onCustomerCreated={reloadCustomers}
              />
            )}
            {isBudgetModalVisible && (
              <CreateBudget
                onClose={handleCloseCreateBudget}
                customer={selectedCustomer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CustomersList.propTypes = {};

export default CustomersList;
