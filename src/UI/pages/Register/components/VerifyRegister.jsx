import React, { useEffect, useRef, useState } from "react";
import http from "../../../../core/services/http";
import { useLocation, useNavigate, useParams } from "react-router";
import ReactCodeInput from "react-verification-code-input";
import { useAuthContext } from "../../../../core/contexts/AuthContext/AuthContext";
import { useLoadingContext } from "../../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import Countdown from "react-countdown";
import { account_apiCalls, branches_apiCalls } from "../../../../core/services/agent";
import { toast } from "react-toastify";
import OrdinaryButton, {
  OutlinedButton,
} from "./../../../components/OrdinaryButton/OrdinaryButton";
import { useCheckProfileStatus } from "../../../../core/utility/checkUserProfileStatus";
import "./styles/VerifyRegister.scss";
import {
  convertToPersianPhoneNumber,
  locationSearchStringToObject,
} from "../../../../core/utility/utils";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { MdSettingsBackupRestore } from "react-icons/md";

const VerifyRegister = () => {
  // contexts
  const { handleOpen, handleClose } = useLoadingContext();
  const { userToken, set_userToken } = useAuthContext();

  // useNavigate - useParams - useLocation
  const navigate = useNavigate();
  const { phoneNumber } = useParams();
  const location = useLocation();

  // Ref
  const verifyButtonRef = useRef();

  // states
  const [verifyCode, setVerifyCode] = useState("");
  const [reffererCode, setReffererCode] = useState("");
  const [showMessage, setShowMessage] = useState()
  const [showReffererCodeModal, setShowReffererCodeModal] = useState(false);

  const handleShowReffererModal = () => {
    setShowReffererCodeModal(!showReffererCodeModal)
  }

  const handleChangeReffererCode = (value) => {
    setReffererCode(value)
  }

  // Handle Get Returned Url
  const getReturnUrl = () => {
    const locationSearchString = location?.search;
    if (locationSearchString.includes("returnUrl=")) {
      const { returnUrl } = locationSearchStringToObject(locationSearchString);
      return returnUrl;
    }
    return undefined;
  };

  //////
  const handleShowMessageApi = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_showsmsmessage,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          setShowMessage(resp?.data?.data)
        }
      }
    })
  }

  useEffect(() => {
    handleShowMessageApi()
  }, [])

  // Handle Verify Register
  const { checkProfileStatus } = useCheckProfileStatus();
  const handleVerifyRegister = async (isContinue = false) => {
    if (isContinue == false) {
      // const phoneNumberExist = await apiCaller({
      //   api: account_apiCalls.apiCall_exists,
      //   apiArguments: phoneNumber,
      //   onStart: handleOpen,
      //   onEnd: handleClose,
      // });
      // if (phoneNumberExist.data?.data == false && isContinue == false) {
      //   handleShowReffererModal()
      //   return false
      // }
    }
    apiCaller({
      api: account_apiCalls.apiCall_verifyRegister,
      apiArguments: { code: verifyCode, phoneNumber: phoneNumber },
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          set_userToken(resp?.data?.data.token);
          http.setToken(http.tokenKey, resp?.data?.data.token);
          checkProfileStatus({
            onStart: handleOpen,
            onEnd: handleClose,
            onContinueAllowed: () => {
              if (!locationSearchStringToObject(location.search)?.returnUrl) {
                navigate(`/`, { replace: true });
              } else {
                navigate(
                  `${locationSearchStringToObject(location.search)?.returnUrl + (locationSearchStringToObject(location.search)?.returnPage ? '?returnPage=' + locationSearchStringToObject(location.search)?.returnPage : '') ??
                  "/"
                  }`,
                  { replace: true }
                );
              }
            },
          });
        }
      },
      onError: (err) => {
        toast.error("کد وارد شده صحیح نیست");
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  // Handle Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (verifyCode.length === 4) {
      handleVerifyRegister();
    } else {
      return;
    }
  };

  // Handle Change Code Input
  const handleChangeCodeInput = (code) => {
    setVerifyCode(code);
  };

  const handleSendCodeAgain = () => {
    apiCaller({
      api: account_apiCalls.apiCall_sendCodeAgain,
      apiArguments: { phoneNumber: phoneNumber },
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          setAgainTimer(Date.now() + 90000)

        }
      },
      onSuccessMessage: 'در کمترین زمان تیم دونات با شما تماس میگیرد',
      onStart: handleOpen,
      onEnd: handleClose,
    })
  }
  // CountDown Timer


  const Completionist = () => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Button onClick={handleSendCodeAgain} variant="outlined" className="mt-3" >
          <MdSettingsBackupRestore fontSize={24} />
          <span className="me-2 fw-bold">کد را دریافت نکرده ام</span>
        </Button>
      </div>
    )
  };

  const [againTimer, setAgainTimer] = useState(Date.now() + 90000)

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="mt-3">
          <span>
            0{minutes}:{seconds}
          </span>
        </div>
      );
    }
  };

  // const renderCountDownTimer = React.useMemo(() => {
  //   return <Countdown date={Date.now() + 120000} renderer={renderer} />;
  // }, [timer]);

  // handleNavigateToChangingNumber
  const handleNavigateToChangingNumber = () => {
    navigate("/register");
  };

  // Automatic Click Submit Button
  const automaticClickSubmitButton = () => {
    handleVerifyRegister();
  };

  useEffect(() => {
    if (verifyCode.length == 4) {
      automaticClickSubmitButton();
    }
  }, [verifyCode]);

  const handleSubmitReffererCode = () => {
    if (!reffererCode) {
      toast.warning('کد دعوت را وارد کنید!')
    }
    apiCaller({
      api: account_apiCalls.apiCall_verifyRegister,
      apiArguments: { code: verifyCode, phoneNumber: phoneNumber, refererCode: reffererCode },
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode === 200) {
          set_userToken(resp?.data?.data);
          http.setToken(http.tokenKey, resp?.data?.data);
          checkProfileStatus({
            onStart: handleOpen,
            onEnd: handleClose,
            onContinueAllowed: () => {
              if (!locationSearchStringToObject(location.search)?.returnUrl) {
                navigate(`/`, { replace: true });
              } else {
                navigate(
                  `${locationSearchStringToObject(location.search)?.returnUrl + (locationSearchStringToObject(location.search)?.returnPage ? '?returnPage=' + locationSearchStringToObject(location.search)?.returnPage : '') ??
                  "/"
                  }`,
                  { replace: true }
                );
              }
            },
          });
        }
      },
      onError: (err) => {
        toast.error("کد وارد شده صحیح نیست");
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  }


  return (
    <div dir="rtl" className="p-2 mt-5 w-100">
      <div className="w-100" style={{ height: "30vh" }}>
        {
          showMessage?.showSmsMessage &&
          <h6 style={{ lineHeight: "37px" }} className="text-center mb-4">
            کاربر گرامی مشکلی در ارسال کد تایید به وجود آمده است لطفا برای ورود کد
            تایید{" "}
            <span className="text-danger" style={{ fontSize: "28px" }}>
              {showMessage?.loginCode}
            </span>{" "}
            را وارد کنید
          </h6>
        }
        <div className="d-flex justify-content-between align-items-center">
          <span style={{ color: "#9B99A9", fontSize: "14px" }}>
            کد ارسال شده را وارد کنید
          </span>
          <span
            onClick={handleNavigateToChangingNumber}
            style={{ color: "#CB7640", fontSize: "17px" }}
            className="cursor-pointer fw-bold"
          >
            {phoneNumber}
          </span>
        </div>
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          dir="ltr"
          className="d-flex flex-column justify-content-center align-items-center mt-2"
        >
          <ReactCodeInput
            fieldWidth="15%"
            className="w-100 my-2 mx-auto"
            values={verifyCode ? verifyCode : ""}
            onChange={handleChangeCodeInput}
            type="number"
            fields={4}
          />
          <div className="d-flex justify-content-center align-items-center w-100">
            <Countdown date={againTimer} renderer={renderer} key={againTimer} />
          </div>
          <OrdinaryButton
            btnRef={verifyButtonRef}
            buttonText="ورود"
            holderClasses="mt-4 w-100"
            buttonType="submit"
          />
          <OutlinedButton
            buttonText="ارسال مجدد کد"
            holderClasses="mt-3 w-100"
          />
        </form>
      </div>
      <Dialog fullWidth open={showReffererCodeModal} onClose={handleShowReffererModal}>
        <DialogTitle className="text-center mb-0" fontSize={14}>کاربر عزیر شما میتوانید با کد دعوت خود وارد شوید.</DialogTitle>
        <DialogContent>
          <TextField onChange={(e) => handleChangeReffererCode(e?.target?.value)} className="w-100" id="refferer-code-inpu" label="کد دعوت" variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="warning" onClick={() => handleVerifyRegister(true)}>کد دعوت ندارم!</Button>
          <Button onClick={() => handleSubmitReffererCode()} variant="contained" type="button" color="primary" >ثبت</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyRegister;
