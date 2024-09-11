import axiosClient from "./axiosClient";

const videoAPI = {
  downloadVideo: (params, config) => {
    const url = `/api/videos/download/${params}`;
    return axiosClient.get(url, config);
  },

  countCommentByCommentVideo: (idCommentVideo) => {
    const url = `/api/comment_comments/count/by/comment_video/${idCommentVideo}`;
    return axiosClient.get(url);
  },

  countCommentVideosByVideo: (idVideo) => {
    const url = `/api/comment_videos/count/by/video/${idVideo}`;
    return axiosClient.get(url);
  },

  countHistoryNotificationCommentCommentFromTimeToTime: (idChannel) => {
    const url = `/api/comment_comments/count/history_notification_comment_comment/from_time_to_time/${idChannel}`;
    return axiosClient.get(url);
  },

  countHistoryNotificationCommentVideoFromTimeToTime: (idChannel) => {
    const url = `/api/comment_videos/count/history_notification_comment_video/from_time_to_time/${idChannel}`;
    return axiosClient.get(url);
  },

  countHistoryNotificationVideoFromTimeToTime: (idChannel) => {
    const url = `/api/videos/count/history_notification_video/from_time_to_time/${idChannel}`;
    return axiosClient.get(url);
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

  getAllCommentComment: (idCommentVideo, option) => {
    const url = `/api/comment_comments/by/comment_video/${idCommentVideo}/${option}`;
    return axiosClient.get(url);
  },

  getAllCommentVideo: (idVideo, option) => {
    const url = `/api/comment_videos/by/video/${idVideo}/${option}`;
    return axiosClient.get(url);
  },

  getAllNotificationCommentComment: (idChannel, page, size) => {
    const url = `/api/comment_comments/all/notification/comment_comment/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllNotificationCommentVideo: (idChannel, page, size) => {
    const url = `/api/comment_videos/all/notification/comment_video/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllNotificationVideo: (idChannel, page, size) => {
    const url = `/api/videos/all/notification/video/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllSearchVideoChannelWatchedByTitle: (idChannel, keyword, page, size) => {
    const url = `/api/videos/search/all/video/channel/watched/${idChannel}/${keyword}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllVideoChannelWatched: (idChannel, page, size) => {
    const url = `/api/videos/all/video/channel/watched/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllSearchVideoChannelLikedByTitle: (idChannel, keyword, page, size) => {
    const url = `/api/videos/search/all/video/channel/liked/${idChannel}/${keyword}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllVideoChannelLiked: (idChannel, page, size) => {
    const url = `/api/videos/all/video/channel/liked/${idChannel}/pageable/${page}/${size}`;
    return axiosClient.get(url);
  },

  getAllSearchVideoChannelByTitle: (nameUnique, keyword, page, size) => {
    const url = `/api/videos/search/all/video/channel/${nameUnique}/${keyword}/pageable/${page}/${size}`;
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

  createHistoryWatchVideo: (data) => {
    const url = `/api/videos/watch`;
    return axiosClient.post(url, data);
  },

  createChannelLikeVideo: (data) => {
    const url = `/api/videos/like`;
    return axiosClient.post(url, data);
  },

  createCommentComment: (data) => {
    const url = `/api/comment_comments`;
    return axiosClient.post(url, data);
  },

  createCommentVideo: (data) => {
    const url = `/api/comment_videos`;
    return axiosClient.post(url, data);
  },

  updateCheckHistoryNotificationCommentComment: (idChannel) => {
    const url = `/api/comment_comments/check/history/notification/comment_comment/${idChannel}`;
    return axiosClient.post(url);
  },

  updateCheckHistoryNotificationCommentVideo: (idChannel) => {
    const url = `/api/comment_videos/check/history/notification/comment_video/${idChannel}`;
    return axiosClient.post(url);
  },

  updateCheckHistoryNotificationVideo: (idChannel) => {
    const url = `/api/videos/check/history/notification/video/${idChannel}`;
    return axiosClient.post(url);
  },

  createVideo: (data, config) => {
    const url = "/api/videos";
    return axiosClient.post(url, data, config);
  },

  updateIsCheckHistoryNotificationCommentComment: (
    idChannel,
    idNotificationCommentComment,
    data
  ) => {
    const url = `/api/comment_comments/is_check/history/notification/comment_comment/${idChannel}/${idNotificationCommentComment}`;
    return axiosClient.put(url, data);
  },

  updateIsCheckHistoryNotificationCommentVideo: (
    idChannel,
    idNotificationCommentVideo,
    data
  ) => {
    const url = `/api/comment_videos/is_check/history/notification/comment_video/${idChannel}/${idNotificationCommentVideo}`;
    return axiosClient.put(url, data);
  },

  updateIsCheckHistoryNotificationVideo: (
    idChannel,
    idNotificationVideo,
    data
  ) => {
    const url = `/api/videos/is_check/history/notification/video/${idChannel}/${idNotificationVideo}`;
    return axiosClient.put(url, data);
  },

  updateCommentCommentContent: (idCommentInComment, data) => {
    const url = `/api/comment_comments/content/${idCommentInComment}`;
    return axiosClient.put(url, data);
  },

  updateCommentVideoContent: (idCommentVideo, data) => {
    const url = `/api/comment_videos/content/${idCommentVideo}`;
    return axiosClient.put(url, data);
  },

  updateViewVideo: (idVideo) => {
    const url = `/api/videos/view/${idVideo}`;
    return axiosClient.put(url);
  },

  deleteVideo: (idVideo) => {
    const url = `/api/videos/${idVideo}`;
    return axiosClient.delete(url);
  },

  deleteCommentVideo: (idCommentVideo) => {
    const url = `/api/comment_videos/${idCommentVideo}`;
    return axiosClient.delete(url);
  },

  deleteCommentComment: (idCommentInComment) => {
    const url = `/api/comment_comments/${idCommentInComment}`;
    return axiosClient.delete(url);
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
