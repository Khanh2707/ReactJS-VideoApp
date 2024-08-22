import axiosClient from "./axiosClient";

const videoAPI = {
  createVideo: (data, config) => {
    const url = "/api/videos";
    return axiosClient.post(url, data, config);
  },
};

export default videoAPI;
