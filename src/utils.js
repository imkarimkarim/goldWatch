"use strict";

export const convertToInt = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  strPrice = strPrice.toString();
  return parseInt(strPrice.replace(/,/g, ""));
};

export const humanRedable = (price) => {
  if (!price) return price;
  price = price.toString();
  let newNum = "";
  let count = 1;
  for (let i = price.length - 1; i >= 0; i--) {
    newNum = price[i] + newNum;
    if (count % 3 === 0 && i !== price.length - 1 && i !== 0) {
      newNum = "," + newNum;
    }
    count++;
  }
  return newNum;
};

export const isFunction = (callback) => {
  if (typeof callback === "function") {
    return true;
  }
  return false;
};
