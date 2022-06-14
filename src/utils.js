"use strict";

const removeComma = (strPrice) => {
  if (!strPrice) {
    return false;
  }
  return strPrice.replace(",", "");
};

export const extractfPrice = (html) => {
  if (!html) {
    return false;
  }
  const regex = /\d{3},\d{3}/g;
  const strPrice = html.match(regex);
  const price = parseInt(removeComma(strPrice[0]));
  return price;
};
