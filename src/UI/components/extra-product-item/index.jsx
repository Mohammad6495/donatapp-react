import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { baseUrl, imgBaseUrl } from "../../../core/services/baseUrl";
import { formatNumber } from "../../../core/utility/helperFunctions";
const ExtraProductItem = (props) => {
  const {
    id,
    title,
    description,
    image,
    price,
    quantity,
    addExtraProductToBasket,
    className = "",
    ...rest
  } = props;
  return (
    <div
      onClick={() => {
        addExtraProductToBasket(id);
      }}
      style={{ borderRadius: "1rem", width: "auto", cursor: "pointer" }}
      className={
        className +
        " border caro-border-primary  p-2 d-flex flex-row justify-content-start align-items-stretch"
      }
    >
      <div className="m-0 p-0 ">
        <div
          style={{
            width: "100%",
            backgroundColor: "#ccc",
            backgroundImage: `url(${image ?? ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            aspectRatio: "1/1",
            borderRadius: "0.5rem",
            maxWidth: "90px",
            minWidth: "55px",
          }}
        ></div>
      </div>
      <div className="m-0 p-0 ps-3  d-flex flex-column justify-content-between align-items-stretch">
        <h6 className="m-0 fs-6 fw-bold">{title}</h6>
        {/* {description && (
          <div
            className="mt-2 fs-7"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )} */}
        <div className="mt-1 d-flex flex-row justify-content-end align-items-baseline">
          <span className="fs-7 fw-bold text-nowrap caro-text-primary">{`قیمت : ${formatNumber(
            price
          )} تومان`}</span>
        </div>
        {/* <div className="mt-1 d-flex flex-row justify-content-end align-items-center">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              addExtraProductToBasket(id);
            }}
            className="text-nowrap"
          >
            افزودن به سبد
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ExtraProductItem;
