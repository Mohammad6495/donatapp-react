import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import { useNavigate, useParams } from "react-router";
import { apiCaller } from "../../custom-hooks/useApi";
import { cookie_apiCalls } from "../../services/agent";
import { branches_apiCalls } from "../../services/agent";
import { useLoadingContext } from "../LoadingContext/LoadingContext";
import { creamyItemFakeData } from "../../../UI/pages/CreamyCookie/utils/creamyItemFakeData";
// import usePersistedState from "use-persisted-state-hook";

const CreamyCookiesContext = createContext();

const CreamyCookiesContextProvider = ({ children }) => {
  const { handleClose, handleOpen } = useLoadingContext();
  //
  const [allCreamyCookies, setAllCreamyCookies] = useState();
  const [boxRowCount, setBoxRowCount] = useState();
  const [boxRows, setBoxRows] = useState([]);
  const [boxSizeNumber, setBoxSizeNumber] = useState();
  const [hasEmptyRows, setHasEmptyRows] = useState(true);
  const [categoryId, setCategoryId] = useState()
  const [creamyCookiePrice, setCreamyCookiePrice] = useState();
  const navigate = useNavigate();
  const { boxcount } = useParams();

  // handle Creamy Cookie Item Clicked
  const handleCreamyCookieItemClicked = (cookieId) => {
    const clonedBoxRows = JSON.parse(JSON.stringify(boxRows));
    const emptyRowIndx = clonedBoxRows?.findIndex((it) => it.cookie === null);
    if (emptyRowIndx >= 0) {
      clonedBoxRows[emptyRowIndx].cookie = allCreamyCookies?.find(
        (it) => it.id === cookieId
      );
      setBoxRows(clonedBoxRows);
    }
    const hasEmptyRow = clonedBoxRows?.some((it) => it.cookie === null);
    if (hasEmptyRow) {
      setHasEmptyRows(true);
    } else {
      setHasEmptyRows(false);
      navigate("/creamy-cookie-detail");
    }
  };

  // handle Delete Creamy Cookie Item
  const handleDeleteCreamyCookieItem = (itemId) => {
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
    if (window.location.pathname === "/creamy-cookie-detail") {
      if (boxRows?.some((it) => it.cookie === null)) {
        navigate(-1);
      }
    }
  }, [window.location.pathname, boxRows]);

  // Get All Creamy Cookies
  const getAllCreamyCookies = () => {
    apiCaller({
      api: cookie_apiCalls.apiCall_getAllCreamyCookie,
      apiArguments: categoryId,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          const filterList = resp?.data?.data.filter(a=>a.cookieType == 1);
          setAllCreamyCookies(filterList);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  //  Get Creamy Cookie Price
  const getCreamyCookiesPrice = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_getcreamycookieprice,
      apiArguments: 1,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          setCreamyCookiePrice(resp?.data?.data);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllCreamyCookies();
  }, [categoryId])
  useEffect(() => {
    getCreamyCookiesPrice();
  }, []);

  useEffect(() => {
    setBoxRowCount(boxcount);
  }, [boxcount]);

  // Value Provider
  const providerValue = {
    // States
    allCreamyCookies,
    hasEmptyRows,
    boxRows,
    boxRowCount,
    boxcount,
    boxSizeNumber,
    setBoxRows,
    createBoxRows,
    // Set States
    setBoxRowCount,
    setBoxSizeNumber,
    // Functions
    handleCreamyCookieItemClicked,
    handleDeleteCreamyCookieItem,
    getAllCreamyCookies,
    //creamyCookiePrice
    creamyCookiePrice,
    setCategoryId,
    categoryId
  };

  return (
    <CreamyCookiesContext.Provider value={providerValue}>
      {children}
    </CreamyCookiesContext.Provider>
  );
};

export const useCreamyCookiesContext = () => useContext(CreamyCookiesContext);

export default CreamyCookiesContextProvider;
