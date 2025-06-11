import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const LoadingBox = ({
  open = false,
  classes = " w-100 h-100 ",
  style = { top: "0" },
  spinnerStyles = null,
}) => {
  return (
    <>
      {open && (
        <div
          style={style}
          className={
            styles["spinner-loading"] +
            classes +
            " mx-auto p-0 d-flex flex-row justify-content-center align-items-center"
          }
        >
          {/* here goes spinner */}
          <div
            style={spinnerStyles}
            className={"mx-auto " + styles["loading"]}
          ></div>
        </div>
      )}
    </>
  );
};

export default LoadingBox;
