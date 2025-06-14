import React from "react";
import {
  ControlPoint,
  HighlightOff,
  RemoveCircleOutline,
} from "@mui/icons-material";
// import { HighlightOff } from "@mui/icons-material";
import defImg from "../../../../../../assets/images/No_img.jpg";
import "./styles/BakeryDrawerItem.scss";
import { formatNumber } from "../../../../../../core/utility/helperFunctions";
import { ImageComponent } from "../../../../../components/Image";
import { imgBaseUrl } from "../../../../../../core/services/baseUrl";

const BakeryDrawerItem = ({
  drawerItemId,
  drawerItemImg = defImg,
  drawerItemTitle = "کاپوچینو",
  drawerItemPrice = "100,000",
  darwerItemCount = "",
  deleteBakeryHandler,
  bakeryMinusButtonHandler,
  bakeryPlusButtonHandler,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-2 bakery-drawer-item-container px-2 py-2">
      <div className="img-holder border-0 flex-grow-1 rounded noselect position-relative">
        {/* <img
          src={drawerItemImg}
          alt="NO_PIC"
          onError={(e) => (e.currentTarget.src = defImg)}
          className="rounded"
        /> */}
        <ImageComponent
          id={drawerItemId}
          src={imgBaseUrl + drawerItemImg}
          imageDefaultClassName="rounded"
          placeHolderSx={{
            fontSize: "13vw",
          }}
        />
        <HighlightOff
          className="delete-icon position-absolute"
          style={{
            top: -5,
            right: -5,
            color: "white",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => deleteBakeryHandler(drawerItemId)}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center col-10 px-2">
        <div className="d-flex flex-column justify-content-between align-items-start noselect">
          <span className="fw-bold flex-grow-1 text-white bakery-drawer-item-title fs-8">
            {drawerItemTitle}
          </span>
          <span className="text-white mt-1">
            {formatNumber(drawerItemPrice)} تومان
          </span>
        </div>
        <div className="d-flex">
          <ControlPoint
            onClick={() => bakeryPlusButtonHandler(drawerItemId)}
            htmlColor="#fff"
            className="cursor-pointer"
          />
          <span className="mx-1 text-white">{darwerItemCount} عدد</span>
          <RemoveCircleOutline
            onClick={() => bakeryMinusButtonHandler(drawerItemId)}
            htmlColor="#fff"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BakeryDrawerItem;
