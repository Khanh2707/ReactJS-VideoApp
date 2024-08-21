import axiosClient from "./axiosClient";

const categoryVideoAPI = {
  getAllCategory: () => {
    const url = "/api/categories";
    return axiosClient.get(url);
  },
};

export default categoryVideoAPI;
