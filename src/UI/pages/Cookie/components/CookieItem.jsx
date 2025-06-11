import React from "react";
import { ImageComponent } from "../../../components/Image";

import { formatPrice } from '../../../../core/utility/utils'

import "./styles/CookieItem.scss";
const CookieItem = ({
  cookieId,
  cookieName,
  cookieImg,
  itemClickHandler,
  className,
  id,
  pricePerKG
}) => {
  return (
    <div
      className="d-flex justify-content-around  col-6 p-1"
      onClick={() => itemClickHandler(cookieId)}
    >
      <div className="d-flex flex-column p-2 creamy-item-holder w-100">
        <ImageComponent
          id={cookieId}
          src={cookieImg}
          style={{ borderRadius: "12px", border: "1px solid transparent" }}
          imageDefaultClassName="w-100 h-100"
          placeHolderSx={{
            fontSize: "33vw",
            maxWidth: "300px",
            maxHeight: "200px",
          }}
        />{" "}
        <div className="w-100 d-flex align-items-center justify-content-between mt-1">
          <span className="title-item-creamy text-center mt-2">
            {cookieName}
          </span>
          <span style={{ fontSize: '12px'}} className="title-item-creamy text-center mt-2">
            {formatPrice(pricePerKG)} تومان
          </span>
        </div>
      </div>
    </div>
  );
};

export default CookieItem;
