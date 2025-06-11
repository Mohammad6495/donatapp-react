import React, { useState } from "react";
import { Button, Drawer, InputLabel, MenuItem, Select } from "@mui/material";
import { KeyboardBackspace, KeyboardArrowUp, Close } from "@mui/icons-material";
import { useLeftDrawerStyles } from "../../../../../core/custom-hooks/useDrawerStyles";
import RefrigeratorCakeRangeSlider from "../RefrigeratorCakeRangeSlider/RefrigeratorCakeRangeSlider";
import SwitchButton from "../../../../components/switch-button/SwitchButton";
import RefrigeratorCakeFilterCheckBox from "../RefrigeratorCakeFilterCheckBox/RefrigeratorCakeFilterCheckBox";

const RefrigeratorCakeFilterDrawer = ({
  handleDrawerClicking,
  handleClearAllFilters,
  drawerIsOpen,
  // Price Range Slider Data
  staticRangeValue,
  selectedRangeValue,
  changeRangeSliderHandler,
  rangeSliderMaxInputChangeHandler,
  rangeSliderMinInputChangeHandler,
  // Weight Range Slider Data
  weightSelectValue,
  changeWeightHandler,
}) => {
  const leftDrawerClasses = useLeftDrawerStyles();

  const [showClearButton, setShowClearButton] = React.useState(false);

  const isAbleToShowClearButton = () => {
    if (
      selectedRangeValue[0] != staticRangeValue[0] ||
      selectedRangeValue[1] != staticRangeValue[1] ||
      weightSelectValue != 0
    ) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  };

  React.useEffect(() => {
    isAbleToShowClearButton();
  }, [selectedRangeValue, weightSelectValue]);

  return (
    <>
      <Drawer
        {...leftDrawerClasses}
        dir="rtl"
        anchor="left"
        open={drawerIsOpen}
        onClose={handleDrawerClicking}
      >
        <div className="w-100 pt-4 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">فیلتر</span>
            <KeyboardBackspace
              className="cursor-pointer"
              onClick={handleDrawerClicking}
            />
          </div>
          <div className="d-flex flex-column w-100 h-100 mt-4">
            {/* Start Range Sliders */}
            <RefrigeratorCakeRangeSlider
              rangeUnit="تومان"
              rangeUnitText="قیمت"
              staticRangeValue={staticRangeValue}
              changeRangeSliderHandler={changeRangeSliderHandler}
              selectedRangeValue={selectedRangeValue}
              rangeSliderMaxInputChangeHandler={
                rangeSliderMaxInputChangeHandler
              }
              rangeSliderMinInputChangeHandler={
                rangeSliderMinInputChangeHandler
              }
            />
            {/* Select Option */}
            <div className="w-100">
              <InputLabel className="mb-2" id="weight-simple-select-label">
                وزن
              </InputLabel>
              <Select
                labelId="weight-simple-select-label"
                id="weight-simple-select"
                value={weightSelectValue}
                // label="وزن"
                onChange={changeWeightHandler}
                className="w-100"
              >
                <MenuItem value={0}>انتخاب وزن</MenuItem>
                <MenuItem value={1}>کمتر از 500 گرم</MenuItem>
                <MenuItem value={2}>بین 500 تا 1000 گرم</MenuItem>
                <MenuItem value={3}>بین 1000 تا 2000 گرم</MenuItem>
                <MenuItem value={4}>بین 2000 تا 3000 گرم</MenuItem>
                <MenuItem value={5}>بیش از 3000 گرم</MenuItem>
              </Select>
            </div>
            {/* Checkboxes */}
            <RefrigeratorCakeFilterCheckBox />
            {/* Buttons */}
            <div
              style={{
                position: "absolute",
                bottom: "calc(0.5rem + env(safe-area-inset-bottom))",
                left: "0",
                right: "0",
              }}
              className="w-100 d-flex flex-column justify-content-center align-items-center mx-auto p-2"
            >
              {showClearButton && (
                <button
                  style={{
                    border: "1px solid #CB7640",
                    outline: "none",
                    backgroundColor: "",
                    color: "#CB7640",
                  }}
                  className="w-100 py-2 px-3 mb-2 d-flex justify-content-between align-items-center rounded"
                  onClick={handleClearAllFilters}
                >
                  <span>حذف فیلترها</span>
                  <Close />
                </button>
              )}
              <button
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "#CB7640",
                  color: "#fff",
                }}
                className="w-100 py-2 px-3 d-flex justify-content-between align-items-center rounded"
                onClick={handleDrawerClicking}
              >
                <span>مشاهده کالاها</span>
                <KeyboardArrowUp />
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default RefrigeratorCakeFilterDrawer;
