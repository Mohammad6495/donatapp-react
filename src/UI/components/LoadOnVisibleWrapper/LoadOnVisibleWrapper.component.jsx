import React, { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";

const LoadOnVisibleWrapper = ({ children }) => {
  const [isVisible, set_isVisible] = useState(false);

  return (
    <VisibilitySensor
      onChange={(isV) => {
        set_isVisible(isV);
      }}
    >
      <div>{isVisible && { children }}</div>
    </VisibilitySensor>
  );
};

export default LoadOnVisibleWrapper;
