import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import personProfileIcon from "../../../../../assets/images/person-profile.png";
import { useProfileContext } from "./../../../../../core/contexts/UserProfileContext/UserProfileContext";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./styles/UserProfileInformation.scss";
import { useAuthContext } from "../../../../../core/contexts/AuthContext/AuthContext";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { account_apiCalls } from "../../../../../core/services/agent";
import { formatNumber } from "../../../../../core/utility/helperFunctions";

const UserProfileInformation = ({
  userName = "",
  userPhoneNumber = "",
  holderClass = "p-2 my-2",
}) => {
  const { userData } = useProfileContext();
  const { userToken } = useAuthContext();
  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);
  const navigate = useNavigate();
  const [balanceValue, setBalanceValue] = useState()

  const handleNavigateEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  // check User Profile Is Complete
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

  const getBalanceValue = () => {
    apiCaller({
      api: account_apiCalls.apiCall_getbalance,
      onSuccess(resp) {
        if (resp?.status == 200 && resp?.data?.statusCode == 200) {
          setBalanceValue(resp?.data?.data)
        }
      }
    })
  }

  useEffect(() => {
    getBalanceValue()
  }, [])

  return (
    <div
      className={`d-flex justify-content-between align-items-center user-data-holder w-100 ${holderClass}`}
    >
      {/* user pic holder */}
      {userToken && userToken && (
        <div className="d-flex justify-content-center align-items-center user-pic-holder">
          {/* <img src={personProfileIcon} alt="NO_PIC" /> */}
          <AccountBoxIcon
            // color="primary"
            htmlColor="#fff"
            sx={{
              fontSize: "100px",
            }}
          />
        </div>
      )}
      {/* user's name holder */}
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center user-name-holder">
        {userData && (
          <>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span>{userData?.userName}</span>
    
          </>
        )}


        {!userData && <span>لطفا ابتدا ثبت نام نمایید</span>}
      </div>
      {/* edit icon holder */}
      <div
        onClick={userData ? handleNavigateEditProfile : handleNavigateRegister}
        className="d-flex justify-content-center align-items-center edit-icon-holder"
      >
        <span className="edit-icon" />
      </div>
    </div>
  );
};

export default UserProfileInformation;
