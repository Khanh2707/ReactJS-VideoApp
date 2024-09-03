import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import channelAPI from "../../api/channelAPI";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "customBorderTextField.main",
    },
    "&:hover fieldset": {
      borderColor: "customBorderTextField.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "customBorderTextField.main",
    },
  },
  "& .Mui-error": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },
};

export default function ChannelEditingDetails() {
  const { myAccount } = useContext(AppContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");
  const [descriptionLength, setDescriptionLength] = useState(
    myAccount?.channel.description.length
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameChannel: myAccount?.channel.name,
      nameUniqueChannel: myAccount?.channel.nameUnique,
      descriptionChannel: myAccount?.channel.description,
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (state, message) => {
    setOpenSnackbar(false);

    setStateAlert(state);
    setContentAlert(message);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 100);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form data is: ", formData);

    channelAPI
      .updateChannelInfoRaw(myAccount.channel.idChannel, {
        name: formData.nameChannel,
        nameUnique: formData.nameUniqueChannel,
        description: formData.descriptionChannel,
      })
      .then((response) => {
        handleOpenSnackbar("success", "Thay đổi thông tin cơ bản thành công!");
      })
      .catch((error) => {
        if (error.response.data.code == 1015) {
          handleOpenSnackbar("error", "Tên id đã tồn tại!");
        } else {
          handleOpenSnackbar("error", "Có lỗi xảy ra!");
        }
      });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setDescriptionLength(value.descriptionChannel.length);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Box
        component='form'
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        sx={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "600", mb: "4px" }}>
              Tên kênh
            </Typography>
            <Controller
              name='nameChannel'
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder='VD: Mr.Beast'
                  size='small'
                  {...field}
                  error={!!errors.nameChannel}
                  autoComplete='nameChannel'
                  id='nameChannel'
                  autoFocus
                  helperText={errors.nameChannel?.message || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("nameChannel");
                  }}
                  sx={{ ...textFieldStyles, width: "100%" }}
                />
              )}
              rules={{
                required: "Vui lòng nhập trường này",
                maxLength: {
                  value: 45,
                  message: "Tên kênh không được quá 45 ký tự",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "600", mb: "4px" }}>
              Tên id
            </Typography>
            <Controller
              name='nameUniqueChannel'
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder='VD: Trần Phúc Khánh'
                  size='small'
                  {...field}
                  error={!!errors.nameUniqueChannel}
                  autoComplete='nameUniqueChannel'
                  fullWidth
                  id='nameUniqueChannel'
                  helperText={errors.nameUniqueChannel?.message || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("nameUniqueChannel");
                  }}
                  sx={textFieldStyles}
                />
              )}
              rules={{
                required: "Vui lòng nhập trường này",
                maxLength: {
                  value: 45,
                  message: "Tên người dùng không được quá 45 ký tự",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "600", mb: "4px" }}>
              Thông tin mô tả
            </Typography>
            <Controller
              name='descriptionChannel'
              control={control}
              render={({ field }) => (
                <TextField
                  placeholder='VD: Đến từ Hà Nội'
                  size='small'
                  {...field}
                  error={!!errors.descriptionChannel}
                  autoComplete='descriptionChannel'
                  fullWidth
                  id='descriptionChannel'
                  helperText={errors.descriptionChannel?.message || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    setDescriptionLength(e.target.value.length);
                    clearErrors("descriptionChannel");
                  }}
                  multiline
                  minRows={4}
                  maxRows={Infinity}
                  sx={{
                    ...textFieldStyles,
                    "& .MuiInputBase-input": {
                      paddingBottom: "25px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        sx={{
                          position: "absolute",
                          bottom: "25px",
                          right: "0px",
                          transform: "translateY(100%)",
                          marginBottom: "8px",
                          paddingRight: "8px",
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography>{`${descriptionLength}/255`}</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{
                required: "Vui lòng nhập trường này",
                maxLength: {
                  value: 255,
                  message: "Thông tin mô tả không được quá 255 ký tự",
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          fullWidth
          type='submit'
          sx={{
            mt: "32px",
            p: "8px",
            borderRadius: "8px",
            bgcolor: "#2e7d32",
            "&:hover": {
              bgcolor: "#2e7d32",
            },
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: "600", color: "#fff" }}
          >
            Thay đổi
          </Typography>
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={stateAlert}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {contentAlert}
        </Alert>
      </Snackbar>
    </>
  );
}
