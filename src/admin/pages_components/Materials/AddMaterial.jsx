import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addMaterial } from "./../../services/ApiMaterial";

import "./styles/addMaterial.css";

function AddMaterial({
  lineObject,
  onMaterialsSaved,
  addMode,
  lineType,
  onMaterialsSaved2,
  onMaterialsUpdated,
}) {
  const [materials, setMaterials] = useState([]);
  const [materialType, setMaterialType] = useState("");
  const [canAddMore, setCanAddMore] = useState(
    lineType === "SUMMARY" ||
      (lineType === "SINGLE" && lineObject.materials.length === 0)
  );
  const [showSelect, setShowSelect] = useState(canAddMore);

  useEffect(() => {
    setCanAddMore(
      lineType === "SUMMARY" ||
        (lineType === "SINGLE" && lineObject.materials.length === 0)
    );
    setShowSelect(
      lineType === "SUMMARY" ||
        (lineType === "SINGLE" && lineObject.materials.length === 0)
    );
  }, [lineObject.materials, lineType]);

  useEffect(() => {
    if (onMaterialsUpdated) {
      onMaterialsUpdated();
    }
  }, [materials]);

  const handleInputChange = (index, event) => {
    const newMaterials = materials.map((material, i) => {
      if (i === index) {
        const updatedMaterial = {
          ...material,
          [event.target.name]: event.target.value,
        };

        if (material.type === "materialM2") {
          const { sizeUnitMaterial, spaceToCover, unitPrice } = updatedMaterial;
          const newSizeUnitMaterial =
            event.target.name === "sizeUnitMaterial"
              ? parseFloat(event.target.value)
              : parseFloat(sizeUnitMaterial);
          const newSpaceToCover =
            event.target.name === "spaceToCover"
              ? parseFloat(event.target.value)
              : parseFloat(spaceToCover);
          const newUnitPrice =
            event.target.name === "unitPrice"
              ? parseFloat(event.target.value)
              : parseFloat(unitPrice);

          if (
            !isNaN(newSizeUnitMaterial) &&
            !isNaN(newSpaceToCover) &&
            !isNaN(newUnitPrice)
          ) {
            const quantity = Math.ceil(newSpaceToCover / newSizeUnitMaterial);
            const totalPrice = quantity * newUnitPrice;

            Object.assign(updatedMaterial, {
              quantity: quantity.toString(),
              totalPrice: totalPrice.toString(),
              areaToCover: newSpaceToCover.toString(),
            });
          } else {
            updatedMaterial.quantity = "";
            updatedMaterial.totalPrice = "";
          }
        } else if (material.type === "materialCantidad") {
          const quantity = parseFloat(updatedMaterial.quantity);
          const unitPrice = parseFloat(updatedMaterial.unitPrice);

          if (!isNaN(quantity) && !isNaN(unitPrice)) {
            const totalPrice = quantity * unitPrice;
            updatedMaterial.totalPrice = totalPrice.toString();
          } else {
            updatedMaterial.totalPrice = "";
          }
        }

        return updatedMaterial;
      }
      return material;
    });

    setMaterials(newMaterials);
  };

  const renderFormFields = (material, index) => {
    switch (material.type) {
      case "materialM2":
        return (
          <div className="form-row" key={index}>
            <input
              type="text"
              name="materialName"
              placeholder="Nombre del Material"
              value={material.materialName}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="unitPrice"
              placeholder="Precio por Unidad"
              value={material.unitPrice}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="sizeUnitMaterial"
              placeholder="m2 de una unidad"
              value={material.sizeUnitMaterial}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="spaceToCover"
              placeholder="Espacio a cubrir (m2)"
              value={material.spaceToCover}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Unidades necesarias"
              value={material.quantity}
              disabled
            />
            <input
              type="number"
              name="totalPrice"
              placeholder="Precio Total"
              value={material.totalPrice}
              disabled
            />
          </div>
        );
      case "materialCantidad":
        return (
          <div className="form-row" key={index}>
            <input
              type="text"
              name="materialName"
              placeholder="Nombre del Material"
              value={material.materialName}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="unitPrice"
              placeholder="Precio por Unidad"
              value={material.unitPrice}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Cantidad"
              value={material.quantity}
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              type="number"
              name="totalPrice"
              placeholder="Precio Total"
              value={material.totalPrice}
              disabled
            />
          </div>
        );
      default:
        return <p>Selecciona un tipo de material</p>;
    }
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        materials.map((material) =>
          addMaterial({
            ...material,
            budgetTableLine: lineObject,
          })
        )
      );

      setMaterials([]);
      onMaterialsSaved();
      onMaterialsSaved2();

      // Actualizar el estado del padre sin cerrar el modal
      if (lineType === "SINGLE") {
        onMaterialsUpdated();
        setShowSelect(false);
      }
    } catch (error) {
      console.error("Hubo un error al guardar los materiales", error);
      alert("Error al guardar materiales.");
    }
  };

  useEffect(() => {
    if (materialType && canAddMore) {
      const newMaterialTemplate = {
        materialName: "",
        unitPrice: "",
        quantity: "",
        type: materialType,
      };

      if (materialType === "materialM2") {
        Object.assign(newMaterialTemplate, {
          sizeUnitMaterial: "",
          spaceToCover: "",
          quantity: "",
          totalPrice: "",
        });
      } else if (materialType === "materialCantidad") {
        Object.assign(newMaterialTemplate, {
          totalPrice: "",
        });
      }

      setMaterials([newMaterialTemplate]);
    }
  }, [materialType]);

  return (
    <div className="select-type-material-container">
      {showSelect && (
        <select
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
          disabled={!canAddMore}
          className="select-type-material"
        >
          <option value="">Seleccione tipo de material</option>
          <option value="materialM2">Material m2</option>
          <option value="materialCantidad">Material Cantidad</option>
          <option value="materialLitros">Material Litros</option>
          <option value="materialVolumen">Material Volumen</option>
        </select>
      )}
      {materials.map((material, index) => renderFormFields(material, index))}
      {materials.length > 0 && (
        <button className="save-button" onClick={handleSave}>
          Guardar Materiales
        </button>
      )}
    </div>
  );
}

AddMaterial.propTypes = {
  lineObject: PropTypes.object.isRequired,
  onMaterialsSaved: PropTypes.func.isRequired,
  addMode: PropTypes.oneOf(["single", "summary"]).isRequired,
  lineType: PropTypes.oneOf(["SINGLE", "SUMMARY"]).isRequired,
  onMaterialsSaved2: PropTypes.func,
  onMaterialsUpdated: PropTypes.func.isRequired,
};

export default AddMaterial;
