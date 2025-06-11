import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { getCookie, setCookie } from "../../utility/cookie";
import { toast } from "react-toastify";

//////***  ***//////
const FavoriteContext = React.createContext();

const FavoriteContextProvider = ({ children }) => {
  const [favoriteData, setfavoriteData] = useState();
  const [favoriteDataTomorrow, setfavoriteDataTomorrow] = useState();
  // const { userToken } = useAuthContext();

  useEffect(() => {
    if (favoriteData?.hasOwnProperty("items")) {
      if (JSON.stringify(favoriteData) !== getCookie("favoriteData")) {
        setCookie("favoriteData", JSON.stringify(favoriteData));
      }
    }
    if (favoriteDataTomorrow?.hasOwnProperty("items")) {
      if (
        JSON.stringify(favoriteDataTomorrow) !==
        getCookie("favoriteDataTomorrow")
      ) {
        setCookie("favoriteDataTomorrow", JSON.stringify(favoriteDataTomorrow));
      }
    }
  }, [favoriteData, favoriteDataTomorrow]);

  useEffect(() => {
    if (getCookie("favoriteData")) {
      if (JSON.stringify(favoriteData) !== getCookie("favoriteData")) {
        setfavoriteData(JSON.parse(getCookie("favoriteData")));
      }
    } else {
      setfavoriteData({ items: [] });
    }

    if (getCookie("favoriteDataTomorrow")) {
      if (
        JSON.stringify(favoriteDataTomorrow) !==
        getCookie("favoriteDataTomorrow")
      ) {
        setfavoriteDataTomorrow(JSON.parse(getCookie("favoriteDataTomorrow")));
      }
    } else {
      setfavoriteDataTomorrow({ items: [] });
    }
  }, []);
  /************* RESET BASKET *************/
  /***********************************************/
  const addItemToFavoriteDataToRefrigerator = (newItem) => {
    let allfavoriteData = { items: [...favoriteData?.items] };
    const findIndexItemInFavoriteData = allfavoriteData?.items.findIndex(
      (item) => item.id == newItem.id
    );

    if (findIndexItemInFavoriteData !== -1) {
      // Item exists, remove it
      allfavoriteData.items.splice(findIndexItemInFavoriteData, 1);
      setfavoriteData(allfavoriteData);
      toast.info("محصول مورد نظر از لیست علاقهمندی ها خارج شد.");
    } else {
      // Item doesn't exist, add it
      const items = [...allfavoriteData.items, newItem];
      setfavoriteData({ items });
      toast.success("محصول مورد نظر به لیست علاقهمندی ها اضافه شد.");
    }
  };

  const addItemToFavoriteDataTomorrow = (newItem) => {
    let allfavoriteDataTomorrow = { items: [...favoriteDataTomorrow?.items] };
    const findIndexItemInfavoriteDataTomorrow =
      allfavoriteDataTomorrow?.items.findIndex((item) => item.id == newItem.id);

    if (findIndexItemInfavoriteDataTomorrow !== -1) {
      // Item exists, remove it
      allfavoriteDataTomorrow.items.splice(
        findIndexItemInfavoriteDataTomorrow,
        1
      );
      setfavoriteDataTomorrow(allfavoriteDataTomorrow);
      // toast.info("محصول مورد نظر از لیست علاقهمندی ها خارج شد.");
    } else {
      // Item doesn't exist, add it
      const items = [...allfavoriteDataTomorrow.items, newItem];
      setfavoriteDataTomorrow({ items });
      // toast.success("محصول مورد نظر به لیست علاقهمندی ها اضافه شد.");
    }
  };

  const handleRemoveFavorite = (id, type) => {
    if (type == 0) {
      let allfavoriteR = { items: [...favoriteData?.items] };
      const findIndexFavoriteR = allfavoriteR?.items?.findIndex(
        (a) => a.id == id
      );
      if (findIndexFavoriteR !== -1) {
        allfavoriteR?.items?.splice(findIndexFavoriteR, 1);
        setfavoriteData(allfavoriteR);
      }
    } else if (type == 1) {
      let allfavoriteT = { items: [...favoriteDataTomorrow?.items] };
      const findIndexFavoriteR = allfavoriteT?.items?.findIndex(
        (a) => a.id == id
      );
      if (findIndexFavoriteR !== -1) {
        allfavoriteT?.items?.splice(findIndexFavoriteR, 1);
        setfavoriteDataTomorrow(allfavoriteT);
      }
    } else {
      return false;
    }
  };

  /***************************************************/
  return (
    <FavoriteContext.Provider
      value={{
        ///// METHODS
        favoriteData,
        favoriteDataTomorrow,
        addItemToFavoriteDataToRefrigerator,
        addItemToFavoriteDataTomorrow,
        handleRemoveFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);
export default FavoriteContextProvider;
