import React, { useRef, useState } from "react";
// import NeshanMap from "react-neshan-map-leaflet";
import NeshanMap from "../../../components/NeshanMap/NeshanMap";
import caroLogo from "../../../../assets/images/CaroLogo/loading.png";
import pin from "../../../../assets/images/colorPin.png";
import { useLocation } from "react-router";
import { locationSearchStringToObject } from "../../../../core/utility/utils";
import { useEffect } from "react";
// /////

const useCalcMap = ({
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
    /// clean up
    return () => {
      if (mapRef.current) {
        // mapRef.current.off();
        // mapRef.current.remove();
        // document.getElementsByClassName("leaflet-container")[0].innerHTML = "";
      }
    };
  }, [originPosition]);
  /////////
  const renderMap = () => {
    return (
      <NeshanMap
        // ref={ref}
        style={{
          width: "100%",
          height: "400px",
        }}
        options={{
          key: "web.403df50a10684a40af12ca02cd82a9ef",
          center: originPosition,
          zoom: 13,
        }}
        onInit={(L, myMap) => {
          const container = L.DomUtil.get("map");
          console.log(container);
          if (container != null) {
            container._leaflet_id = null;
          }
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

            // let branchMarker;
            // let marker = null;
            // let polyline = null;

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
                myMap.flyTo({ lat: des[0], lng: des[1] }, myMap.getZoom());
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

  return {
    renderMap,
    set_positions,
  };
};

export default useCalcMap;

/////////////////////////////////
function OriginChange({ origin, map }) {
  //
  // const map = useMap();
  useEffect(() => {
    console.log(map);
    console.log(origin);
  }, []);
  React.useEffect(() => {
    map.flyTo({ lat: origin[0], lng: origin[1] }, map.getZoom());
  }, [origin]);
  //
  return <></>;
}
/////////////////////////////////
function LocationMarker({
  set_positions,
  positions,
  onDestinationSelected,
  dragging = true,
}) {
  const location = useLocation();
  // const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      if (dragging === true) {
        if (positions.length === 1) {
          set_positions((pl) => [...pl, [e.latlng.lat, e.latlng.lng]]);
        }
        if (positions.length > 1) {
          const arr = [positions[0], [e.latlng.lat, e.latlng.lng]];
          set_positions(arr);
        }
        onDestinationSelected([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });
  useEffect(() => {
    if (location.search) {
      const searchObj = locationSearchStringToObject(location.search);
      if (
        searchObj?.destLat &&
        searchObj?.destLng &&
        searchObj?.branchLat &&
        searchObj?.branchLng
      ) {
        const br = [Number(searchObj?.branchLat), Number(searchObj?.branchLng)];
        const des = [Number(searchObj?.destLat), Number(searchObj?.destLng)];
        onDestinationSelected(des);
        myMap.flyTo({ lat: des[0], lng: des[1] }, myMap.getZoom());
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
        ///////
        var latlngs = Array();
        latlngs.push(branchLocationMarkerRef.current.getLatLng());
        latlngs.push(userLocationMarkerRef.current.getLatLng());
        polylineRef.current = L.polyline(latlngs, {
          color: "#CB7640",
        }).addTo(myMap);
      }
    } else {
      L.marker(originPosition, {
        icon: branchLocationIconRef,
      })
        .addTo(myMap)
        .bindPopup("شعبه دونات");
    }

    myMap.on("click", function (e) {
      onDestinationSelected([e.latlng.lat, e.latlng.lng]);
      if (userLocationMarkerRef.current)
        myMap.removeLayer(userLocationMarkerRef.current);
      if (polylineRef.current) myMap.removeLayer(polylineRef.current);
      ////////
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
    });
  });
  ////////////
  useEffect(() => {
    if (mapRef.current) {
      if (branchLocationMarkerRef.current)
        mapRef.current.removeLayer(branchLocationMarkerRef.current);
      if (userLocationMarkerRef.current)
        mapRef.current.removeLayer(userLocationMarkerRef.current);
      if (polylineRef.current) mapRef.current.removeLayer(polylineRef.current);

      setTimeout(() => {
        branchLocationMarkerRef.current = new L.Marker(originPosition, {
          draggable: true,
          icon: branchLocationIconRef.current,
        });
        mapRef.current.addLayer(branchLocationMarkerRef.current);
        branchLocationMarkerRef.current.bindPopup("مقصد");
        mapRef.current.flyTo(originPosition, mapRef.current.getZoom());
      }, 0);
    }
  }, [originPosition]);
  ////////////
  const reInitialize = () => {
    if (userLocationMarkerRef.current)
      mapRef.current.removeLayer(userLocationMarkerRef.current);
    if (polylineRef.current) mapRef.current.removeLayer(polylineRef.current);
    ///
    const latlng = userLocationMarkerRef.current.getLatLng();
    try {
      mapRef.current.flyTo(latlng, mapRef.current.getZoom());
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);
  ////////////
  const renderMap = () => {
    return useMemo(
      () => (
        <NeshanMap
          style={{
            width: "100%",
            height: "400px",
          }}
          options={{
            key: "web.403df50a10684a40af12ca02cd82a9ef",
            center: originPosition,
            zoom: 13,
            draggable: draggable,
          }}
          onInit={onMapInit}
        />
      ),
      []
    );
  };

  return {
    renderMap,
    reInitialize,
  };
}
