import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FaCalendarPlus } from "react-icons/fa";

import moment from "jalali-moment";

import {
  Picker,
  format,
  newDate,
} from "@persian-tools/persian-mobile-datepicker";
import { toast } from "react-toastify";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { birthDay_apiCaller } from "../../../../../core/services/agent";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";

const config = {
  year: {
    caption: {
      text: "سال",
    },
  },
  month: {
    caption: {
      text: "ماه",
    },
  },
  day: {
    caption: {
      text: "روز",
    },
  },
};

moment.locale("fa");

const DialogInsertNewDate = ({ open, handleClose, getAllBirthDay }) => {
  const { handleClose: handleCloseApi, handleOpen: handleOpenApi } =
    useLoadingContext();

  const [showPicker, setShowPicker] = React.useState(false);
  const [selectedDateValue, setSelectedDateValue] = React.useState();
  const [selectedDateEvents, setSelectedDateEvents] = React.useState();
  const [title, setTitle] = useState("");
  const [occasion, setoccasion] = useState("");

  function handleSubmit(selectedDate) {
    const date = format(selectedDate.date, "d MMMM yyyy");
    const events = selectedDate.date;
    setSelectedDateValue(date);
    setSelectedDateEvents(events);
    setShowPicker(false);
  }

  const handleCloseDate = () => {
    setSelectedDateValue(undefined);
    setShowPicker(false);
  };

  const handleCloseDialog = () => {
    setSelectedDateValue(undefined);
    setShowPicker(false);
    handleClose();
  };

  useEffect(() => {
   if(!open) {
       setTitle(''),
       setoccasion('')
   }
  }, [open])

  const handleSubmitApi = () => {
    if (selectedDateValue) {
      const MyMonth = moment(selectedDateEvents).format("M");
      const MyDay = moment(selectedDateEvents).format("D");
      if (title) {
        if (occasion) {
          apiCaller({
            api: birthDay_apiCaller.apiCall_createBirthDay,
            apiArguments: {
              title,
              occasion,
              month: Number(MyMonth),
              day: Number(MyDay),
            },
            onSuccess: (resp) => {
              if (resp.status == 200 && resp.data.status == 1) {
                setSelectedDateValue(undefined);
                setTitle("");
                setSelectedDateEvents(undefined);
                handleClose();
                getAllBirthDay();
              }
            },
            onStart: handleOpenApi,
            onEnd: handleCloseApi,
          });
        } else {
          toast.warning("عنوان مناسبت را انتخاب کنید  ");
        }
      } else {
        toast.warning("نام را انتخاب کنید  ");
      }
    } else {
      toast.warning("تاریخ مناسبت را انتخاب کنید  ");
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <h6 className="fs-6" style={{ fontWeight: "600" }}>
          ثبت تاریخ مناسبت
        </h6>
      </DialogTitle>
      <div className="px-2">
        <form>
          <div>
            <label htmlFor="user-name">نام*</label>
            <input
              id="user-name"
              className="form-control"
              style={{ boxShadow: "none" }}
              placeholder="نام و نام خانوادگی را وارد کنید"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="user-name">عنوان مناسبت*</label>
            <input
              id="user-name"
              className="form-control"
              style={{ boxShadow: "none" }}
              placeholder="عنوان مناسبت را وارد کنید"
              value={occasion}
              onChange={(e) => setoccasion(e.target.value)}
            />
          </div>
          <div className="mt-3 d-flex align-items-center">
            <Button
              onClick={() => setShowPicker(true)}
              variant="contained"
              color="primary"
            >
              <span className="me-1 fs-8">تاریخ مناسبت</span>
              <FaCalendarPlus fontSize={18} />
            </Button>
            <Picker
              isOpen={showPicker}
              config={config}
              minDate={newDate({
                year: 1300,
                month: 12,
                day: 1,
              })}
              maxDate={newDate({
                year: moment().year(),
                month: 12,
                day: 29,
              })}
              onSubmit={handleSubmit}
              onCancel={handleCloseDate}
              highlightWeekends
            />
            <label>
              {selectedDateValue ? (
                <p className="mb-0 ms-1">
                  {" "}
                  {moment(selectedDateEvents).format("jD")}{" "}
                  {moment(selectedDateEvents).format("jMMMM")}
                </p>
              ) : (
                <small className="text-danger ms-1  fs-8 text-justify">
                  *تاریخ مناسبت را انتخاب کنید
                </small>
              )}
            </label>
          </div>
        </form>
      </div>
      <DialogActions>
        <Button
          className="p-1"
          style={{ maxWidth: "0px" }}
          variant="contained"
          color="error"
          onClick={handleCloseDialog}
        >
          لغو
        </Button>
        <Button
          className="p-1"
          style={{ maxWidth: "0px" }}
          variant="contained"
          color="success"
          onClick={handleSubmitApi}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInsertNewDate;
