import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { calculateDiff } from "../../../../../core/utility/utils";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import "../styles/RefrigeratorCakeItems.scss";
import { toast } from "react-toastify";
import moment from "moment";
import { ImageComponent } from "../../../../components/Image";
import { TiPlus } from "react-icons/ti";
import AddIcon from "@mui/icons-material/Add";

const getFrom = (time) => {
  const miliseconds = 1000 * 60 * 6;
  const total = new Date(time).getTime() - miliseconds;
  const from = new Date(total);
  return from;
};
//////////

const CakeItem = ({
  id,
  image,
  title,
  price,
  weight,
  reservationDate,
  exactWeight,
  cakeSizeId,
  cakes,
}) => {
  const navigate = useNavigate();

  //states
  const [currentDate, setCurrentDate] = useState();
  const [progress, setProgress] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const initialDate = new Date(currentDate);
    setFormattedTime(initialDate);
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime((prevFormattedTime) => {
        const updatedDate = new Date(prevFormattedTime);
        updatedDate.setSeconds(updatedDate.getSeconds() + 1);
        return updatedDate;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Tehran",
  };

  const date = new Date(formattedTime);
  const formatted = date.toLocaleString("en-US", options);
  const format = "dddd MMM DD YYYY HH:mm:ss";
  const result = moment(formatted, format).format("YYYY-MM-DD HH:mm:ss");

  const handleNavigate = () => {
    if (progress > 0) {
      toast.warn("کاربر گرامی این کیک توسط شخص دیگری رزرو شده است");
    } else {
      navigate("/refrigerator-cake-details-carousel", {
        state: { cakes: cakes, selectedCakeId: id },
      });
    }
  };

  return (
    <div className="col-6 ">
      <div className="d-flex justify-content-around ">
      <div
        className="d-flex flex-column creamy-item-holder p-2 m-1"
        onClick={handleNavigate}
      >
        <ImageComponent
          id={id}
          src={image}
          style={{ borderRadius: "12px", border: "1px solid transparent" }}
          imageDefaultClassName="w-100 h-100"
          placeHolderSx={{
            fontSize: "33vw",
          }}
        />
        <span className="title-item-creamy mt-3" onClick={handleNavigate}>
          {title}
        </span>
        <div
          className="d-flex flex-column justify-content-between align-items-start mt-2"
          style={{ fontSize: "13px" }}
        >
          <span onClick={handleNavigate} className="solid-box-creamy-weight">
            {exactWeight == "0 , 0" || cakeSizeId == 1012 ? 270 : exactWeight}{" "}
            گرم
          </span>
          <div className="w-100 d-flex justify-content-between">
            <span onClick={handleNavigate} className="solid-box-creamy-price">
              {formatNumber(price)} تومان
            </span>
            <button onClick={handleNavigate} className="add-item-creamy">
              {/* <TiPlus size={24} fontSize={'24px'} style={{ fontSize: '24px'}}/> */}
              <AddIcon
                fontSize="30px"
                style={{ fontWeight: "bolder", width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

const RefrigeratorCakeItems = ({ refrigeratorCakeData }) => {
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex justify-content-between align-items-stretch flex-wrap w-100">
        {/* start item */}
        {refrigeratorCakeData &&
          refrigeratorCakeData?.map((it) => (
            <CakeItem {...it} cakes={refrigeratorCakeData} key={it?.id} />
          ))}
        {/* end item */}
        {refrigeratorCakeData?.length <= 0 && (
          <Alert className="w-100 mt-3" severity="warning">
            متاسفانه کیکی موجود نیست
          </Alert>
        )}
      </div>
    </div>
  );
};

export default RefrigeratorCakeItems;
