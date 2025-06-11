import React from "react";

import slideImage from "../../../assets/images/slideImageB.jpg";
import { useEffect } from "react";

const SaribaKeryPrice = () => {
  useEffect(() => {
    window.location.href = "https://carobakery.menusaz.com";
  }, []);
  return (
    <div
      className="saribaKeryPrice d-flex align-items-center px-1"
      style={{ height: "100vh" }}
    >
      {/* <img src={slideImage} className="img-fluid  " /> */}
    </div>
  );
};

export default SaribaKeryPrice;
