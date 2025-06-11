import React, { useState, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../../../core/custom-hooks/useDrag";

const FreeSlider = (props) => {
  return (
    <div
      style={{
        overflow: "hidden",
        overflowX: "scroll",
        width: "100%",
      }}
      className="thin-scrollbar"
    >
      <div className="  m-0 p-0 pb-2 d-flex flex-row justify-content-start align-items-stretch">
        {props.children}
      </div>
    </div>
  );
};

export default FreeSlider;
