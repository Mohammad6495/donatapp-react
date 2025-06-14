import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import "./styles/OrderTrackingListItem.scss";
import { convertPersianTime } from "../../../../core/utility/utils";

const OrderTrackingListItem = ({
  id,
  code,
  totalPrice,
  isPay,
  sendPrice,
  createdAt,
  status,
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
      className={` cursor-pointer d-flex flex-column justify-content-center align-items-start w-100 p-2 my-2 order-item-holder ${
        true ? "successfull" : "unsuccessfull"
      }`}
    >
      {/* Top Div */}
      <div className="d-flex flex-column justify-content-center align-items-start gap-1 w-100">
        <div className="order-number-holder">
          <span>شماره سفارش : </span>
          <code>#{String(id).slice(0, 15)}</code>
        </div>
        <div className="order-date-holder">
          <span>تاریخ ثبت سفارش : </span>
          <span>{convertPersianTime(createdAt)}</span>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="col-8 d-flex flex-column justify-content-center align-items-start gap-1">
          <div className="d-flex">
            <span>مبلغ پرداختی : </span>
            {discountForOnlinePayment !== 0 ? (
              <div>
                <span>{formatNumber(totalPrice)} تومان</span>
              </div>
            ) : (
              <span>
                {finalPrice == -1 ? "نامشخص" : formatNumber(finalPrice)}
              </span>
            )}
          </div>
          <div className="order-status-holder">
            <>
              <span className="order-status-text">وضعیت : </span>
              <span className={`order-status fs-9`}>
                {status == 0 ? "در انتظار تایید" : ""}
                {status == 1 && "در حال پردازش"}
                {status == 3 ? "تکمیل سفارش" : ""}
                {status == 4 ? "پایان سفارش" : ""}
              </span>
            </>
          </div>
          <div className="order-status-holder">
            <>
              <span className="order-status-text">وضعیت پرداخت : </span>
              {
              isPay ? 
              <span className={`order-status fs-9 text-success`}>پرداخت شده</span> :
              <span className={`order-status fs-9 text-danger`}>پرداخت نشده</span>
              }
            </>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img className="w-100" src={basketWheel} alt="NO_PIC" />
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingListItem;
