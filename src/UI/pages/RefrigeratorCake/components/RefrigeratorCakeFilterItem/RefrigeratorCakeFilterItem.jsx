import React from "react";
import defImg from "../../../../../assets/images/def_img_filterItem.png";
import "../styles/RefrigeratorCakeFilterItem.scss";

const RefrigeratorCakeFilterItem = ({
  itemId,
  itemImg,
  itemText,
  isActive,
  filterHandler,
}) => {
  return (
    <div
      onClick={() => filterHandler(itemId)}
      className="d-flex justify-content-between align-items-center cursor-pointer "
    >
      <div
        className={`${
          isActive ? "active" : ""
        } d-flex flex-column justify-content-center align-items-center  item h-100 `}
      >
        <div className="rounded-1">
          <img
            className="w-100 rounded-1"
            style={{ maxHeight: "80px" }}
            src={itemImg}
            alt="NO_PIC"
            onError={(e) => (e.currentTarget.src = defImg)}
          />
        </div>
        {/* <span className="fs-9 type-title fw-bold mt-1">{itemText}</span> */}
      </div>
    </div>
  );
};

export default RefrigeratorCakeFilterItem;
