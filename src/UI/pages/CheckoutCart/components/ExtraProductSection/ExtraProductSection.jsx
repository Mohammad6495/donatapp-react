import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLoadingContext } from "../../../../../core/contexts/LoadingContext/LoadingContext";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { Link } from "react-router-dom";
import ShopBasketExtraProduct from "./shopbasket-extraProductItem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FreeSlider from "../../../../components/freeSlider/freeSlider.component";
import { products_apiCalls } from "../../../../../core/services/agent";
import ExtraProductItem from "../../../../components/extra-product-item";
import SectionCalculation from "../SectionCalculation/SectionCalculation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Skeleton } from "@mui/material";
import extraBanner from "../../../../../assets/images/extra.jpg"
import { locationSearchStringToObject } from "../../../../../core/utility/utils";
import { Add } from "@mui/icons-material";

//.............................................................................................
const ExtraProductSection = () => {
  const { handleOpen, handleClose } = useLoadingContext();
  const {
    refrigeratorProducts_methods,
    birthDayUtils_methods,
    shopBasketData,
  } = useShopBasketContext();
  // useNavigate
  const navigate = useNavigate();
  const location = useLocation();
  /////////////////
  const [extraProducts, setExtraProducts] = useState();
  const getExtraProducts = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getAllExtras,
      apiArguments: {
        CategoryId: undefined
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 1) {
          setExtraProducts(resp.data.data);
        }
      },
    });
  };
  useEffect(() => {
    getExtraProducts();
  }, []);
  const addExtraProductToBasket = (id) => {
    birthDayUtils_methods.createAndAddItem(id, 1);
  };
  const deleteExtraProductFromBasket = (item) => {
    birthDayUtils_methods.deleteItem(item.id);
  };
  const incrementExtraProductItemCount = (item) => {
    birthDayUtils_methods.increment(item.id);
  };
  const decrementExtraProductItemCount = (item) => {
    birthDayUtils_methods.decrement(item.id);
  };
  useEffect(() => {
    if (refrigeratorProducts_methods.getAll().length == 0) {
      if (birthDayUtils_methods.getAll()?.length > 0) {
        birthDayUtils_methods.deleteAll();
      }
    }
  }, []);
  const handleNavigateToExtraProducts = () => {
    navigate(`/extra-products/3?returnUrl=/checkout-cart`)
  }

  /////////////////////////////////////
  return (
    <div className="w-100 p-0 m-0">
      {
        extraProducts &&
        extraProducts.length > 0 &&
        birthDayUtils_methods.getAll().length > 0 && (
          <div className="w-100 my-3 d-flex flex-column justify-content-start align-items-stretch">
            <SectionCalculation
              calculationText="لوازم تولد"
              calculationPrice={
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: "0.7rem !important",
                  }}
                  endIcon={<Add />}
                  onClick={() => {
                    navigate("/extra-products/3");
                  }}
                >
                  افزودن آیتم جدید
                </Button>
              }
            />
            {extraProducts &&
              extraProducts.length > 0 &&
              extraProducts
                .filter((it) => birthDayUtils_methods.doesExistsInBasket(it.id))
                .map((ep) => (
                  <ShopBasketExtraProduct
                    key={ep.id}
                    onDelete={() => {
                      birthDayUtils_methods.deleteItem(ep.id);
                    }}
                    onIncrement={() => {
                      birthDayUtils_methods.increment(ep.id);
                    }}
                    onDecrement={() => {
                      birthDayUtils_methods.decrement(ep.id);
                    }}
                    itemCount={
                      birthDayUtils_methods
                        .getAll()
                        .find((it) => it.productId == ep.id).count
                    }
                    {...ep}
                  />
                ))}
          </div>
        )}
      {extraProducts &&
        extraProducts?.length > 0 &&
        extraProducts.filter(
          (it) => !birthDayUtils_methods.doesExistsInBasket(it.id)
        ).length > 0 &&
        shopBasketData?.items?.filter((it) => it.cartItemType == 0)?.length >
        0 && (
          <div dir="rtl" className="d-block p-0">
            <div className="d-flex justify-content-between">
              {/* <Link to='/extra-products' className="text-decoration-none">مشاهده بیشتر</Link> */}
            </div>
            <div onClick={handleNavigateToExtraProducts} style={{ display: "block" }} className=" mt-2">
              {/* <Swiper spaceBetween={16} slidesPerView="auto" dir="rtl"> */}
              <LazyLoadImage
                alt="NO_PIC"
                placeholder={
                  <Skeleton variant="rectangular" width={"100%"} height={150} />
                }
                className="img-fluid rounded-4"
                src={extraBanner}
              />
              {/* </Swiper> */}
            </div>
          </div>
        )}
    </div>
  );
};

export default ExtraProductSection;
