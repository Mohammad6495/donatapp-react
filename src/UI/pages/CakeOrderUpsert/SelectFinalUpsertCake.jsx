import React, { useEffect } from "react";
import { useCakeOrderContext } from "../../../core/contexts/CakeOrderContext/CakeOrderContext";
import moment from "jalali-moment";
import { toEnglishDigit } from "./CakeOrderUpsert";
import { Button } from "@mui/material";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cakeOrder_apiCaller } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useNavigate } from "react-router";

const SelectFinalUpsertCake = () => {
  const navigate = useNavigate()
  const { cakeOrderData, handleGoPrev } = useCakeOrderContext();
  const { handleOpen, handleClose } = useLoadingContext();

  const getEnuKhorakiType = () => {
    if (cakeOrderData?.printData?.isEdible) {
      return 1;
    }
    if (cakeOrderData?.printData?.isNonEdible) {
      return 2;
    }
    return 0;
  };

  const HandleSubmitApi = () => {
    const formData = new FormData();
    const jalaliDate = moment(cakeOrderData?.selectedDateEvents)
      .locale("en")
      .format("YYYY/M/D");
    formData.append("Date", jalaliDate || "");
    formData.append(
      "Time",
      timeSelectedList?.find((a) => a.id == cakeOrderData?.sendingTime).time
    );
    formData.append("AnticipatedWeight", cakeOrderData?.selectWeight);
    if (cakeOrderData?.typeOrder == 0) {
      formData.append("CakeItemId", cakeOrderData?.cakeSelectData?.id);
    }

    if (cakeOrderData?.typeOrder == 1) {
      formData.append("CakeItemId", cakeOrderData?.cakeSelectPopularData?.id);
    }

    if (cakeOrderData?.typeOrder == 2) {
      formData.append("SampleImage", cakeOrderData?.printData?.image || "");
      formData.append("KhorakiType", getEnuKhorakiType());
      formData.append("CakeTypeId", cakeOrderData?.printData?.cakeSelectPrintId);
      formData.append("TextOnImage", cakeOrderData?.specialData?.text);
    }

    if (cakeOrderData?.typeOrder == 3) {
      formData.append("SampleImage", cakeOrderData?.specialData?.image || "");
    }
    formData.append("Type", cakeOrderData?.typeOrder);
    formData.append("Voice", cakeOrderData?.voice);
    formData.append("Text", cakeOrderData?.descriptionText);

    apiCaller({
      api: cakeOrder_apiCaller.apiCall_submitCakeOrder,
      apiArguments: formData,
      onStart: handleOpen,
      onEnd: handleClose,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          navigate("/?pageId=0")
        }
      },
      onSuccessMessage: "سفارش شما با موفقیت ثبت شد",
    });
  };

  return (
    <div className="d-flex w-100 flex-column">
      <div className="w-100 my-2 d-flex">
        <span>زمان تحویل سفارش :</span>
        {cakeOrderData?.selectedDateEvents && (
          <span className="text-caro-primary fw-bold mx-1">
            {moment(
              toEnglishDigit(
                cakeOrderData?.selectedDateEvents?.toString() ?? ""
              )
            ).format("D MMMM")}
          </span>
        )}
        {cakeOrderData?.sendingTime && (
          <>
            ساعت
            <span className="text-caro-primary fw-bold ms-1">{`${
              timeSelectedList?.find((a) => a.id == cakeOrderData?.sendingTime)
                ?.time
            }`}</span>
          </>
        )}
      </div>

      <div className="d-flex mb-2 w-100">
        <span>وزن تقریبی :</span>
        <span className="text-caro-primary fw-bold">
          {
            weightSelectedList?.find((a) => a.id == cakeOrderData?.selectWeight)
              ?.label
          }
        </span>
      </div>
      <div className="d-flex flex-column mb-2">
        <div className="d-flex">
          <span>مدل انتخابی کیک : </span>
          <span className="text-caro-primary fw-bold">
            {cakeOrderData?.typeOrder == 0 && "ویترینی"}
            {cakeOrderData?.typeOrder == 1 && "پرطرفدار"}
            {cakeOrderData?.typeOrder == 2 && "پرینتی"}
            {cakeOrderData?.typeOrder == 3 && "خاص"}
          </span>
        </div>
        {cakeOrderData?.typeOrder == 0 && (
          <div className="d-flex flex-column mb-2 mt-2">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fs-8 fw-bold">کیک انتخاب شده ویترینی :</span>
            </div>
            <div
              className="d-flex p-2 rounded position-relative"
              style={{ border: "1px solid #CB7640" }}
            >
              <img
                className="rounded"
                style={{ width: "90px" }}
                src={cakeOrderData?.cakeSelectData?.image}
              />
              <span className="fs-7 ms-2">
                {cakeOrderData?.cakeSelectData?.title}
              </span>
            </div>
          </div>
        )}
        {cakeOrderData?.typeOrder == 1 && (
          <div className="d-flex flex-column mb-2 mt-2">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fs-8 fw-bold">کیک انتخاب شده پرطرفدار :</span>
            </div>
            <div
              className="d-flex p-2 rounded position-relative"
              style={{ border: "1px solid #CB7640" }}
            >
              <img
                className="rounded"
                style={{ width: "90px" }}
                src={cakeOrderData?.cakeSelectPopularData?.image}
              />
              <span className="fs-7 ms-2">
                {cakeOrderData?.cakeSelectPopularData?.title}
              </span>
            </div>
          </div>
        )}
        {cakeOrderData?.typeOrder == 2 && (
          <div className="d-flex flex-column w-100">
            {cakeOrderData?.printData?.image && (
              <div className="w-100 d-flex flex-column mt-2">
                <span>عکس آپلود شده :</span>
                <img
                  src={cakeOrderData?.printData?.imageSrc}
                  className="w-50 rounded mt-1"
                />
              </div>
            )}
            {cakeOrderData?.printData?.cakeSelectPrintCakeData && (
              <div className="mt-2">
                <span>طبق محصول انتخابی :</span>
                <div
                  className="w-50 p-2 mt-1 rounded position-relative"
                  style={{ border: "1px solid" }}
                >
                  <img
                    src={
                      cakeOrderData?.printData?.cakeSelectPrintCakeData?.image
                    }
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            )}

            <div className="d-flex mt-2 w-100">
              <span>نوع پرینتی :</span>
              <span className="text-caro-primary fw-bold">
                {cakeOrderData?.printData?.isEdible ? "خوراکی" : "غیر خوراکی"}
              </span>
            </div>
            <div className="d-flex mt-2 w-100">
              <span>نوع پرینتی :</span>
              <span className="text-caro-primary fw-bold">
                {cakeOrderData?.specialData?.text}
              </span>
            </div>
          </div>
        )}
        {cakeOrderData?.typeOrder == 3 && (
          <div className="d-flex w-100 flex-column">
            {cakeOrderData?.specialData?.image && (
              <div className="w-100 d-flex flex-column mt-2">
                <span>عکس آپلود شده :</span>
                <img
                  src={cakeOrderData?.specialData?.imageSrc}
                  className="w-50 rounded mt-1"
                />
              </div>
            )}
            {cakeOrderData?.specialData?.cakeSelectSpecialData && (
              <div className="d-flex flex-column mb-2 mt-2">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fs-8 fw-bold">کیک انتخاب شده خاص :</span>
                </div>
                <div
                  className="d-flex p-2 rounded position-relative"
                  style={{ border: "1px solid #CB7640" }}
                >
                  <img
                    className="rounded"
                    style={{ width: "90px" }}
                    src={
                      cakeOrderData?.specialData?.cakeSelectSpecialData?.image
                    }
                  />
                  <span className="fs-7 ms-2">
                    {cakeOrderData?.specialData?.cakeSelectSpecialData?.title}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="d-flex mb-2 w-100">
        <span>توضیحات :</span>
        <span className="text-caro-primary fw-bold">
          {cakeOrderData?.descriptionText}
        </span>
      </div>
      <div className="d-flex w-100 justify-content-between mt-4">
        <Button onClick={handleGoPrev} variant="contained" color="error">
          ویرایش اطلاعات
        </Button>
        <Button onClick={HandleSubmitApi} variant="contained" color="primary">
          ثبت سفارش اولیه
        </Button>
      </div>
    </div>
  );
};

export default SelectFinalUpsertCake;

const timeSelectedList = [
  {
    time: "9" + ":" + "00",
    isActive: true,
  },
  {
    time: "9" + ":" + "30",
    id: 1,
    isActive: true,
  },
  {
    time: "10" + ":" + "00",
    id: 2,
    isActive: true,
  },
  {
    time: "10" + ":" + "30",
    id: 3,
    isActive: true,
  },
  {
    time: "11" + ":" + "00",
    id: 4,
    isActive: false,
  },
  {
    time: "11" + ":" + "30",
    id: 5,
    isActive: false,
  },
  {
    time: "12" + ":" + "00",
    id: 6,
    isActive: false,
  },
  {
    time: "12" + ":" + "30",
    id: 7,
    isActive: false,
  },
  {
    time: "13" + ":" + "00",
    id: 8,
    isActive: false,
  },
  {
    time: "13" + ":" + "30",
    id: 9,
    isActive: false,
  },
  {
    time: "14" + ":" + "00",
    id: 10,
    isActive: false,
  },
  {
    time: "14" + ":" + "30",
    id: 11,
    isActive: false,
  },
  {
    time: "15" + ":" + "00",
    id: 12,
    isActive: false,
  },
  {
    time: "15" + ":" + "30",
    id: 13,
    isActive: true,
  },
  {
    time: "16" + ":" + "00",
    id: 14,
    isActive: true,
  },
  {
    time: "16" + ":" + "30",
    id: 15,
    isActive: true,
  },
  {
    time: "17" + ":" + "00",
    id: 16,
    isActive: true,
  },
  {
    time: "17" + ":" + "30",
    id: 17,
    isActive: true,
  },
  {
    time: "18" + ":" + "00",
    id: 18,
    isActive: true,
  },
  {
    time: "18" + ":" + "30",
    id: 19,
    isActive: true,
  },
  {
    time: "19" + ":" + "00",
    id: 20,
    isActive: true,
  },
  {
    time: "19" + ":" + "30",
    id: 21,
    isActive: true,
  },
  {
    time: "20" + ":" + "00",
    id: 22,
    isActive: true,
  },
  {
    time: "20" + ":" + "30",
    id: 23,
    isActive: true,
  },
  {
    time: "21" + ":" + "00",
    id: 24,
    isActive: true,
  },
];
const weightSelectedList = [
  {
    label: "کمتر از ۲ کیلو",
    id: 0,
  },
  {
    label: "۲ الی ۲/۵ کیلو",
    id: 1,
  },
  {
    label: "2/5 تا ۳ کیلو",
    id: 2,
  },
  {
    label: "۳ الی ۳/۵ کیلو",
    id: 3,
  },
  {
    label: "بالاتر (با هماهنگی)",
    id: 3,
  },
];
