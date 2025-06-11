import React, { useContext, createContext, useState, useEffect } from "react";
import { useBranchesContext } from "../BranchesContext/BranchesContext";
import { home_apiCalls } from "../../services/agent";
import { apiCaller } from "../../custom-hooks/useApi";
import http from "../../services/http";
import "bootstrap/dist/css/bootstrap.min.css";
import { getItem, setItem } from "../../services/storage/storage";

const TipsContext = createContext();

const TipsContextProvider = ({ children }) => {
  const { branch } = useBranchesContext();
  const [tipsStep, setTipsStep] = useState(getItem(http.tipsValue) || 0); 
  const [branchAvailablityData, setBranchAvailablityData] = useState();
 
  const handleNextTips = () => {
    const newStep = Number(tipsStep) + 1;
    setTipsStep(newStep);
    setItem(http.tipsValue, newStep); 
  };

  // useEffect(() => {
  //   if (tipsStep !== undefined) {
  //     setItem(http.tipsValue, tipsStep); 
  //   }
  // }, [tipsStep]);

  useEffect(() => {
    if (branch) {
      apiCaller({
        api: home_apiCalls.apiCall_getBranchProductsAvailability,
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.status == 1) {
            setBranchAvailablityData(resp.data.data);
          }
        },
      });
    }
  }, [branch]);

  const providerValue = {
    tipsStep,
    handleNextTips,
  };

  // const handleShowTips = () => {
  //   if (branchAvailablityData?.isAvailableTomorrowCake) {
  //     if (getItem(http.tipsValue) != undefined) {
  //       setTipsStep(getItem(http.tipsValue));
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (branchAvailablityData) {
  //     handleShowTips();
  //   }
  // }, [branchAvailablityData]);

  return (
    <TipsContext.Provider value={providerValue}>
      {children}
    </TipsContext.Provider>
  );
};

export const useTipsContext = () => useContext(TipsContext);

export default TipsContextProvider;
