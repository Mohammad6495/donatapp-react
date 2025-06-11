import React, { useEffect, useState } from "react";
import RefrigeratorCakeFilterItem from "./components/RefrigeratorCakeFilterItem/RefrigeratorCakeFilterItem";
import filterIcon from "../../../assets/images/filtering-button-icon.png";
import { Avatar, Button, Skeleton } from "@mui/material";
import { Close, Compare, FilterAlt, Sort } from "@mui/icons-material";
import RefrigeratorCakeFilterDrawer from "./components/RefrigeratorCakeFilterDrawer/RefrigeratorCakeFilterDrawer";
import { refrigeratorCakeFilterItemFakeData } from "./utils/refrigeratorCakeFilterItemFakeData";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import RefrigeratorCakeItems from "./components/RefrigeratorCakeItems/RefrigeratorCakeItems";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  home_apiCalls,
  refrigeratorCake_apiCalls,
  visit_apiCaller,
} from "../../../core/services/agent";
import { calcMaxAndMinPriceFunc } from "../Dessert/utils/calcMaxAndMinPrice";
import RefrigeratorCakeSortingDrawer from "./components/RefrigeratorCakeSortingDrawer/RefrigeratorCakeSortingDrawer";
import { refrigeratorCakeSortingDrawerItemData } from "./components/RefrigeratorCakeSortingDrawer/utils/RefrigeratorCakeSortingDrawerItemData";
import "./styles/RefrigeratorCake.scss";
import RefrigeratorCakeItemSkeleton from "../../components/skeletons/refrigeratorCakeItemSkeleton";
import { useWindowDimensions } from "../../../core/custom-hooks/getWindowDimensions";
import { useLocation, useNavigate } from "react-router";
import {
  locationSearchStringToObject,
  objectToQueryString,
} from "../../../core/utility/utils";
import ShowItemsFavorite from "../../components/ShowItemsFavorite/ShowItemsFavorite";
import { useFavoriteContext } from "../../../core/contexts/FavoriteContext/FavoriteContext";

const actionTypes = {
  price: "price",
  sizeId: "sizeId",
  cakeType: "cakeType",
  weight: "weight",
};

////////////
const RefrigeratorCake = () => {
  const { favoriteData } =
  useFavoriteContext();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();
  const getRangeSliderInitialValue = () => {
    const qs = location.search;
    const qo = locationSearchStringToObject(qs);
    const rangeObj = [];
    rangeObj.push(qs?.includes("minPrice") ? Number(qo.minPrice) : 0);
    if (qs?.includes("maxPrice")) {
      rangeObj.push(Number(qo.maxPrice));
    }
    return rangeObj;
  };
  const { handleClose, handleOpen } = useLoadingContext();
  const [allRefrigeratorCake, setAllRefrigeratorCake] = useState();
  const [untouchedRefrigeratorCakeData, setUntouchedRefrigeratorCakeData] =
    useState();
  const [refrigeratorCakeFilterItems, setRefrigeratorCakeFilterItems] =
    useState();
  const [filteredData, setFilteredData] = useState([]);
  const [removeFilerState, setRemoveFilerState] = useState(false);

  // ---- Start Drawer utilities ----
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  // Price Range Slider
  const [staticRangeValue, setStaticRangeValue] = useState([0, 1000000]);
  const [selectedRangeValue, setSelectedRangeValue] = useState(
    getRangeSliderInitialValue()
  );
  const [isFetching, setIsFetching] = useState(true);
  const [showFilteredItem, setShowFilteredItem] = useState(false);
  // Weight Select Option Value - Refrigerator Cakes
  const [weightSelectValue, setWeightSelectValue] = useState(0);

  // Sorting Drawer
  const [sortingDrawerIsOpen, setSortingDrawerIsOpen] = useState(false);
  const [sortingCurrentItem, setSortingCurrentItem] = useState();

  // Show Selected Items Data
  const [showSelectedItems, setShowSelectedItems] = useState([]);
  // *****************Check Boxes*****************
  // Handle Change Check Boxes

  // Minimum Inputs Changing Handler
  const handleRangeSliderMinInputChange = (e) => {
    const changedValue = [e?.target?.value, selectedRangeValue[1]];
    setSelectedRangeValue(changedValue);
  };

  // Maximum Inputs Changing Handler
  const handleRangeSliderMaxInputChange = (e) => {
    const changedValue = [selectedRangeValue[0], e?.target?.value];
    setSelectedRangeValue(changedValue);
  };

  // *****************Select Option*****************
  // Change Weight Select Option Handler
  const handleChangeWeight = (e) => {
    onCakeWeightChange(e?.target.value);
  };

  // Drawer Clicked Handler
  const handleDrawerClicked = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  // Change Range Slider Handler
  const handleChangeRangeSlider = (event, newValue) => {
    setSelectedRangeValue(newValue);
    const pRange = { minPrice: newValue[0], maxPrice: newValue[1] };
    onPriceRangeChange(pRange);
  };

  function changeLocationQueryString(filterObject) {
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    //
    switch (filterObject.type) {
      case actionTypes.price:
        if (filterObject.payload.maxPrice) {
          qo = {
            ...qo,
            maxPrice: filterObject.payload.maxPrice,
          };
        }
        if (filterObject.payload.minPrice) {
          qo = {
            ...qo,
            minPrice: filterObject.payload.minPrice,
          };
        }
        break;
      case actionTypes.sizeId:
        qo.sizeIdList = filterObject.payload.join(",");
        break;

      case actionTypes.weight:
        qo.exactWeight = filterObject.payload;
        break;
    }

    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  }

  const onPriceRangeChange = (pRange) => {
    changeLocationQueryString({
      type: actionTypes.price,
      payload: { maxPrice: pRange.maxPrice, minPrice: pRange.minPrice },
    });
  };

  // onTitleFiltersChange(cakeType)
  const onSizeFiltersChange = (cakeType) => {
    changeLocationQueryString({
      type: actionTypes.sizeId,
      payload: [cakeType],
    });
  };
  const onCakeWeightChange = (exactWeight) => {
    changeLocationQueryString({
      type: actionTypes.weight,
      payload: exactWeight,
    });
  };

  // handling show filtered items :
  const handleShowFilteredItems = () => {
    if (selectedRangeValue.length == 0) {
      setShowFilteredItem(false);
      return;
    }
    if (
      staticRangeValue[0] === selectedRangeValue[0] &&
      staticRangeValue[1] === selectedRangeValue[1]
    ) {
      setShowFilteredItem(false);
    } else {
      setShowFilteredItem(true);
    }
  };

  useEffect(() => {
    handleShowFilteredItems();
  }, [selectedRangeValue]);

  // handle Delete Filtering Items
  const handleDeleteFilteringItems = () => {
    setSelectedRangeValue(staticRangeValue);
    setAllRefrigeratorCake(untouchedRefrigeratorCakeData);
    setShowFilteredItem(false);
  };

  // ******************* END FILTERINGS ******************* //

  // --- Get All Cake Size Data ---
  const getAllCakeSizeData = () => {
    apiCaller({
      api: home_apiCalls.apiCall_getAllCakeSize,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.status == 1) {
          const newLIstItems = resp?.data?.data.map((item) => ({
            ...item,
            isFilterActive: false,
          }));
          setRefrigeratorCakeFilterItems(newLIstItems);
        }
      },
      onError: (err) => { },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllCakeSizeData();
  }, []);

  /////
  useEffect(() => {
    if (refrigeratorCakeFilterItems) {
      const acitveFilters = refrigeratorCakeFilterItems?.filter(
        (item) => item.isFilterActive === true
      );
      const array_idList = acitveFilters.map((item) => item.id);
      const sizeId = array_idList.join("_");
      apiCaller({
        api: refrigeratorCake_apiCalls.apiCall_getAllRefrigeratorCake,
        apiArguments: sizeId,
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.status == 1) {
            const data = [...resp?.data?.data];
            setAllRefrigeratorCake(data);
            setUntouchedRefrigeratorCakeData(data);
            const maxAndMin = calcMaxAndMinPriceFunc(data);
            const priceLimit = [maxAndMin.min, maxAndMin.max];
            setStaticRangeValue(priceLimit);
            setSelectedRangeValue(priceLimit);
          }
        },
        onStart: () => {
          setIsFetching(true);
          handleOpen;
        },
        onEnd: () => {
          setIsFetching(false);
          handleClose;
        },
      });
    }
  }, [refrigeratorCakeFilterItems]);

  const getSelectedWeight = () => {
    const qs = location.search;
    const qo = locationSearchStringToObject(qs);
    return qo?.exactWeight ? Number(qo.exactWeight) : 0;
  };

  function getFilteredData() {
    const clonedAllCakes = JSON.parse(JSON.stringify(allRefrigeratorCake));
    const qs = location.search;
    const qo = locationSearchStringToObject(qs);
    const newFilteredData = clonedAllCakes.filter((cake) => {
      let canSelectCake = true;
      if (typeof qo?.maxPrice !== "undefined") {
        if (cake.price > qo?.maxPrice) canSelectCake = false;
      }
      if (typeof qo?.minPrice !== "undefined") {
        if (cake.price < qo?.minPrice) canSelectCake = false;
      }
      if (typeof qo.sizeIdList !== "undefined") {
        if (qo.sizeIdList.split(",").length > 0) {
          if (!qo.sizeIdList.split(",").includes(cake.cakeSizeId.toString())) {
            canSelectCake = false;
          }
        }
      }
      if (typeof qo.exactWeight !== "undefined") {
        switch (Number(qo.exactWeight)) {
          case 0:
            canSelectCake = true;
            break;
          case 1:
            canSelectCake = cake?.exactWeight >= 0 && cake?.exactWeight <= 500;
            break;
          case 2:
            canSelectCake =
              cake?.exactWeight >= 500 && cake?.exactWeight <= 1000;
            break;
          case 3:
            canSelectCake =
              cake?.exactWeight >= 1000 && cake?.exactWeight <= 2000;
            break;
          case 4:
            canSelectCake =
              cake?.exactWeight >= 2000 && cake?.exactWeight <= 3000;
            break;
          case 5:
            canSelectCake = cake?.exactWeight >= 3000;
            break;
        }
      }
      if (typeof qo.cakeTypes !== "undefined") {
        if (qo.cakeTypes.split(",").length > 0) {
          const qoCakeTypes = qo.cakeTypes.split(",");
          if (!qoCakeTypes.some((qct) => cake.title.includes(qct))) {
            canSelectCake = false;
          }
        }
      }

      return canSelectCake;
    });
    return newFilteredData;
  }

  useEffect(() => {
    if (allRefrigeratorCake?.length > 0) {
      if (location.search) {
        setFilteredData(getFilteredData());
      } else {
        setFilteredData(allRefrigeratorCake);
      }
    }
  }, [location.search, allRefrigeratorCake]);

  // handle Filtering option
  const handleFiltering = (cakeType) => {
    const clonedFilterItems = JSON.parse(
      JSON.stringify(refrigeratorCakeFilterItems)
    );
    const currentItemIndex = clonedFilterItems.findIndex(
      (it) => it.id === cakeType
    );
    if (clonedFilterItems[currentItemIndex].isFilterActive == true) {
      clonedFilterItems[currentItemIndex].isFilterActive = false;
    } else {
      clonedFilterItems[currentItemIndex].isFilterActive = true;
    }
    setRefrigeratorCakeFilterItems(clonedFilterItems);
  };


  // handleRemoveAllFilter
  const handleRemoveAllFilter = () => {
    const cloned_refrigeratorCakeFilterItems = JSON.parse(
      JSON.stringify(refrigeratorCakeFilterItems)
    );
    cloned_refrigeratorCakeFilterItems.forEach((item) => {
      item.isFilterActive = false;
    });
    setRefrigeratorCakeFilterItems(cloned_refrigeratorCakeFilterItems);
  };
  const handleRemoveFilterItem = () => {
    navigate(location.pathname);
  };

  const removeFilerStateHandler = () => {
    if (refrigeratorCakeFilterItems) {
      if (
        refrigeratorCakeFilterItems?.some((it) => it.isFilterActive == true)
      ) {
        setRemoveFilerState(true);
      } else {
        setRemoveFilerState(false);
      }
    }
  };

  // Remove Filer State Handler
  useEffect(() => {
    removeFilerStateHandler();
  }, [refrigeratorCakeFilterItems]);

  // handle Clear All Filters
  const handleClearAllFilters = () => {
    navigate(location.pathname);
  };

  // *********************************
  // handleSortingDrawerClicking
  const handleSortingDrawerClick = () => {
    setSortingDrawerIsOpen((oldState) => !oldState);
  };

  // handle Sorting Drawer Close
  const handleSortingDrawerClose = () => {
    setSortingDrawerIsOpen((oldState) => !oldState);
    setSortingCurrentItem(null);
  };

  // handleSortingDrawerItemClick
  const handleSortingDrawerItemClick = (itemId) => {
    const currentItem = refrigeratorCakeSortingDrawerItemData?.filter(
      (it) => it?.id === itemId
    );
    setSortingCurrentItem(currentItem);
    handleSortingDrawerClick();
  };

  // handleDeleteWeightFilteringItems
  const handleDeleteWeightFilteringItems = () => {
    setWeightSelectValue(0);
  };

  const canShowFilteringTools = () => {
    if (allRefrigeratorCake?.length > 0) {
      return true;
    } else if (
      showFilteredItem ||
      removeFilerState ||
      showSelectedItems.length > 0 ||
      weightSelectValue != 0
    ) {
      return true;
    }
    return false;
  };

  //===============================//

  const isSizeIdSelected = (sizeId) => {
    // cakeSizeId
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    return qo?.sizeIdList?.length > 0 && qo?.sizeIdList?.includes(sizeId);
  };
  const selectSizeId = (sizeId) => {
    // دریافت پارامترهای جستجو از URL
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};

    // دریافت لیست sizeIdList از پارامترهای جستجو
    const sizeIdList =
      qo?.sizeIdList?.length > 0
        ? qo?.sizeIdList?.split(",").map((it) => Number(it))
        : [];

    // بررسی اینکه آیا sizeId در لیست وجود دارد یا نه
    const sizeIdNumber = Number(sizeId);
    const isSelected = sizeIdList.includes(sizeIdNumber);

    if (isSelected) {
      // اگر sizeId در لیست است، حذف آن
      delete qo.sizeIdList;
    } else {
      // اگر sizeId در لیست نیست، انتخاب آن و حذف بقیه آیتم‌ها
      qo.sizeIdList = sizeIdNumber.toString();
    }

    // ساختن رشته جدید جستجو و هدایت به URL جدید
    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
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
          webPage: 0,
          ip: data.ip,
          domain: ipurl
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching IP:", error)
    })
  }

  useEffect(() => {
    sendVisitToApi()
  }, [location.pathname])

  //===============================//

  return (
    <section
      style={{ overflowY: "auto" }}
      className={`m-0 p-0 p-2 pb-5 d-flex flex-column justify-content-start w-100 hidden-scrollbar position-relative`}
    >
      {canShowFilteringTools() && (
        <>
            <div
            style={{
              overflowY: "auto",
              position: "fixed",
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
              top: 82,
              right: 0,
              left: 0,
              maxWidth: "576px",
              margin: '0 auto'
            }}
            className=" px-4  d-flex flex-column w-100"
          >

          <div className="d-flex justify-content-between align-items-stretch">
            {refrigeratorCakeFilterItems?.map((item) => (
              <RefrigeratorCakeFilterItem
                key={item?.id}
                itemId={item?.id}
                itemText={item?.title}
                itemImg={item?.logo}
                isActive={isSizeIdSelected(item.id)}
                filterHandler={selectSizeId}
              />
            ))}
          </div>

          <div
            style={{ overflowX: "auto" }}
            className="d-flex justify-content-start align-items-center w-100 cursor-pointer my-2 py-1 refrigerator-cake-thin-scrollbar"
          >
            <div className="d-flex justify-content-start align-items-center gap-1 noselect">
              {!isFetching && showFilteredItem && (
                <div
                  style={{ backgroundColor: "#ccc" }}
                  className="d-flex justify-content-between align-items-center py-1 px-2 rounded fs-9 mx-1"
                >
                  <span className="d-flex justify-content-center align-items-center text-nowrap fs-8 me-1">
                    قیمت از {selectedRangeValue[0]}
                  </span>
                  <span className="d-flex justify-content-center align-items-center text-nowrap fs-8">
                    تا {selectedRangeValue[1]}
                  </span>
                  <Close onClick={handleRemoveFilterItem} fontSize="small" />
                </div>
              )}
              {!isFetching && showSelectedItems.length > 0 && (
                <div
                  // key={indx}
                  style={{ backgroundColor: "#ccc" }}
                  className="d-flex justify-content-center align-items-center py-1 px-2 rounded fs-9 mx-1"
                >
                  <span className="text-nowrap">
                    {showSelectedItems.toString()}
                  </span>
                  <Close
                    // onClick={handleDeleteCheckboxeFilteringItems}
                    fontSize="small"
                  />
                </div>
              )}
              {!isFetching && weightSelectValue != 0 && (
                <div
                  style={{ backgroundColor: "#ccc" }}
                  className="d-flex justify-content-center align-items-center py-1 px-2 rounded fs-9"
                >
                  {weightSelectValue == 1 && (
                    <span className="text-nowrap">کمتر از 500 گرم</span>
                  )}
                  {weightSelectValue == 2 && (
                    <span className="text-nowrap">بین 500 تا 1000 گرم</span>
                  )}
                  {weightSelectValue == 3 && (
                    <span className="text-nowrap">بین 1000 تا 2000 گرم</span>
                  )}
                  {weightSelectValue == 4 && (
                    <span className="text-nowrap">بین 2000 تا 3000 گرم</span>
                  )}
                  {weightSelectValue == 5 && (
                    <span className="text-nowrap">بیش از 3000 گرم</span>
                  )}
                  <Close
                    onClick={handleDeleteWeightFilteringItems}
                    fontSize="small"
                  />
                </div>
              )}
            </div>
          </div>
          </div>
          <div className="" style={{ marginTop: "80px" }}></div>

          {/* Start Filter Drawer */}
          <RefrigeratorCakeFilterDrawer
            handleDrawerClicking={handleDrawerClicked}
            handleClearAllFilters={handleClearAllFilters}
            drawerIsOpen={drawerIsOpen}
            staticRangeValue={staticRangeValue}
            selectedRangeValue={selectedRangeValue}
            changeRangeSliderHandler={handleChangeRangeSlider}
            rangeSliderMaxInputChangeHandler={handleRangeSliderMaxInputChange}
            rangeSliderMinInputChangeHandler={handleRangeSliderMinInputChange}
            weightSelectValue={getSelectedWeight()}
            changeWeightHandler={handleChangeWeight}
          />
        </>
      )}
      {/* Start Refrigerator Cake Items */}
      {!isFetching && (
        <RefrigeratorCakeItems refrigeratorCakeData={filteredData} />
      )}
      <div className=" w-100 d-flex flex-row flex-wrap align-items-stretch">
        {isFetching &&
          [1, 2, 3, 4].map((it, indx) => {
            return <RefrigeratorCakeItemSkeleton key={indx} />;
          })}
      </div>
    </section>
  );
};

export default RefrigeratorCake;
