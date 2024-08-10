import axiosClient from "./axiosClient";

const authAPI = {
  authenticate: (data) => {
    const url = "/auth/token";
    return axiosClient.post(url, data);
  },

  logout: (data) => {
    const url = "/auth/logout";
    return axiosClient.post(url, data);
  },
};

export default authAPI;
