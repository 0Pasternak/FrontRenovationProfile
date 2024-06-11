import api from "./Api";

export async function fetchTranslations() {
  try {
    const response = await api.get("/api/pageController/translator");
    const data = response.data;

    // Guardar los JSONs en el frontend
    localStorage.setItem("translations_es", JSON.stringify(data.es));
    localStorage.setItem("translations_en", JSON.stringify(data.en));

    console.log("Translations fetched and stored:", data);
  } catch (error) {
    console.error("Failed to fetch translations:", error);
  }
}

export async function getImg(query) {
  try {
    const response = await api.get(`/api/pageController/getImg?query=${query}`);
    const data = response.data;

    // Guardar los JSONs en el frontend
    localStorage.setItem("translations", JSON.stringify(data));

    console.log("Translations fetched and stored:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch translations:", error);
    return null;
  }
}

export async function getText(query) {
  try {
    const response = await api.get(
      `/api/pageController/getText?query=${query}`
    );
    const data = response.data;

    // Guardar los JSONs en el frontend
    localStorage.setItem("translations", JSON.stringify(data));

    console.log("Translations fetched and stored:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch translations:", error);
    return null;
  }
}

export const updateImg = async (id, data) => {
  try {
    const response = await api.put(`/api/pageController/updateImg`, data, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update translation:", error);
    throw error;
  }
};
