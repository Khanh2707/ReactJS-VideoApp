import { Paper, Button } from "@mui/material";
import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <Paper
      sx={{
        textAlign: "center",
        pt: "32px",
        "& > *": { marginBottom: "16px" },
      }}
    >
      <h1>Lỗi!</h1>
      <p>Hình như có lỗi nào đó xảy ra với website.</p>
      <Button variant='outlined' component={Link} to='/'>
        Quay về trang chủ
      </Button>
    </Paper>
  );
}
