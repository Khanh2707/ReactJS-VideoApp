import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const AppLightTheme = createTheme({
  palette: {
    background: {
      default: "#F1F1F1",
      paper: "#F1F1F1",
    },
    text: {
      primary: "#0F0F0F",
    },
    customGreySubTitle: {
      main: grey[700],
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
          color: "#0F0F0F",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#0F0F0F",
          color: "#0F0F0F",
          "&:hover": {
            borderColor: "#0F0F0F",
            backgroundColor: "#F1F1F1",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: grey[700],
            opacity: "1",
          },
        },
      },
    },
    MuiTabList: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5", // Background color for TabList
          minHeight: 48, // Min height for TabList
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none", // No uppercase
          minWidth: 72, // Min width for each Tab
          fontWeight: "regular", // Font weight for Tab text
          marginRight: "16px", // Right margin for each Tab
          color: "#757575", // Default text color for Tabs
          "&:hover": {
            color: "#3f50b5", // Text color on hover
            opacity: 1,
          },
          "&.Mui-selected": {
            color: "#3f50b5", // Text color when selected
            fontWeight: "medium", // Font weight when selected
          },
          "&.Mui-focusVisible": {
            backgroundColor: "rgba(100, 95, 228, 0.32)", // Background color on focus
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
      primary: "#F1F1F1",
    },
    customGreySubTitle: {
      main: grey[400],
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
          color: "#F1F1F1",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#F1F1F1",
          color: "#F1F1F1",
          "&:hover": {
            borderColor: "#F1F1F1",
            backgroundColor: "#0F0F0F",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#272727",
        },
      },
    },
  },
});
