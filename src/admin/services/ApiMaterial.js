import api from "./Api";

export const addMaterial = async (material) => {

    try {
        const response = await api.post('/api/budget/add-material', material)

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);
            throw new Error(`Failed to create customer: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
            console.error("No response received for request:", error.request);
            throw new Error('No response from server');
        } else {
            console.error("Error", error.message);
            throw new Error('Error creating customer');
        }

    }
}

export const updateMaterial = async (materialId, materialDetails) => {
    try {
        const response = await api.put(`/api/budget/material/${materialId}`, materialDetails);
        return response.data;
    } catch (error) {
        // Manejo de errores similar al de addMaterial
        if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);
            throw new Error(`Failed to update material: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
            console.error("No response received for request:", error.request);
            throw new Error('No response from server');
        } else {
            console.error("Error", error.message);
            throw new Error('Error updating material');
        }
    }
}



export async function getMaterials(LineId) {
    try {
        const result = await api.get(`/api/budget/material/${LineId}`);
        return result.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];  // Devuelve un array vacío si no hay materiales
        }
        throw error;  // Propaga otros tipos de errores
    }
}


export async function deleteMaterial(materialId) {
    // console.log("API call to delete material with ID:", materialId); // Additional debugging
    try {
        const result = await api.delete(`/api/budget/material/delete-material/${materialId}`);
        return result.data;
    } catch (error) {
        console.error("Error deleting material:", error.response ? error.response.data : error.message);
        throw error; // It's better to throw the error to handle it in the component
    }
}



