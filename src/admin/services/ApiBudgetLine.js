import api from "./Api";

export const addBudgetLine = async (budgetLineDetails) => {
  //! log debug
  console.log(
    "Solicitada la adicion de una nuva linea al presupuesto: \n" +
      JSON.stringify(budgetLineDetails, null, 2)
  );

  try {
    const response = await api.post("/api/budget/new-line", budgetLineDetails);

    //! log debug
    console.log(
      "Respuesta a la solicitudad de la nueva linea: \n" +
        JSON.stringify(response, null, 2)
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(
        `Failed to create customer: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received for request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error", error.message);
      throw new Error("Error creating customer");
    }
  }
};


export async function getLines(budgetId) {
  //! log debug
  console.log(
    "Solicitada Para que aparezcan todas las lineas del presupuesto con id " +
      budgetId
  );

  try {
    const result = await api.get(`/api/budget/lines/${budgetId}`);

    //! log debug
    console.log(
      "Lista de todas las líneas IMPORTANTE: \n" +
        JSON.stringify(result, null, 2)
    );

    return result.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al obtener las líneas:", error.response.data);
      console.error("Estado del error:", error.response.status);
      console.error("Headers del error:", error.response.headers);
      throw new Error(
        `Failed to get lines: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      throw new Error("Error in request setup");
    }
  }
}


export const updateLine = async (lineId, lineDetails) => {
  //! log debug
  console.log(
    "estoy en updateLine, id de la linea es:" +
      lineId +
      " \n" +
      JSON.stringify(lineDetails, null, 2)
  );
  try {
    const response = await api.put(`/api/budget/line/${lineId}`, lineDetails);
    
    //! log debug
    console.log(
      "la respuesta de  updateLine, es: \n" + JSON.stringify(response, null, 2)
    );
    return response.data;
  } catch (error) {
    // Manejo de errores similar al de addMaterial
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(
        `Failed to update material: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received for request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error", error.message);
      throw new Error("Error updating material");
    }
  }
};

export const updateLineType = async (lineId, lineType) => {
  console.log("estoy en updateLineType, con el id" + lineId + ": \n" + JSON.stringify(lineType, null, 2));
  try {
    const response = await api.put(
      `/api/budget/line/${lineId}/update-type`,
      { lineType }, // Enviamos el lineType dentro de un objeto
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data; // Devolvemos directamente los datos recibidos
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(`Failed to update line type: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      console.error("No response received for request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error", error.message);
      throw new Error("Error updating line type");
    }
  }
};




export async function deleteLine(lineId) {

  //! log debug
  console.log(
    "ELIMINO LINEA deleteLine:" + lineId +" \n"
  );
  try {
    const response = await api.delete(`/api/budget/line/${lineId}`);

      //! log debug
  console.log(
    "ELIMINO LINEA deleteLine: \n" +
      JSON.stringify(response, null, 2)
  );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error deleting line:", error.response.data);
      throw new Error(`Failed to delete line: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error in request setup");
    }
  }
}

