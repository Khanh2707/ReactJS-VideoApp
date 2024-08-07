import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import iconReact from "../../../assets/icon-react.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";

export default function Sidebar() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [sidebarIsDrawer, setSidebarIsDrawer] = useState(false);

  const navigate = useNavigate();

  const menuItemSidebar = [
    {
      icon: <DashboardIcon />,
      heading: "Trang quản trị",
    },
    {
      icon: <DashboardIcon />,
      heading: "Thống kê số liệu",
    },
  ];

  const sidebarContent = (
    <>
      {/* logo */}
      <div className={styles.logo}>
        <img src={iconReact} alt='' />
        <Typography></Typography>
      </div>

      {/* menu */}
      <Box className={styles.menu}>
        {menuItemSidebar.map((item, index) => {
          return (
            <Box
              sx={{ bgcolor: "customBgcolorSecondary.main" }}
              key={index}
              className={`${styles.menuItem} ${
                selected === index ? styles.active : ""
              }`}
              onClick={() => setSelected(index)}
            >
              {item.icon}
              <Typography>{item.heading}</Typography>
            </Box>
          );
        })}
        <Box
          sx={{ bgcolor: "customBgcolorSecondary.main" }}
          className={`${styles.menuItem}`}
          onClick={() => navigate("/")}
        >
          <LogoutIcon />
          <Typography>Về trang chủ</Typography>
        </Box>
      </Box>
    </>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
        setSidebarIsDrawer(true);
      } else {
        setExpanded(true);
        setSidebarIsDrawer(false);
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
      <div className={styles.bars} onClick={() => setExpanded(!expanded)}>
        <MenuIcon />
      </div>
      {sidebarIsDrawer ? (
        <Drawer
          open={expanded}
          onClose={() => setExpanded(false)}
          transitionDuration={{ enter: 200, exit: 200 }}
          SlideProps={{
            direction: "left",
          }}
        >
          <div className={styles.Sidebar}>{sidebarContent}</div>
        </Drawer>
      ) : (
        <div className={styles.Sidebar}>{sidebarContent}</div>
      )}
    </>
  );
}
