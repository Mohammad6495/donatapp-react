import React from "react";
import HighlightOff from "@mui/icons-material/HighlightOff";
import cappuImg from "../../../../../assets/images/capuccino.svg";
import "./styles/BakeryItem.scss";

const BakeryItem = () => {
  return (
    <div className="d-flex bakery-item-holder w-100 cursor-pointer my-2">
      <div className="col-4 d-flex justify-content-center align-items-center bakery-img-holder p-3">
        <img className="w-100" src={cappuImg} alt="NO_PIC" />
      </div>
      <div className="col-8 d-flex flex-column justify-content-between align-items-start bakery-title-button-holder ps-2">
        <div className="d-flex justify-content-between align-items-center bakery-title-container w-100 p-2">
          <div className="d-flex flex-column justify-content-between align-items-start bakery-title-holder">
            <h6>کاپوچینو</h6>
            <div className="bakery-price">
              <span>قیمت : </span> <span>100,000تومان</span>
            </div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center multiple-btn-holder">
            <HighlightOff htmlColor="#FF0000" />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center bakery-buttons-container w-100 p-2">
          <span className="bakery-count-text">تعداد : </span>
          <div className="d-flex justify-content-between align-items-center gap-2 bakery-buttons-holder">
            <button className="bakery-btn-plus"></button>
            <span className="bakery-count">2</span>
            <button className="bakery-btn-minus"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryItem;
