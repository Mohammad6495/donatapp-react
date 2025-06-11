import React from "react";
import Slider from "@mui/material/Slider";
import "./DessertRangeSlider.scss";

const DessertRangeSlider = ({
  staticPriceRangeValue,
  selectedPriceRangeValue,
  changeSliderHandler,
  rangeUnitText,
  rangeUnit,
  rangeSliderMaxInputChangeHandler,
  rangeSliderMinInputChangeHandler,
}) => {
  return (
    <div className="d-flex flex-column w-100 my-2">
      <div className="d-flex justify-content-start align-items-center w-100 p-2 range-slider-input-holder">
        {rangeUnitText} از{" "}
        <input
          onChange={rangeSliderMinInputChangeHandler}
          className="mx-2"
          value={selectedPriceRangeValue[0]}
        />{" "}
        تا
        <input
          onChange={rangeSliderMaxInputChangeHandler}
          className="mx-2"
          value={selectedPriceRangeValue[1]}
        />{" "}
        {rangeUnit}
      </div>
      <div className="w-100 px-3">
        <Slider
          getAriaLabel={() => "price range"}
          value={selectedPriceRangeValue}
          onChange={changeSliderHandler}
          step={100000}
          min={staticPriceRangeValue[0]}
          max={staticPriceRangeValue[1]}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </div>
    </div>
  );
};

export default DessertRangeSlider;
