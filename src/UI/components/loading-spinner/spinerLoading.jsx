import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

const SpinnerLoading = (props) => {
  const ref_spinnerHolder = useRef();

  useEffect(() => {
    const el = document.getElementById("appcontainer");
    // const w = getComputedStyle(el).width;
    // if (ref_spinnerHolder?.current) {
    //   ref_spinnerHolder.current.style.width = (getInt(w) - 17) + "px";
    // }
  }, []);

  const getInt = (str) => {
    const num = str.substring(0, str.length - 2);
    return parseInt(num);
  };

  return (
    <div
      ref={ref_spinnerHolder}
      className={
        styles["spinner-loading"] +
        " mx-auto p-0 d-flex flex-row justify-content-center align-items-center"
      }
    >
      {/* here goes spinner */}
      <div className={"mx-auto " + styles["loading"]}></div>
    </div>
  );
};

export default SpinnerLoading;
