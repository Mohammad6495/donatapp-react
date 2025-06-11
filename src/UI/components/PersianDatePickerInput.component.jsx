import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import DateObject from "react-date-object";
import { useEffect } from "react";
import {
  Picker,
  format,
  newDate,
} from "@persian-tools/persian-mobile-datepicker";
import moment from "jalali-moment";

moment.locale("fa");


const jalaliFutureDate = moment();

const dateObject = new DateObject(jalaliFutureDate.format('jYYYY/jM/jD'));

const minDate = newDate({
  year: moment().jYear(),
  month: moment().jMonth() + 1,
  day: moment().jDate() + 7,
});

const maxDate = newDate({
  year: moment().jYear(),
  month: moment().jMonth() + 2,
  day: moment().jDate() + 7,
});

const usePersianDatepickerInput = ({
  initialValue = dateObject.toString(),
  onChange = (d) => {},
  label,
  inputId,
}) => {
  /////////////
  const [selectedDate, setSelectedDate] = useState(initialValue ?? null);
  const handleChange = (sd) => {
    onChange(sd);
    setSelectedDate(sd);
  };

  /////////////
  const renderPersianDatepickerInput = ({ className = "" }) => (
    <div
      dir="rtl"
      className={
        className +
        " d-flex flex-column justify-content-start align-items-stretch"
      }
    >
      <label
        htmlFor={inputId}
        style={{ fontSize: "14px" }}
      ></label>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        // minDate={minDate}
        // maxDate={maxDate}
        inputClass="form-control  px-3 py-3"
        inputMode="text"
        id={inputId}
        value={selectedDate}
        onChange={handleChange}
      />
     
    </div>
  );

  return { renderPersianDatepickerInput, selectedDate, setSelectedDate };
};

export default usePersianDatepickerInput;
