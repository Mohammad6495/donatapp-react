import React, { useEffect, useState } from "react";
import RefrigeratorCakeFilterItem from "./components/RefrigeratorCakeFilterItem/RefrigeratorCakeFilterItem";
import filterIcon from "../../../assets/images/filtering-button-icon.png";
import { Avatar, Button, Skeleton } from "@mui/material";
import { Close, Compare, FilterAlt, Sort } from "@mui/icons-material";
import RefrigeratorCakeFilterDrawer from "./components/RefrigeratorCakeFilterDrawer/RefrigeratorCakeFilterDrawer";
import { refrigeratorCakeFilterItemFakeData } from "./utils/refrigeratorCakeFilterItemFakeData";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import RefrigeratorCakeItems from "./components/RefrigeratorCakeItems/RefrigeratorCakeItems";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import {
  home_apiCalls,
  refrigeratorCake_apiCalls,
} from "../../../core/services/agent";
import { calcMaxAndMinPriceFunc } from "../Dessert/utils/calcMaxAndMinPrice";
import RefrigeratorCakeSortingDrawer from "./components/RefrigeratorCakeSortingDrawer/RefrigeratorCakeSortingDrawer";
import { refrigeratorCakeSortingDrawerItemData } from "./components/RefrigeratorCakeSortingDrawer/utils/RefrigeratorCakeSortingDrawerItemData";
import "./styles/RefrigeratorCake.scss";
import RefrigeratorCakeItemSkeleton from "../../components/skeletons/refrigeratorCakeItemSkeleton";
import { useWindowDimensions } from "../../../core/custom-hooks/getWindowDimensions";

const RefrigeratorCake = () => {
  const { width } = useWindowDimensions();
  const { handleClose, handleOpen } = useLoadingContext();
  const [allRefrigeratorCake, setAllRefrigeratorCake] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const getCakes = () => {
    apiCaller({
      api: refrigeratorCake_apiCalls.apiCall_getAllRefrigeratorCake,
      apiArguments: "",
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          const data = [...resp?.data?.data];
          setAllRefrigeratorCake(data);
        }
      },
      onStart: () => {
        setIsFetching(true);
        handleOpen();
      },
      onEnd: () => {
        setIsFetching(false);
        handleClose();
      },
    });
  };
  useEffect(() => {
    getCakes();
  }, []);

  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 pb-5 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {/* Start Refrigerator Cake Items */}
      <RefrigeratorCakeItems refrigeratorCakeData={allRefrigeratorCake} />
      <div className=" w-100 d-flex flex-row flex-wrap align-items-stretch">
        {isFetching &&
          [1, 2, 3, 4].map((it) => <RefrigeratorCakeItemSkeleton />)}
      </div>
    </section>
  );
};

export default RefrigeratorCake;
