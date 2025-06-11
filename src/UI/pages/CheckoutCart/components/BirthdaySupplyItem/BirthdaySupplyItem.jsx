import React from "react";
import HighlightOff from "@mui/icons-material/HighlightOff";
import candle from "../../../../../assets/images/candle1.svg";
import "./styles/BirthdaySupplyItem.scss";

const BirthdaySupplyItem = () => {
  return (
    <div className="d-flex birthday-supply-item-holder w-100 cursor-pointer my-2">
      <div className="col-4 d-flex justify-content-center align-items-center birthday-supply-img-holder p-2">
        <img className="w-75" src={candle} alt="NO_PIC" />
      </div>
      <div className="col-6 d-flex flex-column justify-content-around align-items-start birthday-supply-title-holder py-2">
        <span className="birthday-supply-title-holder">شمع</span>
        <span className="birthday-supply-price">100,000تومان</span>
      </div>
      <div className="col-2 d-flex justify-content-center align-items-center multiple-btn-holder">
        <HighlightOff htmlColor="#CB7640" />
      </div>
    </div>
  );
};

export default BirthdaySupplyItem;
