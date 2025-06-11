import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../../core/custom-hooks/getWindowDimensions";
//////////////////////////////////
const RefrigeratorCakeItemSkeleton = ({ className = "" }) => {
  ////
  const { width } = useWindowDimensions();
  ////
  /*
    width: `calc((${width <= 576 ? "100vw" : "576px"} -  ${3}rem)/2)`,
    height: `calc((${width <= 576 ? "100vw" : "576px"} - ${3}rem)/2)`,
  */
  return (
    <div
      style={{
        borderRadius: "16px",
      }}
      className={className + " col-6 p-2 "}
    >
      <div
        style={{
          background: "rgba(151, 48, 121, 0.08)",
          borderRadius: "16px",
          width: `100%`,
          height: `calc((${width <= 576 ? "100vw" : "576px"} + 1rem)/2)`,
        }}
        className={className + "  p-3 "}
      >
        <Skeleton
          variant="rectangular"
          style={{
            height: "70%",
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default RefrigeratorCakeItemSkeleton;
