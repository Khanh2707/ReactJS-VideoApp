import React from "react";
import styles from "./Updates.module.css";
import iconReact from "../../../assets/icon-react.png";
import { Box, Typography } from "@mui/material";

export default function Updates() {
  const updatesData = [
    {
      img: iconReact,
      name: "Andrew Thomas",
      noti: "has ordered Apple smart watch 2500mh battery.",
      time: "25 seconds ago",
    },
    {
      img: iconReact,
      name: "James Bond",
      noti: "has received Samsung gadget for charging battery.",
      time: "30 minutes ago",
    },
    {
      img: iconReact,
      name: "Iron Man",
      noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
      time: "2 hours ago",
    },
  ];

  return (
    <Box
      sx={{ bgcolor: "customBgcolorSecondary.main" }}
      className={styles.Updates}
    >
      {updatesData.map((update, index) => {
        return (
          <div key={index} className={styles.update}>
            <img src={update.img} alt='profile' />
            <div className={styles.noti}>
              <div style={{ marginBottom: "0.5rem" }}>
                <Typography variant='subtitle2'>{update.name}</Typography>
                <Typography variant='subtitle2'>{update.noti}</Typography>
              </div>
              <Typography variant='subtitle2'>{update.time}</Typography>
            </div>
          </div>
        );
      })}
    </Box>
  );
}
