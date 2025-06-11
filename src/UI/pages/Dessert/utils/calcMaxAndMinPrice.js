export const calcMaxAndMinPriceFunc = (arr) => {
  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i = arr.length - 1; i >= 0; i--) {
    tmp = arr[i].price;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }
  return { max: highest, min: lowest };
};

export const calcMaxAndMinPriceFuncTomorrowCake = (arr) => {
  var lowest = Number.POSITIVE_INFINITY;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i = arr.length - 1; i >= 0; i--) {
    tmp = arr[i].payPrice;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }
  return { max: highest, min: lowest };
};
