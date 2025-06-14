import React, { useState, useEffect } from "react";
import RefrigeratorCakeItem from "./RefrigeratorCakeItem";
import CookieItem from "./CookieItem";
import BakeryItem2 from "../../../Bakery/components/BakeryItem2/BakeryItem2";
import ExtraProductItem from "./extraProductItem";

import { formatPrice } from "../../../../../core/utility/utils";

///images
import image1 from '../../../../../assets/images/dollorImage.png'

const CartItem = ({ item }) => {
  return (
    <>
      <RefrigeratorCakeItem item={item} />

    </>
  );
};

export default CartItem;
