import axios from "axios";

export const LoginApi = async (params) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_API_ENDPOINT + "/user-login/authenticate",
      params
    );
    if (response.data && response.data.message) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Axios error:", error);
    return error;
  }
};

export const otpLoginApi = async (params) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_API_ENDPOINT + "/user-login/verify",
      params
    );
    if (response.data && response.data.message) {
      return response.data;
    }
  } catch (error) {
    console.error("Axios error:", error);
    return error;
  }
};

export const getUserData = async (authToken) => {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT + "/tenant-user/get";
    const config = {
      headers: {
        Authorization: authToken,
      },
      params: {
        faceUrl: 1,
      },
    };

    const response = await axios.get(apiUrl, config);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
