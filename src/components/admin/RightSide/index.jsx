import React from "react";
import styles from "./RightSide.module.css";
import Updates from "../Updates";
import CustomerReview from "../CustomerReview";

export default function RightSide() {
  return (
    <div className={styles.RightSide}>
      <div>
        <h3>Updates</h3>
        <Updates />
      </div>
      <div>
        <h3>Customer Review</h3>
        <CustomerReview />
      </div>
    </div>
  );
}
