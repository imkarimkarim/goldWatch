"use strict";

import { isFunction, convertToInt } from "./utils.js";

export const isStatementTrue = async (min, max, price, callback) => {
  if (min === undefined || max === undefined || price === undefined) return;

  min = convertToInt(min);
  max = convertToInt(max);
  price = convertToInt(price);

  if (price <= min || price >= max) {
    if (isFunction(callback)) callback(true);
  } else {
    if (isFunction(callback)) callback(false);
  }
};
