import React, { useState, useEffect, useContext, CSSProperties } from "react";
import SpinnerLoading from "../../../UI/components/spinnerLoading.component";

// import SpinnerLoading from "../../components/shared/loading-spinner/spinerLoading";

const Context = React.createContext();

const LoadingProvider = (props) => {
  const [openLoading, set_openLoading] = useState(false);

  const handleClose = () => {
    set_openLoading(false);
  };

  const handleOpen = () => {
    set_openLoading(true);
  };

  return (
    <Context.Provider
      value={{
        openLoading: openLoading,
        handleClose: handleClose,
        handleOpen: handleOpen,
      }}
    >
      {openLoading && (
        <SpinnerLoading style={{ backgroundColor: "rgb(255 255 255 / 65%)" }} />
      )}
      {props.children}
    </Context.Provider>
  );
};

export const useLoadingContext = () => {
  return useContext(Context);
};

export default LoadingProvider;
