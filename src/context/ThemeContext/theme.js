import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const AppLightTheme = createTheme({
  palette: {
    text: {
      primary: "#0f0f0f",
    },
    customGreySubTitle: {
      main: "#606060",
    },
    customBgcolorNotification: {
      main: "#f7f7f7",
    },
    customHoverBgcolorListItemButtonNotification: {
      main: "#f2f2f2",
    },
    customBorderTextField: {
      main: "#c4c4c4",
    },
    customBoxShadowForm: {
      main: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#fff",
          borderRadius: "0",
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
            color: "#606060",
            opacity: "1",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#0D0D0D",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          color: "#606060",
          "&.Mui-selected": {
            color: "#0D0D0D",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#f2f2f2",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#f2f2f2",
          },
          "&:hover": {
            backgroundColor: "#f2f2f2",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#e5e5e5",
        },
      },
    },
  },
});

export const AppDarkTheme = createTheme({
  palette: {
    text: {
      primary: "#F1F1F1",
    },
    customGreySubTitle: {
      main: grey[400],
    },
    customBgcolorNotification: {
      main: "#282828",
    },
    customHoverBgcolorListItemButtonNotification: {
      main: "#3e3e3e",
    },
    customBgcolorForm: {
      main: "#161b22",
    },
    customBorderTextField: {
      main: "#30363d",
    },
    customBoxShadowForm: {
      main: "none",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#0f1214",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#0f1214",
          borderRadius: "0",
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
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#717171",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          color: "#aaa",
          "&.Mui-selected": {
            color: "#fff",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#272727",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#272727",
          },
          "&:hover": {
            backgroundColor: "#272727",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#535353",
        },
      },
    },
  },
});
