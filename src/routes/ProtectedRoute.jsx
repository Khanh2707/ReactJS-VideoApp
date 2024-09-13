import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const {myAccount} = useContext(AppContext)

  console.log(myAccount);

  return <Outlet />;
}
