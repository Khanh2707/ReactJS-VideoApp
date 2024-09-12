import React from "react";
import Sidebar from "../../admin/Sidebar";
import MainDash from "../../admin/MainDash";
import RightSide from "../../admin/RightSide";
import { Paper } from "@mui/material";

export default function AdminLayout() {
  return (
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        gap: "24px",
        pt: "40px",
        alignItems: "start",
      }}
    >
      <Sidebar />
      <MainDash />
      <RightSide />
    </Paper>
  );
}
