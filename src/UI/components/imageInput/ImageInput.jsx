import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { imgBaseUrl } from "../../../core/services/baseUrl";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsArrowCounterclockwise } from 'react-icons/bs'

export const toBase64 = (img) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject("");
  });

/////
const requiredError = "انتخاب عکس ملک الزامی میباشد .";
const useImageInput = ({ initialValue = "" }) => {
  const [imageError, setImageError] = useState();
  const imageRef = React.useRef();
  const [imageSrc, setImageSrc] = useState(
    initialValue ? imgBaseUrl + initialValue : ""
  );
  useEffect(() => {
    if (initialValue) {
      setImageSrc(imgBaseUrl + initialValue);
    }
  }, [initialValue]);
  const onImageChange = async (event, required) => {
    const file = event.target.files?.[0];
    if (file) {
      const resp = await toBase64(file);
      setImageSrc(resp);
      setImageError("");
    } else {
      setImageSrc(undefined);
      if (required) showRequiredError();
    }
  };
  const showRequiredError = () => {
    setImageError(requiredError);
  };
  const hideRequiredError = () => {
    setImageError("");
  };
  /////
  const renderer = ({
    id = "",
    label = "",
    className = "",
    required = false,
  }) => {
    return (
      <div
        className={
          className +
          " d-flex flex-column justify-content-start align-items-stretch"
        }
      >
        <span className="fs-7 fw-bold">{label}</span>
        <div className="mt-2 d-flex flex-row justify-content-start align-items-stretch">
          <label
            htmlFor={id}
            style={{ border: imageSrc ? "1px solid #CB7640" : "2px solid #CB7640", color: '#CB7640' }}
            className={
              (imageSrc ? "" : "border-2") + " btn btn-sm fs-7"
            }
          >
            {imageSrc ? (
              <>
                تغییر عکس
                <BsArrowCounterclockwise fontSize={20}/>
              </>
            ) : (
              <>
                انتخاب عکس
                <AiOutlinePlusCircle fontSize={20} />
              </>
            )}
          </label>
          <Button
            className="ms-2"
            style={{ display: imageSrc ? "inline" : "none", fontSize: '12px' }}
            variant="danger"
            size="sm"
            onClick={() => {
              setImageSrc("");
              imageRef.current.value = "";
              if (required) showRequiredError();
            }}
          >
            پاک کردن تصویر
          </Button>
        </div>
        <div
          style={{ height: "1rem", color: "red", fontSize: "0.8rem" }}
          className="error mt-1"
        >
          {imageError ?? ""}
        </div>
        <input
          id={id}
          type="file"
          ref={imageRef}
          onChange={(e) => {
            onImageChange(e, required);
          }}
          className="d-none"
          accept="image/*"
        />
        <img
          src={imageSrc ?? ""}
          className="mt-3"
          style={{
            maxHeight: "30vh",
            maxWidth: "100%",
            display: imageSrc ? "inline" : "none",
          }}
        />
      </div>
    );
  };
  ///
  return {
    imageError,
    imageSrc,
    onImageChange,
    imageRef,
    renderer,
    showRequiredError,
    hideRequiredError,
  };
};

export default useImageInput;
