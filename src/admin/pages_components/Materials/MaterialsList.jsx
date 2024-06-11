import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  getMaterials,
  deleteMaterial,
  updateMaterial,
} from "./../../services/ApiMaterial";
import "./styles/materialList.css";

import { MdOutlineEdit, MdSave } from "react-icons/md";
import { FaTrash, FaTimes } from "react-icons/fa";

function MaterialsList({ lineObject, updateTrigger, onMaterialsUpdated }) {
  const [materials, setMaterials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState({});

  const loadMaterials = useCallback(async () => {
    try {
      const materialsFromAPI = await getMaterials(lineObject.budgetTableLineId);
      setMaterials(materialsFromAPI);
    } catch (error) {
      console.error("Error loading materials", error);
    }
  }, [lineObject.budgetTableLineId]);

  useEffect(() => {
    loadMaterials();
  }, [lineObject, updateTrigger, loadMaterials]);

  const handleEditMaterial = (index) => {
    setEditingIndex(index);
    setEditingMaterial({ ...materials[index] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMaterial((prev) => {
      const updatedMaterial = { ...prev, [name]: value };

      if (updatedMaterial.type === "materialM2") {
        const sizeUnitMaterial = parseFloat(
          name === "sizeUnitMaterial" ? value : updatedMaterial.sizeUnitMaterial
        );
        const areaToCover = parseFloat(
          name === "areaToCover" ? value : updatedMaterial.areaToCover
        );
        const unitPrice = parseFloat(
          name === "unitPrice" ? value : updatedMaterial.unitPrice
        );

        if (
          !isNaN(sizeUnitMaterial) &&
          !isNaN(areaToCover) &&
          !isNaN(unitPrice)
        ) {
          const quantity = Math.ceil(areaToCover / sizeUnitMaterial);
          const totalPrice = quantity * unitPrice;

          updatedMaterial.quantity = quantity.toString();
          updatedMaterial.totalPrice = totalPrice.toString();
        } else {
          updatedMaterial.quantity = "";
          updatedMaterial.totalPrice = "";
        }
      } else if (updatedMaterial.type === "materialCantidad") {
        const quantity = parseFloat(
          name === "quantity" ? value : updatedMaterial.quantity
        );
        const unitPrice = parseFloat(
          name === "unitPrice" ? value : updatedMaterial.unitPrice
        );

        if (!isNaN(quantity) && !isNaN(unitPrice)) {
          const totalPrice = quantity * unitPrice;
          updatedMaterial.totalPrice = totalPrice.toString();
        } else {
          updatedMaterial.totalPrice = "";
        }
      }

      return updatedMaterial;
    });

    if (
      name === "unitPrice" ||
      name === "sizeUnitMaterial" ||
      name === "areaToCover"
    ) {
      setEditingMaterial((prev) => {
        const sizeUnitMaterial =
          name === "sizeUnitMaterial"
            ? parseFloat(value)
            : parseFloat(prev.sizeUnitMaterial);
        const areaToCover =
          name === "areaToCover"
            ? parseFloat(value)
            : parseFloat(prev.areaToCover);
        const unitPrice =
          name === "unitPrice" ? parseFloat(value) : parseFloat(prev.unitPrice);

        if (
          !isNaN(sizeUnitMaterial) &&
          !isNaN(areaToCover) &&
          !isNaN(unitPrice)
        ) {
          const quantity = Math.ceil(areaToCover / sizeUnitMaterial);
          const totalPrice = quantity * unitPrice;

          return {
            ...prev,
            sizeUnitMaterial: sizeUnitMaterial.toString(),
            areaToCover: areaToCover.toString(),
            quantity: quantity.toString(),
            totalPrice: totalPrice.toString(),
          };
        } else {
          return {
            ...prev,
            [name]: value,
            quantity: "",
            totalPrice: "",
          };
        }
      });
    }
  };

  const handleSaveMaterial = async (materialId) => {
    try {
      await updateMaterial(materialId, editingMaterial);
      setEditingIndex(null);
      await loadMaterials();
      if (onMaterialsUpdated) {
        onMaterialsUpdated();
      }
    } catch (error) {
      console.error("Failed to update material", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingMaterial({});
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      await deleteMaterial(materialId);
      await loadMaterials();
      if (onMaterialsUpdated) {
        onMaterialsUpdated();
      }
    } catch (error) {
      console.error("Failed to delete material", error);
    }
  };

  const renderMaterialsTable = () => {
    if (!materials || materials.length === 0) {
      return <p>No hay materiales</p>;
    }

    return (
      <table className="materials-table">
        <thead>
          <tr>
            <th>Material</th>
            <th>Precio</th>
            <th>m²</th>
            <th>Unidades</th>
            <th>Área</th>
            <th>Total</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr
              key={material.id || `${material.materialName}-${index}`}
              className={editingIndex === index ? "editing" : ""}
            >
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      name="materialName"
                      value={editingMaterial.materialName}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </td>
                  <td>
                    <input
                      name="unitPrice"
                      value={editingMaterial.unitPrice}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      name="sizeUnitMaterial"
                      value={editingMaterial.sizeUnitMaterial}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      name="quantity"
                      value={editingMaterial.quantity}
                      type="number"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      name="areaToCover"
                      value={editingMaterial.areaToCover}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </td>
                  <td>
                    <input
                      name="totalPrice"
                      value={editingMaterial.totalPrice}
                      type="number"
                      disabled
                    />
                  </td>
                  <td className="edit-material-options">
                    <button
                      className="save-button-edit"
                      onClick={() => handleSaveMaterial(material.materialId)}
                    >
                      <MdSave />
                    </button>
                    <button
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{material.materialName}</td>
                  <td>{material.unitPrice}</td>
                  <td>{material.sizeUnitMaterial}</td>
                  <td>{material.quantity}</td>
                  <td>{material.areaToCover}</td>
                  <td>{material.totalPrice}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditMaterial(index)}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMaterial(material.materialId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="materials-list-container">{renderMaterialsTable()}</div>
  );
}

MaterialsList.propTypes = {
  lineObject: PropTypes.object.isRequired,
  updateTrigger: PropTypes.bool,
  onMaterialsUpdated: PropTypes.func,
};

export default MaterialsList;
