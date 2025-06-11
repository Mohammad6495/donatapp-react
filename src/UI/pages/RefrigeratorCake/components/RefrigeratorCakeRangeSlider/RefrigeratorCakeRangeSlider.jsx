import React from "react";
import Slider from "@mui/material/Slider";
import "../styles/RefrigeratorCakeRangeSlider.scss";
import { useLocation, useNavigate } from "react-router";
import {
  locationSearchStringToObject,
  objectToQueryString,
} from "../../../../../core/utility/utils";

const RefrigeratorCakeRangeSlider = ({
  staticRangeValue,
  selectedRangeValue,
  changeRangeSliderHandler,
  rangeUnitText,
  rangeUnit,
  rangeSliderMinInputChangeHandler,
  rangeSliderMaxInputChangeHandler,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  //======================================//
  const getRangeSliderInitialValue = () => {
    const qs = location.search;
    const qo = locationSearchStringToObject(qs);
    const rangeArr = [];
    rangeArr.push(
      qs?.includes("minPrice") ? Number(qo.minPrice) : staticRangeValue[0]
    );
    rangeArr.push(
      qs?.includes("maxPrice") ? Number(qo.maxPrice) : staticRangeValue[1]
    );
    return rangeArr;
  };
  //======================================//
  function onSliderValuesChange(e) {
    const newValues = e.target.value;
    //
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    //
    const newMin = newValues[0];
    const newMax = newValues[1];
    //
    qo.minPrice = newMin;
    qo.maxPrice = newMax;
    //
    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  }
  //======================================//
  const onMinPriceChange = (e) => {
    const { value } = e.target;
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    //
    const newMin = value;
    //
    qo.minPrice = newMin;
    //
    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  };
  const onMaxPriceChange = (e) => {
    const { value } = e.target;
    let qs = location.search ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    //
    const newMax = value;
    //
    qo.maxPrice = newMax;
    //
    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  };
  //======================================//
  return (
    <div className="d-flex flex-column w-100 my-2">
      <div className="d-flex justify-content-start align-items-center w-100 p-2 range-slider-input-holder">
        {rangeUnitText} از{" "}
        <input
          onChange={onMinPriceChange}
          className="mx-2"
          value={getRangeSliderInitialValue()[0]}
        />{" "}
        تا
        <input
          onChange={onMaxPriceChange}
          className="mx-2"
          value={getRangeSliderInitialValue()[1]}
        />{" "}
        {rangeUnit}
      </div>
      <div className="w-100 px-3">
        <Slider
          getAriaLabel={() => "price range"}
          value={getRangeSliderInitialValue() ?? staticRangeValue}
          onChange={onSliderValuesChange}
          step={100}
          min={staticRangeValue[0]}
          max={staticRangeValue[1]}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </div>
    </div>
  );
};

export default RefrigeratorCakeRangeSlider;
