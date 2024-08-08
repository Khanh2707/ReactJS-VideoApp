import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import iconReact from "../../../assets/icon-react.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const menuItemSidebar = [
    {
      icon: <DashboardIcon sx={{ color: "var(--black)" }} />,
      heading: "Trang quản trị",
    },
    {
      icon: <DashboardIcon sx={{ color: "var(--black)" }} />,
      heading: "Thống kê số liệu",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={styles.bars}
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <MenuIcon />
      </div>
      <motion.div
        className={styles.Sidebar}
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className={styles.logo}>
          <img src={iconReact} alt='' />
          <span></span>
        </div>

        {/* menu */}
        <div className={styles.menu}>
          {menuItemSidebar.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.menuItem} ${
                  selected === index ? styles.active : ""
                }`}
                onClick={() => setSelected(index)}
              >
                {item.icon}
                <span>{item.heading}</span>
              </div>
            );
          })}
          <div
            className={`${styles.menuItem} ${styles.active}`}
            onClick={() => navigate("/")}
          >
            <LogoutIcon sx={{ color: "var(--black)" }} />
            <span>Quay về trang chủ</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
