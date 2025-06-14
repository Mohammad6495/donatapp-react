import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import successPaymentImg from '../../../assets/images/success-payment.png'
/*
types{
  0:tomarrow
}

success-payment/:paymentId/:requestId/:type/:payPrice/:trackingNumber

http://localhost:5173/success-payment/paymentId:21/requestId:22/type:0/payPrice:1000000/trackingNum:638040334810774315
*/

const SuccessfullPaymentPage = () => {
  const { paymentId, requestId, type, payPrice, trackingNumber } = useParams();
  const navigate = useNavigate();

  const { resetBasket } = useShopBasketContext();

  useEffect(() => {
    resetBasket()
  }, [])

  const handleTrackOrder = () => {

      navigate(
        "/general-order-details/" + paymentId + "?backUrl=/" + "&land=/"
      );

  };

  return (
    <div className="w-100 h-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <div className="p-3 mb-1">
         <img src={successPaymentImg} className="img-fluid"/>
      </div>
      <h1 className="text-success fw-bold">پرداخت با موفقیت انجام شد !</h1>
      <span className="mt-3">
        {`کد رهگیری : `} <code dir="ltr">#{trackingNumber}</code>{" "}
      </span>
      <span className="mt-3">{`مبلغ تراکنش : ${formatNumber(
        payPrice
      )} تومان`}</span>
      <Button
        onClick={handleTrackOrder}
        className="mt-3"
        variant="contained"
        color="primary"
      >
        پیگیری سفارش
      </Button>
    </div>
  );
};

export default SuccessfullPaymentPage;
