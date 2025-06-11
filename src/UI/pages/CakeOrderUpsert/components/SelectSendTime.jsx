import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "jalali-moment";
import React, { useEffect } from "react";
import usePersianDatepickerInput from "../../../components/PersianDatePickerInput.component";
import { toEnglishDigit } from "../CakeOrderUpsert";

moment.locale("fa");

const SelectSendTime = ({
  handleChangeInput,
  sendingTime,
  sendingTimeList,
  handleSetDateTimeForm,
}) => {
  const { renderPersianDatepickerInput, selectedDate } =
    usePersianDatepickerInput({
      label: "زمان ارسال :",
      inputId: "sendTime",
    });

  useEffect(() => {
    if (selectedDate) {
      handleSetDateTimeForm(selectedDate);
    }
  }, [selectedDate]);
  // text-caro-primary
  return (
    <div className="  w-100   bg-white d-flex flex-column justify-content-start align-items-stretch">
      <div className="d-flex flex-column justify-content-center align-items-start w-100 gap-2 mb-4">
        <span className="text-dark d-flex">
          زمان تحویل سفارش:{" "}
          <span className="text-caro-primary fw-bold mx-1">
            {moment(toEnglishDigit(selectedDate?.toString() ?? "")).format(
              "D MMMM"
            )}
          </span>
          {sendingTime && (
            <>
               ساعت  
              <span className="text-caro-primary fw-bold ms-1">{`${
                sendingTimeList?.find((a) => a.id == sendingTime)?.time
              } `}</span>
            </>
          )}
        </span>
      </div>
      <div className="d-flex align-items-center flex-wrap">
        {renderPersianDatepickerInput({ className: "col-6 pe-1" })}
        <div className="col-6 ps-1">
          <div className="d-flex w-100">
            <FormControl className="w-100" sx={{ minWidth: 80 }}>
              <InputLabel id={"sending-time-selectlist-label"}>ساعت</InputLabel>
              <Select
                labelId={"sending-time-selectlist-label"}
                id={"sending-time-selectlist"}
                value={sendingTime}
                onChange={handleChangeInput}
                label="ساعت"
              >
                {sendingTimeList.map((it) => (
                  <MenuItem
                    disabled={it.isActive ? false : true}
                    value={it.id}
                    key={it.id}
                  >
                    {`ساعت ${it.time}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSendTime;
