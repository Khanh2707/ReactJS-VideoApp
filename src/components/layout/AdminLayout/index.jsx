import React from "react";
import Sidebar from "../../admin/Sidebar";
import { Container, Grid } from "@mui/material";

export default function AdminLayout({ children }) {
  return (
    <Container maxWidth='xl'>
      <Grid container flexWrap='nowrap' sx={{ pt: "40px", pb: "16px" }} gap={2}>
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
