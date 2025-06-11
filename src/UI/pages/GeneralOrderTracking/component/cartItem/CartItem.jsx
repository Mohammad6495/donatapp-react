import React, { useState, useEffect } from "react";
import RefrigeratorCakeItem from "./RefrigeratorCakeItem";
import CookieItem from "./CookieItem";
import BakeryItem2 from "../../../Bakery/components/BakeryItem2/BakeryItem2";
import ExtraProductItem from "./extraProductItem";

import { formatPrice } from "../../../../../core/utility/utils";

///images
import image1 from '../../../../../assets/images/dollorImage.png'

const CartItem = ({ cartItemType, boxType, ...item }) => {
  return (
    <>
      {cartItemType == 0 && <RefrigeratorCakeItem {...item} />}
      {cartItemType == 1 && <CookieItem boxType={boxType} {...item} />}
      {cartItemType == 3 && (
        <BakeryItem2
          itemId={item.product.id}
          itemImg={item.product.image}
          itemTitle={item.product.title}
          itemPrice={item.product.price}
          itemCount={item.count}
          isInOrderPage={true}
        />
      )}
      {cartItemType == 2 && (
        <BakeryItem2
          itemId={item.product.id}
          itemImg={item.product.image}
          itemTitle={item.product.title}
          itemPrice={item.product.price}
          itemCount={item.count}
          isInOrderPage={true}
        />
      )}
      {cartItemType == 5 && (
        <BakeryItem2
          itemId={item.product.id}
          itemImg={item.product.image}
          itemTitle={item.product.title}
          itemPrice={item.product.price}
          itemCount={item.count}
          isInOrderPage={true}
        />
      )}
      {cartItemType == 4 && (
        <ExtraProductItem {...item.product} isInOrderPage={true} />
      )}
      {cartItemType == 6 && (
        <div className="w-100 mt-3">
          <h6 className="mx-1" style={{ fontWeight: "600" }}>
            مازاد :{" "}
          </h6>
          <ExtraProductItem image={image1} {...item} isInOrderPage={true} />
        </div>
      )}
      {cartItemType == 7 && (
        <div className="w-100 mt-3">
          <h6 className="mx-1" style={{ fontWeight: "600" }}>
            کسر :{" "}
          </h6>
          <ExtraProductItem image={image1} {...item} isInOrderPage={true} />
        </div>
      )}
    </>
  );
};

export default CartItem;
/*
bakeryCategoryId
: 
null
branchId
: 
3
descripiton
: 
null
description
: 
"<p>ت</p>"
id
: 
7
image
: 
"/Products/a7965540-9241-4fcb-9868-5cbdd55a13fc.jpg"
isActive
: 
true
price
: 
1000000
productType
: 
1
quantity
: 
500
sendFree
: 
false
title
: 
"دسر یک"
updatedAt
: 
"2022-11-23T09:35:34.6883482"
updatedAtFormatted
: 
"1401/09/02 09:35"
willSend
: 
true
*/
