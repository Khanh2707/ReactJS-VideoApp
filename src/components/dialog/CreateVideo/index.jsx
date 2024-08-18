import {
  Backdrop,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  CircularProgress,
  Tab,
  DialogActions,
  Button,
  DialogContentText,
  Stepper,
  Step,
  StepLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ThemeContext } from "../../../context/ThemeContext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useForm } from "react-hook-form";

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

const steps = ["Chi tiết", "Chế độ hiển thị"];

export default function CreateVideo({
  openDialogCreateVideo,
  setOpenDialogCreateVideo,
}) {
  const [fileVideo, setFileVideo] = useState();
  const [error, setError] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [tabContext, setTabContext] = useState("1");
  const [isDisplayTabContext, setIsDisplayTabContext] = useState(true);
  const [isDisplayDialogConfirmCancel, setIsDisplayDialogConfirmCancel] =
    useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { themeMode } = useContext(ThemeContext);
  const buttonSelectFileVideoRef = useRef(null);
  const videoControlsRef = useRef(null);

  const handleCloseDialogCreateVideo = () => {
    if (tabContext !== "1") {
      setIsDisplayTabContext(false);
      setIsDisplayDialogConfirmCancel(true);
      setError("");
    } else {
      setOpenDialogCreateVideo(false);
      setError("");
    }
  };

  const handleCancelCreateVideo = () => {
    setOpenDialogCreateVideo(false);
    setError("");
    setFileVideo(null);
    setTabContext("1");
    setActiveStep(0);

    if (fileVideo) {
      URL.revokeObjectURL(fileVideo.preview);
    }

    setIsDisplayDialogConfirmCancel(false);
    setTimeout(() => {
      setIsDisplayTabContext(true);
    }, 300);
  };

  const handleSelectFileVideo = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "video/mp4") {
      setOpenBackdrop(true);

      file.preview = URL.createObjectURL(file);
      setFileVideo(file);
      setError("");
      setOpenBackdrop(false);
      setTabContext("2");
    } else {
      setError("Định dạng không hợp lệ");
      setFileVideo(null);
    }
  };

  const handleClickIcon = () => {
    buttonSelectFileVideoRef.current.click();
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleChangeTabContext = (event, newValue) => {
    setTabContext(newValue);
  };

  const handleBackStepUploadVideo = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStepUploadVideo = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (fileVideo) {
      console.log("Video đã được chọn:", fileVideo);
    }

    return () => {
      fileVideo && URL.revokeObjectURL(fileVideo.preview);
    };
  }, [fileVideo]);

  const [titleChannelLength, setTitleChannelLength] = useState(0);

  const handleTitleChannelChange = (event) => {
    setTitleChannelLength(event.target.value.length);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData) => {
    console.log("Form data is: ", formData);
  };

  return (
    <Dialog
      open={openDialogCreateVideo}
      onClose={handleCloseDialogCreateVideo}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableScrollLock
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: "20px",
        },
      }}
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      {isDisplayDialogConfirmCancel && (
        <>
          <DialogTitle>{"Hủy đăng video?"}</DialogTitle>
          <DialogContent sx={{ width: "300px" }}>
            <DialogContentText id='alert-dialog-description'>
              Nếu hùy đăng video, mọi tùy chọn với video sẽ bị mất?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "#3ea6ff", fontWeight: "600" }}
              onClick={handleCancelCreateVideo}
              autoFocus
            >
              Hủy
            </Button>
            <Button
              sx={{ color: "#3ea6ff", fontWeight: "600" }}
              onClick={() => {
                setIsDisplayTabContext(true);
                setIsDisplayDialogConfirmCancel(false);
              }}
            >
              Tiếp tục
            </Button>
          </DialogActions>
        </>
      )}
      {isDisplayTabContext && (
        <>
          <TabContext value={tabContext}>
            <TabPanel value='1' sx={{ p: "0" }}>
              <Box sx={{ width: "400px" }}>
                <DialogTitle sx={{ fontWeight: "700" }}>
                  {"Tải video lên"}
                </DialogTitle>
                <Divider />
                <DialogContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "16px",
                    position: "relative",
                  }}
                >
                  <Box
                    onClick={handleClickIcon}
                    sx={{
                      width: "136px",
                      height: "136px",
                      borderRadius: "50%",
                      bgcolor:
                        themeMode === "light" ? "#ddd" : "rgb(22, 22, 22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      opacity: "0.6",
                    }}
                  >
                    <FileUploadIcon sx={{ fontSize: "60px" }} />
                  </Box>
                  <input
                    type='file'
                    ref={buttonSelectFileVideoRef}
                    onChange={handleSelectFileVideo}
                    style={{ display: "none" }}
                    // accept="video/mp4"
                  />
                  <Typography>Chọn video để tải lên</Typography>
                  {error && (
                    <Typography color='error' variant='subtitle2'>
                      {error}
                    </Typography>
                  )}
                  <Backdrop
                    sx={{
                      zIndex: 100,
                      position: "absolute",
                      backgroundColor:
                        themeMode === "light"
                          ? "rgba(255, 255, 255, 0.4)"
                          : "rgba(15, 18, 20, 0.4)",
                    }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                  >
                    <CircularProgress
                      color='inherit'
                      sx={{
                        position: "absolute",
                        top: "70px",
                      }}
                    />
                  </Backdrop>
                </DialogContent>
              </Box>
            </TabPanel>
            {tabContext !== "1" && (
              <>
                <DialogTitle sx={{ fontWeight: "700" }}>
                  {"Tiêu đề video"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Stepper activeStep={activeStep} sx={{ minWidth: "340px" }}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </DialogContent>
              </>
            )}
            <TabPanel value='2'>
              <Box sx={{ display: "flex", gap: "24px" }}>
                <Box>
                  <Typography sx={{ fontWeight: "600", mb: "4px" }}>
                    Tiêu đề (bắt buộc)
                  </Typography>
                  <TextField
                    placeholder='VD: Video đầu tiên của tôi!'
                    size='small'
                    error={!!errors.titleVideo}
                    autoComplete='titleVideo'
                    fullWidth
                    id='titleVideo'
                    name='titleVideo'
                    helperText={errors.titleVideo?.message || ""}
                    {...register("titleVideo", {
                      required: "Vui lòng nhập trường này",
                      maxLength: {
                        value: 100,
                        message: "Tiêu đề không được quá 100 ký tự",
                      },
                      onChange: (e) => {
                        clearErrors("titleVideo");
                        handleTitleChannelChange(e);
                      },
                    })}
                    sx={{
                      width: "500px",
                      ...textFieldStyles,
                      "& .MuiInputBase-input": {
                        paddingBottom: "25px",
                      },
                    }}
                    multiline
                    minRows={2}
                    maxRows={Infinity}
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
                          <Typography>{`${titleChannelLength}/100`}</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box>
                  {fileVideo && (
                    <video
                      controls
                      ref={videoControlsRef}
                      style={{ width: "320px", height: "180px" }}
                    >
                      <source src={fileVideo.preview} type='video/mp4' />
                    </video>
                  )}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value='3'>
              <Typography>Chế độ hiển thị</Typography>
            </TabPanel>
            {tabContext !== "1" && (
              <DialogActions>
                <TabList
                  onChange={handleChangeTabContext}
                  aria-label='lab API tabs example'
                  TabIndicatorProps={{
                    sx: {
                      display: "none",
                    },
                  }}
                >
                  {activeStep >= 1 && (
                    <Tab
                      label='Quay lại'
                      value={tabContext}
                      disabled={activeStep === 0}
                      onClick={() => {
                        const prevTab = (parseInt(tabContext) - 1).toString();
                        setTabContext(prevTab);
                        handleBackStepUploadVideo();
                      }}
                    />
                  )}
                  {activeStep !== steps.length && (
                    <Tab
                      type='submit'
                      label='Tiếp'
                      value={tabContext}
                      // onClick={() => {
                      //   const nextTab = (parseInt(tabContext) + 1).toString();
                      //   if (nextTab <= "3") {
                      //     setTabContext(nextTab);
                      //   }
                      //   handleNextStepUploadVideo();
                      // }}
                    />
                  )}
                </TabList>
              </DialogActions>
            )}
          </TabContext>
        </>
      )}
    </Dialog>
  );
}
