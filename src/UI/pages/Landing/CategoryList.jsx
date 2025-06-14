import React, { useEffect, useState } from "react";
import "./styles/styles.scss";
import LandingServices from "./components/LandingServices/LandingServices";
import { toast } from "react-toastify";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { home_apiCalls } from "../../../core/services/agent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";
import roozCake from "../../../assets/images/categoryBanner/Untitle4d-5.png";
import tmmorowCake from "../../../assets/images/Untitled-4 copy.png";
import tmmorowCake2 from "../../../assets/images/category-cake/بـــرای پس فـــردا.png";
import tmmorowCake1 from "../../../assets/images/category-cake/بــــــرای فـــــردا.png";
import orderCake from "../../../assets/images/category-cake/کــــیــــــک سـفــارشـی.png";
import { useNavigate } from "react-router";
import cakeRozImg from "../../../assets/images/category-cake/کیک روز.png";
import pishForoshImg from "../../../assets/images/category-cake/پیش خرید کیک.png";
import { useTipsContext } from "../../../core/contexts/TipsContext/TipsContext";
import { motion } from "framer-motion";

const CategoryList = () => {
  const { branch } = useBranchesContext();
  const [loading, setLoading] = useState(true);
  const { tipsStep, handleNextTips } = useTipsContext();

  const navigate = useNavigate();
  const [branchAvailablityData, setBranchAvailablityData] = useState();

  const handleNavigateToTomorrowCake = (type) => {
    if (!branchAvailablityData.isAvailableTomorrowCake) {
      if (branchAvailablityData?.canSeeTomorrowCake) {
        navigate("/tomorrow-cake/?type=" + type);
        return false;
      }
      toast.warn(branchAvailablityData?.tomorrowCakeDescription);
      return false;
    }
    navigate("/tomorrow-cake/?type=" + type);
  };
  const handleAvailableTheDayAfterTomorrowCake = (type) => {
    if (!branchAvailablityData.isAvailableTheDayAfterTomorrowCake) {
      toast.warn(branchAvailablityData?.tomorrowCakeDescription);
      return false;
    }
    navigate("/tomorrow-cake/?type=" + type);
  };

  const handleNavigateRefrigerator = () => {
    if (!branchAvailablityData.isAvailableRefrigeratorCake) {
      toast.warn(branchAvailablityData?.refrigeratorCakeDescription);
      return false;
    }
    navigate("/refrigerator-cake");
  };

  const handleNavigateToCakeOrder = () => {
    toast.warn("سفارش کیک درحال بروزرسانی است");
    // navigate("/cake-order");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const showOverlay = tipsStep == 1;

  return (
    <section
      style={{
        minHeight:
          "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        overflow: "auto",
      }}
      className="m-0 p-0 pb-2 d-flex flex-column justify-content-start align-items-center landing-section-holder hidden-scrollbar"
    >
      {/* {!showOverlay && (
        <motion.div
          className="overlay-backdrop d-flex justify-content-center align-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )} */}

      <div
        onClick={handleNavigateRefrigerator}
        className="w-100 d-flex justify-content-center align-items-center cursor-pointer mt-2"
      >
        <LazyLoadImage
          alt="NO_PIC"
          src={cakeRozImg}
          style={{
            width: "100%",
            filter: !branchAvailablityData?.isAvailableRefrigeratorCake
              ? "grayscale(100%)"
              : "",
            opacity: !branchAvailablityData?.isAvailableRefrigeratorCake
              ? "0.5"
              : "1",
          }}
        />
      </div>
      <div
        onClick={() => {}}
        className="w-100 d-flex justify-content-center align-items-center cursor-pointer mt-2 mb-3"
      >
        <LazyLoadImage
          alt="NO_PIC"
          src={pishForoshImg}
          style={{
            width: "100%",
            // filter: !branchAvailablityData?.isAvailableRefrigeratorCake
            //     ? "grayscale(100%)"
            //     : "",
            // opacity: !branchAvailablityData?.isAvailableRefrigeratorCake
            //     ? "0.5"
            //     : "1",
          }}
        />
      </div>
      <div className="w-100 d-flex align-items-center mb-2">
        <div
          onClick={() => handleNavigateToTomorrowCake(1)}
          className="col-6 pe-1 d-flex justify-content-center align-items-center cursor-pointer"
        >
          <LazyLoadImage
            alt="NO_PIC"
            placeholder={
              <Skeleton variant="rectangular" width={"100%"} height={150} />
            }
            src={tmmorowCake1}
            style={{
              width: "100%",
              filter: !branchAvailablityData?.isAvailableTomorrowCake
                ? branchAvailablityData?.canSeeTomorrowCake
                  ? ""
                  : "grayscale(100%)"
                : "",
              opacity: !branchAvailablityData?.isAvailableTomorrowCake
                ? branchAvailablityData?.canSeeTomorrowCake
                  ? ""
                  : "0.5"
                : "1",
            }}
          />
        </div>
        <div
          onClick={() => handleAvailableTheDayAfterTomorrowCake(2)}
          className="col-6 ps-1 d-flex justify-content-center align-items-center cursor-pointer"
        >
          <LazyLoadImage
            alt="NO_PIC"
            placeholder={
              <Skeleton variant="rectangular" width={"100%"} height={150} />
            }
            src={tmmorowCake2}
            style={{
              width: "100%",
              filter: !branchAvailablityData?.isAvailableTheDayAfterTomorrowCake
                ? "grayscale(100%)"
                : "",
              opacity:
                !branchAvailablityData?.isAvailableTheDayAfterTomorrowCake
                  ? "0.5"
                  : "1",
            }}
          />
        </div>
      </div>

      {/* <div className="divider mt-2"></div> */}
      <div
        onClick={handleNavigateToCakeOrder}
        className="w-100 d-flex justify-content-center align-items-center cursor-pointer mt-2"
      >
        <LazyLoadImage
          alt="NO_PIC"
          placeholder={
            <Skeleton variant="rectangular" width={"100%"} height={150} />
          }
          src={orderCake}
          style={{
            width: "100%",
            filter: "grayscale(100%)",
            opacity: "0.5",
          }}
        />
      </div>
    </section>
  );
};

export default CategoryList;
