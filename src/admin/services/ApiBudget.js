import api from "./Api";

export async function createBudget(budgetData) {
  //! log debug
  console.log(
    "EStoy en createBudget y he recibido la sigueinte infromacion: \n" +
      JSON.stringify(budgetData, null, 2)
  );

  try {
    const response = await api.post("/api/budget/create-budget", budgetData);
    //! log debug
    console.log(
      "Acabo de enviar la infroamcion en createBudget: \n" +
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
}

export async function getAllBudgets() {
  //! log debug
  console.log("Se han solicitado todos los presupuestos usando getAllBudgets");

  try {
    const result = await api.get("/api/budget/all-budgets");

    //! log debug
    console.log(
      "Lista devuelta exitosamente de todos los presupuestos: \n" +
        JSON.stringify(result, null, 2)
    );

    return result.data;
  } catch (error) {
    if (error.result) {
      // console.log("error" + error.result.data)
    }
  }
}

export async function allBudgetsAndCustomers() {
  //! log debug
  console.log(
    "Se han solicitado todos los presupuestos usando allBudgetsAndCustomers"
  );
  try {
    const result = await api.get("/api/budget/all-budgets-detailed");

    //! log debug
    console.log(
      "Lista devuelta exitosamente de todos los presupuestos: \n" +
        JSON.stringify(result, null, 2)
    );

    return result.data;
  } catch (error) {
    if (error.result) {
      console.log("error" + error.result.data);
    }
  }
}

export async function filterBudgets(status, sortOrder) {
  try {
    const result = await api.get("/api/budget/filter-budgets", {
      params: { status, sortOrder },
    });
    return result.data;
  } catch (error) {
    if (error.result) {
      console.log("error" + error.result.data);
    }
  }
}

export async function updateBudget(id, updatedBudget) {
  try {
    console.log("eee so aui");
    const response = await api.patch(
      `/api/budget/update-budget/${id}`,
      updatedBudget
    );

    console.log("Estoy recibiendo desde  getAllCustomers lo sigueinte: ");
    console.log(JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(
        `Failed to update budget: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received for request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error", error.message);
      throw new Error("Error updating budget");
    }
  }
}
