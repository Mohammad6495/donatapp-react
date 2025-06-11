import React, { useState, useEffect } from "react";
import { useContext } from "react";
////
const DessertAndBakeryContext = React.createContext();

////
const DessertAndBakeryContextProvider = ({ children }) => {
  const [bakerySelectedItems, setBakerySelectedItems] = useState([]);
  const [dessertSelectedItems, setDessertSelectedItems] = useState([]);
  const [NorouziSelectedItems, setNorouziSelectedItems] = useState([]);
  ////
  return (
    <DessertAndBakeryContext.Provider
      value={{
        bakerySelectedItems,
        setBakerySelectedItems,
        dessertSelectedItems,
        setDessertSelectedItems,
        NorouziSelectedItems,
        setNorouziSelectedItems,
      }}
    >
      {children}
    </DessertAndBakeryContext.Provider>
  );
};
export const useDessertAndBakeryContext = () =>
  useContext(DessertAndBakeryContext);
export default DessertAndBakeryContextProvider;
