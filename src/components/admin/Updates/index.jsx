import React from "react";
import styles from "./Updates.module.css";
import iconReact from "../../../assets/icon-react.png";

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
    <div className={styles.Updates}>
      {updatesData.map((update, index) => {
        return (
          <div key={index} className={styles.update}>
            <img src={update.img} alt='profile' />
            <div className={styles.noti}>
              <div style={{ marginBottom: "0.5rem" }}>
                <span>{update.name}</span>
                <span> {update.noti}</span>
              </div>
              <span>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
