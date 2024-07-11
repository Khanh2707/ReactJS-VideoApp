import { Grid } from "@mui/material";
import React from "react";
import MediaCard from "../../components/MediaCard";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <MediaCard />
      </Grid>
      <Grid item md={6}>
        <MediaCard />
      </Grid>
      <Grid item md={6}>
        <MediaCard />
      </Grid>
      <Grid item md={6}>
        <MediaCard />
      </Grid>
      <Grid item md={6}>
        <MediaCard />
      </Grid>
    </Grid>
  )
}
