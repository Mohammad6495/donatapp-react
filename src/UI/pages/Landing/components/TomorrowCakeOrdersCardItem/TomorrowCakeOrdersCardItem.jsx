import React from "react";
import { useNavigate } from "react-router";
import alarmIcon from "../../../../../assets/images/alarmIcon.svg";
import callIcon from "../../../../../assets/images/status.svg";
import "./styles/TomorrowCakeOrdersCardItem.scss";

const TomorrowCakeOrdersCardItem = ({  tomorrowCakePurchaseRequestStatus, id }) => {
  const navigate = useNavigate();
  const handleNavigateToOrderTracking = () => {
    navigate("/track-tomorrow-cake-order?orderId=" + id);
  };
  return (
   <></>
  );
};

export default TomorrowCakeOrdersCardItem;
