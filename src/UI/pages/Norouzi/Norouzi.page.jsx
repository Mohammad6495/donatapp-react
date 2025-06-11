import React, { useEffect, useState } from "react";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { products_apiCalls } from "../../../core/services/agent";
import OrdinaryButton, {
  SimpleButton,
} from "../../components/OrdinaryButton/OrdinaryButton";
import { Close, Sort, FilterAlt } from "@mui/icons-material";
import filterIcon from "../../../assets/images/filtering-button-icon.png";
import { Alert, AlertTitle, Avatar, Button } from "@mui/material";
import DessertItem from "./components/DessertItem/DessertItem";
import DessertItem2 from "./components/DessertItem2/DessertItem2";
import SelectedDessertItemsListDrawer from "./components/SelectedDessertItemsListDrawer/SelectedDessertItemsListDrawer";
import DessertFilterDrawer from "./components/DessertFilterDrawer/DessertFilterDrawer";
import { calcMaxAndMinPriceFunc } from "./utils/calcMaxAndMinPrice";
import DessertSortingDrawer from "./components/DessertSortingDrawer/DessertSortingDrawer";
import { dessertSortingDrawerItemData } from "./components/DessertSortingDrawer/utils/dessertSortingDrawerItemData";
import { formatNumber } from "../../../core/utility/helperFunctions";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";
import { useNavigate } from "react-router";
import "./styles/Dessert.scss";
import { useDessertAndBakeryContext } from "../../../core/contexts/DessertAndBakery/dessertAndBakery";
import Polygon from "../../../assets/images/Polygon 8.svg";
const Dessert = () => {
  const navigate = useNavigate();
  // Context
  const { handleClose, handleOpen } = useLoadingContext();
  // States
  const [allDessert, setAllDessert] = useState();
  const { NorouziSelectedItems, setNorouziSelectedItems } =
    useDessertAndBakeryContext();

  //*************************************************//
  // Get All Dessert
  const getAllDessert = () => {
    apiCaller({
      api: products_apiCalls.apiCall_getAllNorouzi,
      onSuccess: (resp) => {
        if (resp?.status === 200 && resp?.data.status == 1) {
          setAllDessert(resp?.data?.data);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllDessert();
  }, []);

  //*************************************************//

  const replaceWithFirstElement = (arr, index) => {
    const arr2 = JSON.parse(JSON.stringify(arr));
    const temp = arr2[0];
    arr2[0] = arr2[index];
    arr2[index] = temp;

    return arr2;
  };
  //*************************************************//
  // Handle Dessert Minues Button
  const handleDessertMinuesButton = (itemId) => {
    let clonedData = JSON.parse(JSON.stringify(NorouziSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    if (clonedData?.length > 0)
      clonedData = replaceWithFirstElement(clonedData, currentIndex);
    ////////////////////
    setTimeout(() => {
      if (clonedData[0].count > 0) {
        clonedData[0].count -= 1;
        setNorouziSelectedItems(clonedData);
      }
      if (clonedData[0].count == 0) {
        clonedData.splice(0, 1);
        setNorouziSelectedItems(clonedData);
      }
    }, 0);
  };

  //*************************************************//
  // Handle Dessert Plus Button
  const handleDessertPlusButton = (itemId) => {
    let clonedData = JSON.parse(JSON.stringify(NorouziSelectedItems));
    const currentIndex = clonedData?.findIndex((it) => it?.id == itemId);
    clonedData = replaceWithFirstElement(clonedData, currentIndex);
    setTimeout(() => {
      clonedData[0].count += 1;
      setNorouziSelectedItems(clonedData);
    }, 0);
  };
  //*************************************************//
  // Handle Select Dessert Items
  const handleSelectDessertItem = (id) => {
    const itemIndex = NorouziSelectedItems?.findIndex((it) => it.id == id);
    if (itemIndex == -1) {
      const newItem = allDessert.find((it) => it.id == id);
      setNorouziSelectedItems((oldState) => [
        { ...newItem, count: 1 },
        ...oldState,
      ]);
    } else {
      handleDessertPlusButton(id);
    }
  };
  //*************************************************//

  return (
    <section className="m-0 p-0 flex-grow-1 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar position-relative">
      <div className="w-100 px-2 d-flex flex-column align-items-start" style={{ height: '74px', transform: 'translateY(-30px)'}}>
        <div
          className="w-100  text-center d-flex align-items-center justify-content-center"
          style={{
            height: "40px",
            backgroundColor: "#CB7640",
            color: "#fff",
            fontSize: "11px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <span>
            آخرین مهلت ثبت سفارش محصولات نوروزی تا تاریخ ۲۷ اسفند ماه میباشد
          </span>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-between p-1" style={{ height: '41px', border: '2px solid #CB7640', borderRadius: '0px 0px 8px 8px'}}>
          <div className="d-flex align-items-center">
            <img src={Polygon} width={10} height={10} />
            <span className="caro-color" style={{ fontSize: '11px'}}>تاریخ تحویل ۲۸ و ۲۹ اسفند ماه</span>
          </div>
          <div className="d-flex align-items-center">
            <img src={Polygon} width={10} height={10} />
            <span className="caro-color" style={{ fontSize: '11px'}}>تحویل درب منزل با ارسال رایگان</span>
          </div>
        </div>
      </div>
      <>
        <div className="d-flex flex-wrap justify-content-start align-items-stretch">
          {allDessert &&
            allDessert?.map((it) => (
              <DessertItem
                key={it?.id}
                itemId={it?.id}
                itemTitle={it?.title}
                weight={it?.weight}
                itemImg={it?.image}
                itemPrice={it?.price}
                itemDesc={it?.description}
                addItemHandler={handleSelectDessertItem}
              />
            ))}
        </div>
        <div className="d-flex w-100">
          {allDessert?.length <= 0 && (
            <div className="d-flex w-100">
              <Alert className="w-100" severity="warning">
                متاسفانه محصولی موجود نیست
              </Alert>
            </div>
          )}
        </div>
        {NorouziSelectedItems?.length > 0 ? (
          <div
            className="w-100 m-0 p-0 position-relative"
            style={{ height: "180px" }}
          >
            <SelectedDessertItemsListDrawer
              selectedDessertItemsList={NorouziSelectedItems}
              dessertMinusButtonHandler={handleDessertMinuesButton}
              dessertPlusButtonHandler={handleDessertPlusButton}
            />
          </div>
        ) : null}
      </>
    </section>
  );
};

export default Dessert;
