import axiosClient from "./axiosClient";

const accountAPI = {
  myAccount: () => {
    const url = "/api/accounts/myAccount";
    return axiosClient.get(url);
  },
};

export default accountAPI;