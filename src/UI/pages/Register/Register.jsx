import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import FomikMUITextInput from "../../components/formik-input/formikMuiInput.component";
// import personShape from "../../../assets/images/shape1.png";
// import Person from "@mui/icons-material/Person";
import { Button, Checkbox } from "@mui/material";
import LocalPhone from "@mui/icons-material/LocalPhone";
import { useLocation, useNavigate } from "react-router";
import { useLoadingContext } from "./../../../core/contexts/LoadingContext/LoadingContext";
import * as Yup from "yup";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { account_apiCalls } from "../../../core/services/agent";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { useProfileContext } from "../../../core/contexts/UserProfileContext/UserProfileContext";
import HomeIcon from "@mui/icons-material/Home";
import "./styles/Register.scss";
import { toast } from "react-toastify";
import { locationSearchStringToObject, toEnglishDigit } from "../../../core/utility/utils";
const phoneNumberValidationTest = Yup.string().test(
  "len",
  "شماره تلفن همراه باید 11 رقم باشد و با 0 شروع شود",
  (value) =>
    value?.toString().length === 11 && value?.toString().startsWith("0")
);
// .matches(phoneRegExp, "لطفا شماره تلفن همراه را درست وارد کنید .");

const formSchema = Yup.object().shape({
  phoneNumber: phoneNumberValidationTest,
});

const label = { inputProps: { "aria-label": "Checkbox" } };

const Register = () => {
  const location = useLocation()
  // contexts
  const { handleOpen, handleClose } = useLoadingContext();
  const { userToken } = useAuthContext();
  const { userData } = useProfileContext();

  // states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disablingState, setdisablingState] = useState(true);
  const [returnUrl, setReturnUrl] = useState("");

  // useNavigate - useLocation
  const navigate = useNavigate();
  const qString = useLocation();

  // Handle Get Return Url
  const getReturnUrl = () => {
    const returnedUrl = qString?.search.replace("?returnUrl=", "");
    setReturnUrl(returnedUrl);
  };

  useEffect(() => {
    getReturnUrl();
  }, [qString]);

  // Handle Register User
  const handleRegisterUser = () => {
    apiCaller({
      api: account_apiCalls.apiCall_register,
      apiArguments: toEnglishDigit(phoneNumber),
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          navigate(
            `/verify-register/${toEnglishDigit(phoneNumber)}${
              !returnUrl ? "" : `?returnUrl=${returnUrl}${locationSearchStringToObject(location.search)?.returnPage ? '&&returnPage=' + locationSearchStringToObject(location.search)?.returnPage : ''}`
            }`
          );
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  const handleSubmitRegisterForm = () => {
    if (phoneNumber) {
      handleRegisterUser();
    }
  };

  // const handleNavigateToLogin = () => {
  //   navigate("/login");
  // };

  const handleRedirectToRules = () => {
    navigate("/rules");
  };

  // Rules Accepting handler
  const handleRulesAccepting = () => {
    setdisablingState(!disablingState);
  };

  return (
    <div dir="rtl" className="p-3 mt-5 w-100 card">
      {/* <div className="input-holder">
        <input type="text" />
      </div> */}
      <div dir="rtl">
        <span>شماره موبایل</span>
        <Formik
          initialValues={{
            phoneNumber: phoneNumber || "",
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmitRegisterForm}
        >
          <Form dir="rtl">
            <div dir="ltr">
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100",
                }}
                // labelText="شماره موبایل"
                labelprops={{
                  className: "",
                  color: "",
                }}
                inputprops={{
                  className: "",
                  id: "phoneNumber",
                  name: "phoneNumber",
                  color: "",
                  type: "tel",
                  maxLength: "11",
                  set_value: setPhoneNumber,
                  onKeyPress: (e) => {
                    const reg1 = new RegExp("^[0-9]+$");
                    // const reg2 = new RegExp("^[۰-۹]+$");
                    if (!reg1.test(e.key)) {
                      e.preventDefault();
                    }
                    // ۹  ۰
                    // if (e.which < 48 || e.which > 57) {
                    //   e.preventDefault();
                    // }
                  },
                }}
                startAdornment={<LocalPhone htmlColor="#DAD9E2" />}
                errorDivError="rtl"
              />
            </div>
            <div
              className="d-flex justify-content-start align-items-center mt-0 register-text-holder"
              style={{ marginBottom: "80px" }}
            >
              {/* <Checkbox
                onClick={handleRulesAccepting}
                id="rule-checkbox"
                {...label}
              /> */}
              <label
                style={{ marginTop: "20px" }}
                onClick={handleRedirectToRules}
                className="d-flex justify-content-center align-items-center cursor-pointer me-1 fs-8 text-caro-primary fw-bold"
                htmlFor="rule-checkbox"
              >
                قوانین و مقررات وب سایت دونات
              </label>
              {/* <span style={{ color: "#9B99A9" }}>ثبت نام کرده اید ؟</span> */}
              {/* <button onClick={handleNavigateToLogin} className="register-btn mt-1">
          ورود
        </button> */}
            </div>
            <OrdinaryButton
              holderClasses="mt-3"
              // isDisabled={disablingState}
              // handleOnClick={handleRedirectToVerifyRegister}
              buttonText="ورود"
              buttonType="submit"
            />
          </Form>
        </Formik>
      </div>

      <Button
        onClick={() => {
          navigate("/?pageId=0");
        }}
        color="primary"
        variant="outlined"
        className="w-100 py-2 fw-bold"
        style={{
          marginTop: "30px",
          borderWidth: "2px",
        }}
        endIcon={<HomeIcon fontSize="large" />}
      >
        بازگشت به صفحه خانه
      </Button>
    </div>
  );
};

export default Register;
