import React from "react";
import { Grid } from "@mui/material";

export default function DetailVideo() {
  return (
    <Grid container>
      <Grid item sx={{ flexGrow: "1" }}>
        <Video />
      </Grid>
    </Grid>
  );
}
