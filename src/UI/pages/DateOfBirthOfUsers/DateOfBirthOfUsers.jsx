import React, { useState, useEffect } from "react";

import "./styles/styles.scss";
import { Alert, Button } from "@mui/material";
import { FaCalendarPlus } from "react-icons/fa";
import DateOfBirthList from "./components/DateOfBirthList/DateOfBirthList";
import DialogInsertNewDate from "./components/DialogInsertNewDate/DialogInsertNewDate";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  birthDay_apiCaller,
  visit_apiCaller,
} from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useLocation } from "react-router";

const DateOfBirthOfUsers = () => {
  const [open, setOpen] = useState(false);
  const [allBirthDay, setAllBirthDay] = useState([]);
  const { handleClose: handleCloseApi, handleOpen: handleOpenApi } =
    useLoadingContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllBirthDay = () => {
    apiCaller({
      api: birthDay_apiCaller.apiCall_getAllBirthDay,
      onSuccess: (resp) => {
        if (resp.status == 200 && resp.data.status == 1) {
          setAllBirthDay(resp.data?.data);
        }
      },
      onStart: handleOpenApi,
      onEnd: handleCloseApi,
      onErrorMessage: "عملیات دریافت اطلاعات با خطا مواجهه شد",
    });
  };
  useEffect(() => {
    getAllBirthDay();
  }, []);

  const handleDeleteBirthDay = (id) => {
    if (id) {
      apiCaller({
        api: birthDay_apiCaller.apiCall_deleteBirthDay,
        apiArguments: id,
        onSuccess: (resp) => {
          if (resp.status == 200 && resp.data.status == 1) {
            const clonedList = JSON.parse(JSON.stringify(allBirthDay));
            const index = clonedList.findIndex((it) => it.id == id);
            if (index >= 0) {
              clonedList.splice(index, 1);
              setAllBirthDay(clonedList);
            }
          }
        },
        onStart: handleOpenApi,
        onEnd: handleCloseApi,
      });
    }
  };

  const location = useLocation();
  const sendVisitToApi = () => {
    const ipurl = window.location.host + location.pathname;
    fetch("https://api.ipify.org?format=json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      apiCaller({
        api: visit_apiCaller.apiCall_createdVisit,
        apiArguments: {
          webPage: 4,
          ip: data.ip,
          domain: ipurl
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching IP:", error)
    })
  };

  useEffect(() => {
    sendVisitToApi();
  }, [location.pathname]);
  return (
    <div className="d-flex flex-column w-100">
      <div className="w-100 d-flex justify-content-between">
        <Button
          className="flex-grow-1"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          style={{ backgroundColor: "#CB7640" }}
        >
          <span className="me-1">مناسبت جدید</span>
          <FaCalendarPlus fontSize={20} />
        </Button>
        <DialogInsertNewDate
          getAllBirthDay={getAllBirthDay}
          handleClose={handleClose}
          open={open}
        />
      </div>
      <div className="mt-3">
        <small className="text-muted  fs-8" style={{ textAlign: "justify" }}>
          *میتونی با اضافه کردن تاریخ مناسبت دوستان یا خانواده از چند روز قبل
          مونده به مناسبتشون باخبر بشی و با خریدن کیک مناسبت سوپرایزشون کنی!
        </small>
      </div>
      <div className="w-100 d-flex flex-column mt-3">
        {allBirthDay?.length !== 0 &&
          allBirthDay.map((item) => (
            <DateOfBirthList
              handleDeleteBirthDay={handleDeleteBirthDay}
              key={item.id}
              {...item}
            />
          ))}
        {allBirthDay?.length <= 0 && (
          <div className="d-flex w-100">
            <Alert className="w-100" severity="warning">
              در حال حاضر هیچ مناسبتی ثبت نشده
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateOfBirthOfUsers;

const items = [
  {
    id: 1,
    fullName: "محمد تقی پور",
    dateOfBirths: "۱۶ شهریور ۱۴۰۱",
  },
  {
    id: 2,
    fullName: "حسن بریمانی",
    dateOfBirths: "۱۶ خرداد ۱۳۸۰",
  },
  {
    id: 3,
    fullName: "امیر حسین فدایی",
    dateOfBirths: "۱۶ شهریور ۱۳۶۴",
  },
  {
    id: 4,
    fullName: "محمد عمویه",
    dateOfBirths: "۱۶ مهر ۱۴۰۱",
  },
  {
    id: 5,
    fullName: "مهران آقایی",
    dateOfBirths: "۳۰ خرداد ۱۳۶۱",
  },
];
