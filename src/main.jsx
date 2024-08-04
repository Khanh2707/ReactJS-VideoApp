import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { Container, CssBaseline, Paper } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
  // </React.StrictMode>,
);
