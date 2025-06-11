import React from "react";
import OrderTrackingDeliveryStatus from "./OrderTrackingDeliveryStatus/OrderTrackingDeliveryStatus";
import cakeThumb from "../../../../assets/images/thumb_cake.svg";
import capuThumb from "../../../../assets/images/thumb_capuccino.svg";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import OrderTrackingImgItem from "./OrderTrackingImgItem/OrderTrackingImgItem";
import { orderIconFakeData } from "./utils/orderTrackingIconData";
import "./OrderTrackingItem.scss";
import { baseUrl } from "./../../../../core/services/baseUrl";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const TomarrowCakeOrderItem = ({
  id,
  tomorrowCake,
  sendPrice,
  paidPrice,
  finalPrice,
  tomorrowCakePurchaseRequestStatus,
}) => {
  const navigate = useNavigate();
  const handleSeeDetails = () => {
    navigate(`/track-tomorrow-cake-order?orderId=${id}`);
    // "/track-tomorrow-cake-order/:orderId"
  };

  return (
    <div className="order-tracking-item-holder w-100 p-3 my-2">
      {/* <div className="d-flex justify-content-start align-items-center">
        <span className="text-caro-primary">کد سفارش : </span>
        <span className="text-caro-primary">{orderItemCode}</span>
      </div> */}
      <div className="d-flex justify-content-start align-items-center text-center mt-2">
        <span
          className="px-1"
          style={{ color: "#000", fontSize: "0.8rem", fontWeight: "bold" }}
        >
          {tomorrowCake?.title ?? ""}
        </span>
      </div>
      <div className="d-flex justify-content-start align-items-center gap-2 mt-3 order-tracking-img-container w-100">
        <OrderTrackingImgItem
          onError={(e) => {
            e.currentTarget.src = cakeThumb;
          }}
          orderItemImg={tomorrowCake?.image ?? ""}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start flex-column align-items-start col-8">
          <div>
            <span>مبلغ بعانه : </span>
            <span>{paidPrice}</span>
          </div>
          <div className="mt-3">
            <span>مبلغ نهایی : </span>
            <span>{finalPrice == -1 ? <>نامشخص</> : finalPrice}</span>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img className="w-100" src={basketWheel} alt="NO_PIC" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center order-tracking-status-container w-100 mt-2">
        {`وضعیت : ${tomorrowCakePurchaseRequestStatus}`}

        <Button color="primary" variant="contained" onClick={handleSeeDetails}>
          <span className="fs-8">پیگیری سفارش</span>
        </Button>

        {/* {orderIconFakeData?.map((it) => (
          <OrderTrackingDeliveryStatus
            key={it?.id}
            text={it?.text}
            itemIcon={it?.icon}
            isCurrent={orderItemStatus === it?.id ? true : false}
            isPassed={orderItemStatus > it?.id ? true : false}
          />
        ))} */}
      </div>
    </div>
  );
};

export default TomarrowCakeOrderItem;
