import axiosClient from "./axiosClient";

const emailAPI = {
  verifyEmail: (data) => {
    const url = "/api/verify_email";
    return axiosClient.post(url, data);
  },
};

export default emailAPI;
