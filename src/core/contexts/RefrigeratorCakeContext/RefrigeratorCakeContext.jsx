import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";

const RefrigeratorCakeContext = createContext();

const RefrigeratorCakeContextProvider = ({ children }) => {
  // Values Provider
  const providerValue = {
    // States
    // Set States
    // Functions
  };

  return (
    <RefrigeratorCakeContext.Provider value={providerValue}>
      {children}
    </RefrigeratorCakeContext.Provider>
  );
};

export const useRefrigeratorCakeContext = () => useContext(RefrigeratorCakeContext);
export default RefrigeratorCakeContextProvider;
