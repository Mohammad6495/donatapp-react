import React from "react";
import { CancelOutlined } from "@mui/icons-material";
import defImg from "../../../../../assets/images/No_Img.jpg";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import "./CookieDetailsItem.scss";

const CookieDetailsItem = ({
  itemId,
  itemSelectNumber,
  handleDeletingItem,
  itemName,
  itemImg,
  index,
}) => {
  const getNumber = () => {
    if (index === 0) return "اول";
    if (index === 1) return "دوم";
    if (index === 2) return "سوم";
    if (index === 3) return "چهارم";
    if (index === 4) return "پنجم";
  };
  return (
    <div className="d-flex justify-content-between align-items-center w-100 item-container p-3 my-2">
      <div className="img-holder col-3 rounded">
        <img
          onError={(e) => (e.currentTarget.src = defImg)}
          className="w-100 rounded"
          // src={imgBaseUrl + itemImg}
          src={itemImg}
          alt="NO_PIC"
        />
      </div>
      <div className="d-flex flex-column">
        <span style={{ color: "#444444" }} className="fs-8 fw-bold">
          {`ردیف ${getNumber()}`}
        </span>
        <span className="fw-bold">{itemName}</span>
      </div>
      <div
        onClick={() => handleDeletingItem(itemId)}
        className="d-flex align-self-start"
      >
        <CancelOutlined className="cursor-pointer" htmlColor="#FF0000" />
      </div>
    </div>
  );
};

export default CookieDetailsItem;
