import React, { useEffect } from "react";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import defImg from "../../../../../assets/images/No_Img.jpg";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import { IconButton, Dialog } from "@mui/material";
import { Info, InfoOutlined } from "@mui/icons-material";
import "./styles/DessertItem.scss";
import { useState } from "react";
import { ImageComponent } from "../../../../components/Image";
import AddIcon from '@mui/icons-material/Add';

const DessertItem = ({
  itemId,
  itemImg = defImg,
  itemTitle = "",
  itemPrice = "",
  addItemHandler,
  itemDesc,
  weight,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  const getText = (txt) => {
    if (!txt) return "";
    if (txt.length > 20) return txt.substr(0, 20) + " ...";
    return txt;
  };
  return (
    <div
      onClick={() => {
        console.log(itemId);
        addItemHandler(itemId);
      }}
      className="d-flex flex-column m-0 p-2 col-6 gap-1 mb-2 cursor-pointer"
    >
      <div className="h-100 d-flex flex-column justify-content-start align-items-stretch p-2 item-holder">
        <div className="d-flex justify-content-center align-items-center img-holder">
          <ImageComponent
            id={itemId}
            src={itemImg}
            style={{ borderRadius: "1rem" }}
            imageDefaultClassName="w-100 h-100"
            placeHolderSx={{
              fontSize: "33vw",
              maxWidth: "180px",
              maxHeight: "200px",
            }}
          />
        </div>
        <div
          style={{ height: "32px" }}
          className="d-flex justify-content-between align-items-center py-1 px-1 mt-auto"
        >
          <span
            style={{ maxWidth: "80%" }}
            className="fs-7 fw-bold text-truncate"
          >
            {getText(itemTitle)}
          </span>
          {/* {itemDesc && itemDesc !== "" && (
            <IconButton
              // style={{ border: "2px solid #CB7640" }}
              className="p-0"
              onClick={(e) => handleOpen(e)}
            >
              <InfoOutlined htmlColor="#CB7640" fontSize="medium" />
            </IconButton>
          )} */}
        </div>
        <Dialog
          onClose={(e) => handleClose(e)}
          open={open}
          sx={{
            ".MuiPaper-root": {
              width: "1000px",
              height: "50%",
            },
          }}
        >
          <div className="p-2 d-flex justify-content-center align-items-center h-100">
            <div
              onClick={(e) => e.stopPropagation()}
              className="my-1 item-text w-100 h-100"
              dangerouslySetInnerHTML={{ __html: itemDesc }}
            ></div>
          </div>
        </Dialog>
        <span className="box-caro-weight mt-2">{weight ? weight : ''} گرم</span>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column mt-1">
            <span className="text-caro-primary fs-6">{formatNumber(itemPrice)} تومان</span>
          </div>
          <button className="add-item-creamy">
            <AddIcon fontSize="30px" style={{ fontWeight: "bolder", width: "20px", height: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DessertItem;
