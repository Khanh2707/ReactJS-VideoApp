import React from "react";
import styles from "./MainDash.module.css";
import Cards from "../Cards";
import Table from "../Table";

export default function MainDash() {
  return (
    <div className={styles.MainDash}>
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
}
