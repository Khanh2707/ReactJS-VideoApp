import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { CssBaseline, Paper } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppProvider>
    <ThemeContextProvider>
      <CssBaseline />
      <Paper
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <RouterProvider router={routes} />
      </Paper>
    </ThemeContextProvider>
  </AppProvider>
  // </React.StrictMode>,
);
