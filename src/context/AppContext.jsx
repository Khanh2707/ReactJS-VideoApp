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
  const [notificationVideos, setNotificationVideos] = useState([]);
  const [
    amountHistoryNotificationVideoFromTimeToTime,
    setAmountHistoryNotificationVideoFromTimeToTime,
  ] = useState(0);

  const getAllNotificationVideo = (idChannel, page, size) => {
    videoAPI
      .getAllNotificationVideo(idChannel, page, size)
      .then((response) => {
        setNotificationVideos(response.result.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countHistoryNotificationVideoFromTimeToTime = (idChannel) => {
    videoAPI
      .countHistoryNotificationVideoFromTimeToTime(idChannel)
      .then((response) => {
        setAmountHistoryNotificationVideoFromTimeToTime(response.result);
      })
      .catch((error) => {
        console.log(error);
      });
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
              getAllNotificationVideo(myAccount.channel.idChannel, 0, 6);
              countHistoryNotificationVideoFromTimeToTime(
                myAccount.channel.idChannel
              );
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
        notificationVideos,
        getAllNotificationVideo,
        amountHistoryNotificationVideoFromTimeToTime,
        countHistoryNotificationVideoFromTimeToTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
