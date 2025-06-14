import React, { useState } from "react";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import { useAuthContext } from "../../../../core/contexts/AuthContext/AuthContext";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { imgBaseUrl } from "../../../../core/services/baseUrl";
////
const RefrigeratorCakeCarouseltem = ({
  cake,
  handleTypingTextArea,
  // sendingTime,
  // handleChangeInput,
  textAreaText,
  // onAddedToFavorites,
  // onRemovedFromFavorites,
  // isInFavorites,
}) => {
  const { userToken } = useAuthContext();

  const {
    id,
    image,
    title,
    sizeDescription,
    description,
    materials,
    tags,
    sendFree,
    price,
    canWriteOnCake,
    textLength,
  } = cake;
  //////////////////
  const [userTextLength, setUserTextLength] = useState(0);
  const [textAreaIsOpen, setTextAreaOpen] = useState(false);
  const handleOpenTextArea = () => {
    setTextAreaOpen((o) => !o);
  };
  //////////////////
  const [imageNotLoaded, setImageNotLoaded] = useState(false);
  const onImageNotLoaded = () => {
    setImageNotLoaded(true);
  };
  //////////////////
  return (
    <div dir="ltr" className="w-100 bg-white p-3 pt-0">
      <div dir="rtl" className="w-100 ">
        <div className="image-holder d-flex justify-content-center align-items-center rounded" style={{ border: '2px solid #CB7640'}}>
          {/* <img
            style={{ maxHeight: "350px" }}
            className="w-100"
            src={image}
            alt="NO_PIC"
          /> */}
          <img
            alt="NO_PIC"
            className={(imageNotLoaded ? "d-none" : "") + " rounded "}
            onError={onImageNotLoaded}
            src={imgBaseUrl +  image}
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "45vh",
            }}
          />
          <span
            id={"img_" + id}
            className={(!imageNotLoaded ? "d-none" : "") + " "}
          >
            <ImageNotSupportedIcon
              htmlColor="#CB764073"
              sx={{
                fontSize: "50vw",
                maxWidth: "300px",
                maxHeight: "300px",
              }}
            />
          </span>
        </div>
        <div className="d-flex border-caro rounded border-caro justify-content-center align-items-center w-100 mb-3 mt-3 " style={{ backgroundColor: '#F5F5F5'}}>
          <span className="fw-bold p-3 text-caro-primary">{title}</span>
        </div>
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
        {tags && (
          <div className="my-2 d-flex align-items-center gap-2 p-2 rounded " style={{ backgroundColor: '#F5F5F5'}}>
            <span className="fs-7 caro-color" style={{ minWidth: "120px" }}>مواد تشکیل دهنده : </span>
            <div className="d-flex justify-content-center align-items-center gap-2 caro-color  p-1 w-100 rounded-1" style={{ backgroundColor: '#EAEAEA'}}>
              {tags?.split("،").map((it) => (
                <span>{it}</span>
              ))}
            </div>
          </div>
        )}
        {/* ********** ارسال رایگان ********** */}
        {sendFree && (
          <div className="my-3">
            <CakeItemBadge text="ارسال رایگان" badgeColor="greenChocolate" />
          </div>
        )}

        {/* ********** مواد تشکبل دهنده ********** */}
        {/* ********** هزینه بیعانه  ********** */}
        <div className=" my-3 d-flex align-items-center gap-2 p-2 rounded"  style={{ backgroundColor: '#F5F5F5'}}>
          <span className="fs-7 caro-color" style={{ minWidth: "50px" }}> هزینه : </span>
          <div className=" p-1 w-100 text-center rounded-1 caro-color" style={{ backgroundColor: '#EAEAEA'}}>
            {`${formatNumber(price)} تومان`}
          </div>
        </div>
        {/* ...................... */}
        {/* ********** نوشته‌ی روی کیک ********** */}
        {
          <>
            {canWriteOnCake && (
              <div className="d-flex flex-column mb-2 mt-3">
                <div className="d-flex w-100">
                  <span
                    className={`text-area-btn ${textAreaIsOpen === true ? "is-open" : "is-close"
                      }`}
                    onClick={handleOpenTextArea}
                  />
                  <span className="fs-8 ms-1">
                    آیا می خواهید با متن دلخواه ٬ کیک را سفارش دهید؟
                  </span>
                </div>
                <div
                  className="text-area-holder mt-2 w-100 "
                // className={`text-area-holder mt-2 w-100 d-block ${
                //   textAreaIsOpen === true
                //     ? "text-area-is-open"
                //     : "text-area-is-closed"
                // }`}
                >
                  <form className="m-0 p-0">
                    <textarea
                      style={{
                        border: `1px solid ${textAreaIsOpen ? "rgba(151, 48, 121, 0.4)" : "#dfdfdf"
                          }`,
                      }}
                      disabled={!textAreaIsOpen}
                      className="p-2"
                      onChange={(e) => {
                        handleTypingTextArea(`cake_${id}`, e);
                        setUserTextLength(e.target.value.length);
                      }}
                      id={"tomorrow-cake-text-area-" + id}
                      value={textAreaText[`cake_${id}`]}
                      maxlength={textLength ?? 100}
                    />

                    <small>
                      {userTextLength}/{textLength}
                    </small>
                  </form>
                </div>
              </div>
            )}
          </>
        }
        {/* ********** توضیحات ********** */}
        <div className="d-flex flex-column justify-content-center align-items-start pt-2">
          <span className="fs-6">توضیحات : </span>
          <div className="fs-8 pt-1 text-justify">
            <div dangerouslySetInnerHTML={{ __html: sizeDescription }} />
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefrigeratorCakeCarouseltem;
