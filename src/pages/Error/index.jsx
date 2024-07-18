import { Paper, Button } from "@mui/material";
import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <Paper sx={{ textAlign: 'center', pt: '32px', '& > *': { marginBottom: '16px' } }}>
      <h1>Opps!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="outlined" component={Link} to="/">
        Quay về trang chủ
      </Button>
    </Paper>
  );
}
