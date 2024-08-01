import React, { useContext, useState } from "react";
import { Avatar, Box, Chip, TextField, Typography } from "@mui/material";
import Video from "../../components/Video";
import RecommendVideoCard from "../../components/RecommendVideoCard";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SortIcon from "@mui/icons-material/Sort";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DetailVideo() {
  const [liked, setLiked] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { themeMode } = useContext(ThemeContext);

  const textFieldStyles = {
    "& .MuiInput-underline:before": {
      borderBottomColor: "customBorderBottomColorTextFieldStandard.main",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "customBorderBottomColorTextFieldStandard.main",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "text.primary",
    },
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", pb: "450px" }}>
      <Box sx={{ width: "100%" }}>
        <Video />
        <Typography
          variant='h6'
          fontWeight='700'
          sx={{ mt: "12px", lineHeight: "1.4" }}
        >
          Khác biệt chính ORACLE và SQL SERVER - từ 11 năm làm dự án của tôi |
          Trần Quốc Huy - Wecommit
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            mt: "12px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt='' src='' />
            <Box sx={{ ml: "12px", lineHeight: "1" }}>
              <Typography
                variant='subtitle1'
                sx={{ lineHeight: "1.3" }}
                fontWeight='600'
              >
                ICM Entertainment
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "customGreySubTitle.main" }}
              >
                4,9 Tr người đăng ký
              </Typography>
            </Box>
            <Chip
              label='Đăng ký'
              sx={{
                p: "4px",
                ml: "24px",
                bgcolor: "text.primary",
                color: "secondary.main",
                "&:hover": {
                  bgcolor: "text.primary",
                  opacity: "0.9",
                },
                fontSize: "14px",
                fontWeight: "600",
              }}
            />
          </Box>
          <Box>
            <Chip
              icon={liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
              label='11N'
              sx={{
                p: "4px",
                mr: "8px",
                fontSize: "14px",
                fontWeight: "600",
                "& .MuiChip-icon": {
                  color: "text.primary",
                },
              }}
            />
            <Chip
              icon={<VerticalAlignBottomIcon />}
              label='Tải xuống'
              sx={{
                p: "4px",
                fontSize: "14px",
                fontWeight: "600",
                "& .MuiChip-icon": {
                  color: "text.primary",
                },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "24px" }}>
          <Typography variant='h6' fontWeight='600'>
            85 bình luận
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "32px",
              cursor: "pointer",
            }}
          >
            <SortIcon />
            <Typography sx={{ ml: "8px" }} variant='subtitle2' fontWeight='600'>
              Sắp xếp theo
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: "24px", width: "100%" }}>
          <Avatar alt='' src='' sx={{ cursor: "pointer" }} />
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <TextField
              variant='standard'
              placeholder='Viết bình luận...'
              sx={{ ml: "12px", mb: "12px", ...textFieldStyles }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ position: "relative", ml: "12px" }}>
                <InsertEmoticonIcon
                  sx={{ cursor: "pointer" }}
                  onClick={toggleEmojiPicker}
                />
                {showEmojiPicker && (
                  <EmojiPicker
                    theme={themeMode}
                    lazyLoadEmojis={true}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                    }}
                    style={{ position: "absolute" }}
                  />
                )}
              </Box>
              <Box>
                <Chip
                  label='Hủy'
                  sx={{
                    p: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    userSelect: "none",
                    bgcolor: "primary.main",
                    cursor: "pointer",
                    mr: "8px",
                  }}
                />
                <Chip
                  label='Bình luận'
                  sx={{
                    p: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    userSelect: "none",
                    cursor: "pointer",
                    // bgcolor: "#3da2f9",
                    // color: "#0f0f0f",
                  }}
                  disabled
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ml: "24px" }}>
        <RecommendVideoCard
          title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
          nameChannel='Name Channel'
          viewVideo='View Video'
          dateTimeCreateVideo='Date time create'
        />
        <RecommendVideoCard
          title="Đúng, bạn có thể sử dụng thuộc tính whiteSpace: 'nowrap' để đảm bảo
            nội dung không xuống dòng và sẽ hiển thị dấu ba chấm nếu quá dài.
            Dưới đây là cách bạn có thể sử dụng thuộc tính này với"
          nameChannel='Name Channel'
          viewVideo='View Video'
          dateTimeCreateVideo='Date time create'
        />
      </Box>
    </Box>
  );
}
