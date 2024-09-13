import axiosClient from "./axiosClient";

const typeReportVideoAPI = {
  getAllTypeReportVideos: (page, size) => {
    const url = `/api/type_report_videos/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },
};

export default typeReportVideoAPI;