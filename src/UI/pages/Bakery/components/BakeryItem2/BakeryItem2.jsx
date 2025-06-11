import React from "react";
import { HighlightOff } from "@mui/icons-material";
import defImg from "../../../../../assets/images/No_img.jpg";
import "./BakeryItem2.scss";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";

const BakeryItem2 = ({
  itemId,
  itemImg,
  itemTitle,
  itemPrice,
  itemCount,
  deleteBakeryHandler,
  bakeryMinusButtonHandler,
  bakeryPlusButtonHandler,
  isInOrderPage = false,
  className = "",
}) => {
  return (
    <div
      className={
        className + " d-flex bakery-item-holder2 w-100 cursor-pointer mt-3"
      }
    >
      <div className="col-4 d-flex justify-content-center align-items-center bakery-img-holder p-3">
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
            borderRadius: "4px",
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
      <div className="col-8 d-flex flex-column gap-1 align-items-start bakery-title-button-holder py-3">
        <div className="d-flex justify-content-between align-items-center bakery-title-container w-100">
          <div className="d-flex flex-column justify-content-between align-items-start bakery-title-holder">
            <h6>{itemTitle}</h6>
          </div>
          {isInOrderPage ? (
            <></>
          ) : (
            <div className="col-2 d-flex justify-content-center align-items-center multiple-btn-holder">
              <HighlightOff
                onClick={() => deleteBakeryHandler(itemId)}
                htmlColor="#FF0000"
              />
            </div>
          )}
        </div>
        <div className="bakery-count-text">
          <span>قیمت : </span> <span> {formatNumber(itemPrice)} تومان</span>
        </div>
        <div className="bakery-count-text">
          <span>نوع : </span>
          <span>متوسط</span>
        </div>
        <div
          className={
            (isInOrderPage
              ? "justify-content-start"
              : "justify-content-between") +
            " d-flex  align-items-center bakery-buttons-container w-100"
          }
        >
          <span className="bakery-count-text">تعداد : </span>
          {isInOrderPage ? (<span className="ms-2 bakery-count-text">{itemCount}</span>) : (
            <div className="d-flex justify-content-between align-items-center gap-2 me-2 bakery-buttons-holder">
              <button
                onClick={() => bakeryPlusButtonHandler(itemId)}
                className="bakery-btn-plus"
              ></button>
              <span className="bakery-count">{itemCount}</span>
              <button
                onClick={() => bakeryMinusButtonHandler(itemId)}
                className="bakery-btn-minus"
              ></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BakeryItem2;
