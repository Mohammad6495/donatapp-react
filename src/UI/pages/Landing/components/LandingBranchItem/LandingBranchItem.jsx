import React, { useEffect, useState } from "react";
import marker from "../../../../../assets/images/colorPin.png";
import "./styles/LandingBranchItem.scss";
import OLAddressMap from "../../../../components/openLayerMap/StaticChossMap";

const LandingBranchMapItem = ({
  branchName,
  branchImg,
  branchAddress,
  isActive,
  centerPosition,
}) => {
  // const myIcon = new Icon({
  //   iconUrl: marker,
  //   iconSize: [32, 32],
  // });
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    setCoordinates(centerPosition);
  }, []);
  return (
    <div dir="rtl" className="cursor-pointer w-100">
      <span style={{ color: isActive === "true" ? "#CB7640" : "#858585" }}>
        {branchName}
      </span>
        {
          coordinates &&
          <OLAddressMap destination={coordinates} height={'200px'} />
        }
        {/* <MapContainer
          className="my-map-container"
          center={centerPosition}
          zoom={14}
          dragging={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          />
          <Marker position={centerPosition} icon={myIcon}>
            <Popup>{branchName}</Popup>
          </Marker>
        </MapContainer> */}
        {/*  */}
      <div className="my-2 fs-7">
        <span style={{ color: isActive === "true" ? "#CB7640" : "#858585" }}>
          آدرس تقریبی :{" "}
        </span>{" "}
        <span style={{ color: isActive === "true" ? "#CB7640" : "#858585" }}>
          {branchAddress}
        </span>
      </div>
    </div>
  );
};

export default LandingBranchMapItem;

export const LandingBranchItem = ({
  branchId,
  branchName,
  branchAddress,
  branchClickHandler,
  isActive,
}) => {
  const handleSelectBranch = () => {
    branchClickHandler(branchId);
  };
  return (
    <div
      onClick={handleSelectBranch}
      className="d-flex flex-column justify-content-center align-items-start branch-container cursor-pointer mb-2"
    >
      <div
        className={`p-0 m-0 p-3 branch-holder ${isActive === true ? "active" : ""
          }`}
      >
        <span className="fw-bold">{branchName}</span>
        <div>
          <span>آدرس : </span>
          {branchAddress && <span>{branchAddress}</span>}{" "}
          {!branchAddress && <span>آدرسی یافت نشد</span>}
        </div>
      </div>
    </div>
  );
};
