import React from "react";
import OrderItem from "./components/OrderItem";
import "./styles/Orders.scss";

const Orders = () => {
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <OrderItem success={true} />
      <OrderItem success={false} />
      <OrderItem success={true} />
      <OrderItem success={false} />
    </section>
  );
};

export default Orders;
