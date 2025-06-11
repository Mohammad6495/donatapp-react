import React from "react";
import defImg from "../../../../assets/images/No_Img.jpg";
import { useWindowDimensions } from "../../../../core/custom-hooks/getWindowDimensions";
import { imgBaseUrl } from "../../../../core/services/baseUrl";
import "./styles/CreamyItem.scss";
import { formatPrice } from "../../../../core/utility/utils";
import { ImageComponent } from "../../../components/Image";

const CreamyItem = ({
  cookieId,
  cookieName,
  cookieImg,
  className,
  itemClickHandler,
  price,
  title,
  id
}) => {
  return (

    <div className="d-flex justify-content-around  col-6 p-1"
      onClick={() => itemClickHandler(cookieId)}
    >
      <div className="d-flex flex-column p-2 creamy-item-holder w-100">
        <ImageComponent
          id={id}
          src={cookieImg}
          style={{ borderRadius: "12px", border: "1px solid transparent" }}
          imageDefaultClassName="w-100 h-100"
          placeHolderSx={{
            fontSize: "33vw",
            maxWidth: "300px",
            maxHeight: "200px",
          }}
        />{" "}          <span className="title-item-creamy text-center mt-2"
          >{cookieName}</span>
        <div className="d-flex justify-content-between align-items-end mt-2" style={{ fontSize: '13px' }}>
          <span>{formatPrice(price)} تومان</span>
          <span className="solid-box-creamy">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CreamyItem;