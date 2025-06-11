import { Button, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import ReservationProgress from "../../../../components/reservation-progress/reservationProgress.component";
import SectionCalculation from "../SectionCalculation/SectionCalculation";
import { Add } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { refrigeratorCake_apiCalls } from "../../../../../core/services/agent";

import shopping from "../../../../../assets/images/checkout-cart/shopping.svg";
// import trash from "../../../../../assets/images/checkout-cart/trash.svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//////////////////////////////////////////
const RefrigeratorCakeSection = ({ factor }) => {
  const { handleOpen, handleClose } = useLoadingContext();
  const { refrigeratorProducts_methods, shopBasketData } =
    useShopBasketContext();
  // useNavigate
  const navigate = useNavigate();
  ////////
  const [unreserveApiIsCalling, setUnreserveApiIsCalling] = useState(false);
  const [toBeUnreservedCakeId, setToBeUnreservedCakeId] = useState();
  const handleUnreserveCake = (cakeId) => {
    if (unreserveApiIsCalling) return;
    ////
    setToBeUnreservedCakeId(cakeId);
    setUnreserveApiIsCalling(true);
    setTimeout(() => {
      refrigeratorProducts_methods.deleteItem(cakeId);
      setUnreserveApiIsCalling(false);
      setToBeUnreservedCakeId(undefined);
      // apiCaller({
      //   api: refrigeratorCake_apiCalls.apiCall_unreserveCake,
      //   apiArguments: { cakeId },
      //   onEnd: () => {
      //   },
      //   onSuccess: (resp) => {
      //     if (resp.status == 200 && resp.data.status == 1) {
      //     }
      //   },
      // });
    }, 500);
  };
  //////////////////
  ////////////////////
  const truncateText = (txt) => {
    let text = txt;
    const hasTag = txt.includes("<p>");
    if (hasTag) {
      text.replace("<p>", "");
      text.replace("</p>", "");
    }
    if (text.length > 50) {
      if (hasTag) {
        return `
      <p>
      ${text.substring(0, 50)} ...
      </p>
      `;
      } else {
        return text.substring(0, 50) + " ...";
      }
    }
  };
  /////////////////////
  return (
    <div>
      {shopBasketData?.items?.filter((it) => it.cartItemType == 0)?.length >
        0 && (
        <SectionCalculation
          calculationCounter={
            shopBasketData?.items?.filter((it) => it.cartItemType == 0)?.length
          }
          calculationText="کیک روز"
          calculationTextStyle={"calculationTitle"}
        />
      )}
      {shopBasketData?.items?.length > 0 &&
        factor?.cartItems?.length > 0 &&
        shopBasketData?.items?.filter((it) => it.cartItemType == 0)?.length >
          0 &&
        shopBasketData?.items
          ?.filter(
            (it) =>
              it.cartItemType == 0 &&
              factor?.cartItems.some(
                (ci) => ci.refrigeratorCakeId == it.refrigeratorCakeId
              )
          )
          ?.map((refCakeItem) => (
            <div
              key={refCakeItem.refrigeratorCakeId}
              style={{
                border: "1px solid rgba(151, 48, 121)",
                backgroundColor: "#F5F5F5",
              }}
              className="position-relative shadow p-3 mb-2 d-flex flex-row flex-wrap justify-content-start align-items-stretch rounded-2"
            >
              {unreserveApiIsCalling &&
                toBeUnreservedCakeId == refCakeItem.refrigeratorCakeId && (
                  <div
                    className="d-flex flex-row justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      zIndex: "10",
                      top: "0",
                      right: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              <div className="cartItem w-100 m-0 p-0 d-flex flex-row justify-content-start align-items-stretch">
                <div className="cartItemTop w-100">
                  <div
                    style={{
                      aspectRatio: "1/1",
                      width: "100%",
                      borderRadius: "0.5rem",
                      backgroundColor: "#ccc",
                      border: "1px solid rgba(151, 48, 121)",
                      backgroundImage: `url(${
                        factor?.cartItems?.find(
                          (it) =>
                            it?.refrigeratorCakeId ==
                            refCakeItem?.refrigeratorCakeId
                        )?.refrigeratorCake?.image
                      })`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div className="cartItemCenter w-100 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch">
                  <strong>
                    {
                      factor?.cartItems?.find(
                        (it) =>
                          it?.refrigeratorCakeId ==
                          refCakeItem?.refrigeratorCakeId
                      ).refrigeratorCake?.title
                    }
                  </strong>
                  {/* <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: truncateText(
                        factor?.cartItems?.find(
                          (it) =>
                            it?.refrigeratorCakeId ==
                            refCakeItem?.refrigeratorCakeId
                        ).refrigeratorCake?.description
                      ),
                    }}
                  ></p> */}
                  <div className="mt-2 p-0 d-flex flex-column gap-2 justify-content-start align-items-start">
                    <span>{`وزن : ${formatNumber(
                      factor?.cartItems?.find(
                        (it) =>
                          it?.refrigeratorCakeId ==
                          refCakeItem?.refrigeratorCakeId
                      ).refrigeratorCake?.exactWeight
                    )} گرم`}</span>
                    <span>{`نوع : ${"متوسط"}`}</span>
                    <span>{`قیمت : ${formatNumber(
                      factor?.cartItems?.find(
                        (it) =>
                          it?.refrigeratorCakeId ==
                          refCakeItem?.refrigeratorCakeId
                      ).refrigeratorCake?.price
                    )} تومان`}</span>
                  </div>
                </div>
                <div
                  className="cartItemTeash d-flex justify-content-center align-items-center"
                  onClick={() => {
                    handleUnreserveCake(refCakeItem.refrigeratorCakeId);
                  }}
                >
                  <div>
                    <button className="trash text-center d-flex justify-content-center align-items-center">
                      {/* <img className="w-100" src={trash} alt="trash" /> */}
                      <DeleteForeverIcon
                        style={{ width: "35px", height: "35px", color:"rgba(201, 0, 0, 1)" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 m-0 p-0 mt-3">
                <ReservationProgress
                  reservationDate={
                    factor?.cartItems?.find(
                      (it) =>
                        it?.refrigeratorCakeId == refCakeItem.refrigeratorCakeId
                    ).refrigeratorCake.reservationDate
                  }
                  currentDate={factor?.currentDate}
                  onReservertionExpired={() => {
                    handleUnreserveCake(refCakeItem.refrigeratorCakeId);
                  }}
                />
              </div> */}
            </div>
          ))}
    </div>
  );
};

export default RefrigeratorCakeSection;
