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
import LikedVideo from "../pages/LikedVideo";
import ResultSearch from "../pages/ResultSearch";
import DataGridAllVideo from "../components/admin/DataGridAllVideo";
import DataGridAllAccount from "../components/admin/DataGridAllAccount";
import DataReport from "../components/admin/DataReport";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";

const AuthLayout = () => {
  const { themeMode } = useContext(ThemeContext);
  const {
    openSnackbar,
    contentAlert,
    stateAlert,
    verticalSnackbar,
    horizontalSnackbar,
    handleCloseSnackbar,
  } = useContext(SnackbarContext);

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
      <Snackbar
        anchorOrigin={{
          vertical: verticalSnackbar,
          horizontal: horizontalSnackbar,
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={stateAlert}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {contentAlert}
        </Alert>
      </Snackbar>
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
        element: (
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        ),
        path: "/",
      },
      {
        element: (
          <DefaultLayout hideSidebar>
            <DetailVideo />
          </DefaultLayout>
        ),
        path: "/watch/:idVideo",
        loader: async ({}) => {
          const videos = await videoAPI.getAllVideo(
            "dateTimeCreate",
            "desc",
            0,
            8,
            0
          );

          return { videos };
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

          const amountSub = await channelAPI.countSubChannel(
            account.result.channel.idChannel
          );

          return { account, amountSub };
        },
      },
      {
        element: (
          <DefaultLayout>
            <WatchedVideo />
          </DefaultLayout>
        ),
        path: "/history/watch",
      },
      {
        element: (
          <DefaultLayout>
            <LikedVideo />
          </DefaultLayout>
        ),
        path: "/history/like",
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
        element: (
          <DefaultLayout>
            <ResultSearch />
          </DefaultLayout>
        ),
        path: "/results",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            children: [
              {
                path: "",
                element: <Navigate to='videos' replace />,
              },
              {
                element: (
                  <AdminLayout>
                    <DataGridAllVideo />
                  </AdminLayout>
                ),
                path: "videos",
              },
              {
                element: (
                  <AdminLayout>
                    <DataGridAllAccount />
                  </AdminLayout>
                ),
                path: "accounts",
              },
              {
                element: (
                  <AdminLayout>
                    <DataReport />
                  </AdminLayout>
                ),
                path: "reports",
              },
            ],
          },
        ],
      },
    ],
  },
]);
