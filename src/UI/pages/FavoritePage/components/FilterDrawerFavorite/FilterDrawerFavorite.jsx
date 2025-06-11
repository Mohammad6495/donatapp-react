import React from "react";

import "./styles.scss";

const FilterDrawerFavorite = ({
  favoriteCategoryList,
  selectCatFavoriteId,
  handleSetFavoriteSelectedId,
}) => {
  return (
    <div className="row favoritecat">
      {favoriteCategoryList?.map((item) => (
        <div className="col-12">
          <div
            onClick={() => handleSetFavoriteSelectedId(item?.id)}
            style={{ border: "1px solid #CB7640" }}
            className={`${
              selectCatFavoriteId == item?.id ? "active" : ""
            } d-flex flex-column justify-content-center align-items-center w-100 rounded p-2`}
          >
            <div className="rounded-1">
              <img className="w-100 rounded-1" src={item?.image} alt="NO_PIC" />
            </div>
            <span className="fs-9 type-title fw-bold mt-1">{item?.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterDrawerFavorite;
