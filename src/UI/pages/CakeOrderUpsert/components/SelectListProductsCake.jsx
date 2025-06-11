import React from "react";

const SelectListProductsCake = ({ id, image, title, cakeSelectId, handleSetSelectId, className = 'col-5' }) => {
  return (
    <div className={" d-flex flex-column px-2 h-100 " + className}>
      <div
        className={`select-cakes-items p-2 rounded ${cakeSelectId == id && 'active-cake'}`}
        onClick={() => handleSetSelectId(id)}
        style={{ border: "1px solid #CB7640", cursor: "pointer" }}
      >
        <img className="img-fluid" src={image} />
        <span className="fs-8">{title}</span>
      </div>
    </div>
  );
};

export default SelectListProductsCake;
