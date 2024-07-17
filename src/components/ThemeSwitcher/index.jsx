import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import { ThemeContext } from "../../context/ThemeContext";
import { IThemeMode } from "../../context/ThemeContext/types";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const ThemeSwitcher = () => {
  const buttonRef = useRef(null);
  const [openMenuTheme, setOpenMenuTheme] = useState(false);

  const { themeMode, switchThemeMode } = useContext(ThemeContext);

  const handleOpen = () => {
    setOpenMenuTheme(true);
  };

  const handleClose = () => {
    setOpenMenuTheme(false);
  };

  const handleSwitchTheme = (mode) => () => {
    switchThemeMode(mode);
    handleClose();
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        startIcon={
          themeMode === "dark" ? (
            <DarkModeIcon />
          ) : themeMode === "light" ? (
            <LightModeIcon />
          ) : (
            <SettingsBrightnessIcon />
          )
        }
        ref={buttonRef}
      >
        <Typography>Giao diện</Typography>
      </Button>
      <Menu
        open={openMenuTheme}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        sx={{ zIndex: "100000", mt: "8px" }}
      >
        <MenuItem
          onClick={handleSwitchTheme(IThemeMode.LIGHT)}
          selected={themeMode === IThemeMode.LIGHT}
        >
          <LightModeIcon />
          <Typography sx={{ ml: "8px" }}>Light</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleSwitchTheme(IThemeMode.DARK)}
          selected={themeMode === IThemeMode.DARK}
        >
          <DarkModeIcon />
          <Typography sx={{ ml: "8px" }}>Dark</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleSwitchTheme(IThemeMode.SYSTEM)}
          selected={themeMode === IThemeMode.SYSTEM}
        >
          <SettingsBrightnessIcon />
          <Typography sx={{ ml: "8px" }}>System</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeSwitcher;
