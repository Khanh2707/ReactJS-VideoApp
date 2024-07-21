import React from "react";
import { Grid } from "@mui/material";
import Video from "../../components/Video";

export default function DetailVideo() {
  return (
    <Grid container>
      <Grid item sx={{ flexGrow: "1" }}>
        <Video />
      </Grid>
    </Grid>
  );
}
