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
import { branches_apiCalls } from "../../../core/services/agent";
import { toast } from "react-toastify";
import { apiCaller } from "../../../core/custom-hooks/useApi";
//////////
const SelectedDessertItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userToken } = useAuthContext();
  // Context
  const { dessertProducts_methods, shopBasketData } = useShopBasketContext();
  const { handleClose, handleOpen } = useLoadingContext();
  // States
  const [isAvailability, setIsAvailability] = useState({});
  // const [dessertSelectedItems, setDessertSelectedItems] = useState([]);
  const { dessertSelectedItems, setDessertSelectedItems } =
    useDessertAndBakeryContext();
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  //*************************************************//
  // Calculate Selected Dessert Price
  const calculateSelectedDessertPrice = () => {
    let calcPrice = 0;
    if (dessertSelectedItems) {
      dessertSelectedItems?.forEach((element) => {
        if (Object.hasOwn(element, "count")) {
          const price = element?.count * element?.price;
          calcPrice += price;
        }
      });
    }
    setCalculatedPrice(calcPrice);
  };


  useEffect(() => {
    if (dessertSelectedItems.length > 0) {
      calculateSelectedDessertPrice();
    }
  }, [dessertSelectedItems]);
  /////
  useEffect(() => {
    if (dessertSelectedItems.length <= 0) {
      // navigate(-1);
    }
  }, [dessertSelectedItems]);
  ///
  // useEffect(() => {
  //   if (
  //     location.state &&
  //     location.state?.selectedDessertItems &&
  //     location.state?.selectedDessertItems?.length > 0
  //   ) {
  //     setDessertSelectedItems(location.state?.selectedDessertItems);
  //   } else {
  //     navigate(-1);
  //   }
  // }, [location.state]);
  ///
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);

  //*************************************************//
  // Handle Delete Bakery Item
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
    if (dessertProducts_methods.doesExistsInBasket(itemId)) {
      dessertProducts_methods.deleteItem(itemId);
    }
    if (clonedDessertSelectedItem.length == 0) {
      navigate(-1);
    }
  };
  //*************************************************//
  // Handle Bakery Minues Button
  const handleDessertMinuesButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(dessertSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (dessertProducts_methods.doesExistsInBasket(itemId)) {
      dessertProducts_methods.decrement(itemId);
    }
    if (clonedData[currentIndex].count > 0) {
      clonedData[currentIndex].count -= 1;
      setDessertSelectedItems(clonedData);
    }
    if (clonedData[currentIndex].count == 0) {
      clonedData.splice(currentIndex, 1);
      setDessertSelectedItems(clonedData);
    }
    if (clonedData.length == 0) {
      navigate(-1);
    }
  };

  //*************************************************//
  // Handle Bakery Plus Button
  const handleDessertPlusButton = (itemId) => {
    const clonedData = JSON.parse(JSON.stringify(dessertSelectedItems));
    const currentId = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData[currentId].count += 1;
    setDessertSelectedItems(clonedData);
    if (dessertProducts_methods.doesExistsInBasket(itemId)) {
      dessertProducts_methods.increment(itemId);
    }
  };
  const {
    handleClose: handleCloseAlertModal,
    handleOpen: handleOpenAlertModal,
    render: renderAlertModal,
  } = useNotRegisteredModal({ intialOpenState: false });
  const handleAddToShopBasket = () => {
    // if (!userToken) {
    //   // navigate("/register?returnUrl=" + location.pathname);
    //   handleOpenAlertModal();
    //   return;
    // }
    if (isAvailability.isAvailableDessert) {
      if (dessertSelectedItems?.length > 0) {
        const list = [];
        dessertSelectedItems?.forEach((item) => {
          if (
            !dessertProducts_methods
              .getAll()
              .some((it) => it?.productId == item.id)
          )
            list.push(dessertProducts_methods.createItem(item.id, item.count));
        });
        dessertProducts_methods?.addListOfProducts(list);

        setShouldGoToBasket(true);
      }
    } else {
      toast.warn(isAvailability.dessertDescription);
    }
  };
  useEffect(() => {
    if (shouldGoToBasket) {
      let doesWholeListExist = true;
      if (
        dessertProducts_methods.getAll()?.length == 0 ||
        !dessertProducts_methods.getAll()
      )
        return;
      //////////////
      dessertSelectedItems.forEach((item1) => {
        if (
          !dessertProducts_methods
            .getAll()
            .some((item2) => item2.productId == item1.id)
        ) {
          doesWholeListExist = false;
        }
      });
      /////////////
      if (doesWholeListExist) {
        navigate("/checkout-cart");
      }
    }
  }, [shouldGoToBasket, shopBasketData]);
  /////
  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      {renderAlertModal()}
      <div className="w-100 d-flex flex-column mt-3 mb-5">
        {dessertSelectedItems?.map((item) => (
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
        <span>دسر : </span>
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
          handleOnClick={() => navigate("/dessert")}
        />
      </div>
    </section>
  );
};

export default SelectedDessertItems;
