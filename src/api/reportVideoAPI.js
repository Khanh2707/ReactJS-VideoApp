import axiosClient from "./axiosClient";

const reportVideoAPI = {
  getAllreportVideos: (
    propertySort,
    optionSort,
    page,
    size,
    idTypeReportVideo
  ) => {
    const url = `/api/report_videos/${propertySort}/${optionSort}/pageable/${page}/${size}/typeReportVideo/${idTypeReportVideo}`;
    return axiosClient.get(url);
  },

  createReportVideo: (data) => {
    const url = `/api/report_videos`;
    return axiosClient.post(url, data);
  },
};

export default reportVideoAPI;
