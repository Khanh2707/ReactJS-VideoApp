import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Grid container flexWrap='nowrap' sx={{ pt: "96px", pb: "16px" }}>
        <Grid item md={3} sm={3} xs={3}>
          <Sidebar />
        </Grid>
        <Grid item md={9} sm={9} xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
