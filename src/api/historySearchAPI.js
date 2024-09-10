import axiosClient from "./axiosClient";

const historySearchAPI = {
  getAllHistorySearchByChannel: (idChannel, page, size) => {
    const url = `/api/history_searched/${idChannel}/${page}/${size}`;
    return axiosClient.get(url);
  },

  createHistorySearch: (data) => {
    const url = `/api/history_searched`;
    return axiosClient.post(url, data);
  },

  deleteHistorySearch: (idHistorySearch) => {
    const url = `/api/history_searched/${idHistorySearch}`;
    return axiosClient.delete(url);
  },
};

export default historySearchAPI;
