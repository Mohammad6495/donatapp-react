import React from "react";

import LandingServices from "./components/LandingServices/LandingServices";
import "./styles/styles.scss";

const Landing = () => {
  return (
    <section
      style={{
        minHeight:
          "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        overflow: "auto",
      }}
      className="m-0 p-0   d-flex flex-column justify-content-between  align-items-center landing-section-holder hidden-scrollbar"
    >
      <div className="w-100 m-0 p-0   d-flex flex-column justify-content-start  align-items-center landing-section-holder hidden-scrollbar">
        <div className="mt-4"></div>
        <LandingServices />
      </div>
      <div></div>
    </section>
  );
};

export default Landing;
