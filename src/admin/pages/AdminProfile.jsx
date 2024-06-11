import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import NavAdmin from "./../components/NavAdmin";
import "./styles/adminProfile.css";

const AdminProfile = () => {
  return (
    <div className="admin-profile-section">
      <NavAdmin />

      <div className="admin-profile-header">
        <MdAdminPanelSettings className="admin-icon" />
        <p>Panel de administrador</p>
      </div>
      <div className="admin-profile-container">
        <div className="admin-profile-main">
          <div className="options-stats-container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
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
