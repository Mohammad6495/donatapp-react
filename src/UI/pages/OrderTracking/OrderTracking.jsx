import React, { useState } from "react";
import OrderTrackingItem from "./components/OrderTrackingItem";

const OrderTracking = () => {
  const [orderItemStatus1, setOrderItemStatus1] = useState("0");
  const [orderItemStatus2, setOrderItemStatus2] = useState("1");
  const [orderItemStatus3, setOrderItemStatus3] = useState("3");
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <OrderTrackingItem orderItemStatus={orderItemStatus1} />
      <OrderTrackingItem orderItemStatus={orderItemStatus2} />
      <OrderTrackingItem orderItemStatus={orderItemStatus3} />
    </section>
  );
};

export default OrderTracking;
