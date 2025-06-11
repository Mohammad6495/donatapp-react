import React, { useState, useEffect, useReducer } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { apiCaller } from "../../custom-hooks/useApi";
import { refrigeratorCake_apiCalls } from "../../services/agent";
import { getCookie, setCookie } from "../../utility/cookie";
import { calculateDiff } from "../../utility/utils";

////////////
const addToStateMethod = ({ key, data, state, setState }) => {
  setState({
    ...state,
    [key.toString()]: [...state[key.toString()], data],
  });
};
const deleteFromStateMethod = ({ key, object, state, setState }) => {
  const clonedList = JSON.parse(JSON.stringify(state[key]));
  const index = clonedList.findIndex(
    (item) => JSON.stringify(item) === JSON.stringify(object)
  );
  if (index >= 0) {
    clonedList.splice(index, 1);
    setState({
      ...state,
      [key.toString()]: clonedList,
    });
  }
};
////////////////////////
const stateOperations = ({ key, state, setState }) => {
  const param = {
    key,
    state,
    setState,
  };
  const addMethod = (data) => {
    param.data = data;
    addToStateMethod(param);
  };
  const deleteMethod = (data) => {
    param.data = data;
    deleteFromStateMethod(param);
  };
  const getData = () => {
    return state?.[key.toString()];
  };
  const clear = () => {
    setSelectedProductsState({
      ...selectedProductsState,
      [key.toString()]: [],
    });
  };
  return { addMethod, deleteMethod, getData, clear };
};
///////////////////////
// const basketInitialState = {
//   bakeryProducts: [],
//   dessertProducts: [],
//   creamyCookieProducts: [],
//   cookieProducts: [],
//   refrigeratorProducts: [],
//   birthDayUtils: [],
// };
const ShopBasketDataTypes = [
  "refrigeratorCake",
  "cookieBox",
  "desert",
  "birthdayUtils",
];
//////***  ***//////
const ShopBasketContext = React.createContext();
const ShopBasketContextProvider = ({ children }) => {
  const [priceIsUncertain, setPriceIsUncertain] = useState(false);
  // PRODUCTS STATES


  const [shopBasketData, setShopBasketData] = useState();
  const [shopBasketDataNorouzi, setShopBasketDataNorouzi] = useState();

  useEffect(() => {
    if (shopBasketData?.hasOwnProperty("items")) {
      if (JSON.stringify(shopBasketData) !== getCookie("shopBasketData")) {
        setCookie("shopBasketData", JSON.stringify(shopBasketData));
      }
    }
    if (shopBasketDataNorouzi?.hasOwnProperty("items")) {
      if (JSON.stringify(shopBasketDataNorouzi) !== getCookie("shopBasketData-norouzi")) {
        setCookie("shopBasketData-norouzi", JSON.stringify(shopBasketDataNorouzi));
      }
    }
  }, [shopBasketData, shopBasketDataNorouzi]);
  useEffect(() => {
    if (getCookie("shopBasketData")) {
      if (JSON.stringify(shopBasketData) !== getCookie("shopBasketData")) {
        setShopBasketData(JSON.parse(getCookie("shopBasketData")));
      }
    } else {
      setShopBasketData({ items: [] });
    }
    if (getCookie("shopBasketData-norouzi")) {
      if (JSON.stringify(shopBasketDataNorouzi) !== getCookie("shopBasketData-norouzi")) {
        setShopBasketDataNorouzi(JSON.parse(getCookie("shopBasketData-norouzi")));
      }
    } else {
      setShopBasketDataNorouzi({ items: [] });
    }
  }, []);
  /************* RESET BASKET *************/
  const resetBasket = () => {
    setShopBasketData({ items: [] });
  };

  const resetBasketNorouzi = () => {
    setShopBasketDataNorouzi({ items: [] });
  };
  /***********************************************/
  const addItem = (newItem) => {
    const items = [...shopBasketData.items, newItem];
    setShopBasketData({ items });
  };

  const addItemNorouzi = (newItem) => {
    const items = [...shopBasketDataNorouzi.items, newItem];
    setShopBasketDataNorouzi({ items });
  };
  /***********************************************/
  const deleteExpiredCakes = () => {
    const refrigeratorCakes = refrigeratorProducts_methods.getAll();
    refrigeratorCakes.forEach((cake) => {
      if (cake?.reservationDate) {
        const diff = calculateDiff(cake?.reservationDate);
        if (diff.timeLeft <= 15) {
          refrigeratorProducts_methods.deleteItem(cake.refrigeratorCakeId);
          apiCaller({
            api: refrigeratorCake_apiCalls.apiCall_unreserveCake,
            apiArguments: { cakeId: cake.refrigeratorCakeId },
          });
        }
      }
    });
  };
  const timerRef = useRef();
  useEffect(() => {
    if (shopBasketData) {
      deleteExpiredCakes();
      timerRef.current = setInterval(() => {
        if (refrigeratorProducts_methods.getAll().length > 0) {
          deleteExpiredCakes();
        }
      }, 1000 * 60);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shopBasketData]);
  /***********************************************/
  const generalProducts_methods = (cartItemType) => {
    return {
      getAll: () =>
        shopBasketData.items.filter((it) => it.cartItemType == cartItemType) ??
        [],
      deleteAll: () => {
        if (shopBasketData?.items?.length > 0) {
          const filteredData = shopBasketData?.items?.filter(
            (item) => item.cartItemType == cartItemType
          );
          if (filteredData.length > 0) {
            // setShopBasketData({ items: filteredData });
          } else {
            // setShopBasketData({ items: [] });
          }
        }
      },
      createItem: (id, count = 1) => {
        const obj = { cartItemType: cartItemType, productId: id, count };
        return obj;
      },
      createAndAddItem: function (id, count) {
        addItem(this.createItem(id, count));
      },
      addListOfProducts: function (list) {
        const updatedItems = shopBasketData.items.map((existingItem) => {
          const newItem = list.find((item) => item.productId === existingItem.productId);
      
          if (newItem) {
            existingItem.count += newItem.count;
            return existingItem;
          }
          
          return existingItem;
        });
      
        const newItems = list.filter(
          (newItem) => !shopBasketData.items.some((existingItem) => existingItem.productId === newItem.productId)
        );
      
        const items = [...updatedItems, ...newItems];
        setShopBasketData({ items });
      },
      deleteItem: (item) => {
        let index = -1;
        if (typeof item === "object") {
          index = shopBasketData?.items?.findIndex(
            (it) => JSON.stringify(it) == JSON.stringify(item)
          );
        }
        if (typeof item === "number" || typeof item === "string") {
          index = shopBasketData?.items?.findIndex(
            (it) => it?.productId == item
          );
        }
        if (index < 0) return;
        const shopBasketDataClone = JSON.parse(JSON.stringify(shopBasketData));
        shopBasketDataClone?.items.splice(index, 1);
        setShopBasketData(shopBasketDataClone);
      },
      doesExistsInBasket: function (item) {
        if (this.getAll()?.length == 0) return false;
        const doesExists = this.getAll()?.some((it) => {
          if (typeof item === "object") {
            return JSON.stringify(it) === JSON.stringify(item);
          }
          if (typeof item === "number" || typeof item === "string") {
            return it?.productId == item;
          }
          return false;
        });
        return doesExists;
      },
      decrement: function (id) {
        const index = shopBasketData?.items?.findIndex(
          (item) => item.productId == id
        );
        if (index < 0) return;
        const clonedShopBasket = JSON.parse(JSON.stringify(shopBasketData));
        if (clonedShopBasket?.items[index].count == 1) {
          this.deleteItem(id);
        } else {
          clonedShopBasket.items[index].count =
            clonedShopBasket?.items[index].count - 1;
          setShopBasketData(clonedShopBasket);
        }
      },
      increment: function (id) {
        const index = shopBasketData?.items?.findIndex(
          (item) => item.productId == id
        );
        if (index < 0) return;
        const clonedShopBasket = JSON.parse(JSON.stringify(shopBasketData));
        clonedShopBasket.items[index].count =
          clonedShopBasket?.items[index].count + 1;
        setShopBasketData(clonedShopBasket);
      },
    };
  };
  ////GeneralNorouziProduct
  const generalNorouziProducts_methods = (cartItemType) => {
    return {
      getAll: () =>
        shopBasketDataNorouzi.items.filter((it) => it.cartItemType == cartItemType) ??
        [],
      deleteAll: () => {
        if (shopBasketDataNorouzi?.items?.length > 0) {
          const filteredData = shopBasketDataNorouzi?.items?.filter(
            (item) => item.cartItemType != cartItemType
          );
          setShopBasketDataNorouzi({ items: filteredData });
        }
      },
      createItem: (id, count = 1) => {
        const obj = { cartItemType: cartItemType, productId: id, count };
        return obj;
      },
      createAndAddItem: function (id, count) {
        addItemNorouzi(this.createItem(id, count));
      },
      addListOfProducts: function (list) {
        const items = [...shopBasketDataNorouzi.items, ...list];
        setShopBasketDataNorouzi({ items });
      },
      deleteItem: (item) => {
        let index = -1;
        if (typeof item === "object") {
          index = shopBasketDataNorouzi?.items?.findIndex(
            (it) => JSON.stringify(it) == JSON.stringify(item)
          );
        }
        if (typeof item === "number" || typeof item === "string") {
          index = shopBasketDataNorouzi?.items?.findIndex(
            (it) => it?.productId == item
          );
        }
        if (index < 0) return;
        const shopBasketDataNorouziClone = JSON.parse(JSON.stringify(shopBasketDataNorouzi));
        shopBasketDataNorouziClone?.items.splice(index, 1);
        setShopBasketDataNorouzi(shopBasketDataNorouziClone);
      },
      doesExistsInBasket: function (item) {
        if (this.getAll()?.length == 0) return false;
        const doesExists = this.getAll()?.some((it) => {
          if (typeof item === "object") {
            return JSON.stringify(it) === JSON.stringify(item);
          }
          if (typeof item === "number" || typeof item === "string") {
            return it?.productId == item;
          }
          return false;
        });
        return doesExists;
      },
      decrement: function (id) {
        const index = shopBasketDataNorouzi?.items?.findIndex(
          (item) => item.productId == id
        );
        if (index < 0) return;
        const clonedShopBasket = JSON.parse(JSON.stringify(shopBasketDataNorouzi));
        if (clonedShopBasket?.items[index].count == 1) {
          this.deleteItem(id);
        } else {
          clonedShopBasket.items[index].count =
            clonedShopBasket?.items[index].count - 1;
          setShopBasketDataNorouzi(clonedShopBasket);
        }
      },
      increment: function (id) {
        const index = shopBasketDataNorouzi?.items?.findIndex(
          (item) => item.productId == id
        );
        if (index < 0) return;
        const clonedShopBasket = JSON.parse(JSON.stringify(shopBasketDataNorouzi));
        clonedShopBasket.items[index].count =
          clonedShopBasket?.items[index].count + 1;
        setShopBasketDataNorouzi(clonedShopBasket);
      },
    };
  };
  //////////////
  const norouziProducts_methods = generalNorouziProducts_methods(5);
  //////////////
  const birthDayUtils_methods = generalProducts_methods(4);
  //////////////
  const bakeryProducts_methods = generalProducts_methods(2);
  //////////////
  const dessertProducts_methods = generalProducts_methods(3);
  //////////////
  const cookieProducts_methods = {
    getAll: () =>
      shopBasketData.items.filter((it) => it.cartItemType == 1) ?? [],
    deleteAll: () => {
      if (shopBasketData?.items?.length > 0) {
        const filteredData = shopBasketData?.items?.filter(
          (item) => item.cartItemType != 1
        );
        setShopBasketData({ items: filteredData });
      }
    },
    createAndAddItem: function (boxRows) {
      addItem(this.createItem(boxRows));
    },
    createItem: (boxRows) => {
      const obj = { cartItemType: 1 };
      if (boxRows?.length == 2) {
        obj.boxType = 0;
        obj.firstRowCookieId = boxRows[0]?.cookie?.id;
        obj.secondRowCookieId = boxRows[1]?.cookie?.id;
      }
      if (boxRows?.length == 3) {
        obj.boxType = 1;
        obj.firstRowCookieId = boxRows[0]?.cookie?.id;
        obj.secondRowCookieId = boxRows[1]?.cookie?.id;
        obj.thirdRowCookieId = boxRows[2]?.cookie?.id;
      }
      if (boxRows?.length == 5) {
        obj.boxType = 2;
        obj.firstRowCookieId = boxRows[0]?.cookie?.id;
        obj.secondRowCookieId = boxRows[1]?.cookie?.id;
        obj.thirdRowCookieId = boxRows[2]?.cookie?.id;
        obj.fourthRowCookieId = boxRows[3]?.cookie?.id;
        obj.fifthRowCookieId = boxRows[4]?.cookie?.id;
      }
      if (boxRows?.length == 4) {
        obj.boxType = 3;
        obj.firstRowCookieId = boxRows[0]?.cookie?.id;
        obj.secondRowCookieId = boxRows[1]?.cookie?.id;
        obj.thirdRowCookieId = boxRows[2]?.cookie?.id;
        obj.fourthRowCookieId = boxRows[3]?.cookie?.id;
      }
      return obj;
    },
    deleteItem: (item) => {
      let index;
      if (typeof item === "object") {
        index = shopBasketData?.items?.findIndex((it) => {
          return JSON.stringify(it) == JSON.stringify(item);
        });
      }
      if (index < 0) return;
      const shopBasketDataClone = JSON.parse(JSON.stringify(shopBasketData));
      shopBasketDataClone?.items.splice(index, 1);
      setShopBasketData(shopBasketDataClone);
      // refrigeratorCakeId
    },
    doesExistsInBasket: function (boxRows) {
      if (this.getAll()?.length == 0) return false;
      const doesExists = this.getAll()?.some(
        (it) => JSON.stringify(it) === JSON.stringify(this.createItem(boxRows))
      );
      return doesExists;
    },
  };
  //////////////
  const refrigeratorProducts_methods = {
    getAll: () =>
      shopBasketData.items.filter((it) => it.cartItemType == 0) ?? [],
    deleteAll: () => {
      if (shopBasketData?.items?.length > 0) {
        const filteredData = shopBasketData?.items?.filter(
          (item) => item.cartItemType != 0
        );
        setShopBasketData({ items: filteredData });
      }
    },
    getItem: (id) => {
      // refrigeratorCakeId
      if (shopBasketData?.items?.length > 0) {
        const cakeObj = shopBasketData?.items?.find(
          (it) => it?.refrigeratorCakeId == id
        );
        return cakeObj;
      }
      return undefined;
    },
    deleteItem: (id) => {
      const shopBasketDataClone = JSON.parse(JSON.stringify(shopBasketData));
      const index = shopBasketDataClone?.items?.findIndex(
        (it) => it?.refrigeratorCakeId == id
      );
      if (index < 0) return;
      shopBasketDataClone?.items.splice(index, 1);
      setShopBasketData(shopBasketDataClone);
    },
    setReserveDate: (id, reservationDate) => {
      // refrigeratorCakeId
      const shopBasketDataClone = JSON.parse(JSON.stringify(shopBasketData));
      const index = shopBasketDataClone?.items?.findIndex(
        (it) => it?.refrigeratorCakeId == id
      );
      if (index < 0) return;
      shopBasketDataClone.items[index].reservationDate = reservationDate;
      // setShopBasketData(shopBasketDataClone);
      setCookie("shopBasketData", JSON.stringify(shopBasketDataClone));
    },
    onFactorUpdate: (factor) => {
      const shopBasketDataClone = JSON.parse(JSON.stringify(shopBasketData));
      const factorRefrigeratorItems = factor?.cartItems?.filter(
        (it) => it.cartItemType == 0
      );

      for (let i = 0; i < factorRefrigeratorItems.length; i++) {
        const id = factorRefrigeratorItems[i].refrigeratorCakeId;
        const matchObj = factorRefrigeratorItems?.find(
          (it) => it.refrigeratorCakeId == id
        );
        if (matchObj) {
          factorRefrigeratorItems[i].reservationDate = matchObj;
        }
      }
    },
    doesExists: function (id) {
      return this.getAll().some((item) => item.refrigeratorCakeId == id);
    },
    // return { addItem, getAll, deleteAll, getItem, deleteItem, setReserveDate };
  };
  const [paymentWay, setPaymentWay] = useState(true);

  /***************************************************/
  /***************************************************/
  return (
    <ShopBasketContext.Provider
      value={{
        setPaymentWay,
        paymentWay,
        ///// METHODS
        bakeryProducts_methods,
        dessertProducts_methods,
        cookieProducts_methods,
        refrigeratorProducts_methods,
        shopBasketData,
        shopBasketDataNorouzi,
        birthDayUtils_methods,
        norouziProducts_methods,
        // reset method
        resetBasket,
        resetBasketNorouzi,
        addItem,
        addItemNorouzi,
        // price certainity
        setPriceIsUncertain,
        priceIsUncertain,
      }}
    >
      {children}
    </ShopBasketContext.Provider>
  );
};

export const useShopBasketContext = () => useContext(ShopBasketContext);
export default ShopBasketContextProvider;
