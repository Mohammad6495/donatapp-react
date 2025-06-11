import React from "react";

const OrderTrackingImgItem = ({ orderItemImg, onError, imgstyle }) => {
  return (
    <div className="order-tracking-img-holder">
      <img
        style={imgstyle ?? {}}
        onError={onError}
        className="w-100 rounded"
        src={orderItemImg}
        alt="NO_PIC"
      />
    </div>
  );
};

export default OrderTrackingImgItem;
