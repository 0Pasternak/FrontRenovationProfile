import api from "./Api";

export const getHeader = () => {  
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`User registration error: ${error.message}`);
        }
    }
}


export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.response.data);
    } else {
      throw new Error(`Login error: ${error.message}`);
    }
  }
}






export async function getUserProfile(userId) {
    try {
        const response = await api.get(`/api/user/profile/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`Get user profile error: ${error.message}`);
        }
    }
}

export async function deleteUser(email) {
    try {
        const response = await api.delete(`/api/user/delete/${email}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`Delete user error: ${error.message}`);
        }
    }
}

export async function getUser(email) {
    try {
        const response = await api.get(`/api/user/${email}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`Get user error: ${error.message}`);
        }
    }
}
