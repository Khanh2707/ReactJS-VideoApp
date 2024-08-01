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
import ShowMoreText from "react-show-more-text";

export default function DetailVideo() {
  const [liked, setLiked] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { themeMode } = useContext(ThemeContext);

  const longText = `202.732 lượt xem  25 thg 5, 2024
Top những bài nhạc thịnh hành 2024 | Top những bài nhạc thịnh hành 2024 
Suýt Nữa Thì, Lưu Luyến Sau Chia Tay, Nắng Có Mang Em Về, Như Anh Đã Nhìn Thấy Em, 1 Phút, 3107 2, Yêu 5 - Nhạc Việt Chill Tâm Trạng Buồn 2024
Những Bản Việt Nhẹ Nhàng Cực Chill | Nhạc Chill Buồn 2024 ♫Lofi TikTok Gây Nghiện Hay Nhất
Nhạc Việt Buồn Tâm Trạng Chill Nhẹ Nhàng | Những Bản Chill Buồn 2024 Gây Nghiện Hay Nhất
-------------------------------------------------
📝 TRACKLIST: 
00:00 Nắng Có Mang Em Về
04:12 Thì Thôi
10:05 Như Anh Đã Thấy Em
15:05 Sau Cơn Mưa
17:41 Em Có Nhớ Anh Không Gốc
22:03 Cơn Mưa Cuối
27:25 Phía Sau Một Cô Gái
31:48 Anh Lại Làm Em Khóc Nữa Rồi
36:24 Vài Lần Đón Đưa
39:17 Nợ Ai Đó Lời Xin Lỗi 2
45:20 Mãi Chẳng Thuộc Về Nhau
51:37 3107 2
55:47 Ngày Mai Em Đi
59:27 Bâng Khuâng
  
-----------------
► Theo dõi fanpage Facebook:   / orinnmusic  
► Website: http://orinn.net/
► LH Vấn Đề Bản Quyền: contact@orinn.net
  
🎵 Nghe Nhạc Thư Giãn: https://dini.to/playlistlofi
  
► Đăng Kí Kênh Tại: https://dini.to/freakd
► Theo dõi fanpage Facebook: https://dini.to/orinnfacebook
  
© Bản quyền ca khúc thuộc về Orinn Music
© Copyright by Orinn Music ☞ Do not Reup
  
✉ Hợp tác, quảng cáo, khiếu nại các vấn đề về bản quyền liên hệ chúng tôi qua mail: contact@orinn.net
  
  
Tags:Music,khiem,soobin hoàng sơn,soobin,nhạc chill 2024,pii music,suýt nữa thì,nhạc tâm trạng,nhạc chill tâm trạng,nhạc chill,nhạc việt buồn 2024,nhạc việt tâm trạng 2024,luu luyen sau chia tay,chờ đợi có đáng sợ,hư không,3107-2,3107 lofi,nắng có mang em về,nang co mang em ve,Tự trách em quá khờ nhìn anh cạnh bên ai khác,mưa rơi khẽ rơi trên đôi mắt ai,3107 2,Phía sau một cô gái,phia sau một cô gái,lưu luyến sau chia tay,sau cơn mưa,em có nhớ anh không`;

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
        <Box
          sx={{
            bgcolor: "customBgcolorSecondary.main",
            borderRadius: "12px",
            p: "12px",
            mt: "16px",
            cursor: "pointer",
          }}
        >
          <Typography variant='body1'>
            <ShowMoreText
              more={
                <Typography variant='span' sx={{ fontWeight: "600" }}>
                  thêm
                </Typography>
              }
              less={
                <Typography sx={{ fontWeight: "600", mt: "16px" }}>
                  Ẩn bớt
                </Typography>
              }
              keepNewLines={true}
            >
              {longText}
            </ShowMoreText>
          </Typography>
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
