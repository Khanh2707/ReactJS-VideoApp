import axiosClient from "./axiosClient";

const videoAPI = {
  getAllByChannelNameUnique: (value) => {
    const url = `/api/videos/all/by/channel/name_unique/${value}`;
    return axiosClient.get(url);
  },

  countAllByChannelNameUnique: (value) => {
    const url = `/api/videos/count/all/by/channel/name_unique/${value}`;
    return axiosClient.get(url);
  },

  createVideo: (data, config) => {
    const url = "/api/videos";
    return axiosClient.post(url, data, config);
  },
};

export default videoAPI;
