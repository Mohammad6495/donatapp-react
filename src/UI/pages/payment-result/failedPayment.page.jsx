import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { formatNumber } from "../../../core/utility/helperFunctions";

const SuccessfullPaymentPage = () => {
  const { paymentId, requestId, type, payPrice, trackingNumber } = useParams();
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/?pageId=0");
  };

  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
      <h1 className="text-danger">پرداخت با خطا مواجه شد .</h1>
      <span className="mt-3">{`کد رهگیری : ${trackingNumber}`}</span>
      <span className="mt-3">{`مبلغ تراکنش : ${formatNumber(
        payPrice
      )} تومان`}</span>
      <Button
        variant="contained"
        onClick={handleNavigateToHome}
        className="p-0 m-0 py-2 w-100"
        style={{ borderRadius: "0.5rem" }}
      >
        بازگشت
      </Button>
    </div>
  );
};

export default SuccessfullPaymentPage;
