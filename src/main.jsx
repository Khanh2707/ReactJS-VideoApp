import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { Box, Container, Paper } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import { ThemeContextProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeContextProvider>
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Container>
        <RouterProvider router={routes} />
      </Container>
    </Box>
  </ThemeContextProvider>
  // </React.StrictMode>,
);
