import React, { useEffect, useState } from "react";
import BakeryItems from "./components/BakeryItem/BakeryItem";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  products_apiCalls,
  visit_apiCaller,
} from "../../../core/services/agent";
import { bakery_apiCalls } from "../../../core/services/agent";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import BakeryFilterItem from "./components/BakeryFilterItem/BakeryFilterItem";
import SelectedBakeryItemsListDrawer from "./components/SelectedBakeryItemsListDrawer/SelectedBakeryItemsListDrawer";
import BakeryItem2 from "./components/BakeryItem2/BakeryItem2";
import OrdinaryButton, {
  SimpleButton,
} from "./../../components/OrdinaryButton/OrdinaryButton";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useLocation, useNavigate } from "react-router";
import { useDessertAndBakeryContext } from "../../../core/contexts/DessertAndBakery/dessertAndBakery";

const Bakery = () => {
  const navigate = useNavigate();
  // Context
  const { bakeryProducts_methods, shopBasketData } = useShopBasketContext();
  const { handleClose, handleOpen } = useLoadingContext();
  // States
  const [allBakery, setAllBakery] = useState();
  const [bakeryFilterItems, setBakeryFilterItems] = useState();
  const [removeFilerState, setRemoveFilerState] = useState(false);
  const { bakerySelectedItems, setBakerySelectedItems } =
    useDessertAndBakeryContext();

  // --- Get All Bakery Size Data ---
  const getAllBakerySizeData = () => {
    apiCaller({
      api: bakery_apiCalls.apiCall_getBakeryFilterItemsList,
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
        api: products_apiCalls.apiCall_getAllBakery,
        apiArguments: sizeId,
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.status == 1) {
            setAllBakery(resp?.data?.data);
          }
        },
        onStart: handleOpen,
        onEnd: handleClose,
      });
    }
  }, [bakeryFilterItems]);
  //*************************************************//
  
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
  // Handle Select Bakery Items

  const replaceWithFirstElement = (arr, index) => {
    const arr2 = JSON.parse(JSON.stringify(arr));
    const temp = arr2[0];
    arr2[0] = arr2[index];
    arr2[index] = temp;

    return arr2;
  };
  //*************************************************//
  // Handle Delete Bakery Item
  const handleDeleteBakeryItem = (itemId) => {
    const clonedBakerySelectedItem = JSON.parse(
      JSON.stringify(bakerySelectedItems)
    );
    const currentIndex = clonedBakerySelectedItem?.findIndex(
      (it) => it.id == itemId
    );
    if (currentIndex >= 0) {
      clonedBakerySelectedItem?.splice(currentIndex, 1);
      setBakerySelectedItems(clonedBakerySelectedItem);
    }
    if (bakeryProducts_methods.doesExistsInBasket(itemId)) {
      bakeryProducts_methods.deleteItem(itemId);
    }
  };

  //*************************************************//
  // Handle Bakery Minues Button
  const handleBakeryMinuesButton = (itemId) => {
    let clonedData = JSON.parse(JSON.stringify(bakerySelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (clonedData?.length > 0)
      clonedData = replaceWithFirstElement(clonedData, currentIndex);
    ////////////////////
    setTimeout(() => {
      if (bakeryProducts_methods.doesExistsInBasket(itemId)) {
        bakeryProducts_methods.decrement(itemId);
      }
      if (clonedData[0].count > 0) {
        clonedData[0].count -= 1;
        setBakerySelectedItems(clonedData);
      }
      if (clonedData[0].count == 0) {
        clonedData.splice(0, 1);
        setBakerySelectedItems(clonedData);
      }
    }, 0);
  };

  //*************************************************//
  // Handle Bakery Plus Button
  const handleBakeryPlusButton = (itemId) => {
    let clonedData = JSON.parse(JSON.stringify(bakerySelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData = replaceWithFirstElement(clonedData, currentIndex);
    setTimeout(() => {
      clonedData[0].count += 1;
      setBakerySelectedItems(clonedData);
      if (bakeryProducts_methods.doesExistsInBasket(itemId)) {
        bakeryProducts_methods.increment(itemId);
      }
    }, 0);
  };
  ///////////////
  const handleSelectBakeryItem = (id) => {
    const itemIndex = bakerySelectedItems?.findIndex((it) => it.id == id);
    if (itemIndex == -1) {
      const newItem = allBakery.find((it) => it.id == id);
      setBakerySelectedItems((oldState) => [
        { ...newItem, count: 1 },
        ...oldState,
      ]);
    } else {
      handleBakeryPlusButton(id);
      // const clonedBakerySelectedItem = JSON.parse(
      //   JSON.stringify(bakerySelectedItems)
      // );
      // clonedBakerySelectedItem[itemIndex].count += 1;
      // setBakerySelectedItems(clonedBakerySelectedItem);
    }
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
          webPage: 4,
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
  ////////////////
  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
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
        className="overflow-hidden py-2 px-3 w-100 d-flex "
      >
        {bakeryFilterItems?.map((item) => (
          <BakeryFilterItem
            key={item?.id}
            itemId={item?.id}
            itemText={item?.title}
            isNotClass={true}
            itemImg={item?.image}
            isActive={bakeryFilterItems.some(
              (it) => item?.isFilterActive == true
            )}
            filterHandler={handleFiltering}
            filtersCount={bakeryFilterItems.length}
          />
        ))}
      </div>

      <div
        className="d-flex justify-content-between align-items-center w-100 filter-button-holder bakry-content-top"
      >
        {removeFilerState && (
          <Button
            style={{
              backgroundColor: "#fae105",
              color: "#080808",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            className="px-3"
            startIcon={<Close />}
            onClick={handleRemoveAllFilter}
          >
            حذف فیلتر
          </Button>
        )}
      </div>
      <BakeryItems
        bakeryData={allBakery}
        selectBakeryHandler={handleSelectBakeryItem}
      />
      <div className="w-100 m-0 p-0" style={{ height: "180px" }}>
        <SelectedBakeryItemsListDrawer
          selectedBakeryItemsList={bakerySelectedItems}
          deleteBakeryHandler={handleDeleteBakeryItem}
          bakeryMinusButtonHandler={handleBakeryMinuesButton}
          bakeryPlusButtonHandler={handleBakeryPlusButton}
        />
      </div>
    </section>
  );
};

export default Bakery;
