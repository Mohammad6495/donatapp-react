import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardArrowUp } from "@mui/icons-material";
import BakeryDrawerItem from "./components/BakeryDrawerItem";
import "./styles/SelectedBakeryItemsListDrawer.scss";
import { useNavigate } from "react-router";

const SelectedBakeryItemsListDrawer = ({
  selectedBakeryItemsList,
  deleteBakeryHandler,
  bakeryMinusButtonHandler,
  bakeryPlusButtonHandler,
}) => {
  const navigate = useNavigate();
  const [isBakeryDrawerOpen, setIsBakeryDrawerOpen] = useState(false);
  const toggleBakeryDrawer = () => {
    setIsBakeryDrawerOpen((s) => !s);
  };
  const handleGoNext = () => {
    navigate("/selected-bakery-items", {
      state: { selectedBakeryItems: selectedBakeryItemsList },
    });
  };

  return (
    <>
      {selectedBakeryItemsList?.length > 0 && (
        <div
          className={`d-flex flex-column w-100 bakery-drawer-container mx-auto`}
          style={{zIndex: '100'}}
        >
          <div
            onClick={toggleBakeryDrawer}
            className="d-flex justify-content-center align-items-center"
          >
            <KeyboardArrowUp
              style={{
                transform: isBakeryDrawerOpen ? "rotateZ(180deg)" : "",
              }}
              htmlColor="#fff"
              className="cursor-pointer"
            />
          </div>
          <div
            className={
              (isBakeryDrawerOpen ? "bakery-item-holder--open" : "") +
              " bakery-item-holder hidden-scrollbar py-2 px-4"
            }
          >
            {selectedBakeryItemsList &&
              selectedBakeryItemsList?.map((item) => (
                <BakeryDrawerItem
                  key={item?.id}
                  drawerItemId={item?.id}
                  drawerItemImg={item?.image}
                  drawerItemTitle={item?.title}
                  drawerItemPrice={item?.price}
                  darwerItemCount={item?.count}
                  deleteBakeryHandler={deleteBakeryHandler}
                  bakeryMinusButtonHandler={bakeryMinusButtonHandler}
                  bakeryPlusButtonHandler={bakeryPlusButtonHandler}
                />
              ))}
          </div>
          <div
            style={{ height: "60px" }}
            className="d-flex justify-content-center align-items-center w-100 p-2"
          >
            <button
              onClick={handleGoNext}
              className={`p-2 rounded bakery-order-button ${
                isBakeryDrawerOpen == true ? "is-open" : "is-closed"
              }`}
            >
              <span>ادامه خرید</span>
              <span className="ms-1">
                ({selectedBakeryItemsList && selectedBakeryItemsList?.length}{" "}
                محصول انتخاب شده)
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedBakeryItemsListDrawer;
