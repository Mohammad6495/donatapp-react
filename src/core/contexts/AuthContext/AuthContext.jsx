import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import http from "../../services/http";
import usePersistedState from "use-persisted-state-hook";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userToken, set_userToken] = useState(
    http.getToken(http.tokenKey) || ""
  );
  const [branchToken, set_branchToken] = useState(
    http.getToken(http.userBranchTokenKey) || ""
  );
  const [validIn, set_validIn] = useState(
    http.getToken(http.validInInstagram) || ""
  );
  useEffect(() => {
    http.removeToken(http.validInInstagram)
    set_validIn(undefined)
  }, [])
  const providerValue = {
    userToken,
    set_userToken,
    branchToken,
    set_branchToken,
    set_validIn,
    validIn
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
