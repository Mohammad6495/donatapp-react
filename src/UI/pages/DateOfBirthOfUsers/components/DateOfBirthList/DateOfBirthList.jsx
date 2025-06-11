import React from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FiEdit } from "react-icons/fi";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

const DateOfBirthList = ({ id, title, handleDeleteBirthDay, month, day }) => {
  const getNameMountToPersian = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "فروردین";
      case 2:
        return "اردیبهشت";
      case 3:
        return "خرداد";
      case 4:
        return "تیر";
      case 5:
        return "مرداد";
      case 6:
        return "شهریور";
      case 7:
        return "مهر";
      case 8:
        return "آبان";
      case 9:
        return "آذر";
      case 10:
        return "دی";
      case 11:
        return "بهمن";
      case 12:
        return "اسفند";
    }
  };
  return (
    <div className="birthday-list d-flex justify-content-between mb-2">
      <div className="d-flex">
        <AccountBoxIcon
          style={{
            color: "#ccc",
          }}
          sx={{
            fontSize: "80px",
          }}
        />
        <div className="birthday-list-title d-flex flex-column">
          <h5 className="mb-0 mt-2 fs-7">
            {" "}
            نام: <span style={{ fontWeight: "600" }}>{title}</span>
          </h5>
          <h5 className="mb-0 mt-3 fs-8">
            {" "}
            تاریخ مناسبت: <span style={{ fontWeight: "600" }}>{day} {getNameMountToPersian(month)}</span>
          </h5>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Button
          onClick={() => handleDeleteBirthDay(id)}
          className="ms-1"
          style={{ minWidth: "0", backgroundColor: "#e53535" }}
        >
          <AiOutlineDelete fontSize={18} color="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default DateOfBirthList;
