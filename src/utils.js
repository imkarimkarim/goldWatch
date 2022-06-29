"use strict";

const removeComma = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  return strPrice.replace(/,/g, "");
};

export const addComma = (price) => {
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

export const extractfPrice = (html) => {
  if (!html) {
    return false;
  }
  const regex = /\d{1,3},\d{1,3},?\d{1,3},?/;
  const strPrice = html.match(regex);
  const price = parseInt(removeComma(strPrice[0]));
  return price;
};

export const isFunction = (callback) => {
  if (typeof callback === "function") {
    return true;
  }
  return false;
};
