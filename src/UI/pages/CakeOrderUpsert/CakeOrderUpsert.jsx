import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { BiSolidMicrophone } from "react-icons/bi";
import { FaStopCircle } from "react-icons/fa";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import SelectSendTime from "./components/SelectSendTime";
import {
  refrigeratorCake_apiCalls,
  cakeOrder_apiCaller,
  tomorrowCake_apiCalls,
} from "../../../core/services/agent";
import { RxReload } from "react-icons/rx";

import { apiCaller } from "../../../core/custom-hooks/useApi";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {
  Box,
  Tab,
  Tabs,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import CheckTabInfo from "../CheckoutCart/components/CkeckTabCheckBox";
import { TiDelete } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";
import useImageInput from "../../components/imageInput/ImageInput";

import "./styles.scss";
import SelectListProductsCake from "./components/SelectListProductsCake";
import FreeSlider from "../../components/freeSlider/freeSlider.component";
import { toast } from "react-toastify";
import moment from "jalali-moment";
import { useNavigate } from "react-router";
import { AiOutlineInfoCircle, AiOutlinePlusSquare } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { BsPlusSquare } from "react-icons/bs";
import { useCakeOrderContext } from "../../../core/contexts/CakeOrderContext/CakeOrderContext";
import { formatPrice } from "../../../core/utility/utils";
import dayere from "../../../assets/images/shapes/Draw-circle-2.jpg";
import moraba from "../../../assets/images/shapes/download.png";
import mosalas from "../../../assets/images/shapes/ezgif-3-55f1f1c2fa.png";
const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("نام الزامی است"),
  //   email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});
CheckTabInfo.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
export const toEnglishDigit = function (str) {
  let newStr = str;
  for (let i = 0; i < 10; i++) {
    newStr = newStr
      .replace(persianNumbers[i], i.toLocaleString("en-US"))
      .replace(arabicNumbers[i], i.toLocaleString("en-US"));
  }
  return newStr;
};

const CakeOrderUpsert = () => {
  const { handleOpen, handleClose } = useLoadingContext();
  const { setCakeOrderData, handleGoNext } = useCakeOrderContext();

  const initialValues = {
    name: "",
    email: "",
  };

  const [isEdible, setIsEdible] = useState(true);
  const [isNonEdible, setIsNonEdible] = useState(false);
  const [text, setText] = useState();
  const [descriptionText, setdescriptionText] = useState();
  const [cakeSelectId, setCakeSelectId] = useState();
  const [cakeSelecModaltId, setCakeSelectModalId] = useState();
  const [cakeSelectPopularId, setCakeSelectPopularId] = useState();
  const [cakeSelectSpecialId, setCakeSelectSpecialId] = useState();
  const [cakeSelectSpecialModalId, setCakeSelectSpecialModalId] = useState();
  const [cakeSelecPopularModaltId, setCakeSelectPopularModalId] = useState();
  const [cakeSelecPrintCakeModaltId, setCakeSelectPrintCakeModalId] =
    useState();
  const [cakeSelectData, setCakeSelectData] = useState();
  const [cakeSelectPopularData, setCakeSelectPopularData] = useState();
  const [cakeSelectSpecialData, setCakeSelectSpecialData] = useState();
  const [cakeSelectPrintId, setCakeSelectPrintId] = useState();
  const [cakeSelectPrintCakeData, setCakeSelectPrintCakeData] = useState();
  const [SelectWeight, setSelectWeight] = useState();
  const [typeOrder, setTypeOrder] = useState(0);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [openRecorder, setOpenRecorder] = useState(false);

  const handleToggleOpenVoiceRecoder = () => {
    setOpenRecorder(!openRecorder);
  };
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const audioChunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.push(e.data);
          }
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
          setAudioBlob(audioBlob);
        };

        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);

        setTimeout(() => {
          recorder.stop();
          setRecording(false);
          setMediaRecorder(null);
        }, 1000 * 60);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const cancelRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    setRecording(false);
    setMediaRecorder(null);
  };

  const cancelRecordingAgain = () => {
    setRecording(false);
    setMediaRecorder(null);
    setAudioBlob(null);
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setRecording(false);
        setMediaRecorder(null);
      }
    };
  }, [mediaRecorder]);

  const handleSetSelectId = (id) => {
    if (cakeSelecModaltId == id) {
      setCakeSelectModalId(undefined);
    } else {
      setCakeSelectModalId(id);
    }
  };
  const handleSetSelectPopularId = (id) => {
    if (cakeSelecPopularModaltId == id) {
      setCakeSelectPopularModalId(undefined);
    } else {
      setCakeSelectPopularModalId(id);
    }
  };
  const handleSetSelectPrintId = (id) => {
    if (cakeSelecPrintCakeModaltId == id) {
      setCakeSelectPrintCakeModalId(undefined);
    } else {
      setCakeSelectPrintCakeModalId(id);
    }
  };

  const handleSetSelectSpecialId = (id) => {
    if (cakeSelectSpecialModalId == id) {
      setCakeSelectSpecialModalId(undefined);
    } else {
      setCakeSelectSpecialModalId(id);
    }
  };

  useEffect(() => {
    if (cakeSelectId) {
      const findSelectIdCake = allCakes?.find((a) => a?.id == cakeSelectId);
      setCakeSelectData(findSelectIdCake);
    }
  }, [cakeSelectId]);
  useEffect(() => {
    if (cakeSelectPopularId) {
      const findSelectIdCake = allCakesPopular?.find(
        (a) => a?.id == cakeSelectPopularId
      );
      setCakeSelectPopularData(findSelectIdCake);
    }
  }, [cakeSelectPopularId]);
  useEffect(() => {
    if (cakeSelectSpecialId) {
      const findSelectIdCake = allCakesSpicial?.find(
        (a) => a?.id == cakeSelectSpecialId
      );
      setCakeSelectSpecialData(findSelectIdCake);
    }
  }, [cakeSelectSpecialId]);

  useEffect(() => {
    if (cakeSelectPrintId) {
      const findSelectIdCake = allCakesPrintType?.find(
        (a) => a?.id == cakeSelectPrintId
      );
      setCakeSelectPrintCakeData(findSelectIdCake);
    }
  }, [cakeSelectPrintId]);

  const handleEdibaleChange = (e) => {
    setIsEdible(e.target.checked);
    setIsNonEdible(false);
  };

  const handleNonEdibaleChange = (e) => {
    setIsNonEdible(e.target.checked);
    setIsEdible(false);
  };

  const [isMiniType, setIsMiniType] = useState(true);
  const [isHomeType, setIsHomeType] = useState(false);
  const [isMidleType, setIsMidleType] = useState(false);
  const [isFantezi, setIsFantezi] = useState(false);
  const [isErtefa, setIsErtefa] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState();

  const handleSetDateTimeForm = (selectData) => {
    setSelectedDateEvents(selectData);
  };

  //ImageINput
  const {
    imageRef: printImageInputRef,
    renderer: printImageInputRenderer,
    imageSrc: printImageSrc,
  } = useImageInput({ initialValue: "" });
  const {
    imageRef: modelImageInputRef,
    renderer: modelImageInputRenderer,
    imageSrc: specialImage,
  } = useImageInput({ initialValue: "" });
  //ListCakeFetch
  const [allCakes, setAllCakes] = useState([]);
  const [allCakesPopular, setAllCakesPopular] = useState([]);
  const [allCakesPrintType, setAllCakesPrintType] = useState([]);
  const [allCakesFilter, setAllCakesFilter] = useState([]);
  const [allCakesSpicial, setAllCakesSpicial] = useState([]);
  const [allCakesSpicialFilter, setAllCakesSpicialFilter] = useState([]);

  const getAllTypes = () => {
    apiCaller({
      api: cakeOrder_apiCaller.apiCall_getTypes,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data.status == 1) {
          setAllCakesPrintType(resp?.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  const getAllCakesSpicial = () => {
    apiCaller({
      api: tomorrowCake_apiCalls?.apiCall_getAllTomorrowCake,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data.status == 1) {
          setAllCakes(resp?.data?.data);
        }
      },
      onErrorMessage: "عملیات دریافت لیست کیک با طا مواجهه شد",
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  const handleAllCakePopularApi = () => {
    apiCaller({
      api: cakeOrder_apiCaller.apiCall_getOrder,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data.status == 1) {
          setAllCakesPopular(resp?.data?.data);
        }
      },
      onErrorMessage: "عملیات دریافت لیست کیک با طا مواجهه شد",
    });
  };

  const [setting, setSetting] = useState();
  const handleGetSetting = () => {
    apiCaller({
      api: cakeOrder_apiCaller?.apiCall_getSetting,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data.status == 1) {
          setSetting(resp?.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllTypes();
    handleAllCakePopularApi();
    getAllCakesSpicial();
    handleGetSetting();
  }, []);

  useEffect(() => {
    if (isHomeType) {
      const filterListHomeType = allCakes?.filter((a) => a?.cakeSizeId == 1004);
      setAllCakesFilter(filterListHomeType);
    }
    if (isMiniType) {
      const filterListHomeType = allCakes?.filter((a) => a?.cakeSizeId == 1005);
      setAllCakesFilter(filterListHomeType);
    }
    if (isMidleType) {
      const filterListHomeType = allCakes?.filter((a) => a?.cakeSizeId == 1003);
      setAllCakesFilter(filterListHomeType);
    }
    if (isFantezi) {
      const filterListHomeType = allCakes?.filter((a) => a?.cakeSizeId == 1008);
      setAllCakesFilter(filterListHomeType);
    }
    if (isErtefa) {
      const filterListHomeType = allCakes?.filter((a) => a?.cakeSizeId == 1007);
      setAllCakesFilter(filterListHomeType);
    }
  }, [allCakes, isHomeType, isMiniType, isMidleType, isErtefa, isFantezi]);
  useEffect(() => {
    if (isHomeType) {
      const filterListHomeType = allCakesSpicial?.filter(
        (a) => a?.cakeSizeId == 1004
      );
      setAllCakesSpicialFilter(filterListHomeType);
    }
    if (isMiniType) {
      const filterListHomeType = allCakesSpicial?.filter(
        (a) => a?.cakeSizeId == 1005
      );
      setAllCakesSpicialFilter(filterListHomeType);
    }
    if (isMidleType) {
      const filterListHomeType = allCakesSpicial?.filter(
        (a) => a?.cakeSizeId == 1003
      );
      setAllCakesSpicialFilter(filterListHomeType);
    }
    if (isFantezi) {
      const filterListHomeType = allCakesSpicial?.filter(
        (a) => a?.cakeSizeId == 1008
      );
      setAllCakesSpicialFilter(filterListHomeType);
    }
    if (isErtefa) {
      const filterListHomeType = allCakesSpicial?.filter(
        (a) => a?.cakeSizeId == 1007
      );
      setAllCakesSpicialFilter(filterListHomeType);
    }
  }, [
    allCakesSpicial,
    isHomeType,
    isMiniType,
    isMidleType,
    isErtefa,
    isFantezi,
  ]);

  /////////////////////
  const [sendingTime, setSendingTime] = useState();
  const handleChangeInput = (event) => {
    setSendingTime(event.target.value);
  };

  const [valueModel, setValueMode] = useState(0);

  const handleChangeModel = (event, newValue) => {
    setValueMode(newValue);
  };

  const handleChangeWeight = (newValue) => {
    setSelectWeight(newValue);
  };

  ///ModalHandle
  const [showModalCakes, setShowModalCakes] = useState(false);
  const [showModalCakesPopular, setShowModalCakesPopular] = useState(false);
  const [showModalCakesSpecial, setShowModalCakesSpecial] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showModalPrintCake, setShowModalPrintCake] = useState(false);

  const handleSetSelectWhitModalId = () => {
    if (cakeSelecModaltId) {
      setCakeSelectId(cakeSelecModaltId);
      setCakeSelectPopularData(undefined);
      setCakeSelectPopularId(undefined);
      setCakeSelectSpecialData(undefined);
      setCakeSelectPrintId(undefined);
      setCakeSelectPrintCakeData(undefined);
      setShowModalCakes(false);
    }
  };

  const handleSetSelectPopularWhitModalId = () => {
    if (cakeSelecPopularModaltId) {
      setCakeSelectPopularId(cakeSelecPopularModaltId);
      setCakeSelectData(undefined);
      setCakeSelectId(undefined);
      setCakeSelectSpecialData(undefined);
      setCakeSelectPrintId(undefined);
      setCakeSelectPrintCakeData(undefined);
      setShowModalCakesPopular(false);
    }
  };

  const handleSetSelectPrintWhitModalId = () => {
    if (cakeSelecPrintCakeModaltId) {
      setCakeSelectPrintId(cakeSelecPrintCakeModaltId);
      setCakeSelectData(undefined);
      setCakeSelectId(undefined);
      setCakeSelectSpecialData(undefined);
      setShowModalPrintCake(false);
    }
  };

  const handleSetSelectSpecialWhitModalId = () => {
    if (cakeSelectSpecialModalId) {
      setCakeSelectSpecialId(cakeSelectSpecialModalId);
      setCakeSelectData(undefined);
      setCakeSelectPrintId(undefined);
      setCakeSelectPrintCakeData(undefined);
      setCakeSelectPopularData(undefined);
      setShowModalCakesSpecial(false);
    }
  };

  const navigate = useNavigate();
  const handleSendRecording = async () => {
    if (audioBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.addEventListener(
        "loadend",
        () => {
          if (typeof reader.result === "string") {
            handleToggleOpenVoiceRecoder();
          }
        },
        { once: true }
      );
    }
  };

  const HandleSubmitApi = () => {
    if (sendingTime) {
      if (SelectWeight?.target?.value !== null) {
        if (typeOrder == 0) {
          if (!cakeSelectData && !cakeSelectId) {
            toast.error("لطفا کیک آلبوم ویترینی خود را انتخاب نمایید");
            return false;
          }
        }
        if (typeOrder == 3) {
          if (!modelImageInputRef?.current?.files[0]) {
            toast.error("لطفا عکس مورد نظر را آپلود کنید ");
            return false;
          }
        }
        if (typeOrder == 1) {
          if (!cakeSelectPopularId) {
            toast.error("لطفا کیک مورد نظر خود را انتخاب نمایید");
            return false;
          }
        }
        if (typeOrder == 2) {
          if (!printImageInputRef?.current?.files[0]) {
            toast.error("لطفا عکس مورد خود را آپلود کنید");
            return false;
          }
          if (!cakeSelectPrintId) {
            toast.error("لطفا شکل کیک را انتخاب کنید");
            return false;
          }
        }
        handleOpen();
        const b = audioBlob;
        const file = new File([b], Date.now() + "voice.mp3", {
          lastModified: new Date().getTime(),
          type: "audio/mp3",
        });

        setCakeOrderData({
          typeOrder,
          selectedDateEvents,
          sendingTime: sendingTime,
          selectWeight: SelectWeight?.target?.value,
          cakeSelectData: cakeSelectData,
          cakeSelectPopularData,
          descriptionText: descriptionText,
          voice: file,
          printData: {
            image: printImageInputRef?.current?.files?.[0],
            imageSrc: printImageSrc,
            cakeSelectPrintCakeData,
            cakeSelectPrintId,
            isEdible,
            isNonEdible,
          },
          specialData: {
            cakeSelectSpecialData,
            cakeSelectSpecialId,
            image: modelImageInputRef?.current?.files?.[0],
            imageSrc: specialImage,
            text: text,
          },
        });
        setTimeout(() => {
          handleClose();
          handleGoNext();
        }, 500);
      } else {
        toast.error("وزن تقریبی را انتخاب کنید");
      }
    } else {
      toast.error("ساعت تحویل را انتخاب کنید");
    }
  };

  const handleToNavigateHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (SelectWeight) {
      if (SelectWeight?.target?.value != 0) {
        setValueMode(1);
        setTypeOrder(1);
      }
      if (SelectWeight?.target?.value == 0) {
        setValueMode(0);
        setTypeOrder(0);
      }
    }
  }, [SelectWeight]);

  const handleRemoveSelectPrintCake = () => {
    setCakeSelectPrintCakeData(undefined);
    setCakeSelectPrintId(undefined);
    setCakeSelectPrintCakeModalId(undefined);
  };

  return (
    <div className="cake-order-container d-flex flex-column w-100">
      <div className="cake-order-form w-100">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={HandleSubmitApi}
        >
          <Form>
            <div>
              <SelectSendTime
                handleChangeInput={handleChangeInput}
                sendingTime={sendingTime}
                sendingTimeList={timeSelectedList}
                handleSetDateTimeForm={handleSetDateTimeForm}
              />
            </div>

            <div className="mt-3 mb-2">
              <label className="text-dark fs-6 mb-3 fw-bold">
                وزن تقریبی :{" "}
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  * به ازای هر نفر به طور میانگین صد گرم در نظر گرفته می شود
                </span>
              </label>
              <FormControl className="w-100" sx={{ minWidth: 80 }}>
                <InputLabel id={"sending-time-selectlist-label"}>
                  وزن
                </InputLabel>
                <Select
                  labelId={"sending-time-selectlist-label"}
                  id={"sending-time-selectlist"}
                  onChange={handleChangeWeight}
                  value={SelectWeight}
                  label="وزن"
                >
                  {weightSelectedList.map((it) => (
                    <MenuItem value={it.id} key={it.id}>
                      {it.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {SelectWeight && (
              <>
                {SelectWeight?.target?.value != 0 && (
                  <Alert severity="warning" style={{ textAlign: "justify" }}>
                    زمانی میتوانید کیک آلبوم ویترینی را انتخاب کنید که وزن
                    تقریبی شما کم تر از ۲ کیلو باشد
                  </Alert>
                )}
                {SelectWeight?.target?.value == 0 && (
                  <Alert severity="warning" style={{ textAlign: "justify" }}>
                    زمانی که بیشتر از ۲ کیلو وزن تقریبی را انتخاب کنید میتوانید
                    به کیک های آلبوم سفارشی و پرینتی و خاص دسترسی داشته باشدی
                  </Alert>
                )}
              </>
            )}
            {SelectWeight && (
              <>
                <div className="mt-2">
                  <label className="text-dark fs-6  fw-bold">مدل :</label>
                  <Box className="w-100" sx={{ width: "100%" }}>
                    <Box
                      className="w-100"
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                      <Tabs
                        value={valueModel}
                        onChange={handleChangeModel}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          style={{ fontSize: "13px", fontWeight: "600" }}
                          label="آلبوم ویترینی"
                          disabled={
                            SelectWeight?.target?.value == 0 ? false : true
                          }
                          onClick={() => {
                            setTypeOrder(0);
                          }}
                          {...a11yProps(0)}
                        />
                        <Tab
                          style={{ fontSize: "13px", fontWeight: "600" }}
                          disabled={
                            SelectWeight?.target?.value != 0 ? false : true
                          }
                          onClick={() => {
                            setTypeOrder(1);
                          }}
                          label="آلبوم سفارشی"
                          {...a11yProps(1)}
                        />
                        <Tab
                          style={{ fontSize: "13px", fontWeight: "600" }}
                          disabled={
                            SelectWeight?.target?.value != 0 ? false : true
                          }
                          onClick={() => {
                            setTypeOrder(2);
                          }}
                          label="پرینتی"
                          {...a11yProps(2)}
                        />
                        <Tab
                          style={{ fontSize: "13px", fontWeight: "600" }}
                          disabled={
                            SelectWeight?.target?.value != 0 ? false : true
                          }
                          onClick={() => {
                            setTypeOrder(3);
                          }}
                          label="خاص"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </Box>
                    <div
                      role="tabpanel2"
                      hidden={valueModel !== 0}
                      id={`simple-tabpanel2-${0}`}
                      aria-labelledby={`simple-tab2-${0}`}
                    >
                      <div className="d-flex flex-column w-100 mt-3">
                        <span className="text-muted fs-8">
                          * کاربر عزیر در این قسمت میتوانید کیک های آلبوم
                          ویترینی دونات را انتخاب نمایید
                        </span>
                        {cakeSelectId ? (
                          <div className="d-flex flex-column mb-3 mt-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fs-8 fw-bold">انتخاب شده :</span>
                              <Button
                                onClick={() => setShowModalCakes(true)}
                                variant="contained"
                                size="small"
                                color="primary"
                              >
                                تغییر کیک
                              </Button>
                            </div>
                            <div
                              className="d-flex p-2 rounded position-relative"
                              style={{ border: "1px solid #CB7640" }}
                            >
                              <div
                                className=" p-0"
                                style={{
                                  position: "absolute",
                                  left: "5px",
                                  top: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setCakeSelectId(undefined);
                                  setCakeSelectModalId(undefined);
                                }}
                              >
                                <TiDelete fontSize={25} color="red" />
                              </div>
                              <img
                                className="rounded"
                                style={{ width: "90px" }}
                                src={cakeSelectData?.image}
                              />
                              <div className="ms-2 d-flex flex-column">
                                <span className="fs-6 fw-bold">
                                  {cakeSelectData?.title}
                                </span>
                                <span className="fs-7">
                                  حداقل وزن : {cakeSelectData?.minWeight} گرم
                                </span>
                                <span className="fs-7">
                                  حداکثر وزن : {cakeSelectData?.maxWeight} گرم
                                </span>
                                <span className="fs-7">
                                  قیمت هرکیلو گرم :{" "}
                                  {formatPrice(cakeSelectData?.pricePerKG)}{" "}
                                  تومان
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex flex-column mb-3 mt-3">
                            <div
                              onClick={() => setShowModalCakes(!showModalCakes)}
                              className="d-flex align-items-center p-2 rounded position-relative"
                              style={{
                                border: "1px solid #CB7640",
                                cursor: "pointer",
                              }}
                            >
                              <AiOutlinePlusSquare
                                fontSize={90}
                                color="#CB7640"
                              />
                              <span className="fs-7 ms-2">
                                کاربر عزیر برای انتحاب مدل کیک خود کلیک کنید
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      role="tabpanel2"
                      hidden={valueModel !== 1}
                      id={`simple-tabpanel2-${1}`}
                      aria-labelledby={`simple-tab2-${1}`}
                    >
                      <div className="d-flex flex-column mt-3">
                        <span className="text-muted fs-8">
                          * کاربر عزیر در این قسمت میتوانید کیک هایی که آلبوم
                          سفارشی هستند را انتخاب کنید
                        </span>
                        <div className="d-flex flex-column w-100 mt-3">
                          {cakeSelectPopularId ? (
                            <div className="d-flex flex-column mb-3">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="fs-8 fw-bold">
                                  انتخاب شده :
                                </span>
                                <Button
                                  onClick={() => setShowModalCakesPopular(true)}
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                >
                                  تغییر کیک
                                </Button>
                              </div>
                              <div
                                className="d-flex p-2 rounded position-relative"
                                style={{ border: "1px solid #CB7640" }}
                              >
                                <div
                                  className=" p-0"
                                  style={{
                                    position: "absolute",
                                    left: "5px",
                                    top: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setCakeSelectPopularId(undefined);
                                    setCakeSelectPopularModalId(undefined);
                                  }}
                                >
                                  <TiDelete fontSize={25} color="red" />
                                </div>
                                <img
                                  className="rounded"
                                  style={{ width: "90px" }}
                                  src={cakeSelectPopularData?.image}
                                />
                                <div className="ms-2 d-flex flex-column">
                                  <span className="fs-6 fw-bold">
                                    {cakeSelectPopularData?.title}
                                  </span>
                                  <span className="fs-7">
                                    حداقل وزن :{" "}
                                    {cakeSelectPopularData?.minWeight} گرم
                                  </span>
                                  <span className="fs-7">
                                    حداکثر وزن :{" "}
                                    {cakeSelectPopularData?.maxWeight} گرم
                                  </span>
                                  <span className="fs-7">
                                    قیمت هرکیلو گرم :{" "}
                                    {formatPrice(
                                      cakeSelectPopularData?.pricePerKG
                                    )}{" "}
                                    تومان
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex flex-column mb-3">
                              <div
                                onClick={() =>
                                  setShowModalCakesPopular(
                                    !showModalCakesPopular
                                  )
                                }
                                className="d-flex align-items-center p-2 rounded position-relative"
                                style={{
                                  border: "1px solid #CB7640",
                                  cursor: "pointer",
                                }}
                              >
                                <AiOutlinePlusSquare
                                  fontSize={90}
                                  color="#CB7640"
                                />
                                <span className="fs-7 ms-2">
                                  کاربر عزیر برای انتحاب مدل کیک خود کلیک کنید
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      role="tabpanel2"
                      hidden={valueModel !== 2}
                      id={`simple-tabpanel2-${2}`}
                      aria-labelledby={`simple-tab2-${2}`}
                    >
                      <div className=" d-flex flex-column align-items-start mt-3 w-100">
                        <span className="text-muted fs-8">
                          * برای چاپ عکس مورد نظر روی کیک میتوانید عکس خود را
                          آپلود کنید
                        </span>
                        {printImageInputRenderer({
                          id: "printImageRef",
                          className: "mt-1 w-100",
                          required: false,
                        })}
                        <div className="mb-3 mt-3 d-flex flex-column align-items-center w-100">
                          <span className="text-muted fs-8">
                            * یا میتوانید شکل کیک خود را انتخاب نمایید
                          </span>
                          <Button
                            onClick={() =>
                              setShowModalPrintCake(!showModalPrintCake)
                            }
                            className="mt-3 w-100"
                            variant="contained"
                            color="primary"
                          >
                            {cakeSelectPrintCakeData ? (
                              <>
                                <span className="me-2">تغییر شکل</span>
                                <RxReload fontSize={20} />
                              </>
                            ) : (
                              <>
                                <span className="me-2">انتخاب شکل کیک</span>
                                <BsPlusSquare fontSize={20} />
                              </>
                            )}
                          </Button>
                          {cakeSelectPrintCakeData && (
                            <div
                              className="w-50 mb-2 mt-4 p-2 rounded position-relative"
                              style={{ border: "1px solid" }}
                            >
                              <IconButton
                                onClick={handleRemoveSelectPrintCake}
                                style={{
                                  position: "absolute",
                                  left: "-18px",
                                  top: "-20px",
                                }}
                              >
                                <IoIosCloseCircle fontSize={28} color="red" />
                              </IconButton>
                              <img
                                src={cakeSelectPrintCakeData?.image}
                                className="img-fluid rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className=" mt-1 d-flex">
                          <div className=" d-flex align-items-start">
                            <Checkbox
                              id="isWeightConfectionar"
                              onChange={handleEdibaleChange}
                              checked={isEdible}
                              className="p-0"
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                            />
                            <label
                              className="fs-7 ms-1 d-flex flex-column"
                              htmlFor="Iscolleague"
                            >
                              <span>خوراکی</span>{" "}
                              <span className="text-danger">
                                (شامل هزینه چاپ)
                              </span>
                            </label>
                          </div>
                          <div className="ms-3 d-flex align-items-start">
                            <Checkbox
                              id="isWeightConfectionar"
                              onChange={handleNonEdibaleChange}
                              checked={isNonEdible}
                              className="p-0"
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                            />
                            <label
                              className="fs-7 ms-1 d-flex flex-column"
                              htmlFor="Iscolleague"
                            >
                              <span>غیر خوراکی</span>{" "}
                              <span className="text-danger">(بدون هزینه)</span>
                            </label>
                          </div>
                        </div>
                        <div className="mt-2">
                          {!isNonEdible && (
                            <span className="text-danger fs-7">
                              هزینه خوراکی :{" "}
                              {formatPrice(setting.cakeOrderNonKhoraki)} تومان
                            </span>
                          )}
                        </div>
                        <div className="w-100 mt-3">
                          <label className="mb-2 fs-7" htmlFor="hackName-input">
                            متن روی عکس چاپی :
                          </label>
                          <textarea
                            id="hackName-input"
                            className="form-control order-input"
                            style={{ resize: "none" }}
                            onChange={(e) => setText(e?.target?.value)}
                            rows={4}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div
                      role="tabpanel2"
                      hidden={valueModel !== 3}
                      id={`simple-tabpanel2-${4}`}
                      aria-labelledby={`simple-tab2-${3}`}
                    >
                      <div className="d-flex flex-column mt-3">
                        <Alert
                          severity="warning"
                          className="mb-2"
                          style={{ textAlign: "justify" }}
                        >
                          قیمت خامه ای: {formatPrice(setting?.cakeOrderKhameyi)}{" "}
                          و قیمت فوندانت{" "}
                          {formatPrice(setting?.cakeOrderFontant)}
                        </Alert>
                        <span className="text-muted fs-8">
                          * اگر میخواهید طبق سفارش خود مدل کیک را تغییر دهید
                          لطفا عکس کیک مورد نظر را آپلود کنید
                        </span>
                        {modelImageInputRenderer({
                          id: "modelImageRef",
                          className: "mt-1",
                          required: false,
                        })}
                      </div>
                    </div>
                  </Box>
                </div>
                <div className=" my-3">
                  <div>
                    <label className="mb-2 fs-7" htmlFor="hackName-input">
                      توضیحات :
                    </label>
                    <textarea
                      id="hackName-input"
                      className="form-control order-input"
                      style={{ resize: "none" }}
                      onChange={(e) => setdescriptionText(e?.target?.value)}
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
            <div className="mt-2 d-flex flex-column">
              <span className="text-muted mb-2" style={{ fontSize: "12px" }}>
                * میتوانید به صورت خلاصه توضیحات خود را ضبط کنید و برای ما
                بفرستید
              </span>
              {audioBlob ? (
                <Button
                  onClick={cancelRecordingAgain}
                  variant="contained"
                  color="error"
                >
                  ضبط دوباره
                </Button>
              ) : (
                <Button
                  onClick={handleToggleOpenVoiceRecoder}
                  variant="contained"
                  color="info"
                >
                  ضبط صدا
                </Button>
              )}
            </div>
            <Button type="submit" variant="contained" className="mt-5 w-100">
              ادامه فرایند
            </Button>
          </Form>
        </Formik>
      </div>
      <Modal
        onHide={() => setShowModalCakes(!showModalCakes)}
        show={showModalCakes}
        centered
        className="modal-lg"
        dialogClassName="p-3"
      >
        <Modal.Header closeButton>
          <h3 className="mb-0" style={{ fontSize: "14px" }}>
            انتخاب از ویتیرن دونات
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column ">
            <div className="d-flex flex-wrap">
              <div>
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(false);
                    setIsHomeType(false);
                    setIsMiniType(true);
                    setIsMidleType(false);
                    setIsErtefa(false);
                  }}
                  checked={isMiniType}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  مینی
                </label>
              </div>

              <div className="ms-2">
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(false);
                    setIsHomeType(false);
                    setIsMiniType(false);
                    setIsMidleType(true);
                    setIsErtefa(false);
                  }}
                  checked={isMidleType}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  متوسط
                </label>
              </div>
              <div className="ms-2">
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(true);
                    setIsHomeType(false);
                    setIsMiniType(false);
                    setIsMidleType(false);
                    setIsErtefa(false);
                  }}
                  checked={isFantezi}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  فانتزی
                </label>
              </div>
            </div>
            <div
              className="select-cake-provider mt-4 d-flex flex-wrap thin-scrollbar"
              style={{ overflowY: "scroll", height: "430px" }}
            >
              {allCakesFilter?.length !== 0 ? (
                <>
                  {allCakesFilter?.map((item) => (
                    <SelectListProductsCake
                      key={item?.id}
                      handleSetSelectId={handleSetSelectId}
                      cakeSelectId={cakeSelecModaltId}
                      className="col-6 mb-2"
                      {...item}
                    />
                  ))}
                </>
              ) : (
                <div className="d-flex w-100">
                  <Alert className="w-100" severity="warning">
                    متاسفانه کیکی موجود نیست
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSetSelectWhitModalId}
            className="mt-4 w-100"
            variant="contained"
            color="primary"
          >
            انتخاب کیک
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        onHide={() => setShowModalCakesPopular(!showModalCakesPopular)}
        show={showModalCakesPopular}
        centered
        className="modal-lg"
        dialogClassName="p-3"
      >
        <Modal.Header closeButton>
          <h3 className="mb-0" style={{ fontSize: "14px" }}>
            انتخاب کیک های آلبوم سفارشی
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column ">
            <div
              className="select-cake-provider mt-2 d-flex flex-wrap thin-scrollbar"
              style={{ overflowY: "scroll", height: "430px" }}
            >
              {allCakesPopular?.length !== 0 ? (
                <>
                  {allCakesPopular?.map((item) => (
                    <SelectListProductsCake
                      key={item?.id}
                      handleSetSelectId={handleSetSelectPopularId}
                      cakeSelectId={cakeSelecPopularModaltId}
                      className="col-6"
                      {...item}
                    />
                  ))}
                </>
              ) : (
                <div className="d-flex w-100">
                  <Alert className="w-100" severity="warning">
                    متاسفانه کیکی موجود نیست
                  </Alert>
                </div>
              )}
            </div>
            <Button
              onClick={handleSetSelectPopularWhitModalId}
              className="mt-4"
              variant="contained"
              color="primary"
            >
              انتخاب کیک
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        onHide={() => setShowSubmitModal(false)}
        show={showSubmitModal}
        centered
        className="modal-lg"
        dialogClassName="p-3"
      >
        <Modal.Body>
          <div className="d-flex flex-column ">
            <div className="select-cake-provider mt-2 d-flex">
              <Alert
                severity="info"
                icon={<AiOutlineInfoCircle fontSize={35} />}
              >
                <span style={{ fontSize: "16px" }}>
                  این سفارش ثبت اولیه میباشد و اپراتور برای نهایی کردن سفارش با
                  شما تماس میگیرد
                </span>
              </Alert>
            </div>
            <Button
              onClick={handleToNavigateHomePage}
              className="mt-4"
              variant="contained"
              color="primary"
            >
              متوجه شدم!
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        onHide={() => setShowModalCakesSpecial(!showModalCakesSpecial)}
        show={showModalCakesSpecial}
        centered
        className="modal-lg"
        dialogClassName="p-3"
      >
        <Modal.Header closeButton>
          <h3 className="mb-0" style={{ fontSize: "14px" }}>
            سفارش کیک های خاص
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column ">
            <div className="d-flex flex-wrap">
              <div>
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(false);
                    setIsHomeType(false);
                    setIsMiniType(true);
                    setIsMidleType(false);
                    setIsErtefa(false);
                  }}
                  checked={isMiniType}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  مینی
                </label>
              </div>

              <div className="ms-2">
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(false);
                    setIsHomeType(false);
                    setIsMiniType(false);
                    setIsMidleType(true);
                    setIsErtefa(false);
                  }}
                  checked={isMidleType}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  متوسط
                </label>
              </div>
              <div className="ms-2">
                <Checkbox
                  id="isWeightConfectionar"
                  onChange={() => {
                    setIsFantezi(true);
                    setIsHomeType(false);
                    setIsMiniType(false);
                    setIsMidleType(false);
                    setIsErtefa(false);
                  }}
                  checked={isFantezi}
                  className="p-0"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
                <label className="fs-8 ms-1" htmlFor="Iscolleague">
                  فانتزی
                </label>
              </div>
            </div>
            <div className="select-cake-provider mt-4 d-flex">
              {allCakesSpicialFilter?.length !== 0 ? (
                <FreeSlider>
                  {allCakesSpicialFilter?.map((item) => (
                    <SelectListProductsCake
                      key={item?.id}
                      handleSetSelectId={handleSetSelectSpecialId}
                      cakeSelectId={cakeSelectSpecialModalId}
                      {...item}
                    />
                  ))}
                </FreeSlider>
              ) : (
                <div className="d-flex w-100">
                  <Alert className="w-100" severity="warning">
                    متاسفانه کیکی موجود نیست
                  </Alert>
                </div>
              )}
            </div>
            <Button
              onClick={handleSetSelectSpecialWhitModalId}
              className="mt-4"
              variant="contained"
              color="primary"
            >
              انتخاب کیک
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        onHide={() => setShowModalPrintCake(!showModalPrintCake)}
        show={showModalPrintCake}
        centered
        className="modal-lg"
        dialogClassName="p-3"
      >
        <Modal.Header closeButton>
          <h3 className="mb-0" style={{ fontSize: "14px" }}>
            شکل کیک
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column ">
            <div className="select-cake-provider mt-2 d-flex">
              {allCakesPrintType?.length !== 0 ? (
                <FreeSlider>
                  {allCakesPrintType?.map((item) => (
                    <SelectListProductsCake
                      key={item?.id}
                      handleSetSelectId={handleSetSelectPrintId}
                      cakeSelectId={cakeSelecPrintCakeModaltId}
                      {...item}
                    />
                  ))}
                </FreeSlider>
              ) : (
                <div className="d-flex w-100">
                  <Alert className="w-100" severity="warning">
                    متاسفانه کیکی موجود نیست
                  </Alert>
                </div>
              )}
            </div>
            <Button
              onClick={handleSetSelectPrintWhitModalId}
              className="mt-4"
              variant="contained"
              color="primary"
            >
              انتخاب کیک
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Dialog
        open={recording ? true : openRecorder}
        onClose={handleToggleOpenVoiceRecoder}
        maxWidth="xs"
        className="w-100"
      >
        <DialogContent>
          <div className="d-flex flex-column w-100 pt-3">
            <span>* حداکثر زمان وویس ۱ دقیقه میباشد</span>
            <div className="d-flex w-100 justify-content-center">
              {!recording ? (
                <BiSolidMicrophone fontSize={60} color="red" />
              ) : (
                <FaStopCircle fontSize={60} color="red" />
              )}
            </div>
            {recording && (
              <p className="text-center mb-0 mt-3">در حال ضبط ...</p>
            )}
            {audioBlob && (
              <div className="mt-3" dir="ltr">
                <AudioPlayer
                  customControlsSection={[
                    "MAIN_CONTROLS",
                    "ADDITIONAL_CONTROLS",
                    "VOLUME_CONTROLS",
                  ]}
                  onPause={() => setRecording(false)}
                  onStop={() => setRecording(false)}
                  src={URL.createObjectURL(audioBlob)}
                />
              </div>
            )}
            {!recording && !audioBlob && (
              <Button
                style={{
                  backgroundColor: "rgba(26, 182, 70, 1)",
                  color: "#fff",
                }}
                onClick={startRecording}
                className="mt-4 "
              >
                شروع ضبط
              </Button>
            )}
            {recording && (
              <Button
                variant="contained"
                color="secondary"
                className="mt-4 "
                onClick={cancelRecording}
              >
                پایان ضبط
              </Button>
            )}
            {audioBlob && (
              <>
                <Button
                  variant="contained"
                  color="error"
                  className="mt-4 "
                  onClick={cancelRecordingAgain}
                >
                  ضبط دوباره
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  className="mt-3 "
                  onClick={handleSendRecording}
                >
                  تایید ضبط
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CakeOrderUpsert;

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
    isActive: true,
  },
  {
    time: "11" + ":" + "30",
    id: 5,
    isActive: true,
  },
  {
    time: "12" + ":" + "00",
    id: 6,
    isActive: true,
  },
  {
    time: "12" + ":" + "30",
    id: 7,
    isActive: true,
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
    label: "کمتر از ۲ کیلو (فقط کیک های آلبوم ویترینی)",
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
