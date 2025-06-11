import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Drawer from "@mui/material/Drawer";
import { CiShoppingBasket } from "react-icons/ci";
import { TfiLocationPin } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineCake } from "react-icons/hi2";
import { GoHome } from "react-icons/go";

import {
  useRightDrawerStyles,
  useLeftDrawerStyles,
} from "../../../core/custom-hooks/useDrawerStyles";
import { Person, Login, Menu } from "@mui/icons-material";
import {
  authenticatedProfileDrawerLinksInformation,
  unAuthenticatedProfileDrawerLinksInformation,
} from "./utils/menuItems";
import ProfileLinksItem from "./components/ProfileLinksItem/ProfileLinksItem";
import UserProfileInformation from "./components/UserProfileInformation/UserProfileInformation";
import logo from "../../../assets/images/CaroLogo/logo2.png";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { LandingBranchItem } from "../../pages/Landing/components/LandingBranchItem/LandingBranchItem";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import http from "../../../core/services/http";
import { useLandingLayoutWizard } from "../../../core/contexts/LandingLayoutWizard/LandingLayoutWizard";
import iconCheckOut from '../../../assets/images/icons/Group.svg'

import "./styles.scss";
//////////////////////
const LandingLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const leftDrawerClasses = useRightDrawerStyles();
  const rightDrawerClasses = useLeftDrawerStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useProfileContext();
  const { userToken } = useAuthContext();
  const { currentStep, goNextPage } = useLandingLayoutWizard();
  const { shopBasketData } = useShopBasketContext();
  const { branch, setBranch, allBranches } = useBranchesContext();
  /// handle Calculate Price
  const handleRedirectToCalcPrice = () => {
    navigate("/calc-price");
  };

  const handleNavigateToRegister = () => {
    if(userToken) {
      navigate('/profile');
      return false
    }
    navigate("/register");
  };

  const handleRedirectToBasketCart = () => {
    navigate("/checkout-cart");
  };
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState();

  const handleDrawerClicked = () => {
    setIsOpen(!isOpen);
  };

  const handleDrawerClickedBranch = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleSelectBranch = (branchId) => {
    if (!branchId) return;
    if (branchId == branch) {
      setDrawerOpen(false);
      // handleCloseDialog();
      return;
    }
    if (shopBasketData?.items?.length > 0) setSelectedBranchId(branchId);
    else {
      setBranch(branchId);
      http.setToken(http.branchKey, branchId);
      // handleCloseDialog();
      setDrawerOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getPositionImage = () => {
    switch (currentStep) {
      case 0:
        return "71.5%";
      case 1:
        return "38.3%";
      case 2:
        return "5%";
    }
  };

  const [redDivPosition, setRedDivPosition] = useState({
    left: getPositionImage(),
  });

  useEffect(() => {
    setRedDivPosition({
      left: getPositionImage(),
    });
  }, [currentStep]);

  const handleMoveDiv = (event, id) => {
    goNextPage(id);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const getImageIconBox = (item) => {
    if (item?.id == 2) {
      return (
        <CgProfile
          style={
            currentStep == item?.id
              ? {
                  transform: "rotate(136deg)",
                  position: "absolute",
                  top: "11px",
                  left: "17px",
                }
              : {}
          }
          fontSize={30}
          color={currentStep == item?.id ? "#fff" : "#59626C"}
        />
      );
    } else if (item?.id == 1) {
      return (
        <HiOutlineCake
          style={
            currentStep == item?.id
              ? {
                  transform: "rotate(136deg)",
                  position: "absolute",
                  top: "11px",
                  left: "17px",
                }
              : {}
          }
          fontSize={45}
          color={currentStep == item?.id ? "#fff" : "#59626C"}
        />
      );
    } else {
      return (
        <GoHome
          style={
            currentStep == item?.id
              ? {
                  transform: "rotate(136deg)",
                  position: "absolute",
                  top: "11px",
                  left: "17px",
                }
              : {}
          }
          fontSize={30}
          color={currentStep == item?.id ? "#fff" : "#59626C"}
        />
      );
    }
  };
  return (
    <section dir="rtl" className="p-0 m-0 layout-holder">
      <div className="d-flex justify-content-between align-items-center layout-header-holder px-3 pt-3">
        <div className="d-flex align-items-center">
          <div
            style={{ width: "40px", height: "20px" }}
            className="d-flex justify-content-between align-items-center header-icon-holder"
          >
            <span
              onClick={handleDrawerClicked}
              className="header__hamburge__icon2"
            >
              <Menu htmlColor="#fff" className="me-1" sx={{ fontSize: '25px'}}/>
            </span>
            {/* )} */}
          </div>
          <div
            style={{width: "40px", height: "20px"  }}
            className="d-flex justify-content-between align-items-center header-icon-holder ms-1"
          >
            <span
              onClick={handleNavigateToRegister}
              className="header__hamburge__icon2"
            >
              {userToken ? (
                <Person htmlColor="#fff" className="ms-1" sx={{ fontSize: '25px'}}/>
              ) : (
                <Login htmlColor="#fff" className="ms-1"  sx={{ fontSize: '25px'}}/>
              )}
            </span>
          </div>
        </div>

        <div style={{ maxWidth: "110px" }}>
          <img width={110}  src={logo} alt="NO_PIC" />
        </div>
        <div className="d-flex align-items-center">
          <div className="me-2 mt-1 d-flex flex-column align-items-center">
          
            
          </div>
          <span
            onClick={handleRedirectToBasketCart}
            className="header__basket__icon mt-1 d-flex align-items-center justify-content-center position-relative"
          >
            <img src={iconCheckOut} width={22} height={22}/>
            {shopBasketData &&
              shopBasketData?.items &&
              shopBasketData?.items?.length > 0 && (
                <span
                  className="fs-8 d-flex flex-row justify-content-center align-items-center p-0"
                  style={{
                    position: " absolute",
                    top: " -10px",
                    right: " -5px",
                    borderRadius: "50%",
                    backgroundColor: " #C36428",
                    width: " 20px",
                    height: " 20px",
                    textAlign: " center",
                    color: "#fff",
                  }}
                >
                  {shopBasketData?.items?.length ?? 0}
                </span>
              )}
          </span>
          <Drawer
            {...leftDrawerClasses}
            dir="ltr"
            anchor="right"
            open={drawerIsOpen}
            onClose={handleDrawerClickedBranch}
          >
            <div className="m-0 py-4 px-3 d-flex flex-column drawer-branch-items-holder h-100">
              <div className="d-flex justify-content-between align-items-center drawer-close-icon-holder w-100 px-1">
                <span
                  onClick={handleDrawerClickedBranch}
                  className="drawer-close-icon"
                />
                <span dir="rtl" className="w-75" style={{ fontSize: "0.8rem" }}>
                  لطفا یکی از شعبه های ما رو برای سفارش انتخاب کنید
                </span>
              </div>
              <div className="drawer-branches-holder h-100">
                {/* Drawer active branche */}
                <div
                  dir="rtl"
                  className="d-flex flex-column justify-content-between align-items-stretch h-100 mt-4 m-0 p-0"
                >
                  <div className="d-flex flex-column justify-content-center align-items-stretch w-100">
                    {allBranches?.length !== 0 &&
                      allBranches?.map((item) => (
                        <LandingBranchItem
                          key={item?.id}
                          branchId={item?.id}
                          branchName={item?.city}
                          branchAddress={item?.address}
                          branchClickHandler={handleSelectBranch}
                          isActive={item?.id == branch}
                        />
                      ))}
                  </div>
                 
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <Drawer
        {...rightDrawerClasses}
        dir="rtl"
        anchor="left"
        open={isOpen}
        onClose={handleDrawerClicked}
      >
        <div className="m-0 py-4 px-3 d-flex flex-column drawer-items-holder h-100">
          <span onClick={handleDrawerClicked} className="drawer-close-icon" />
          <div className="drawer-links-holder">
            {/* ---- Drawer User Data ---- */}
            {userToken && <UserProfileInformation />}
            {/* Drawer Profile Links */}
            <div className="d-flex flex-column mt-3">
              {userData
                ? authenticatedProfileDrawerLinksInformation?.map((it) => (
                    <ProfileLinksItem
                      key={it?.id}
                      linkId={it?.id}
                      linkTitle={it?.title}
                      linkcon={it?.iconUrl}
                      linkPath={it?.linkPath}
                      isLogged={userData && userToken}
                      handleDrawerClicked={handleDrawerClicked}
                    />
                  ))
                : unAuthenticatedProfileDrawerLinksInformation?.map((it) => (
                    <ProfileLinksItem
                      key={it?.id}
                      linkId={it?.id}
                      linkTitle={it?.title}
                      linkcon={it?.iconUrl}
                      linkPath={it?.linkPath}
                      isLogged={userData && userToken}
                      handleDrawerClicked={handleDrawerClicked}
                    />
                  ))}
            </div>
          </div>
        </div>
      </Drawer>
      {/* Start Children  */}
      <div className="m-0 w-100 caro-page d-flex flex-column">{children}</div>
    </section>
  );
};

export default LandingLayout;
