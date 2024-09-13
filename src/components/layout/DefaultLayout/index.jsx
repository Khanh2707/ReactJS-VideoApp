import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useContext } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { ReponsiveContext } from "../../../context/ReponsiveContext";

export default function DefaultLayout({ children, hideSidebar }) {
  const { isXlDown, isLgDown, isMdDown, isSmDown, isXsDown } =
    useContext(ReponsiveContext);

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
          {!(hideSidebar || isLgDown) && (
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            xl={hideSidebar ? 12 : 10}
            lg={hideSidebar ? 12 : 10}
            md={12}
            sm={12}
            xs={12}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
