import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AuthProvider from "../context/AuthProvider";
import DefaultLayout from "../components/DefaultLayout";

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
        ],
      },
    ],
  },
]);
