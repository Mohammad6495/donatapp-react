import React, { useState } from "react";
import defImg from "../../../../../../assets/images/carousel-cake.png";
import { imgBaseUrl } from "../../../../../../core/services/baseUrl";
import { formatNumber } from "../../../../../../core/utility/helperFunctions";
import CakeItemBadge from "./../../../../CheckoutCart/components/CakeItem/components/CakeItemBadge";

import "./styles/RefrigeratorCakeDetailCarouselItem.scss";

const RefrigeratorCakeDetailCarouselItem = ({
  image,
  title,
  sizeDescription,
  description,
  materials,
  tags,
  sendFree,
  price,
  exactWeight,
  code,
  canWriteOnCake,
  handleCakeTextChange,
}) => {
  const [textAreaIsOpen, setTextAreaOpen] = useState(false);
  const [textAreaText, setTextAreaText] = useState("");
  // const imageRef
  const handleOpenTextArea = () => {
    setTextAreaOpen(!textAreaIsOpen);
  };

  const handleTypingTextArea = (e) => {
    setTextAreaText(e?.target?.value);
    handleCakeTextChange(e);
  };

  return (
    <div className="w-100">
      <div className="image-holder d-flex justify-content-center align-items-center">
        <img
          style={{ maxHeight: "350px" }}
          className="w-100"
          // src={defImg}
          // src={imgBaseUrl + image}
          src={image}
          onError={(e) => {
            e.currentTarget.src = defImg;
          }}
          alt="NO_PIC"
        />
      </div>
      <div className="d-flex justify-content-start align-items-center px-2">
        <span className="fw-bold mt-4 mb-2 text-caro-primary">{title}</span>
      </div>
      {/* ********** توضیحات ********** */}
      <div className="d-flex flex-column justify-content-center align-items-start px-2">
        <span className="fs-8">توضیحات : </span>
        <div className="fs-7 text-justify">
          <div dangerouslySetInnerHTML={{ __html: sizeDescription }} />
          <br />
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
      {/* ********** وزن  ********** */}
      <div className=" my-2 d-flex flex-column justify-content-center align-items-start">
        <span className="text-caro-primary fs-8 mb-1"> وزن : </span>
        {`${exactWeight} کیلوگرم`}
      </div>
      {/* ********** مواد تشکبل دهنده ********** */}
      {materials && (
        <div className="d-flex flex-column justify-content-center align-items-start">
          <span className="text-caro-primary fs-8 mb-1">
            مواد تشکیل دهنده :{" "}
          </span>
          <div className="d-flex justify-content-start align-items-center gap-2 ">
            {materials?.split(",").map((it) => (
              <span>{it}</span>
            ))}
          </div>
        </div>
      )}
      {/* ********** تگ ها ********** */}
      <div className="my-2 d-flex flex-column justify-content-center align-items-start">
        <span className="text-caro-primary fs-8 mb-1">تگ ها : </span>
        <div className="d-flex justify-content-start align-items-center gap-2 ">
          {tags?.split("،").map((it) => (
            <span>{it}</span>
          ))}
        </div>
      </div>
      {/* ********** کد ********** */}
      <div className="my-2 d-flex flex-column justify-content-center align-items-start">
        <span className="text-caro-primary fs-8 mb-1">کد : </span>
        <div className="d-flex justify-content-start align-items-center gap-2 ">
          {code}
        </div>
      </div>
      {/* ********** ارسال رایگان ********** */}
      {sendFree && (
        <div className="my-3">
          <CakeItemBadge text="ارسال رایگان" badgeColor="greenChocolate" />
        </div>
      )}
      <div className=" my-2 d-flex flex-column justify-content-center align-items-start">
        <span className="text-caro-primary fs-8 mb-1"> هزینه : </span>
        {`${formatNumber(price)} تومان`}
      </div>

      {/* ********** نوشته‌ی روی کیک ********** */}
      <div
        style={{
          width: "100%",
          height: "180px",
        }}
      >
        {canWriteOnCake && (
          <div className="d-flex flex-column mb-2 mt-3">
            <div className="d-flex align-items-center w-100">
              <span
                className={`text-area-btn ${
                  textAreaIsOpen === true ? "is-open" : "is-close"
                }`}
                onClick={handleOpenTextArea}
              />
              <span className="fs-8 ms-1">
                آیا می خواهید با متن دلخواه ٬ کیک را سفارش دهید؟
              </span>
            </div>
            {textAreaIsOpen && (
              <div className={`text-area-holder mt-2 w-100 `}>
                <form className="m-0 p-0">
                  <textarea
                    className="p-2"
                    onChange={handleTypingTextArea}
                    id="tomorrow-cake-text-area"
                  />
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefrigeratorCakeDetailCarouselItem;
