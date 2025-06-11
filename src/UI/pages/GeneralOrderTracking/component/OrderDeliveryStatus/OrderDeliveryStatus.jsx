import { CheckCircle, Timelapse } from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import basketImg from "../../../../../assets/images/basket-wheel.svg";
import OrderTrackingDeliveryStatus from "../../../OrderTracking/components/OrderTrackingDeliveryStatus/OrderTrackingDeliveryStatus";
import {
  orderStatusFakeData,
  noCookieOrderStatusFakeData,
} from "./../../utils/orderStatusFakeData";

// import checkMarkActiveImage from '../../../../../assets/images/track-order/';
// import checkMarkImage from '../../../../../assets/images/track-order/check-mark.svg';
// import chefHatActiveImage from '../../../../../assets/images/track-order/chef-hat-active.svg';
// import chefHatImage from '../../../../../assets/images/track-order/chef-hat.svg';
// import deliveryManActiveImage from '../../../../../assets/images/track-order/delivery-man-active.svg';
// import deliveryManImage from '../../../../../assets/images/track-order/delivery-man.svg';
// import onTimeSupportActiveImage from '../../../../../assets/images/track-order/on-time-support-active.svg';
// import onTimeSupportImage from '../../../../../assets/images/on-time-support.svg';
// import waitingActiveImage from '../../../../../assets/images/track-order/waiting-active.svg';
// import waitingImage from '../../../../../assets/images/track-order/waiting.svg';

const OrderDeliveryStatus = ({ status, isOnlinePayment, orderHasCookie }) => {
  useEffect(() => {
    console.log(status);
  }, [status]);

  console.log(status);

  const getStatusesList = () =>
    orderHasCookie ? orderStatusFakeData : noCookieOrderStatusFakeData;

  return (
    <div className="w-100 d-flex flex-column justify-content-start align-items-start order-tracking-status-container w-100 my-3 position-relative">
      {/* {status == 8 && (
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
              itemIcon={it?.Icon}
              className="mt-3"
              isCurrent={false}
              isPassed={false}
            />
          ))}
        </>
      )} */}

      {status == 8 && (
        <>
          <OrderDeliveryStatus2Item
            item={{
              id: 2,
              text: "در انتظار پرداخت",
              Icon: Timelapse,
            }}
            status={status}
            line={0}
          />
          <OrderDeliveryStatus2 status={1} orderHasCookie={orderHasCookie} />
        </>
      )}

      {/* {status != 8 &&
        getStatusesList()?.map((it) => (
          <OrderTrackingDeliveryStatus
            key={it?.id}
            text={it?.text}
            itemIcon={status > it?.id ? CheckCircle : it?.icon}
            className="mt-3"
            isCurrent={status == it?.id ? true : false}
            isPassed={status > it?.id ? true : false}
          />
        ))} */}
      {status != 8 && (
        <OrderDeliveryStatus2 status={status} orderHasCookie={orderHasCookie} />
      )}
    </div>
  );
};

export default OrderDeliveryStatus;

export const OrderDeliveryStatus2Item = ({ item, line, status }) => {
  const { id, text, Icon } = item;

  return (
    <div className="OrderDeliveryStatus2Item">
      <div
        className="icon"
        style={{ borderColor: id <= status ? "#CB7640" : "#6E6E6E" }}
      >
        <Icon
          color={id <= status ? "primary" : "disabled"}
          style={{ fontSize: "24px" }}
        />
      </div>
      <div style={{ color: id <= status ? "#CB7640" : "#6E6E6E" }}>{text}</div>
      {!line && (
        <span
          className="lineStatus"
          style={{ backgroundColor: id <= status ? "#CB7640" : "#6E6E6E" }}
        ></span>
      )}
    </div>
  );
};

export const OrderDeliveryStatus2 = ({ status, orderHasCookie }) => {
  const getStatusesList = () =>
    orderHasCookie ? orderStatusFakeData : noCookieOrderStatusFakeData;
  return (
    <div className="d-flex flex-column ">
      {getStatusesList().map((item, index) => (
        <OrderDeliveryStatus2Item
          status={status == 10 ? 0 : status == 9 ? 2 : status}
          key={item.id}
          item={item}
          line={index + 1 == getStatusesList().length}
        />
      ))}
    </div>
  );
};
