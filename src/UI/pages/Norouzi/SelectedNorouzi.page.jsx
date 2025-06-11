import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import OrdinaryButton, {
  SimpleButton,
} from "../../components/OrdinaryButton/OrdinaryButton";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useLocation, useNavigate } from "react-router";
import "./styles/Dessert.scss";
import DessertItem2 from "./components/DessertItem2/DessertItem2";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useAuthContext } from "./../../../core/contexts/AuthContext/AuthContext";
import useNotRegisteredModal from "../../components/useNotRegisteredModal";
import { useDessertAndBakeryContext } from "../../../core/contexts/DessertAndBakery/dessertAndBakery";
//////////
const SelectedDessertItems = () => {
  const navigate = useNavigate();
  // Context
  const { norouziProducts_methods, shopBasketData } = useShopBasketContext();
  // States
  const { NorouziSelectedItems, setNorouziSelectedItems } =
    useDessertAndBakeryContext();
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  //*************************************************//
  // Calculate Selected Dessert Price
  const calculateSelectedDessertPrice = () => {
    let calcPrice = 0;
    if (NorouziSelectedItems) {
      NorouziSelectedItems?.forEach((element) => {
        if (Object.hasOwn(element, "count")) {
          const price = element?.count * element?.price;
          calcPrice += price;
        }
      });
    }
    setCalculatedPrice(calcPrice);
  };
  /////
  useEffect(() => {
    if (NorouziSelectedItems.length > 0) {
      calculateSelectedDessertPrice();
    }
  }, [NorouziSelectedItems]);
  /////
  useEffect(() => {
    if (NorouziSelectedItems.length <= 0) {
      // navigate(-1);
    }
  }, [NorouziSelectedItems]);
  ///
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);

  //*************************************************//
  // Handle Delete Bakery Item
  const handleDeleteDessertItem = (itemId) => {
    const clonedDessertSelectedItem = JSON.parse(
      JSON.stringify(NorouziSelectedItems)
    );
    const currentIndex = clonedDessertSelectedItem?.findIndex(
      (it) => it.id == itemId
    );
    if (currentIndex >= 0) {
      clonedDessertSelectedItem?.splice(currentIndex, 1);
      setNorouziSelectedItems(clonedDessertSelectedItem);
    }
    if (norouziProducts_methods.doesExistsInBasket(itemId)) {
      norouziProducts_methods.deleteItem(itemId);
    }
    if (clonedDessertSelectedItem.length == 0) {
      navigate(-1);
    }
  };
  //*************************************************//
  // Handle Bakery Minues Button
  const handleDessertMinuesButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(NorouziSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (norouziProducts_methods.doesExistsInBasket(itemId)) {
      norouziProducts_methods.decrement(itemId);
    }
    if (clonedData[currentIndex].count > 0) {
      clonedData[currentIndex].count -= 1;
      setNorouziSelectedItems(clonedData);
    }
    if (clonedData[currentIndex].count == 0) {
      clonedData.splice(currentIndex, 1);
      setNorouziSelectedItems(clonedData);
    }
    if (clonedData.length == 0) {
      navigate(-1);
    }
  };

  //*************************************************//
  // Handle Bakery Plus Button
  const handleDessertPlusButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(NorouziSelectedItems));
    const currentId = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData[currentId].count += 1;
    setNorouziSelectedItems(clonedData);
    if (norouziProducts_methods.doesExistsInBasket(itemId)) {
      norouziProducts_methods.increment(itemId);
    }
  };
  const {
    handleClose: handleCloseAlertModal,
    handleOpen: handleOpenAlertModal,
    render: renderAlertModal,
  } = useNotRegisteredModal({ intialOpenState: false });
  const handleAddToShopBasket = () => {
    if (NorouziSelectedItems?.length > 0) {
      const list = [];
      NorouziSelectedItems?.forEach((item) => {
        if (
          !norouziProducts_methods
            .getAll()
            .some((it) => it?.productId == item.id)
        )
          list.push(norouziProducts_methods.createItem(item.id, item.count));
      });
      norouziProducts_methods?.addListOfProducts(list);
      setShouldGoToBasket(true);
    }
  };
  useEffect(() => {
    if (shouldGoToBasket) {
      let doesWholeListExist = true;
      if (
        norouziProducts_methods.getAll()?.length == 0 ||
        !norouziProducts_methods.getAll()
      )
        return;
      //////////////
      NorouziSelectedItems.forEach((item1) => {
        if (
          !norouziProducts_methods
            .getAll()
            .some((item2) => item2.productId == item1.id)
        ) {
          doesWholeListExist = false;
        }
      });
      /////////////
      if (doesWholeListExist) {
        navigate('/norouzi-cart');
      }
    }
  }, [shouldGoToBasket, shopBasketData]);
  /////
  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      {renderAlertModal()}
      <div className="w-100 d-flex flex-column mt-3 mb-5">
        {NorouziSelectedItems?.map((item) => (
          <DessertItem2
            key={item?.id}
            itemId={item?.id}
            itemImg={item?.image}
            itemTitle={item?.title}
            itemPrice={item?.price}
            itemCount={item?.count}
            deleteDessertHandler={handleDeleteDessertItem}
            dessertMinusButtonHandler={handleDessertMinuesButton}
            dessertPlusButtonHandler={handleDessertPlusButton}
          />
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 my-2">
        <span>نوروزی : </span>
        <span>{formatNumber(calculatedPrice)} تومان</span>
      </div>
      <div className="d-flex flex-column w-100">
        <OrdinaryButton
          holderClasses="my-1"
          buttonText="ادامه فرایند و ثبت سفارش"
          handleOnClick={handleAddToShopBasket}
        />
        <SimpleButton
          holderClasses="my-1"
          buttonText="بازگشت و تغییر در سفارش"
          handleOnClick={() => navigate("/norouzi")}
        />
      </div>
    </section>
  );
};

export default SelectedDessertItems;
