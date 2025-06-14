import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { products_apiCalls } from "../../../../../core/services/agent";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";
import { ImageComponent } from "../../../../components/Image";
import { Button, Skeleton } from "@mui/material";
import "./ExtraProductPage.scss";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { formatPrice } from "../../../../../core/utility/utils";

const ExtraProductPage = () => {
   const navigate = useNavigate()

  ///context
  const { birthDayUtils_methods, addItem } = useShopBasketContext();

  //states
  const [allExtraProduct, setAllExtraProduct] = useState([]);
  const [selectExtraProduct, setSelectExtraProduct] = useState([]);

  const { handleClose, handleOpen } = useLoadingContext();
  const getApiAllExtraProducts = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getAllExtras,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data?.statusCode == 200) {
          setAllExtraProduct(resp?.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
      onErrorMessage: "عملیات با خطا مواجهه شد",
    });
  };

  useEffect(() => {
    getApiAllExtraProducts();
  }, []);

  const handleSelectExtraProduct = (id) => {
    const findIdInExtra = selectExtraProduct.includes(id);
    if (findIdInExtra) {
      const newFilterExtraId = selectExtraProduct.filter((a) => a !== id);
      setSelectExtraProduct(newFilterExtraId);
    } else {
      setSelectExtraProduct((prev) => [...prev, id]);
    }
  };

  const handleNavigateToBasked = () => {
    const newItemToBasked = selectExtraProduct.map(a=> {
      return {
        cartItemType: 4,
        count: 1,
        productId: a,
      }
    })
    birthDayUtils_methods.addListOfProducts(newItemToBasked)
    navigate('/checkout-cart')
  };

  return (
    <div
      className="box-main d-flex flex-column mb-4"
      style={{ position: "relative" }}
    >
      {allExtraProduct.length !== 0
        ? allExtraProduct
            .filter((it) => !birthDayUtils_methods.doesExistsInBasket(it.id))
            .map((item) => {
              return (
                <div
                  onClick={() => handleSelectExtraProduct(item.id)}
                  className="item border w-100 caro-border-primary rounded mb-3 d-flex p-2"
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectExtraProduct.includes(item.id)
                      ? "#CB7640 "
                      : null,
                    color: selectExtraProduct.includes(item.id)
                      ? "#fff "
                      : null,
                  }}
                  key={item.id}
                >
                  <ImageComponent
                    src={item.image}
                    style={{
                      width: "100px",
                    }}
                  />
                  <div>
                    <h6 className="mx-4">{item.title}</h6>
                    <p className="mx-4 my-4">
                      قیمت: {formatPrice(item.price)} تومان
                    </p>
                  </div>
                </div>
              );
            })
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="item d-flex p-2 mb-2" key={index}>
              <Skeleton variant="rounded" height={100} width={150} />
              <div className="w-100 d-flex flex-column justify-content-between pe-3">
                <Skeleton
                  variant="rectangular"
                  height={20}
                  width={"100%"}
                  className="mx-2"
                />
                <Skeleton
                  variant="rectangular"
                  height={20}
                  width={100}
                  className="mx-2 mb-4"
                />
              </div>
            </div>
          ))}
      {selectExtraProduct.length !== 0 && (
        <Button
          className="w-100 py-2"
          onClick={handleNavigateToBasked}
          style={{
            backgroundColor: "#CB7640",
            color: "#fff",
            position: "fixed",
            bottom: "0",
            maxWidth: "576px",
            margin: "0 auto",
            right: "0",
            left: "0",
          }}
        >
          ادامه و افزودن به سبد خرید ({selectExtraProduct.length})
        </Button>
      )}
    </div>
  );
};

export default ExtraProductPage;
