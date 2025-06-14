import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiCaller } from "../../custom-hooks/useApi";
import { cookie_apiCalls } from "../../services/agent";
import { useLoadingContext } from "../LoadingContext/LoadingContext";

const CookiesContext = createContext();

const CookiesContextProvider = ({ children }) => {
  const { handleClose, handleOpen } = useLoadingContext();
  //
  const [allCookies, setAllCookies] = useState();
  const [boxRowCount, setBoxRowCount] = useState();
  const [boxRows, setBoxRows] = useState([]);
  const [boxSizeNumber, setBoxSizeNumber] = useState();
  const [hasEmptyRows, setHasEmptyRows] = useState(true);
  const navigate = useNavigate();
  const { boxcount } = useParams();

  // handle Cookie Item Clicked
  const handleCookieItemClicked = (cookieId) => {
    const clonedBoxRows = JSON.parse(JSON.stringify(boxRows));
    const emptyRowIndx = clonedBoxRows?.findIndex((it) => it.cookie === null);
    if (emptyRowIndx >= 0) {
      clonedBoxRows[emptyRowIndx].cookie = allCookies?.find(
        (it) => it.id === cookieId
      );
      setBoxRows(clonedBoxRows);
    }
    const hasEmptyRow = clonedBoxRows?.some((it) => it.cookie === null);
    if (hasEmptyRow) {
      setHasEmptyRows(true);
    } else {
      setHasEmptyRows(false);
      navigate("/cookie-detail");
    }
  };

  // handle Delete Cookie Item
  const handleDeleteCookieItem = (itemId) => {
    const clonedBoxRows = JSON.parse(JSON.stringify(boxRows));
    const currentItemIndex = boxRows?.findIndex(
      (item) => item?.cookie?.id === itemId
    );
    clonedBoxRows[currentItemIndex].cookie = null;
    setBoxRows(clonedBoxRows);
  };

  // Create Box Rows
  const createBoxRows = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({ cookie: null });
    }
    setBoxRows(arr);
  };

  useEffect(() => {
    createBoxRows(boxRowCount);
  }, [boxRowCount]);

  useEffect(() => {
    if (window.location.pathname === "/cookie-detail") {
      if (boxRows?.some((it) => it.cookie === null)) {
        navigate(-1);
      }
    }
  }, [window.location.pathname, boxRows]);

  // Get All Cookies
  const getAllCookies = () => {
    // apiCaller({
    //   api: cookie_apiCalls.apiCall_getAllCookies,
    //   apiArguments: 0,
    //   onSuccess: (resp) => {
    //     if (resp.status === 200 && resp.data.statusCode === 200) {
    //       setAllCookies(resp?.data?.data);
    //     }
    //   },
    //   onError: (err) => {},
    //   onStart: handleOpen,
    //   onEnd: handleClose,
    // });
  };

  useEffect(() => {
    getAllCookies();
  }, []);

  useEffect(() => {
    setBoxRowCount(boxcount);
  }, [boxcount]);

  const providerValue = {
    // States
    allCookies,
    hasEmptyRows,
    boxRows,
    boxRowCount,
    boxSizeNumber,
    createBoxRows,
    // Set States
    setBoxSizeNumber,
    setBoxRowCount,
    // Functions
    handleCookieItemClicked,
    handleDeleteCookieItem,
    getAllCookies,
  };

  return (
    <CookiesContext.Provider value={providerValue}>
      {children}
    </CookiesContext.Provider>
  );
};

export const useCookiesContext = () => useContext(CookiesContext);

export default CookiesContextProvider;
