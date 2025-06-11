import React, { useState, useEffect, useRef } from "react";
import { calculateDiff } from "../utils/utils";

export const useCountDown = ({ to }) => {
  const [allowCallAPI, set_allowCallAPI] = useState(false);
  // let interval = null;
  const intervalRef = useRef();
  ////////////////////////////////////////////////
  useEffect(() => {
    if (to) {
      const { timeLeft, s: s1, m: m1, d: d1, h: h1 } = calculateDiff(to);
      if (d1 >= -1 && h1 >= -1 && m1 >= -1 && s1 >= -15) {
        const intervalId = setInterval(() => {
          const {
            d: d1,
            h: h1,
            m: m1,
            s: s1,
            timeLeft: t1,
          } = calculateDiff(to);
          /////////
          if (
            d1 >= -1 &&
            d1 < 1 &&
            h1 >= -1 &&
            h1 < 1 &&
            m1 >= -1 &&
            m1 < 1 &&
            s1 >= -15 &&
            s1 <= 15
          ) {
            set_allowCallAPI(true);
          } else if (d1 <= -1 && h1 <= -1 && m1 <= -1 && s1 < -15) {
            set_allowCallAPI(false);
            clearInterval(intervalRef.current);
            return;
          }
          /////////
        }, 1000);
        intervalRef.current = intervalId;
      }
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [to]);

  return {
    allowCallAPI,
  };
};
