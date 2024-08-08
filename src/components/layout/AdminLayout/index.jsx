import React from "react";
import styles from "./AdminLayout.module.css";
import Sidebar from "../../admin/Sidebar";
import MainDash from "../../admin/MainDash";
import RightSide from "../../admin/RightSide";
import { Paper } from "@mui/material";

export default function AdminLayout() {
  return (
    <Paper>
      <div className={styles.App}>
        <div className={styles.AppGlass}>
          <Sidebar />
          <MainDash />
          <RightSide />
        </div>
      </div>
    </Paper>
  );
}
