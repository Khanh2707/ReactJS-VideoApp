import axiosClient from "./axiosClient";

const accountAPI = {
  myAccount: () => {
    const url = "/api/accounts/myAccount";
    return axiosClient.get(url);
  },

  getByChannelNameUnique: (value) => {
    const url = `/api/accounts/by/channel/name_unique/${value}`;
    return axiosClient.get(url);
  },

  getAllSearchAccountByChannelName: (
    keyword,
    propertySort,
    optionSort,
    page,
    size,
    idRole
  ) => {
    const url = `/api/accounts/search/all/account/${keyword}/${propertySort}/${optionSort}/pageable/${page}/${size}/role/${idRole}`;
    return axiosClient.get(url);
  },

  getAllAccount: (propertySort, optionSort, page, size, idRole) => {
    const url = `/api/accounts/${propertySort}/${optionSort}/pageable/${page}/${size}/role/${idRole}`;
    return axiosClient.get(url);
  },

  createAccount: (data) => {
    const url = "/api/accounts";
    return axiosClient.post(url, data);
  },

  updateRoleAccount: (username, data) => {
    const url = `api/accounts/role/${username}`;
    return axiosClient.put(url, data);
  },

  changePasswordAccount: (id, data) => {
    const url = `/api/accounts/password/${id}`;
    return axiosClient.put(url, data);
  },
};

export default accountAPI;
