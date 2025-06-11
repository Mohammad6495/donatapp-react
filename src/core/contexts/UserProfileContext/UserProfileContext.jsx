import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { apiCaller } from "../../custom-hooks/useApi";
import { account_apiCalls } from "../../services/agent";
import { useAuthContext } from "./../AuthContext/AuthContext";

const UserProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  //   const location = useLocation();
  const { userToken } = useAuthContext();

  // states
  const [userData, set_userData] = useState();
  const [userLocation, setUserLocation] = useState();

  // const onGetLocationSuccess = (position) => {
  //   setUserLocation(position?.coords);
  // };

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(
        (pos) => {
          // onGetLocationSuccess(pos);
          setUserLocation(pos?.coords);
        },
        (error) => {
          // toast.error("مکان کاربر یافت نشد");
        }
      );
    } else {
      // toast.error("مکان کاربر یافت نشد");
    }
  }, [navigator?.geolocation]);

  const providerValue = {
    // states
    userData,
    userLocation,
    // setStates
    set_userData,
    setUserLocation,
  };

  // Get User Profile - API
  const getUserProfile = () => {
    apiCaller({
      api: account_apiCalls.apiCall_getUserProfile,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          set_userData(resp?.data?.data);
        }
      },
      onError: (err) => {},
      // onStart: handleOpen,
      // onEnd: handleClose,
    });
  };

  useEffect(() => {
    if (userToken) getUserProfile();
  }, [userToken]);

  return (
    <UserProfileContext.Provider value={providerValue}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(UserProfileContext);

export default ProfileContextProvider;
