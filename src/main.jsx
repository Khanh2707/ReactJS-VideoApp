import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.jsx";
import { Container } from "@mui/material";
import "react-multi-carousel/lib/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Container>
    <RouterProvider router={routes} />
  </Container>
  // </React.StrictMode>,
);
