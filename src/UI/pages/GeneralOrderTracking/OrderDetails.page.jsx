import React, { useEffect, useState } from "react";
import OrderDeliveryStatus from "./component/OrderDeliveryStatus/OrderDeliveryStatus";
import { useNavigate, useParams } from "react-router";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cart_apiCalls, branches_apiCalls } from "../../../core/services/agent";
import CartItem from "./component/cartItem/CartItem";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import basketImg from "../../../assets/images/basket-wheel.svg";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import moment from "jalali-moment";
import locationBlackIage from '../../../assets/images/location-black.png'
import "./orderDetails.scss"
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";


const OrderDetails = () => {
  // States
  const {userData} = useProfileContext()
  const [orderDetail, setOrderDetail] = useState();
  const [balanceCashBack, setBalanceCashBack] = useState(false);
  const [balanceCashBackForInPersonPayment, setBalanceCashBackForInPersonPayment,] = useState(false);
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
      api: cart_apiCalls.apiCall_getUserOrderDetail,
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
      api:
        orderDetail?.purchaseRequestStatus == 8
          ? cart_apiCalls.apiCall_payIncompleteOrder
          : cart_apiCalls.apiCall_payFinalPrice,
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

  const [freeSendingOnlinePayment, setFreeSendingOnlinePayment] = useState(false);
  const getBranchIsFreeSendingOnlinePayment = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_get,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setFreeSendingOnlinePayment(
            resp?.data?.data?.freeSendingForOnlinePayment
          );
          setBalanceCashBack(resp?.data?.data?.balanceCashBack);
          setBalanceCashBackForInPersonPayment(
            resp?.data?.data?.balanceCashBackForInPersonPayment
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
    // const itemId = locationSearchStringToObject(location.search)?.id;
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

  console.log("ht", orderDetail);

  return (
    <section
      style={{
        overflowY: "auto",
        position: "relative",
        minHeight: "80vh",
      }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar noselect"
    >
      <div className="w-100 d-flex justify-content-between align-items-baseline flex-wrap pb-3">
        <span className="text-caro-primary">* ثبت سفارش :</span>
        <span dir="ltr" className="mt-2">
        {moment(orderDetail?.createdAt, "jYYYY/jMM/jDD HH:mm")
              .locale("fa")
              .format("dddd jDD jMMMM jYYYY")}
        </span>
      </div>
      <div className="order-details-info">
        <div className="order-details-info-top">
          <span>نام کاربری : {userData?.firstName}</span>
          <span>شماره همراه : {userData?.phone}</span>
        </div>
        <div className="order-details-info-center">
          <div>
            <img src={locationBlackIage} alt="location" />
          </div>
          <span>ارسال به آدرس انتخاب شده</span>
        </div>
        <span className="order-details-info-botton">{orderDetail?.customerAddress?.address}</span>
      </div>
      {orderDetail?.cartItems?.map((item, indx) => (
        <CartItem
          key={indx}
          cartItemType={item?.cartItemType}
          boxType={item?.boxType}
          {...item}
        />
      ))}

      <div className="w-100 d-flex flex-column mt-3 pb-1">
        {/* branch */}
        {(findBranch(orderDetail?.branchId) || orderDetail?.branch?.title) && (
          <div className="list-style d-flex w-100 my-1">
            <span className="text-caro-primary fw-bold">شعبه : </span>
            <span className="ms-1">
              {orderDetail?.branch?.title
                ? orderDetail?.branch?.title
                : findBranch(orderDetail?.branchId)}
            </span>
          </div>
        )}
        {/* createdAt */}
        <div className="list-style d-flex w-100 my-1">
          <span className="text-caro-primary fw-bold">تاریخ سفارش : </span>
          <span className="ms-1">
            {moment(orderDetail?.createdAt, "jYYYY/jMM/jDD HH:mm")
              .locale("fa")
              .format("dddd jDD jMMMM jYYYY")}
          </span>
        </div>
        <div className="list-style d-flex w-100 my-1">
          <span className="text-caro-primary fw-bold">زمان سفارش : </span>
          <span className="ms-1">
            {moment(orderDetail?.createdAt, "jYYYY/jMM/jDD HH:mm")
              .locale("fa")
              .format("[ساعت] HH:mm ")}
          </span>
        </div>
      </div>

      <div className="divider3 my-2"></div>

      {(orderDetail?.addressAdmin || orderDetail?.phoneNumberAdmin) && (
        <div class="border-top border-bottom py-2 fs-7 mt-3 d-flex flex-column justify-content-start align-items-stretch w-100 ">
          <div>
            <span>شماره ویرایش شده :</span>
            <span>{orderDetail?.phoneNumberAdmin ?? ""}</span>
          </div>
          {orderDetail?.addressAdmin && (
            <div class="mt-2">
              <span>آدرس ویرایش شده :</span>
              <span>{orderDetail?.addressAdmin ?? ""}</span>
            </div>
          )}
        </div>
      )}
      {/* customerAddress */}
      {/* <div className="d-flex w-100 my-1 mt-3">
        <span className="text-caro-primary fw-bold">آدرس : </span>
        <span className="ms-1">
          {orderDetail?.addressAdmin !== null
            ? orderDetail?.addressAdmin
            : orderDetail?.customerAddress?.address}
        </span>
      </div> */}
      {/* createdAt */}
      {/* <div className="d-flex w-100 my-1">
        <span className="text-caro-primary fw-bold">تاریخ سفارش : </span>
        <span className="ms-1">
          {moment(orderDetail?.createdAt, "jYYYY/jMM/jDD HH:mm")
            .locale("fa")
            .format("dddd jDD jMMMM jYYYY [ساعت] HH:mm ")}
        </span>
      </div> */}
      {/* Prices */}
      <div className="payment d-flex flex-column">
        <div className={
          orderDetail?.discountForOnlinePayment < 0 &&
            (orderDetail?.finalPriceWithDiscountForOnlinePayment > 0 ||
              orderDetail?.finalPrice == -1) ? "paymentBox paymentInvalid" : "paymentBox paymentValid"}
        >
         <span className="paymentBoxTitle">مبلغ کل فاکتور : </span>
          {orderDetail?.discountForOnlinePayment < 0 ? (
            <div className="d-flex">
              {orderDetail?.finalPriceWithDiscountForOnlinePayment > 0 ? (
                <span className="priceTitle">نامشخص</span>
              ) : (
                <span className="priceValue">{formatNumber(orderDetail?.finalPriceWithDiscountForOnlinePayment) + " تومان "}</span>
              )}
            </div>
          ) : (
            <div className="d-flex">
              {orderDetail?.finalPrice == -1 ? (
                <span className="priceTitle">نامشخص</span>
              ) : (
                <span className="priceValue">{formatNumber(orderDetail?.finalPrice) + " تومان "}</span>
              )}
            </div>
          )}
        </div>
        {!orderDetail?.isDarbCaro ? (
          orderDetail?.sendPrice == 0 ? (
            <div className="d-flex w-100 my-1 flex-column">
              <span className="text-caro-primary fw-bold">
                هزینه ارسال اصلی :{" "}
              </span>
              <span className="ms-1">
                <div className="position-relative d-flex ms-2">
                  <span>
                    {orderDetail?.orgSendPrice == -1
                      ? "نامشخص"
                      : `${orderDetail?.sendPrice == 0
                        ? "رایگان"
                        : formatNumber(orderDetail?.orgSendPrice) + " تومان"
                      }`}
                  </span>
                </div>
              </span>
            </div>
          ) : (
            <div className={
              !orderDetail?.sendPrice == 0 &&
                orderDetail?.sendPrice == -1
                ? "paymentBox paymentInvalid" : "paymentBox paymentValid"}
            >
              <div>
              <span className="paymentBoxTitle">مبلغ ارسال : </span>
                {orderDetail?.sendPrice == -1 ? (
                  <span className="priceTitle">نامشخص</span>
                ) : (
                  <span className="priceValue">{formatNumber(orderDetail?.sendPrice) + " تومان "}</span>
                )}
              </div>
            </div>
          )
        ) : (
          <div
            style={{
              fontSize: "0.7rem",
            }}
            className="align-self-start bg-success fs-8 text-white rounded rounded-pill px-3 py-1 mt-2"
          >
            {" "}
            دریافت درب دونات
          </div>
        )}


        {orderDetail?.useBalance && orderDetail?.paidFromBalanceAmount !== 0&& (
          <div className="d-flex w-100 my-1 gap-1">
            <span className="text-caro-primary fw-bold">
              مبلغ پرداختی از کیف پول :{" "}
            </span>
            <span>
              {" "}
              {formatNumber(orderDetail?.paidFromBalanceAmount || 0)} تومان{" "}
            </span>
          </div>
        )}
        {orderDetail?.useBalance && (
          <div className="d-flex w-100 my-1 gap-1">
            <span className="">
              <span className="text-caro-primary fw-bold">{orderDetail?.isOnlinePayment || orderDetail?.isDarbCaro
                ? formatNumber(
                  (orderDetail?.finalPrice * balanceCashBack) / 100 ?? 0
                ) + " تومان "
                : formatNumber(
                  (orderDetail?.finalPrice *
                    balanceCashBackForInPersonPayment) /
                  100 ?? 0
                ) + " تومان "}</span> به کیف پول شما برای خرید بعدی شارژ شد
            </span>
          </div>
        )}
        {orderDetail?.discountForOnlinePayment !== 0 && (
          <div className="d-flex w-100 my-1">
            <span className="text-caro-primary fw-bold">تخفیف سفارش : </span>
            <span className="text-danger">
              {" "}
              {formatNumber(
                orderDetail?.discountForOnlinePayment || 0
              )} تومان{" "}
            </span>
          </div>
        )}
        {orderDetail?.discountAmount != 0 && (
          <div className="d-flex w-100 my-1">
            <span className="text-caro-primary fw-bold">مبلغ تخفیف : </span>
            <span className="ms-1">
              {orderDetail?.discountAmount == -1
                ? "نامشخص"
                : formatNumber(orderDetail?.discountAmount) + " تومان "}
            </span>
          </div>
        )}
      </div>

      <OrderDeliveryStatus
        isOnlinePayment={orderDetail?.isOnlinePayment}
        orderHasCookie={orderDetail?.cartItems?.some(
          (item) => item.cartItemType == 1
        )}
        status={orderDetail?.purchaseRequestStatus}
      />

      {orderDetail?.isOnlinePayment &&
        orderDetail?.purchaseRequestStatus == 1 &&
        freeSendingOnlinePayment && (
          <p className="mb-0 mt-2 text-danger fw-bold">
            درصورت پرداخت آنلاین هزینه ارسال رایگان خواهد بود
          </p>
        )}
      {/* button */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
        }}
        className="d-flex justify-content-center align-items-center w-100 mt-3"
      >
        {orderDetail?.isOnlinePayment &&
          orderDetail?.purchaseRequestStatus == 1 ? (
          <OrdinaryButton
            handleOnClick={handlePayFinalPrice}
            buttonText="پرداخت آنلاین"
            holderClasses="w-100"
          />
        ) : null}
        {orderDetail?.purchaseRequestStatus == 8 && (
          <OrdinaryButton
            handleOnClick={handlePayFinalPrice}
            buttonText="پرداخت آنلاین"
            holderClasses="w-100"
          />
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
