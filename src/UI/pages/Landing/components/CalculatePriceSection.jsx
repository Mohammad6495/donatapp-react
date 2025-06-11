import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../../core/contexts/AuthContext/AuthContext";
import { useProfileContext } from "../../../../core/contexts/UserProfileContext/UserProfileContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { calcPrice_apiCalls } from "../../../../core/services/agent";
import { formatNumber } from "../../../../core/utility/helperFunctions";
/////////////
const CalculatePriceSection = ({ currentBranchData, userAddressData }) => {
  const navigate = useNavigate();
  const { userToken } = useAuthContext();
  ///////////////
  /////////////////

  const handleNavigateCalcPrice = () => {
    navigate(
      `/calc-price?branchId=${currentBranchData.id}&branchLat=${currentBranchData?.lat}&branchLng=${currentBranchData?.lng}&destLat=${userAddressData?.lat}&destLng=${userAddressData?.long}`
    );
  };
  ////
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState();
  const handleCal = () => {
    if (!userAddressData?.id) {
      toast.error(
        <div className="text-wrap">
          برای محاسبه هزینه ارسال لطفا در صفحه پروفایل یک آدرس پیش فرض انتخاب
          کنید .
        </div>
      );
      return;
    }
    if (!userAddressData?.lat || !userAddressData?.long) {
      toast.error(
        <div className="text-wrap">
          آدرس پیش فرض شما مختصات ندارد . لطفا یک آدرس جدید با مختصات وارد کنید
          و سپس برای محاسبه هزینه ارسال اقدام نمایید .
        </div>
      );
      return;
    }
    if (
      !currentBranchData ||
      !currentBranchData?.lat ||
      !currentBranchData?.lng
    ) {
      toast.error(
        <div className="text-wrap">
          برای محاسبه هزینه ارسال لطفا یک شعبه انتخاب کنید .
        </div>
      );
      return;
    }
    ///////////
    setTimeout(() => {
      apiCaller({
        api: calcPrice_apiCalls.apiCall_getCalculatedPrice,
        apiArguments: {
          branchLat: currentBranchData?.lat,
          branchLng: currentBranchData?.lng,
          destiniLat: userAddressData?.lat,
          destiniLng: userAddressData?.long,
        },
        toastMessage: true,
        onErrorMessage: "محاسبه هزینه با خطا مواجه شد .",
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.statusCode === 200) {
            setCalculatedPrice(resp?.data?.data);
          } else {
            toast.error("محاسبه هزینه با خطا مواجه شد .");
          }
        },
        onStart: () => setIsCalculating(true),
        onEnd: () => setIsCalculating(false),
      });
    }, 200);
  };
  ////

  if (!userToken) return <></>;
  if (!calculatedPrice && typeof calculatedPrice !== "number")
    return (
      <span
        onClick={handleCal}
        className="address-text cursor-pointer primary noselect ms-2 text-nowrap text-center d-flex flex-row justify-content-end align-items-center"
      >
        محاسبه هزینه ارسال
        {isCalculating && (
          <CircularProgress color="primary" size={16} className="ms-2" />
        )}
      </span>
    );
  else {
    return (
      <div className="mt-4  text-nowrap d-flex flex-column justify-content-start align-items-center">
        <span className="fs-7">
          {formatNumber(calculatedPrice)} {` تومان`}
        </span>
        <span
          onClick={handleNavigateCalcPrice}
          className="mt-1 caro-text-primary  fs-9 cursor-pointer primary"
        >
          نمایش نقشه
        </span>
      </div>
    );
  }
};

export default CalculatePriceSection;
