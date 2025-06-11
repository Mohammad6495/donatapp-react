import React from "react";
import cake from "../../../../../assets/images/cake5.svg";
import CakeItemBadge from "./components/CakeItemBadge";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import "./styles/CakeItem.scss";

const CakeItem = ({ orderPayload }) => {
  return (
    <div className="d-flex cake-item-holder w-100 cursor-pointer my-2">
      <div className="col-4 d-flex justify-content-center align-items-center cake-img-holder p-3">
        <img
          className="w-100 rounded"
          //  src={cake}
          src={orderPayload?.cakeDetails?.image}
          onError={(e) => {
            e.currentTarget.src = cake;
          }}
          alt="NO_PIC"
        />
      </div>
      <div className="col-8 d-flex flex-column justify-content-center align-items-start cake-title-holder ps-2">
        <h6>{orderPayload.cakeDetails.title}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fs-8">مبلغ بیعانه : </span>
          <span className="cake-price ms-1">
            {formatNumber(orderPayload?.cakeDetails?.payPrice)} تومان
          </span>
        </div>
        {orderPayload?.cakeDetails?.materials && (
          <div className="d-flex gap-2">
            {orderPayload.cakeDetails.materials.split(",").map((it) => (
              <span>{it}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeItem;
