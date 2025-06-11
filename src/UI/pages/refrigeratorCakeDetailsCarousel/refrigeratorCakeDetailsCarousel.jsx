import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  branches_apiCalls,
  refrigeratorCake_apiCalls,
} from "../../../core/services/agent";
import { formatNumber } from "../../../core/utility/helperFunctions";
import RefrigeratorCakeCarouseltem from "./components/RefrigeratorCakeCarouseltem";
import RefrigeratorCakeSubmitOrderButton from "./components/submitOrderButton";
import "./components/TomorrowCakeDetailCarouselItem.scss";
import { Swiper, SwiperSlide } from "swiper/react";
///////////////////////////////////////////
import { Carousel } from "3d-react-carousal";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useWindowDimensions } from "../../../core/custom-hooks/getWindowDimensions";
import moment from "moment";
import { calculateDiff } from "../../../core/utility/utils";

const getFrom = (time) => {
  const miliseconds = 1000 * 60 * 6;
  const total = new Date(time).getTime() - miliseconds;
  const from = new Date(total);
  return from;
};
///////////////////////////////////////////
const RefrigeratorCakeDetailsCarousel = () => {
  const {
    handleClose,
    handleOpen,
    openLoading: cakeDetailsIsFetching,
  } = useLoadingContext();
  ///////

  ///////// get all cakes details
  const location = useLocation();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState();
  const [cakes, setCakes] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [progress, setProgress] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const { refrigeratorProducts_methods, addItem, shopBasketData } =
    useShopBasketContext();
  useEffect(() => {
    if (location.state?.cakes) {
      handleOpen();
      Promise.allSettled(
        location.state?.cakes.map((cake) => {
          return apiCaller({
            api: refrigeratorCake_apiCalls.apiCall_getRefrigeratorCakeDetail,
            apiArguments: { cakeId: cake?.id },
          });
        })
      )
        .then((resps) => {
          setCakes(
            resps
              .filter(
                (resp) =>
                  resp.status === "fulfilled" && resp.value.status === 200
              )
              .map((resp) => resp.value.data.data)
          );
        })
        .catch((err) => {})
        .finally(() => {
          setTimeout(() => {
            handleClose();
          }, 500);
        });
    }
  }, [location.state]);
  //////////////////
  useEffect(() => {
    if (cakes?.length > 0 && swiper) {
      const { selectedCakeId } = location.state;
      const index = cakes.findIndex((it) => it.id == selectedCakeId);
      if (index >= 0) {
        swiper.activeIndex = index;
        setCurrentSlide(index);
      }
    }
  }, [cakes, swiper]);
  //////////////////
  const [isAvailability, setIsAvailability] = useState({});

  const [textAreaText, setTextAreaText] = useState({});
  const handleTypingTextArea = (id, e) => {
    setTextAreaText({ ...textAreaText, [`cake_${id}`]: e?.target?.value });
  };

  const getApiCurrentDate = () => {
    apiCaller({
      api: refrigeratorCake_apiCalls.apiCall_currentDate,
      onSuccess: (resp) => {
        if (resp?.status == 200 && resp?.data?.status == 1) {
          setCurrentDate(resp?.data?.data);
        }
      },
      onErrorMessage: "عملیات دریافت زمان با خطا مواجهه شد",
    });
  };

  useEffect(() => {
    // getApiCurrentDate();
  }, []);

  useEffect(() => {
    const initialDate = new Date(currentDate);
    setFormattedTime(initialDate);
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime((prevFormattedTime) => {
        const updatedDate = new Date(prevFormattedTime);
        updatedDate.setSeconds(updatedDate.getSeconds() + 1);
        return updatedDate;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Tehran",
  };

  const date = new Date(formattedTime);
  const formatted = date.toLocaleString("en-US", options);
  const format = "dddd MMM DD YYYY HH:mm:ss";
  const result = moment(formatted, format).format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    const cakeDetails =
      cakes?.length > 0
        ? cakes[currentSlide]
        : cakes?.length > 0
        ? cakes[0]
        : {};
    const firstDiff = calculateDiff(
      cakeDetails?.reservationDate,
      getFrom(cakeDetails?.reservationDate),
      formatted
    );
    if (firstDiff.timeLeft > 0) {
      const diff = calculateDiff(
        cakeDetails?.reservationDate,
        undefined,
        formatted
      );
      const percent = (diff.timeLeft * 100) / firstDiff.timeLeft;
      setProgress(Math.floor(percent));
    }
  }, [result]);

  ////// Handle Favorite
  // const [favorites, setFavorites] = useState([]);
  // const getFavorites = () => {
  //   apiCaller({
  //     api: favorite_apiCalls.apiCall_getAllTomorrowCake,
  //     toastMessage: true,
  //     onErrorMessage: "دریافت لیست علاقه مندی ها با خطا مواجه شد .",
  //     onSuccess: (resp) => {
  //       if (resp.status === 200 && resp.data?.status == 1) {
  //         setFavorites(resp.data.data.map((item) => item.id));
  //       }
  //     },
  //   });
  // };
  // const onAddedToFavorites = (id) => {
  //   setFavorites([...favorites, id]);
  // };
  // const onRemovedFromFavorites = (id) => {
  //   const index = favorites.findIndex((it) => it.id == id);
  //   if (index >= 0) {
  //     const clonedList = [...favorites];
  //     clonedList.splice(index, 1);
  //     setFavorites(clonedList);
  //   }
  // };
  // const isInFavorites = (id) =>
  //   favorites && favorites?.length > 0 && favorites.some((it) => it === id);
  // useEffect(() => {
  //   getFavorites();
  // }, []);

  const onSlideChange = (e) => {
    setCurrentSlide(e);
  };
  const getAvailabilityApi = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_getBranchAvailability,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.status == 1) {
          setIsAvailability(resp?.data?.data);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  useEffect(() => {
    getAvailabilityApi();
  }, []);
  const renderCarouselItems = () => {
    return cakes.map((cake, index) => (
      <RefrigeratorCakeCarouseltem
        key={cake?.id}
        handleTypingTextArea={handleTypingTextArea}
        textAreaText={textAreaText}
        // onAddedToFavorites={onAddedToFavorites}
        // onRemovedFromFavorites={onRemovedFromFavorites}
        // isInFavorites={isInFavorites(cake.id)}
        cake={cake}
      />
    ));
  };
  const renderCarouselWithMemo = useMemo(() => {
    if (cakes?.length > 0)
      return (
        <Carousel
          onSlideChange={onSlideChange}
          slides={renderCarouselItems()}
          arrows={false}
        />
      );
    else return <></>;
  }, [cakes]);
  //////////////////////////////////////
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);
  const [selectedCakeId, setSelectedCakeId] = useState();
  const handleNavigateToRegisterOrder = (id) => {
    setSelectedCakeId(id);
    // if (isAvailability.isAvailableRefrigeratorCake) {
    if (progress > 0) {
      toast.warn("کاربر گرامی این کیک توسط شخص دیگری رزرو شده است");
    } else {
      if (refrigeratorProducts_methods.getItem(id)) {
        navigate("/checkout-cart");
      } else {
        if (!refrigeratorProducts_methods.doesExists(selectedCakeId)) {
          const rd = new Date().getTime() + 1000 * 60 * 10;
          addItem({
            cartItemType: 0,
            refrigeratorCakeId: id,
            reservationDate: rd,
          });
          setShouldGoToBasket(true);
          // apiCaller({
          //   api: refrigeratorCake_apiCalls.apiCall_reserveCake,
          //   apiArguments: { cakeId: id },
          //   toastMessage: true,
          //   onError: (resp) => {
          //     if (
          //       resp?.response &&
          //       resp?.response?.status == 404 &&
          //       resp?.response?.data?.errors?.[0]
          //     ) {
          //       toast.error(resp?.response?.data?.errors?.[0]);
          //     } else {
          //       toast.error("رزرو کیک با خطا مواجه شد .");
          //     }
          //   },
          //   onSuccess: (resp) => {
          //     if (resp.status === 200 && resp.data?.data == 1) {
          //       const rd = new Date().getTime() + 1000 * 60 * 10;

          //     }
          //   },
          // });
        } else {
          setShouldGoToBasket(true);
        }
      }
    }
    // } else {
    //   toast.warn(isAvailability.refrigeratorCakeDescription);
    // }
  };
  useEffect(() => {
    if (shouldGoToBasket) {
      let doesCakeExist =
        refrigeratorProducts_methods.doesExists(selectedCakeId);
      if (!doesCakeExist) return;
      else {
        // navigate('/checkout-cart');
        navigate("/checkout-cart");
      }
    }
  }, [shouldGoToBasket, shopBasketData]);
  ////////////////////////////////////
  const onSlideChangee = (e) => {
    setCurrentSlide(e.activeIndex);
  };

  ///////////////////////////////////////
  return (
    <div className="w-100">
      {/* <div
        style={{
          height:
            "calc(100vh - 55px - env(safe-area-inset-bottom) - env(safe-area-inset-top) - 56px)",
          width: "1.2rem",
          position: "fixed",
          top: "56px",
          zIndex: "100",
          right: `calc( ${
            width <= 576 ? "0px" : (width - 576) / 2 + "px"
          }  + env(safe-area-inset-right))`,
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <ArrowRight
          htmlColor={currentSlide === 0 ? "#e38cca" : "#CB7640"}
          onClick={() => {
            swiper.slidePrev();
          }}
          sx={{
            fontSize: "2.5rem",
          }}
        />
      </div> */}
      {/* <div
        style={{
          height:
            "calc(100vh - 55px - env(safe-area-inset-bottom) - env(safe-area-inset-top) - 56px)",
          width: "1.2rem",
          position: "fixed",
          top: "56px",
          zIndex: "100",
          left: `calc( ${
            width <= 576 ? "0px" : (width - 576) / 2 + "px"
          }  + env(safe-area-inset-left))`,
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <ArrowLeft
          htmlColor={currentSlide === cakes?.length - 1 ? "#e38cca" : "#CB7640"}
          onClick={() => {
            swiper.slideNext();
          }}
          sx={{
            fontSize: "2.5rem",
          }}
        />
      </div> */}
      {/* //////////////////////// */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={{ clickable: true }}
        autoHeight
        onSwiper={setSwiper}
        onSlideChange={onSlideChangee}
      >
        {cakes &&
          cakes?.length > 0 &&
          cakes.map((cake, index) => (
            <SwiperSlide key={cake.id}>
              <RefrigeratorCakeCarouseltem
                key={cake?.id}
                handleTypingTextArea={handleTypingTextArea}
                textAreaText={textAreaText}
                // onAddedToFavorites={onAddedToFavorites}
                // onRemovedFromFavorites={onRemovedFromFavorites}
                // isInFavorites={isInFavorites(cake.id)}
                cake={cake}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <div style={{ marginBottom: "150px" }}></div>
      {/* ...................... */}
      <RefrigeratorCakeSubmitOrderButton
        cakeDetailsIsFetching={cakeDetailsIsFetching}
        cakeDetails={
          cakes?.length > 0
            ? cakes[currentSlide]
            : cakes?.length > 0
            ? cakes[0]
            : {}
        }
        handleNavigateToRegisterOrder={handleNavigateToRegisterOrder}
      />
    </div>
  );
};

export default RefrigeratorCakeDetailsCarousel;
