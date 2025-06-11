import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "./getWindowDimensions";

const useModalWidth = () => {
  const [modalWidth, setModalWidth] = useState();

  const { width } = useWindowDimensions();
  // 12 6 2

  useEffect(() => {
    if (width >= 992) {
      setModalWidth(`calc(${width}px - 12rem)`);
    }
    if (width >= 768 && width < 992) {
      setModalWidth(`calc(${width}px - 6rem)`);
    }
    if (width >= 576 && width < 768) {
      setModalWidth(`calc(${width}px - 4rem)`);
    }
  }, [width]);

  return { modalWidth };
};

export default useModalWidth;
