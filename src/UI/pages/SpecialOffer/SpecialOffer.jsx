import React from "react";
import { useNavigate, useParams } from "react-router";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import RefrigeratorCakeDetails from "./components/RefrigeratorCakeDirectAccess";
import "./styles/DirectAccess.scss";

const SpecialOffer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigateHome = () => {
    navigate("/home");
  };

  return (
    <section className="d-flex flex-column justify-content-start align-items-center base-section-holder p-0 m-0 w-100 p-3">
      <div className="d-flex flex-row justify-content-between align-items-center w-100 pb-2">
        <span>پیشنهاد ویژه</span>
        <KeyboardBackspace
          className="cursor-pointer"
          onClick={handleNavigateHome}
        />
      </div>
      <RefrigeratorCakeDetails id={id} />
    </section>
  );
};

export default SpecialOffer;
