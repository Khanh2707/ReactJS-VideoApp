import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { createContext } from "react";

export const ReponsiveContext = createContext({});

export const ReponsiveProvider = ({ children }) => {
  const theme = useTheme();
  const isXlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ReponsiveContext.Provider
      value={{ isXlDown, isLgDown, isMdDown, isSmDown, isXsDown }}
    >
      {children}
    </ReponsiveContext.Provider>
  );
};
