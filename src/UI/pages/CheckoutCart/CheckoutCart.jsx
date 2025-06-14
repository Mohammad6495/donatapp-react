import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SectionCalculation from "./components/SectionCalculation/SectionCalculation";
import shopping from "../../../assets/images/checkout-cart/shopping.svg";

import { useShopBasketContext } from "./../../../core/contexts/ShopBasket/shopBasket.ctx";
import CheckUserAuthorization from "./components/checkUserAuth.component";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  calcPrice_apiCalls,
  customerAddress_apiCalls,
  payment_apiCalls,
  branches_apiCalls,
  account_apiCalls,
} from "../../../core/services/agent";
import extraBanner from "../../../assets/images/extra.jpg";

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
import "./styles/CheckoutCart.scss";
import { useCheckProfileStatus } from "../../../core/utility/checkUserProfileStatus";
import BakeryItem2 from "../Bakery/components/BakeryItem2/BakeryItem2";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  Radio,
  Skeleton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
// import ShopBasketExtraProduct from "./components/shopbasket-extraProductItem";
import {
  locationSearchStringToObject,
  toEnglishDigit,
} from "../../../core/utility/utils";
import RefrigeratorCakeSection from "./components/refrigeratorCake/refrigeratorCakeSection";
import ExtraProductSection from "./components/ExtraProductSection/ExtraProductSection";
import DessertSection from "./components/dessertSection/DessertSection";
import CookiesSection from "./components/cookiesSection/cakesSection";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import NorouziSection from "./components/norouziSection/NorouziSection";
import CheckTabInfo from "./components/CkeckTabCheckBox";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserProfileInformation from "../../layouts/LandingLayout/components/UserProfileInformation/UserProfileInformation";

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
  const {
    setPaymentWay,
    paymentWay,
    shopBasketData,
    resetBasket,
    bakeryProducts_methods,
  } = useShopBasketContext();
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
  const [payBalance, setPayBalance] = useState(true);
  const [payAtCaro, setPayAtCaro] = useState(false);
  const [accurateAddress, setAccurateAddress] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [codeValueError, setCodeValueError] = useState("");
  const [coordinates, setCoordinates] = useState();
  const [isInPersonPaymentActive, setIsInPersonPaymentActive] = useState(false);
  const [balanceCashBack, setBalanceCashBack] = useState(false);
  const [
    balanceCashBackForInPersonPayment,
    setBalanceCashBackForInPersonPayment,
  ] = useState(false);
  const [canUserUseBalance, setCanUserUseBalance] = useState(false);
  const [balanceValue, setBalanceValue] = useState();
  const [isBirthDayuserDialog, setIsBirthDayuserDialog] = useState(false);
  const [branchData, setBranchData] = useState();
  const [value, setValue] = React.useState(0);
  const [isGift, setIsGift] = useState(false);
  const handleToggleBirthDayUser = () => {
    setIsBirthDayuserDialog(!isBirthDayuserDialog);
  };

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
        if (resp.status === 200 && resp?.data?.statusCode == 200) {
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

  const handleChangeIsGift = () => {
    if (!isGift) {
      setPayAtCaro(false);
      setPayAtHome(false);
    }
    setIsGift((o) => !o);
  };
  const handleChangeIsGiftCheckBox = () => {
    setIsGiftChekBox(!isGiftChekBox);
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
    // setIsGift(false);
  };
  ///////////
  const handleChangePayAtCaro = (e) => {
    setPayAtCaro(e.target.checked);
    setPayAtHome(false);
    // setIsGift(false);
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
        if (resp.data.data?.length !== 0) {
          setSelectedAdressId(resp.data.data[0]?.id);
        }
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
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setFreeSendingOnlinePayment(
            resp?.data?.data?.freeSendingForOnlinePayment
          );
        }
      },
      onErrorMessage: "عملیات دریافت وضعیت پرداخت با خطا مواجهه شد",
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
        onErrorMessage: "محاسبه هزینه با خطا مواجه شد .",
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.statusCode === 200) {
            setSendPrice(resp?.data?.data);
          } else {
            toast.error("محاسبه هزینه با خطا مواجه شد .");
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
      apiArguments: {
        ...shopBasketData,
        code: codeValue,
      },
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "دریافت فاکتور با خطا مواجه شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          setFactor(resp.data?.data);
        }
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
    if (!shopBasketData?.items || shopBasketData?.items?.length == 0) {
      setFactor({ ...factor, finalPrice: 0, sendPrice: 0 });
    }
    if (shopBasketData?.items?.length > 0) {
      getFactor();
    }
  }, [shopBasketData, payAtHome, payAtCaro]);
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
      if (!selectedAdressId && !payAtCaro && !isGift) {
        toast.warn("لطفا یک آدرس انتخاب کنید .");
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
              ...shopBasketData,
              customerAddressId: selectedAdressId,
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
            onSuccess: (resp) => {
              resetBasket();
              if (resp.data.data.url) {
                navigate(`/gateway-redirect?url=${resp.data.data.url}`);
              }
              handleClose();
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const handleNavigateToComplateBirthDay = () => {
    navigate("/edit-profile?returnUrl=/checkout-cart");
  };
  const shivehErsalTitle = () => {
    if (value == 0) {
      return "برای خودم";
    } else if (value == 1) {
      return "برای دیگری";
    } else if (value == 2) {
      return "تحویل درب دونات";
    }
  };
  const handleCheckOnline = () => {
    if (value == 0 || value == 1 || value == 2) {
      if (!payAtHome) {
        return true;
      } else {
        return false;
      }
    }
  };
  ///////////////////

  return (
    <section
      // style={{ paddingBottom: "60px" }}
      className="m-0 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {userToken && <UserProfileInformation />}
      {<div className="divider2 mt-3"></div>}
      {
        <div className="flex flex-column w-100 mt-1">
          <SectionCalculation
            calculationIcon={shopping}
            calculationCounter={shopBasketData?.items?.length}
            calculationText="سبد خرید شما"
            calculationTextStyle={"calculationTitle"}
          />
          {shopBasketData && shopBasketData?.items?.length > 0 && (
            <>
              <RefrigeratorCakeSection factor={factor} />
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            href="/"
            className="mt-4 mb-3 py-2 w-100"
            size="large"
            LinkComponent={(props) => (
              <Link
                to="/?pageId=0"
                {...props}
                className={
                  props?.className +
                  " text-white align-self-center text-decoration-none rounded-2"
                }
              />
            )}
          >
            افزودن محصول جدید
          </Button>
        </div>
      }

      {
        <div className="flex flex-column w-100">
          {shopBasketData?.items?.length == 0 &&
            shopBasketData?.items?.filter((it) => it?.cartItemType == 4)
              .length == 0 &&
            shopBasketData?.items.length == 0 && (
              <p className="text-danger">سفارشی موجود نمیباشد.</p>
            )}

          <DessertSection factor={factor} />
          {/* <NorouziSection factor={factor} /> */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <>
            {
              <div className="w-100 d-flex flex-column">
                {factor?.cartItems?.length > 0 &&
                  factor?.cartItems?.filter((item) => item.cartItemType == 2)
                    ?.length > 0 && (
                    <>
                      <hr className="my-3" />
                      <SectionCalculation
                        calculationText="بیکری"
                        calculationPrice={
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            endIcon={<Add />}
                            onClick={() => {
                              navigate("/bakery");
                            }}
                            sx={{
                              fontSize: "0.7rem !important",
                            }}
                          >
                            افزودن آیتم جدید
                          </Button>
                        }
                      />
                      {factor?.cartItems
                        ?.filter((item) => item.cartItemType == 2)
                        ?.map((item) =>
                          bakeryProducts_methods.doesExistsInBasket(
                            item?.product?.id
                          ) ? (
                            <BakeryItem2
                              className="shadow"
                              key={item?.product?.id}
                              itemId={item?.product?.id}
                              itemImg={item?.product?.image}
                              itemTitle={item?.product?.title}
                              itemPrice={item?.product?.price}
                              itemCount={item?.count}
                              deleteBakeryHandler={() => {
                                bakeryProducts_methods.deleteItem(
                                  item?.product?.id
                                );
                              }}
                              bakeryMinusButtonHandler={() => {
                                bakeryProducts_methods.decrement(
                                  item?.product?.id
                                );
                              }}
                              bakeryPlusButtonHandler={() => {
                                bakeryProducts_methods.increment(
                                  item?.product?.id
                                );
                              }}
                            />
                          ) : (
                            <></>
                          )
                        )}
                    </>
                  )}
              </div>
            }
          </>
          {/*  */}
          {/*  */}
          <CookiesSection factor={factor} />
        </div>
      }

      {shopBasketData && shopBasketData?.items?.length > 0 && (
        <>
          {!userToken && (
            <div className="align-self-start fs-8 mt-3">
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
          {/* {paymentWay && <div className="divider2 mt-4 mb-2"></div>} */}
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
          {
            <>
              {freeSendingOnlinePayment && (
                <p className="mb-0 mt-2 text-danger fw-bold">
                  با خرید بالای 150 هزار تومان هزینه ارسال تا 40 هزار تومان
                  رایگان می باشد.
                </p>
              )}
              <SectionCalculation
                calculationIcon={moneysvg}
                calculationText="شیوه پرداخت"
                calculationTextStyle={"moneysvg"}
              />
              <div className="mt-3 w-100">
                <div className="w-100 d-flex flex-column justify-content-start align-items-stretch">
                  <div
                    className="w-100 m-0 p-0 rounded-2 p-3 d-flex justify-content-between"
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
                            handleCheckOnline()
                              ? paymentPrimary
                              : paymentSecondary
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
                      {/* {payBalance ? ( */}
                      <label
                        htmlFor="payAtHome-Checkbox"
                        className="text-muted mt-1 fs-8 text-justify cursor-pointer"
                      >
                        <small className="text-muted  fs-8 text-justify">
                          با انتخاب این گزینه مبلغ سفارش را آنلاین پرداخت کنید و{" "}
                          {
                            <span className="caro-color fw-bold">
                              {branchData?.balanceCashBack} درصد اعتبار هدیه
                            </span>
                          }{" "}
                          برای خرید بعدی استفاده کنید.
                        </small>
                      </label>
                      {/* ) : ( */}
                      {/* <label
                          htmlFor="payAtHome-Checkbox"
                          className="text-muted mt-1 fs-8 text-justify cursor-pointer"
                        >
                          <small className="text-muted  fs-8 text-justify">
                            انتخاب این گزینه مبلغ سفارش را درب منزل پرداخت کنید
                          </small>
                        </label> */}
                      {/* )} */}
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
                      {/* style={{ opacity: payAtCaro ? '0.5' : '1' }} */}
                      <label
                        htmlFor="payAtHome-Checkbox"
                        className="m-0 p-0 d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                      >
                        {/* <Checkbox
                          // disabled={payAtCaro}
                          id="payAtHome-Checkbox"
                          style={{ padding: "0" }}
                          checked={payAtHome}
                          onChange={handleChangePayAtHome}
                          inputProps={{ "aria-label": "controlled" }}
                        /> */}
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
                              payAtHome
                                ? shoppingPosPrimary
                                : shoppingPosSecondary
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
                                color: handleCheckOnline()
                                  ? "#4d4d4d"
                                  : "#CB7640",
                                marginRight: "10px",
                              }}
                            >
                              پرداخت حضوری
                            </span>
                          ) : (
                            <span
                              style={{
                                color: handleCheckOnline()
                                  ? "#4d4d4d"
                                  : "#CB7640",
                                marginRight: "10px",
                              }}
                            >
                              پرداخت درب منزل
                            </span>
                          )}
                          {/* {payBalance ? ( */}
                          <label
                            htmlFor="payAtCaro-Checkbox"
                            className="text-muted fs-8 text-justify cursor-pointer"
                            style={{ marginRight: "10px" }}
                          >
                            <small className="text-muted mt-1 fs-8 text-justify">
                              با انتخاب این گزینه مبلغ سفارش را درب منزل پرداخت
                              کنید و از{" "}
                              {
                                <span className="caro-color fw-bold">
                                  {
                                    branchData?.balanceCashBackForInPersonPayment
                                  }{" "}
                                  درصد عتبار هدیه
                                </span>
                              }{" "}
                              برای خرید بعدی استفاده کنید.
                            </small>
                          </label>
                          {/* ) : ( */}
                          {/* <label
                              htmlFor="payAtCaro-Checkbox"
                              className="text-muted fs-8 text-justify cursor-pointer"
                            >
                              <small className="text-muted mt-1 fs-8 text-justify">
                                با انتخاب این گزینه مبلغ سفارش را انلاین پرداخت
                                کنید
                              </small>
                            </label> */}
                          {/* )} */}
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </>
          }
          {
            <>
              <div className="mt-3 w-100">
                <div className="d-flex gap-2 align-items-center">
                  <div className="SectionCalculationIcon">
                    <img className="w-100" src={motorcycle} alt="motorcycle" />
                  </div>
                  <h6 className="mb-0 fw-bold mb-0 calculationTitle">
                    شیوه ارسال
                  </h6>
                </div>
                <Box className="w-100" sx={{ width: "100%" }}>
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
                            <span
                              style={{ color: "#CB7640", paddingTop: "3px" }}
                            >
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
                              <FormControl
                                className="w-100"
                                sx={{ minWidth: 80 }}
                              >
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
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
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
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    role="tabpanel"
                    className="w-100"
                    hidden={value !== 1}
                    id={`simple-tabpanel-${1}`}
                    aria-labelledby={`simple-tab-${1}`}
                  >
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
                    hidden={value !== 2}
                    id={`simple-tabpanel-${2}`}
                    aria-labelledby={`simple-tab-${2}`}
                  >
                    {/* */}
                    <div
                      className="rounded p-2  d-flex flex-column justify-content-start align-items-stretch mt-3"
                      style={{ border: "1px solid #CB7640" }}
                    >
                      <div className="w-100 m-0 p-0 mb-2">
                        <label
                          htmlFor="isGift-Checkbox"
                          className="fs-8 text-justify cursor-pointer"
                        >
                          <small className="fs-7 text-justify d-block">
                            <span
                              style={{ color: "#CB7640", paddingTop: "3px" }}
                            >
                              ●
                            </span>{" "}
                            میتوانید محصولات مورد نظر را به عنوان هدیه برای شخص
                            مورد نظر ارسال نمایید.
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
                            <label
                              className="mt-3 fs-7"
                              htmlFor="gift_phoneNumber"
                            >
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
                              onChange={(e) =>
                                setAccurateAddress(e.target.value)
                              }
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
            </>
          }

          {userToken && (
            <>
              {/* <div className="mt-2  w-100">
                <h6 className="mb-0 fw-bold mb-0">کد تخفیف :</h6>

                <div className="mt-0 d-flex align-items-center">
                  <div className="col-9 d-flex flex-column position-relative">
                    <input
                      type="text"
                      style={{
                        padding: '7px 10px'
                      }}
                      className=" mx-1 mt-2 fs-7 rounded caro-border-primary border"
                      value={codeValue}
                      id="code"
                      onChange={(e) => setCodeValue(e.target.value)}
                    />
                    {
                      codeValueError &&
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-20px',
                          fontSize: '12px',
                          right: '5px'
                        }}
                        className="text-danger">{codeValueError}</span>
                    }
                  </div>
                  <div className="col-2" style={{ marginTop: '7px' }}>
                    <button onClick={handleSetCodeInProducts} className="btn btn-success mx-1">
                      <span style={{ fontSize: '14px' }}>بررسی</span>
                    </button>
                  </div>
                </div>
              </div> */}
              {canUserUseBalance && (
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
              )}
            </>
          )}

          {factor && factor?.cartItems?.length > 0 && (
            <>
              <SectionCalculation
                calculationIcon={factorsvg}
                calculationText="فاکتور"
                calculationTextStyle={"factor"}
              />
              <div
                className="p-3 factor-info w-100"
                style={{
                  border: "2px solid rgba(151, 48, 121, 1)",
                  borderRadius: "10px",
                }}
              >
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
              </div>
            </>
          )}
          <div className=" flex flex-column justify-content-center align-align-align-items-center w-100 mt-4">
            <Button
              variant="contained"
              color="primary"
              className=" py-3 w-100"
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

              {!userToken && "برای خرید لطفا ابتدا وارد شوید."}
            </Button>
          </div>
        </>
      )}
      <br />

      <Dialog onClose={handleToggleBirthDayUser} open={isBirthDayuserDialog}>
        <DialogContent>
          <h6 className="text-center" style={{ lineHeight: "27px" }}>
            کاربر گرامی برای ادامه فرایند ثبت سفارش لطفا{" "}
            <span className="text-danger">تاریخ تولد</span> خود را وارد کنید!
          </h6>
          <Button
            onClick={handleNavigateToComplateBirthDay}
            className="w-100 mt-2"
            variant="contained"
            color="primary"
          >
            <span>ثبت تاریخ تولد</span>
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CheckoutCart;
