import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CheckCircleOutline, AccountBox } from "@mui/icons-material";
import { FomikMUITextInput } from "./../../components/formik-input/formikMuiInput.component";
import OrdinaryButton from "./../../components/OrdinaryButton/OrdinaryButton";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { account_apiCalls } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useProfileContext } from "./../../../core/contexts/UserProfileContext/UserProfileContext";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCheckProfileStatus } from "../../../core/utility/checkUserProfileStatus";
import { Slide } from "react-toastify";
import "./styles/EditProfile.scss";

const formSchema = Yup.object().shape({
  name: Yup.string().required("لطفا نام را وارد کنید"),
  family: Yup.string().required("لطفا نام خانوادگی را وارد کنید"),
  email: Yup.string().email("ایمیل را بصورت صحیح وارد کنید"),
});

const EditProfile = () => {
  const { handleOpen, handleClose } = useLoadingContext();
  const { userData, set_userData } = useProfileContext();

  // states
  const [returnUrl, setReturnUrl] = useState();

  // navigate
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Get Return Url
  const getReturnUrl = () => {
    const returnedUrl = location?.search.replace("?returnUrl=", "");
    setReturnUrl(returnedUrl);
  };

  useEffect(() => {
    getReturnUrl();
  }, [location?.search]);

  ///
  const { checkProfileStatus } = useCheckProfileStatus();
  const handleEditProfileSubmit = (values) => {
    // // account_apiCalls
    apiCaller({
      api: account_apiCalls.apiCall_editProfile,
      apiArguments: {
        firstName: values?.name,
        lastName: values?.family,
        email: values?.email,
        nationalCode: values?.nationalCode,
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          toast("تغییرات ثبت شد", {
            className: "caro-react-toastify-class",
            style: {
              zIndex: "1000000000",
              width: "100%",
              maxWidth: "576px",
              margin: "0 auto",
              fontFamily: "iransans",
              top: "env(safe-area-inset-top)",
              left: "0",
              right: "0",
            },
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
            icon: <CheckCircleOutline />,
            transition: (props) => <Slide {...props} />,
          });
          set_userData({
            firstName: values?.name,
            lastName: values?.family,
            email: values?.email,
            phoneNumber: values?.mobile,
            nationalCode: values?.nationalCode
          });
          checkProfileStatus({
            onStart: handleOpen,
            onEnd: handleClose,
            onContinueAllowed: () => {
              if (!returnUrl) {
                navigate(`/`);
              } else {
                navigate(`${returnUrl}?backUrl=/`);
              }
            },
          });
        }
      },
      onError: (err) => { },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  return (
    <div className="d-flex flex-column w-100 p-2">
      <div className="d-flex justify-content-center align-content-center mt-3 mb-1 user-image-holder">
        <div className="d-flex justify-content-center align-items-center img-holder-base w-75">
          <div className="border-0">
            {/* <img className="w-100" src={userDefImg} alt="NO_PIC" /> */}
            <AccountBox
              color="primary"
              // htmlColor="#fff"
              sx={{
                fontSize: "100px",
              }}
            />
            {/* <button className="plus-icon-btn"></button> */}
          </div>
        </div>
      </div>
      <div className="mt-1 form-holder">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: userData?.firstName || "",
            family: userData?.lastName || "",
            mobile: userData?.userName || "",
            email: userData?.email || "",
            nationalCode: userData?.nationalCode || 'ّ'
          }}
          validationSchema={formSchema}
          onSubmit={handleEditProfileSubmit}
        >
          <Form>
            {/* Name Filed */}
            <div>
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100",
                }}
                labelText="نام"
                labelprops={{
                  className: "",
                  color: "",
                  style: {
                    color: "#000",
                  },
                }}
                inputprops={{
                  className: "",
                  id: "name",
                  name: "name",
                  color: "",
                  type: "text",
                }}
              />
            </div>
            {/* Name Filed */}
            <div>
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100 mt-3",
                }}
                labelText="نام خانوادگی"
                labelprops={{
                  className: "",
                  color: "",
                  style: {
                    color: "#000",
                  },
                }}
                inputprops={{
                  className: "",
                  id: "family",
                  name: "family",
                  color: "",
                  type: "text",
                  // set_value: setUserNumber,
                }}
              />
            </div>
            {/* Mobile Filed */}
            <div>
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100 mt-3",
                }}
                labelText="موبایل"
                labelprops={{
                  className: "",
                  color: "",
                  style: {
                    color: "#000",
                  },
                }}
                inputprops={{
                  className: "",
                  id: "mobile",
                  name: "mobile",
                  color: "",
                  type: "text",
                  // set_value: setUserNumber,
                }}
              />
            </div>

            <div>
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100 mt-3",
                }}
                labelText="کد ملی"
                labelprops={{
                  className: "",
                  color: "",
                  style: {
                    color: "#000",
                  },
                }}
                inputprops={{
                  className: "",
                  id: "nationalCode",
                  name: "nationalCode",
                  color: "",
                  type: "text",
                }}
              />
            </div>
            <div>
              <FomikMUITextInput
                formcontrolprops={{
                  variant: "standard",
                  className: "w-100 mt-3",
                }}
                labelText="ایمیل"
                labelprops={{
                  className: "",
                  color: "",
                  style: {
                    color: "#000",
                  },
                }}
                inputprops={{
                  className: "",
                  id: "email",
                  name: "email",
                  color: "",
                  type: "text",
                }}
              />
            </div>

            <OrdinaryButton
              buttonText="ثبت تغییرات"
              buttonType="submit"
              holderClasses="mt-1"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
