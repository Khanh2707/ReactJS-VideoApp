import axiosClient from "./axiosClient";

const videoAPI = {
  downloadVideo: (params, config) => {
    const url = `/api/videos/download/${params}`;
    return axiosClient.get(url, config);
  },

  countLikeVideo: (params) => {
    const url = `/api/videos/count/like/${params}`;
    return axiosClient.get(url);
  },

  countAllByChannelNameUnique: (param) => {
    const url = `/api/videos/count/all/by/channel/name_unique/${param}`;
    return axiosClient.get(url);
  },

  checkChannelLikeVideo: (idChannel, idVideo) => {
    const url = `/api/videos/is/like/${idChannel}/${idVideo}`;
    return axiosClient.get(url);
  },

  getById: (params) => {
    const url = `/api/videos/${params}`;
    return axiosClient.get(url);
  },

  getAllNotificationVideo: (params) => {
    const url = `/api/videos/all/notification/video/${params}`;
    return axiosClient.get(url);
  },

  getAllVideoChannelWatched: (idChannel, page, size) => {
    const url = `/api/videos/all/video/channel/watched/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllVideoChannelLiked: (idChannel, page, size) => {
    const url = `/api/videos/all/video/channel/liked/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllByChannelNameUnique: (nameUniqueChannel, page, size) => {
    const url = `/api/videos/all/by/channel/name_unique/${nameUniqueChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAll: (page, size) => {
    const url = `/api/videos/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllByCategory: (idCategory, page, size) => {
    const url = `/api/videos/all/by/category/${idCategory}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  createVideo: (data, config) => {
    const url = "/api/videos";
    return axiosClient.post(url, data, config);
  },

  createChannelLikeVideo: (data) => {
    const url = `/api/videos/like`;
    return axiosClient.post(url, data);
  },

  createHistoryWatchVideo: (data) => {
    const url = `/api/videos/watch`;
    return axiosClient.post(url, data);
  },

  deleteHistoryLikeVideo: (idChannel, idVideo) => {
    const url = `/api/videos/like/${idChannel}/${idVideo}`;
    return axiosClient.delete(url);
  },

  deleteAllVideoWatched: (params) => {
    const url = `/api/videos/all/watch/${params}`;
    return axiosClient.delete(url);
  },
};

export default videoAPI;
