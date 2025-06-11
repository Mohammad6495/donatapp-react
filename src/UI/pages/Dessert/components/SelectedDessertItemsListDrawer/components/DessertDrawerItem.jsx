import React from "react";
import { ControlPoint, RemoveCircleOutline } from "@mui/icons-material";
import { imgBaseUrl } from "../../../../../../core/services/baseUrl";
import defImg from "../../../../../../assets/images/No_Img.jpg";
import { formatNumber } from "../../../../../../core/utility/helperFunctions";
import "./styles/DessertDrawerItem.scss";
import { ImageComponent } from "../../../../../components/Image";

const DessertDrawerItem = ({
  drawerItemId,
  drawerItemImg = defImg,
  drawerItemTitle = "ژله",
  drawerItemPrice = "100,000",
  darwerItemCount = "",
  deleteDessertHandler,
  dessertMinusButtonHandler,
  dessertPlusButtonHandler,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-2 dessert-drawer-item-container px-2 py-2">
      <div className="img-holder border-0 flex-grow-1 rounded noselect">
        {/* <img
          // src={imgBaseUrl + drawerItemImg}
          src={drawerItemImg}
          alt="NO_PIC"
          onError={(e) => (e.currentTarget.src = defImg)}
          className="rounded"
        /> */}
        <ImageComponent
          id={drawerItemId}
          src={drawerItemImg}
          imageDefaultClassName="rounded"
          placeHolderSx={{
            fontSize: "13vw",
          }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center col-10 px-2">
        <div className="d-flex flex-column justify-content-between align-items-start noselect">
          <span className="fw-bold flex-grow-1 text-white dessert-drawer-item-title fs-8">
            {drawerItemTitle}
          </span>
          <span className="text-white mt-1">
            {formatNumber(drawerItemPrice)} تومان
          </span>
        </div>
        <div className="d-flex">
          <ControlPoint
            onClick={() => dessertPlusButtonHandler(drawerItemId)}
            htmlColor="#fff"
            className="cursor-pointer"
          />
          <span className="mx-1 text-white">{darwerItemCount} عدد</span>
          <RemoveCircleOutline
            onClick={() => dessertMinusButtonHandler(drawerItemId)}
            htmlColor="#fff"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default DessertDrawerItem;
