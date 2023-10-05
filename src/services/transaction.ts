import axios from "axios";

export const getTransaction = async () => {
    try {
      const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT + "/tenant-user/transactions?CapturedFaceUrl=true&ReturnAllFields=true";
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  };