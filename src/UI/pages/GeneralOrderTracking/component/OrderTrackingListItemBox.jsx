import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import "./styles/OrderTrackingListItem.scss";

const OrderTrackingListItem = ({
  id,
  code,
  finalPrice,
  sendPrice,
  createdAt,
  purchaseRequestStatus,
  purchaseRequestStatusToString,
  isOnlinePayment,
  isDarbCaro,
  discountForOnlinePayment,
  finalPriceWithDiscountForOnlinePayment,
  orgSendPrice,
  ...rest
}) => {
  const navigate = useNavigate();
  // *************************************
  // handleNavigateToOrderDetails
  const handleNavigateToOrderDetails = () => {
    navigate(`/general-order-details/${id}`);
  };

  return (
    <div
      onClick={handleNavigateToOrderDetails}
      className={` cursor-pointer d-flex flex-column justify-content-center align-items-start w-100 p-2 my-2 order-item-holder ${true ? "successfull" : "unsuccessfull"
        }`}
    >
      {/* Top Div */}
      <div className="d-flex flex-column justify-content-center align-items-start gap-1 w-100">
        <div className="order-number-holder">
          <span>شماره سفارش : </span>
          <code>{code}</code>
        </div>
        <div className="order-date-holder">
          <span>تاریخ ثبت سفارش : </span>
          <span>{createdAt}</span>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="col-8 d-flex flex-column justify-content-center align-items-start gap-1">
          <div className="d-flex">
            <span>مبلغ قابل پرداخت : </span>
            {discountForOnlinePayment !== 0 ? (
              <div>
                <span>
                  {finalPriceWithDiscountForOnlinePayment == -1
                    ? "نامشخص"
                    : formatNumber(finalPrice)} تومان
                </span>
              </div>
            ) : (
              <span>
                {finalPrice == -1 ? "نامشخص" : formatNumber(finalPrice)}
              </span>
            )}
          </div>
          {discountForOnlinePayment !== 0 && (
            <div>
              <span>تخفیف سفارش : </span>
              <span className="text-danger">
                {formatNumber(discountForOnlinePayment)} تومان
              </span>
            </div>
          )}
          {sendPrice == 0 ? (
            <div className="order-tracking-code-holder d-flex">
              <span>هزینه ارسال : </span>
              <div className="position-relative d-flex ms-2">
                <span style={{
                  position: 'absolute',
                  height: '2px',
                  width: '110%',
                  right: '-5px',
                  left: '0',
                  backgroundColor: 'red',
                  top: '12px'
                }}></span>
                <span>
                  {sendPrice == -1
                    ? "نامشخص"
                    : `${formatNumber(orgSendPrice)} تومان`}
                </span>

              </div>
            </div>
          ) : (
            <div className="order-tracking-code-holder">
              <span>هزینه ارسال : </span>

              <span>
                {sendPrice == -1
                  ? "نامشخص"
                  : `${formatNumber(sendPrice)} تومان`}
              </span>
            </div>
          )}

          <div className="order-status-holder">
            {isOnlinePayment && purchaseRequestStatus == 1 && (
              <button
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  fontSize: "14px",
                }}
                className="m-0 py-1 px-2 rounded"
              >
                پرداخت نهایی
              </button>
            )}
            {purchaseRequestStatus != 1 && (
              <>
                <span className="order-status-text">وضعیت : </span>
                <span className={`order-status fs-9`}>
                  {purchaseRequestStatus == 0 ? "در انتظار وزن شدن جعبه" : ""}
                  {purchaseRequestStatus == 2
                    ? isOnlinePayment
                      ? "پرداخت شده(در حال بررسی)"
                      : "در حال بررسی"
                    : ""}
                  {purchaseRequestStatus == 3 ? "در حال ارسال" : ""}
                  {purchaseRequestStatus == 4 ? "پایان سفارش" : ""}
                </span>
              </>
            )}
            {purchaseRequestStatus === 8 ? "در انتظار پرداخت" : ""}
          </div>
          {isDarbCaro && (
            <div
              style={{
                fontSize: "0.7rem",
              }}
              className="bg-success fs-8 text-white rounded rounded-pill px-3 py-1 mt-2"
            >
              دریافت درب دونات
            </div>
          )}
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img className="w-100" src={basketWheel} alt="NO_PIC" />
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingListItem;
