import axiosClient from "./axiosClient";

const channelAPI = {
  countSubChannel: (params) => {
    const url = `/api/channels/count/sub/${params}`;
    return axiosClient.get(url);
  },

  checkChannelSubChannel: (idChannel1, idChannel2) => {
    const url = `/api/channels/is/sub/${idChannel1}/${idChannel2}`;
    return axiosClient.get(url);
  },

  createChannelSubChannel: (data) => {
    const url = `/api/channels/sub`;
    return axiosClient.post(url, data);
  },

  updateChannelAvatar: (params, data, config) => {
    const url = `/api/channels/avatar/${params}`;
    return axiosClient.put(url, data, config);
  },

  deleteChannelSubChannel: (idChannel1, idChannel2) => {
    const url = `/api/channels/sub/${idChannel1}/${idChannel2}`;
    return axiosClient.delete(url);
  },
};

export default channelAPI;
