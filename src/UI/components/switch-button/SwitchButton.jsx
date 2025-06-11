import React from "react";
import Switch from '@mui/material/Switch';

const label = { inputProps: { "aria-label": "Size switch demo" } };

const SwitchButton = ({ switchButtonText }) => {
  return (
    <div className="d-flex justify-content-start align-items-center gap-1 my-2">
      <Switch {...label} defaultChecked />
      {switchButtonText && <span className="fs-8">{switchButtonText}</span>}
    </div>
  );
};

export default SwitchButton;
