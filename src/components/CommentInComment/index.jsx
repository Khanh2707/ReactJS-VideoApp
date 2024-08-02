import { Box, Chip } from "@mui/material";
import React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CommentInComment() {
  return (
    <Box>
      <Chip
        icon={<ExpandMoreIcon />}
        // icon={<ExpandLessIcon />}
        label='1 phản hồi'
        sx={{
          p: "4px",
          bgcolor: "primary.main",
          color: "#3ea6ff",
          "&:hover": {
            bgcolor: "#263850",
          },
          fontSize: "14px",
          cursor: "pointer",
          "& .MuiChip-icon": {
            color: "#3ea6ff",
          },
        }}
      />
    </Box>
  );
}
