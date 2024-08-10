import { createContext, useEffect, useState } from "react";
import accountAPI from "../api/accountAPI";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [myAccount, setMyAccount] = useState(null);

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
      });
  };

  return (
    <AppContext.Provider value={{ getMyAccount, myAccount, setMyAccount }}>
      {children}
    </AppContext.Provider>
  );
};
