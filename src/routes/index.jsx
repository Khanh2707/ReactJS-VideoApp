import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Error from "../pages/Error";
import WatchedVideo from "../pages/WatchedVideo";
import AuthProvider from "../context/AuthProvider";
import DefaultLayout from "../components/layout/DefaultLayout";
import MyChannel from "../pages/MyChannel";
import ChannelEditing from "../pages/ChannelEditing";
import Register from "../pages/Register";
import ChannelEditingImages from "../components/ChannelEditingImages";
import ChannelEditingDetails from "../components/ChannelEditingDetails";
import ChannelEditingVideos from "../components/ChannelEditingVideos";
import DetailVideo from "../pages/DetailVideo";
import AdminLayout from "../components/layout/AdminLayout";
import AuthGoogle from "../pages/auth/AuthGoogle";
import { ThemeContext } from "../context/ThemeContext";
import ResetPassword from "../pages/ResetPassword";
import accountAPI from "../api/accountAPI";
import videoAPI from "../api/videoAPI";
import channelAPI from "../api/channelAPI";

const AuthLayout = () => {
  const { themeMode } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color-scheme",
      themeMode === "dark" ? "dark" : "light"
    );
  }, [themeMode]);

  return (
    <AuthProvider>
      <style>{`:root { color-scheme: var(--theme-color-scheme); }`}</style>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthGoogle />,
        path: "/auth/google",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <ResetPassword />,
        path: "/reset-password",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: (
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            ),
            path: "/",
            loader: async () => {
              const videos = await videoAPI.getAll();

              return { videos };
            },
          },
          {
            element: (
              <DefaultLayout hideSidebar>
                <DetailVideo />
              </DefaultLayout>
            ),
            path: "/watch/:idVideo",
            loader: async ({ params }) => {
              const video = await videoAPI.getById(params.idVideo);

              const amountSub = await channelAPI.countSubChannel(
                video.result.channel.idChannel
              );

              const amountLike = await videoAPI.countLikeVideo(
                video.result.idVideo
              );

              const videos = await videoAPI.getAll();

              return { video, amountSub, amountLike, videos };
            },
          },
          {
            element: (
              <DefaultLayout>
                <MyChannel />
              </DefaultLayout>
            ),
            path: "/:nameUniqueChannel",
            loader: async ({ params }) => {
              const account = await accountAPI.getByChannelNameUnique(
                params.nameUniqueChannel
              );

              const videos = await videoAPI.getAllByChannelNameUnique(
                params.nameUniqueChannel
              );

              const amountSub = await channelAPI.countSubChannel(
                account.result.channel.idChannel
              );

              return { account, videos, amountSub };
            },
          },
          {
            element: (
              <DefaultLayout>
                <WatchedVideo />
              </DefaultLayout>
            ),
            path: "/feed/history",
          },
          {
            element: (
              <DefaultLayout>
                <ChannelEditing />
              </DefaultLayout>
            ),
            path: "/channel/editing",
            children: [
              {
                path: "",
                element: <Navigate to='images' replace />,
              },
              {
                element: <ChannelEditingImages />,
                path: "images",
              },
              {
                element: <ChannelEditingDetails />,
                path: "details",
              },
              {
                element: <ChannelEditingVideos />,
                path: "videos",
              },
            ],
          },
          {
            element: <AdminLayout />,
            path: "dashboard",
          },
        ],
      },
    ],
  },
]);
