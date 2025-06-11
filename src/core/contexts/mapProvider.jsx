import React, { useState, useEffect } from "react";
import { useRef } from "react";
//
const MapContext = React.createContext();
//
const MapContextProvider = ({ children }) => {
  const mapRef = useRef();
  const setMap = (value) => {
    console.log(value);
    mapRef.current = value;
  };
  return (
    <MapContext.Provider value={{ map: mapRef.current, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
//
export const useMapContext = () => React.useContext(MapContext);
export default MapContextProvider;
