import React from "react";

import "./styles.scss";
import { useNavigate } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";

const ShowItemsFavorite = ({ itemsCount, title, path = "" }) => {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    if (itemsCount > 0) {
      navigate("/favorite-list");
    }
  };
  return (
    <div
      onClick={navigateToDetails}
      style={{
        opacity: itemsCount === 0 ? 0.5 : 1,
        cursor: itemsCount === 0 ? "not-allowed" : "pointer",
        pointerEvents: itemsCount === 0 ? "none" : "auto"
      }}
      className="d-flex align-items-center showitemfavorite"
    >
      <div className="me-1 BoxHeart">
        <span className="BoxHeartCount">{itemsCount}</span>
        <IoMdHeartEmpty size={40} />
      </div>
      <span style={{ fontSize: "14px", paddingBottom: "2px" }}> {title} </span>
    </div>
  );
};

export default ShowItemsFavorite;
