import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import OrdinaryButton from "../../../components/OrdinaryButton/OrdinaryButton";

///////////////////////////////////////////

const RefrigeratorCakeSubmitOrderButton = ({
  cakeDetailsIsFetching,
  cakeDetails,
  handleNavigateToRegisterOrder,
}) => {
  return (
    <>
      <div
        style={{
          zIndex: "1000",
          bottom: "env(safe-area-inset-bottom)",
          maxWidth: "576px",
          right: "0",
          left: "0",
          margin: "0 auto",
          padding: "0 1rem 1rem 1rem",
          backgroundColor: "white",
        }}
        className="w-100 position-fixed "
      >
        <Button
          onClick={() => handleNavigateToRegisterOrder(cakeDetails.id)}
          sx={{ width: "100%", padding: "14px 0" }}
          variant="contained"
          color="primary"
        >
          ادامه خرید
        </Button>
        {/* <OrdinaryButton
          buttonText={
            "ادامه خرید"
            // cakeDetailsIsFetching
            // ? "درحال بارگذاری ..."
            // : `ادامه خرید / قیمت : ${formatNumber(cakeDetails?.price) ?? "..."
            // } تومان`
          }
          buttonClasses="rounded-3 py-3"
          holderStyles={{ zIndex: "1000" }}
          buttonStyles={{ zIndex: "1000" }}
          handleOnClick={() => {
            handleNavigateToRegisterOrder(cakeDetails.id);
          }}
        /> */}
      </div>
      <div
        style={{
          height: "env(safe-area-inset-bottom)",
        }}
      ></div>
      <div
        className="w-100 mx-auto position-fixed shadow-0"
        style={{
          height: "calc(0px + env(safe-area-inset-bottom))",
          backgroundColor: "#000",
          zIndex: "10000",
          bottom: "0",
          right: "0",
          left: "0",
          maxWidth: "576px",
          position: "fixed",
        }}
      ></div>
    </>
  );
};
export default RefrigeratorCakeSubmitOrderButton;
