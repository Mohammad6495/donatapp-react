import React from "react";

const OrderTrackingDeliveryStatus = ({
  text,
  itemIcon: Icon,
  isCurrent,
  isPassed,
  className = "",
}) => {
  return (
    <div
      className={`${className} d-flex justify-content-start align-items-center `}
    >
      <Icon htmlColor={isCurrent ? "#CB7640" : "#ABABAB"} />
      <span
        style={{
          color: isCurrent ? "#CB7640" : "#ABABAB",
        }}
        className="fs-6 ps-1 text-caro-primary"
      >
        {text}
      </span>
    </div>
  );
};

export default OrderTrackingDeliveryStatus;
