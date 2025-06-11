import React, { useState, useEffect } from "react";
import { Alert, Button, Dialog, Drawer, Snackbar } from "@mui/material";
// import { LocationOnOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";

import {
  useLeftDrawerStyles,
  useRightDrawerStyles,
} from "./../../../core/custom-hooks/useDrawerStyles";
// use Branches Context
import { useShowBranchModalContext } from "../../../core/contexts/ShowBranchModalContext/ShowBranchModalContext";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
// import sariBranchItem from "../../../assets/images/branch-map1.svg";
// import qaemshahrBranchItem from "../../../assets/images/branch-map2.svg";
import { useNavigate, useLocation } from "react-router";
import LandingServices from "./components/LandingServices/LandingServices";
import SimpleMUIDialog from "./../../components/SimpleMUIDialog/SimpleMUIDialog";
import http from "./../../../core/services/http";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";
import { LandingBranchItem } from "./components/LandingBranchItem/LandingBranchItem";
import calcImage from "../../../assets/images/one-caro/click.png";

import { MdOutlineCopyright } from "react-icons/md";

// import bakeryImg from "../../../assets/images/Bakery.png";
import bakeryImg from "../../../assets/images/newBakerySlide.png";
import ramedanBanner from "../../../assets/images/Ramadan.png";
import discountImg from "../../../assets/images/Discount.png";
import norouzBanner from "../../../assets/images/norouz.png";
// import calendarImg from "../../../assets/images/CalendarImg.png";
import calendarImg from "../../../assets/images/tomorowcakeSlide.png";
import { toast } from "react-toastify";
import { getItem } from "../../../core/services/storage/storage";
import { useContext } from "react";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  branches_apiCalls,
  cart_apiCalls,
  customerAddress_apiCalls,
  home_apiCalls,
  tomorrowCake_apiCalls,
  visit_apiCaller,
} from "../../../core/services/agent";
import GeneralOrdersCardItem from "./components/GeneralOrdersCardItem/GeneralOrdersCardItem";
import TomorrowCakeOrdersCardItem from "./components/TomorrowCakeOrdersCardItem/TomorrowCakeOrdersCardItem";
import { useGetUserLocation } from "./utils/useGetUserLocation.hook";
import "./styles/styles.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import CalculatePriceSection from "./components/CalculatePriceSection";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import BannersCarousel from "./components/bannersCarousel/bannersCarousel";
import enamadImg from "../../../assets/images/enamad.png";
import { FiMapPin } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { locationSearchStringToObject } from "../../../core/utility/utils";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useTipsContext } from "../../../core/contexts/TipsContext/TipsContext";

const Landing = () => {
  const { set_validIn, validIn } = useAuthContext();

  const { userClosestBranch, userHasLocation } = useGetUserLocation();
  const { userData } = useProfileContext();
  const location = useLocation();
  const navigate = useNavigate();
  // const [customerAddressList, setCustomerAddressList] = useState();
  const [userAddressData, setUserAddressData] = useState();
  const [userDefAddress, setUserDefAddress] = useState();
  const { set_userToken } = useAuthContext();

  const { handleClose, handleOpen } = useLoadingContext();
  const showModalCtxValues = useShowBranchModalContext();

  const { branch, setBranch, allBranches } = useBranchesContext();
  const { userLocation } = useProfileContext();
  // Drawer Styles Generator
  // Dialog's State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Branch State
  const [branchAddress, setBranchAddress] = useState();

  // Orders States
  const [allGeneralOrder, setAllGeneralOrder] = useState([]);
  // TomorrowCake States
  const [allTomorrowCakeOrder, setAllTomorrowCakeOrder] = useState([]);

  // state
  const [drawerIsOpen, setDrawerOpen] = useState(false);

  const [showFootInfo, setShowFootInfo] = useState(false);


  useEffect(() => {
    const ls = location.search;
    const qo = locationSearchStringToObject(ls);
    if (qo?.token) {
      set_userToken(qo?.token);
      http.setToken(http.tokenKey, qo?.token);
    }
  }, [location.search]);

  useEffect(() => {
    if (document.referrer.includes("instagram.com")) {
      if (!validIn) {
        set_validIn("1");
        http.setToken(http.validInInstagram, "1");
      }
    }
  }, []);

  useEffect(() => {
    if (validIn == "1") {
      var userAgent = navigator.userAgent;
      if (userAgent.match(/Android/i)) {
        navigate("/error-instagram-valid/?device=android");
      } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
        navigate("/error-instagram-valid/?device=ios");
      }
    }
  }, [validIn]);

  // Get All General Orders
  const getAllGeneralOrders = () => {
    apiCaller({
      api: cart_apiCalls.apiCall_activelist,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.status == 1) {
          const findPurchaseRequestStatus = resp?.data?.data;
          setAllGeneralOrder(findPurchaseRequestStatus);
        }
      },
      onError: () => {
        // console.log(err);
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  const { userToken } = useAuthContext();
  useEffect(() => {
    if (userToken) {
      getAllGeneralOrders();
    }
  }, [userToken]);

  // Get All Tomorrow Cake Orders
  const getAllTomorrowCakeOrders = () => {
    apiCaller({
      api: tomorrowCake_apiCalls.apiCall_activelist,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.status == 1) {
          const findPurchaseRequestStatus = resp?.data?.data;
          setAllTomorrowCakeOrder(findPurchaseRequestStatus);
        }
      },
      onError: () => {
        // console.log(err);
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  useEffect(() => {
    if (userToken) getAllTomorrowCakeOrders();
  }, [userToken]);

  /// handle Calculate Price

  // handle Close the Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    showModalCtxValues?.setBranchModalIsAllowed(false);
  };

  useEffect(() => {
    if (http.getToken(http.branchKey)) {
      setIsDialogOpen(false);
      showModalCtxValues?.setBranchModalIsAllowed(false);
    }
  }, [isDialogOpen, showModalCtxValues?.branchModalIsAllowed]);

  // Open the Modal Box on Start the Landing Page
  // useEffect(() => {
  //   const openingCount = getItem("AppOpenedCount");
  //   const bc = getItem(http.branchKey);
  //   if (
  //     (showModalCtxValues?.branchModalIsAllowed != false && openingCount < 2) ||
  //     !bc
  //   ) {
  //     setIsDialogOpen(true);
  //   } else {
  //     setIsDialogOpen(false);
  //   }
  // }, []);

  // Handle Clicking on Branch
  const { shopBasketData, resetBasket } = useShopBasketContext();
  const [selectedBranchId, setSelectedBranchId] = useState();


  const handleOpenBranchAvailabiltyDescribtion = (desc) => {
    toast.warn(desc, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: true,
      rtl: true,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
    });
  };

  const [branchAvailablityData, setBranchAvailablityData] = useState();
  useEffect(() => {
    if (branch) {
      apiCaller({
        api: home_apiCalls.apiCall_getBranchProductsAvailability,
        onSuccess: (resp) => {
          if (resp.status === 200 && resp.data.status == 1) {
            setBranchAvailablityData(resp.data.data);
          }
        },
      });
    }
  }, [branch]);

  // handleNavigateToTomorrowCake

  // handleNavigateToRefrigeratorCake

  // handleNavigateToBakery

  // handleNavigateToNoruzi

  ///navigatee to .com
  // useEffect(() => {
  //   if (window.location.hostname.includes('caropastry.ir')) {
  //     window.location.href = 'https://caropastry.com'
  //   }
  // }, [])

  // handleNavigateToRamedan


  // branchAddess Handler
  const [currentBranchData, setCurrentBranchData] = useState();
  const branchAddessHandler = () => {
    setCurrentBranchData();
    const cbd = allBranches?.find((it) => it.id == branch);
    if (cbd) {
      setCurrentBranchData(cbd);
      setBranchAddress(cbd?.address);
    }
  };

  useEffect(() => {
    branchAddessHandler();
  }, [branch, allBranches]);

  // ****************************************
  // Get Customer Address List
  const getCustomerAddressList = () => {
    apiCaller({
      // apiCall_getCustomerAddressList
      api: customerAddress_apiCalls.apiCall_getCustomerAddressList,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          // find default address
          const defAddress = resp?.data?.data.find(
            (it) => it?.id == userData?.defaultAddressId
          );
          setUserAddressData(defAddress);
          setUserDefAddress(defAddress?.address);
        }
      },
      onError: () => {
        // console.log(err);
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    if (userToken) getCustomerAddressList();
  }, [userData, userToken]);

  const sendVisitToApi = () => {
    const ipurl = window.location.host + location.pathname;
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        apiCaller({
          api: visit_apiCaller.apiCall_createdVisit,
          apiArguments: {
            webPage: 10,
            ip: data.ip,
            domain: ipurl,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  };

  useEffect(() => {
    sendVisitToApi();
  }, [location.pathname]);

  const { tipsStep } = useTipsContext();

  return (
    <section
      style={{
        minHeight:
          "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        overflow: "auto",
      }}
      className="m-0 p-0   d-flex flex-column justify-content-between  align-items-center landing-section-holder hidden-scrollbar"
    >
      <div className="w-100 m-0 p-0   d-flex flex-column justify-content-start  align-items-center landing-section-holder hidden-scrollbar">
        <div className="mt-4"></div>


        <BannersCarousel />

        <div className="px-3 w-100 mb-3">
          {allGeneralOrder?.length > 0 && (
            <GeneralOrdersCardItem
              id={allGeneralOrder[0]?.id}
              orderCode={allGeneralOrder[0]?.code}
              orderStatus={allGeneralOrder[0]?.purchaseRequestStatus}
              purchaseRequestStatusToString={
                allGeneralOrder[0]?.purchaseRequestStatusToString
              }
              orderPrice={allGeneralOrder[0]?.finalPrice}
            />
          )}
          {allTomorrowCakeOrder?.length > 0 && (
            <TomorrowCakeOrdersCardItem
              id={allTomorrowCakeOrder[0]?.id}
              orderCode={allTomorrowCakeOrder[0]?.code}
              tomorrowCakePurchaseRequestStatus={
                allTomorrowCakeOrder[0]?.tomorrowCakePurchaseRequestStatus
              }
              orderStatus={allTomorrowCakeOrder[0]?.status}
              orderPrice={allTomorrowCakeOrder[0]?.finalPrice}
            />
          )}
        </div>
        <LandingServices
        />
      </div>
      <div>
      </div>
    </section>
  );
};

export default Landing;
