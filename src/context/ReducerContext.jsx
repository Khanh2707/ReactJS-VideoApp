import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action) {
    case "RELOAD":
      return !state;

    default:
      return state;
  }
};

export const ReducerContext = createContext({});

export const ReducerProvider = ({ children }) => {
  const [reloadComponent, dispatch] = useReducer(reducer, false);

  const handleReloadComponent = () => {
    dispatch("RELOAD");
  };

  return (
    <ReducerContext.Provider value={{ reloadComponent, handleReloadComponent }}>
      {children}
    </ReducerContext.Provider>
  );
};
