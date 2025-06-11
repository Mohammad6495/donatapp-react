import React, { useRef, useState, useEffect } from "react";
// import NeshanMap from "react-neshan-map-leaflet";
import NeshanMap from "../../../components/NeshanMap/NeshanMap";
import caroLogo from "../../../../assets/images/CaroLogo/loading.png";
import pin from "../../../../assets/images/colorPin.png";
import { useLocation } from "react-router";
import { locationSearchStringToObject } from "../../../../core/utility/utils";

// /////

const MyNeshanMap = ({
  originPosition = [36.54259076199696, 53.01246398520805],
  onDestinationSelected,
  draggable = true,
}) => {
  /////////
  const location = useLocation();
  const [positions, set_positions] = useState([originPosition]);
  const ref = useRef();
  const mapRef = useRef();
  const leafletRef = useRef();
  const userLocationIconRef = useRef();
  const branchLocationIconRef = useRef();
  const branchLocationMarkerRef = useRef();
  const userLocationMarkerRef = useRef();
  const polylineRef = useRef();
  //
  useEffect(() => {
    if (mapRef.current && originPosition) {
      if (userLocationMarkerRef.current)
        mapRef.current.removeLayer(userLocationMarkerRef.current);
      if (branchLocationMarkerRef.current)
        mapRef.current.removeLayer(branchLocationMarkerRef.current);
      if (polylineRef.current) mapRef.current.removeLayer(polylineRef.current);
      setTimeout(() => {
        ///////////
        branchLocationMarkerRef.current = L.marker(originPosition, {
          icon: branchLocationIconRef.current,
        })
          .addTo(mapRef.current)
          .bindPopup("شعبه دونات");
      }, 0);
      mapRef.current.flyTo(
        { lat: originPosition[0], lng: originPosition[1] },
        mapRef.current.getZoom()
      );
    }
    console.log(mapRef.current);
    /// clean up
    return () => {
      if (mapRef.current) {
        // mapRef.current._container = null;
        // mapRef.current.off();
        mapRef.current.remove();
        leafletRef.current.DomUtil.remove();
        // document.getElementsByClassName("leaflet-container")[0].innerHTML = "";
        // const container = L.DomUtil.get("map");
        // console.log(container);
        // if (container != null) {
        //   container._leaflet_id = null;
        // }
      }
    };
  }, [originPosition]);
  /////////
  useEffect(() => {
    if (leafletRef.current) {
      const container = leafletRef.current.DomUtil.get("map");
      console.log(leafletRef.current.DomUtil);
      // console.log(DomUtil);
      // if (container != null) {
      //   container._leaflet_id = null;
      // }
    }
  }, [leafletRef.current]);
  //////
  return (
    <NeshanMap
      style={{
        width: "100%",
        height: "400px",
      }}
      options={{
        key: "web.403df50a10684a40af12ca02cd82a9ef",
        center: originPosition,
        zoom: 14,
      }}
      onInit={(L, myMap) => {
        setTimeout(() => {
          mapRef.current = myMap;
          leafletRef.current = L;
          ////////
          userLocationIconRef.current = L.icon({
            iconUrl: pin,
            iconSize: [30, 30],
          });
          branchLocationIconRef.current = leafletRef.current.icon({
            iconUrl: caroLogo,
            iconSize: [30, 30],
          });

          ////////

          if (location.search) {
            const searchObj = locationSearchStringToObject(location.search);
            if (
              searchObj?.destLat &&
              searchObj?.destLng &&
              searchObj?.branchLat &&
              searchObj?.branchLng
            ) {
              const br = [
                Number(searchObj?.branchLat),
                Number(searchObj?.branchLng),
              ];
              const des = [
                Number(searchObj?.destLat),
                Number(searchObj?.destLng),
              ];

              ///////////
              branchLocationMarkerRef.current = L.marker(br, {
                icon: branchLocationIconRef.current,
              })
                .addTo(myMap)
                .bindPopup("شعبه دونات");
              /////
              userLocationMarkerRef.current = new L.Marker(des, {
                draggable: true,
                icon: userLocationIconRef.current,
              });
              myMap.addLayer(userLocationMarkerRef.current);
              userLocationMarkerRef.current.bindPopup("مقصد");
              ////
              /////
              var latlngs = Array();
              latlngs.push(branchLocationMarkerRef.current.getLatLng());
              latlngs.push(userLocationMarkerRef.current.getLatLng());
              polylineRef.current = L.polyline(latlngs, {
                color: "#CB7640",
              }).addTo(myMap);
              ///////
              setTimeout(() => {
                myMap.flyTo({ lat: des[0], lng: des[1] }, myMap.getZoom());
              }, 0);
            }
          } else {
            L.marker(originPosition, {
              icon: branchLocationIconRef,
            })
              .addTo(myMap)
              .bindPopup("شعبه دونات");
          }

          myMap.on("click", function (e) {
            if (userLocationMarkerRef.current)
              myMap.removeLayer(userLocationMarkerRef.current);
            if (polylineRef.current) myMap.removeLayer(polylineRef.current);

            setTimeout(() => {
              myMap.flyTo(e.latlng, myMap.getZoom());
              userLocationMarkerRef.current = new L.Marker(e.latlng, {
                draggable: true,
                icon: userLocationIconRef.current,
              });
              myMap.addLayer(userLocationMarkerRef.current);
              userLocationMarkerRef.current.bindPopup("مقصد");

              /////
              var latlngs = Array();
              latlngs.push(branchLocationMarkerRef.current.getLatLng());
              latlngs.push(userLocationMarkerRef.current.getLatLng());
              polylineRef.current = L.polyline(latlngs, {
                color: "#CB7640",
              }).addTo(myMap);
            }, 0);
            // }, 0);
          });
        }, 0);
      }}
    />
  );
};

export default MyNeshanMap;
