import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";
import LoadOnVisibleWrapper from "../../../../../components/LoadOnVisibleWrapper/LoadOnVisibleWrapper.component";
import VisibilitySensor from "react-visibility-sensor";
import { useNavigate } from "react-router";
import defImg from "../../../../../../assets/images/No_Img.jpg";
import "./ServiceItem.scss";
import { useBranchesContext } from "../../../../../../core/contexts/BranchesContext/BranchesContext";

const ServiceItem = ({
  itemId,
  serviceItemTitle,
  serviceItemImg,
  itemPath,
  handleOpenBranchAvailabiltyDescribtion,
  branchAvailablityData,
}) => {
  const navigate = useNavigate();
  const [isVisible, set_isVisible] = useState(false);

  const itemClickHandler = (path) => {
    if (path === "/choosing-box/2") {
      if (branchAvailablityData.isAvailableBasicCookie) {
        navigate(path);
      } else {
        handleOpenBranchAvailabiltyDescribtion(
          branchAvailablityData.basicCookieDescription
        );
      }
    }
    if (path === "/choosing-box/1") {
      if (branchAvailablityData.isAvailableCreamyCookie) navigate(path);
      else {
        handleOpenBranchAvailabiltyDescribtion(
          branchAvailablityData.creamyCookieDescription
        );
      }
    }
    if (path === "/bakery") {
      if (branchAvailablityData.isAvailableBakery) navigate(path);
      else {
        handleOpenBranchAvailabiltyDescribtion(
          branchAvailablityData.bakeryDescription
        );
      }
    }
    if (path === "/dessert") {
      if (branchAvailablityData.isAvailableDessert) navigate(path);
      else {
        handleOpenBranchAvailabiltyDescribtion(
          branchAvailablityData.dessertDescription
        );
      }
    }
  };

  const getFilter = (path) => {
    if (
      path === "/choosing-box/2" &&
      !branchAvailablityData?.isAvailableBasicCookie
    )
      return true;
    else if (
      path === "/choosing-box/1" &&
      !branchAvailablityData?.isAvailableCreamyCookie
    ) {
      return true;
    } else if (
      path === "/bakery" &&
      !branchAvailablityData?.isAvailableBakery
    ) {
      return true;
    } else if (
      path === "/dessert" &&
      !branchAvailablityData?.isAvailableDessert
    ) {
      return true;
    }
    return false;
  };

  const { branch } = useBranchesContext()

  return (
    <VisibilitySensor
      partialVisibility={true}
      onChange={(isV) => {
        if (!isVisible) set_isVisible(isV);
      }}
    >
      <div
        style={{ maxHeight: branch == '4' ? "178px" : '310px', }}
        onClick={() => itemClickHandler(itemPath)}
        className={`d-flex  flex-grow mt-1 p-2 cursor-pointer ${branch == '4' ? "col-6" : 'col-12'}`}
      >
        <div className="d-flex flex-column service-item-box w-100 h-100">
          <div
            style={{ minHeight: "calc(100% - 36px)" }}
            className="d-flex justify-content-center align-items-center w-100"
          >
            {isVisible && (
              <LazyLoadImage
                alt="NO_PIC"
                // height={image.height}
                placeholder={
                  <Skeleton variant="rectangular" width={"100%"} height={165} />
                }
                src={serviceItemImg}
                className="landing-service-img"
                onError={(e) => (e.currentTarget.src = defImg)}
                style={{
                  width: '65%',
                  filter: getFilter(itemPath) ? "grayscale(100%)" : "",
                  opacity: getFilter(itemPath) ? "0.5" : "1",
                }}
              />
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center w-100 px-2 pb-3 service-item-title-holder">
            <span className="service-item-title">{serviceItemTitle}</span>
          </div>
        </div>
      </div>
    </VisibilitySensor>
  );
};

export default ServiceItem;
