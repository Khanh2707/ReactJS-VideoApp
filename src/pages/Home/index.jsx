import { Box, Grid } from "@mui/material";
import React from "react";
import MediaCard from "../../components/MediaCard";
import ListCategory from "../../components/ListCategory";

export default function Home() {
  return (
    <Box>
      <ListCategory />
      <Grid container spacing={2}>
        <Grid item md={6} sm={6} xs={12}>
          <MediaCard />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <MediaCard />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <MediaCard />
        </Grid>
        <Grid item md={6} sm={6} xs={12}>
          <MediaCard />
        </Grid>
      </Grid>
    </Box>
  );
}
