import React from "react";
import "./CakeItemBadge.scss";

const CakeItemBadge = ({ text, badgeColor }) => {
  return (
    <span
      className={`d-flex justify-content-center align-items-center py-1 px-2 ${
        badgeColor === "brownChocolate" ? " brown-chocolate " : ""
      } ${badgeColor === "greenChocolate" ? " green-chocolate " : ""} ${
        badgeColor === "caramel" ? " caramel " : ""
      }`}
    >
      {text}
    </span>
  );
};

export default CakeItemBadge;
