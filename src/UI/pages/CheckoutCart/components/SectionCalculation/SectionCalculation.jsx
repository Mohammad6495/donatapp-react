import React from "react";
import "./styles/SectionCalculation.scss";
import { formatPrice } from "../../../../../core/utility/helperFunctions";
import { BorderBottom } from "@mui/icons-material";

const getSendPrice = (sp) => {
  if (!sp) return 0;
  if (sp == -1) return 0;
  else return sp;
};

const SectionCalculation = ({
  calculationText,
  calculationTextStyle,
  calculationIcon,
  calculationCounter,
  calculationPrice,
  calculationPriceStyle,
  payAtHome,
  payAtCaro,
  isGift,
  discountForOnlinePayment,
  finalPriceWithDiscountForOnlinePayment,
  sendPrice,
  isSend,
  isOnline,
  borderBottom
}) => {
  return (
    <div className="d-flex justify-content-between  align-items-center item-selector w-100 " style={{ borderBottom: borderBottom ? "1px solid #959595" : null, padding: '12px 0px' }}>
      <div className="d-flex gap-2 align-items-center">
        {calculationIcon && <div className="SectionCalculationIcon">
          <img width={16} height={16} src={calculationIcon} alt="motorcycle" />
        </div>}
        <h6 className={`mb-0 fs-7 fw-bold mb-0 ${calculationTextStyle}`}>{calculationText}</h6>
        {calculationCounter && <span className="pt-1 calculationConsignment">{calculationCounter} مرسوله</span>}
      </div>
      {(!isGift || isGift) &&
        (!payAtCaro || payAtCaro) &&
        !payAtHome &&
        discountForOnlinePayment !== 0 &&
        finalPriceWithDiscountForOnlinePayment ? (
        <div className="d-flex align-items-center" style={{ fontSize: '11px'}}>
          <span className="mx-2 text-danger">
            %{discountForOnlinePayment} تخفیف
          </span>
          <span>
            {formatPrice(finalPriceWithDiscountForOnlinePayment + getSendPrice(sendPrice))}{" "}
            تومان
          </span>
        </div>
      ) : (
        calculationPrice && (
          <div className="position-relative" style={{ fontSize: '11px'}}>
            <span className={calculationPriceStyle}>{calculationPrice} </span>
            {isSend && (
              <span
                style={{
                  position: "absolute",
                  height: "2px",
                  width: "110%",
                  right: "-5px",
                  left: "0",
                  backgroundColor: "red",
                  top: "12px",
                }}
              ></span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SectionCalculation;
