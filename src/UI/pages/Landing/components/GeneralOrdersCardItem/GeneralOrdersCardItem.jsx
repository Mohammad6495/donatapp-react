import React from "react";
import { useNavigate } from "react-router";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import alarmIcon from "../../../../../assets/images/alarmIcon.svg";
import callIcon from "../../../../../assets/images/status.svg";
import "./styles/GeneralOrdersCardItem.scss";

const GeneralOrdersCardItem = ({
  orderStatus,
  orderPrice,
  id,
  purchaseRequestStatusToString,
}) => {
  const navigate = useNavigate();

  const handleNavigateToOrderTracking = () => {
    navigate("/general-order-details/" + id);
  };

  return (
    <div
      className="order-card-container d-flex justify-content-between align-items-center w-100 mt-2"
      onClick={handleNavigateToOrderTracking}
    >
      {/* هدر کارت */}
      <div>
        <div className="order-card-header">
          <img src={alarmIcon} alt="alarm" className="order-icon" />
          <span className="order-active-text fs-7">سفارش فعال </span>
        </div>

        {/* وضعیت سفارش */}
        <div className="order-status mt-2">
          <img src={callIcon} alt="call" className="status-icon" />
          <span className="fs-8" style={{ color: "##C36428" }}>
            وضعیت سفارش :{purchaseRequestStatusToString}
          </span>
        </div>
      </div>
      {/* قیمت و دکمه پیگیری */}
      <div className="order-card-footer">
        <button
          className="track-order-btn"
          onClick={handleNavigateToOrderTracking}
        >
          پیگیری سفارش
        </button>
      </div>
    </div>
  );
};

export default GeneralOrdersCardItem;
