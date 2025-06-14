import React from "react";
import defImg from "../../../../../assets/images/No_Img.jpg";
import { ImageComponent } from "../../../../components/Image";
import "./styles/BakeryFilterItem.scss";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";

const BakeryFilterItem = ({
  itemId,
  itemImg,
  itemText,
  isActive,
  filterHandler,
  filtersCount = 1,
  className=  'col-3',
  isNotClass = false
}) => {
  return (
    <div
      onClick={() => filterHandler(itemId)}
      className={'d-flex justify-content-between align-items-center cursor-pointer '}
    >
      <div
      >
        <div
        
        className={`${
          isActive ? "active" : ""
        } d-flex flex-column justify-content-center align-items-center  item h-100 p-1`}>
          <ImageComponent
            id={itemId}
            src={imgBaseUrl +  itemImg}
            style={{ maxHeight: "80px", maxWidth: "100%" }}
            imageDefaultClassName="rounded-1"
            placeHolderSx={{
              // fontSize: "33vw",
              maxWidth: "80px",
              maxHeight: "90px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BakeryFilterItem;
