import React, { useState, useEffect } from "react";
import PastryItem, {
  PastryItemsContainer,
} from "../CheckoutCart/components/PastryItem/PastryItem";
import CreamyItem from "./components/CreamyItem";
import { creamyItemFakeData } from "./utils/creamyItemFakeData";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cookie_apiCalls, visit_apiCaller } from "../../../core/services/agent";
import { formatPrice } from "../../../core/utility/utils";
import { useLoadingContext } from "./../../../core/contexts/LoadingContext/LoadingContext";
import { useCreamyCookiesContext } from "../../../core/contexts/CreamyCookiesContext/CreamyCookiesContext";
// import { useCreamyCookiesContext } from "../../../core/contexts/CreamyCookiesContext/CreamyCookiesContext";
import "./styles/CreamyCookie.scss";
import CookieCategoriesItem from "./components/CookieCategoriesItem";
import { Alert } from "@mui/material";

const CreamyCookie = () => {
  // Contexts
  const {
    boxRows,
    // boxcount,
    setBoxRowCount,
    setBoxSizeNumber,
    allCreamyCookies,
    handleCreamyCookieItemClicked,
    handleDeleteCreamyCookieItem,
    getAllCreamyCookies,
    creamyCookiePrice,
    setCategoryId,
    categoryId,
  } = useCreamyCookiesContext();
  const { handleClose, handleOpen } = useLoadingContext();

  //
  const { state, pathname } = useLocation();
  const { boxcount } = useParams();

  //States
  const [categoriesList, setCategoriesList] = useState([]);

  //
  useEffect(() => {
    setBoxRowCount(boxcount);
    setBoxSizeNumber(state?.boxSizeNumber);
  }, [boxcount]);

  useEffect(() => {
    getAllCreamyCookies();
  }, []);

  const getAllategories = () => {
    apiCaller({
      api: cookie_apiCalls.apiCall_getAllCategories,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setCategoriesList(resp?.data?.data);
        }
      },
      onErrorMessage: "عملیات دریافت دسته بندی با خطا مواجهه شد",
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllategories();
  }, []);

  const handleFiltering = (id) => {
    if (id == categoryId) {
      setCategoryId(undefined);
    } else {
      setCategoryId(id);
    }
  };
  const sendVisitToApi = () => {
    const ipurl = window.location.host + location.pathname;
    fetch("https://api.ipify.org?format=json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      apiCaller({
        api: visit_apiCaller.apiCall_createdVisit,
        apiArguments: {
          webPage: 3,
          ip: data.ip,
          domain: ipurl
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching IP:", error)
    })
  };

  useEffect(() => {
    sendVisitToApi();
  }, [location.pathname]);
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <div className="w-100">
        
        {/* boxes */}
        <div
          className="d-flex  px-4 rounded jusify-content-between align-items-stretch w-100"
          style={{
            position: "fixed",
            top: "81px",
            maxWidth: "576px",
            left: "0px",
            right: "0px",
            margin: "0px auto",
            backgroundColor: "#fff",
            zIndex: "9999999",
          }}
        >
        
        </div>
        {/* <h6 className="mb-2 mt-4" style={{ fontWeight: "600" }}>
          دسته بندی :{" "}
        </h6> */}
        {/* <div className="overflow-hidden w-100 d-flex justify-content-start align-items-stretch mb-3">
          {categoriesList?.map((item) => (
            <CookieCategoriesItem
              key={item?.id}
              itemId={item?.id}
              itemText={item?.title}
              itemImg={item?.image}
              isActive={false}
              categoryId={categoryId}
              filterHandler={handleFiltering}
              filtersCount={allCreamyCookies.length}
            />
          ))}
        </div> */}
        {/* items */}
        <div className="d-flex flex-wrap ">
          {allCreamyCookies?.length !== 0 ? (
            allCreamyCookies?.map((item, indx) => (
              <CreamyItem
                key={item?.id + indx}
                cookieId={item?.id}
                cookieName={item?.title}
                cookieImg={item?.image}
                id={item?.id}
                price={item?.category?.price}
                title={item.category?.title}
                itemClickHandler={handleCreamyCookieItemClicked}
                className={(indx % 2 === 0 ? "pe-2" : "ps-2 ") + " mt-3"}
              />
            ))
          ) : (
            <Alert className="w-100" severity="warning">
              متاسفانه شیرینی موجود نیست
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreamyCookie;
/*

  // const [allCreamyCookies, setAllCreamyCookies] = useState();
  // const [boxRowCount, setBoxRowCount] = useState();
  // const [boxRows, setBoxRows] = useState([]);
  // const [hasEmptyRows, setHasEmptyRows] = useState(true);
  // const navigate = useNavigate();
  // const { state } = useLocation();

  // // handle Creamy Cookie Item Clicked
  // const handleCreamyCookieItemClicked = (cookieId) => {
  //   const clonedBoxRows = JSON.parse(JSON.stringify(boxRows));
  //   const emptyRowIndx = clonedBoxRows?.findIndex((it) => it.cookie === null);
  //   if (emptyRowIndx >= 0) {
  //     clonedBoxRows[emptyRowIndx].cookie = allCreamyCookies?.find(
  //       (it) => it.id === cookieId
  //     );
  //     setBoxRows(clonedBoxRows);
  //   }
  //   const hasEmptyRow = clonedBoxRows?.some((it) => it.cookie === null);
  //   if (hasEmptyRow) {
  //     setHasEmptyRows(true);
  //   } else {
  //     setHasEmptyRows(false);
  //     navigate("/creamy-cookie-detail");
  //   }
  // };

  // // handle Delete Creamy Cookie Item
  // const handleDeleteCreamyCookieItem = (itemId) => {
  //   const clonedBoxRows = JSON.parse(JSON.stringify(boxRows));
  //   const currentItemIndex = boxRows?.findIndex(
  //     (item) => item?.cookie?.id === itemId
  //   );
  //   clonedBoxRows[currentItemIndex].cookie = null;
  //   setBoxRows(clonedBoxRows);
  // };

  // // Create Box Rows
  // const createBoxRows = (count) => {
  //   let arr = [];
  //   for (let i = 0; i < count; i++) {
  //     arr.push({ cookie: null });
  //   }
  //   setBoxRows(arr);
  // };

  // useEffect(() => {
  //   createBoxRows(boxRowCount);
  // }, [boxRowCount]);

  // useEffect(() => {
  //   if (window.location.pathname === "/creamy-cookie-detail") {
  //     if (boxRows?.some((it) => it.cookie === null)) {
  //       navigate(-1);
  //     }
  //   }
  // }, [window.location.pathname, boxRows]);

  // // Get All Creamy Cookies
  // const getAllCreamyCookies = () => {
  //   apiCaller({
  //     api: cookie_apiCalls.apiCall_getAllCookies,
  //     apiArguments: 1,
  //     onSuccess: (resp) => {
  //       if (resp.status === 200 && resp.data.statusCode === 200) {
  //         setAllCreamyCookies(resp?.data?.data);
  //       }
  //     },
  //     onError: (err) => {
  //     },
  //     onStart: handleOpen,
  //     onEnd: handleClose,
  //   });
  // };

  // useEffect(() => {
  //   getAllCreamyCookies();
  // }, []);

  // useEffect(() => {
  //   setBoxRowCount(boxcount);
  // }, [boxcount]);
*/
