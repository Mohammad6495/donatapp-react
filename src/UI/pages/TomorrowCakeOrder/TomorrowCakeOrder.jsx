import React, { useState, useEffect } from "react";
import OrdinaryButton, {
  SimpleButton,
} from "../../components/OrdinaryButton/OrdinaryButton";
import CakeItem from "../CheckoutCart/components/CakeItem/CakeItem";
import "./styles/TomorrowCakeOrder.scss";
import { useLocation, useNavigate } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  branches_apiCalls,
  customerAddress_apiCalls,
  products_apiCalls,
  saletTime_apiCalls,
  tomorrowCake_apiCalls,
} from "../../../core/services/agent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLoadingContext } from "./../../../core/contexts/LoadingContext/LoadingContext";
import { toast } from "react-toastify";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useProfileContext } from "./../../../core/contexts/UserProfileContext/UserProfileContext";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import "./styles/TomorrowCakeOrder.scss";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import {
  getCustomDate,
  locationSearchStringToObject,
  TravellerCollection,
} from "../../../core/utility/utils";
import SelectSendTime from "../TomorrowCakeDetails/components/TomorrowCakeDetailCarousel/selectSendTime";
import {
  eraseCookie,
  getCookie,
  setCookie,
} from "../../../core/utility/cookie";
import ShopBasketExtraProduct from "../CheckoutCart/components/ExtraProductSection/shopbasket-extraProductItem";

import extraBanner from "../../../assets/images/extra.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TomorrowCakeOrder = () => {
  const navigate = useNavigate();
  /////////
  const { userData } = useProfileContext();
  /////////
  const { handleOpen, handleClose } = useLoadingContext();
  /////////
  const location = useLocation();
  //////////
  const [preparementFactorData, setPreparementFactorData] = useState();
  /////////
  const [isAvailability, setIsAvailability] = useState({});
  //////////
  const [orderPayload, setOrderPayload] = useState();
  //////////
  const [adressesList, setAdressesList] = useState([]);

  const [sendingTime, setSendingTime] = useState();
  const [sendingDay, setSendingDay] = useState(false);
  const [sendingDayCount, setSendingDayCount] = useState(1);
  const [sendingDayTitle, setSendingDayTitle] = useState();
  const [isDarbCaro, setIsDarbCaro] = useState('false');

  const [saleTimesIsFetching, setSaleTimesIsFetching] = useState(false);
  const [sendingTimeList, setSendingTimeList] = useState([]);
  const getAllSaleTime = () => {
    apiCaller({
      api: saletTime_apiCalls.apiCall_getSaleTime,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          const list = resp.data.data.map((it) => {
            // WAY 1 :
            const obj = {
              start: it.start.split(":")[0] + ":" + it.start.split(":")[1],
              end: it.end.split(":")[0] + ":" + it.end.split(":")[1],
              id: it.id,
            };
            // WAY 2 :
            return obj;
          });
          setSendingTimeList(list);
        }
      },
      onError: (err) => {},
      onStart: () => {
        handleOpen();
        setSaleTimesIsFetching(true);
      },
      onEnd: () => {
        handleClose();
        setSaleTimesIsFetching(false);
      },
    });
  };
  useEffect(() => {
    getAllSaleTime();
  }, []);

  ////TimesStatus///
  const [timeStatus, setTimeStatus] = useState();
  const getTimesStatus = () => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_getTimesStatus,
      onSuccess: (resp) => {
        if (resp.status == 200 && resp?.data?.statusCode == 200) {
          setTimeStatus(resp?.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  /////////
  const getAdressesList = () => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getCustomerAddressList,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.statusCode == 200) {
          setAdressesList(resp.data.data);
        }
      },
    });
  };
  useEffect(() => {
    getTimesStatus();
  }, []);
  /////////
  const preparementFactor = () => {
    const cookieOrderPayload = getCookie("orderPayload");
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_prepaymentfactor,
      apiArguments: {
        cakeId:
          location.state?.orderPayload.cakeId ||
          JSON.parse(cookieOrderPayload).cakeId,
      },
      onSuccess: (resp) => {
        setPreparementFactorData(resp.data?.data);
        if (userToken)
          if (resp.data?.data?.requireAddress) {
            getAdressesList();
          }
      },
    });
  };

  const [extraProducts, setExtraProducts] = useState([]);
  const [selectListExtraItem, setSelectListExtraItem] = useState([]);
  const getExtraProducts = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getAllExtras,
      apiArguments: {
        CategoryId: undefined,
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.statusCode == 200) {
          setExtraProducts(resp.data.data);
        }
      },
    });
  };
  useEffect(() => {
    getExtraProducts();
  }, []);

  /////////
  const { userToken } = useAuthContext();
  useEffect(() => {
    // if (userToken)
    const cookieOrderPayload = getCookie("orderPayload");
    if (location.state?.orderPayload || cookieOrderPayload) preparementFactor();
  }, [location.state?.orderPayload?.cakeId, userToken]);
  useEffect(() => {
    if (!location.state?.orderPayload) {
      const cookieOrderPayload = getCookie("orderPayload");
      if (cookieOrderPayload) {
        setOrderPayload(JSON.parse(cookieOrderPayload));
      } else {
        navigate(-1);
      }
    } else setOrderPayload(location.state?.orderPayload);
  }, [location.state?.orderPayload]);
  ///////////
  const [selectedAdressId, setSelectedAdressId] = useState();
  useEffect(() => {
    if (userData?.defaultAddressId) {
      setSelectedAdressId(userData?.defaultAddressId);
    }
  }, [userData]);
  const handleChangeInput = (event) => {
    setSelectedAdressId(event?.target.value);
  };
  const handleChangeInputTime = (event) => {
    setSendingTime(event.target.value);
  };
  const handleChangeInputDayTime = (event) => {
    if (event.target.value == "0") {
      setSendingDay(false);
      setSendingDayCount(1);
      setSendingDayTitle(event.target.value);
    } else {
      setSendingDay(true);
      setSendingDayCount(2);
      setSendingDayTitle(event.target.value);
    }
  };

  useEffect(() => {
    const qo = locationSearchStringToObject(location?.search || {});
    if (qo?.type == "1") {
      setSendingDay(false);
      setSendingDayCount(1);
      setSendingDayTitle(qo?.type);
    } else {
      setSendingDay(true);
      setSendingDayCount(2);
      setSendingDayTitle(qo?.type);
    }
  }, []);
  ///// sp
  // const [sendPrice, setSendPrice] = useState(0);
  // const { branch, allBranches } = useBranchesContext();
  // useEffect(() => {
  //   if (
  //     selectedAdressId &&
  //     adressesList?.length > 0 &&
  //     allBranches?.length > 0
  //   ) {
  //     console.log(selectedAdressId);
  //     // setSendPrice()
  //     const currentBranchData = allBranches.find((b) => b.id == branch);
  //     const currentAddressData = adressesList.find(
  //       (a) => a.id == selectedAdressId
  //     );
  //     apiCaller({
  //       api: calcPrice_apiCalls.apiCall_getCalculatedPrice,
  //       apiArguments: {
  //         branchLat: currentBranchData?.lat,
  //         branchLng: currentBranchData?.lng,
  //         destiniLat: currentAddressData?.lat,
  //         destiniLng: currentAddressData?.long,
  //       },
  //       toastMessage: true,
  //       onErrorMessage: "محاسبه هزینه با خطا مواجه شد .",
  //       onSuccess: (resp) => {
  //         if (resp.status === 200 && resp.data.statusCode === 200) {
  //           setSendPrice(resp?.data?.data);
  //         } else {
  //           toast.error("محاسبه هزینه با خطا مواجه شد .");
  //         }
  //       },
  //       // onStart: () => setIsCalculating(true),
  //       // onEnd: () => setIsCalculating(false),
  //     });
  //   }
  // }, [selectedAdressId, adressesList, allBranches]);

  useEffect(() => {
    const cookieOrderPayload = getCookie("orderPayload");
    if (cookieOrderPayload) {
      const parsedOrderPayload =
        typeof cookieOrderPayload == "object"
          ? JSON.parse(cookieOrderPayload)
          : undefined;
      if (JSON.stringify(orderPayload) !== JSON.stringify(parsedOrderPayload)) {
        setOrderPayload(parsedOrderPayload);
      }
    }
  }, []);

  useEffect(() => {
    const cookieOrderPayload = getCookie("orderPayload");
    if (JSON.stringify(location?.state?.orderPayload) !== cookieOrderPayload) {
      setCookie(
        "orderPayload",
        JSON.stringify(
          location?.state?.orderPayload || JSON.parse(cookieOrderPayload)
        )
      );
    }
  }, [location?.state?.orderPayload]);
  //////
  const handleSubmitCheckOut = () => {
    const isDarbCaroValue = isDarbCaro == 'true' ? true : false;
    if (!userToken) {
      toast.error(
        <div className="text-wrap">
          برای ثبت سفارش باید ابتدا ثبت نام کنید یا وارد شوید .
        </div>
      );
      return;
    }

    if (!sendingDayTitle) {
      toast.error("لطفا زمان ارسال را انتخاب نمایید .", {
        position: "top-center",
        // autoClose: 5000000000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "light",
        style: {
          // direction: "ltr"
        },
      });
      document.querySelector(".hidden-scrollbar").scrollTop =
        document.querySelector(".hidden-scrollbar").scrollHeight;
      return false;
    }
    if (!sendingTime) {
      toast.error("لطفا ساعت ارسال را انتخاب نمایید .", {
        position: "top-center",
        // autoClose: 5000000000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: "light",
        style: {
          // direction: "ltr"
        },
      });
      return false;
    }
    if (!orderPayload.cakeDetails) return;
    if (preparementFactorData?.requireAddress) {
      if (!selectedAdressId) {
        toast.error("لطفا یک آدرس انتخاب کنید .");
        return;
      }
    }
    const qo = locationSearchStringToObject(location?.search || {});
    // const getAvailabilityType = () => {
    //   if (qo?.type = "1") {
    //     return isAvailability.isAvailableTomorrowCake
    //   } else {
    //     return isAvailability.isAvailableTheDayAfterTomorrowCake
    //   }
    // }

    if (!isAvailability.isAvailableTomorrowCake && qo?.type == "1") {
      toast.warn("سایت دونات از ساعت 12 ظهر تا 21 باز می باشد");
      return false;
    }
    if (!isAvailability.isAvailableTheDayAfterTomorrowCake && qo?.type == "") {
      toast.warn("سایت دونات از ساعت 12 ظهر تا 21 باز می باشد");
      return false;
    }

    const itemsExtra = selectListExtraItem.map((item) => {
      return {
        productId: item?.id,
        quantity: item?.count,
      };
    });

    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_checkOutTomarrowCakeFactor,
      apiArguments: {
        tomorrowCakeId: orderPayload.cakeId,
        saleTimeId: sendingTime,
        isForTheDayAfterTomorrow: sendingDay,
        customerAddressId: isDarbCaroValue ? "" : preparementFactorData?.requireAddress
          ? selectedAdressId
          : "",
        isDarbCaro: isDarbCaroValue,
        items: itemsExtra,
      },
      onStart: handleOpen,
      onEnd: handleClose,
      onError: (err) => {
        if (err?.response?.errors?.[0]) {
          toast.error(err?.response?.errors?.[0]);
        } else toast.error("ثبت سفارش با خطا مواجه شد .");
      },
      onSuccess: (resp) => {
        if (resp?.data?.data?.gatewayTransporter?.descriptor?.url) {
          eraseCookie("orderPayload");
          navigate(
            `/gateway-redirect?url=${resp?.data?.data?.gatewayTransporter?.descriptor?.url}`
          );
        }
      },
    });
  };

  const doesExistsInBasket = (id) => {
    if (!selectListExtraItem || selectListExtraItem.length === 0) return false;
    return selectListExtraItem.some((item) => item.id === id);
  };

  const addExtraProductToBasket = () => {
    if (
      locationSearchStringToObject(location.search)?.extraId &&
      location?.search
    ) {
      const listIdExtra = locationSearchStringToObject(
        location.search
      )?.extraId?.split(",");
      const newExtraProducts = listIdExtra.reduce((acc, id) => {
        const findIndexExtra = extraProducts?.findIndex((a) => a.id == id);
        if (findIndexExtra !== -1 && !acc.some((item) => item.id == id)) {
          acc.push({
            ...extraProducts[findIndexExtra],
            count: 1,
          });
        }
        return acc;
      }, []);
      setSelectListExtraItem(newExtraProducts);
    }
  };

  useEffect(() => {
    if (
      locationSearchStringToObject(location.search)?.extraId &&
      location?.search
    ) {
      const listIdExtra = locationSearchStringToObject(
        location.search
      )?.extraId?.split(",");
      if (extraProducts?.length > 0 && listIdExtra?.length > 0) {
        addExtraProductToBasket();
      }
    }
  }, [extraProducts, location?.search]);

  // useEffect(() => {
  //   if (selectListExtraItem.length === 0) {
  //     const queryParams = new URLSearchParams(location.search);
  //     queryParams.delete('extraId');
  //     navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  //   }
  // }, [selectListExtraItem]);

  const handleDeleteInSelectExtra = (id) => {
    const findIndexSelectExtra = selectListExtraItem?.findIndex(
      (a) => a.id == id
    );
    if (findIndexSelectExtra != -1) {
      const allSelect = [...selectListExtraItem];
      allSelect.splice(findIndexSelectExtra, 1);
      setSelectListExtraItem(allSelect);
    }
  };
  const handleIncrementInSelectExtra = (id) => {
    const findIndexSelectExtra = selectListExtraItem?.findIndex(
      (a) => a.id === id
    );
    if (findIndexSelectExtra !== -1) {
      let allSelect = [...selectListExtraItem];

      if (
        allSelect[findIndexSelectExtra] &&
        allSelect[findIndexSelectExtra].count !== undefined
      ) {
        allSelect[findIndexSelectExtra].count += 1;
      }

      setSelectListExtraItem(allSelect);
    }
  };

  const handleDecrementInSelectExtra = (id) => {
    const findIndexSelectExtra = selectListExtraItem?.findIndex(
      (a) => a.id === id
    );
    if (findIndexSelectExtra !== -1) {
      let allSelect = [...selectListExtraItem];

      if (
        allSelect[findIndexSelectExtra] &&
        allSelect[findIndexSelectExtra].count !== undefined
      ) {
        if (allSelect[findIndexSelectExtra].count == 1) {
          handleDeleteInSelectExtra(id);
          return false;
        }
        allSelect[findIndexSelectExtra].count -= 1;
      }

      setSelectListExtraItem(allSelect);
    }
  };

  const handleNavigateToExtraProducts = () => {
    const qo = locationSearchStringToObject(location?.search || {});
    if (qo?.type) {
      navigate(
        `/extra-products/${qo?.type}?returnUrl=/tomorrow-cake-order-submit`,
        {
          state: {
            orderPayload,
          },
        }
      );
    }
  };

  const handleChange = (event) => {

    setIsDarbCaro(event.target.value);
  };

  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 px-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <div className="d-flex flex-column w-100">
        {/*  */}
        <div className="">
          <span className="fs-7">سفارش شما</span>
          {orderPayload?.cakeDetails && (
            <CakeItem orderPayload={orderPayload} />
          )}
        </div>

        {
          // extraProducts?.length !== 0 &&
          // <div dir="rtl" className="d-block mt-3 p-0">
          //   <div className="d-flex justify-content-between">
          //     <div className="d-block fw-bold ">
          //       {/* <LocalOfferIcon className="me-2" color="primary" /> */}
          //       پیشنهاد های ما :
          //     </div>
          //     {/* <Link to='/extra-products' className="text-decoration-none">مشاهده بیشتر</Link> */}
          //   </div>
          //   <div style={{ display: "block" }} className=" mt-3">
          //     {/* <Swiper spaceBetween={16} slidesPerView="auto" dir="rtl"> */}
          //     <FreeSlider>
          //       {extraProducts
          //         .filter((product) => {
          //           // بررسی اینکه آیا محصول در selectListExtraItem وجود دارد یا خیر
          //           const existsInBasket = doesExistsInBasket(product.id);
          //           return !existsInBasket; // فقط محصولاتی که در سبد نیستند نمایش داده می‌شوند
          //         })
          //         .map((ep, index) => (
          //           <ExtraProductItem
          //             key={ep.id}
          //             addExtraProductToBasket={addExtraProductToBasket}
          //             className={index > 0 ? "ms-3" : "ms-0"}
          //             {...ep}
          //           />
          //         ))}
          //     </FreeSlider>
          //     {/* </Swiper> */}
          //   </div>
          // </div>
          <div
            onClick={handleNavigateToExtraProducts}
            className="w-100 d-flex justify-content-center align-items-center cursor-pointer my-2"
          >
            <LazyLoadImage
              alt="NO_PIC"
              placeholder={
                <Skeleton variant="rectangular" width={"100%"} height={150} />
              }
              className="img-fluid rounded"
              src={extraBanner}
            />
          </div>
        }

        {selectListExtraItem && selectListExtraItem.length > 0 && (
          <div className="d-flex flex-column mt-2">
            <h6 className="fw-bold">محصولات انتخاب شده: </h6>
            {selectListExtraItem.map((ep) => (
              <ShopBasketExtraProduct
                key={ep.id}
                onDelete={() => {
                  handleDeleteInSelectExtra(ep?.id);
                }}
                onIncrement={() => {
                  handleIncrementInSelectExtra(ep?.id);
                }}
                onDecrement={() => {
                  handleDecrementInSelectExtra(ep?.id);
                }}
                itemCount={ep.count}
                {...ep}
              />
            ))}
          </div>
        )}
        <div className="divider my-2 w-100"></div>
        <div className="d-flex flex-column mt-2 mb-2">
          {orderPayload?.cakeDetails?.minWeight && (
            <div className="d-flex justify-content-between align-items-center my-2">
              <span className="fs-8">وزن تقریبی :</span>
              <span className="fs-8">
                {/* {orderPayload?.cakeDetails?.anticipatedWeight ?? ""} */}
                {`از ${orderPayload?.cakeDetails?.minWeight ?? 0} گرم تا ${
                  orderPayload?.cakeDetails?.maxWeight ?? 0
                } گرم`}
              </span>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center my-1">
            <span className="fs-8"> زمان ارسال : </span>
            {sendingTimeList.find((it) => it.id == sendingTime) ? (
              <span className="fs-8">
                <span>
                  {getCustomDate(sendingDayCount) + " "}
                  {` از ساعت ${
                    sendingTimeList.find((it) => it.id == sendingTime)?.start
                  } تا ساعت ${
                    sendingTimeList.find((it) => it.id == sendingTime)?.end
                  } `}
                </span>
              </span>
            ) : (
              <span className="fs-8 text-danger">
                در حال حاضر بازه ساعتی را انتخاب نکرده اید
              </span>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center my-1">
            <span className="fs-8">قیمت واحد (کیلوگرم) :</span>
            <span className="fs-8">
              {`${formatNumber(orderPayload?.cakeDetails?.pricePerKG)} تومان`}
            </span>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fs-8"> هزینه ارسال : </span>
            <span className="fs-8">{formatNumber(sendPrice) + " تومان"}</span>
          </div> */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fs-8"> مبلغ بیعانه : </span>
            {orderPayload?.cakeDetails?.payPrice != -1 &&
              orderPayload?.cakeDetails?.payPrice && (
                <span className="fs-8">
                  {`${formatNumber(orderPayload?.cakeDetails?.payPrice)} تومان`}
                </span>
              )}
          </div>
          {TravellerCollection(selectListExtraItem) != 0 && (
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="fs-8"> هزینه محصولات : </span>
              {orderPayload?.cakeDetails?.payPrice != -1 &&
                orderPayload?.cakeDetails?.payPrice && (
                  <span className="fs-8">
                    {`${formatNumber(
                      TravellerCollection(selectListExtraItem)
                    )} تومان`}
                  </span>
                )}
            </div>
          )}
          {TravellerCollection(selectListExtraItem) != 0 && (
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="fs-8"> مبلغ بیعانه قابل پرداخت : </span>
              {orderPayload?.cakeDetails?.payPrice != -1 &&
                orderPayload?.cakeDetails?.payPrice && (
                  <span className="fs-8">
                    {`${formatNumber(
                      orderPayload?.cakeDetails?.payPrice +
                        TravellerCollection(selectListExtraItem)
                    )} تومان`}
                  </span>
                )}
            </div>
          )}
        </div>
        <SelectSendTime
          handleChangeInput={handleChangeInputTime}
          handleChangeInputDayTime={handleChangeInputDayTime}
          sendingDayTitle={sendingDayTitle}
          sendingTime={sendingTime}
          sendingDayCount={sendingDayCount}
          sendingTimeList={sendingTimeList}
          timeStatus={timeStatus}
          isPosition={true}
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            className="d-flex flex-row justify-content-between align-items-center mt-2"
            value={isDarbCaro}
            onChange={handleChange}
          >
            <FormControlLabel
              onChange={handleChange}
              value={false}
              control={<Radio />}
              label="دریافت درب منزل"
            />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="دریافت درب دونات"
            />
          </RadioGroup>
        </FormControl>
        {adressesList.length > 0 && isDarbCaro == 'false' && (
          <div className="d-flex flex-column w-100 mt-1 tomorrow-cake-address-holder">
            <spanc className="fs-8">آدرس</spanc>
            <FormControl className="w-100 mt-3" sx={{ minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                آدرس
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={selectedAdressId}
                onChange={handleChangeInput}
                autoWidth
                label=" آدرس"
              >
                {/* <MenuItem value={10}>ساعت 11:00 تا 12:00</MenuItem>
              <MenuItem value={21}>ساعت 12:00 تا 13:00</MenuItem>
              <MenuItem value={22}>ساعت 15:00 تا 14:00</MenuItem> */}

                {adressesList.map((it) => (
                  <MenuItem value={it.id} key={it.id}>
                    {it.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

        {/*  */}
        <div className="w-100">
          {adressesList.length > 0 ? (
            <OrdinaryButton
              handleOnClick={handleSubmitCheckOut}
              buttonText="ثبت سفارش و پرداخت بیعانه"
              holderClasses="my-3"
            />
          ) : (
            userData && (
              <OrdinaryButton
                handleOnClick={() => {
                  navigate(
                    "/add-address/?returnUrl=tomorrow-cake-order-submit?type=2"
                  );
                }}
                buttonText="لطفا آدرس خود را ثبت کنید"
                holderClasses="my-3"
              />
            )
          )}

          <SimpleButton
            buttonText="بازگشت و تغییر در سفارش"
            holderClasses="my-3"
            handleOnClick={() => {
              navigate(-1);
            }}
          />
          {!userToken && (
            <Button
              variant="contained"
              color="primary"
              className="w-100 py-2"
              style={{
                borderRadius: "0.5rem",
              }}
              onClick={() => {
                navigate("/register?returnUrl=/tomorrow-cake-order-submit");
              }}
            >
              ثبت نام / ورود
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TomorrowCakeOrder;
