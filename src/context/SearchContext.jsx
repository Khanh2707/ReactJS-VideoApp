import { createContext, useState } from "react";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [valueSearchAllVideo, setValueSearchAllVideo] = useState("");

  return (
    <SearchContext.Provider
      value={{
        valueSearchAllVideo,
        setValueSearchAllVideo,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
