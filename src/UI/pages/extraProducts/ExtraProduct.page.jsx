import React, { useEffect, useState } from "react";
import BakeryItems from "../Bakery/components/BakeryItem/BakeryItem";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  home_apiCalls,
  refrigeratorCake_apiCalls,
} from "../../../core/services/agent";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import BakeryFilterItem from "../Bakery/components/BakeryFilterItem/BakeryFilterItem";
import SelectedBakeryItemsListDrawer from "../Bakery/components/SelectedBakeryItemsListDrawer/SelectedBakeryItemsListDrawer";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useNavigate } from "react-router";

const ExtraProduct = () => {
  const navigate = useNavigate();
  const { bakeryProducts_methods } = useShopBasketContext();
  const { handleClose, handleOpen } = useLoadingContext();

  const [bakerySelectedItems, setBakerySelectedItems] = useState([]);
  const [allBakery, setAllBakery] = useState([]);
  const [filteredBakery, setFilteredBakery] = useState([]);
  const [bakeryFilterItems, setBakeryFilterItems] = useState([]);
  const [removeFilerState, setRemoveFilerState] = useState(false);

  // --- Get Filter Categories ---
  const getAllBakerySizeData = () => {
    apiCaller({
      api: home_apiCalls.apiCall_getAllCakeSize,
      apiArguments: 4,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.statusCode == 200) {
          const newList = resp?.data?.data.map((item) => ({
            ...item,
            isFilterActive: false,
          }));
          setBakeryFilterItems(newList);
        }
      },
      onError: () => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllBakerySizeData();
  }, []);

  // --- Get All Products ---
  useEffect(() => {
    apiCaller({
      api: refrigeratorCake_apiCalls.apiCall_getAllRefrigeratorCake,
      apiArguments: 4,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          const data = resp?.data?.data || [];
          setAllBakery(data);
          setFilteredBakery(data); // پیش‌فرض: همه محصولات نمایش داده شوند
        }
      },
      onStart: handleOpen,
      onEnd: handleClose,
    });
  }, []);

  // --- Handle Filter Click ---
  const handleFiltering = (cakeTypeId) => {
    const updatedFilters = bakeryFilterItems.map((item) => ({
      ...item,
      isFilterActive: item.id === cakeTypeId ? !item.isFilterActive : false,
    }));
    setBakeryFilterItems(updatedFilters);

    const selectedFilter = updatedFilters.find((f) => f.isFilterActive);
    if (selectedFilter) {
      const filtered = allBakery.filter(
        (product) => product.category === selectedFilter.id
      );
      setFilteredBakery(filtered);
    } else {
      setFilteredBakery(allBakery);
    }
  };

  // --- Remove All Filters ---
  const handleRemoveAllFilter = () => {
    const resetFilters = bakeryFilterItems.map((item) => ({
      ...item,
      isFilterActive: false,
    }));
    setBakeryFilterItems(resetFilters);
    setFilteredBakery(allBakery);
  };

  useEffect(() => {
    const hasActiveFilter = bakeryFilterItems.some(
      (item) => item.isFilterActive
    );
    setRemoveFilerState(hasActiveFilter);
  }, [bakeryFilterItems]);

  // --- Item Selection ---
  const handleDeleteBakeryItem = (itemId) => {
    setBakerySelectedItems((prev) =>
      prev.filter((item) => item.id !== itemId)
    );
  };

  const handleBakeryMinusButton = (itemId) => {
    setBakerySelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleBakeryPlusButton = (itemId) => {
    setBakerySelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleBakeryItemClicked = (product) => {
    setBakerySelectedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };

  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      {/* Filters */}
      <div
        style={{
          position: "fixed",
          zIndex: 10000,
          backgroundColor: "#FFFFFF",
          top: "80px",
          margin: "0 auto",
          width: "100%",
          maxWidth: "576px",
        }}
        className="overflow-hidden py-2 px-3 w-100 d-flex"
      >
        {bakeryFilterItems.map((item) => (
          <BakeryFilterItem
            key={item.id}
            itemId={item.id}
            itemText={item.title}
            isNotClass={true}
            itemImg={item.image}
            isActive={item.isFilterActive}
            filterHandler={handleFiltering}
            filtersCount={bakeryFilterItems.length}
          />
        ))}
      </div>

      <div
        style={{ marginTop: "130px" }}
        className="d-flex justify-content-between align-items-center w-100 filter-button-holder"
      >
        {removeFilerState && (
          <Button
            style={{
              backgroundColor: "#fae105",
              color: "#080808",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            className="px-3"
            startIcon={<Close />}
            onClick={handleRemoveAllFilter}
          >
            حذف فیلتر
          </Button>
        )}
      </div>

      {/* محصولات */}
      <BakeryItems
        bakeryData={filteredBakery}
        selectBakeryHandler={handleBakeryItemClicked}
      />

      {/* سبد خرید پایین صفحه */}
      <div className="w-100 m-0 p-0" style={{ height: "180px" }}>
        <SelectedBakeryItemsListDrawer
          selectedBakeryItemsList={bakerySelectedItems}
          deleteBakeryHandler={handleDeleteBakeryItem}
          bakeryMinusButtonHandler={handleBakeryMinusButton}
          bakeryPlusButtonHandler={handleBakeryPlusButton}
        />
      </div>
    </section>
  );
};

export default ExtraProduct;
