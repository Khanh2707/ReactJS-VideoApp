import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { CssBaseline, Paper } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ReponsiveProvider } from "./context/ReponsiveContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeContextProvider>
    <SnackbarProvider>
      <SearchProvider>
        <ReponsiveProvider>
          <AppProvider>
            <CssBaseline />
            <Paper
              sx={{
                width: "100%",
                minHeight: "100vh",
              }}
            >
              <RouterProvider router={routes} />
            </Paper>
          </AppProvider>
        </ReponsiveProvider>
      </SearchProvider>
    </SnackbarProvider>
  </ThemeContextProvider>
  // </React.StrictMode>,
);
