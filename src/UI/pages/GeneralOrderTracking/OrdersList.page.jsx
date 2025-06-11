import React, { useState, useEffect } from "react";
import OrderTrackingListItem from "./component/OrderTrackingListItemBox";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cart_apiCalls } from "../../../core/services/agent";
import { Alert } from "@mui/material";

const GeneralOrderTracking = () => {
  const { openLoading, handleOpen, handleClose } = useLoadingContext();
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    apiCaller({
      api: cart_apiCalls.apiCall_getAllUserOrdersList,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "دریافت لیست سفارشات با خطا مواجه شد .",
      onSuccess: (resp) => {
        setOrdersList(resp?.data?.data);
      },
    });
  }, []);
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {ordersList &&
        ordersList?.length > 0 &&
        ordersList?.map((it) => (
          <OrderTrackingListItem
            isOnlinePayment={it.isOnlinePayment}
            key={it?.id}
            {...it}
          />
        ))}
      {!openLoading && ordersList?.length === 0 && (
        <Alert severity="warning"> سفارشی در حال حاضر موجود نیست</Alert>
      )}
      {openLoading && ordersList?.length === 0 && (
        <p className="fs-6">درحال بارگذاری اطلاعات ...</p>
      )}
    </section>
  );
};

export default GeneralOrderTracking;
