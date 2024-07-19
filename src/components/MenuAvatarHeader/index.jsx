import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

export default function MenuAvatarHeader() {
  const buttonRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <IconButton type='button' onClick={handleOpen} ref={buttonRef}>
        <Avatar alt='' src='' sx={{ width: "32px", height: "32px" }} />
      </IconButton>
      <Menu
        open={openMenu}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ zIndex: "100000", mt: "8px" }}
      >
        <MenuItem onClick={handleClose}>
          <Typography>Sáng</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>Tối</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>Hệ thống</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
