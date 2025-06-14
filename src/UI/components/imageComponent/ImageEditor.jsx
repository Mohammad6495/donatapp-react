import "./style.scss";
import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
//import Slider from "./components/Slider";
import { Slider } from "./components/Sliders";

import Button from "./components/Button";
import Navigation from "./components/Navigation";
import ResetIcon from "./icons/ResetIcon";
import AdjustableImage from "./components/AdjustableImage";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { picture_apiCaller } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import http from "../../../core/services/http";

import {
  AiFillCloseCircle,
  AiOutlineCloseCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  Alert,
  Box,
  Typography,
  Button as ButtonMui,
  IconButton,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { fakeDataNavigate } from "./utils/fakeDataNavigate";
import { useNavigate } from "react-router";

export default function App() {
  const cropperRef = useRef(null);
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const [mode, setMode] = useState("crop");
  const [finalImage, setFinalImage] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [productValue, setProductValue] = useState();
  const [viewImage, setViewImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleOpen, handleClose } = useLoadingContext();
  const { set_branchToken } = useAuthContext();

  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  });
  const onChangeValue = (value) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value,
      }));
    }
  };

  const onReset = () => {
    setMode("crop");
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0,
    });
  };

  const onUpload = (blob) => {
    onReset();
    setMode("crop");
    setSrc(blob);
  };
  const [fileImage, setfileImage] = useState("");

  const onDownload = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      canvas.toBlob((blob) => {
        const fileType = blob.type.split("/")[1];
        const fileName = `image.${fileType}`;
        const fileWithExtension = new File([blob], fileName, {
          type: `image/${fileType}`,
        });
        setfileImage(fileWithExtension);
      });
      setFinalImage(cropperRef.current.getCanvas()?.toDataURL());
    }
  };

  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const cropperEnabled = mode === "crop";

  const getProductById = (code) => {
    apiCaller({
      api: picture_apiCaller.apiCall_getByCode,
      apiArguments: Number(code),
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setProductValue(resp?.data?.data);
        }
      },
      onStart: () => {
        setIsLoading(true);
      },
      onEnd: () => {
        setIsLoading(false);
      },
      onError: () => {
        setProductValue(undefined);
        setViewImage(undefined);
      },
      // onErrorMessage: "عملیات دریافت اطلاعات با خطا مواجهه شد",
    });
  };

  const onChangeCodeValue = (e) => {
    setCodeValue(e?.target?.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getProductById(codeValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [codeValue]);

  useEffect(() => {
    if (productValue) {
      setViewImage(productValue?.image);
    }
  }, [productValue]);

  const handleSubmit = async () => {
    // const selectedImage = fileImage;

    // const compressedImage = await ImageCompressor(selectedImage, {
    //   quality: 0.6,
    // });
    //  console.log(compressedImage)
    const formData = new FormData();
    formData.append("Code", Number(codeValue));
    formData.append("ImageFile", fileImage);
    if (codeValue) {
      if (fileImage) {
        apiCaller({
          api: picture_apiCaller.apiCall_addPhoto,
          apiArguments: formData,
          onSuccessMessage: "ثبت اطلاعات با موفقیت انجام شد",
          onStart: handleOpen,
          onEnd: handleClose,
          onErrorMessage: "عملیات با خطا مواجهه شد",
          onSuccess: (resp) => {
            if (resp?.status == 200 && resp?.data?.statusCode == 200) {
              if (resp?.data?.data?.code) {
                getProductById(resp?.data?.data?.code);
              } else {
                set;
              }
            }
          },
        });
      } else {
        toast.error("عکس ویرایش شده را تایید کنید");
      }
    } else {
      toast.error("کد محصول را وارد کنید");
    }
  };

  const handleUpsertNavigate = (link) => {
    if (link) {
      window.location = link;
    }
  };

  const handleLogOutImageEditor = () => {
    set_branchToken("");
    http.removeToken(http.userBranchTokenKey);
    navigate('/branch-login')
  };

  return (
    <div className={"image-editor"}>
      <div className="mb-2 w-100 d-flex justify-content-end">
        <ButtonMui onClick={handleLogOutImageEditor} variant="contained" color="error">
          خروج
        </ButtonMui>
      </div>
      <div className="image-editor__cropper">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            overlayClassName: cn(
              "image-editor__cropper-overlay",
              !cropperEnabled && "image-editor__cropper-overlay--faded"
            ),
          }}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled,
            moveImage: cropperEnabled,
          }}
          backgroundComponent={AdjustableImage}
          backgroundProps={adjustments}
        />
        {mode !== "crop" && (
          <Slider
            className="image-editor__slider"
            value={adjustments[mode]}
            onChange={onChangeValue}
          />
        )}
        <Button
          className={cn(
            "image-editor__reset-button",
            !changed && "image-editor__reset-button--hidden"
          )}
          onClick={onReset}
        >
          <ResetIcon />
        </Button>
      </div>
      <Navigation
        mode={mode}
        onChange={setMode}
        onUpload={onUpload}
        onDownload={onDownload}
      />
      <div className="mt-3">
        <label htmlFor="code" className="mb-2 text-dark">
          کد محصول :
        </label>
        <input
          id="code"
          onChange={onChangeCodeValue}
          type="number"
          className="form-control"
        />
      </div>
      {!isLoading ? (
        <div className="d-flex align-items-center mt-3">
          <h5 className="mt-3">{productValue?.title}</h5>
          <img
            src={viewImage || ""}
            className="rounded ms-2"
            style={{ width: "100px" }}
            alt=""
          />
        </div>
      ) : (
        <div className="mt-4">لطفا صبر کنید...</div>
      )}
      {!productValue && !isLoading && (
        <>
          <Alert severity="warning">محصولی یافت نشده است!</Alert>
          <ButtonMui
            onClick={() => setShowModal(true)}
            className="w-100 mt-3"
            variant="contained"
            color="secondary"
          >
            <span className="me-1">افزودن محصول جدید</span>
            <AiOutlinePlusCircle fontSize={20} />
          </ButtonMui>
        </>
      )}
      {finalImage && (
        <div className=" mt-3">
          <img src={finalImage || ""} className="img-fluid" alt="" />
          <button
            onClick={() => {
              setFinalImage("");
              setProductValue(undefined);
              setfileImage(undefined);
            }}
            className="btn btn-danger w-100 mt-2"
          >
            حذف
          </button>
        </div>
      )}
      <hr />
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-success w-100 mt-1"
      >
        ثبت اطلاعات
      </button>
      <Modal
        onHide={() => setShowModal(!showModal)}
        show={showModal}
        className="modal-md"
        dialogClassName="p-3"
      >
        <div className="d-flex flex-column pt-5 px-3 position-relative">
          <IconButton
            style={{
              position: "absolute",
              left: "5px",
              top: "0px",
            }}
            onClick={() => setShowModal(false)}
          >
            <AiFillCloseCircle fontSize={30} color="red" />
          </IconButton>
          {fakeDataNavigate.map((item) => (
            <ButtonMui
              variant="contained"
              color="success"
              className="mb-3 w-100 py-2"
              onClick={() => handleUpsertNavigate(item?.href)}
            >
              {item?.title}
            </ButtonMui>
          ))}
        </div>
      </Modal>
    </div>
  );
}
