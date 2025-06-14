import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import http from "../../services/http";

const BranchesContext = createContext();

const BranchesContextProvider = ({ children }) => {

  const [branch, setBranch] = useState();
  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    if (http.getToken(http.branchKey)) {
      setBranch(http.getToken(http.branchKey));
    }
  }, []);

  const providerValue = {
    branch,
    setBranch,
    allBranches,
  };


  return (
    <BranchesContext.Provider value={providerValue}>
      {children}
    </BranchesContext.Provider>
  );
};

export const useBranchesContext = () => useContext(BranchesContext);

export default BranchesContextProvider;
