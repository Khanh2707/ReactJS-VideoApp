import { createContext, useEffect, useState } from "react";
import accountAPI from "../api/accountAPI";
import videoAPI from "../api/videoAPI";
import { Backdrop, CircularProgress } from "@mui/material";
import Stomp from "stompjs";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [myAccount, setMyAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stompClient, setStompClient] = useState(null);
  const [mergedNotifications, setMergedNotification] = useState([]);
  const [amountMergedNotification, setAmountMergedNotification] = useState(0);
  const [selectedChip, setSelectedChip] = useState(0);

  const fetchNotifications = async (idChannel, page, size) => {
    try {
      const [
        notificationVideosResponse,
        notificationCommentVideosResponse,
        notificationCommentCommentsResponse,
      ] = await Promise.all([
        videoAPI.getAllNotificationVideo(idChannel, page, size),
        videoAPI.getAllNotificationCommentVideo(idChannel, page, size),
        videoAPI.getAllNotificationCommentComment(idChannel, page, size),
      ]);

      const notificationVideos =
        notificationVideosResponse.result.content || [];
      const notificationCommentVideos =
        notificationCommentVideosResponse.result.content || [];
      const notificationCommentComments =
        notificationCommentCommentsResponse.result.content || [];

      const mergedNotifications = [
        ...notificationVideos.map((item) => ({
          ...item,
          type: "video",
          dateTime: item.video.dateTimeCreate,
        })),
        ...notificationCommentVideos.map((item) => ({
          ...item,
          type: "commentVideo",
          dateTime: item.commentVideo.dateTimeComment,
        })),
        ...notificationCommentComments.map((item) => ({
          ...item,
          type: "commentComment",
          dateTime: item.commentInComment.dateTimeComment,
        })),
      ];

      mergedNotifications.sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      );

      setMergedNotification(mergedNotifications);

      console.log(mergedNotifications);
    } catch (error) {}
  };

  const fetchAmountNotification = async (idChannel) => {
    try {
      const [
        amountNotificationVideoResponse,
        amountNotificationCommentVideoResponse,
        amountNotificationCommentCommentResponse,
      ] = await Promise.all([
        videoAPI.countHistoryNotificationVideoFromTimeToTime(idChannel),
        videoAPI.countHistoryNotificationCommentVideoFromTimeToTime(idChannel),
        videoAPI.countHistoryNotificationCommentCommentFromTimeToTime(
          idChannel
        ),
      ]);

      const amountNotificationVideo =
        amountNotificationVideoResponse?.result || 0;
      const amountNotificationCommentVideo =
        amountNotificationCommentVideoResponse?.result || 0;
      const amountNotificationCommentComment =
        amountNotificationCommentCommentResponse?.result || 0;

      setAmountMergedNotification(
        amountNotificationVideo +
          amountNotificationCommentVideo +
          amountNotificationCommentComment
      );
    } catch (error) {}
  };

  const getMyAccount = () => {
    accountAPI
      .myAccount()
      .then((response) => {
        setMyAccount(response.result);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getMyAccount();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame);

        const subscription = stompClient.subscribe(
          `/notification`,
          (payload) => {
            if (myAccount?.channel?.idChannel) {
              fetchNotifications(myAccount.channel.idChannel, 0, 6);
              fetchAmountNotification(myAccount.channel.idChannel);
            }
          }
        );

        setStompClient(stompClient);

        return () => {
          subscription.unsubscribe();
          stompClient.disconnect(() => {
            console.log("Disconnected from WebSocket");
          });
        };
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [myAccount]);

  const sendNotification = () => {
    if (stompClient && stompClient.connected) {
      stompClient.send(
        "/app/notification",
        {},
        JSON.stringify({ receiver: 0 })
      );
    } else {
      console.error("STOMP client is not connected");
    }
  };

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{ bgcolor: "primary.main", transitionDuration: "0ms" }}
      >
        <CircularProgress sx={{ color: "text.primary" }} size={100} />
      </Backdrop>
    );
  }

  return (
    <AppContext.Provider
      value={{
        getMyAccount,
        myAccount,
        setMyAccount,
        sendNotification,
        mergedNotifications,
        fetchNotifications,
        amountMergedNotification,
        fetchAmountNotification,
        selectedChip,
        setSelectedChip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
