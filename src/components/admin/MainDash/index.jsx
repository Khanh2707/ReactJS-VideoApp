import React from "react";
import Table from "../Table";
import { Box, Typography } from "@mui/material";

export default function MainDash({ videos }) {
  return (
    <Box flexGrow='1'>
      <Typography variant='h4' fontWeight='700' marginBottom='16px'>
        Thống kê video
      </Typography>
      <Table videos={videos} />
    </Box>
  );
}
