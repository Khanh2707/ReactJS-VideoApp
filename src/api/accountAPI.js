import axiosClient from "./axiosClient";

const accountAPI = {
  myAccount: () => {
    const url = "/api/accounts/myAccount";
    return axiosClient.get(url);
  },

  createAccount: (data) => {
    const url = "/api/accounts";
    return axiosClient.post(url, data);
  },
};

export default accountAPI;
