import React, { useEffect, useState } from "react";
import CookieItem from "./components/CookieItem";
import "./styles/Cookie.scss";
import {
  home_apiCalls,
  refrigeratorCake_apiCalls,
} from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { Alert } from "@mui/material";
import RefrigeratorCakeFilterItem from "../RefrigeratorCake/components/RefrigeratorCakeFilterItem/RefrigeratorCakeFilterItem";
import {
  locationSearchStringToObject,
  objectToQueryString,
} from "../../../core/utility/utils";
import { useNavigate, useLocation } from "react-router";
import SelectedBakeryItemsListDrawer from "../Bakery/components/SelectedBakeryItemsListDrawer/SelectedBakeryItemsListDrawer";

const Cookie = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [allCookies, setAllCookies] = useState([]);
  const [filteredCookies, setFilteredCookies] = useState([]);
  const [allCookiesCategory, setAllCookiesCategory] = useState([]);

  const { handleOpen, handleClose } = useLoadingContext();

  // --- Get All Cake Size Data ---
  const getAllCakeSizeData = () => {
    apiCaller({
      api: home_apiCalls.apiCall_getAllCakeSize,
      apiArguments: 3,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          const newListItems = resp?.data?.data.map((item) => ({
            ...item,
            isFilterActive: false,
          }));
          setAllCookiesCategory(newListItems);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllCakeSizeData();
  }, []);

  useEffect(() => {
    apiCaller({
      api: refrigeratorCake_apiCalls.apiCall_getAllRefrigeratorCake,
      apiArguments: 3,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          const data = [...resp?.data?.data];
          setAllCookies(data);
          setFilteredCookies(data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  }, []);

  const handleCookieItemClicked = (product) => {
    setCookieSelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
  
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };
  

  const isSizeIdSelected = (sizeId) => {
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    return String(qo?.sizeIdList) === String(sizeId);
  };

  const selectSizeId = (sizeId) => {
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};

    const selectedId = String(sizeId);
    const currentSelected = qo?.sizeIdList;

    if (currentSelected === selectedId) {
      delete qo.sizeIdList;
    } else {
      qo.sizeIdList = selectedId;
    }

    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  };

  useEffect(() => {
    const qs = location.search ?? "";
    const qo = locationSearchStringToObject(qs) ?? {};
    const selectedSizeId = qo?.sizeIdList;

    if (selectedSizeId) {
      const filtered = allCookies.filter(
        (item) => String(item.category) === String(selectedSizeId)
      );
      setFilteredCookies(filtered);
    } else {
      setFilteredCookies(allCookies);
    }
  }, [location.search, allCookies]);

  const [cookieSelectedItems, setCookieSelectedItems] = useState([]);

  const handleDeleteCookieItem = (itemId) => {
    setCookieSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCookieMinusButton = (itemId) => {
    setCookieSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleCookiePlusButton = (itemId) => {
    setCookieSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  

  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 px-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <div className="w-100">
        {/* boxes */}
        <div className="d-flex align-items-stretch gap-2 mb-3">
          {allCookiesCategory?.map((item) => (
            <RefrigeratorCakeFilterItem
              key={item?.id}
              isShowitemText
              itemId={item?.id}
              itemText={item?.title}
              itemImg={item?.image}
              isActive={isSizeIdSelected(item.id)}
              filterHandler={selectSizeId}
            />
          ))}
        </div>

        <div className="d-flex flex-wrap m-0 p-0 flex-row justify-content-start align-items-stretch">
          {filteredCookies?.length !== 0 ? (
            filteredCookies.map((item, indx) => (
              <CookieItem
                key={item?.id + indx}
                cookieId={item?.id}
                cookieName={item?.title}
                price={item?.price}
                cookieImg={item?.image}
                itemClickHandler={() => {handleCookieItemClicked(item)}}
                className={(indx % 2 === 0 ? "pe-2" : "ps-2 ") + " mt-3"}
              />
            ))
          ) : (
            <Alert severity="warning" className="w-100">
              هیچ شیرینی یافت نشد!
            </Alert>
          )}
        </div>
        <div className="w-100 m-0 p-0" style={{ height: "180px" }}>
          <SelectedBakeryItemsListDrawer
            selectedBakeryItemsList={cookieSelectedItems}
            deleteBakeryHandler={handleDeleteCookieItem}
            bakeryMinusButtonHandler={handleCookieMinusButton}
            bakeryPlusButtonHandler={handleCookiePlusButton}
          />
        </div>
      </div>
    </section>
  );
};

export default Cookie;
