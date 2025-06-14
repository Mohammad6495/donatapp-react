import React from "react";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import defImg from "../../../../../assets/images/No_Img.jpg";
import "./styles/RefrigeratorCakeItem.scss";
import { formatNumber } from "../../../../../core/utility/helperFunctions";

const RefrigeratorCakeItem = ({ item }) => {
  return (
    <div className="d-flex cake-item-holder w-100 my-2 noselect p-2">
      <div className="col-4 d-flex justify-content-center align-items-center cake-img-holder p-3 rounded">
        <img
          className="w-100 rounded"
          // src={imgBaseUrl + refrigeratorCake?.image}
          src={imgBaseUrl +  item?.image}
          onError={(e) => {
            e.currentTarget.src = defImg;
          }}
          alt="NO_PIC"
        />
      </div>
      <div className="col-8 d-flex flex-column justify-content-center align-items-start cake-title-holder ps-2">
        <h6>{item?.title}</h6>
        <span className="cake-price mb-2">{formatNumber(item?.price)} تومان</span>
        {item?.tags && (
          <div className="d-flex gap-2">
            {item?.tags?.split(",").map((it) => (
              <span className="fs-9">{it}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefrigeratorCakeItem;
