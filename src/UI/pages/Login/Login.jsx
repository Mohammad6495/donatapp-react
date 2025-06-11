import React, { useState } from "react";
import { Formik, Form } from "formik";
import FomikMUITextInput from "../../components/formik-input/formikMuiInput.component";
// import personShape from "../../../assets/images/shape1.png";
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import "./styles/Login.scss";
import OrdinaryButton from "./../../components/OrdinaryButton/OrdinaryButton";

const formSchema = Yup.object().shape({
  phoneNumber: Yup.number("لطفا عدد وارد کنید").required(
    "لطفا شماره را وارد کنید"
  ),
});

const Login = () => {
  const [userNumber, setUserNumber] = useState("");

  const navigate = useNavigate();

  const handleRedirectToVerifyLogin = () => {
    if (userNumber) {
      navigate(`/verify-login/${userNumber}`);
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div dir="rtl" className="p-3 mt-5 w-100">
      {/* <div className="input-holder">
        <input type="text" />
      </div> */}
      <div dir="rtl">
        <Formik
          initialValues={{
            phoneNumber: userNumber || "",
          }}
          validationSchema={formSchema}
        >
          <Form dir="rtl">
            <div dir="rtl">
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100",
                }}
                labelText="شماره موبایل"
                labelprops={{
                  className: "",
                  color: "",
                }}
                inputprops={{
                  className: "",
                  id: "phoneNumber",
                  name: "phoneNumber",
                  color: "",
                  type: "text",
                  set_value: setUserNumber,
                }}
                startAdornment={<Person htmlColor="#DAD9E2" />}
              />
            </div>
          </Form>
        </Formik>
      </div>
      <OrdinaryButton
        holderClasses="mt-2"
        handleOnClick={handleRedirectToVerifyLogin}
        buttonText="ورود"
      />
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 register-text-holder">
        <span style={{ color: "#9B99A9" }}>ثبت نام نکرده اید ؟</span>
        <button
          onClick={handleNavigateToRegister}
          className="register-btn mt-1"
        >
          ثبت نام
        </button>
      </div>
    </div>
  );
};

export default Login;
