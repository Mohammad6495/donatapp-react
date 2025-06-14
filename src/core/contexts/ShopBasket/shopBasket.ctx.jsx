import React, { useState, useEffect, useContext } from "react";
import { getCookie, setCookie } from "../../utility/cookie";

const ShopBasketContext = React.createContext();

const ShopBasketContextProvider = ({ children }) => {
  const [shopBasketData, setShopBasketData] = useState();
  const [shopBasketDataNorouzi, setShopBasketDataNorouzi] = useState();

  // Load from cookie on mount
  useEffect(() => {
    const savedData = getCookie("shopBasketData-donat");
    const savedNorouziData = getCookie("shopBasketData-norouzi");

    if (savedData) setShopBasketData(JSON.parse(savedData));
    else setShopBasketData({ items: [] });

    if (savedNorouziData)
      setShopBasketDataNorouzi(JSON.parse(savedNorouziData));
    else setShopBasketDataNorouzi({ items: [] });
  }, []);

  // Sync to cookie when updated
  useEffect(() => {
    if (shopBasketData?.items)
      setCookie("shopBasketData-donat", JSON.stringify(shopBasketData));
    if (shopBasketDataNorouzi?.items)
      setCookie(
        "shopBasketData-norouzi",
        JSON.stringify(shopBasketDataNorouzi)
      );
  }, [shopBasketData, shopBasketDataNorouzi]);




  const resetBasket = () => setShopBasketData({ items: [] });

  const createMethods = (state, setState) => ({
    getItem: (id) => {
      return state.items.find((item) => item.product === id) || {};
    },
    getAll: () => state.items || [],
    deleteAll: () => setState({ items: [] }),
    createItem: (id, count = 1) => ({ product: id, count }),
    createAndAddItem(id, count = 1) {
      const newItem = this.createItem(id, count);
      const index = state.items.findIndex(
        (item) => item.product === newItem.product
      );
      if (index >= 0) {
        const items = [...state.items];
        items[index].count += count;
        setState({ items });
      } else {
        setState({ items: [...state.items, newItem] });
      }
    },
    addListOfProducts(list) {
      const updatedItems = state.items.map((existingItem) => {
        const newItem = list.find(
          (i) => i.product === existingItem.product
        );
        return newItem
          ? { ...existingItem, count: existingItem.count + newItem.count }
          : existingItem;
      });

      const newItems = list.filter(
        (item) => !state.items.some((i) => i.product === item.product)
      );

      setState({ items: [...updatedItems, ...newItems] });
    },
    deleteItem(id) {
      const index =state.items.findIndex((it) => it.product == id);
      
      if (index >= 0) {
        const clone = [...state.items];
        clone.splice(index, 1);
        setState({ items: clone });
      }
    },
    doesExistsInBasket(item) {
      return state.items.some((it) =>
        typeof item === "object"
          ? JSON.stringify(it) === JSON.stringify(item)
          : it.product === item
      );
    },
    increment(id) {
      const index = state.items.findIndex((i) => i.product === id);
      if (index >= 0) {
        const clone = [...state.items];
        clone[index].count += 1;
        setState({ items: clone });
      }
    },
    decrement(id) {
      const index = state.items.findIndex((i) => i.product === id);
      if (index >= 0) {
        const clone = [...state.items];
        if (clone[index].count === 1) {
          clone.splice(index, 1);
        } else {
          clone[index].count -= 1;
        }
        setState({ items: clone });
      }
    },
  });

  const generalProducts_methods = createMethods(
    shopBasketData,
    setShopBasketData
  );

  const addProductToBasket = (product, count = 1) => {
    generalProducts_methods.createAndAddItem(product, count);
  };


  return (
    <ShopBasketContext.Provider
      value={{
        shopBasketData,
        setShopBasketData,
        generalProducts_methods,
        addProductToBasket,
        resetBasket
      }}
    >
      {children}
    </ShopBasketContext.Provider>
  );
};

export const useShopBasketContext = () => useContext(ShopBasketContext);
export default ShopBasketContextProvider;
