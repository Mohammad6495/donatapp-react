import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SectionCalculation from "../CheckoutCart/components/SectionCalculation/SectionCalculation";

import { useShopBasketContext } from "./../../../core/contexts/ShopBasket/shopBasket.ctx";
import CheckUserAuthorization from "../CheckoutCart/components/checkUserAuth.component";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  calcPrice_apiCalls,
  customerAddress_apiCalls,
  payment_apiCalls,
  branches_apiCalls,
  account_apiCalls,
} from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useAuthContext } from "./../../../core/contexts/AuthContext/AuthContext";
import { formatNumber } from "../../../core/utility/helperFunctions";
//////////////////
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../CheckoutCart/styles/CheckoutCart.scss";
import { useCheckProfileStatus } from "../../../core/utility/checkUserProfileStatus";
import BakeryItem2 from "../Bakery/components/BakeryItem2/BakeryItem2";
import { Button, Checkbox, CircularProgress, Radio } from "@mui/material";
import { Add } from "@mui/icons-material";
// import ShopBasketExtraProduct from "./components/shopbasket-extraProductItem";
import {
  locationSearchStringToObject,
  toEnglishDigit,
} from "../../../core/utility/utils";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import NorouziSection from "../CheckoutCart/components/norouziSection/NorouziSection";
import CheckTabInfo from "../CheckoutCart/components/CkeckTabCheckBox";
import OLAddressMap from "../../components/openLayerMap/AddressChooseMap";
import SearchMapPlace from "../AddingAddress/SearchMapPlace";
//
import motorcycle from "./../../../assets/images/checkout-cart/motorcycle.svg";
import paymentPrimary from "./../../../assets/images/checkout-cart/payment-primary.svg";
import paymentSecondary from "./../../../assets/images/checkout-cart/payment-secondary.svg";
import shoppingPosPrimary from "./../../../assets/images/checkout-cart/shopping-pos-primary.svg";
import shoppingPosSecondary from "./../../../assets/images/checkout-cart/shopping-pos-secondary.svg";
import moneysvg from "./../../../assets/images/checkout-cart/money-svgrepo-com 1.svg";
import factorsvg from "./../../../assets/images/checkout-cart/factor.svg";
import shoppingsvg from "../../../assets/images/checkout-cart/shopping.svg";

const getTabStyle = (isSelected) => ({
  backgroundColor: isSelected ? "#CB7640" : "#DADADA",
  color: isSelected ? "white !important" : "#000000",
  fontWeight: "bold",
  flex: 1,
  borderRadius: "4px",
  boxShadow: "0 5px 7px -1px #00000048",
  "&:hover": {
    backgroundColor: isSelected ? "#CB7640" : "#DADADA",
  },
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
const CheckoutCart = () => {
  // contexts
  const { handleOpen, handleClose } = useLoadingContext();
  const { userData } = useProfileContext();
  const { userToken } = useAuthContext();
  const { shopBasketDataNorouzi, resetBasketNorouzi } = useShopBasketContext();
  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();
  // states
  const [factor, setFactor] = useState();
  const [adressesListIsFetching, setAdressesListIsFetching] = useState(false);
  const [adressesList, setAdressesList] = useState([]);
  const [selectedAdressId, setSelectedAdressId] = useState();
  const [sendPrice, setSendPrice] = useState(0);
  const [payAtHome, setPayAtHome] = useState(false);
  const [payAtCaro, setPayAtCaro] = useState(false);
  const [accurateAddress, setAccurateAddress] = useState("");
  const [coordinates, setCoordinates] = useState();
  const [isInPersonPaymentActive, setIsInPersonPaymentActive] = useState(false);
  const [branchData, setBranchData] = useState();

  const [balanceValue, setBalanceValue] = useState();
  const [payBalance, setPayBalance] = useState(true);
  const [balanceCashBack, setBalanceCashBack] = useState(false);
  const [
    balanceCashBackForInPersonPayment,
    setBalanceCashBackForInPersonPayment,
  ] = useState(false);
  const getBranch = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_get,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp?.data?.status == 1) {
          setBranchData(resp?.data?.data);
          setIsInPersonPaymentActive(resp?.data?.data?.isInPersonPaymentActive);
          setBalanceCashBack(resp?.data?.data?.balanceCashBack);
          setBalanceCashBackForInPersonPayment(
            resp?.data?.data?.balanceCashBackForInPersonPayment
          );
        }
      },
    });
  };
  useEffect(() => {
    getBranch();
  }, []);
  ///////////
  const onDestinationSelected = (e) => {
    getAddressName(e);
    setCoordinates(e);
  };

  useEffect(() => {
    setCoordinates(["36.46382124745137", "52.85792368850813"]);
  }, []);

  const [addressName, setAddressName] = useState("");

  const getAddressName = (e) => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getAddressName,
      apiArguments: { lat: e[0], lng: e[1] },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp?.data?.status == 1) {
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

  const [isGift, setIsGift] = useState(false);
  const handleChangeIsGift = () => {
    if (!isGift) {
      setPayAtCaro(false);
      setPayAtHome(false);
    }
    setIsGift((o) => !o);
  };

  const [giftProperty, setGiftProperty] = useState({
    gift_name: "",
    gift_phoneNumber: "",
  });

  const handleChangeGiftProperty = (e) => {
    const { id, value } = e.target;
    setGiftProperty({
      ...giftProperty,
      [id.toString()]: value,
    });
  };

  ///////////
  const handleChangePayAtHome = (e) => {
    setPayAtHome(e.target.checked);
    setPayAtCaro(false);
    setIsGift(false);
  };
  ///////////
  const handleChangePayAtCaro = (e) => {
    setPayAtCaro(e.target.checked);
    setPayAtHome(false);
    setIsGift(false);
  };
  //////////
  const getAdressesList = () => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getCustomerAddressList,
      onStart: () => {
        setAdressesListIsFetching(true);
      },
      onEnd: () => {
        setAdressesListIsFetching(false);
      },
      onSuccess: (resp) => {
        setAdressesList(resp.data.data);
      },
    });
  };
  ///
  const [freeSendingOnlinePayment, setFreeSendingOnlinePayment] =
    useState(false);
  const getBranchIsFreeSendingOnlinePayment = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_get,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setFreeSendingOnlinePayment(
            resp?.data?.data?.freeSendingForOnlinePayment
          );
        }
      },
      //   onErrorMessage: "عملیات دریافت وضعیت پرداخت با خطا مواجهه شد",
      // onStart: handleOpen,
      // onEnd: handleClose,
    });
  };
  useState(() => {
    getBranchIsFreeSendingOnlinePayment();
  }, []);
  ///
  const { branch, allBranches } = useBranchesContext();
  useEffect(() => {
    if (
      selectedAdressId &&
      adressesList?.length > 0 &&
      allBranches?.length > 0
    ) {
      // setSendPrice()
      const currentBranchData = allBranches.find((b) => b.id == branch);
      const currentAddressData = adressesList.find(
        (a) => a.id == selectedAdressId
      );
      apiCaller({
        api: calcPrice_apiCalls.apiCall_getCalculatedPrice,
        apiArguments: {
          branchLat: currentBranchData?.lat,
          branchLng: currentBranchData?.lng,
          destiniLat: currentAddressData?.lat,
          destiniLng: currentAddressData?.long,
        },
        toastMessage: true,
        // onErrorMessage: "محاسبه هزینه با خطا مواجه شد .",
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.statusCode === 200) {
            setSendPrice(resp?.data?.data);
          } else {
            // toast.error("محاسبه هزینه با خطا مواجه شد .");
          }
        },
        // onStart: () => setIsCalculating(true),
        // onEnd: () => setIsCalculating(false),
      });
    }
  }, [selectedAdressId, adressesList, allBranches]);
  ///////////
  useEffect(() => {
    if (location.search.includes("newAddressId")) {
      const obj = locationSearchStringToObject(location.search);
      setSelectedAdressId(obj?.newAddressId);
    } else if (userData?.defaultAddressId) {
      setSelectedAdressId(userData?.defaultAddressId);
    }
  }, [userData, location.search]);
  ///////////
  const handleChangeInput = (event) => {
    setSelectedAdressId(event?.target.value);
  };
  ////////////////////
  const getFactor = () => {
    apiCaller({
      api: payment_apiCalls.apiCall_getFactor,
      apiArguments: shopBasketDataNorouzi,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "دریافت فاکتور با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.status == 1) {
          setFactor(resp.data?.data);
        } else {
          resetBasketNorouzi();
        }
      },
      onError: (err) => {
        resetBasketNorouzi();
      },
    });
  };
  ////////////////////
  useEffect(() => {
    if (userToken) {
      getAdressesList();
    }
  }, [userToken]);
  ////////////////////
  useEffect(() => {
    if (
      !shopBasketDataNorouzi?.items ||
      shopBasketDataNorouzi?.items?.length == 0
    ) {
      setFactor({ ...factor, finalPrice: 0, sendPrice: 0 });
    }
    if (shopBasketDataNorouzi?.items?.length > 0) {
      getFactor();
    }
  }, [shopBasketDataNorouzi]);
  ////////////////////
  const [finalSubmitIsOnProcess, setFinalSubmitIsOnProcess] = useState(false);
  const { checkProfileStatus } = useCheckProfileStatus();
  const handleSubmit = async () => {
    if (finalSubmitIsOnProcess) return;
    ////
    if (!userToken) {
      navigate("/register?returnUrl=/checkout-cart");
      return;
    } else {
      if (
        !shopBasketDataNorouzi?.items ||
        shopBasketDataNorouzi?.items?.length == 0
      ) {
        toast.warn("برای ثبت سفارش باید ابتدا محصول انتخاب کنید .");
        return;
      }
      if (!selectedAdressId && !payAtCaro && !isGift) {
        toast.warn("لطفا یک آدرس انتخاب کنید .");
        return;
      }
      if (adressesList?.length == 0) {
        toast.warn("کاربر گرامی هنوز هیچ آدرسی اضافه نکردید");
        return;
      }

      checkProfileStatus({
        onStart: () => {
          handleOpen();
          setFinalSubmitIsOnProcess(true);
        },
        onContinueNotAllowed: () => {
          handleClose();
          setFinalSubmitIsOnProcess(false);
        },
        onError: () => {
          handleClose();
          setFinalSubmitIsOnProcess(false);
        },
        onContinueAllowed: () => {
          apiCaller({
            api: payment_apiCalls.apiCall_submitFactor,
            apiArguments: {
              ...shopBasketDataNorouzi,
              customerAddressId: selectedAdressId,
              isOnlinePayment: !payAtHome,
              isDarbCaro: payAtCaro,
              isGift: isGift,
              isNorouzi: true,
              giftPersonName:
                isGift && giftProperty.gift_name ? giftProperty.gift_name : "",
              giftPersonPhoneNumber:
                isGift && giftProperty.gift_phoneNumber
                  ? toEnglishDigit(giftProperty.gift_phoneNumber)
                  : "",
              giftPersonLat: isGift && coordinates ? coordinates[0] : "",
              giftPersonLong: isGift && coordinates ? coordinates[1] : "",
              giftPersonAddress:
                isGift && addressName && addressName + accurateAddress,
              useBalance: payBalance,
            },
            onStart: handleOpen,
            onEnd: () => {},
            onError: (resp) => {
              if (resp.response?.data?.errors.length !== 0) {
                toast.error(resp.response.data.errors[0]);
              }
              handleClose();
              setFinalSubmitIsOnProcess(false);
            },
            toastMessage: true,
            // onErrorMessage: "ثبت سفارش با خطا مواجه شد .",
            onSuccess: (resp) => {
              resetBasketNorouzi();
              if (resp.data.data?.hasPayment === true) {
                if (
                  resp.data.data?.payment?.gatewayTransporter?.descriptor?.url
                ) {
                  try {
                    navigate(
                      `/gateway-redirect?url=${resp.data.data.payment.gatewayTransporter.descriptor.url}`
                    );
                  } catch {
                    setFinalSubmitIsOnProcess(false);
                  }
                }
              } else {
                toast.success("درخواست شما با موفقیت ثبت شد .");
                try {
                  navigate(
                    "/general-order-details/" +
                      resp.data?.data?.requestId +
                      "&backUrl=/",
                    {
                      replace: true,
                    }
                  );
                } catch {
                  setFinalSubmitIsOnProcess(false);
                }
              }
              handleClose();
              // setFinalSubmitIsOnProcess(false);
            },
          });
        },
      });
    }
  };

  const getSendPrice = (sp) => {
    if (!sp) return 0;
    if (sp == -1) return 0;
    else return sp;
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  ////////////////////
  const handleCheckOnline = () => {
    if (value == 0 || value == 1 || value == 2) {
      if (!payAtHome) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleCheck = () => {
    if (payAtCaro && !payAtHome) {
      return true;
    } else if (!payAtCaro && payAtHome) {
      return false;
    } else if (!payAtCaro && !payAtHome) {
      return true;
    } else {
      return false;
    }
  };

  const getBalanceValue = () => {
    apiCaller({
      api: account_apiCalls.apiCall_getbalance,
      onSuccess(resp) {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setBalanceValue(resp?.data?.data);
        }
      },
    });
  };

  useEffect(() => {
    getBalanceValue();
  }, []);

  return (
    <section className="m-0  d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar">
      {userToken &&
        shopBasketDataNorouzi &&
        shopBasketDataNorouzi?.items?.length > 0 && (
          <>
            <CheckUserAuthorization />
            <div className="divider2 mt-3"></div>
          </>
        )}

      <div className="w-100 my-3">
        <div className="d-flex gap-2 align-items-center">
          <div className="SectionCalculationIcon">
            <img width={16} height={16} src={shoppingsvg} alt="motorcycle" />
          </div>
          <h6 className="mb-0 fs-7 fw-bold mb-0 calculationTitle">
            سبد خرید شما
          </h6>
          <span className="pt-1 calculationConsignment">
            {shopBasketDataNorouzi?.items?.length} مرسوله
          </span>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        href="/norouzi"
        className="my-3 py-2 w-100"
        size="large"
        LinkComponent={(props) => (
          <Link
            to="/norouzi"
            {...props}
            className={
              props?.className +
              " text-white align-self-center text-decoration-none"
            }
          />
        )}
      >
        افزودن محصول جدید نوروزی
      </Button>

      <div className="flex flex-column w-100 mt-0">
        <hr className="my-3" />
        <SectionCalculation
          calculationText="محصولات نوروزی"
          calculationPrice={
            <Button
              variant="outlined"
              color="primary"
              size="small"
              endIcon={<Add />}
              onClick={() => {
                navigate("/norouzi");
              }}
              sx={{
                fontSize: "0.7rem !important",
              }}
            >
              افزودن آیتم جدید
            </Button>
          }
        />
        {(shopBasketDataNorouzi?.items?.length == 0 ||
          shopBasketDataNorouzi?.items?.filter((it) => it?.cartItemType == 4)
            .length == shopBasketDataNorouzi?.items.length) && (
          <p className="text-danger">سفارشی موجود نمیباشد.</p>
        )}
        <NorouziSection factor={factor} />
      </div>

      {shopBasketDataNorouzi && shopBasketDataNorouzi?.items?.length > 0 && (
        <>
          {!userToken && (
            <div className="align-self-start fs-8">
              برای انتخاب آدرس و نهایی کردن سفارش باید ابتدا
              <span
                style={{
                  margin: "0 4px",
                  cursor: "pointer",
                }}
                className="text-primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                وارد
              </span>
              شوید .
            </div>
          )}
          {userToken &&
            !adressesListIsFetching &&
            adressesList?.length == 0 && (
              <div className="align-self-start fs-8">
                آدرسی موجود نیست . میتوانید از
                <span
                  onClick={() => {
                    navigate("/add-address?returnUrl=/checkout-cart");
                  }}
                  className="text-primary"
                >
                  {" "}
                  اینجا{" "}
                </span>
                یک آدرس ایجاد کنید
              </div>
            )}

          {/*  */}
          <div className="divider mt-3 mb-2"></div>
          {/* {freeSendingOnlinePayment && (
            <p className="mb-0 mt-2 text-danger fw-bold">
              درصورت پرداخت آنلاین هزینه ارسال زیر ۴۰ هزار تومان رایگان خواهد
              بود
            </p>
          )} */}
          <div className="mt-3 w-100">
            <div className="w-100 my-3">
              <div className="d-flex gap-2 align-items-center">
                <div className="SectionCalculationIcon">
                  <img width={16} height={16} src={moneysvg} alt="motorcycle" />
                </div>
                <h6 className="mb-0 fs-7 fw-bold mb-0 calculationTitle">
                  شیوه پرداخت
                </h6>
              </div>
            </div>
            <div className="w-100  d-flex flex-column justify-content-start align-items-stretch">
              <div
                className="w-100 m-0 p-0 rounded-2 p-3 d-flex align-items-center"
                style={{
                  border: handleCheckOnline()
                    ? "3px solid #CB7640"
                    : "1px solid #4d4d4d",
                }}
              >
                <div className="">
                  <label
                    htmlFor="payAtCaro-Checkbox"
                    className="m-0 p-0 d-flex align-items-center justify-content-start gap-2"
                    style={{ cursor: "pointer" }}
                  >
                    <Radio
                      id="payAtCaro-Checkbox"
                      checked={handleCheckOnline()}
                      onChange={() => {
                        setPayAtHome(false);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <img
                      width={45}
                      height={70}
                      src={
                        handleCheckOnline() ? paymentPrimary : paymentSecondary
                      }
                      alt={
                        handleCheckOnline()
                          ? "paymentPrimary"
                          : "paymentSecondary"
                      }
                    />
                  </label>
                </div>
                <div className="" style={{ marginRight: "20px" }}>
                  <span
                    className="d-block"
                    style={{
                      color: handleCheckOnline() ? "#CB7640" : "#4d4d4d",
                    }}
                  >
                    پرداخت آنلاین
                  </span>
                  {payBalance ? (
                    <label
                      htmlFor="payAtHome-Checkbox"
                      className="text-muted mt-1 fs-8 text-justify cursor-pointer"
                    >
                      <small className="text-muted  fs-8 text-justify">
                        با انتخاب این گزینه مبلغ سفارش را آنلاین پرداخت کنید.
                      </small>
                    </label>
                  ) : (
                    <label
                      htmlFor="payAtHome-Checkbox"
                      className="text-muted mt-1 fs-8 text-justify cursor-pointer"
                    >
                      <small className="text-muted  fs-8 text-justify">
                        انتخاب این گزینه مبلغ سفارش را درب منزل پرداخت کنید
                      </small>
                    </label>
                  )}
                </div>
              </div>

              {isInPersonPaymentActive && (
                <div
                  className="w-100 m-0 p-0 rounded-2 p-3 d-flex mt-3"
                  style={{
                    border: payAtHome
                      ? "3px solid #CB7640"
                      : "1px solid #4d4d4d",
                  }}
                >
                  <label
                    htmlFor="payAtHome-Checkbox"
                    className="m-0 p-0 d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <Radio
                      id="payAtHome-Checkbox"
                      checked={payAtHome}
                      onChange={handleChangePayAtHome}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <div style={{ width: "100%", maxWidth: "60px" }}>
                      <img
                        className="w-100"
                        src={
                          payAtHome ? shoppingPosPrimary : shoppingPosSecondary
                        }
                        alt={
                          payAtHome
                            ? "shoppingPosPrimary"
                            : "shoppingPosSecondary"
                        }
                      />
                    </div>
                    <div>
                      {value == 2 ? (
                        <span
                          style={{
                            color: handleCheckOnline() ? "#4d4d4d" : "#CB7640",
                            marginRight: "10px",
                          }}
                        >
                          پرداخت حضوری
                        </span>
                      ) : (
                        <span
                          style={{
                            color: handleCheckOnline() ? "#4d4d4d" : "#CB7640",
                            marginRight: "10px",
                          }}
                        >
                          پرداخت درب منزل
                        </span>
                      )}
                      {payBalance ? (
                        <label
                          htmlFor="payAtCaro-Checkbox"
                          className="text-muted fs-8 text-justify cursor-pointer"
                          style={{ marginRight: "10px" }}
                        >
                          <small className="text-muted mt-1 fs-8 text-justify">
                            با انتخاب این گزینه مبلغ سفارش را درب منزل پرداخت
                            کنید .
                          </small>
                        </label>
                      ) : (
                        <label
                          htmlFor="payAtCaro-Checkbox"
                          className="text-muted fs-8 text-justify cursor-pointer"
                        >
                          <small className="text-muted mt-1 fs-8 text-justify">
                            با انتخاب این گزینه مبلغ سفارش را انلاین پرداخت کنید
                          </small>
                        </label>
                      )}
                    </div>
                  </label>
                </div>
              )}
              <div className="w-100 m-0 p-0 mt-3">
                <label
                  htmlFor="paybalance-Checkbox"
                  className="m-0 p-3 d-flex justify-content-between align-items-center rounded-2"
                  style={{
                    border: payBalance
                      ? "1px solid #CB7640"
                      : "1px solid #4d4d4d",
                  }}
                >
                  <p className="m-0 fs-8">
                    استفاده از اعتبار کیف پول ({" "}
                    <span style={{ color: "#009917" }}>
                      اعتبار شما : {formatNumber(balanceValue)} تومان{" "}
                    </span>{" "}
                    )
                  </p>
                  <Checkbox
                    id="paybalance-Checkbox"
                    checked={payBalance}
                    style={{ padding: "0" }}
                    onChange={() => {
                      setPayBalance(!payBalance);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </label>
                <div className="divider2 mt-4 mb-1"></div>
              </div>
            </div>
          </div>

          <div className="mt-3 w-100">
            <div className="w-100 my-3">
              <div className="d-flex gap-2 align-items-center">
                <div className="SectionCalculationIcon">
                  <img
                    width={16}
                    height={16}
                    src={motorcycle}
                    alt="motorcycle"
                  />
                </div>
                <h6 className="mb-0 fs-7 fw-bold mb-0 calculationTitle">
                  شیوه ارسال
                </h6>
              </div>
            </div>
            <Box className="w-100" sx={{ width: "100%" }}>
              <Box className="w-100 mt-3">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    minHeight: "3rem",
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab
                    onClick={() => {
                      setPayAtCaro(false);
                      setPayAtHome(false);
                      setIsGift(false);
                    }}
                    className="TabItem"
                    sx={getTabStyle(value === 0)}
                    label="برای خودم"
                    {...a11yProps(0)}
                  />
                  <Tab
                    onClick={() => {
                      if (!isGift) {
                        setPayAtCaro(false);
                        setPayAtHome(false);
                      }
                      setIsGift(true);
                    }}
                    className="TabItem"
                    sx={getTabStyle(value === 1)}
                    label=" درب دونات"
                    {...a11yProps(1)}
                  />
                  <Tab
                    onClick={() => {
                      setPayAtCaro(true);
                      setPayAtHome(false);
                      setIsGift(false);
                    }}
                    className="TabItem"
                    sx={getTabStyle(value === 2)}
                    label="برای دیگری"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <div
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                aria-labelledby={`simple-tab-${0}`}
              >
                {/* */}
                <div
                  className="rounded p-3 d-flex flex-column justify-content-start align-items-stretch mt-3"
                  style={{ border: "1px solid #CB7640" }}
                >
                  <div className="w-100 m-0 p-0">
                    {/*  <label
                          htmlFor="isGift-Checkbox"
                          className="mb-2 p-0 d-block"
                        >
                          <Checkbox
                        id="isGift-Checkbox"
                        checked={isGift}
                        onChange={handleChangeIsGift}
                        inputProps={{ "aria-label": "controlled" }}
                      /> 
                        </label>*/}
                    <label
                      htmlFor="isGift-Checkbox"
                      className="text-muted fs-8 text-justify cursor-pointer"
                    >
                      <small className="fs-7 text-justify">
                        <span style={{ color: "#CB7640", paddingTop: "3px" }}>
                          ●
                        </span>{" "}
                        درحال حاضر محصول مورد نظر به آدرسی که انتخاب میکنید
                        ارسال میگردد
                      </small>
                    </label>
                    <div className="mt-3">
                      <span
                        className="mb-0 fw-bold mb-0"
                        style={{ color: "#CB7640", fontSize: "16px" }}
                      >
                        انتخاب آدرس :
                      </span>

                      {adressesList.length > 0 && (
                        <div className="d-flex gap-3 align-items-center w-100 mt-3 checkout-address-holder">
                          <FormControl className="w-100" sx={{ minWidth: 80 }}>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              size="small"
                              sx={{
                                color: "#6F6F6F",
                                fontSize: "13px",
                                borderRadius: "0 5px 5px 5px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#CB7640",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#CB7640",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#CB7640",
                                  },
                                ".MuiSvgIcon-root ": {
                                  fill: "#CB7640 !important",
                                  fontSize: "2.5rem",
                                  transform: "translateX(7px)",
                                },
                              }}
                              value={selectedAdressId}
                              onChange={handleChangeInput}
                              label=""
                            >
                              {adressesList.map((it) => (
                                <MenuItem value={it.id} key={it.id}>
                                  {it.address}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div
                            style={{
                              minWidth: "fit-content",
                            }}
                          >
                            {userToken ? (
                              <Link
                                to="/add-address?returnUrl=/checkout-cart"
                                className="fs-8 text-decoration-none p-2 text-white rounded-2"
                                style={{ backgroundColor: "#CB7640" }}
                              >
                                ویرایش آدرس
                              </Link>
                            ) : (
                              <Link
                                to="/register?returnUrl=/add-address&returnPage=checkout-cart"
                                className="fs-8 text-decoration-none p-2 text-white rounded-2"
                                style={{ backgroundColor: "#CB7640" }}
                              >
                                ویرایش آدرس
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-${1}`}
                aria-labelledby={`simple-tab-${1}`}
              >
                {/* <div className="border rounded p-2  d-flex flex-column justify-content-start align-items-stretch mt-3">
                  <div className="border rounded p-2  d-flex flex-column justify-content-start align-items-stretch mt-3">
                    <div className="w-100 m-0 p-0 my-3">
                      <label
                        htmlFor="payAtCaro-Checkbox"
                        className="m-0 p-0 d-block"
                      >
                        <Checkbox
                          id="payAtCaro-Checkbox"
                          checked={payAtCaro}
                          onChange={handleChangePayAtCaro}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        {" درب دونات"}
                      </label>
                      <label
                        htmlFor="payAtCaro-Checkbox"
                        className="text-muted fs-8 text-justify cursor-pointer"
                      >
                        <small className="text-muted mt-1 fs-8 text-justify">
                          * با انتخاب این گزینه میتوانید محصول را حضورا از شعبه
                          دریافت کنید .
                        </small>
                      </label>
                    </div>
                  </div>
                </div> */}
                <div
                  className="rounded p-2  d-flex flex-column justify-content-start align-items-stretch mt-3"
                  style={{ border: "1px solid #CB7640" }}
                >
                  <div className="w-100 m-0 p-0 my-1">
                    <small className="fs-7 text-justify d-block">
                      <span style={{ color: "#CB7640", paddingTop: "3px" }}>
                        ●
                      </span>{" "}
                      میتوانید محصول را حضورا از شعبه دریافت کنید.
                    </small>
                    <small style={{ marginRight: "12px" }}>
                      ساعت کاری مجموعه : از 9 صبح تا 9 شب
                    </small>
                  </div>
                </div>
              </div>
              <div
                role="tabpanel"
                className="w-100"
                hidden={value !== 2}
                id={`simple-tabpanel-${2}`}
                aria-labelledby={`simple-tab-${2}`}
              >
                {/* <div className="w-100 m-0 p-0 mb-2">
                  <label
                    htmlFor="isGift-Checkbox"
                    className="m-0 p-0 d-block"
                  >
                    <Checkbox
                      id="isGift-Checkbox"
                      checked={isGift}
                      onChange={handleChangeIsGift}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    {"برای دیگری"}
                  </label>
                  <label
                    htmlFor="isGift-Checkbox"
                    className="text-muted fs-8 text-justify cursor-pointer"
                  >
                    <small className="text-muted mt-1 fs-8 text-justify">
                      * با انتخاب این گزینه میتوانید محصولات مورد نظر را به
                      عنوان هدیه برای شخص مورد نظر ارسال نمایید .
                    </small>
                  </label>
                  {isGift && (
                    <div className=" px-2 mt-2 d-flex flex-column justify-content-start align-items-stretch">
                      <label className=" fs-6" htmlFor="gift_name">
                        نام گیرنده :
                      </label>
                      <input
                        type="text"
                        className="px-3 py-2 mt-2 fs-7 rounded caro-border-primary border"
                        value={giftProperty.gift_name}
                        id="gift_name"
                        onChange={handleChangeGiftProperty}
                      />
                      <label className="mt-3 fs-6" htmlFor="gift_phoneNumber">
                        شماره همراه گیرنده :
                      </label>
                      <input
                        dir="ltr"
                        type="tel"
                        maxLength={"11"}
                        className="px-3 py-2 mt-2 fs-7 rounded caro-border-primary border"
                        value={giftProperty.gift_phoneNumber}
                        id="gift_phoneNumber"
                        onChange={handleChangeGiftProperty}
                        onKeyPress={(e) => {
                          const reg1 = new RegExp("^[0-9]+$");
                          const reg2 = new RegExp("^[۰-۹]+$");
                          if (!reg1.test(e.key) && !reg2.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <label
                        className="mt-3 fs-6 mb-0"
                        htmlFor="gift_address"
                      >
                        آدرس گیرنده :
                      </label>
                      <div className="w-100" id="gift_address">
                        <SearchMapPlace
                          onDestinationSelected={onDestinationSelected}
                        />
                        {coordinates && (
                          <OLAddressMap
                            destination={coordinates}
                            onDestinationSelected={onDestinationSelected}
                            height={"300px"}
                          />
                        )}
                      </div>
                      <span className="fs-7 mt-2">{addressName}</span>
                      <label
                        className="mt-3 fs-6 mb-0"
                        htmlFor="gift_addressName"
                      >
                        آدرس دقیق :
                      </label>
                      <textarea
                        id="gift_addressName"
                        value={accurateAddress}
                        onChange={(e) => setAccurateAddress(e.target.value)}
                        rows={4}
                        style={{ resize: "none" }}
                        className="px-3 py-2 mt-2 fs-7 rounded caro-border-primary border"
                      ></textarea>
                    </div>
                  )}
                </div> */}
                <div
                  className="rounded p-2 pt-3 d-flex flex-column justify-content-start align-items-stretch mt-3"
                  style={{ border: "1px solid #CB7640" }}
                >
                  <div className="w-100 m-0 p-0 mb-2">
                    <label
                      htmlFor="isGift-Checkbox"
                      className="fs-8 text-justify cursor-pointer"
                    >
                      <small className="fs-7 text-justify d-block">
                        <span style={{ color: "#CB7640", paddingTop: "3px" }}>
                          ●
                        </span>{" "}
                        میتوانید محصولات مورد نظر را به عنوان هدیه برای شخص مورد
                        نظر ارسال نمایید.
                      </small>
                    </label>
                    {isGift && (
                      <div className=" px-2 mt-2 d-flex flex-column justify-content-start align-items-stretch">
                        <label className=" fs-7" htmlFor="gift_name">
                          نام گیرنده :
                        </label>
                        <input
                          type="text"
                          className="px-3 py-2 mt-2 fs-7"
                          style={{
                            border: "1px solid #8D8D8D",
                            borderRadius: "7px 0 7px 7px",
                          }}
                          value={giftProperty.gift_name}
                          id="gift_name"
                          onChange={handleChangeGiftProperty}
                          required
                        />
                        <label className="mt-3 fs-7" htmlFor="gift_phoneNumber">
                          شماره همراه گیرنده :
                        </label>
                        <input
                          dir="ltr"
                          type="tel"
                          maxLength={"11"}
                          style={{
                            border: "1px solid #8D8D8D",
                            borderRadius: "7px 0 7px 7px",
                          }}
                          className="px-3 py-2 mt-2 fs-7"
                          value={giftProperty.gift_phoneNumber}
                          id="gift_phoneNumber"
                          onChange={handleChangeGiftProperty}
                          onKeyPress={(e) => {
                            const reg1 = new RegExp("^[0-9]+$");
                            const reg2 = new RegExp("^[۰-۹]+$");
                            if (!reg1.test(e.key) && !reg2.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <label
                          className="mt-3 fs-7 mb-0"
                          htmlFor="gift_address"
                        >
                          آدرس گیرنده :
                        </label>
                        <div className="w-100" id="gift_address">
                          <SearchMapPlace
                            onDestinationSelected={onDestinationSelected}
                          />
                          {coordinates && (
                            <OLAddressMap
                              destination={coordinates}
                              onDestinationSelected={onDestinationSelected}
                              height={"300px"}
                            />
                          )}
                        </div>
                        <span
                          className="fs-7 mt-2"
                          style={{ color: "#CB7640" }}
                        >
                          {addressName}
                        </span>
                        <label
                          className="mt-3 fs-7 mb-0"
                          htmlFor="gift_addressName"
                        >
                          آدرس دقیق :
                        </label>
                        <textarea
                          id="gift_addressName"
                          value={accurateAddress}
                          onChange={(e) => setAccurateAddress(e.target.value)}
                          rows={4}
                          className="px-3 py-2 mt-2 fs-7"
                          style={{
                            border: "1px solid #8D8D8D",
                            borderRadius: "7px 0 7px 7px",
                            resize: "none",
                          }}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </div>
          {factor && factor?.cartItems?.length > 0 && (
            <>
              <div className="divider2 mt-4 mb-1"></div>
              <div className="w-100 my-3">
                <div className="d-flex gap-2 align-items-center">
                  <div className="SectionCalculationIcon">
                    <img
                      width={16}
                      height={16}
                      src={moneysvg}
                      alt="motorcycle"
                    />
                  </div>
                  <h6 className="mb-0 fs-7 fw-bold mb-0 calculationTitle">
                    فاکتور
                  </h6>
                </div>
              </div>
              {/* <p>{!payAtHome && !payAtCaro && !isGift && 'hi'}</p> */}
              {/* <SectionCalculation
                calculationText=" هزینه ارسال"
                payAtCaro={payAtCaro}
                isOnline={!payAtHome}
                calculationPrice={
                  formatNumber(sendPrice ?? 0) + " تومان "
                }
              /> */}
              <div
                className="p-3 factor-info w-100"
                style={{
                  border: "2px solid rgba(151, 48, 121, 1)",
                  borderRadius: "10px",
                }}
              >
                {/******************************************************/}
                {factor?.discountAmount != 0 && (
                  <SectionCalculation
                    calculationText=" مبلغ کل"
                    calculationTextStyle="fs-6"
                    calculationPriceStyle="fs-6"
                    borderBottom={true}
                    isOnline={true}
                    calculationPrice={
                      factor?.discountAmount &&
                      formatNumber(
                        factor?.discountAmount + factor?.finalPrice ?? 0
                      ) + " تومان "
                    }
                  />
                )}
                <SectionCalculation
                  calculationText="مبلغ سفارش"
                  calculationTextStyle="priceSize"
                  calculationPriceStyle="priceSize"
                  borderBottom={true}
                  payAtCaro={payAtCaro}
                  isOnline={handleCheck()}
                  calculationPrice={
                    payAtCaro || payAtHome
                      ? formatNumber(factor?.finalPrice ?? 0) + " تومان "
                      : formatNumber(factor?.finalPrice ?? 0) + " تومان "
                  }
                />
                {!payAtCaro && (
                  <SectionCalculation
                    calculationText=" هزینه ارسال"
                    calculationTextStyle="priceSize"
                    calculationPriceStyle="priceSize"
                    borderBottom={true}
                    payAtCaro={payAtCaro}
                    isSend={true}
                    isOnline={handleCheck()}
                    calculationPrice={
                      payAtCaro || payAtHome
                        ? getSendPrice(
                          formatNumber(sendPrice || 0)
                          ) + " تومان "
                        : getSendPrice(
                            payAtHome ? 0 : formatNumber(sendPrice || 0)
                          ) + " تومان "
                    }
                  />
                )}
                <SectionCalculation
                  calculationText=" مبلغ کل"
                  calculationTextStyle="priceSize"
                  calculationPriceStyle="priceSize"
                  borderBottom={true}
                  isOnline={true}
                  calculationPrice={
                    formatNumber(
                      factor?.finalPrice + (payAtCaro ? 0 : 0) ?? 0
                    ) + " تومان"
                  }
                />
                {balanceValue && payBalance ? (
                  <SectionCalculation
                    calculationText=" مبلغ کیف پول"
                    calculationTextStyle="text-danger priceSize"
                    calculationPriceStyle="text-danger priceSize"
                    borderBottom={true}
                    payAtCaro={payAtCaro}
                    isOnline={handleCheck()}
                    calculationPrice={
                      formatNumber(balanceValue ?? 0) + " تومان "
                    }
                  />
                ) : null}
                {factor?.discountAmount != 0 && (
                  <>
                    <SectionCalculation
                      calculationText=" مبلغ تخفیف"
                      calculationTextStyle="priceSize"
                      calculationPriceStyle="priceSize"
                      borderBottom={true}
                      calculationPrice={
                        factor?.discountAmount &&
                        formatNumber(factor?.discountAmount ?? 0) + " تومان "
                      }
                    />
                  </>
                )}
                <SectionCalculation
                  calculationText="مبلغ قابل پرداخت"
                  calculationTextStyle="priceSize"
                  calculationPriceStyle="priceSize"
                  borderBottom={true}
                  payAtHome={payAtHome}
                  payAtCaro={payAtCaro}
                  isGift={isGift}
                  discountForOnlinePayment={factor?.discountForOnlinePayment}
                  finalPriceWithDiscountForOnlinePayment={
                    factor?.finalPriceWithDiscountForOnlinePayment
                  }
                  sendPrice={payAtCaro ? 0 : sendPrice}
                  calculationPrice={
                    factor?.finalPrice
                      ? factor?.finalPrice == -1
                        ? ""
                        : formatNumber(
                            factor?.discountForOnlinePayment !== 0 &&
                              !handleCheck()
                              ? !payAtCaro && payAtHome
                                ? balanceValue != 0 && payBalance
                                  ? balanceValue > factor?.finalPrice + 0
                                    ? 0
                                    : factor?.finalPrice + 0 - balanceValue
                                  : factor?.finalPrice + 0
                                : factor?.finalPriceWithDiscountForOnlinePayment +
                                  0
                              : handleCheck()
                              ? !payAtCaro && !payAtHome
                                ? balanceValue != 0 && payBalance
                                  ? balanceValue > factor?.finalPrice + 0
                                    ? 0
                                    : factor?.finalPrice + 0 - balanceValue
                                  : factor?.finalPrice + 0
                                : balanceValue != 0 && payBalance
                                ? balanceValue > factor?.finalPrice
                                  ? 0
                                  : factor?.finalPrice - balanceValue
                                : factor?.finalPrice
                              : balanceValue != 0 && payBalance
                              ? balanceValue >
                                factor?.finalPrice +
                                  (payAtCaro
                                    ? 0
                                    : factor?.sendPrice == 0
                                    ? 0
                                    : payAtHome || factor?.finalPrice == -1
                                    ? 0
                                    : 0)
                                ? 0
                                : factor?.finalPrice +
                                  (payAtCaro
                                    ? 0
                                    : factor?.sendPrice == 0
                                    ? 0
                                    : payAtHome || factor?.finalPrice == -1
                                    ? 0
                                    : 0) -
                                  balanceValue
                              : factor?.finalPrice +
                                (payAtCaro
                                  ? 0
                                  : factor?.sendPrice == 0
                                  ? 0
                                  : payAtHome || factor?.finalPrice == -1
                                  ? 0
                                  : 0)
                          ) + " تومان "
                      : ""
                  }
                />
              </div>
              {factor?.discountForOnlinePayment !== 0 && (
                <span className="text-danger">
                  در صورت پرداخت آنلاین سفارش شما شامل{" "}
                  {factor?.discountForOnlinePayment}% تخفیف میشود
                </span>
              )}
              {/* <div className="d-flex justify-content-between align-items-center w-100 mt-3">
                <p className="priceSize">
                  <span className="text-success">
                    {handleCheck()
                      ? formatNumber(
                        (factor?.finalPrice * balanceCashBack) / 100 ?? 0
                      ) + " تومان "
                      : formatNumber(
                        (factor?.finalPrice *
                          balanceCashBackForInPersonPayment) /
                        100 ?? 0
                      ) + " تومان "}
                  </span>{" "}
                  کیف پول شما برای خرید بعدی شارژ میشود.
                </p>
              </div> */}
            </>
          )}
          <div className=" flex flex-column justify-content-center align-items-center w-100 mt-2">
            <Button
              variant="contained"
              color="primary"
              className="my-3 py-3 w-100"
              size="large"
              disabled={finalSubmitIsOnProcess}
              onClick={handleSubmit}
            >
              <span className="me-1">
                {" "}
                {userToken
                  ? payAtHome || factor?.finalPrice == -1
                    ? "ثبت سفارش"
                    : "پرداخت آنلاین"
                  : ""}
              </span>
              {userToken &&
                factor?.finalPrice &&
                `(${
                  factor?.finalPrice
                    ? factor?.finalPrice == -1
                      ? ""
                      : formatNumber(
                          factor?.discountForOnlinePayment !== 0 &&
                            !handleCheck()
                            ? !payAtCaro && payAtHome
                              ? balanceValue != 0 && payBalance
                                ? balanceValue > factor?.finalPrice + 0
                                  ? 0
                                  : factor?.finalPrice + 0 - balanceValue
                                : factor?.finalPrice + 0
                              : factor?.finalPriceWithDiscountForOnlinePayment +
                                0
                            : handleCheck()
                            ? !payAtCaro && !payAtHome
                              ? balanceValue != 0 && payBalance
                                ? balanceValue > factor?.finalPrice + 0
                                  ? 0
                                  : factor?.finalPrice + 0 - balanceValue
                                : factor?.finalPrice + 0
                              : balanceValue != 0 && payBalance
                              ? balanceValue > factor?.finalPrice
                                ? 0
                                : factor?.finalPrice - balanceValue
                              : factor?.finalPrice
                            : balanceValue != 0 && payBalance
                            ? balanceValue >
                              factor?.finalPrice +
                                (payAtCaro
                                  ? 0
                                  : factor?.sendPrice == 0
                                  ? 0
                                  : payAtHome || factor?.finalPrice == -1
                                  ? 0
                                  : 0)
                              ? 0
                              : factor?.finalPrice +
                                (payAtCaro
                                  ? 0
                                  : factor?.sendPrice == 0
                                  ? 0
                                  : payAtHome || factor?.finalPrice == -1
                                  ? 0
                                  : 0) -
                                balanceValue
                            : factor?.finalPrice +
                              (payAtCaro
                                ? 0
                                : factor?.sendPrice == 0
                                ? 0
                                : payAtHome || factor?.finalPrice == -1
                                ? 0
                                : 0)
                        ) + " تومان "
                    : ""
                })`}

              {!userToken && "برای خرید لطفا ابتدا وارد شوید."}
            </Button>
          </div>
        </>
      )}
      <br />
    </section>
  );
};

export default CheckoutCart;
