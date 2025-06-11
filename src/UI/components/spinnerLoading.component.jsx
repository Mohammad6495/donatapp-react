import React from "react";
import {
  BeatLoader,
} from "react-spinners";
import headerLogo from "../../assets/images/logo3.png";

const spinnerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "0",
  right: "0",
  left: "0",
  height: "100%",
  width: "100%",
  margin: "0 auto",
  backgroundColor: "#fff",
  zIndex: "10000",
};

const SpinnerLoading = ({ style = {} }) => {
  const styles = { ...spinnerContainer, ...style };

  return (
    <div style={styles}>
      <img
        src={headerLogo}
        style={{ maxWidth: "130px" }}
        className="mb-3"
        alt="..."
      />
      {/* <CircleLoader color={"##C36428"} size={100} aria-label="Loading Spinner" /> */}
      <BeatLoader color="#C36428" size={10} aria-label="Loading Spinner2" />
    </div>
  );
};

export default SpinnerLoading;
