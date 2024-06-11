import api from "./Api";

export async function createCustomer(customerData) {
  try {
    //! log debug
    console.log("Hemos recibido la siguente infromacion en createCustomer: ");
    console.log(JSON.stringify(customerData, null, 2));

    const response = await api.post(
      "/api/customer/create-customer",
      customerData
    );

    //! log debug
    console.log("Estoy enviado desde createCustomer: ");
    console.log(JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    console.error("createCustomer - Error: ", error);
    throw error;
  }
}

export async function getAllCustomers() {
  try {
    const response = await api.get("/api/customer/all-customers");

    //! log debug
    console.log("Estoy recibiendo desde  getAllCustomers lo sigueinte: ");
    console.log(JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error(`Get customers error: ${error.message}`);
    }
  }
}

export async function deleteCustomer(customerId) {
  //! log debug
  console.log("Estoy recibiendo desde deleteCustomer el ID: " + customerId);

  try {
    const result = await api.delete(
      `/api/customer/delete-customer/${customerId}`
    );

    //! log debug
    console.log("Estoy enviado: ");
    console.log(JSON.stringify(result, null, 2));

    return result.data;
  } catch (error) {}
}

export async function updateCustomer(customerId, customerData) {
  try {
    //! log debug
    console.log(
      "Tengo que modificar el usuario conel id: " +
        customerId +
        " y estos son los dtos que he recibido: \n" +
        JSON.stringify(customerData, null, 2)
    );

    const response = await api.put(
      `/api/customer/update/${customerId}`,
      customerData
    );

    //! log debug
    console.log("La respuesta: \n" + JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(
        `Failed to update customer: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received for request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Error updating customer");
    }
  }
}

export async function getAllCustomersDTO() {
  try {
    const response = await api.get("/api/customer/all-customers-dto");
    console.log("Estoy recibiendo desde  getAllCustomers lo sigueinte: ");
    console.log(JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error(`Get customers error: ${error.message}`);
    }
  }
}

export async function getAllCustomersSorted(sortBy, order) {
  try {
    const response = await api.get("/api/customer/all-customers-sorted", {
      params: { sortBy, order },
    });
    console.log("Estoy recibiendo desde getAllCustomersSorted lo siguiente: ");
    console.log(JSON.stringify(response, null, 2));

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error(`Get sorted customers error: ${error.message}`);
    }
  }
}
