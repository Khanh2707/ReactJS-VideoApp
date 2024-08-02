import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { IThemeMode } from "../../context/ThemeContext/types";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useTheme } from "@emotion/react";

const ThemeSwitcher = () => {
  const theme = useTheme();

  const [showListTheme, setShowListTheme] = useState(false);
  const buttonRef = useRef(null);
  const listThemeRef = useRef(null);

  const { themeMode, switchThemeMode } = useContext(ThemeContext);

  const handleClickOutside = (event) => {
    if (
      listThemeRef.current &&
      !listThemeRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowListTheme(false);
    }
  };

  const toggleMenu = () => {
    setShowListTheme((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchTheme = (mode) => () => {
    switchThemeMode(mode);
    setShowListTheme(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant='outlined'
        startIcon={
          themeMode === "dark" ? (
            <DarkModeIcon />
          ) : themeMode === "light" ? (
            <LightModeIcon />
          ) : (
            <SettingsBrightnessIcon />
          )
        }
        onClick={toggleMenu}
        ref={buttonRef}
      >
        Giao diện
      </Button>
      {showListTheme && (
        <Paper
          ref={listThemeRef}
          sx={{
            position: "absolute",
            minWidth: "135px",
            mt: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: theme.palette.customBgcolorMenu.main,
            boxShadow: theme.palette.customBoxShadowMenu.main,
            borderRadius: "8px",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSwitchTheme(IThemeMode.LIGHT)}
                selected={themeMode === IThemeMode.LIGHT}
              >
                <LightModeIcon />
                <Typography sx={{ ml: "8px" }}>Sáng</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSwitchTheme(IThemeMode.DARK)}
                selected={themeMode === IThemeMode.DARK}
              >
                <DarkModeIcon />
                <Typography sx={{ ml: "8px" }}>Tối</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSwitchTheme(IThemeMode.SYSTEM)}
                selected={themeMode === IThemeMode.SYSTEM}
              >
                <SettingsBrightnessIcon />
                <Typography sx={{ ml: "8px" }}>Hệ thống</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ThemeSwitcher;
