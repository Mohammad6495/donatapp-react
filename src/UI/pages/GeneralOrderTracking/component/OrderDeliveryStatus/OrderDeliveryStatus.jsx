import React from "react";
import {
  noCookieOrderStatusFakeData,
} from "./../../utils/orderStatusFakeData";


const OrderDeliveryStatus = ({ status }) => {
  return (
    <div className="w-100 d-flex flex-column justify-content-start align-items-start order-tracking-status-container w-100 my-3 position-relative">
        <OrderDeliveryStatus2 status={status} />
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

export const OrderDeliveryStatus2 = ({ status }) => {
  const getStatusesList = () => noCookieOrderStatusFakeData
  return (
    <div className="d-flex flex-column ">
      {getStatusesList().map((item, index) => (
        <OrderDeliveryStatus2Item
          status={status}
          key={item.id}
          item={item}
          line={index + 1 == getStatusesList().length}
        />
      ))}
    </div>
  );
};
