"use strict";

import { extractfPrice, isFunction } from "./utils.js";

import SETTINGS from "./settings.js";
const setts = new SETTINGS();

export const isStatementTrue = (price, callback) => {
  if (!price) {
    return false;
  }
  setts.get((data) => {
    const min = extractfPrice(data.min);
    const max = extractfPrice(data.max);
    if (price <= min || price >= max) {
      setts.setSent(true);
      if (isFunction(callback)) callback(true);
    } else {
      if (isFunction(callback)) callback(false);
    }
  });
};
