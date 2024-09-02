import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  useTheme,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import accountAPI from "../../api/accountAPI";
import emailAPI from "../../api/emailAPI";

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");

  const navigate = useNavigate();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const emailValue = watch("email");

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

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

  // API
  const handleFormSubmit = (formData) => {
    accountAPI
      .changePasswordAccount(emailValue, {
        currentPassword: formData.codeGmail,
        newPassword: formData.newPassword,
      })
      .then((response) => {
        handleOpenSnackbar("success", "Đổi mật khẩu thành công!");
        console.log(response);
      })
      .catch((error) => {
        handleOpenSnackbar("error", "Lỗi!");
        console.log(error);
      });
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "360px",
            minHeight: "100px",
            padding: "32px 24px",
            margin: "24px",
            alignSelf: "center",
            boxShadow: theme.palette.customBoxShadowForm.main,
            bgcolor: "customBgcolorForm.main",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: "600", mb: "8px", alignSelf: "center" }}
          >
            Quên mật khẩu
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              mb: "32px",
              alignSelf: "center",
              color: "customGreySubTitle.main",
            }}
          >
            Xem video online trên Vineo ❤️
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Email
                </Typography>
                <TextField
                  placeholder='VD: phuckhanh@gmail.com'
                  size='small'
                  error={!!errors.email}
                  autoComplete='email'
                  fullWidth
                  id='email'
                  name='email'
                  autoFocus
                  helperText={errors.email?.message || ""}
                  {...register("email", {
                    required: "Vui lòng nhập trường này",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                    onChange: () => clearErrors("email"),
                  })}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Mật khẩu mới
                </Typography>
                <TextField
                  placeholder='Mật khẩu mới'
                  size='small'
                  type={showPassword ? "text" : "password"}
                  error={!!errors.newPassword}
                  autoComplete='newPassword'
                  fullWidth
                  id='newPassword'
                  name='newPassword'
                  helperText={errors.newPassword?.message || ""}
                  {...register("newPassword", {
                    required: "Vui lòng nhập trường này",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
                    },
                    onChange: () => clearErrors("newPassword"),
                  })}
                  sx={textFieldStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Mã code (gửi tới gmail)
                </Typography>
                <TextField
                  placeholder='Mã code'
                  size='small'
                  error={!!errors.codeGmail}
                  autoComplete='codeGmail'
                  fullWidth
                  id='codeGmail'
                  name='codeGmail'
                  helperText={errors.codeGmail?.message || ""}
                  {...register("codeGmail", {
                    required: "Vui lòng nhập trường này",
                    onChange: () => clearErrors("codeGmail"),
                  })}
                  sx={textFieldStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        onClick={() => {
                          if (!emailValue) {
                            handleOpenSnackbar("error", "Chưa nhập mail!");
                          } else {
                            handleOpenSnackbar(
                              "info",
                              "Đang gửi code đến mail của bạn!"
                            );
                            emailAPI
                              .verifyEmail({
                                email: emailValue,
                              })
                              .then((response) => {
                                console.log(response);
                                handleOpenSnackbar(
                                  "success",
                                  "Kiểm tra mail để lấy code!"
                                );
                              })
                              .catch((error) => {
                                console.log(error);
                                handleOpenSnackbar(
                                  "error",
                                  "Gửi code đến mail không thành công!"
                                );
                              });
                          }
                        }}
                      >
                        <Typography
                          sx={{ cursor: "pointer", color: "text.primary" }}
                        >
                          Lấy mã
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: "32px",
                p: "8px",
                bgcolor: "#1ac7b6",
                "&:hover": {
                  backgroundColor: "#1ac7b6",
                  opacity: "0.9",
                },
                borderRadius: "8px",
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: "600", color: "#fff" }}
              >
                Thay đổi
              </Typography>
            </Button>
            <Box sx={{ mt: "32px", textAlign: "center" }}>
              <Typography component='span' sx={{ mr: "4px" }}>
                Quay về đăng nhập?
              </Typography>
              <Link to='/login' style={{ textDecoration: "none" }}>
                <Typography
                  component='span'
                  sx={{ color: "#1ac7b6", cursor: "pointer" }}
                >
                  Đăng nhập
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
