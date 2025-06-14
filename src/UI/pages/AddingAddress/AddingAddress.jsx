import React, { useRef, useState, useEffect } from "react";

import { Form, Formik } from "formik";
import { FomikMUITextInput } from "./../../components/formik-input/formikMuiInput.component";
import FormikMUITextArea from "./../../components/formik-textArea/formikMuiTextArea.component";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import { customerAddress_apiCalls } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "./../../../core/custom-hooks/useApi";
import { useLocation, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { useCheckProfileStatus } from "../../../core/utility/checkUserProfileStatus";
import "./styles/AddingAddress.scss";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import http from "../../../core/services/http";
import { locationSearchStringToObject, locationSearchStringToObject2 } from "../../../core/utility/utils";
import { useGetUserLocationHook } from "../../../core/utility/helperFunctions";
import { toast } from "react-toastify";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IconButton } from "@mui/material";
import OLAddressMap from "../../components/openLayerMap/AddressChooseMap";
import { useMemo } from "react";
import SearchMapPlace from "./SearchMapPlace";

const formSchema = Yup.object().shape({
  userAddress: Yup.string()
    .required("آدرس دقیق پستی الزامی است .")
    .test(
      "len",
      "تعداد کاراکترها باید کمتر از 100 باشد",
      (val) => val?.length < 100
    ),
    postalCode: Yup.string()
    .required("کد پستی الزامی است .")
});

const AddingAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Map Position state
  const { id } = useParams();
  const { checkProfileStatus } = useCheckProfileStatus();
  const { userLatLng, userHasLocation } = useGetUserLocationHook();
  const [shoButtonMap, setShowButtonMap] = useState(true)

  const { set_userToken } = useAuthContext();
  ////
  const { handleOpen, handleClose } = useLoadingContext();
  const [userAddress, setUserAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [coordinates, setCoordinates] = useState();
  const [centerPosition, setCenterPosition] = useState();
  const [returnUrl, setReturnUrl] = useState();
  const [addressError, setAddressError] = useState("");
  /////
  const [addressName, setAddressName] = useState("");
  const [addressCityName, setAddressCityName] = useState("");
  const getAddressName = (e) => {
    setShowButtonMap(true)
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getAddressName,
      apiArguments: { lat: e[0], lng: e[1] },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp?.data?.statusCode == 200) {
          if (resp?.data?.data?.city) {
            setAddressCityName(resp?.data?.data?.city);
          }
          /*
            "formatted_address": null,
            "city": null,
            "state": null,
            "route_name": null
          */
          // setAddressName(resp?.data?.data?.formatted_address);
          if (resp?.data?.data?.route_name) {
            if (
              resp?.data?.data?.formatted_address.includes(
                resp?.data?.data?.route_name
              )
            ) {
              setAddressName(resp?.data?.data?.formatted_address);
            } else {
              setAddressName(
                resp?.data?.data?.formatted_address +
                " , " +
                resp?.data?.data?.route_name
              );
            }
          } else {
            setAddressName(resp?.data?.data?.formatted_address);
          }
        }
      },
    });
  };

  // getUserPosition
  const onDestinationSelected = (e) => {
    getAddressName(e);
    setCenterPosition(e);
    setCoordinates(e);

    if (e[0] != "36.46382124745137" && e[1] != "52.85792368850813") {
      setAddressError("");
    }
  };

  // useEffect(() => {
  //   if (userLatLng?.lat && userLatLng?.lng) {
  //     console.log(userLatLng);
  //     onDestinationSelected([userLatLng?.lat, userLatLng?.long]);
  //   }
  // }, [userLatLng]);

  function handleLocateUser() {
    navigator?.geolocation?.getCurrentPosition(
      // Success
      (resp) => {
        onDestinationSelected([resp.coords.latitude, resp.coords.longitude]);
      },
      // Error
      (err) => { }
    );
  }
  // Handle Get Return Url
  const getReturnUrl = () => {
    const returnedUrl = location?.search.replace("?returnUrl=", "");
    setReturnUrl(returnedUrl);
  };

  useEffect(() => {
    getReturnUrl();
  }, [location]);

  useEffect(() => {
    if (location.pathname == "/add-address") {
      handleLocateUser();
    }
  }, []);

  // Get Customer Address Detail
  const getCustoemerAddressDetail = () => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_customerAddressDetail,
      apiArguments: id?.toString(),
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          setUserAddress(resp?.data?.data);
          if (resp?.data?.data?.lat && resp?.data?.data?.long) {
            setCenterPosition([resp?.data?.data?.lat, resp?.data?.data?.long]);
            setCoordinates([resp?.data?.data?.lat, resp?.data?.data?.long]);
          }
          // else {
          //   setCenterPosition(["36.46382124745137", "52.85792368850813"]);
          //   setCoordinates({
          //     lat: "36.46382124745137",
          //     lng: "52.85792368850813",
          //   });
          // }
        }
      },
      onError: (err) => { },
      // onStart: handleOpen,
      // onEnd: handleClose,
    });
  };
  //
  useEffect(() => {
    if (location?.pathname?.includes("edit-address")) {
      getCustoemerAddressDetail();
    } else {
      setCenterPosition(["36.46382124745137", "52.85792368850813"]);
      setCoordinates(["36.46382124745137", "52.85792368850813"]);
    }
  }, [id]);
  // Submit Function - Add Address
  const handleSubmitSendAddress = (values) => {
    //////////

    if (shoButtonMap) {
      toast.error('لطفا مقصد خود را تایید کنید.')
      return false
    }
    if (
      coordinates[0] == "36.46382124745137" &&
      coordinates[1] == "52.85792368850813"
    ) {
      setAddressError("مکانی را انتخاب نکرده اید . ");
      return;
    } else {
      setAddressError("");
    }

    const obj = {
      id: id,
      address: addressName
        ? addressName + " " + values?.userAddress
        : values?.userAddress,
      lat: coordinates[0],
      lng: coordinates[1],
      postalCode: values?.postalCode
    };
    if (!addressCityName) {
      toast.error("مجموعه دونات در این محدودیت فعالیت نمیکند");
      return false;
    }

    if (
      addressCityName?.includes("قائمشهر") ||
      addressCityName?.includes("قائم شهر") ||
      addressCityName?.includes("بابلسر") ||
      addressCityName?.includes("بابلسر") ||
      addressCityName?.includes("شهرستان ساری") ||
      addressCityName?.includes("میاندورود") ||
      addressCityName?.includes("سورک") ||
      addressCityName?.includes("نکا") ||
      addressCityName?.includes("ساری") ||
      addressCityName?.includes("ارطه") ||
      addressCityName?.includes("بابل")
    ) {

      apiCaller({
        api: customerAddress_apiCalls.apiCall_createCustomerAddress,
        apiArguments: obj,

        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.statusCode == 200) {
            if (resp.data?.data?.hasToken) {
              set_userToken(resp.data?.data.token);
              http.setToken(http.tokenKey, resp.data?.data.token);
            }
            const ru =
              locationSearchStringToObject2(location.search)?.returnUrl ?? "";
            checkProfileStatus({
              onStart: handleOpen,
              onEnd: handleClose,
              onContinueAllowed: () => {
                if (!ru) {
                  if (locationSearchStringToObject(location.search)?.returnPage) {
                    navigate('/checkout-cart');
                    return false
                  }
                  navigate(`/`, { replace: true });
                } else {
                  if (locationSearchStringToObject(location.search)?.returnPage) {
                    navigate('/checkout-cart');
                    return false
                  }
                  if (ru.includes("/checkout-cart")) {
                    if (resp.data?.data?.id) {
                    }
                    navigate(
                      `${ru}?newAddressId=${resp.data?.data?.id ?? ""}`,
                      {
                        replace: true,
                      }
                    );
                  } else {

                    navigate(`/${ru}`, {
                      replace: true,
                    });
                  }
                }
              },
            });
          }
        },
        onError: (err) => { },
        onStart: handleOpen,
        onEnd: handleClose,
      });
    } else {
      toast.error("مجموعه دونات در این محدودیت فعالیت نمیکند");
      return false;
    }
  };

  // Submit Function - Edit Address
  const handleSubmitEditAddress = (values) => {
    if (postalCode && postalCode?.length < 10) {
      toast.error("کدپستی باید 10 رقمی باشد .");
      return;
    }
    const obj = {
      id: id,
      address: values?.userAddress,
      postalCode: postalCode ?? "",
      lat: coordinates[0],
      long: coordinates[1],
      postalCode: values?.postalCode
    };
    apiCaller({
      api: customerAddress_apiCalls.apiCall_editCustomerAddress,
      apiArguments: obj,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          navigate(`/profile`);
        }
      },
      onError: (err) => { },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  // Allow Render Map
  const allowRenderMap = () => {
    if (centerPosition) return true;
    else return false;
  };
  // useEffect(() => {
  //   if (window?.location?.pathname?.includes("add-address")) {
  //     setCenterPosition(["36.46382124745137", "52.85792368850813"]);
  //   }
  // }, []);

  return (
    <section className="d-flex flex-column w-100">
      <div className="d-flex flex-column justify-content-start align-items-stretch">
        <SearchMapPlace onDestinationSelected={onDestinationSelected} />
        <div className="divider mb-3 w-100"></div>
        <h5 className="fs-7">
          لطفا مکان مورد نظر را از روی نقشه انتخاب کنید :
        </h5>
        <div className="add-address-map-holder w-100">
          {coordinates && (
            <OLAddressMap
              height={300}
              destination={coordinates}
              onDestinationSelected={onDestinationSelected}
            />
          )}
        </div>

        {addressError && (
          <div className="mt-4 text-danger fs-8 mt-4">{addressError}</div>
        )}

        {userAddress && (
          <div className="my-2">
            آدرس تقریبی :<span className="fs-8">{userAddress?.address}</span>
          </div>
        )}

        <div className="w-100 align-self-start position-relative">
          <IconButton
            className="align-self-start p-1 bg-white"
            style={{
              position: "absolute",
              top: "-60px",
              right: "10px",
              zIndex: "99",
            }}
            onClick={handleLocateUser}
          >
            <MyLocationIcon color="primary" />
          </IconButton>
        </div>
        {
          shoButtonMap &&
          <div className="w-100">
            <OrdinaryButton
              handleOnClick={() => setShowButtonMap(false)}
              holderClasses="mt-3"
              buttonText={
                'تایید مقصد'
              }
              buttonType="submit"
            />
          </div>
        }
        {addressName && (
          <div className="fs-7 w-100 p-2 border-bottom">{addressName}</div>
        )}
        <div dir="rtl d-flex flex-column justify-content-center align-items-center mt-3">
          <Formik
            enableReinitialize
            initialValues={{
              userAddress: userAddress?.address || "",
            }}
            validationSchema={formSchema}
            onSubmit={
              window.location.pathname.includes("edit-address")
                ? handleSubmitEditAddress
                : handleSubmitSendAddress
            }
          >
            <Form dir="rtl">
              <div dir="rtl" className="d-flex flex-column mt-3">
                <FormikMUITextArea
                  textAreaStyle={{
                    maxHeight: "120px",
                    minHeight: "120px",
                    resize: "none",
                    borderRadius: "0.35rem",
                    border: '1px solid #C36428'
                  }}
                  formcontrolprops={{
                    variant: "standard",
                    className: "w-100 px-2",
                  }}
                  labelText="آدرس دقیق پستی *"
                  labelprops={{
                    className: "",
                    color: "",
                    style: { color: "#C36428" },
                  }}
                  textAreaProps={{
                    className: "py-2 px-3 mt-2",
                    id: "userAddress",
                    name: "userAddress",
                    color: "",
                    placeHolder: `مثال : ساختمان نگین طبقه اول
                    `,
                  }}
                  textAreaClasses="py-2 px-3 mt-2"
                />
              </div>
              <div dir="rtl" className="d-flex flex-column">
                <FormikMUITextArea
                  textAreaStyle={{
                    maxHeight: "40px",
                    minHeight: "40px",
                    resize: "none",
                    borderRadius: "0.35rem",
                    border: '1px solid #C36428'
                  }}
                  formcontrolprops={{
                    variant: "standard",
                    className: "w-100 px-2",
                  }}
                  labelText="کد پستی *"
                  labelprops={{
                    className: "",
                    color: "",
                    style: { color: "#C36428" },
                  }}
                  textAreaProps={{
                    className: "py-2 px-3 mt-2",
                    id: "postalCode",
                    name: "postalCode",
                    color: "",
                    placeHolder: `کد پستی را وارد کنید
                    `,
                  }}
                  textAreaClasses="py-2 px-3 mt-2"
                />
              </div>
              <OrdinaryButton
                holderClasses="mt-3"
                buttonText={
                  location?.pathname?.includes("edit-address")
                    ? "ثبت تغییرات"
                    : "افزودن آدرس"
                }
                buttonType="submit"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddingAddress;
