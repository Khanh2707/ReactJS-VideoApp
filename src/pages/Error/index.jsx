import { Box, Button } from "@mui/material";
import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <Box sx={{ textAlign: 'center', mt: '32px', '& > *': { marginBottom: '16px' } }}>
      <h1>Opps!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="outlined" component={Link} to="/">
        Quay về trang chủ
      </Button>
    </Box>
  );
}
