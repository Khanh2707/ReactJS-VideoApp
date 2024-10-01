import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { myAccount } = useContext(AppContext);

  if (myAccount.roles[0].name === "CENSOR") {
    navigate("/dashboard/reports");
  }

  if (myAccount.roles[0].name === "USER") {
    navigate("/");
  }

  return <Outlet />;
}
