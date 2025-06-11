import React from "react";
import { useNavigate } from "react-router";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import { AddBox, Info, InfoOutlined } from "@mui/icons-material";
import { IconButton, Modal, Dialog, Alert } from "@mui/material";
import fallbackImg from "../../../../../assets/images/No_Img.jpg";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import "./styles/BakeryItem.scss";
import { ImageComponent } from "../../../../components/Image";
import { TiPlus } from "react-icons/ti";
import AddIcon from '@mui/icons-material/Add';
import logoCake from './../../../../../assets/images/CaroLogo/loading.png'

const Item = ({
  id,
  title,
  description,
  price,
  image,
  addItemHandler,
  typeTitle,
  discountPercentage,
  oldPrice
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
      style={{
        minHeight: "100px",
        //  boxShadow: "0 5px 10px 5px #ebebeb"
      }}
      onClick={() => addItemHandler(id)}
      className="col-6  d-flex justify-content-center align-items-stretch p-2 cursor-pointer"
    >
      <div
        style={{ minHeight: "100px", padding: "13px" }}
        className="d-flex flex-column justify-content-start align-items-stretch item-holder w-100 "
      >
        <div className="d-flex justify-content-center align-items-center bakery-item-img-holder position-relative">
          {
            discountPercentage !=0 &&
            <div
            className="fs-6"
              style={{
                position: "absolute",
                top: "33px",
                left: "-5px",
                background: "#CB7640",
                color: "white",
                fontWeight: "bold",
                padding: "5px 15px",
                fontSize: "12px",
                transform: "rotate(-45deg)",
                transformOrigin: "left top",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
              }}
            >
              ٪{discountPercentage}
            </div>
          }


          <ImageComponent
            id={id}
            src={image}
            style={{ borderRadius: "12px", border: "1px solid transparent" }}
            imageDefaultClassName="w-100 h-100"
            placeHolderSx={{
              fontSize: "33vw",
              maxWidth: "180px",
              maxHeight: "200px",
            }}
          />
        </div>

        <div className="d-flex flex-column justify-content-between align-items-start">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className="title-item-caro mt-3">{title}</span>
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
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </Dialog>

          <span className="text-count">
            هر {typeTitle ? typeTitle : "عدد"} :{" "}
          </span>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex flex-column mt-1">
              {discountPercentage != 0 && (
                <del className="text-muted" style={{fontSize: '16px'}}>{formatNumber(oldPrice)} تومان</del>
              )}
              <span className="text-caro-primary fs-6">{formatNumber(price)} تومان</span>
            </div>
            <button className="add-item-creamy">
              {/* <TiPlus size={24} /> */}
              <AddIcon fontSize="30px" style={{fontWeight:"bolder",width:"20px",height:"20px"}} />
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

const BakeryItem = ({ bakeryData, selectBakeryHandler }) => {
  return (
    <div className="d-flex justify-content-between align-items-start w-100 flex-grow-1">
      <div
        style={{ overflowY: "auto", maxHeight: "100%" }}
        className="d-flex flex-wrap justify-content-start align-items-stretch w-100 hidden-scrollbar"
      >
        {/* start item */}
        {bakeryData &&
          bakeryData?.map((it) => (
            <Item {...it} key={it?.id} addItemHandler={selectBakeryHandler} />
          ))}
        {/* end item */}
        {bakeryData?.length <= 0 && (
          <div className="d-flex w-100">
            <Alert className="w-100" severity="warning">
              متاسفانه بیکری موجود نیست
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default BakeryItem;
