import { createContext, useState } from "react";

export const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [stateAlert, setStateAlert] = useState("success");
  const [verticalSnackbar, setVerticalSnackbar] = useState("bottom");
  const [horizontalSnackbar, setHorizontalSnackbar] = useState("center");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (state, message, vertical, horizontal) => {
    setOpenSnackbar(false);

    setStateAlert(state);
    setContentAlert(message);
    setVerticalSnackbar(vertical);
    setHorizontalSnackbar(horizontal);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 100);
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        contentAlert,
        stateAlert,
        verticalSnackbar,
        horizontalSnackbar,
        handleCloseSnackbar,
        handleOpenSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
