import React, { useEffect, useState } from 'react'
import { useLoadingContext } from '../../../core/contexts/LoadingContext/LoadingContext';
import { useProfileContext } from '../../../core/contexts/UserProfileContext/UserProfileContext';
import { useAuthContext } from '../../../core/contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { apiCaller } from '../../../core/custom-hooks/useApi';
import { customerAddress_apiCalls } from '../../../core/services/agent';
import AddressCard from './components/AddressCard/AddressCard';
import PushPinIcon from "@mui/icons-material/PushPin";
import http from '../../../core/services/http';

const MoreAddress = () => {
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
        // onErrorMessage: "عملیات با خطا مواجه شد .",
        onSuccessMessage: "آدرس پیشفرض با موفقیت ثبت شد .",
        onSuccess: (resp) => {
          if (resp.status === 200 && resp?.data?.status == 1) {
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
  return (
    <div className=''>
         {userData &&
        customerAddressList?.filter((it) => it.isDefaultAddress == false)
          ?.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="user-current-address-text">آدرس های دیگر</span>
            </div>
            <div className="my-2">
              {/* <span className="fs-6">
                {" "}
                برای انتخاب ادرس پیش فرض روی ایکون{" "}
                <span>
                  <PushPinIcon color="primary" />
                </span>{" "}
                کلیک کنید.
              </span> */}
              {userData &&
                customerAddressList
                  ?.filter((it) => it.isDefaultAddress == false)
                  ?.map((item) => (
                    <AddressCard
                      key={item?.id}
                      addressId={item?.id}
                      handleSetDefaultAddress={handleSetDefaultAddress}
                      handleDeleteAddress={handleDeleteAddress}
                      addressMapText={item?.address}
                      addressMapPostalCode={item?.postalCode}
                    />
                  ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default MoreAddress