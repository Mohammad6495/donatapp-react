import {
  AddBox,
  AddCircle,
  Close,
  Delete,
  PlusOne,
  RemoveCircle,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { imgBaseUrl } from "../../../../../../core/services/baseUrl";
import { formatNumber } from "../../../../../../core/utility/helperFunctions";
/////////
const ShopBasketExtraProduct = ({
  id,
  title,
  description,
  image,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
  itemCount,
  className = "",
  count
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(151, 48, 121, 0.08)",
        borderRadius: "0.75rem",
      }}
      className="mt-2 d-flex flex-row justify-content-start align-items-stretch"
    >
      <div className="m-0 p-2  " style={{ minWidth: "calc(1rem + 85px)" }}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#ccc",
            backgroundImage: `url(${image?.includes(imgBaseUrl) ? image : imgBaseUrl + image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            aspectRatio: "1/1",
            borderRadius: "0.5rem",
            maxWidth: "85px",
          }}
        ></div>
      </div>
      <div className="m-0 p-2 flex-grow-1 d-flex flex-column justify-content-between align-items-stretch">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h6 className="fw-bold">{title}</h6>
          <span onClick={onDelete} className="  cursor-pointer ">
            <CancelIcon color="error" />
          </span>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <span className="fs-7">
            {formatNumber(price * itemCount)} {` تومان`}
          </span>
          <div className="d-flex justify-content-between align-items-center gap-2 bakery-buttons-holder">
            <AddCircle
              className="cursor-pointer"
              onClick={onIncrement}
              color="primary"
            />
            <span className="bakery-count">{itemCount}</span>
            <RemoveCircle
              className="cursor-pointer"
              onClick={onDecrement}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBasketExtraProduct;
