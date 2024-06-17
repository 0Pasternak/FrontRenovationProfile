import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import "jspdf-autotable";
import foto from "./../../assets/img/logo.png";
import { getMaterials } from "./../services/ApiMaterial";
import { getLines } from "../services/ApiBudgetLine";

import { FaRegFilePdf } from "react-icons/fa";

const PdfConvert = ({ budget }) => {
  const [lines, setLines] = useState([]);
  const [materials, setMaterials] = useState({});

  useEffect(() => {
    const loadLinesAndMaterials = async () => {
      const linesFromAPI = await getLines(budget.id);
      setLines(linesFromAPI);

      const materialsData = {};
      for (let line of linesFromAPI) {
        const materialsFromAPI = await getMaterials(line.budgetTableLineId);
        materialsData[line.budgetTableLineId] = materialsFromAPI;
      }
      setMaterials(materialsData);
    };

    loadLinesAndMaterials();
  }, [budget]);

  const renderMaterialInfo = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (!line.lineType) return "-";
    if (line.lineType === "SINGLE") {
      return lineMaterials.length > 0 ? lineMaterials[0].materialName : "-";
    } else if (line.lineType === "SUMMARY") {
      return lineMaterials
        .map((mat) => `${mat.materialName} x ${mat.quantity}`)
        .join(", ");
    }
    return "-";
  };

  const renderUnitPrice = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      return `€${lineMaterials[0].unitPrice.toFixed(2)}`;
    }
    return line.unitPrice ? `€${line.unitPrice.toFixed(2)}` : "-";
  };

  const renderTotalUnits = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      return `${lineMaterials[0].quantity}`;
    } else if (line.lineType === "SUMMARY" && lineMaterials.length > 0) {
      const totalUnits = lineMaterials.reduce(
        (sum, material) => sum + material.quantity,
        0
      );
      return `${totalUnits}`;
    }
    return "-";
  };

  const renderTotalPrice = (line) => {
    const lineMaterials = materials[line.budgetTableLineId] || [];
    if (line.lineType === "SINGLE" && lineMaterials.length > 0) {
      return `€${lineMaterials[0].totalPrice.toFixed(2)}`;
    } else if (line.lineType === "SUMMARY" && lineMaterials.length > 0) {
      const totalPrice = lineMaterials.reduce(
        (sum, material) => sum + material.totalPrice,
        0
      );
      return `€${totalPrice.toFixed(2)}`;
    }
    return "-";
  };

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const logoWidth = 15;
    const logoHeight = 15;
    pdf.addImage(foto, "PNG", 10, 10, logoWidth, logoHeight);

    pdf.setFontSize(16);
    pdf.text("Presupuesto de Reforma", 30, 15);

    pdf.setFontSize(12);
    pdf.text(budget.budgetName, 30, 22);

    const clientNameStr = `${budget.customerName} ${budget.customerLastName}`;
    pdf.setFontSize(12);
    pdf.text(`Cliente: ${clientNameStr}`, 30, 30);

    let startY = 40;

    const columns = [
      { header: "Materiales", dataKey: "materials" },
      { header: "Precio Unidad", dataKey: "unitPrice" },
      { header: "Unidades Necesarias", dataKey: "requiredUnits" },
      { header: "Precio Total", dataKey: "totalPrice" },
    ];

    const rows = lines.map((line) => ({
      materials: renderMaterialInfo(line),
      unitPrice: renderUnitPrice(line),
      requiredUnits: renderTotalUnits(line),
      totalPrice: renderTotalPrice(line),
    }));

    const rowHeight = 10;
    const pageHeight = pdf.internal.pageSize.height;
    const maxRowsPerPage = Math.floor((pageHeight - startY) / rowHeight) - 1;

    while (rows.length < maxRowsPerPage - 3) {
      rows.push({
        materials: "",
        unitPrice: "",
        requiredUnits: "",
        totalPrice: "",
      });
    }

    const totalPrice = lines.reduce(
      (sum, line) =>
        sum + (parseFloat(renderTotalPrice(line).replace("€", "")) || 0),
      0
    );

    pdf.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
      startY,
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
      margin: { top: startY },
      tableWidth: "auto",
    });

    pdf.autoTable({
      body: [
        [
          {
            content: "Total",
            colSpan: 3,
            styles: { halign: "left", fillColor: [220, 220, 220] },
          },
          {
            content: `€${totalPrice.toFixed(2)}`,
            styles: { halign: "right", fillColor: [255, 255, 255] },
          },
        ],
      ],
      startY: pdf.autoTable.previous.finalY + 2,
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
    });

    pdf.save("budget-table.pdf");
  };

  return <FaRegFilePdf onClick={generatePDF} />;
};

PdfConvert.propTypes = {
  budget: PropTypes.object.isRequired,
};

export default PdfConvert;
