import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import http from "./../../services/http";
import { getItem, setItem } from "../../services/storage/storage";
//////////////////////
const ShowBranchModalContext = createContext();
export const useShowBranchModalContext = () =>
  useContext(ShowBranchModalContext);
//////////////////////
const ShowBranchModalContextProvider = ({ children }) => {
  const [branchModalIsAllowed, setBranchModalIsAllowed] = useState(false);

  useEffect(() => {
    /////////////
    const appOpenedCount = Number(getItem("AppOpenedCount"));
    /////////////
    const branchCode = getItem(http.branchKey);
    if (branchCode && appOpenedCount >= 1) {
      setBranchModalIsAllowed(false);
    } else setBranchModalIsAllowed(true);
    /////////////
    if ((appOpenedCount && appOpenedCount < 3) || appOpenedCount < 6) {
      setItem("AppOpenedCount", appOpenedCount + 1);
    }
    if (!appOpenedCount) {
      setItem("AppOpenedCount", 1);
    }
  }, []);
  return (
    <ShowBranchModalContext.Provider
      value={useMemo(() => ({
        branchModalIsAllowed,
        setBranchModalIsAllowed,
      }))}
    >
      {children}
    </ShowBranchModalContext.Provider>
  );
};

export default ShowBranchModalContextProvider;
