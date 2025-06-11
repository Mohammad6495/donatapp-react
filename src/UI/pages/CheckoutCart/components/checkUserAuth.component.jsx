import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfileContext } from "../../../../core/contexts/UserProfileContext/UserProfileContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { customerAddress_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "./../../../../core/contexts/LoadingContext/LoadingContext";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowLeftSFill } from "react-icons/ri";
///////////////
const CheckUserAuthorization = () => {
  //
  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);
  //
  const navigate = useNavigate();
  // Profile Data Context
  const { userData } = useProfileContext();
  const { handleOpen, handleClose } = useLoadingContext();
  // Handle Navigate Page
  const handleNavigatePage = (p) => {
    if (p === 0) {
      navigate("/edit-profile");
    }
    if (p === 1) {
      navigate("/register");
    }
  };
  //// Check User Profile Is Complete
  const checkUserProfileIsComplete = () => {
    if (userData) {
      if (Object.values(userData).some((it) => it === "")) {
        setUserProfileIsComplete(false);
      } else {
        setUserProfileIsComplete(true);
      }
    }
  };

  useEffect(() => {
    checkUserProfileIsComplete();
  }, [userData]);

  // Get User Default Address:
  const [userDefaultAddress, setUserDefaultAddress] = useState();
  const getCustomerCurrentAddress = () => {
    apiCaller({
      api: customerAddress_apiCalls?.apiCall_getCustomerAddressList,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          if (resp?.data?.data?.length > 0) {
            const defAddress = resp.data.data.find(
              (it) => it?.id == userData?.defaultAddressId
            );
            setUserDefaultAddress(defAddress);
          } else {
            setUserDefaultAddress(null);
          }
        }
      },
      onError: (err) => { },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getCustomerCurrentAddress();
  }, [userData]);

  return (
    <>
      {userData && userProfileIsComplete === true && (
        <div className="fs-8 d-flex flex-column justify-content-center align-items-center w-100 user-name-number-container p-2 rounded-2" >
          <div className="userProfileTop w-100 d-flex gap-4 ms-1">
            <span>نام کاربری : {userData?.firstName} {userData?.lastName}</span>
            <span>شماره همراه : {userData?.phone}</span>
          </div>
          <div className="d-flex flex-column  w-100">
            <div className="d-flex pt-2 gap-1 align-items-center">
              <FaLocationDot size={17} />
              <span style={{ fontSize: "15px" }}>ارسال به آدرس انتخاب شده</span>
            </div>
            <span className="ms-1 pt-2 text-secondary"> {userDefaultAddress?.address ?? "انتخاب نشده"}</span>
          </div>
          <div onClick={() => handleNavigatePage(0)} className="w-100 d-flex justify-content-end align-items-center" style={{ color: "#CB7640", cursor: "pointer" }}>
            <span>ویرایش پروفایل</span>
            <RiArrowLeftSFill size={22} />
          </div>
        </div>
      )}

      {userData && userProfileIsComplete === false && (
        <div className="fs-8 d-flex flex-column justify-content-center align-items-center w-100 user-name-number-container p-3 mt-2">
          <div className="d-flex justify-content-between align-items-center user-name-number-address-holder w-100">
            <div className="d-flex flex-column user-name-number">
              <span>
                {userData?.firstName} {userData?.lastName}
              </span>
              <span>برای ادامه ابتدا پروفایل تان را تکمیل کنید : </span>
            </div>
            <div
              onClick={() => handleNavigatePage(0)}
              className="d-flex justify-content-center align-items-center edit-icon-holder"
            >
              <span className="edit-icon" />
            </div>
          </div>
        </div>
      )}

      {!userData && (
        <div className="fs-8 d-flex flex-column justify-content-center align-items-center w-100 user-name-number-container p-3 mt-2">
          <div className="d-flex justify-content-between align-items-center user-name-number-address-holder w-100">
            <div className="d-flex flex-column user-name-number">
              <span>برای خرید لطفا ابتدا وارد شوید</span>
            </div>
            <div
              onClick={() => handleNavigatePage(1)}
              className="d-flex justify-content-center align-items-center edit-icon-holder"
            >
              <span className="edit-icon" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckUserAuthorization;
