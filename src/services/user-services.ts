import { requestGet, requestPost, requestPut } from "./requests";
import axios from "axios";

export function useUserService(endpoint) {
  function getTenantInfo(tenant = "lift") {
    const url = operationUrl(`/user-tenant/info?tenant=${tenant}`);
    return requestGet(url, {}, true, {
      Authorization: process.env.REACT_APP_USER_API_KEY,
    });
  }

  function login(params) {
    const url = operationUrl("/user-login/authenticate");
    const param = params || {};
    return requestPost(url, param);
  }

  function acceptOTP(params) {
    const url = operationUrl("/user-login/verify");
    const param = params || {};
    return requestPost(url, param);
  }

  function getUserDetails() {
    const url = operationUrl(`/tenant-user/get`);
    return requestGet(url, { faceUrl: 1 });
  }

  function updateUser(params) {
    const url = operationUrl("/tenant-user/update");
    const param = params || {};
    return requestPut(url, param);
  }

  function googleLogin(params) {
    const url = operationUrl(`/federated-logins/google`);
    return new Promise((resolve, reject) => {
      return axios({
        url,
        method: "POST",
        data: params,
        isLoading: true,
      }).then(
        (response) => resolve(response.data && response.data.data),
        (error) => reject((error.response && error.response.data) || error)
      );
    });
  }

  function oktaLogin(params) {
    const url = operationUrl(`/federated-logins/okta`);
    return new Promise((resolve, reject) => {
      return axios({
        url,
        method: "POST",
        data: params,
        isLoading: true,
      }).then(
        (response) => resolve(response.data && response.data.data),
        (error) => reject((error.response && error.response.data) || error)
      );
    });
  }

  function azureLogin(params) {
    const url = operationUrl(`/federated-logins/azure`);
    return new Promise((resolve, reject) => {
      return axios({
        url,
        method: "POST",
        data: params,
        isLoading: true,
      }).then(
        (response) => resolve(response.data && response.data.data),
        (error) => reject((error.response && error.response.data) || error)
      );
    });
  }

  function getPrimaryAndPinSettings() {
    const url = operationUrl("/settings/TenantSettings");
    return requestGet(url, {}, false);
  }

  function fbTokenLogin(params) {
    const url = operationUrl(`/user-login/app/login`);
    return requestPost(url, params);
  }

  function logout() {
    localStorage.clear();
    localStorage.removeItem("user");
  }

  function operationUrl(append) {
    return endpoint + append;
  }

  return {
    getTenantInfo,
    login,
    acceptOTP,
    getUserDetails,
    updateUser,
    googleLogin,
    oktaLogin,
    azureLogin,
    getPrimaryAndPinSettings,
    fbTokenLogin,
    logout,
  };
}
