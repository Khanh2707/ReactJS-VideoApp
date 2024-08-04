import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function DefaultLayout({ children, hideSidebar }) {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Grid container flexWrap='nowrap' sx={{ pt: "96px", pb: "16px" }}>
          {!hideSidebar && (
            <Grid item md={3} sm={3} xs={3}>
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            md={hideSidebar ? 12 : 9}
            sm={hideSidebar ? 12 : 9}
            xs={hideSidebar ? 12 : 9}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
