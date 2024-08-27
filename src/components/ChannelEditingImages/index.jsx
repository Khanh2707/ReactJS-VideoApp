import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import iconReact from "../../assets/react.svg";
import { AppContext } from "../../context/AppContext";

export default function ChannelEditingImages() {
  const { myAccount } = useContext(AppContext);

  const handleChangeAvatar = () => {};

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "628px",
        cursor: "pointer",
      }}
    >
      <Paper sx={{ width: "290px" }}>
        <CardMedia
          component='img'
          image={myAccount.channel.avatar}
          sx={{
            width: "140px",
            height: "140px",
            objectFit: "contain",
            borderRadius: "50%",
            margin: "auto",
          }}
          alt=''
        />
      </Paper>
      <CardContent sx={{ width: "382px" }}>
        <Typography variant='subtitle1'>Ảnh</Typography>
        <Typography
          variant='subtitle2'
          component='div'
          sx={{ color: "customGreySubTitle.main" }}
        >
          Ảnh hồ sơ sẽ xuất hiện cùng với kênh của bạn trên YouTube tại những vị
          trí như bên cạnh bình luận và video của bạn
        </Typography>
        <Paper sx={{ mt: "8px" }}>
          <Chip
            label='Thay đổi'
            sx={{
              p: "4px",
              mr: "8px",
            }}
            onClick={handleChangeAvatar}
          />
          <Chip
            label='Xóa'
            sx={{
              p: "4px",
            }}
            onClick={handleChangeAvatar}
          />
        </Paper>
      </CardContent>
    </Card>
  );
}
