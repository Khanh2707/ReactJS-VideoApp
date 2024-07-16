import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { Box, Container } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.primary.main,
      }}
    >
      <Container>
        <RouterProvider router={routes} />
      </Container>
    </Box>
  </ThemeProvider>
  // </React.StrictMode>,
);
