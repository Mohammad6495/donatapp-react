import React from "react";
import { ImageComponent } from "../../../components/Image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import "./styles/filterItem.scss";

const CookieCategoriesItem = ({
  itemId,
  filtersCount,
  isActive,
  itemImg,
  itemText,
  filterHandler,
  categoryId,
}) => {
  return (
    <div
      onClick={() => filterHandler(itemId)}
      className="d-flex justify-content-between mx-1 align-items-center cursor-pointer "
    >
      <div
        className={`${
          categoryId == itemId ? "active" : ""
        } d-flex flex-column justify-content-center align-items-center px-3 py-2 item-categori h-100 `}
      >
        <div className="rounded-1">
          {itemImg ? (
            <img
              className="w-100 rounded-1"
              style={{ maxHeight: "80px" }}
              src={itemImg}
              alt="NO_PIC"
              onError={(e) => (e.currentTarget.src = defImg)}
            />
          ) : (
            <ImageNotSupportedIcon
              htmlColor="#CB764073"
              style={{ fontSize: "30px" }}
            />
          )}
        </div>
        <span className="fs-9 type-title fw-bold mt-1">{itemText}</span>
      </div>
    </div>
  );
};

export default CookieCategoriesItem;
