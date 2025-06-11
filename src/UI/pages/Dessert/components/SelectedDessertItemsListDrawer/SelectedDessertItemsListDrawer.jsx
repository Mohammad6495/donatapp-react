import React, { useEffect, useState } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import DessertDrawerItem from "./components/DessertDrawerItem";
import "./styles/SelectedDessertItemsListDrawer.scss";
import { useNavigate } from "react-router";

const SelectedDessertItemsListDrawer = ({
  selectedDessertItemsList,
  deleteDessertHandler,
  // pageModeChangeHandler,
  dessertMinusButtonHandler,
  dessertPlusButtonHandler,
}) => {
  const navigate = useNavigate();
  const [isDessertDrawerOpen, setIsDessertDrawerOpen] = useState(false);
  const toggleDessertDrawer = () => {
    setIsDessertDrawerOpen((s) => !s);
  };
  const handleGoNext = () => {
    navigate("/selected-dessert-items", {
      state: { selectedDessertItems: selectedDessertItemsList },
    });
  };
  return (
    <div
      className={`d-flex flex-column w-100 dessert-drawer-container mx-auto`}
      style={{zIndex: '100'}}
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
            دسر انتخاب شده)
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectedDessertItemsListDrawer;
