import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Error from "../pages/Error";
import WatchedVideo from "../pages/WatchedVideo";
import AuthProvider from "../context/AuthProvider";
import DefaultLayout from "../components/DefaultLayout";
import MyChannel from "../pages/MyChannel";
import ChannelEditing from "../pages/ChannelEditing";
import Register from "../pages/Register";
import ChannelEditingImages from "../components/ChannelEditingImages";
import ChannelEditingDetails from "../components/ChannelEditingDetails";

const AuthLayout = () => {
  return (
    <AuthProvider>
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
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
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
          },
          {
            element: (
              <DefaultLayout>
                <MyChannel />
              </DefaultLayout>
            ),
            path: "/:idMyChannel",
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
            ],
          },
        ],
      },
    ],
  },
]);
