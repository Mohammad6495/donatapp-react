import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  products_apiCalls,
  visit_apiCaller,
} from "../../../core/services/agent";
import OrdinaryButton, {
  SimpleButton,
} from "../../components/OrdinaryButton/OrdinaryButton";
import { Close, Sort, FilterAlt } from "@mui/icons-material";
import filterIcon from "../../../assets/images/filtering-button-icon.png";
import { Alert, AlertTitle, Avatar, Button } from "@mui/material";
import DessertItem from "./components/DessertItem/DessertItem";
import DessertItem2 from "./components/DessertItem2/DessertItem2";
import SelectedDessertItemsListDrawer from "./components/SelectedDessertItemsListDrawer/SelectedDessertItemsListDrawer";
import DessertFilterDrawer from "./components/DessertFilterDrawer/DessertFilterDrawer";
import { calcMaxAndMinPriceFunc } from "./utils/calcMaxAndMinPrice";
import DessertSortingDrawer from "./components/DessertSortingDrawer/DessertSortingDrawer";
import { dessertSortingDrawerItemData } from "./components/DessertSortingDrawer/utils/dessertSortingDrawerItemData";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useLocation, useNavigate } from "react-router";
import "./styles/Dessert.scss";
import { useDessertAndBakeryContext } from "../../../core/contexts/DessertAndBakery/dessertAndBakery";
import BakeryFilterItem from "../Bakery/components/BakeryFilterItem/BakeryFilterItem";

const Dessert = () => {
  const navigate = useNavigate();
  // Context
  const { handleClose, handleOpen } = useLoadingContext();
  // States
  const [allDessert, setAllDessert] = useState();
  const [pureAllDessert, setPureAllDessert] = useState();
  const { dessertSelectedItems, setDessertSelectedItems } =
    useDessertAndBakeryContext();

  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const [sortingDrawerIsOpen, setSortingDrawerIsOpen] = useState(false);
  const [sortingCurrentItem, setSortingCurrentItem] = useState();
  const [bakeryFilterItems, setBakeryFilterItems] = useState();
  const [removeFilerState, setRemoveFilerState] = useState(false);
  // Filtering States
  const [staticPriceRangeValue, setStaticPriceRangeValue] = useState([
    0, 1000000,
  ]);
  const [selectedPriceRangeValue, setSelectedPriceRangeValue] = useState([
    0, 1000000,
  ]);
  const [showFilteredItem, setShowFilteredItem] = useState(false); // =====================================
  // const [inputPriceRangeValue, setInputPriceRangeValue] = useState([]);

  // Weight Select Option Value - Dessert
  // const [weightSelectValue, setWeightSelectValue] = useState(0);
  // --- Get All Bakery Size Data ---
  const getAllBakerySizeData = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getDessertFilterItemsList,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.status == 1) {
          const newLIstItems = resp?.data?.data.map((item) => ({
            ...item,
            isFilterActive: false,
          }));
          setBakeryFilterItems(newLIstItems);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllBakerySizeData();
  }, []);
  //**************************************************//
  useEffect(() => {
    if (bakeryFilterItems) {
      const acitveFilters = bakeryFilterItems?.filter(
        (item) => item.isFilterActive === true
      );
      const array_idList = acitveFilters.map((item) => item.id);
      const sizeId = array_idList.join("_");

      apiCaller({
        api: products_apiCalls.apiCall_getAllDessert,
        apiArguments: sizeId,
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.status == 1) {
            setAllDessert(resp?.data?.data);
          }
        },
        onStart: handleOpen,
        onEnd: handleClose,
      });
    }
  }, [bakeryFilterItems]);
  // handle Filtering option
  const handleFiltering = (cakeType) => {
    const clonedFilterItems = JSON.parse(JSON.stringify(bakeryFilterItems));
    
    const currentItemIndex = clonedFilterItems.findIndex(
      (item) => item.id === cakeType
    );
    
    const isCurrentlyActive = clonedFilterItems[currentItemIndex].isFilterActive;
    
    clonedFilterItems.forEach(item => {
      if (item.id === cakeType) {
        item.isFilterActive = !isCurrentlyActive; 
      } else {
        item.isFilterActive = false; 
      }
    });
    
    setBakeryFilterItems(clonedFilterItems);
  };
  
  //*************************************************//
  // handleRemoveAllFilter
  const handleRemoveAllFilter = () => {
    const cloned_BakeryFilterItems = JSON.parse(
      JSON.stringify(bakeryFilterItems)
    );
    cloned_BakeryFilterItems.forEach((item) => {
      item.isFilterActive = false;
    });
    setBakeryFilterItems(cloned_BakeryFilterItems);
  };

  // Remove Filer State Handler
  const removeFilerStateHandler = () => {
    if (bakeryFilterItems) {
      if (bakeryFilterItems?.some((it) => it.isFilterActive == true)) {
        setRemoveFilerState(true);
      } else {
        setRemoveFilerState(false);
      }
    }
  };
  useEffect(() => {
    removeFilerStateHandler();
  }, [bakeryFilterItems]);
  //*************************************************//
  // CheckBoxes State
  const [allCheckBoxData, setAllCheckBoxData] = useState([
    { id: "1", checked: false, text: "ژله", title: "gelly" },
    { id: "2", checked: false, text: "دسر", title: "dessert" },
    // { id: "3", checked: false, text: "گردو", title: "chocolate" },
  ]);

  // Show Selected Items Data
  const [showSelectedItems, setShowSelectedItems] = useState([]); // =====================================

  // *****************Check Boxes*****************
  // Handle Change Check Boxes
  const handleChangeCheckBoxes = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(allCheckBoxData));
    const currentItemIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (clonedData[currentItemIndex].checked == false) {
      clonedData[currentItemIndex].checked = true;
    } else {
      clonedData[currentItemIndex].checked = false;
    }
    setAllCheckBoxData(clonedData);
  };

  // for filtering on checkboxes
  const onAllCheckBoxDataChange = () => {
    const selectedItems = allCheckBoxData
      ?.filter((it) => it?.checked == true)
      .map((it) => it.text);

    let filteredData = pureAllDessert;
    if (
      selectedPriceRangeValue[0] != staticPriceRangeValue[0] ||
      selectedPriceRangeValue[1] != staticPriceRangeValue[1]
    ) {
      const newAllDesserts = JSON.parse(JSON.stringify(pureAllDessert));
      filteredData = newAllDesserts?.filter(
        (it) =>
          it?.price >= selectedPriceRangeValue[0] &&
          it?.price <= selectedPriceRangeValue[1]
      );
    }

    if (selectedItems) {
      const filteredArray = filteredData?.filter((it) =>
        selectedItems.some((it1) => it.title.includes(it1))
      );
      setAllDessert(filteredArray);
      setShowSelectedItems(selectedItems);
    }
    if (selectedItems.length <= 0) {
      setAllDessert(filteredData);
      setShowSelectedItems([]);
    }
  };
  useEffect(onAllCheckBoxDataChange, [allCheckBoxData]);

  // handle Delete Checkboxe Filtering Items
  const handleDeleteCheckboxeFilteringItems = () => {
    // setAllDessert(pureAllDessert);
    setAllCheckBoxData([
      { id: "1", checked: false, text: "ژله", title: "gelly" },
      { id: "2", checked: false, text: "دسر", title: "dessert" },
    ]);

    setShowSelectedItems([]);
  };

  //=================================================//
  // handle Price Change Range Slider
  const handlePriceChangeRangeSlider = (event, newValue) => {
    setSelectedPriceRangeValue(newValue);
  };

  // handle Minimum Inputs Price Changing
  const handleRangeSliderMinInputChange = (e) => {
    const changedValue = [e?.target?.value, selectedPriceRangeValue[1]];
    setSelectedPriceRangeValue(changedValue);
  };

  // handle Maximum Inputs Price Changing
  const handleRangeSliderMaxInputChange = (e) => {
    const changedValue = [selectedPriceRangeValue[0], e?.target?.value];
    setSelectedPriceRangeValue(changedValue);
  };

  //*************************************************//
  // Start Drawer utilities
  const handleDrawerClicked = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //*************************************************//
  // Get All Dessert
  const getAllDessert = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getAllDessert,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.status == 1) {
          setAllDessert(resp?.data?.data);
          setPureAllDessert(resp?.data?.data);
          const maxAndMin = calcMaxAndMinPriceFunc(resp?.data?.data);
          const priceLimit = [maxAndMin.min, maxAndMin.max];
          setStaticPriceRangeValue(priceLimit);
          setSelectedPriceRangeValue(priceLimit);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllDessert();
  }, []);

  //*************************************************//
  // Handle Delete Dessert Item
  const handleDeleteDessertItem = (itemId) => {
    const clonedDessertSelectedItem = JSON.parse(
      JSON.stringify(dessertSelectedItems)
    );
    const currentIndex = clonedDessertSelectedItem?.findIndex(
      (it) => it.id == itemId
    );
    if (currentIndex >= 0) {
      clonedDessertSelectedItem?.splice(currentIndex, 1);
      setDessertSelectedItems(clonedDessertSelectedItem);
    }
  };
  const replaceWithFirstElement = (arr, index) => {
    const arr2 = JSON.parse(JSON.stringify(arr));
    const temp = arr2[0];
    arr2[0] = arr2[index];
    arr2[index] = temp;

    return arr2;
  };
  //*************************************************//
  // Handle Dessert Minues Button
  const handleDessertMinuesButton = (itemId) => {
    // const clonedData = JSON.parse(JSON.stringify(dessertSelectedItems));
    // const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);

    // if (clonedData[currentIndex].count > 0) {
    //   clonedData[currentIndex].count -= 1;
    //   setDessertSelectedItems(clonedData);
    // }
    // if (clonedData[currentIndex].count == 0) {
    //   clonedData.splice(currentIndex, 1);
    //   setDessertSelectedItems(clonedData);
    // }
    let clonedData = JSON.parse(JSON.stringify(dessertSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (clonedData?.length > 0)
      clonedData = replaceWithFirstElement(clonedData, currentIndex);
    ////////////////////
    setTimeout(() => {
      if (clonedData[0].count > 0) {
        clonedData[0].count -= 1;
        setDessertSelectedItems(clonedData);
      }
      if (clonedData[0].count == 0) {
        clonedData.splice(0, 1);
        setDessertSelectedItems(clonedData);
      }
    }, 0);
  };

  //*************************************************//
  // Handle Dessert Plus Button
  const handleDessertPlusButton = (itemId) => {
    let clonedData = JSON.parse(JSON.stringify(dessertSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData = replaceWithFirstElement(clonedData, currentIndex);
    const findCurrent = clonedData.find((item) => item.id == itemId);
    // console.log(findCurrent);
    setTimeout(() => {
      if (findCurrent.quantity > clonedData[0].count) {
        clonedData[0].count += 1;
        setDessertSelectedItems(clonedData);
      }
    }, 0);
  };
  //*************************************************//
  // Handle Select Dessert Items
  const handleSelectDessertItem = (id) => {
    const itemIndex = dessertSelectedItems?.findIndex((it) => it.id == id);
    if (itemIndex == -1) {
      const newItem = allDessert.find((it) => it.id == id);
      setDessertSelectedItems((oldState) => [
        { ...newItem, count: 1 },
        ...oldState,
      ]);
    } else {
      handleDessertPlusButton(id);
      // const clonedDessertSelectedItem = JSON.parse(
      //   JSON.stringify(dessertSelectedItems)
      // );
      // clonedDessertSelectedItem[itemIndex].count += 1;
      // setDessertSelectedItems(clonedDessertSelectedItem);
    }
  };
  //*************************************************//
  // filtering data on "selectedPriceRangeValue"

  const onPriceRangeChange = () => {
    if (allDessert) {
      const clonedData = JSON.parse(JSON.stringify(allDessert));
      const filteredData = clonedData?.filter(
        (it) =>
          it?.price >= selectedPriceRangeValue[0] &&
          it?.price <= selectedPriceRangeValue[1]
      );
      setAllDessert(filteredData);
    }
  };
  useEffect(onPriceRangeChange, [selectedPriceRangeValue]);

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
    const currentItem = dessertSortingDrawerItemData?.filter(
      (it) => it?.id === itemId
    );
    setSortingCurrentItem(currentItem);
    handleSortingDrawerClick();
  };

  // handling show filtered items :
  const handleShowFilteredItems = () => {
    if (
      staticPriceRangeValue[0] === selectedPriceRangeValue[0] &&
      staticPriceRangeValue[1] === selectedPriceRangeValue[1]
    ) {
      setShowFilteredItem(false);
    } else {
      setShowFilteredItem(true);
    }
  };

  useEffect(() => {
    handleShowFilteredItems();
  }, [selectedPriceRangeValue]);

  const handleDeleteFilteringItems = () => {
    setSelectedPriceRangeValue(staticPriceRangeValue);
    //
    const hasTitleFiltering = allCheckBoxData.some((item) => item.checked);
    if (hasTitleFiltering) {
      onAllCheckBoxDataChange();
    } else {
      setAllDessert(pureAllDessert);
    }

    setShowFilteredItem(false);
  };

  // handle Clear All Filters
  const handleClearAllFilters = () => {
    handleDeleteCheckboxeFilteringItems();
    handleDeleteFilteringItems();
    // handleRemoveAllFilter();
    handleDrawerClicked();
  };
  const location = useLocation();
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
          webPage: 5,
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
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      {/* {dessertPageMode == 0 ? ( */}
      <div
        style={{
          position: "fixed",
          zIndex: 10000,
          backgroundColor: "#FFFFFF",
          top: "80px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "576px",
        }}
        className=" d-flex justify-content-between align-items-stretch px-3 "
      >
        {bakeryFilterItems?.map((item) => (
          <BakeryFilterItem
            key={item?.id}
            itemId={item?.id}
            itemText={item?.title}
            itemImg={item?.image}
            isActive={bakeryFilterItems.some(
              (it) => item?.isFilterActive == true
            )}
            filterHandler={handleFiltering}
            filtersCount={bakeryFilterItems.length}
          />
        ))}
      </div>
      <div style={{ marginTop: "120px" }} className="w-100">
        <div className="d-flex justify-content-between align-items-center w-100 ">
          {/* <Button
            style={{
              backgroundColor: "#CB7640",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            className="px-3 mx-1"
            // startIcon={
            //   <Avatar sx={{ width: 24, height: 24 }} src={filterIcon} />
            // }
            startIcon={<FilterAlt />}
            onClick={handleDrawerClicked}
          >
            فیلتر
          </Button> */}
          {/* <DessertFilterDrawer
            handleDrawerClicking={handleDrawerClicked}
            handleClearAllFilters={handleClearAllFilters}
            drawerIsOpen={drawerIsOpen}
            // Price Select Option Data
            staticPriceRangeValue={staticPriceRangeValue}
            selectedPriceRangeValue={selectedPriceRangeValue}
            changeRangeSliderHandler={handlePriceChangeRangeSlider}
            rangeSliderMaxInputChangeHandler={handleRangeSliderMaxInputChange}
            rangeSliderMinInputChangeHandler={handleRangeSliderMinInputChange}
            // Weight Select Option Data
            // weightSelectValue={weightSelectValue}
            // changeWeightHandler={handleChangeWeight}
            checkBoxesData={allCheckBoxData}
            changeCheckBoxesHandler={handleChangeCheckBoxes}
          /> */}
          {/*  */}
          {/* <Button
            style={{
              backgroundColor: "#CB7640",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            className="px-3 mx-1"
            startIcon={<Sort />}
            onClick={handleSortingDrawerClick}
          >
            {sortingCurrentItem
              ? sortingCurrentItem[0]?.text
              : "مرتب سازی بر اساس"}
          </Button> */}
          {/* <DessertSortingDrawer
            sortingDrawerIsOpen={sortingDrawerIsOpen}
            sortingDrawerClickHandler={handleSortingDrawerClick}
            sortingDrawerCloseHandler={handleSortingDrawerClose}
            sortingDrawerItemClickHandler={handleSortingDrawerItemClick}
            sortingCurrentItem={sortingCurrentItem}
          /> */}
        </div>
        <div className="d-flex justify-content-start align-items-center w-100 cursor-pointer my-2">
          <div className="d-flex justify-content-between align-items-center">
            {showFilteredItem && (
              <div
                style={{ backgroundColor: "#ccc" }}
                className="d-flex justify-content-between align-items-center py-1 px-2 rounded fs-9 mx-1"
              >
                <span className="d-flex justify-content-center align-items-center text-nowrap fs-8 me-1">
                  قیمت از {selectedPriceRangeValue[0]}
                </span>
                <span className="d-flex justify-content-center align-items-center text-nowrap fs-8">
                  تا {selectedPriceRangeValue[1]}
                </span>
                <Close onClick={handleDeleteFilteringItems} fontSize="small" />
              </div>
            )}
            {showSelectedItems.length > 0 && (
              <div
                style={{ backgroundColor: "#ccc" }}
                className="d-flex justify-content-center align-items-center py-1 px-2 rounded fs-9"
              >
                <span className="text-nowrap">
                  {showSelectedItems.toString()}
                </span>
                <Close
                  onClick={handleDeleteCheckboxeFilteringItems}
                  fontSize="small"
                />
              </div>
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-start align-items-stretch w-100">
          {allDessert &&
            allDessert?.map((it) => (
              <DessertItem
                key={it?.id}
                itemId={it?.id}
                itemTitle={it?.title}
                itemImg={it?.image}
                itemPrice={it?.price}
                itemWieght={it?.weight}
                itemDesc={it?.description}
                addItemHandler={handleSelectDessertItem}
                discountPercentage={it?.discountPercentage}
                oldPrice={it?.oldPrice}
              />
            ))}
        </div>
        <div className="d-flex w-100">
          {allDessert?.length <= 0 && (
            <div className="d-flex w-100">
              <Alert className="w-100" severity="warning">
                متاسفانه دسری موجود نیست
              </Alert>
            </div>
          )}
        </div>
        {dessertSelectedItems?.length > 0 ? (
          <div
            className="w-100 m-0 p-0 position-relative"
            style={{ height: "180px" }}
          >
            <SelectedDessertItemsListDrawer
              selectedDessertItemsList={dessertSelectedItems}
              deleteDessertHandler={handleDeleteDessertItem}
              dessertMinusButtonHandler={handleDessertMinuesButton}
              dessertPlusButtonHandler={handleDessertPlusButton}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Dessert;
