import React, { useEffect, useState } from "react";
import OrderDeliveryStatus from "./component/OrderDeliveryStatus/OrderDeliveryStatus";
import { useLocation, useNavigate, useParams } from "react-router";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cart_apiCalls, branches_apiCalls, cakeOrder_apiCaller } from "../../../core/services/agent";
import CartItem from "./component/cartItem/CartItem";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import basketImg from "../../../assets/images/basket-wheel.svg";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { formatPrice, locationSearchStringToObject } from "../../../core/utility/utils";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import { formLabelClasses } from "@mui/material";
// import { formatPrice } from "../../../core/utility/utils";
// import PastryItem from "../CheckoutCart/components/PastryItem/PastryItem";

const OrderDetails = () => {
  // States
  const [orderDetail, setOrderDetail] = useState();
  const { allBranches } = useBranchesContext();
  const { id } = useParams();
  const findBranch = (branchId) => {
    if (typeof branchId === "undefined" || branchId == null) return "";
    if (allBranches?.length > 0) {
      const orderBranch = allBranches.find((br) => br?.id == branchId);
      if (orderBranch) {
        return orderBranch?.title ?? "";
      }
    }
    return "";
  };
  // utils
  // const location = useLocation();
  const navigate = useNavigate();
  // Context
  const { handleOpen, handleClose } = useLoadingContext();

  // handle get user order detail
  const handleGetUserOrderDetail = (itemId) => {
    if (!itemId) return;
    apiCaller({
      api: cakeOrder_apiCaller.apiCall_customerorderdetail,
      apiArguments: itemId,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "دریافت سفارش با خطا مواجه شد .",
      onSuccess: (resp) => {
        setOrderDetail(resp?.data?.data);
        try {
          if (resp.data.data.code) {
            document
              .getElementById("code-place-holder")
              .classList.replace("d-none", "d-flex");
            ////
            document.getElementById(
              "code-place"
            ).textContent = `#${resp.data.data.code}`;
          }
        } catch { }
      },
    });
  };

  // handle Pay Final Price
  const handlePayFinalPrice = () => {
    // const itemId = locationSearchStringToObject(location.search)?.id;
    apiCaller({
      api:cakeOrder_apiCaller.apiCall_pay,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      onError: (err) => {
        if (err?.response?.errors?.[0]) {
          toast.error(err?.response?.errors?.[0]);
        } else toast.error(" پرداخت با خطا مواجه شد .");
      },
      onSuccess: (resp) => {
        if (resp?.data?.data?.gatewayTransporter?.descriptor?.url) {
          navigate(
            `/gateway-redirect?url=${resp?.data?.data?.gatewayTransporter?.descriptor?.url}`
          );
        }
      },
    });
  };

  const [freeSendingOnlinePayment, setFreeSendingOnlinePayment] =
    useState(false);
  const getBranchIsFreeSendingOnlinePayment = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_get,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setFreeSendingOnlinePayment(
            resp?.data?.data?.freeSendingForOnlinePayment
          );
        }
      },
      onErrorMessage: "عملیات دریافت وضعیت پرداخت با خطا مواجهه شد",
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  useState(() => {
    getBranchIsFreeSendingOnlinePayment();
  }, []);

  useEffect(() => {
    handleGetUserOrderDetail(id);
    return () => {
      if (document.getElementById("code-place-holder")) {
        document
          .getElementById("code-place-holder")
          .classList.replace("d-flex", "d-none");
        ////
        document.getElementById("code-place").textContent = ``;
      }
    };
  }, [id]);

  return (
    <section
      style={{
        overflowY: "auto",
        position: "relative",
        minHeight: "80vh",
      }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar noselect"
    >
      <div className="w-75">
        <img src={orderDetail?.image} className="img-fluid rounded" />
      </div>
      {/* customerAddress */}
      <div className="d-flex w-100 my-1 mt-3">
        <span className="text-caro-primary fw-bold">عنوان کیک : </span>
        <span className="ms-1">
          {orderDetail?.cakeTitle || '---'}
        </span>
      </div>
      <div className="d-flex w-100 my-1 ">
        <span className="text-caro-primary fw-bold">مدل : </span>
        <span className="ms-1">
          {orderDetail?.cakeOrderType}
        </span>
      </div>
      {/* deliverTime */}
      <div className="d-flex w-100 my-1">
        <span className="text-caro-primary fw-bold">تاریخ تحویل : </span>
        <span className="ms-1">{orderDetail?.date} ساعت {orderDetail?.time}</span>
      </div>
      {/* weight */}
      <div className="d-flex w-100 my-1">
        <span className="text-caro-primary fw-bold">وزن انتخابی : </span>
        <span className="ms-1">{orderDetail?.weight}</span>
      </div>
      {/* status */}
      <div className="d-flex w-100 my-1">
        <span className="text-caro-primary fw-bold">وضعیت سفارش : </span>
        <span className="ms-1">
          {orderDetail?.status == 0 ? "ثبت اولیه" : ""}
          {orderDetail?.status == 1 || orderDetail?.status == 2
            ? 'در حال آماده سازی'
            : ""}
          {orderDetail?.status == 3 ? "آماده تحویل" : ""}
          {orderDetail?.status == 4 ? "پایان سفارش" : ""}
          {orderDetail?.status == 5 ? "لغو سفارش" : ""}
          {orderDetail?.status == 6 ? "لغو سفارش توسط ادمین" : ""}
        </span>
      </div>
      <div className="divider my-2"></div>
      {/* Prices */}
      <div className="d-flex w-100 my-1">
        <span className="text-caro-primary fw-bold">مبلغ بعیانه : </span>
        {orderDetail?.isPrePaymentPriceOnline ? (
          <span className="ms-1">
            {!orderDetail?.isPrePaymentPricePayed 
              ? formatPrice(orderDetail?.prePaymentPrice) + ' ' + 'تومان '
              : formatNumber(
                orderDetail?.prePaymentPrice
              ) + " تومان "}
          </span>
        ) : (
          <span className="ms-1">
            {'بیعانه به صورت حضوری پرداخت میشود'}
          </span>
        )}
      </div>

      {/* button */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
        }}
        className="d-flex justify-content-center align-items-center w-100 mt-3"
      >
        {orderDetail?.isPrePaymentPriceOnline &&
          !orderDetail?.isPrePaymentPricePayed ? (
          <OrdinaryButton
            handleOnClick={handlePayFinalPrice}
            buttonText="پرداخت آنلاین بعیانه"
            holderClasses="w-100"
          />
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
        className="w-100 d-flex justify-content-end align-items-center"
      >
        <img
          style={{
            opacity: "0.2",
            width: "70%",
          }}
          className=""
          src={basketImg}
          alt="NO_PIC"
        />
      </div>
    </section>
  );
};

export default OrderDetails;
