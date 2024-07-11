import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { Box, Container } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Box sx={{ bgcolor: "#23272f" }}>
    <Container>
      <RouterProvider router={routes} />
    </Container>
  </Box>
  // </React.StrictMode>,
);
