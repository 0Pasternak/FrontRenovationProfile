import React from "react";
import { MdAdminPanelSettings, MdPeople, MdAttachMoney } from "react-icons/md";
import NavAdmin from "./../components/NavAdmin";
import "./styles/adminProfile.css";
import { NavLink } from "react-router-dom";

import { FaHouse } from "react-icons/fa6";

import { MdOutlineEdit, MdSave } from "react-icons/md";

const AdminProfile = () => {
  return (
    <div className="admin-profile-section">
      <NavAdmin />

      <div className="admin-custoemrs-nav">
        <div className="admin-profile-header">
          <MdAdminPanelSettings className="admin-icon" />
          <span>Panel de elaboración de Presupuesto</span>
        </div>
        <div className="settings-header">
          <div className="settings-header-container"></div>
        </div>
      </div>

      <div className="admin-profile-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div className="option-customer-one">
              <NavLink to="/customers-list">
                <div className="option-customer-admin-unique">
                  <div className="admin-unique">
                    <MdPeople></MdPeople>
                  </div>
                </div>
              </NavLink>
              <NavLink to="/budget-list">
                <div className="option-customer-admin-unique">
                  <MdAttachMoney></MdAttachMoney>
                </div>
              </NavLink>
            </div>
            <div className="option-customer-two">
              <NavLink to="/page-editor">
                <div className="option-customer-admin-unique">
                  <MdOutlineEdit />
                </div>
              </NavLink>
              <NavLink to="/">
                <div className="option-customer-admin-unique">
                  <FaHouse />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="section-special-admin">
          <div className="table-data-container"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
