import React, { useEffect, useRef } from "react";
import neshan_map_loader from "./loaders/neshan_map_loader";
import { useMapContext } from "../../../core/contexts/mapProvider";

const NeshanMap = (props) => {
  const { map, setMap } = useMapContext();
  ///
  const { style, options, onInit } = props;
  const mapEl = useRef(null);
  const defaultStyle = {
    width: "600px",
    height: "450px",
    margin: 0,
    padding: 0,
    background: "#eee",
  };
  const defaultOptions = {
    key: "YOUR_API_KEY",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 14,
  };
  useEffect(() => {
    neshan_map_loader({
      onLoad: () => {
        let mymap;
        ////
        if (map) {
          if (onInit) onInit(window.L, map);
        } else {
          mymap = new window.L.Map(mapEl.current, {
            ...defaultOptions,
            ...options,
          });
          setTimeout(() => {
            setMap(mymap);
            if (onInit) onInit(window.L, mymap);
          }, 0);
        }
      },
      onError: () => {
        console.error(
          "Neshan Maps Error: This page didn't load Neshan Maps correctly"
        );
      },
    });
  }, []);
  ////
  return /*#__PURE__*/ React.createElement("div", {
    ref: mapEl,
    style: { ...defaultStyle, ...style },
  });
};

export default NeshanMap;
