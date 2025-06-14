import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { customerAddress_apiCalls, visit_apiCaller } from "../../../core/services/agent";
import UserProfileInformation from "../../layouts/LandingLayout/components/UserProfileInformation/UserProfileInformation";
import AddressCard from "./components/AddressCard/AddressCard";
import "./styles/Profile.scss";
import { useProfileContext } from "./../../../core/contexts/UserProfileContext/UserProfileContext";
import http from "../../../core/services/http";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { FaChevronDown } from "react-icons/fa6";

import PushPinIcon from "@mui/icons-material/PushPin";
import { Button } from "@mui/material";
import MyWallet from "./components/MyWallet/MyWallet.page";

const Profile = () => {
  const location = useLocation()
  const { userData } = useProfileContext();
  const { handleClose, handleOpen } = useLoadingContext();
  const navigate = useNavigate();
  const [defaultAddress, setDefaultAddress] = useState();
  const { set_userToken } = useAuthContext();
  // States
  const [customerAddressList, setCustomerAddressList] = useState([]);

  // Navigate To Add Address Function
  const handleNavigateToAddAddress = () => {
    navigate("/add-address");
  };

  // Get Customer Address List
  const getCustomerAddressList = () => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getCustomerAddressList,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          setCustomerAddressList(resp?.data?.data);

          const findDefaultAddressUser = resp?.data?.data.find(
            (a) => a.isDefaultAddress == true
          );
          if (findDefaultAddressUser) {
            setDefaultAddress(findDefaultAddressUser);
          } else {
            setDefaultAddress(undefined);
          }
          // // find default address
          // const index = resp?.data?.data?.findIndex(
          //   (it) => it?.id == userData?.defaultAddressId
          // );
          // console.log(resp?.data?.data?.[index])
          // if (index > -1) {
          //   setDefaultAddress(resp?.data?.data?.[index]);
          // }
        }
      },
      onError: (err) => { },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  useEffect(() => {
    getCustomerAddressList();
  }, []);

  /// handle delete
  const handleDeleteAddress = (id) => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_deleteAddress,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "حذف آدرس با خطا مواجه شد .",
      onSuccessMessage: "حذف آدرس با موفقیت انجام شد .",
      onSuccess: (resp) => {
        if (resp.data?.data?.hasToken) {
          set_userToken(resp.data?.data.token);
          http.setToken(http.tokenKey, resp.data?.data.token);
        }
        getCustomerAddressList();
        // const clonedList = JSON.parse(JSON.stringify(customerAddressList));
        // const index = clonedList.findIndex((it) => it.id == id);
        // if (index >= 0) {
        //   clonedList.splice(index, 1);
        //   setCustomerAddressList(clonedList);
        //   if (defaultAddress?.id == id) {
        //     setDefaultAddress(undefined);
        //   }
        // }
      },
    });
  };

  const handleSetDefaultAddress = (id) => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_setDefaultAddress,
      apiArguments: id,
      onStart: handleOpen,
      onEnd: handleClose,
      toastMessage: true,
      onErrorMessage: "عملیات با خطا مواجه شد .",
      onSuccessMessage: "آدرس پیشفرض با موفقیت ثبت شد .",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp?.data?.statusCode == 200) {
          // const clonedList = JSON.parse(JSON.stringify(customerAddressList));
          // const index = clonedList.findIndex((it) => it.id == id);
          // if (index >= 0) {
          //   setDefaultAddress(JSON.parse(JSON.stringify(clonedList[index])));
          //   clonedList.splice(index, 1);
          //   setCustomerAddressList(clonedList);
          // }
          getCustomerAddressList();
          if (resp.data?.data?.hasToken) {
            http.setToken(http.tokenKey, resp?.data?.data?.token);
            set_userToken(resp.data?.data.token);
          }
        }
      },
    });
  };

  useEffect(() => {
    if (customerAddressList?.length !== 0) {
      if (customerAddressList?.length === 1) {
        const firstAddress = customerAddressList[0];
        if (firstAddress?.id && firstAddress?.isDefaultAddress !== false) {
          handleSetDefaultAddress(firstAddress?.id)
        }
      }
    }
  }, [])

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
            webPage: 11,
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

  return (
    <section className="d-flex flex-column w-100">
      <UserProfileInformation holderClass="p-2 mt-0 mb-2" />
      <div className="d-flex flex-column user-current-address-holder mt-2">
       {
        userData &&
        <>
        <MyWallet />
        </>
       }
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="user-current-address-text">آدرس پیشفرض</span>
          <Button
            variant="contained"
            onClick={handleNavigateToAddAddress}
            className="user-current-address fs-8 cursor-pointer"
          >
            اضافه کردن آدرس
          </Button>
        </div>
        <div className="my-2 fs-7">
          {defaultAddress ? (
            <AddressCard
              handleSetDefaultAddress={handleSetDefaultAddress}
              handleDeleteAddress={handleDeleteAddress}
              addressId={defaultAddress?.id}
              addressMapText={defaultAddress?.address}
              addressMapPostalCode={defaultAddress?.postalCode}
              isDefault={true}
            />
          ) : (
            <span>
              {" "}
              شما هنوز آدرس پیشفرضی را انتخاب نکرده اید برای انتخاب آدرس مورد
              نظر روی{" "}
              <span>
                <PushPinIcon color="primary" />
              </span>{" "}
              کلیک کنید.
            </span>
          )}
        </div>
      </div>
      <Button onClick={() => {
        navigate('/more-address')
      }} variant="outlined" color="primary">
        <span className="me-1 mt-1">دیگر آدرس ها</span>
        <FaChevronDown />
      </Button>
     
    </section>
  );
};

export default Profile;
