import React from "react";
import styles from "../Card.module.css";
import Chart from "react-apexcharts";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

export default function ExpandCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "bar",
        height: "auto",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: ["#FEB019"],
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " người mới";
          },
        },
      },
    },
  };

  return (
    <motion.div
      className={styles.ExpandedCard}
      style={{
        background: param.color.backGround,
      }}
      layoutId={`expandableCard-${param.id}`}
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <CloseIcon sx={{ color: "var(--white)" }} onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className={styles.chartContainer}>
        <Chart options={data.options} series={param.series} type='bar' />
      </div>
    </motion.div>
  );
}
