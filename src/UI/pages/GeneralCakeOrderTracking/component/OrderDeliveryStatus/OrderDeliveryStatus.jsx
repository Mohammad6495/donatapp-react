import { CheckCircle, Timelapse } from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import basketImg from "../../../../../assets/images/basket-wheel.svg";
import OrderTrackingDeliveryStatus from "../../../OrderTracking/components/OrderTrackingDeliveryStatus/OrderTrackingDeliveryStatus";
import {
  orderStatusFakeData,
  noCookieOrderStatusFakeData,
} from "./../../utils/orderStatusFakeData";

const OrderDeliveryStatus = ({ status, isOnlinePayment, orderHasCookie }) => {
  useEffect(() => {
    console.log(status);
  }, [status]);

  const getStatusesList = () =>
    orderHasCookie ? orderStatusFakeData : noCookieOrderStatusFakeData;

  /////////////////
  return (
    <div className="w-100 d-flex flex-column justify-content-start align-items-start order-tracking-status-container w-100 my-2 position-relative">
      {status == 8 && (
        <>
          <OrderTrackingDeliveryStatus
            text={"در انتظار پرداخت"}
            itemIcon={Timelapse}
            className="mt-3"
            isCurrent={true}
            isPassed={false}
          />
          {getStatusesList()?.map((it) => (
            <OrderTrackingDeliveryStatus
              key={it?.id}
              text={it?.text}
              itemIcon={it?.icon}
              className="mt-3"
              isCurrent={false}
              isPassed={false}
            />
          ))}
        </>
      )}

      {status != 8 &&
        getStatusesList()?.map((it) => (
          <OrderTrackingDeliveryStatus
            key={it?.id}
            text={it?.text}
            itemIcon={status > it?.id ? CheckCircle : it?.icon}
            className="mt-3"
            isCurrent={status == it?.id ? true : false}
            isPassed={status > it?.id ? true : false}
          />
        ))}
    </div>
  );
};

export default OrderDeliveryStatus;
