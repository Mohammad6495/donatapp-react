import React, { useState } from "react";

import FilterDrawerFavorite from "./components/FilterDrawerFavorite/FilterDrawerFavorite";
import { listCategoryDataFavorite } from "./fakeData";
import { useFavoriteContext } from "../../../core/contexts/FavoriteContext/FavoriteContext";
import FavoriteItem from "./components/favoriteItem/FavoriteItem";
import { Alert } from "@mui/material";
import "./styles.scss";

const FavoritePage = () => {
  const [allTomorrowCake, setAllTomorrowCake] = useState();

  const { favoriteData, favoriteDataTomorrow } = useFavoriteContext();

  const [selectCatFavoriteId, setSelectFavoriteId] = useState(2);

  ///handleّ
  const handleSetFavoriteSelectedId = (favoriteId) => {
    if (favoriteId) {
      setSelectFavoriteId(favoriteId);
    }
  };

  return (
    <div className="d-flex flex-column p-1">
      <FilterDrawerFavorite
        favoriteCategoryList={listCategoryDataFavorite}
        selectCatFavoriteId={selectCatFavoriteId}
        handleSetFavoriteSelectedId={handleSetFavoriteSelectedId}
      />
      <div className="d-flex flex-column w-100 mt-4">
        {selectCatFavoriteId == 1 ? (
          <>
            {favoriteData?.items?.length !== 0 ? (
              favoriteData?.items.map((item) => (
                <FavoriteItem key={item?.id} cakeType={0} {...item} />
              ))
            ) : (
              <div className="">
                <Alert severity="warning">علاقه مندی وجود نداره</Alert>
              </div>
            )}
          </>
        ) : (
          <>
            {favoriteDataTomorrow?.items?.length !== 0 ? (
              favoriteDataTomorrow?.items.map((item) => (
                <FavoriteItem key={item?.id} cakeType={1} {...item} />
              ))
            ) : (
              <div className="">
                <Alert severity="warning">علاقه مندی وجود نداره</Alert>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
