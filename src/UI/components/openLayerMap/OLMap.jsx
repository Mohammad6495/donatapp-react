import React, { useEffect, useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon, Stroke } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { osm, vector } from "./Source";
import { fromLonLat, get, toLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";
import carologo from "../../../assets/images/caroLogo.png";
// import colorPin from "../../../assets/images/colorPin.png";
import pinIcon from "../../../assets/images/map.png";
// import pinIcon from "../../../assets/images/location.png";
import { locationSearchStringToObject } from "../../../core/utility/utils";
import { useLocation } from "react-router";
import OrdinaryButton from "../OrdinaryButton/OrdinaryButton";

////
function addBranchFeature(params) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: carologo,
    }),
  });
  let feature = new Feature({
    geometry: new Point(fromLonLat([params[0], params[1]])),
  });
  feature.setStyle(iconStyle);
  return feature;
}
////
function addUserFeature(params) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: pinIcon,
    }),
  });
  let feature = new Feature({
    geometry: new Point(fromLonLat(params)),
  });
  feature.setStyle(iconStyle);
  return feature;
}
////

/////////////////////////
/////////////////////////
const OLMap = ({
  origin,
  destination,
  onDestinationSelected,
  currentBranch,
  setIs,
  is
}) => {
  const location = useLocation();
  // initial config
  const [center, setCenter] = useState(origin);
  const [zoom, setZoom] = useState(15);
  // features
  const [branchFeature, setBranchFeature] = useState(addBranchFeature(origin));
  const [userFeature, setUserFeature] = useState();
  const [lineFeature, setLineFeature] = useState();
  const [isStroke, setIsStroke] = useState(false);

  const handleClickStroke = () => {
    setIs(true);
    setIsStroke(true);
  };
  // event listeners
  const handleClick = (e) => {
    const lnglat = toLonLat(e);
    if (onDestinationSelected) {
      onDestinationSelected([lnglat[1], lnglat[0]]);
    }
    setCenter(lnglat)
  };

  function addLineFeature(latlng1, latlng2) {
    const points = [fromLonLat(latlng1), fromLonLat(latlng2)];
    const line_feat1 = new Feature({
      geometry: new LineString(points),
      name: "My_Simple_LineString",
    });

    const lineStyle = new Style({
      zIndex: 1,

      stroke: isStroke
        ? new Stroke({
            color: "#CB7640",
            width: 3,
            lineCap: "round",
          })
        : null,
    });
    line_feat1.setStyle(lineStyle);
    return line_feat1;
  }
  // useEffects
  useEffect(() => {
    if (destination) {
      const lnglat = [destination[1], destination[0]];
      setUserFeature(null);
      setLineFeature(null);
      setTimeout(() => {
        setCenter(lnglat);
        setLineFeature(addLineFeature(origin, lnglat));
        // setUserFeature(addUserFeature(lnglat));
      }, 0);
    }
  }, [destination, isStroke]);
  useEffect(() => {
    if (location.search) {
      const searchObj = locationSearchStringToObject(location.search);
      if (
        searchObj?.destLat &&
        searchObj?.destLng &&
        searchObj?.branchLat &&
        searchObj?.branchLng
      ) {
        const br = [Number(searchObj?.branchLng), Number(searchObj?.branchLat)];
        const des = [Number(searchObj?.destLat), Number(searchObj?.destLng)];
        onDestinationSelected(des);
      }
    }
  }, [location.search]);
  //////////////////
  // useEffect(() => {
  //   if (origin) {
  //     setCenter(origin);
  //     setBranchFeature(null);
  //     setUserFeature(null);
  //     setLineFeature(null);
  //     setTimeout(() => {
  //       setBranchFeature(addBranchFeature(origin));
  //     }, 0);
  //   }
  // }, [origin]);
  useEffect(() => {
    if (origin) {
      // setCenter(origin);
      setBranchFeature(null);
      setUserFeature(null);
      setLineFeature(null);
      setTimeout(() => {
        setBranchFeature(addBranchFeature(origin));
      }, 0);
    }
  }, [origin]);
  ////////////////////////
  return (
    <>
      <div>
        <Map
          setIsStroke={setIsStroke}
          center={fromLonLat(center)}
          zoom={zoom}
          onClick={handleClick}
          setIs={setIs}
        >
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
          {branchFeature && (
            <VectorLayer
              zIndex={5}
              source={vector({ features: [branchFeature] })}
            />
          )}
          {userFeature && (
            <VectorLayer
              zIndex={5}
              source={vector({ features: [userFeature] })}
            />
          )}
          {lineFeature && (
            <VectorLayer
              zIndex={1}
              source={vector({ features: [lineFeature] })}
            />
          )}
        </Map>
      </div>
      <>
        {!isStroke && (
          <OrdinaryButton
            buttonText="تایید مقصد"
            isActive="true"
            holderStyles={{
              position: "fixed",
              bottom: "5px",
              right: "0",
              left: "0",
              margin: "0 auto",
              maxWidth: "542px",
            }}
            holderClasses="w-100"
            handleOnClick={handleClickStroke}
          />
        )}
        {destination == undefined && (
          <OrdinaryButton
            buttonText="تایید مقصد"
            isActive="true"
            holderStyles={{
              position: "fixed",
              bottom: "5px",
              right: "0",
              left: "0",
              margin: "0 auto",
              maxWidth: "542px",
            }}
            holderClasses="w-100"
            handleOnClick={handleClickStroke}
          />
        )}
      </>
    </>
  );
};

export default OLMap;
