import React from "react";
import defImg from "../../../../assets/images/No_Img.jpg";
import { ImageComponent } from "../../../components/Image";
import "./styles/styles.scss";

const ExtraProductsCategory = ({
    itemId,
    itemImg,
    itemText,
    isActive,
    filterHandler,
    filtersCount = 1,
    selectedCategory
}) => {
    return (
        <div
            onClick={() => filterHandler(itemId)}
            className="d-flex justify-content-between align-items-center cursor-pointer flex-grow-1 noselect"
        >
            <div
          
                className={`${isActive ? "active" : ""
                    } d-flex flex-column justify-content-center align-items-center  mx-1 h-100 item-cat`}
                    // style={{
                    //     border: selectedCategory == itemId ? "3px solid #7015ba" : "3px solid #CB7640"
                    // }}
            >
                <div className="rounded-1 img-cat"
                  style={{
                    backgroundColor: selectedCategory == itemId ? '#CB7640' : 'transparent'
                }}
                >
                    {/* <img
            className="w-100 rounded-1"
            style={{ maxHeight: "80px" }}
            src={itemImg}
            alt="NO_PIC"
            onError={(e) => (e.currentTarget.src = defImg)}
          /> */}
                    <ImageComponent
                        id={itemId}
                        src={itemImg}
                        style={{ maxHeight: "80px", maxWidth: "100%" }}
                        imageDefaultClassName="rounded-1"
                        placeHolderSx={{
                            // fontSize: "33vw",
                            maxWidth: "180px",
                            maxHeight: "90px",
                        }}
                    />
                </div>
                {/* <div className="text-cat" style={{
                    backgroundColor: selectedCategory == itemId ? "#7015ba" : "#CB7640"
                }}>
                    <span className="fs-8 mt-1">{itemText}</span>
                </div> */}
            </div>
        </div>
    );
};

export default ExtraProductsCategory;
