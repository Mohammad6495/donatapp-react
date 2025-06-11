import React from "react";
import locationIcon from "../../../assets/images/loginLocation.svg";
import caroIcon from "../../../assets/images/CaroLogo/loading.png";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import headerLogo from "../../../assets/images/CaroLogo/headerLogo.png";
import { useLocation, useNavigate } from "react-router";
import "./AuthLayout.scss";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigationToBack = () => {
    navigate(-1);
  };

  return (
    <section className="d-flex flex-column justify-content-start align-items-center p-0 m-0 auth-layout-holder p-3">
      {location.pathname.includes("edit-profile") && (
        <div
          onClick={handleNavigationToBack}
          className="w-100 d-flex justify-content-end align-items-center"
        >
          <KeyboardBackspace className="cursor-pointer" />
        </div>
      )}
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <div
          style={{ maxWidth: "110px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <img className="w-100" src={headerLogo} alt="NO_PIC" />
        </div>
        <span className="fw-bold mt-2">Donat</span>
      </div>
     
      {children}
    </section>
  );
};

export default AuthLayout;
