import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { tomorrowCake_apiCalls } from "../../../core/services/agent";
import defImage from "../../../assets/images/No_Img.jpg";
import { baseUrl } from "../../../core/services/baseUrl";
import "./styles.scss";
import OrderTrackingDeliveryStatus from "./components/OrderTrackingDeliveryStatus/OrderTrackingDeliveryStatus";
import basketWheel from "../../../assets/images/basket-wheel.svg";
import OrderTrackingImgItem from "./components/OrderTrackingImgItem/OrderTrackingImgItem";
import { orderIconFakeData } from "./components/utils/orderTrackingIconData";
import "./components/OrderTrackingItem.scss";
import { Button } from "@mui/material";
import {
  getTomarrow,
  locationSearchStringToObject,
} from "../../../core/utility/utils";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { CheckCircle } from "@mui/icons-material";
import ExtraProductItem from "../GeneralOrderTracking/component/cartItem/extraProductItem";

import image1 from "../../../assets/images/dollorImage.png";

const TomorrowCakeOrderDetails = () => {
  // const { orderId } = useParams();
  const { handleOpen, handleClose } = useLoadingContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_getTomarrowCakeOrderDetails,
      apiArguments: locationSearchStringToObject(location.search).orderId,
      toastMessage: true,
      onErrorMessage: "دریافت اطلاعات سفارش با خطا مواجه شد .",
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        setOrderDetails(resp.data.data);
      },
    });
  }, [locationSearchStringToObject(location.search).orderId]);
  /////

  const handleFinalPayment = () => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_finalPayment,
      apiArguments: locationSearchStringToObject(location.search).orderId,
      toastMessage: true,
      onErrorMessage: "عملیات با خطا مواجه شد لطفا دوباره تلاش کنید .",
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        console.log(resp);
        if (resp.data.data?.gatewayTransporter?.descriptor?.url)
          navigate(
            `/gateway-redirect?url=${resp.data.data.gatewayTransporter.descriptor.url}`
          );
      },
    });
  };
  //////////////////

  const getPrice = (sp) => {
    if (!sp) return "0 تومان";
    if (sp == -1) return "نامشخص";
    else return formatNumber(sp) + " تومان";
  };
  const getWeight = (w) => {
    if (!w) return "0 گرم";
    if (w == -1) return "نامشخص";
    else return formatNumber(w) + " گرم";
  };
  ////////////////////
  return (
    <section
      style={{ overflowY: "auto", position: "relative" }}
      className="m-0 p-0 p-2 flex-grow-1 d-flex flex-column justify-content-start align-items-stretch w-100 hidden-scrollbar"
    >
      <div className="d-flex justify-content-between align-items-baseline flex-wrap">
        <span className="text-caro-primary">
          {" "}
          {orderDetails?.tomorrowCake?.title ?? ""}
        </span>
        <span dir="ltr" className="mt-2">
          {orderDetails?.updatedAtFormatted ?? ""}
        </span>
      </div>

      <div className="d-flex justify-content-start align-items-center gap-2 mt-3 order-tracking-img-container w-50 ">
        {orderDetails?.tomorrowCake?.image && (
          <OrderTrackingImgItem
            orderItemImg={orderDetails?.tomorrowCake?.image}
            onLoad={(e) => {
              e.currentTarget.style.display = "inline";
            }}
          />
        )}
      </div>

      <div className="mt-3 d-flex flex-column justify-content-start align-items-start">
        <div className="d-flex justify-content-start align-items-center col-8">
          <span
            className="me-1"
            style={{
              color: orderDetails?.status < 6 ? "#222" : "#999",
            }}
          >
            مبلغ بیعانه :
          </span>
          <span
            style={{
              color: orderDetails?.status < 6 ? "#222" : "#999",
            }}
          >
            {getPrice(orderDetails?.paidPrice)}
          </span>
        </div>
        <div className="mt-2 d-flex justify-content-start align-items-center col-8">
          <span
            className="me-1"
            style={{
              color: orderDetails?.status < 6 ? "#999" : "#222",
            }}
          >
            مبلغ نهایی :
          </span>
          <span
            className="me-1"
            style={{
              color: orderDetails?.status < 6 ? "#999" : "#222",
            }}
          >
            {orderDetails?.status < 6
              ? " نامشخص "
              : getPrice(orderDetails?.finalPrice)}
          </span>
        </div>
        {/* ======== */}
        <div className="mt-2 d-flex justify-content-start align-items-center col-8">
          <span
            className="me-1"
            style={{
              color: orderDetails?.status < 6 ? "#222" : "#999",
            }}
          >
            وزن تقریبی :
          </span>
          <span
            style={{
              color: orderDetails?.status < 6 ? "#222" : "#999",
            }}
          >
            {`از ${orderDetails?.tomorrowCake?.minWeight ?? 0} گرم تا ${
              orderDetails?.tomorrowCake?.maxWeight ?? 0
            } گرم`}
            {/* {getWeight(orderDetails?.tomorrowCake?.anticipatedWeight)} */}
          </span>
        </div>
        <div className="mt-2 d-flex justify-content-start align-items-center col-8">
          <span
            className="me-1"
            style={{
              color: orderDetails?.status < 6 ? "#999" : "#222",
            }}
          >
            وزن دقیق :
          </span>
          <span
            style={{
              color: orderDetails?.status < 6 ? "#999" : "#222",
            }}
          >
            {orderDetails?.status < 6
              ? " نامشخص "
              : getWeight(orderDetails?.finalWeight)}
          </span>
        </div>
      </div>
      {orderDetails?.phoneNumberAdmin && (
        <div className="mt-4 d-flex justify-content-start align-items-center col-8">
          <>
            <span className="me-1">شماره ویرایش شده :</span>
            <span>{orderDetails?.phoneNumberAdmin ?? ""}</span>
          </>
        </div>
      )}

      {orderDetails?.addressAdmin && (
        <div className="">
          <div className="mt-2 d-flex justify-content-start align-items-center col-8">
            <span className="me-1">آدرس ویرایش شده :</span>
            <span>{orderDetails?.addressAdmin ?? ""}</span>
          </div>
        </div>
      )}
      {/* ****** */}
      <div className="my-3">
        <div className="mt-2 d-flex justify-content-start align-items-center col-8">
          <span className="me-1">شعبه :</span>
          <span>{orderDetails?.branch?.title ?? ""}</span>
        </div>
      </div>
      {/* ****** */}
      {orderDetails?.status == 6 && (
        <div className="my-3">
          <div className="mt-2 d-flex justify-content-start align-items-center col-8">
            <span className="me-1">هزینه ارسال :</span>
            <span>{getPrice(orderDetails?.sendPrice)}</span>
          </div>
        </div>
      )}
      {orderDetails?.items?.length !== 0 && (
        <div className="mb-3 mt-2">
          <h6 className="mx-1 mb-3" style={{ fontWeight: "600" }}>
            کسر و مازاد :{" "}
          </h6>
          {orderDetails?.items?.map((item) => {
            return (
              <div className="w-100 mb-3">
                <ExtraProductItem
                  image={image1}
                  {...item}
                  isInOrderPage={true}
                />
              </div>
            );
          })}
        </div>
      )}
      {/* {cartItemType == 7 && (
        <div className="w-100 mt-3">
          <h6 className="mx-1" style={{ fontWeight: "600" }}>
            کسر :{" "}
          </h6>
          <ExtraProductItem image={image1} {...item} isInOrderPage={true} />
        </div>
      )} */}
      {/* {getTomarrow("2023-02-25T11:45:00")} */}
      {/* ****** */}
      <div className="">
        <div className="mt-2 w-100 d-flex justify-content-start align-items-center col-8">
          <span className="me-1">تاریخ ارسال :</span>
          <span>
            {orderDetails?.isForTheDayAfterTomorrow ? (
              <>
                {orderDetails?.createdAt
                  ? getTomarrow(orderDetails?.createdAt?.split(".")[0], 2)
                  : ""}
              </>
            ) : (
              <>
                {orderDetails?.createdAt
                  ? getTomarrow(orderDetails?.createdAt?.split(".")[0], 1)
                  : ""}
              </>
            )}
          </span>
        </div>
      </div>
      {/* ****** */}
      <div className="">
        <div className="mt-2 w-100 d-flex justify-content-start align-items-center col-8">
          <span className="me-1">زمان ارسال :</span>
          <span>{` از ساعت ${orderDetails?.saleTImeStart} تا ساعت ${orderDetails?.saleTImeEnd} `}</span>
        </div>
      </div>
      {/* ****** */}
      <div className="w-100 d-flex flex-column justify-content-start align-items-start order-tracking-status-container w-100 mt-4">
        <OrderDeliveryStatus2 status={orderDetails?.status} />
        {/* {orderIconFakeData?.map((it) => (
          <OrderTrackingDeliveryStatus
            key={it?.id}
            text={it?.text}
            itemIcon={
              orderDetails?.status > it?.id ||
              (orderDetails?.status === 8 && it?.id === 9)
                ? CheckCircle
                : it?.Icon
            }
            className="mt-3"
            isCurrent={orderDetails?.status == it?.id ? true : false}
            isPassed={
              orderDetails?.status === 8 && it?.id === 9
                ? true
                : orderDetails?.status > it?.id
                ? true
                : false
            }
          />
        ))} */}
      </div>

      {/*  */}
      {orderDetails?.status === 6 && (
        <Button
          color="primary"
          variant="contained"
          className="mt-5 position-relative"
          style={{ zIndex: "2" }}
          onClick={handleFinalPayment}
        >
          پرداخت نهایی
        </Button>
      )}
      {/*  */}

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
          src={basketWheel}
          alt="NO_PIC"
        />
      </div>
    </section>
  );
};

export default TomorrowCakeOrderDetails;

/*
id,
tomorrowCake:{
    title,
    sizeDescription,
    description,
    image,
    anticipatedWeight,
    materials,
    tags,
    cakeSize
},
branch:{
    title,
    address
},
"tomorrowCakePurchaseRequestStatus": "در انتظار پرداخت",
"saleTImeStart": "08:01:00",
"saleTImeEnd": "12:00:00",
"status": 0,
updatedAtFormatted

6 pardakht
*/

export const OrderDeliveryStatus2Item = ({ item, line, status }) => {
  const { id, text, Icon } = item;

  return (
    <div className="OrderDeliveryStatus2Item">
      <div
        className="icon"
        style={{ borderColor: id <= status ? "#CB7640" : "#6E6E6E" }}
      >
        <Icon
          color={id <= status ? "primary" : "disabled"}
          style={{ fontSize: "24px" }}
        />
      </div>
      <div style={{ color: id <= status ? "#CB7640" : "#6E6E6E" }}>{text}</div>
      {!line && (
        <span
          className="lineStatus"
          style={{ backgroundColor: id <= status ? "#CB7640" : "#6E6E6E" }}
        ></span>
      )}
    </div>
  );
};

export const OrderDeliveryStatus2 = ({ status }) => {
  return (
    <div className="d-flex flex-column ">
      {orderIconFakeData.map((item, index) => (
        <OrderDeliveryStatus2Item
          status={status == 9 ? 9 : status == 8 ? 10 : status}
          key={item.id}
          item={item}
          line={index + 1 == orderIconFakeData.length}
        />
      ))}
    </div>
  );
};
