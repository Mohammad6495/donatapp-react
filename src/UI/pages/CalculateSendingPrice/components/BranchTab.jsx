import React, { useState, useEffect } from "react";
import OrdinaryButton from "./../../../components/OrdinaryButton/OrdinaryButton";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import {
  calcPrice_apiCalls,
  customerAddress_apiCalls,
} from "../../../../core/services/agent";
import { useLoadingContext } from "./../../../../core/contexts/LoadingContext/LoadingContext";
import { useLocation } from "react-router";
import { formatNumber } from "../../../../core/utility/helperFunctions";
import MyNeshanMap from "./NeshanMap";
import "./styles/BranchTab.scss";
import { useMemo } from "react";
import OLMap from "../../../components/openLayerMap/OLMap";
import { locationSearchStringToObject } from "../../../../core/utility/utils";

const BranchTab = ({
  originPosition,
  currentBranch,
  onDestinationSelected,
  handleCalculatePrice,
  handleRecalculatePrice,
  price,
  addressName,
  destini,
}) => {
  const [is, setIs] = useState(false);

  const handleRecalculatePriceA = () => {
    setIs(false);
    handleRecalculatePrice();
  };

  ///////////////////////
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center map-holder w-100 ${!is && 'pb-5'}`}
    >
      <div className="position-relative map-container">
        {price ? <div className="map-overlay"></div> : <></>}
        {/* */}
        {originPosition &&
          useMemo(
            () => (
              <OLMap
                onDestinationSelected={onDestinationSelected}
                origin={[originPosition[1], originPosition[0]]}
                destination={destini}
                currentBranch={currentBranch}
                setIs={setIs}
                is={is}
              />
            ),
            [destini, originPosition]
          )}
      </div>
      {addressName && (
        <div className="destination-address-holder my-1 fs-7 w-100 p-2 border-bottom">
          <span className="destination-address-text">مقصد : </span>
          <span className="destination-address">{addressName}</span>
        </div>
      )}
      {/* {addressName && (
        <div className="fs-7 w-100 p-2 border-bottom">{addressName}</div>
      )} */}
      {/* ==== */}
      <div className="d-flex flex-column justify-content-center align-items-start w-100">
        <div className="d-flex flex-column justify-content-start align-items-start px-2">
          <div className="origin-address-holder my-1">
            <span className="origin-address-text">مبدا : </span>
            <span className="origin-address">{currentBranch?.address}</span>
          </div>
          {/* Destination Address */}
        </div>
        {/* Buttons */}

        {price != 0 && price != -1 && !price && is && (
          <OrdinaryButton
            buttonText="محاسبه قیمت"
            isActive="true"
            isDisabled={destini ? false : true}
            holderClasses="my-2 w-100"
            handleOnClick={handleCalculatePrice}
          />
        )}
        {(price == 0 || price == -1 || price) && destini && (
          <>
            <OrdinaryButton
              buttonText={`قیمت پیک : ${
                price == -1 ? "نامشخص" : formatNumber(price)
              }`}
              isActive="true"
              holderClasses="my-2 w-100"
            />
            <div className="d-flex justify-content-center align-items-center outlined-button-holder mt-2 w-100">
              <button onClick={handleRecalculatePriceA} className="py-2">
                محاسبه دوباره
              </button>
            </div>
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default BranchTab;
