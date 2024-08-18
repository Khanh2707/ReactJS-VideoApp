import { createContext, useEffect, useState } from "react";
import accountAPI from "../api/accountAPI";
import { Backdrop, CircularProgress } from "@mui/material";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [myAccount, setMyAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // API
  const getMyAccount = () => {
    accountAPI
      .myAccount()
      .then((response) => {
        setMyAccount(response.result);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getMyAccount();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{ bgcolor: "primary.main", transitionDuration: "0ms" }}
      >
        <CircularProgress sx={{ color: "text.primary" }} size={100} />
      </Backdrop>
    );
  }

  return (
    <AppContext.Provider value={{ getMyAccount, myAccount, setMyAccount }}>
      {children}
    </AppContext.Provider>
  );
};
