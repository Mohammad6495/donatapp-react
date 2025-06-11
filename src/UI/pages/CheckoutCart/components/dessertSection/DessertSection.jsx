import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import DessertItem2 from "../../../Dessert/components/DessertItem2/DessertItem2";
import SectionCalculation from "../SectionCalculation/SectionCalculation";

const DessertSection = ({ factor }) => {
  const { handleOpen, handleClose } = useLoadingContext();
  const { dessertProducts_methods, shopBasketData } = useShopBasketContext();
  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();
  /////////////////
  return (
    <>
      <div className="w-100 d-flex flex-column">
        {factor?.cartItems?.length > 0 &&
          factor?.cartItems?.filter((item) => item.cartItemType == 3)?.length >
          0 && (
            <>
              <hr className="my-3" />
              <SectionCalculation
                calculationText="دسر"
                calculationPrice={
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    endIcon={<Add />}
                    onClick={() => {
                      navigate("/dessert");
                    }}
                    sx={{
                      fontSize: "0.7rem !important",
                    }}
                  >
                    افزودن آیتم جدید
                  </Button>
                }
              />
              {factor?.cartItems
                ?.filter((item) => item.cartItemType == 3)
                ?.map((item) =>
                  dessertProducts_methods.doesExistsInBasket(
                    item?.product?.id
                  ) ? (
                    <DessertItem2
                      className="shadow"
                      key={item?.product?.id}
                      itemId={item?.product?.id}
                      itemImg={item?.product?.image}
                      itemTitle={item?.product?.title}
                      itemPrice={item?.product?.price}
                      itemCount={item?.count}
                      deleteDessertHandler={() => {
                        dessertProducts_methods.deleteItem(item?.product?.id);
                      }}
                      dessertMinusButtonHandler={() => {
                        dessertProducts_methods.decrement(item?.product?.id);
                      }}
                      dessertPlusButtonHandler={() => {
                        dessertProducts_methods.increment(item?.product?.id);
                      }}
                    />
                  ) : (
                    <></>
                  )
                )}
            </>
          )}
      </div>
    </>
  );
};
export default DessertSection;
