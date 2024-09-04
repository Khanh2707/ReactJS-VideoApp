import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const AppLightTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f1f1f1",
    },
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
      main: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    customBoxShadowMenu: {
      main: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    },
    customBgcolorMenu: {
      main: "#fff",
    },
    customBorderBottomColorTextFieldStandard: {
      main: "#909090",
    },
    customBgcolorSecondary: {
      main: "#f2f2f2",
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
          boxShadow: "rgba(0, 0, 0, 0) 0 0 0",
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
        root: {
          "&.Mui-disabled": {
            color: "#909090",
          },
        },
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
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#f2f2f2",
          "&:hover": {
            backgroundColor: "#e5e5e5",
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
            backgroundColor: "#d5d5d5",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#d5d5d5",
          },
          "&:hover": {
            backgroundColor: "#d5d5d5",
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          "& .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#fafbfb",
          },
          "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
            backgroundColor: "#fff",
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
            backgroundColor: "#fff",
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: "#ff0000",
        },
        track: {
          color: "#ff0000",
        },
        rail: {
          color: "#bfbfbf",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#f2f2f2",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#f2f2f2",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#606060",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-completed": {
            color: "#0f0f0f", // Màu khi Step đã hoàn thành
          },
          "&.Mui-active": {
            color: "#0f0f0f", // Màu khi Step đang active
          },
          "&.Mui-disabled": {
            color: "#717171", // Màu khi Step bị disable
          },
        },
        iconContainer: {
          "& .MuiStepIcon-root": {
            color: "#717171", // Màu mặc định của icon
            "&.Mui-active": {
              color: "#1976d2", // Màu khi icon đang active
            },
            "&.Mui-completed": {
              color: "#0f0f0f", // Màu khi icon đã hoàn thành
            },
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#606060",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
        icon: {
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0f0f0f",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0f0f0f",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0f0f0f",
            borderWidth: "1px",
          },
        },
        icon: {
          color: "#0f0f0f",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#f2f2f2",
            "&:hover": {
              backgroundColor: "#f2f2f2",
            },
          },
          "&:hover": {
            backgroundColor: "#f2f2f2",
          },
        },
      },
    },
  },
});

export const AppDarkTheme = createTheme({
  palette: {
    primary: {
      main: "#0f1214",
    },
    secondary: {
      main: "#0f0f0f",
    },
    text: {
      primary: "#f1f1f1",
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
      main: "rgba(0, 0, 0, 0) 0 0 0",
    },
    customBoxShadowMenu: {
      main: "rgba(0, 0, 0, 0) 0 0 0",
    },
    customBgcolorMenu: {
      main: "#212121",
    },
    customBorderBottomColorTextFieldStandard: {
      main: "#717171",
    },
    customBgcolorSecondary: {
      main: "#272727",
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
          boxShadow: "rgba(0, 0, 0, 0) 0 0 0",
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
        root: {
          "&.Mui-disabled": {
            color: "#717171",
          },
        },
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
          "&:hover": {
            backgroundColor: "#373737",
          },
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
            backgroundColor: "#414141",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#414141",
          },
          "&:hover": {
            backgroundColor: "#414141",
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
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          "& .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#121212",
          },
          "& .MuiDataGrid-cell--editable": {
            backgroundColor: "#0f1214",
          },
          "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
            backgroundColor: "#0f1214",
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
            backgroundColor: "#0f1214",
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: "#ff0000",
        },
        track: {
          color: "#ff0000",
        },
        rail: {
          color: "#bfbfbf",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#272727",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#272727",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: grey[400],
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-completed": {
            color: "#f1f1f1", // Màu khi Step đã hoàn thành
          },
          "&.Mui-active": {
            color: "#f1f1f1", // Màu khi Step đang active
          },
          "&.Mui-disabled": {
            color: "#717171", // Màu khi Step bị disable
          },
        },
        iconContainer: {
          // Tùy chỉnh màu của icon
          "& .MuiStepIcon-root": {
            color: "#717171", // Màu mặc định của icon
            "&.Mui-active": {
              color: "#1976d2", // Màu khi icon đang active
            },
            "&.Mui-completed": {
              color: "#f1f1f1", // Màu khi icon đã hoàn thành
            },
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: grey[400],
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
        icon: {
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f1f1f1",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f1f1f1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f1f1f1",
            borderWidth: "1px",
          },
        },
        icon: {
          color: "#f1f1f1",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#282828",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#3e3e3e",
            "&:hover": {
              backgroundColor: "#3e3e3e",
            },
          },
          "&:hover": {
            backgroundColor: "#3e3e3e",
          },
        },
      },
    },
  },
});
