import React, { useState, useEffect } from "react";
import OrderTrackingItem from "./components/tomarrowCakeOrderItem";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { tomorrowCake_apiCalls } from "../../../core/services/agent";
import { Alert } from "@mui/material";

const OrderTracking = () => {
  const { openLoading, handleOpen, handleClose } = useLoadingContext();
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_getTomarrowCakeOrdersList,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "دریافت لیست سفارشات با خطا مواجه شد .",
      onSuccess: (resp) => {
        setOrdersList(resp.data.data);
      },
    });
  }, []);

  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {ordersList.map((it) => (
        <OrderTrackingItem key={it.id} {...it} />
      ))}
      {!openLoading && ordersList?.length === 0 && (
        <Alert severity="warning">متاسفانه سفارشی در حال حاضر موجود نیست</Alert>
      )}
      {openLoading && ordersList?.length === 0 && (
        <p className="fs-6">درحال بارگذاری اطلاعات ...</p>
      )}
    </section>
  );
};

export default OrderTracking;
