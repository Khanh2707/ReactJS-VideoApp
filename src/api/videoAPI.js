import axiosClient from "./axiosClient";

const videoAPI = {
  getById: (param) => {
    const url = `/api/videos/${param}`;
    return axiosClient.get(url);
  },

  getAllByChannelNameUnique: (param) => {
    const url = `/api/videos/all/by/channel/name_unique/${param}`;
    return axiosClient.get(url);
  },

  countAllByChannelNameUnique: (param) => {
    const url = `/api/videos/count/all/by/channel/name_unique/${param}`;
    return axiosClient.get(url);
  },

  createVideo: (data, config) => {
    const url = "/api/videos";
    return axiosClient.post(url, data, config);
  },
};

export default videoAPI;
