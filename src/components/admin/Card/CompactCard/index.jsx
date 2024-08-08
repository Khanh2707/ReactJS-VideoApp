import React from "react";
import styles from "../Card.module.css";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CompactCard({ param, setExpanded }) {
  const png = param.png;

  return (
    <motion.div
      className={styles.CompactCard}
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      onClick={setExpanded}
      layoutId={`expandableCard-${param.id}`}
    >
      <div className={styles.radialBar}>
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className={styles.detail}>
        {png}
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}
