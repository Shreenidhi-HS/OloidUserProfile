import axios from "axios";

export const addFace = async (config) => {
    try {
      const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT + "/tenant-user/faces";
      const response = await axios.post(apiUrl, config);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
};

export const removeFace = async (config) => {
    try {
      const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT + "/tenant-user/faces/remove";
      const response = await axios.put(apiUrl, config);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
};