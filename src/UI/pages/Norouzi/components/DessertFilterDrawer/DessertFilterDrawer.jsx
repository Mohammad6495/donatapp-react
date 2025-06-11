import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { useLeftDrawerStyles } from "../../../../../core/custom-hooks/useDrawerStyles";
import DessertRangeSlider from "./components/DessertRangeSlider";
import { KeyboardArrowUp, Close } from "@mui/icons-material";
import SwitchButton from "../../../../components/switch-button/SwitchButton";
import "./styles/DessertFilterDrawer.scss";

const DessertFilterDrawer = ({
  handleDrawerClicking,
  handleClearAllFilters,
  drawerIsOpen,
  // Price Range Data
  staticPriceRangeValue,
  changeRangeSliderHandler,
  selectedPriceRangeValue,
  rangeSliderMaxInputChangeHandler,
  rangeSliderMinInputChangeHandler,
  //
  // weightSelectValue,
  // changeWeightHandler,
  // check boxes data
  checkBoxesData,
  changeCheckBoxesHandler,
}) => {
  const leftDrawerClasses = useLeftDrawerStyles();
  const [showClearButton, setShowClearButton] = useState(false);

  const isAbleToShowClearButton = () => {
    const someCheckBoxIsChecked = checkBoxesData?.some(
      (it) => it.checked == true
    );
    if (
      selectedPriceRangeValue[0] != staticPriceRangeValue[0] ||
      selectedPriceRangeValue[1] != staticPriceRangeValue[1] ||
      someCheckBoxIsChecked == true
    ) {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  };

  useEffect(() => {
    isAbleToShowClearButton();
  }, [selectedPriceRangeValue, checkBoxesData]);

  return (
    <>
      <Drawer
        {...leftDrawerClasses}
        dir="rtl"
        anchor="left"
        open={drawerIsOpen}
        onClose={handleDrawerClicking}
      >
        <div className="w-100 p-4">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">فیلتر</span>
            <KeyboardBackspace
              className="cursor-pointer"
              onClick={handleDrawerClicking}
            />
          </div>
          <div className="d-flex flex-column w-100 h-100 mt-4">
            {/* <div className="d-flex justify-content-between align-items-center">
              <span>ذخیره تغییرات</span>
              <Button
                style={{
                  backgroundColor: "#CB7640",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              >
                ذخیره
              </Button>
            </div> */}
            {/* <div className="divider my-4"></div> */}
            {/* Start Range Sliders */}
            <DessertRangeSlider
              rangeUnit="تومان"
              rangeUnitText="قیمت"
              staticPriceRangeValue={staticPriceRangeValue}
              changeSliderHandler={changeRangeSliderHandler}
              selectedPriceRangeValue={selectedPriceRangeValue}
              rangeSliderMaxInputChangeHandler={
                rangeSliderMaxInputChangeHandler
              }
              rangeSliderMinInputChangeHandler={
                rangeSliderMinInputChangeHandler
              }
            />
            {/* Start Select Option */}
            {/* <div className="w-100">
              <InputLabel className="mb-2" id="weight-simple-select-label">
                وزن
              </InputLabel>
              <Select
                labelId="weight-simple-select-label"
                id="weight-simple-select"
                value={weightSelectValue}
                onChange={changeWeightHandler}
                className="w-100"
              >
                <MenuItem value={0}>انتخاب نشده</MenuItem>
                <MenuItem value={1}>کمتر از 500 گرم</MenuItem>
                <MenuItem value={2}>بین 500 تا 1000 گرم</MenuItem>
                <MenuItem value={3}>بین 1000 تا 2000 گرم</MenuItem>
                <MenuItem value={4}>بین 2000 تا 3000 گرم</MenuItem>
                <MenuItem value={5}>بیش از 3000 گرم</MenuItem>
              </Select>
            </div> */}
            {/* End Select Option */}
            {/* start check boxes */}
            <div className="w-100 mt-3">
              <div className="d-flex justify-content-start align-items-center">
                {checkBoxesData?.map((item) => (
                  <div key={item?.id} className="">
                    <label htmlFor={item?.title} className="cursor-pointer">
                      {item.text}
                    </label>
                    <Checkbox
                      id={item?.title}
                      checked={item?.checked}
                      onChange={() => changeCheckBoxesHandler(item?.id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* end check boxes */}
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

export default DessertFilterDrawer;
