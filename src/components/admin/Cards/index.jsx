import React from "react";
import styles from "./Cards.module.css";
import Card from "../Card";
import HomeIcon from "@mui/icons-material/Home";

export default function Cards() {
  const cards = [
    {
      id: 1,
      title: "Sales",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      png: <HomeIcon sx={{ color: "var(--white)" }} />,
      series: [
        {
          name: "Sales",
          data: [10, 150, 30, 40, 50, 60, 70, 80, 90, 100, 110, 20],
        },
      ],
    },
    {
      id: 2,
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "14,270",
      png: <HomeIcon sx={{ color: "var(--white)" }} />,
      series: [
        {
          name: "Revenue",
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },
      ],
    },
    {
      id: 3,
      title: "Expenses",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "4,270",
      png: <HomeIcon sx={{ color: "var(--white)" }} />,
      series: [
        {
          name: "Expenses",
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },
      ],
    },
  ];

  return (
    <div className={styles.Cards}>
      {cards.map((card, index) => {
        return (
          <div key={index} className={styles.parentContainer}>
            <Card
              id={card.id}
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
}
