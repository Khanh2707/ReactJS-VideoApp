import axiosClient from "./axiosClient";

const roleAPI = {
  getAllRole: () => {
    const url = "/api/roles";
    return axiosClient.get(url);
  },
};

export default roleAPI;
