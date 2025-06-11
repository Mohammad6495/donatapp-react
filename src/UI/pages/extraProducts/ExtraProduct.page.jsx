import React, { useEffect, useState } from "react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles/styles.scss";

import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  extraCategory_apiCaller,
  products_apiCalls,
  visit_apiCaller,
} from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import ExtraProductsCategory from "./ExtraProductsCategory/ExtraProductsCategory";
import { Alert } from "@mui/material";
import ProductExtraItem from "./ProductExtraItem/ProductExtraItem";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import SelectedDessertItemsListDrawer from "./SelectedDessertItemsListDrawer/SelectedDessertItemsListDrawer";
import { useLocation, useParams } from "react-router";

const ExtraProduct = () => {
  const location = useLocation();

  const [categoryList, setCategoryList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectProductWithCategory, setSelectedProductWithCategory] = useState(
    []
  );

  const { handleOpen, handleClose } = useLoadingContext();

  const getAllExtraCategory = async () => {
    apiCaller({
      api: extraCategory_apiCaller.apiCall_getAllExtraCategory,
      apiArguments: {
        CategoryId: selectedCategory,
      },
      onSuccess: (res) => {
        if (res?.status == 200 && res?.data?.status == 1) {
          setCategoryList(res.data?.data);
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  const [extraProducts, setExtraProducts] = useState([]);
  const getExtraProducts = async (id) => {
    const resp = await apiCaller({
      api: products_apiCalls.apiCall_getAllExtras,
      apiArguments: {
        CategoryId: id,
      },
    });
    if (resp.status === 200 && resp.data?.status == 1) {
      return resp.data.data;
    }
    return [];
  };

  useEffect(() => {
    getAllExtraCategory();
  }, []);

  useEffect(() => {
    if (categoryList?.length > 0) {
      setSelectedCategory(categoryList[0]?.id);
    }
  }, [categoryList]);

  const handleFiltering = (id) => {
    setSelectedCategory(id);
  };

  useEffect(() => {
    if (selectedCategory) {
      const allChildrens = categoryList.find(
        (item) => item.id == selectedCategory
      )?.children;
      if (allChildrens?.length > 0) {
        const fetchAllData = async () => {
          const allData = await Promise.all(
            allChildrens.map(async (item) => {
              const allChildrensOfChildrens = await getExtraProducts(item?.id);
              const newChildrenCategortMitProduct = {
                ...item,
                products: allChildrensOfChildrens,
              };
              return newChildrenCategortMitProduct;
            })
          );
          setExtraProducts(allData);
        };
        fetchAllData();
      } else {
        setExtraProducts([]);
      }
    }
  }, [selectedCategory]);

  const hndleSetSelectProductWithCategory = (product) => {
    setSelectedProductWithCategory((prev) => {
      const existingProduct = prev.find((item) => item.id == product?.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id == product?.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...product, count: 1 }];
      }
    });
  };

  const handleDeleteDessert = (id) => {
    setSelectedProductWithCategory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleDessertMinus = (id) => {
    setSelectedProductWithCategory((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newCount = item.count - 1;
            return newCount <= 0 ? null : { ...item, count: newCount };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleDessertPlus = (id) => {
    setSelectedProductWithCategory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const sendVisitToApi = () => {
    const ipurl = window.location.host + location.pathname;
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        apiCaller({
          api: visit_apiCaller.apiCall_createdVisit,
          apiArguments: {
            webPage: 6,
            ip: data.ip,
            domain: ipurl,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  };

  useEffect(() => {
    sendVisitToApi();
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column extra-product-content- w-100 py-1">
      {categoryList?.length > 0 && (
        <div
          style={{
            position: "fixed",
            zIndex: 10000,
            backgroundColor: "#FFFFFF",
            top: "90px",
            margin: "0 auto",
            width: "100%",
            maxWidth: "576px",
            right: "0",
            left: "0",
          }}
          className="overflow-hidden py-2 px-2 w-100 d-flex justify-content-between align-items-stretch "
        >
          <div className="category-extra-product-content d-flex justify-content-between align-items-stretch p-2">
            {categoryList?.map((item) => (
              <ExtraProductsCategory
                selectedCategory={selectedCategory}
                key={item?.id}
                itemId={item?.id}
                itemText={item?.title}
                itemImg={item?.image}
                isActive={categoryList.some(
                  (it) => item?.isFilterActive == true
                )}
                filterHandler={handleFiltering}
                filtersCount={categoryList.length}
              />
            ))}
          </div>
        </div>
      )}

      <div className="d-flex flex-column extra-product-content w-100 py-1 ">
        {extraProducts.length !== 0 ? (
          extraProducts.map((item) =>
            item?.products?.length !== 0 ? (
              <div className="d-flex flex-column my-3" key={item?.id}>
                <h6 className="fw-bold">{item?.title}</h6>
                {item?.products?.length > 0 ? (
                  <div className="swiper-container position-relative">
                    <Swiper
                      navigation={{
                        nextEl: `#custom-next-${item?.id}`,
                        prevEl: `#custom-prev-${item?.id}`,
                      }}
                      modules={[Navigation]}
                      className="mySwiper"
                    >
                      {item?.products?.map((product, index) => (
                        <SwiperSlide key={index}>
                          <ProductExtraItem
                            hndleSetSelectProductWithCategory={
                              hndleSetSelectProductWithCategory
                            }
                            {...product}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      className="custom-prev"
                      id={`custom-next-${item?.id}`}
                    >
                      <FaCaretLeft />
                    </button>
                    <button
                      className="custom-next"
                      id={`custom-prev-${item?.id}`}
                    >
                      <FaCaretRight />
                    </button>
                  </div>
                ) : (
                  <Alert severity="warning">
                    در دسته بندی {item?.title} محصولی یافت نشد
                  </Alert>
                )}
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <>
            <Alert severity="warning">
              لوازم تولد در این دسته بندی یافت نشد!
            </Alert>
          </>
        )}
      </div>

      <div className="d-flex flex-column select-product-white-cat">
        {selectProductWithCategory?.length > 0 ? (
          <div
            className="w-100 m-0 p-0 position-relative"
            style={{ height: "180px" }}
          >
            <SelectedDessertItemsListDrawer
              selectedDessertItemsList={selectProductWithCategory}
              deleteDessertHandler={handleDeleteDessert}
              dessertMinusButtonHandler={handleDessertMinus}
              dessertPlusButtonHandler={handleDessertPlus}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExtraProduct;
