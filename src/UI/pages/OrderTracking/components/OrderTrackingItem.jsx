import React from "react";
import OrderTrackingDeliveryStatus from "./OrderTrackingDeliveryStatus/OrderTrackingDeliveryStatus";
import cakeThumb from "../../../../assets/images/thumb_cake.svg";
import capuThumb from "../../../../assets/images/thumb_capuccino.svg";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import OrderTrackingImgItem from "./OrderTrackingImgItem/OrderTrackingImgItem";
import { orderIconFakeData } from "./utils/orderTrackingIconData";
import "./OrderTrackingItem.scss";
import { Check, CheckCircle } from "@mui/icons-material";

const OrderTrackingItem = ({
  orderItemStatus,
  orderItemCode = "",
  orderItemAddress = "",
  orderItemPrice = "",
}) => {
  return (
    <div className="order-tracking-item-holder w-100 p-3 my-2">
      <div className="d-flex justify-content-start align-items-center">
        <span className="text-caro-primary">کد سفارش : </span>
        <span className="text-caro-primary">{orderItemCode}</span>
      </div>
      <div className="d-flex justify-content-start align-items-center text-center mt-2">
        <span
          style={{ color: "#CB7640", fontSize: "0.8rem", fontWeight: "bold" }}
        >
          آدرس :
        </span>
        <span
          className="px-1"
          style={{ color: "#000", fontSize: "0.8rem", fontWeight: "bold" }}
        >
          {orderItemAddress}
        </span>
      </div>
      <div className="d-flex justify-content-start align-items-center gap-2 mt-3 order-tracking-img-container w-100">
        <OrderTrackingImgItem orderItemImg={capuThumb} />
        <OrderTrackingImgItem orderItemImg={cakeThumb} />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start align-items-center col-8">
          <span>مبلغ پرداخت : </span>
          <span>{orderItemPrice}</span>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img className="w-100" src={basketWheel} alt="NO_PIC" />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center order-tracking-status-container w-100 mt-2">
        {orderIconFakeData?.map((it) => (
          <OrderTrackingDeliveryStatus
            key={it?.id}
            text={it?.text}
            itemIcon={orderItemStatus > it?.id ? CheckCircle : it?.icon}
            isCurrent={orderItemStatus === it?.id ? true : false}
            isPassed={orderItemStatus > it?.id ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTrackingItem;
