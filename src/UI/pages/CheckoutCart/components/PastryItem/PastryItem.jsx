import React from "react";
import defImg from "../../../../../assets/images/No_Img.jpg";
import { useWindowDimensions } from "../../../../../core/custom-hooks/getWindowDimensions";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";
import { Clear } from "@mui/icons-material";
import "./styles/PastryItem.scss";
import { useLocation } from "react-router";

export const PastryItemsContainer = ({ children, offset = 0 }) => {
  ////////
  const { width } = useWindowDimensions();
  ////////
  return (
    <div
      style={{
        border: "0.75px solid #CB7640",
        borderRadius: "5px",
        // width: `calc((${width <= 576 ? "100vw" : "576px"} -  ${
        //   -2 + offset
        // }rem)/2)`,
        // height: `calc((${width <= 576 ? "100vw" : "576px"} - ${
        //   2 + offset
        // }rem)/2)`,
      }}
      className="py-1 d-flex flex-column justify-content-start align-items-stretch"
    >
      {children}
    </div>
  );
};

const PastryItem = ({
  pastryId,
  pastryImg,
  pastryName,
  pastryCount,
  className = "",
  rowsCount = 2,
  offset = 0,
  handleDelete = () => {},
}) => {
  ////////
  const location = useLocation();
  const { width } = useWindowDimensions();
  const getLimitedCharacters = (str) => {
    if (str) {
      if (str.length > 15) return str.substring(0, 15) + "...";
      else return str;
    } else return "";
  };
  ////////
  return (
    <div
      onClick={() => {
        handleDelete(pastryId);
      }}
      style={{
        height: `calc(((${width <= 576 ? "100vw" : "576px"} - ${
          location?.pathname.includes('/general-order-details') ? 9 : 3 + offset
        }rem)/2)/${rowsCount})`,
      }}
      className={
        className +
        " d-flex justify-content-between align-items-center pastry-item-holder m-0 p-0 cursor-pointer"
      }
    >
      {/* image */}
      {pastryImg && (
        <div className="col-3 m-2 d-flex justify-content-center align-items-center pastry-item-image-holder" style={{ border: '1px solid #CB7640', borderRadius: '4px'}}>
          <img
            onError={(e) => (e.currentTarget.src = defImg)}
            // src={imgBaseUrl + pastryImg}
            src={pastryImg}
            style={{ width: "60%" }}
            alt="NO_PIC"
          />
        </div>
      )}
      {/* title and count */}
      <div className="col-9 d-flex flex-column justify-content-center align-items-start pastry-item-title-holder m-0 p-0">
        <div className="d-flex pastry-item-title">
          <span className="fs-8" style={{color: '#595959'}}>{getLimitedCharacters(pastryName)}</span>
        </div>
        {pastryCount && (
          <div className="d-flex pastry-item-count">
            <span className="fs-10">تعداد : </span>
            <span className="fs-10">{pastryCount}</span>
          </div>
        )}
      </div>
      {/* Delete icon */}
      {!location.pathname.includes("/checkout") && pastryId && (
        <div onClick={handleDelete} style={{ zIndex: '100'}} className=" d-flex justify-content-center align-items-center">
          <Clear fontSize="small" />
        </div>
      )}
    </div>
  );
};

export default PastryItem;
