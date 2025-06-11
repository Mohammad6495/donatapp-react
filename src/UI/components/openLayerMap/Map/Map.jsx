import React, { useRef, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
// import Layer from "ol/layer/Layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";

import colorPin from "../../../../assets/images/map.png";
import { Point } from "ol/geom";

const Map = ({
  children,
  zoom,
  setIsStroke,
  setIs,
  center,
  onClick = () => {},
  isStaticMap = false,
  height,
}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const location = useLocation();

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
      interactions: isStaticMap ? [] : undefined, // Disable interactions if isStaticMap is true
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);

    mapObject.on("moveend", (e) => {
      const mapAll = e.map;
      const center = mapAll.getView().getCenter();
      onClick(center);
      // setIsStroke(false);
    });
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
    // flyTo(center, map.getView());
    // map.getView().animate({
    //   resolution: 4, // jump effect
    //   center: center,
    //   duration: 500,
    // });
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div
        ref={mapRef}
        className="ol-map"
        style={{ position: "relative", height: height }}
      >
        <div
          style={{
            position: "absolute",
            top: "46%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "90",
          }}
        >
          <img src={colorPin} alt="pin" />
        </div>
        {children}
      </div>
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);
export default Map;

function flyTo(location, view, done = () => {}) {
  const duration = 1000;
  const zoom = view.getZoom();
  let parts = 2;
  let called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  view.animate(
    {
      zoom: zoom,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    },
    callback
  );
}

// import React, { useRef, useState, useEffect, useContext } from "react";
// import "./Map.css";
// import MapContext from "./MapContext";
// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";

// const MapBox = ({ children, zoom, center, onClick = () => {} }) => {
//   const mapRef = useRef();
//   const [map, setMap] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // on component mount
//   useEffect(() => {
//     const mapObject = new Map({
//       target: "map",
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//       ],
//       view: new View({
//         center,
//         zoom,
//       }),
//       controls: [],
//       overlays: [],
//     });

//     mapRef.current = mapObject;

//     const handlePointerDown = () => {
//       setIsDragging(true);
//       onClick()
//     };

//     const handlePointerUp = (event) => {
//       if (isDragging) {
//         setIsDragging(false);
//         const clickedCoordinate = mapObject.getEventCoordinate(event);
//         console.log("Clicked Coordinate:", clickedCoordinate);
//         // do something with the clicked coordinate, e.g. select a feature
//       }
//     };

//     mapObject.getViewport().addEventListener("pointerdown", handlePointerDown);
//     mapObject.getViewport().addEventListener("pointerup", handlePointerUp);
//     setMap(mapObject);

//     return () => {
//       mapObject
//         .getViewport()
//         .removeEventListener("pointerdown", handlePointerDown);
//       mapObject.getViewport().removeEventListener("pointerup", handlePointerUp);
//     };
//   }, [isDragging]);

//   // // zoom change handler
//   // useEffect(() => {
//   //   if (!map) return;
//   //   map.getView().setZoom(zoom);
//   // }, [zoom]);

//   // // center change handler
//   // useEffect(() => {
//   //   if (!map) return;

//   //   map.getView().setCenter(center);
//   //   // flyTo(center, map.getView());
//   //   // map.getView().animate({
//   //   //   resolution: 4, // jump effect
//   //   //   center: center,
//   //   //   duration: 500,
//   //   // });
//   // }, [center]);

//   return (
//     <MapContext.Provider value={{ map }}>
//       <div id="map" ref={mapRef} className="ol-map">
//         {children}
//       </div>
//     </MapContext.Provider>
//   );
// };

// export const useMap = () => useContext(MapContext);
// export default MapBox;

// function flyTo(location, view, done = () => {}) {
//   const duration = 1000;
//   const zoom = view.getZoom();
//   let parts = 2;
//   let called = false;
//   function callback(complete) {
//     --parts;
//     if (called) {
//       return;
//     }
//     if (parts === 0 || !complete) {
//       called = true;
//       done(complete);
//     }
//   }
//   view.animate(
//     {
//       center: location,
//       duration: duration,
//     },
//     callback
//   );
//   view.animate(
//     {
//       zoom: zoom,
//       duration: duration / 2,
//     },
//     {
//       zoom: zoom,
//       duration: duration / 2,
//     },
//     callback
//   );
// }
