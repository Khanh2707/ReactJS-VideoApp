import React from "react";
import styles from "./AdminLayout.module.css";
import Sidebar from "../../admin/Sidebar";
import MainDash from "../../admin/MainDash";
import RightSide from "../../admin/RightSide";

export default function AdminLayout() {
  return (
    <div className={styles.App}>
      <div className={styles.AppGlass}>
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}
