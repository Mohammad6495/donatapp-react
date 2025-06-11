import React from "react";
import basketWheel from "../../../../assets/images/basket-wheel.svg";
import "./OrderItem.scss";

const OrderItem = ({ success = true }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-start w-100 p-2 my-2 order-item-holder ${
        success ? "successfull" : "unsuccessfull"
      }`}
    >
      {/* Top Div */}
      <div className="d-flex flex-column justify-content-center align-items-start gap-1 w-100">
        <div className="order-number-holder">
          <span>شماره سفارش : </span>
          <span>21322031</span>
        </div>
        <div className="order-date-holder">
          <span>تاریخ ثبت سفارش : </span>
          <span>1400/04/13</span>
        </div>
        <div className="order-tracking-code-holder">
          <span>کد پیگیری : </span>
          <span>21231312321</span>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="col-8 d-flex flex-column justify-content-center align-items-start gap-1">
          <div className="order-tracking-code-holder">
            <span>مبلغ کل : </span>
            <span>30,000</span>
          </div>
          <div>
            <span>مبلغ قابل پرداخت : </span>
            <span>20,000</span>
          </div>
          <div className="order-status-holder">
            <span className="order-status-text">وضعیت تراکنش : </span>
            <span
              className={`order-status ${success ? "success" : "unsuccess"}`}
            >
              {success ? "موفق" : "ناموفق"}
            </span>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          <img className="w-100" src={basketWheel} alt="NO_PIC" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
