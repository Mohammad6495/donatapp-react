import React from "react";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import { HighlightOff } from "@mui/icons-material";
import defImg from "../../../../../assets/images/No_Img.jpg";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import "./styles/DessertItem2.scss";

const DessertItem2 = ({
  itemId,
  itemImg,
  itemTitle,
  itemPrice,
  itemCount,
  deleteDessertHandler,
  dessertMinusButtonHandler,
  dessertPlusButtonHandler,
  className = "",
}) => {
  return (
    <div
      className={
        className + " d-flex dessert-item-holder2 w-100 cursor-pointer my-2"
      }
    >
      <div className="col-4 d-flex justify-content-center align-items-center dessert-img-holder p-3">
        <div
          className=""
          style={{
            aspectRatio: "1/1",
            width: "100%",
            // backgroundImage: `url(${imgBaseUrl + itemImg})`,
            backgroundImage: `url(${itemImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "0.5rem",
            backgroundColor: "#ccc",
          }}
        ></div>
        {/* <img
          className="w-100"
          src={imgBaseUrl + itemImg}
          onError={(e) => (e.currentTarget.src = defImg)}
          alt="NO_PIC"
        /> */}
      </div>
      <div className="col-8 d-flex flex-column justify-content-between align-items-start dessert-title-button-holder ps-2">
        <div className="d-flex justify-content-between align-items-center dessert-title-container w-100 p-2">
          <div className="d-flex flex-column justify-content-between align-items-start dessert-title-holder">
            <h6>{itemTitle}</h6>
            <div className="dessert-price">
              <span>قیمت : </span> <span>{formatNumber(itemPrice)}تومان</span>
            </div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center multiple-btn-holder">
            <HighlightOff
              onClick={() => deleteDessertHandler(itemId)}
              htmlColor="#FF0000"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center dessert-buttons-container w-100 p-2">
          <span className="dessert-count-text">تعداد : </span>
          <div className="d-flex justify-content-between align-items-center gap-2 dessert-buttons-holder">
            <button
              onClick={() => dessertPlusButtonHandler(itemId)}
              className="dessert-btn-plus"
            ></button>
            <span className="dessert-count">{itemCount}</span>
            <button
              onClick={() => dessertMinusButtonHandler(itemId)}
              className="dessert-btn-minus"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DessertItem2;
