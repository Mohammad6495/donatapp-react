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
import locationBlackIage from "../../../assets/images/location-black.png";
import "./orderDetails.scss";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import { convertPersianTime } from "../../../core/utility/utils";

const OrderDetails = () => {
  // States
  const { userData } = useProfileContext();
  const [orderDetail, setOrderDetail] = useState();
  const [balanceCashBack, setBalanceCashBack] = useState(false);
  const [
    balanceCashBackForInPersonPayment,
    setBalanceCashBackForInPersonPayment,
  ] = useState(false);
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
        } catch {}
      },
    });
  };

  // handle Pay Final Price
  const handlePayFinalPrice = () => {
    // const itemId = locationSearchStringToObject(location.search)?.id;
    apiCaller({
      api: cart_apiCalls.apiCall_payFinalPrice,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      onError: (err) => {
        if (err?.response?.errors?.[0]) {
          toast.error(err?.response?.errors?.[0]);
        } else toast.error(" پرداخت با خطا مواجه شد .");
      },
      onSuccess: (resp) => {
        if (resp?.data?.data?.url) {
          navigate(
            `/gateway-redirect?url=${resp?.data?.data?.url}`
          );
        }
      },
    });
  };


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
          {convertPersianTime(orderDetail?.createdAt)}
        </span>
      </div>
      <div className="order-details-info">
        <div className="order-details-info-top">
          <span>نام کاربری : {userData?.firstName}</span>
          <span>شماره همراه : {userData?.userName}</span>
        </div>
        <div className="order-details-info-center">
          <div>
            <img src={locationBlackIage} alt="location" />
          </div>
          <span>ارسال به آدرس انتخاب شده</span>
        </div>
        <span className="order-details-info-botton">
          {orderDetail?.userAddress?.address}
        </span>
      </div>
      {orderDetail?.product?.map((item, indx) => (
        <CartItem key={indx} item={item.product} />
      ))}

      <div className="w-100 d-flex flex-column mt-3 pb-1">
        {/* createdAt */}
        <div className="list-style d-flex w-100 my-1">
          <span className="text-caro-primary fw-bold">تاریخ سفارش : </span>
          <span className="ms-1">
            {convertPersianTime(orderDetail?.createdAt)}
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

      <div className="payment d-flex flex-column">
        <div
          className={
            orderDetail?.discountForOnlinePayment < 0 &&
            (orderDetail?.finalPriceWithDiscountForOnlinePayment > 0 ||
              orderDetail?.finalPrice == -1)
              ? "paymentBox paymentInvalid"
              : "paymentBox paymentValid"
          }
        >
          <span className="paymentBoxTitle">مبلغ کل فاکتور : </span>
          <div className="d-flex">
            <span className="priceValue">
              {formatNumber(orderDetail?.totalPrice) + " تومان "}
            </span>
          </div>
        </div>


      </div>

      <OrderDeliveryStatus
        status={orderDetail?.status}
      />

      {/* button */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
        }}
        className="d-flex justify-content-center align-items-center w-100 mt-3"
      >
        {!orderDetail?.isPay && (
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
