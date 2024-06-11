export const getHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("Token not found in localStorage.");
    return {
      "Content-Type": "application/json",
    };
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
