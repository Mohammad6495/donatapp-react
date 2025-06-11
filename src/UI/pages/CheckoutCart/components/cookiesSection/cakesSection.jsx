import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import SectionCalculation from "../SectionCalculation/SectionCalculation";
import CancelIcon from "@mui/icons-material/Cancel";
import PastryItem, { PastryItemsContainer } from "../PastryItem/PastryItem";
////////////////
const CookiesSection = ({ factor }) => {
  const { handleOpen, handleClose } = useLoadingContext();
  const {
    shopBasketData,
    cookieProducts_methods,
    creamyCookieProducts_methods,
  } = useShopBasketContext();
  // useNavigate
  const navigate = useNavigate();
  const getRowsCount = (item) => {
    let rowsCount = 0;
    //
    if (item.firstRowCookie) rowsCount++;
    if (item.secondRowCookie) rowsCount++;
    if (item.thirdRowCookie) rowsCount++;
    if (item.fourthRowCookie) rowsCount++;
    if (item.fifthRowCookie) rowsCount++;
    //
    return rowsCount;
  };
  ///////////////
  return (
    <>
      {shopBasketData?.items?.length > 0 &&
        shopBasketData?.items?.filter((it) => it.cartItemType == 1)?.length >
        0 && (
          <>
            <hr className="my-3" />
            <SectionCalculation calculationText="جعبه های شیرینی" />
            <p className="my-3 fs-8 text-justify">
              * به علت نامشخص بودن وزن دقیق جعبه های شیرینی قیمت جعبه ها و قیمت
              کل نامشخص میباشد . بعد از ثبت سفارش جعبه ها وزن میشوند ، قیمت دقیق
              محاسبه شده ، و لینک جزئیات این سفارش برای شما پیامک خواهد شد .
            </p>
            <div className="mt-2 d-flex flex-row justify-content-start align-items-stretch gap-2">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                endIcon={<Add />}
                sx={{
                  fontSize: "0.9rem !important",
                }}
                onClick={() => {
                  navigate("/choosing-box/2");
                }}
              >
                افزودن شیرینی خشک
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                endIcon={<Add />}
                sx={{
                  fontSize: "0.9rem !important",
                }}
                onClick={() => {
                  navigate("/choosing-box/1");
                }}
              >
                افزودن شیرینی تر
              </Button>
            </div>
          </>
        )}
      <div className="m-0 p-0 d-flex flex-row justify-content-start align-items-stretch flex-wrap">
        {shopBasketData?.items?.length > 0 &&
          shopBasketData?.items?.filter((it) => it.cartItemType == 1)?.length >
          0 &&
          factor?.cartItems?.length > 0 &&
          factor?.cartItems?.filter((it) => it.cartItemType == 1)?.length > 0 &&
          factor?.cartItems
            ?.filter((it) => it.cartItemType == 1)
            ?.map((it, indx) => (
              <div
                key={indx}
                style={{
                  border: "1px solid rgba(151, 48, 121, 0.4)",
                  borderRadius: "16px",
                }}
                className={
                  " position-relative shadow p-3 mt-3 col-12 p-0 m-0 d-flex flex-row justify-content-start align-items-stretch"
                }
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const obj = {
                      cartItemType: it.cartItemType,
                      boxType: it.boxType,
                    };
                    if (it?.firstRowCookieId) {
                      obj.firstRowCookieId = it.firstRowCookieId;
                    }
                    if (it?.secondRowCookieId) {
                      obj.secondRowCookieId = it.secondRowCookieId;
                    }
                    if (it?.thirdRowCookieId) {
                      obj.thirdRowCookieId = it.thirdRowCookieId;
                    }
                    if (it?.fourthRowCookieId) {
                      obj.fourthRowCookieId = it.fourthRowCookieId;
                    }
                    if (it?.fifthRowCookieId) {
                      obj.fifthRowCookieId = it.fifthRowCookieId;
                    }
                    cookieProducts_methods.deleteItem(obj);
                  }}
                >
                  <CancelIcon color="error" />
                </span>
                <div className="col-6">
                  <PastryItemsContainer offset={3}>
                    {it?.firstRowCookie && (
                      <PastryItem
                        pastryId={it?.firstRowCookie?.id}
                        pastryImg={it?.firstRowCookie?.image}
                        pastryName={it?.firstRowCookie?.title}
                        rowsCount={getRowsCount(it)}
                        offset={3}
                      />
                    )}
                    {it?.secondRowCookie && (
                      <PastryItem
                        pastryId={it?.secondRowCookie?.id}
                        pastryImg={it?.secondRowCookie?.image}
                        pastryName={it?.secondRowCookie?.title}
                        rowsCount={getRowsCount(it)}
                        offset={3}
                      />
                    )}
                    {it?.thirdRowCookie && (
                      <PastryItem
                        pastryId={it?.thirdRowCookie?.id}
                        pastryImg={it?.thirdRowCookie?.image}
                        pastryName={it?.thirdRowCookie?.title}
                        rowsCount={getRowsCount(it)}
                        offset={3}
                      />
                    )}
                    {it?.fourthRowCookie && (
                      <PastryItem
                        pastryId={it?.fourthRowCookie?.id}
                        pastryImg={it?.fourthRowCookie?.image}
                        pastryName={it?.fourthRowCookie?.title}
                        rowsCount={getRowsCount(it)}
                        offset={3}
                      />
                    )}
                    {it?.fifthRowCookie && (
                      <PastryItem
                        pastryId={it?.fifthRowCookie?.id}
                        pastryImg={it?.fifthRowCookie?.image}
                        pastryName={it?.fifthRowCookie?.title}
                        rowsCount={getRowsCount(it)}
                        offset={3}
                      />
                    )}
                  </PastryItemsContainer>
                </div>
                <div className="col-5 ps-2 text-center d-flex flex-column justify-content-center align-items-center">
                  <h5 className="fs-6">{`یک جعبه شیرینی ${it.boxType == 0
                      ? "نیم"
                      : it.boxType == 1
                        ? "یک"
                        : it.boxType == 2
                          ? "دو"
                          : ""
                    } کیلویی`}</h5>
                  <span className="mt-auto fs-8">{`قیمت : ${it.price == -1
                      ? "نامشخص"
                      : `${formatNumber(it.price)} تومان`
                    }`}</span>

                  <span className="mt-2 fs-8">{`وزن : نامشخص`}</span>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default CookiesSection;
