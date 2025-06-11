import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import "./styles/OrderTrackingListItem.scss";
import { formatPrice } from "../../../../core/utility/utils";

const OrderTrackingListItem = ({
  id,
  createdAt,
  cakeOrderType,
  date,
  weight,
  isPrePaymentPriceOnline,
  isPrePaymentPricePayed,
  prePaymentPrice,
  status,
  image,
  time,
  ...rest
}) => {
  const navigate = useNavigate();
  // *************************************
  // handleNavigateToOrderDetails
  const handleNavigateToOrderDetails = () => {
    navigate(`/general-cake-order-details/${id}`);
  };

  return (
    <div
      onClick={handleNavigateToOrderDetails}
      className={` cursor-pointer d-flex flex-column justify-content-center align-items-start w-100 p-2 my-2 order-item-holder ${true ? "successfull" : "unsuccessfull"
        }`}
    >
      {/* Top Div */}
      <div className="d-flex flex-column justify-content-center align-items-start gap-1 w-100">
        <div className="order-number-holder mb-1">
          <span>مدل : </span>
          <span style={{fontSize: '15px'}} className="fw-bold">{cakeOrderType}</span>
        </div>
        <div className="order-date-holder">
          <span>تاریخ تحویل : </span>
          <span style={{ fontSize: '14px' }}>{date} ساعت {time}</span>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="d-flex justify-content-between align-items-center w-100 position-relative">
        <div className="col-8 d-flex flex-column justify-content-center align-items-start gap-1">
          <div className="d-flex mb-1">
            <span>وزن انتخابی : </span>

            <span style={{ fontSize: '14px' }}>
              {weight}
            </span>

          </div>
          {
            isPrePaymentPriceOnline && isPrePaymentPricePayed &&
            <div className="d-flex">
              <span>مبلغ بیعانه : </span>

              <span>
                {formatPrice(prePaymentPrice)} تومان
              </span>

            </div>
          }
          {
            !isPrePaymentPriceOnline && isPrePaymentPricePayed &&
            <div className="d-flex">
              <span>مبلغ بیعانه : </span>

              <span>
                {formatPrice(prePaymentPrice)} تومان (حضوری)
              </span>

            </div>
          }
          {
            isPrePaymentPriceOnline
          }

          <div className="order-status-holder">

            {
              <>
                <span className="order-status-text">وضعیت : </span>
                <span className={`order-status fs-8 fw-bold text-danger`}>
                  {status == 0 ? "ثبت اولیه" : ""}
                  {status == 1 || status == 2
                    ? 'در حال آماده سازی'
                    : ""}
                  {status == 3 ? "آماده تحویل" : ""}
                  {status == 4 ? "پایان سفارش" : ""}
                  {status == 5 ? "لغو سفارش" : ""}
                  {status == 6 ? "لغو سفارش توسط ادمین" : ""}
                </span>
              </>
            }
          </div>
        </div>
        <div className="col-4">
          <div className="p-2">
            <img src={image} className="rounded img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingListItem;
