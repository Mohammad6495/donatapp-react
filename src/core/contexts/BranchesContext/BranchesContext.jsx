import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import http from "../../services/http";
import { json, useLocation } from "react-router";
import usePersistedState from "use-persisted-state-hook";
import { apiCaller } from "../../custom-hooks/useApi";
import { branches_apiCalls } from "../../services/agent";
import { useLoadingContext } from "../LoadingContext/LoadingContext";

const BranchesContext = createContext();

const BranchesContextProvider = ({ children }) => {
  const location = useLocation();
  const { handleClose, handleOpen } = useLoadingContext();

  const [branch, setBranch] = useState();
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    if (http.getToken(http.branchKey)) {
      setBranch(http.getToken(http.branchKey));
    }
    // else {
    //   setBranch(4);
    //   http.setToken(http.branchKey, 4)
    // }
  }, []);

  const providerValue = {
    branch,
    setBranch,
    allBranches,
  };

  // get All Branches
  const getAllBranches = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_getAllBranches,
      onSuccess: (resp) => {
        if (resp.status === 200) {
          setAllBranches(resp.data.data);
        }
      },
      // onStart: location.pathname === "/" ? handleOpen : null,
      // onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllBranches();
    if (location.search == "?branch=5") {
      setBranch(5);
      http.setToken(http.branchKey, JSON.stringify(5));
    }
    if (location.search == "?branch=4") {
      setBranch(4);
      http.setToken(http.branchKey, JSON.stringify(4));
    }
  }, []);

  return (
    <BranchesContext.Provider value={providerValue}>
      {children}
    </BranchesContext.Provider>
  );
};

export const useBranchesContext = () => useContext(BranchesContext);

export default BranchesContextProvider;
