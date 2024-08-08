import React from "react";
import styles from "./RightSide.module.css";
import Updates from "../Updates";

export default function RightSide() {
  return (
    <div className={styles.RightSide}>
      <div>
        <h3>Updates</h3>
        <Updates />
      </div>
    </div>
  );
}
