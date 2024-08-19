import { createContext, useEffect, useMemo, useState } from "react";
import { IThemeMode } from "./types";
import { AppDarkTheme, AppLightTheme } from "./theme";
import { ThemeProvider, useMediaQuery } from "@mui/material";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const SYSTEM_THEME = useMediaQuery("(prefers-color-scheme: dark)")
    ? IThemeMode.DARK
    : IThemeMode.LIGHT;

  const [themeMode, setThemeMode] = useState(IThemeMode.LIGHT);

  useEffect(() => {
    const themeModeFromPref = _getThemeModeFromPref();

    if (themeModeFromPref === IThemeMode.SYSTEM) {
      setThemeMode(SYSTEM_THEME);
    } else {
      setThemeMode(themeModeFromPref);
    }
  }, [SYSTEM_THEME]);

  const theme = useMemo(() => {
    switch (themeMode) {
      case IThemeMode.DARK:
        return AppDarkTheme;
      case IThemeMode.LIGHT:
        return AppLightTheme;
      case IThemeMode.SYSTEM:
        return SYSTEM_THEME === IThemeMode.DARK ? AppDarkTheme : AppLightTheme;
      default:
        return AppLightTheme;
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
