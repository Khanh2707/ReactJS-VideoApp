import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";

export default function DefaultLayout({ children, hideSidebar }) {
  return (
    <>
      <Header />
      <Container maxWidth='xl'>
        <Grid
          container
          flexWrap='nowrap'
          sx={{ pt: "96px", pb: "16px" }}
          gap={2}
        >
          {!hideSidebar && (
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            xl={hideSidebar ? 12 : 10}
            lg={hideSidebar ? 12 : 10}
            md={hideSidebar ? 12 : 10}
            sm={hideSidebar ? 12 : 10}
            xs={hideSidebar ? 12 : 10}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
