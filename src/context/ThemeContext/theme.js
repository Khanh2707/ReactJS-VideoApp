import { createTheme } from "@mui/material";

export const AppLightTheme = createTheme({
  palette: {
    background: {
      default: "#fcfcfc",
      paper: "#fcfcfc",
    },
    text: {
      primary: "#1a1e23",
      secondary: "#1a1e23",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#1a1e23",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#1a1e23",
          color: "#1a1e23",
          "&:hover": {
            borderColor: "#1a1e23",
            backgroundColor: "#fcfcfc",
          },
        },
      },
    },
  },
});

export const AppDarkTheme = createTheme({
  palette: {
    background: {
      default: "#0f1214",
      paper: "#0f1214",
    },
    text: {
      primary: "#fcfcfc",
      secondary: "fff",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fcfcfc",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#fcfcfc",
          color: "#fcfcfc",
          "&:hover": {
            borderColor: "#fcfcfc",
            backgroundColor: "#1a1e23",
          },
        },
      },
    },
  },
});
