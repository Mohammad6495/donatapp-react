import React, { useState, useEffect } from "react";
import PastryItem, {
  PastryItemsContainer,
} from "../CheckoutCart/components/PastryItem/PastryItem";
import CookieItem from "./components/CookieItem";
// import { creamyItemFakeData } from "./utils/creamyItemFakeData";
import { useLocation, useNavigate, useParams } from "react-router";
import { useCookiesContext } from "../../../core/contexts/CookiesContext/CookiesContext";
import "./styles/Cookie.scss";
import { Button } from "@mui/material";
import { visit_apiCaller } from "../../../core/services/agent";
import { apiCaller } from "../../../core/custom-hooks/useApi";

const Cookie = () => {
  const location = useLocation();
  // Contexts
  const {
    boxRows,
    // boxcount,
    setBoxRowCount,
    setBoxSizeNumber,
    allCookies,
    handleCookieItemClicked,
    handleDeleteCookieItem,
    getAllCookies,
  } = useCookiesContext();
  //
  //
  const { state } = useLocation();
  const { boxcount } = useParams();
  const navigate = useNavigate();
  const onDelete = () => {};
  //
  useEffect(() => {
    setBoxRowCount(boxcount);
    setBoxSizeNumber(state?.boxSizeNumber);
  }, [boxcount]);

  useEffect(() => {
    getAllCookies();
  }, []);

  const handleNavigateToNext = () => {
    navigate("/cookie-detail");
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
          webPage: 2,
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
      
        <div className="d-flex flex-wrap m-0 p-0 flex-row justify-content-start align-items-stretch">
          {allCookies &&
            allCookies?.map((item, indx) => (
              <CookieItem
                key={item?.id + indx}
                cookieId={item?.id}
                cookieName={item?.title}
                pricePerKG={item?.pricePerKG}
                cookieImg={item?.image}
                itemClickHandler={handleCookieItemClicked}
                className={(indx % 2 === 0 ? "pe-2" : "ps-2 ") + " mt-3"}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Cookie;
