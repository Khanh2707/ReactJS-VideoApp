import { createContext, useEffect, useState } from "react";
import { IThemeMode } from "./types";
import { AppDarkTheme, AppLightTheme } from "./theme";
import { ThemeProvider, useMediaQuery } from "@mui/material";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(IThemeMode.LIGHT);
  const [theme, setTheme] = useState(AppLightTheme);

  const SYSTEM_THEME = useMediaQuery("(prefers-color-scheme: dark)")
    ? IThemeMode.DARK
    : IThemeMode.LIGHT;

  useEffect(() => {
    const themeModeFromPref = _getThemeModeFromPref();
    setThemeMode(themeModeFromPref);
  });

  useEffect(() => {
    switch (themeMode) {
      case IThemeMode.DARK:
        setTheme(AppDarkTheme);
        break;
      case IThemeMode.LIGHT:
        setTheme(AppLightTheme);
        break;
      case IThemeMode.SYSTEM:
        switch (SYSTEM_THEME) {
          case IThemeMode.DARK:
            setTheme(AppDarkTheme);
            break;
          case IThemeMode.LIGHT:
            setTheme(AppLightTheme);
            break;
        }
        break;
      default:
        setTheme(AppLightTheme);
        break;
    }
  }, [themeMode, SYSTEM_THEME]);

  const _getThemeModeFromPref = () => {
    const themeModeFromPref = localStorage.getItem("themeMode");

    if (themeModeFromPref) {
      return themeModeFromPref;
    }

    return IThemeMode.LIGHT;
  };

  const _setThemeModeToPref = (mode) => {
    localStorage.setItem("themeMode", mode);
  };

  const switchThemeMode = (mode) => {
    setThemeMode(mode);
    _setThemeModeToPref(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
