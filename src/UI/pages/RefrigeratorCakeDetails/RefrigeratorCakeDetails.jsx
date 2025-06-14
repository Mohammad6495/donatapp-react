import React, { useState, useEffect } from "react";
// import RefrigeratorCakeDetailCarousel from "./components/RefrigeratorCakeDetailCarousel/RefrigeratorCakeDetailCarousel";
import { useLocation, useNavigate, useParams } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { refrigeratorCake_apiCalls } from "../../../core/services/agent";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import RefrigeratorCakeDetailCarouselItem from "./components/RefrigeratorCakeDetailCarouselItem/RefrigeratorCakeDetailCarouselItem";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useShopBasketContext } from "./../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import useNotRegisteredModal from "../../components/useNotRegisteredModal";

const RefrigeratorCakeDetails = () => {
  const { refrigeratorProducts_methods, addItem, shopBasketData } =
    useShopBasketContext();
  const [cakeDetails, setCakeDetails] = useState();
  const navigate = useNavigate();
  const { handleClose, handleOpen } = useLoadingContext();
  /////////////
  const { id } = useParams();

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

  useEffect(() => {
    getRefrigeratorCakeDetail();
  }, [id]);

  ///////////////
  ///////////////

  // description handleChange
  const [cakeText, setCakeText] = useState("");
  const handleCakeTextChange = (e) => {
    setCakeText(e.target.value);
  };
  // handle submit
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);
  const { userToken } = useAuthContext();
  const {
    handleClose: handleCloseAlertModal,
    handleOpen: handleOpenAlertModal,
    render: renderAlertModal,
  } = useNotRegisteredModal({ intialOpenState: false });
  const handleNavigateToCheckoutPage = () => {
    // if (!userToken) {
    //   handleOpenAlertModal();
    //   return;
    // }
    if (refrigeratorProducts_methods.getItem(id)) {
      navigate('/checkout-cart');
    } else {
      addItem({
        cartItemType: 0,
        refrigeratorCakeId: id,
      });

      setShouldGoToBasket(true);
    }
  };
  useEffect(() => {
    if (shouldGoToBasket) {
      let doesCakeExist = refrigeratorProducts_methods.doesExists(id);
      if (!doesCakeExist) return;
      else {
        navigate('/checkout-cart');
      }
    }
  }, [shouldGoToBasket, shopBasketData]);
  ///////////
  return (
    <section
      style={{
        overflowY: "auto",
        minHeight:
          "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        marginBottom: "env(safe-area-inset-bottom)",
      }}
      className="mt-0 mx-0 p-0 pt-2 px-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {renderAlertModal()}
      {cakeDetails && (
        <RefrigeratorCakeDetailCarouselItem
          handleCakeTextChange={handleCakeTextChange}
          {...cakeDetails}
        />
      )}

      <div style={{ marginBottom: "50px" }}></div>

      <div
        style={{
          zIndex: "1000",
          bottom: "calc(0px + env(safe-area-inset-bottom))",
          boxShadow: "0",
          maxWidth: "576px",
        }}
        className="w-100 mx-auto position-fixed shadow-0"
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
            // paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
          }}
        />
      </div>
      <div
        style={{
          height: "env(safe-area-inset-bottom)",
        }}
      ></div>
      <div
        className="w-100 mx-auto position-fixed shadow-0"
        style={{
          height: "calc(0px + env(safe-area-inset-bottom))",
          backgroundColor: "#000",
          zIndex: "10000",
          bottom: "0",
          maxWidth: "576px",
          position: "fixed",
        }}
      ></div>
    </section>
  );
};

export default RefrigeratorCakeDetails;
