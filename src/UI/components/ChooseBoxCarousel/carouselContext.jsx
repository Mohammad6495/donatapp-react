import React, { useState, useEffect } from "react";
import { carouselFakeData } from "./utils/carouselFakeData";
import { useParams } from "react-router";
import { apiCaller } from "../../../core/custom-hooks/useApi";
////////
const CarouselContext = React.createContext();

const CarouselContextProvider = ({ children }) => {
  const [currentItem, set_currentItem] = useState(1);
  const [carouselData, setcarouselData] = useState();
  const { id } = useParams();

  // const getCreamyCookiesChooseBoxCarouselData = () => {
  //   // apiCaller({
  //   //   api:
  //   // })
  //   // setcarouselData();
  // };

  // const getCookiesChooseBoxCarouselData = () => {
  //   // apiCaller({
  //   //   api:
  //   // })
  //   // setcarouselData();
  // };

  // const getCarouselData = () => {
  //   if (id == 1) {
  //     getCreamyCookiesChooseBoxCarouselData();
  //   } else {
  //     getCookiesChooseBoxCarouselData();
  //   }
  // };

  const getCarouselData = () => {
    setcarouselData(carouselFakeData);
  };

  useEffect(() => {
    getCarouselData();
  }, [id]);

  const handleOnChange = (e) => {
    set_currentItem(e);
  };

  useEffect(() => {}, [id]);

  return (
    <CarouselContext.Provider
      value={{ currentItem, handleOnChange, carouselData }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselContext = () => React.useContext(CarouselContext);

export default CarouselContextProvider;
