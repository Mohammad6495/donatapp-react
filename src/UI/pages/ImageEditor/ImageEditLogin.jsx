import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { picture_apiCaller } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";
import http from "../../../core/services/http";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";

const ImageEditLogin = () => {
  const navigate = useNavigate();
  //Context
  const { handleClose, handleOpen } = useLoadingContext();
  const { setBranch } = useBranchesContext();
  const { set_branchToken, branchToken } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("نام کاربری الزامی است"),
      password: Yup.string().required("رمزعبور الزامی است"),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      apiCaller({
        api: picture_apiCaller.apiCall_branchLogin,
        apiArguments: {
          username: username,
          password: password,
        },
        onStart: handleOpen,
        onEnd: handleClose,
        onSuccess: (resp) => {
          if (resp?.status == 200 && resp?.data?.statusCode == 200) {
            if (resp?.data?.data?.id) {
              setBranch(resp?.data?.data?.id);
              set_branchToken("1");
              http.setToken(http.branchKey, resp?.data?.data?.id);
              http.setToken(http.userBranchTokenKey, "1");
              navigate("/image-editor-code");
            }
          }
        },
        // onErrorMessage: "رمز یا نام کاربری اشتباه میباشد",
      });
    },
  });

  useEffect(() => {
    if (branchToken) {
      navigate("/image-editor-code");
    }
  }, []);

  const handleGoToHomePage = () => {
    navigate("/?pageId=0");
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center mt-4">
      <h5 className="my-2 fw-bold">فرم ورود شعبه</h5>
      <form className="w-100" onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-column w-100 mb-2">
          <label htmlFor="username" className="mb-1 fw-bold">
            نام کاربری:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-danger my-1" style={{ fontSize: "13px" }}>
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="password" className="mb-1 fw-bold">
            رمزعبور:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger my-1" style={{ fontSize: "13px" }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 py-2 w-100"
        >
          ورود
        </Button>

        <Button
          onClick={handleGoToHomePage}
          variant="outlined"
          color="primary"
          className="mt-4 py-2 w-100 d-flex align-items-center"
        >
          <AiFillHome />
          <span className="mx-1 fw-bold"> صفحه اصلی</span>
        </Button>
      </form>
    </div>
  );
};

export default ImageEditLogin;
