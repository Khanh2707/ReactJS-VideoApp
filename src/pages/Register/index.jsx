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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

export default function Register() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const usernameValue = watch("username");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
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
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Mật khẩu không khớp",
      });
      return;
    }

    console.log("Form data is: ", formData);

    accountAPI
      .createAccount({
        username: formData.username,
        password: formData.password,
        name: formData.nameChannel,
        nameUnique: formData.nameUniqueChannel,
        codeEmail: formData.codeGmail,
      })
      .then((response) => {
        handleOpenSnackbar("success", "Đăng ký tài khoản thành công!");
        console.log(response);
      })
      .catch((error) => {
        if (error.response.data.code == 1003) {
          handleOpenSnackbar("error", "Tên đăng nhập đã tồn tại!");
        } else if (error.response.data.code == 1005) {
          handleOpenSnackbar("error", "Id kênh đã tồn tại!");
        } else {
          handleOpenSnackbar("error", "Mã code chưa chính xác!");
        }
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
            Đăng ký
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
                  Tên đăng nhập
                </Typography>
                <TextField
                  placeholder='VD: phuckhanh@gmail.com'
                  size='small'
                  error={!!errors.username}
                  autoComplete='username'
                  fullWidth
                  id='username'
                  name='username'
                  autoFocus
                  helperText={errors.username?.message || ""}
                  {...register("username", {
                    required: "Vui lòng nhập trường này",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                    onChange: () => clearErrors("username"),
                  })}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Mật khẩu
                </Typography>
                <TextField
                  placeholder='Mật khẩu'
                  size='small'
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  autoComplete='password'
                  fullWidth
                  id='password'
                  name='password'
                  helperText={errors.password?.message || ""}
                  {...register("password", {
                    required: "Vui lòng nhập trường này",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt",
                    },
                    onChange: () => clearErrors("password"),
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
                  Nhập lại mật khẩu
                </Typography>
                <TextField
                  placeholder='Nhập lại mật khẩu'
                  size='small'
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!errors.confirmPassword}
                  autoComplete='confirmPassword'
                  fullWidth
                  id='confirmPassword'
                  name='confirmPassword'
                  helperText={errors.confirmPassword?.message || ""}
                  {...register("confirmPassword", {
                    required: "Vui lòng nhập trường này",
                    onChange: () => clearErrors("confirmPassword"),
                  })}
                  sx={textFieldStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Tên kênh
                </Typography>
                <TextField
                  placeholder='VD: Sơn Tùng MTP'
                  size='small'
                  error={!!errors.nameChannel}
                  autoComplete='nameChannel'
                  fullWidth
                  id='nameChannel'
                  name='nameChannel'
                  helperText={errors.nameChannel?.message || ""}
                  {...register("nameChannel", {
                    required: "Vui lòng nhập trường này",
                    onChange: () => clearErrors("nameChannel"),
                  })}
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                  Id kênh (tên duy nhất)
                </Typography>
                <TextField
                  placeholder='VD: @khanhtranphuc5193'
                  size='small'
                  error={!!errors.nameUniqueChannel}
                  autoComplete='nameUniqueChannel'
                  fullWidth
                  id='nameUniqueChannel'
                  name='nameUniqueChannel'
                  helperText={errors.nameUniqueChannel?.message || ""}
                  {...register("nameUniqueChannel", {
                    required: "Vui lòng nhập trường này",
                    onChange: () => clearErrors("nameUniqueChannel"),
                  })}
                  sx={textFieldStyles}
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
                          if (!usernameValue) {
                            handleOpenSnackbar("error", "Chưa nhập mail!");
                          } else {
                            handleOpenSnackbar(
                              "info",
                              "Đang gửi code đến mail của bạn!"
                            );
                            emailAPI
                              .verifyEmail({
                                email: usernameValue,
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
              <Typography variant='subtitle2' sx={{ fontWeight: "600" }}>
                Đăng ký
              </Typography>
            </Button>
            <Box sx={{ mt: "32px", textAlign: "center" }}>
              <Typography component='span' sx={{ mr: "4px" }}>
                Bạn đã có tài khoản?
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
