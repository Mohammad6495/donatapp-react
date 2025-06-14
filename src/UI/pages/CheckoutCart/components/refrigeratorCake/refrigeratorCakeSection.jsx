import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { formatNumber } from "../../../../../core/utility/helperFunctions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { imgBaseUrl } from "../../../../../core/services/baseUrl";

const RefrigeratorCakeSection = ({ factor }) => {
  const { generalProducts_methods, shopBasketData } = useShopBasketContext();
  const [unreserveApiIsCalling, setUnreserveApiIsCalling] = useState(false);
  const [toBeUnreservedCakeId, setToBeUnreservedCakeId] = useState();

  const handleUnreserveCake = (cakeId) => {
    if (unreserveApiIsCalling) return;

    setToBeUnreservedCakeId(cakeId);
    setUnreserveApiIsCalling(true);

    setTimeout(() => {
      generalProducts_methods.deleteItem(cakeId);
      setUnreserveApiIsCalling(false);
      setToBeUnreservedCakeId(undefined);
    }, 500);
  };

  const handleChangeCount = (productId) => {
    generalProducts_methods.increment(productId);
  };

  return (
    <div>
      {shopBasketData?.items?.length > 0 &&
        factor?.cartItems?.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid rgba(151, 48, 121)",
              backgroundColor: "#F5F5F5",
            }}
            className="position-relative shadow p-3 mb-2 d-flex flex-row flex-wrap justify-content-start align-items-stretch rounded-2"
          >
            {unreserveApiIsCalling &&
              toBeUnreservedCakeId === item.product.id && (
                <div
                  className="d-flex flex-row justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    zIndex: "10",
                    top: "0",
                    right: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <CircularProgress />
                </div>
              )}

            <div className="cartItem w-100 m-0 p-0 d-flex flex-row justify-content-start align-items-stretch">
              {/* تصویر */}
              <div className="cartItemTop w-100" style={{ maxWidth: 100 }}>
                <img
                  src={imgBaseUrl + item?.product?.image}
                  alt={item?.product?.name || "product image"}
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(151, 48, 121)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* اطلاعات محصول */}
              <div className="cartItemCenter w-100 flex-grow-1 px-2 d-flex flex-column justify-content-start align-items-stretch">
                <strong>{item?.product?.title}</strong>
                <div className="mt-2 p-0 d-flex flex-column gap-2 justify-content-start align-items-start">
                  <span>{`نوع : ${item?.product?.category?.title}`}</span>
                  <span>{`قیمت : ${formatNumber(item?.product?.price)} تومان`}</span>
                </div>

              
              </div>

              {/* دکمه حذف کامل */}
              <div
                className="cartItemTrash d-flex justify-content-center align-items-center p1-2"
                onClick={() => handleUnreserveCake(item.product.id)}
              >
                <button className="trash text-center d-flex justify-content-center align-items-center btn">
                  <DeleteForeverIcon
                    style={{
                      width: "35px",
                      height: "35px",
                      color: "rgba(201, 0, 0, 1)",
                    }}
                  />
                </button>
              </div>
            </div>
              {/* دکمه‌های افزایش و کاهش */}
              <div className="d-flex flex-row align-items-center mt-3 gap-2">
                  <ControlPointIcon
                    style={{ cursor: "pointer", color: "#007E33" }}
                    onClick={() =>
                      handleChangeCount(item.product.id)
                    }
                  />
                  <span className="fw-bold">{item.count} عدد</span>
                  <RemoveCircleOutlineIcon
                    style={{ cursor: "pointer", color: "#d32f2f" }}
                    onClick={() => {
                      if (item.count <= 1) {
                        handleUnreserveCake(item.product.id);
                      } else {
                        generalProducts_methods.decrement(item.product.id)
                      }
                    }}
                  />
                </div>
          </div>
        ))}
    </div>
  );
};

export default RefrigeratorCakeSection;
