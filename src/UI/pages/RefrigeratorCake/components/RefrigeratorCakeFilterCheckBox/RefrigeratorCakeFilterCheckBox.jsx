import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import "./style/RefrigeratorCakeFilterCheckBox.scss";
import {
  locationSearchStringToObject,
  objectToQueryString,
} from "../../../../../core/utility/utils";
import { useLocation, useNavigate } from "react-router";

const checkBoxesInitialState = [
  { id: "1", checked: false, text: "موز", title: "banana" },
  { id: "2", checked: false, text: "توت فرنگی", title: "strawberry" },
  { id: "3", checked: false, text: "گردو", title: "walnut" },
];

const RefrigeratorCakeFilterCheckBox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function onChange(txt) {
    let qs = decodeURIComponent(location.search) ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};
    if (qs?.includes(txt)) {
      const cakeTypesList = qo?.cakeTypes?.split(",");
      const index = cakeTypesList.indexOf(txt);
      cakeTypesList?.splice(index, 1);
      if (cakeTypesList?.length === 0) {
        delete qo.cakeTypes;
      } else qo.cakeTypes = cakeTypesList.join(",");
    } else {
      const cakeTypesList =
        qo?.cakeTypes?.length > 0 ? qo?.cakeTypes?.split(",") : [];
      cakeTypesList?.push(txt);
      qo.cakeTypes = cakeTypesList.join(",");
    }
    //

    const newQs = objectToQueryString(qo);
    navigate(location.pathname + newQs);
  }

  const isItemChecked = (text) => {
    let qs = decodeURIComponent(location.search) ?? "";
    return qs.includes(text);
  };

  return (
    <div className="w-100 mt-3">
      <div className="d-flex justify-content-start align-items-center">
        {checkBoxesInitialState?.map((item) => (
          <div key={item?.id} className="">
            <label htmlFor={item?.title} className="cursor-pointer">
              {item.text}
            </label>
            <Checkbox
              id={item?.title}
              checked={isItemChecked(item.text)}
              onChange={() => onChange(item?.text)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefrigeratorCakeFilterCheckBox;
