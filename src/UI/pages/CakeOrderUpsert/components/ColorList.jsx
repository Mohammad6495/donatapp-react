import React from "react";

const ColorList = ({ id, name, code, handleSetColorId, colorId }) => {
  return (
    <div onClick={() => handleSetColorId(id)}>
      <div
        style={{
          backgroundColor: code,
          border: colorId == id ? "4px solid" : "none",
        }}
        className="color-list"
      ></div>
    </div>
  );
};

export default ColorList;
