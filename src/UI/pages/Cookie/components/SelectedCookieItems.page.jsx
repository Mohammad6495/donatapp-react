import React, { useEffect, useState } from "react";
import BakeryItems from "./components/BakeryItem/BakeryItem";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { products_apiCalls } from "../../../core/services/agent";
import {
  bakery_apiCalls,
  branches_apiCalls,
} from "../../../core/services/agent";
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
import useNotRegisteredModal from "../../components/useNotRegisteredModal";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { useDessertAndBakeryContext } from "../../../core/contexts/DessertAndBakery/dessertAndBakery";
import { toast } from "react-toastify";
//////////
const SelectedCookieItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Context
  const { bakeryProducts_methods, shopBasketData } = useShopBasketContext();
  const { handleClose, handleOpen } = useLoadingContext();
  // States
  const { bakerySelectedItems, setBakerySelectedItems } =
    useDessertAndBakeryContext();
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isAvailability, setIsAvailability] = useState({});
  //*************************************************//
  // Calculate Selected Dessert Price
  const calculateSelectedDessertPrice = () => {
    let calcPrice = 0;
    if (bakerySelectedItems) {
      bakerySelectedItems?.forEach((element) => {
        if (Object.hasOwn(element, "count")) {
          const price = element?.count * element?.price;
          calcPrice += price;
        }
      });
    }
    setCalculatedPrice(calcPrice);
  };


  useEffect(() => {
    if (bakerySelectedItems.length > 0) {
      calculateSelectedDessertPrice();
    }
    //  else {
    //   navigate(-1);
    // }
  }, [bakerySelectedItems]);
  ///

  ///
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);

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
    if (clonedBakerySelectedItem.length == 0) {
      navigate(-1);
    }
  };
  //*************************************************//
  // Handle Bakery Minues Button
  const handleBakeryMinuesButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(bakerySelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (bakeryProducts_methods.doesExistsInBasket(itemId)) {
      bakeryProducts_methods.decrement(itemId);
    }
    if (clonedData[currentIndex].count > 0) {
      clonedData[currentIndex].count -= 1;
      setBakerySelectedItems(clonedData);
    }
    if (clonedData[currentIndex].count == 0) {
      clonedData.splice(currentIndex, 1);
      setBakerySelectedItems(clonedData);
    }
    if (clonedData.length == 0) {
      navigate(-1);
    }
  };

  //*************************************************//
  // Handle Bakery Plus Button
  const handleBakeryPlusButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(bakerySelectedItems));
    const currentId = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData[currentId].count += 1;
    setBakerySelectedItems(clonedData);
    if (bakeryProducts_methods.doesExistsInBasket(itemId)) {
      bakeryProducts_methods.increment(itemId);
    }
    if (clonedData.length == 0) {
      navigate(-1);
    }
  };

  const { userToken } = useAuthContext();
  const {
    handleClose: handleCloseAlertModal,
    handleOpen: handleOpenAlertModal,
    render: renderAlertModal,
  } = useNotRegisteredModal({ intialOpenState: false });

  const handleAddToShopBasket = () => {
    if (bakerySelectedItems?.length > 0) {
      // if (isAvailability.isAvailableBakery) {
        const list = [];
        bakerySelectedItems?.forEach((item) => {
          if (
            !bakeryProducts_methods
              .getAll()
              .some((it) => it?.productId == item.id)
          )
            list.push(bakeryProducts_methods.createItem(item.id, item.count));
        });
        bakeryProducts_methods?.addListOfProducts(list);

        setShouldGoToBasket(true);
      // } else {
      //   toast.warn(isAvailability.bakeryDescription);
      // }
    }
    // bakeryProducts_methods.createAndAddItem()
  };
  useEffect(() => {
    if (shouldGoToBasket) {
      let doesWholeListExist = true;
      let isNavigatingToCheckoutPage = false;
      if (
        bakeryProducts_methods.getAll()?.length == 0 ||
        !bakeryProducts_methods.getAll()
      )
        return;
      //////////////
      bakerySelectedItems.forEach((item1) => {
        if (
          !bakeryProducts_methods
            .getAll()
            .some((item2) => item2.productId == item1.id)
        ) {
          doesWholeListExist = false;
        }
      });
      /////////////
      if (doesWholeListExist) {
        isNavigatingToCheckoutPage = true;
        navigate('/checkout-cart');
      }
      /////////////
      // return () => {
      //   if (isNavigatingToCheckoutPage) setBakerySelectedItems([]);
      // };
    }
  }, [shouldGoToBasket, shopBasketData]);

  // useEffect(() => {
  //   return () => {
  //     setBakerySelectedItems([]);
  //   };
  // }, []);
  /////
  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      {renderAlertModal()}
      <div className="w-100 d-flex flex-column mt-3 mb-5">
        {bakerySelectedItems?.map((item) => (
          <BakeryItem2
            key={item?.id}
            itemId={item?.id}
            itemImg={item?.image}
            itemTitle={item?.title}
            itemPrice={item?.price}
            itemCount={item?.count}
            deleteBakeryHandler={handleDeleteBakeryItem}
            bakeryMinusButtonHandler={handleBakeryMinuesButton}
            bakeryPlusButtonHandler={handleBakeryPlusButton}
          />
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 my-2">
        <span>بیکری : </span>
        <span>{formatNumber(calculatedPrice)} تومان</span>
      </div>
      <div className="d-flex flex-column w-100">
        <OrdinaryButton
          holderClasses="my-1"
          buttonText="افزودن به سبد خرید"
          handleOnClick={handleAddToShopBasket}
        />
        <SimpleButton
          holderClasses="my-1"
          buttonText="بازگشت و تغییر در سفارش"
          handleOnClick={() => navigate(-1)}
        />
      </div>
    </section>
  );
};

export default SelectedCookieItems;
