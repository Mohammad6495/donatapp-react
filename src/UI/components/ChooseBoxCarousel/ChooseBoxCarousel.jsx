import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
//
import img1 from "../../../assets/images/box.png";
import { useCookiesContext } from "../../../core/contexts/CookiesContext/CookiesContext";
import { useCreamyCookiesContext } from "../../../core/contexts/CreamyCookiesContext/CreamyCookiesContext";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { cookie_apiCalls } from "../../../core/services/agent";
import CarouselContextProvider, { useCarouselContext } from "./carouselContext";
import cookieImg1 from '../../../assets/images/cookie/0.5 kg.png'
import cookieImg2 from '../../../assets/images/cookie/1.5 kg.png'
import cookieImg3 from '../../../assets/images/cookie/1kg.png'
import cookieImg4 from '../../../assets/images/cookie/2 kg.png'


import "./styles.css";

const ChoosingBoxCarouselItem = ({
  index,
  boxSize = "120 * 120",
  boxSizeNumber = "نیم",
  pastryCount = "3",
  boxRows = "3",
  boxType = 0,
}) => {
  const { currentItem } = useCarouselContext();
  const {
    boxRows: creamyCookieBoxRows,
    boxRowCount: creamyCookieBoxRowsCount,
  } = useCreamyCookiesContext();
  const { boxRows: cookieBoxRows, boxRowCount: cookieBoxRowsCount } =
    useCookiesContext();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigateItem = (boxRows) => {
    // شیرینی تر
    if (id == 1) {
      navigate(`/creamy-cookie/${boxRows}`, {
        state: { boxSizeNumber, boxType },
      });
    }
    // شیرینی خشک
    else if (id == 2) {
      navigate(`/cookie/${boxRows}`, {
        state: { boxSizeNumber, boxType },
      });
    }
  };

  return (
    <div
      className="m-0 p-2 d-flex flex-column justify-content-center "
      onClick={() => handleNavigateItem(boxRows)}
    >
      <div
        className={
          (index == currentItem && "is-current-item") +
          " slide-item w-100 d-flex flex-column pt-3 pb-5 px-2 rounded"
        }
      >
        <div className="choosBox-carousel-img-holder">
          <img
            style={{
              maxWidth: "100%",
              width: "auto",
              maxHeight: "29vh",
              // maxWidth: "30%",
            }}
            src={img1}
            alt="NO_PIC"
          />
        </div>
        <div className="mt-3">
          <span className="fw-bold">{`جعبه ${boxSizeNumber} کیلویی`}</span>
        </div>
        <div className="mt-1">
          {/* <span>اندازه جعبه : </span>
          <span>{boxSize}</span> */}
        </div>
        <div className="my-2">
          <span style={{ color: "#777777" }}>تعداد انتخاب شیرینی</span>
        </div>
        <div dir="rtl">
          <span className="text-caro-primary fw-bold">تعداد ردیف :</span>
          <span className="text-caro-primary fw-bold ms-2">{pastryCount}</span>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button
          onClick={() => handleNavigateItem(boxRows)}
          style={{
            backgroundColor: "##C36428",
            boxShadow: "0px 0px 24px rgba(151, 48, 121, 0.4)",
            borderRadius: "8px",
            color: "#fff",
            border: "none",
            outline: "none",
            transform: "translateY(-50%)",
          }}
          className="fs-7 p-3 px-4"
        >
          انتخاب جعبه
        </button>
      </div>
    </div>
  );
};

const ChooseBoxCarousel = () => {
  const { currentItem, handleOnChange, carouselData } = useCarouselContext();
  const navigate = useNavigate();

  const { id } = useParams();
  const { handleOpen, handleClose } = useLoadingContext();
  const [cookiesLength, setCookiesLength] = useState(0);
  const [cookiesListIsFetching, setCookiesListIsFetching] = useState(false);
  /////
  const getAllCookies = async (cookieType) => {
    if (cookiesListIsFetching) return;
    apiCaller({
      api: cookie_apiCalls.apiCall_getAllCookies,
      apiArguments: cookieType,
      toastMessage: true,
      onErrorMessage:
        "دریافت اطلاعات با خطا مواجه شد . لطفا دوباره تلاش کنید .",
      onSuccess: (resp) => {
        if (resp.status == 200) {
          if (resp?.data?.data?.length > 0)
            setCookiesLength(resp?.data?.data?.length);
          else setCookiesLength(0);
        } else {
          toast.error(
            <div className="text-wrap">
              دریافت اطلاعات با خطا مواجه شد . لطفا دوباره تلاش کنید .
            </div>
          );
        }
      },
      onStart: () => {
        setCookiesListIsFetching(true);
        handleOpen();
      },
      onEnd: () => {
        setCookiesListIsFetching(false);
        handleClose();
      },
    });
  };

  useEffect(() => {
    // creamy
    if (id == 1) {
      getAllCookies(1);
    }
    // cookie
    else if (id == 2) {
      getAllCookies(0);
    }
  }, [id]);

  const handleNavigateItem = ({ boxRows, boxType, boxSizeNumber }) => {
    // شیرینی تر
    if (id == 1) {
      navigate(`/creamy-cookie/${boxRows}`, {
        state: { boxSizeNumber, boxType },
      });
    }
    // شیرینی خشک
    else if (id == 2) {
      navigate(`/cookie/${boxRows}`, {
        state: { boxSizeNumber, boxType },
      });
    }
  }
  ///////////
  ///////////
  return (
    <div
      dir="ltr"
      className="d-flex flex-column justify-content-start align-items-center"
    >
      {cookiesListIsFetching && (
        <div className="p-3">
          <div dir="rtl">در حال بارگذاری ...</div>
        </div>
      )}
      {!cookiesListIsFetching && cookiesLength == 0 && (
        <Alert dir="rtl" className="w-100" severity="warning">
          متاسفانه در حال حاضر شیرینی ای موجود نمیباشد .
        </Alert>
      )}
      {/* !cookiesListIsFetching && cookiesLength > 0 && */}
      {!cookiesListIsFetching && cookiesLength > 0 && (
        <>
          <div className="d-flex flex-wrap w-100 mt-2">
            <div className="col-6">
              <div onClick={() => handleNavigateItem({ boxRows: 3, boxType: 1, boxSizeNumber: "1" })}>
                <img
                  src={cookieImg3}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-6">
              <div onClick={() => handleNavigateItem({ boxRows: 2, boxType: 0, boxSizeNumber: "نیم" })}>
                <img
                  src={cookieImg1}
                  className="img-fluid"
                />
              </div>
            </div>


            <div className="col-6">
              <div onClick={() => handleNavigateItem({ boxRows: 5, boxType: 2, boxSizeNumber: "2" })}>
                <img
                  src={cookieImg4}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-6">
              <div onClick={() => handleNavigateItem({ boxRows: 4, boxType: 3, boxSizeNumber: "1.5" })}>
                <img
                  src={cookieImg2}
                  className="img-fluid"
                />
              </div>
            </div>

          </div>
          {/* <div dir="ltr">
            <Carousel
              showIndicators={false}
              showThumbs={true}
              showStatus={false}
              centerMode={true}
              swipeable={true}
              autoPlay={false}
              onChange={handleOnChange}
              selectedItem={currentItem}
              className="noselect"
            >
              {carouselData?.map((item, index) => (
                <ChoosingBoxCarouselItem
                  key={item?.id}
                  index={index}
                  boxSize={item?.boxSize}
                  boxSizeNumber={item?.boxSizeNumber}
                  pastryCount={item?.pastryCount}
                  boxRows={item?.boxRows}
                  boxType={item?.boxType}
                />
              ))}
            </Carousel>
          </div> */}
          <br />

          {/* CAROUSEL CUREVED INDICATOR */}

        </>
      )}
    </div>
  );
};

const ChooseBoxCarouselWrapper = () => {
  return (
    <CarouselContextProvider>
      <ChooseBoxCarousel />
    </CarouselContextProvider>
  );
};

export default ChooseBoxCarouselWrapper;


{/* <div style={{ height: "175px" }}>
<div
  style={{
    position: "relative",
    overflow: "visible",
  }}
>
  {/* CURVED LINE 
  <svg
    style={{
      width: "100%",
    }}
    // width="271"
    viewBox="0 0 271 45"
    // height="45"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1C19.0809 15.3333 71.4049 44 136.054 44C200.702 44 252.288 15.3333 270 1"
      stroke="##C364287A"
    />
  </svg>
  {/* CUTTER LINES 
  <div
    style={{
      width: "5px",
      height: "100%",
      backgroundColor: "#fff",
      position: "absolute",
      top: "0",
      left: "30%",
    }}
  ></div>
  <div
    style={{
      width: "5px",
      height: "100%",
      backgroundColor: "#fff",
      position: "absolute",
      top: "0",
      left: "70%",
    }}
  ></div>
  {/* POINTS 
  <span
    style={{
      position: "absolute",
      width: "8px",
      height: "8px",
      background: currentItem === 2 ? "#792260" : "##C36428b3",
      top: "0",
      right: "0",
      borderRadius: "50%",
    }}
  ></span>
  <span
    style={{
      position: "absolute",
      width: "8px",
      height: "8px",
      background: currentItem === 0 ? "#792260" : "##C36428b3",
      top: "0",
      left: "0",
      borderRadius: "50%",
    }}
  ></span>
  <span
    style={{
      position: "absolute",
      width: "8px",
      height: "8px",
      background: currentItem === 1 ? "#792260" : "##C36428b3",
      bottom: "-3px",
      left: "calc(50% - 4px)",
      borderRadius: "50%",
    }}
  ></span>
  {/* TITLES 
  <span
    style={{
      position: "absolute",
      left: "0",
      top: "30px",
      fontWeight: currentItem === 0 ? "600" : "400",
      color: currentItem === 0 ? "#792260" : "##C36428b3",
      fontSize: currentItem === 0 ? "inherit" : "smaller",
      transition: "0.08s",
    }}
  >
    {carouselData && carouselData[0]?.boxSizeText}
  </span>
  <span
    style={{
      position: "absolute",
      fontWeight: currentItem === 1 ? "600" : "400",
      color: currentItem === 1 ? "#792260" : "##C36428b3",
      fontSize: currentItem === 1 ? "inherit" : "smaller",
      transition: "0.08s",
      bottom: "-30px",
      width: "120px",
      left: "calc(50% - 60px)",
      zIndex: "2",
      textAlign: "center",
    }}
  >
    {carouselData && carouselData[1]?.boxSizeText}
  </span>
  <span
    style={{
      position: "absolute",
      right: "0",
      top: "30px",
      fontWeight: currentItem === 2 ? "600" : "400",
      color: currentItem === 2 ? "#792260" : "##C36428b3",
      fontSize: currentItem === 2 ? "inherit" : "smaller",
      transition: "0.08s",
    }}
  >
    {carouselData && carouselData[2]?.boxSizeText}
  </span>
  {/* ********* BUTTONS ********* */}
{/* left button 
  <div
    onClick={() => {
      handleOnChange(0);
    }}
    style={{
      width: "30%",
      height: "calc(100% + 40px)",
      backgroundColor: "transparent",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "3",
      cursor: "pointer",
      overflow: "hidden",
    }}
  ></div>
  {/* center button 
  <div
    onClick={() => {
      handleOnChange(1);
    }}
    style={{
      width: "40%",
      height: "calc(100% + 40px)",
      backgroundColor: "transparent",
      position: "absolute",
      top: "0",
      left: "30%",
      zIndex: "3",
      cursor: "pointer",
      overflow: "hidden",
    }}
  ></div>
  {/* right button 
  <div
    onClick={() => {
      handleOnChange(2);
    }}
    style={{
      width: "30%",
      height: "calc(100% + 40px)",
      backgroundColor: "transparent",
      position: "absolute",
      top: "0",
      right: "0",
      zIndex: "3",
      cursor: "pointer",
      overflow: "hidden",
    }}
  ></div>
</div>
</div> */}