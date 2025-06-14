import React, { useEffect, useState } from "react";
import RefrigeratorCakeDetailCarouselItem from "../../RefrigeratorCakeDetails/components/RefrigeratorCakeDetailCarouselItem/RefrigeratorCakeDetailCarouselItem";
import { useLocation, useNavigate, useParams } from "react-router";
import { useLoadingContext } from "../../../../core/contexts/LoadingContext/LoadingContext";
import {
  refrigeratorCake_apiCalls,
  tomorrowCake_apiCalls,
} from "../../../../core/services/agent";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { locationSearchStringToObject } from "../../../../core/utility/utils";
import TomorrowCakeDetailCarouselItem from "../../TomorrowCakeDetails/components/TomorrowCakeDetailCarouselItem.jsx/TomorrowCakeDetailCarouselItem";
import OrdinaryButton from "../../../components/OrdinaryButton/OrdinaryButton";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import { useShopBasketContext } from "../../../../core/contexts/ShopBasket/shopBasket.ctx";

const FavoritItemDetail = () => {
    const { refrigeratorProducts_methods, addItem, shopBasketData } =
    useShopBasketContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleOpen, handleClose } = useLoadingContext();
  const [cakeDetails, setCakeDetails] = useState();

  const [cakeText, setCakeText] = useState("");

  const handleCakeTextChange = (e) => {
    setCakeText(e.target.value);
  };

  /////////////
  const { id, type } = useParams();

  const getRefrigeratorCakeDetail = () => {
    apiCaller({
      api: refrigeratorCake_apiCalls.apiCall_getRefrigeratorCakeDetail,
      apiArguments: { cakeId: id },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          setCakeDetails(resp?.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  const getTomorrowCakeDetail = () => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_getTomorrowCakeDetail,
      apiArguments: { cakeId: id },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          setCakeDetails(resp?.data?.data);
        }
      },
      onStart: () => {
        handleOpen();
      },
      onEnd: () => {
        handleClose();
      },
    });
  };

  useEffect(() => {
    if (type == "0") {
      getRefrigeratorCakeDetail();
    } else if (type == "1") {
      getTomorrowCakeDetail();
    } else {
      return false;
    }
  }, [id, type]);

  const handleNavigateToCheckoutPage = () => {
    if (refrigeratorProducts_methods.getItem(id)) {
        navigate('/checkout-cart');
      } else {
        addItem({
          cartItemType: 0,
          refrigeratorCakeId: id,
        });
        navigate('/checkout-cart');
      }
  };

  const handleNavigateTomorrow = () => {
    let orderPayload = {
      cakeId: id,
      cakeDetails: cakeDetails,
      anticipatedWeight: 0,
    };

    const qo = locationSearchStringToObject(location?.search || {});
    if (cakeDetails.canWriteOnCake) {
      orderPayload = {
        ...orderPayload,
        cakeText: "",
      };
    }
    navigate("/tomorrow-cake-order-submit?type=" + type, {
      state: {
        orderPayload,
      },
    });
  };

  return (
    <div className="d-flex flex-column position-relative">
      {cakeDetails &&
        (type == "0" ? (
          <>
            <RefrigeratorCakeDetailCarouselItem
              handleCakeTextChange={handleCakeTextChange}
              {...cakeDetails}
            />
            <div style={{ marginBottom: "50px" }}></div>

            <div
              style={{
                zIndex: "1000",
                bottom: "0",
                boxShadow: "0",
                right: "0",
                left: "0",
                margin: "0 auto",
                maxWidth: "576px",
              }}
              className="w-100 position-fixed"
            >
              <OrdinaryButton
                buttonText={`رفتن به سبد خرید / (${
                  formatNumber(cakeDetails?.price) ?? "..."
                } تومان)`}
                handleOnClick={handleNavigateToCheckoutPage}
                buttonClasses="rounded-0 py-3 "
                holderStyles={{
                  zIndex: "1000",
                }}
                buttonStyles={{
                  zIndex: "1000",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <TomorrowCakeDetailCarouselItem
              handleCakeTextChange={handleCakeTextChange}
              {...cakeDetails}
            />
            <div style={{ marginBottom: "50px" }}></div>

            <div
              style={{
                zIndex: "1000",
                bottom: "env(safe-area-inset-bottom)",
                maxWidth: "576px",
                right: "0",
                left: "0",
                margin: "0 auto",
              }}
              className="w-100 position-fixed "
            >
              <OrdinaryButton
                buttonText={`ادامه خرید / مبلغ بیعانه : ${
                  formatNumber(cakeDetails?.payPrice) ?? "..."
                } تومان`}
                buttonClasses="rounded-0 py-3"
                holderStyles={{ zIndex: "1000" }}
                buttonStyles={{ zIndex: "1000" }}
                handleOnClick={handleNavigateTomorrow}
              />
            </div>
          </>
        ))}
    </div>
  );
};

export default FavoritItemDetail;
