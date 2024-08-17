import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

let isRefreshing = false;
let refreshSubscribers = []; // Enhanced subscriber management

const processQueue = (error, token = null) => {
  refreshSubscribers.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshSubscribers = []; // Clear the queue
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          refreshSubscribers.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("accessToken");
      localStorage.removeItem("accessToken");

      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_APP_API_URL}/auth/refreshToken`, {
            token: refreshToken,
          })
          .then(({ data }) => {
            const newToken = data.result.token;
            localStorage.setItem("accessToken", newToken);
            axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            resolve(axiosClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
