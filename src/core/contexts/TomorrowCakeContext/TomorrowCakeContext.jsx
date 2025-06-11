import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";

const TomorrowCakeContext = createContext();

const TomorrowCakeContextProvider = ({ children }) => {
  // Values Provider
  const providerValue = {
    // States
    // Set States
    // Functions
  };

  return (
    <TomorrowCakeContext.Provider value={providerValue}>
      {children}
    </TomorrowCakeContext.Provider>
  );
};

export const useTomorrowCakeContext = () => useContext(TomorrowCakeContext);
export default TomorrowCakeContextProvider;
