import React, { useState, useEffect, useRef } from "react";

const ChecksInViewPort = (ref) => {
  //   if (!ref?.current) return false;
  const rect = ref?.current?.getBoundingClientRect();
  const isInViewport =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  return isInViewport;
};

export const useIsInViewPort = () => {
  const ref = useRef();
  const [isInViewPort, set_isInViewPort] = useState(false);

  const listener = () => {
    set_isInViewPort(ChecksInViewPort(ref));
  };

  useEffect(() => {
    if (ref?.current) listener();
    if (ref?.current)
      document.addEventListener("scroll", listener, {
        passive: true,
      });

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [ref?.current]);

  return { isInViewPort, ref };
};
