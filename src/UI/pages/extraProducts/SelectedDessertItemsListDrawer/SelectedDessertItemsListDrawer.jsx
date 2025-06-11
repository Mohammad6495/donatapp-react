import React, { useEffect, useState } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import DessertDrawerItem from "./components/DessertDrawerItem";
import "./styles/SelectedDessertItemsListDrawer.scss";
import { useLocation, useNavigate, useParams } from "react-router";
import { locationSearchStringToObject } from "../../../../core/utility/utils";
import { useShopBasketContext } from "../../../../core/contexts/ShopBasket/shopBasket.ctx";

const SelectedDessertItemsListDrawer = ({
  selectedDessertItemsList,
  deleteDessertHandler,
  // pageModeChangeHandler,
  dessertMinusButtonHandler,
  dessertPlusButtonHandler,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { birthDayUtils_methods, addItem } = useShopBasketContext();

  const [isDessertDrawerOpen, setIsDessertDrawerOpen] = useState(false);
  const toggleDessertDrawer = () => {
    setIsDessertDrawerOpen((s) => !s);
  };
  const handleGoNext = () => {
    if (id == "3") {
      const newItemToBasked = selectedDessertItemsList.map((a) => {
        return {
          cartItemType: 4,
          count: a.count,
          productId: a.id,
        };
      });
      birthDayUtils_methods.addListOfProducts(newItemToBasked);
      navigate("/checkout-cart");
    } else {
      const qo = locationSearchStringToObject(location?.search);
      navigate(
        qo?.returnUrl +
          "?type=" +
          id +
          "&extraId=" +
          selectedDessertItemsList?.map((item) => item?.id)?.join(","),
        {
          state: {
            orderPayload: location?.state?.orderPayload,
          },
        }
      );
    }
  };
  return (
    <div
      className={`d-flex flex-column w-100 dessert-drawer-container mx-auto`}
    >
      <div
        onClick={toggleDessertDrawer}
        className="d-flex justify-content-center align-items-center"
      >
        <KeyboardArrowUp
          style={{
            transform: isDessertDrawerOpen ? "rotateZ(180deg)" : "",
          }}
          htmlColor="#fff"
          className="cursor-pointer"
        />
      </div>
      <div
        className={
          (isDessertDrawerOpen ? "dessert-item-holder--open" : "") +
          " d-flex flex-column dessert-item-holder hidden-scrollbar py-2 px-4"
        }
      >
        {selectedDessertItemsList &&
          selectedDessertItemsList?.map((item) => (
            <DessertDrawerItem
              key={item?.id}
              drawerItemId={item?.id}
              drawerItemImg={item?.image}
              drawerItemTitle={item?.title}
              drawerItemPrice={item?.price}
              darwerItemCount={item?.count}
              deleteDessertHandler={deleteDessertHandler}
              dessertMinusButtonHandler={dessertMinusButtonHandler}
              dessertPlusButtonHandler={dessertPlusButtonHandler}
            />
          ))}
      </div>
      <div
        style={{ height: "60px" }}
        className="d-flex justify-content-center align-items-center w-100 p-2"
      >
        <button
          onClick={handleGoNext}
          className={`p-2 rounded dessert-order-button ${
            isDessertDrawerOpen == true ? "is-open" : "is-closed"
          }`}
        >
          <span>ادامه خرید</span>
          <span className="ms-1">
            (
            {selectedDessertItemsList?.length > 0
              ? selectedDessertItemsList?.length
              : "0"}{" "}
            {location?.pathname == "/extra-products/3"
              ? "مورد انتخاب شده"
              : "دسر انتخاب شده"}
            )
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectedDessertItemsListDrawer;
